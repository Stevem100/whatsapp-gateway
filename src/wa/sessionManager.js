// Multi-session WhatsApp connection manager.
// One Baileys socket per session, stored in memory; credentials/keys live in SQLite.
const makeWASocket = require('@whiskeysockets/baileys').default
const {
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  Browsers,
  DisconnectReason,
} = require('@whiskeysockets/baileys')
const QRCode = require('qrcode')
const pino = require('pino')

const prisma = require('../db')
const config = require('../config')
const { usePrismaAuthState } = require('./authState')
const { classifyMessage, jidToPhone, MESSAGE_STATUS_BY_CODE } = require('../utils/helpers')
const { runAutoReply } = require('../bot/autoReply')
const { forwardEvent } = require('../webhook/forwarder')

const baileysLogger = pino({ level: 'silent' })

// sessionId -> runtime { sock, qr, qrDataUrl, qrAt, attempts, reconnectTimer, starting }
const runtimes = new Map()

function getRuntime(id) {
  if (!runtimes.has(id)) {
    runtimes.set(id, {
      sock: null,
      qr: null,
      qrDataUrl: null,
      qrAt: null,
      attempts: 0,
      reconnectTimer: null,
      starting: false,
    })
  }
  return runtimes.get(id)
}

function setRuntime(id, patch) {
  Object.assign(getRuntime(id), patch)
}

async function setSessionStatus(id, patch) {
  await prisma.session.update({ where: { id }, data: patch })
}

function getSessionRow(id) {
  return prisma.session.findUnique({ where: { id } })
}

async function clearAuthData(id) {
  await prisma.waKey.deleteMany({ where: { sessionId: id } })
  await prisma.session.update({ where: { id }, data: { creds: null } })
}

function detachSocket(rt) {
  if (rt.reconnectTimer) {
    clearTimeout(rt.reconnectTimer)
    rt.reconnectTimer = null
  }
  if (rt.sock) {
    try {
      rt.sock.ev.removeAllListeners()
      rt.sock.end(new Error('stopped by gateway'))
    } catch {
      /* socket already closed */
    }
    rt.sock = null
  }
}

// ---------------------------------------------------------------- start

async function startSession(id) {
  const session = await getSessionRow(id)
  if (!session) throw new Error(`Session ${id} not found`)
  const rt = getRuntime(id)
  if (rt.starting) return
  rt.starting = true
  try {
    detachSocket(rt)
    setRuntime(id, { qr: null, qrDataUrl: null, qrAt: null, attempts: rt.attempts })
    await setSessionStatus(id, { status: 'connecting', qr: null, qrGeneratedAt: null })
    console.log(`[session ${session.name}] starting connection (attempt ${rt.attempts + 1})`)

    const { state, saveCreds } = await usePrismaAuthState(id, prisma, baileysLogger)

    let version
    try {
      ({ version } = await fetchLatestBaileysVersion())
    } catch {
      version = undefined // fall back to the baked-in version
    }

    const sock = makeWASocket({
      version,
      auth: state,
      logger: baileysLogger,
      printQRInTerminal: false,
      browser: Browsers.ubuntu('Chrome'),
      markOnlineOnConnect: true,
      syncFullHistory: false,
    })
    rt.sock = sock

    sock.ev.on('creds.update', () => {
      saveCreds().catch((err) => console.error(`[session ${session.name}] saveCreds failed: ${err.message}`))
    })

    sock.ev.on('connection.update', (update) => {
      handleConnectionUpdate(id, update).catch((err) =>
        console.error(`[session ${session.name}] connection.update error: ${err.message}`)
      )
    })

    sock.ev.on('messages.upsert', ({ messages, type }) => {
      if (type !== 'notify' || !Array.isArray(messages)) return
      for (const msg of messages) {
        handleIncomingMessage(id, msg).catch((err) =>
          console.error(`[session ${session.name}] message handling error: ${err.message}`)
        )
      }
    })

    sock.ev.on('messages.update', (updates) => {
      handleStatusUpdates(id, updates).catch((err) =>
        console.error(`[session ${session.name}] status update error: ${err.message}`)
      )
    })
  } finally {
    rt.starting = false
  }
}

// ------------------------------------------------------- event handlers

async function handleConnectionUpdate(id, update) {
  const rt = getRuntime(id)
  const { connection, lastDisconnect, qr } = update

  if (qr) {
    rt.qr = qr
    rt.qrAt = new Date()
    try {
      rt.qrDataUrl = await QRCode.toDataURL(qr, { width: 512, margin: 1 })
    } catch {
      rt.qrDataUrl = null
    }
    await setSessionStatus(id, { status: 'qr', qr, qrGeneratedAt: rt.qrAt })
    await forwardEvent(await getSessionRow(id), 'connection.qr', {
      message: 'QR code issued, scan it in the dashboard within ~60 seconds',
    })
    return
  }

  if (connection === 'connecting') {
    await setSessionStatus(id, { status: 'connecting' })
    return
  }

  if (connection === 'open') {
    rt.attempts = 0
    setRuntime(id, { qr: null, qrDataUrl: null })
    const jid = rt.sock && rt.sock.user ? rt.sock.user.id : null
    await setSessionStatus(id, {
      status: 'connected',
      qr: null,
      qrGeneratedAt: null,
      connectedJid: jid,
      connectedPhone: jidToPhone(jid),
      lastConnectedAt: new Date(),
    })
    console.log(`[session ${id}] connected as ${jid}`)
    await forwardEvent(await getSessionRow(id), 'connection.open', {
      jid,
      phone: jidToPhone(jid),
    })
    return
  }

  if (connection === 'close') {
    const statusCode = lastDisconnect && lastDisconnect.error && lastDisconnect.error.output
      ? lastDisconnect.error.output.statusCode
      : undefined

    if (statusCode === DisconnectReason.loggedOut) {
      await clearAuthData(id)
      await setSessionStatus(id, {
        status: 'logged_out',
        connectedJid: null,
        connectedPhone: null,
        qr: null,
        qrGeneratedAt: null,
      })
      console.log(`[session ${id}] logged out, credentials cleared`)
      await forwardEvent(await getSessionRow(id), 'connection.logged_out', {})
      return
    }

    const canRetry = config.autoReconnect && rt.attempts < config.reconnectMaxAttempts
    await forwardEvent(await getSessionRow(id), 'connection.closed', {
      statusCode,
      willRetry: canRetry,
    })

    if (canRetry) {
      rt.attempts += 1
      await setSessionStatus(id, { status: 'reconnecting' })
      if (rt.reconnectTimer) clearTimeout(rt.reconnectTimer)
      rt.reconnectTimer = setTimeout(() => {
        startSession(id).catch((err) =>
          console.error(`[session ${id}] reconnect failed: ${err.message}`)
        )
      }, config.reconnectDelayMs)
    } else {
      await setSessionStatus(id, { status: 'disconnected' })
      console.log(`[session ${id}] gave up reconnecting (${rt.attempts} attempts)`)
    }
  }
}

async function handleIncomingMessage(id, msg) {
  if (!msg || !msg.key || !msg.key.remoteJid) return
  const remoteJid = msg.key.remoteJid
  if (remoteJid.endsWith('@broadcast') || remoteJid.endsWith('@newsletter')) return
  if (msg.message && msg.message.protocolMessage) return

  const fromMe = !!msg.key.fromMe
  const cls = classifyMessage(msg.message)
  const tsSec = Number(msg.messageTimestamp) || Math.floor(Date.now() / 1000)
  const timestamp = new Date(tsSec * 1000)

  const data = {
    sessionId: id,
    waMessageId: msg.key.id || null,
    remoteJid,
    senderJid: msg.key.participant ? jidToPhone(msg.key.participant) : null,
    pushName: msg.pushName || null,
    fromMe,
    type: cls.type,
    body: cls.body,
    mediaMime: cls.mediaMime,
    status: fromMe ? 'sent' : 'received',
    timestamp,
  }

  let stored
  if (data.waMessageId) {
    stored = await prisma.message.upsert({
      where: { sessionId_waMessageId: { sessionId: id, waMessageId: data.waMessageId } },
      update: { status: data.status },
      create: data,
    })
  } else {
    stored = await prisma.message.create({ data })
  }

  const session = await getSessionRow(id)
  await forwardEvent(session, fromMe ? 'message.sent' : 'message.received', {
    id: stored.waMessageId,
    remoteJid,
    senderJid: stored.senderJid,
    pushName: stored.pushName,
    fromMe,
    type: stored.type,
    body: stored.body,
    mediaMime: stored.mediaMime,
    timestamp: stored.timestamp,
  })

  if (!fromMe && stored.type === 'text' && session) {
    const rule = await runAutoReply(session, getRuntime(id).sock, {
      remoteJid,
      fromMe,
      body: stored.body,
    })
    if (rule) {
      await forwardEvent(session, 'bot.autoreplied', {
        remoteJid,
        ruleId: rule.id,
        keyword: rule.keyword,
        reply: rule.reply,
      })
    }
  }
}

async function handleStatusUpdates(id, updates) {
  if (!Array.isArray(updates)) return
  for (const u of updates) {
    if (!u || !u.key || !u.key.id) continue
    const status = MESSAGE_STATUS_BY_CODE[u.update && u.update.status]
    if (!status) continue
    await prisma.message.updateMany({
      where: { sessionId: id, waMessageId: u.key.id, fromMe: true },
      data: { status },
    })
  }
}

// ----------------------------------------------------------- stop / logout

async function stopSession(id) {
  const rt = getRuntime(id)
  detachSocket(rt)
  rt.attempts = 0
  await setSessionStatus(id, { status: 'disconnected' })
  console.log(`[session ${id}] stopped`)
}

async function logoutSession(id) {
  const rt = getRuntime(id)
  if (rt.sock) {
    try {
      rt.sock.ev.removeAllListeners()
      await rt.sock.logout()
    } catch {
      /* already logged out or not connected */
    }
    detachSocket(rt)
  }
  await clearAuthData(id)
  await setSessionStatus(id, {
    status: 'logged_out',
    connectedJid: null,
    connectedPhone: null,
    qr: null,
    qrGeneratedAt: null,
  })
  console.log(`[session ${id}] logged out`)
}

async function deleteSession(id) {
  await stopSession(id)
  await prisma.session.delete({ where: { id } }).catch(() => {})
  runtimes.delete(id)
}

// ----------------------------------------------------------- send helpers

function requireConnectedSocket(id) {
  const rt = getRuntime(id)
  if (!rt.sock) return null
  return rt.sock
}

async function storeOutgoing(sessionId, remoteJid, result, type, body, mediaMime) {
  const waMessageId = result && result.key ? result.key.id : null
  const data = {
    sessionId,
    remoteJid,
    waMessageId,
    senderJid: null,
    pushName: null,
    fromMe: true,
    type,
    body: body || null,
    mediaMime: mediaMime || null,
    status: 'sent',
    timestamp: new Date(),
  }
  let stored
  if (waMessageId) {
    stored = await prisma.message.upsert({
      where: { sessionId_waMessageId: { sessionId, waMessageId } },
      update: {},
      create: data,
    })
  } else {
    stored = await prisma.message.create({ data })
  }
  const session = await getSessionRow(sessionId)
  await forwardEvent(session, 'message.sent', {
    id: stored.waMessageId,
    remoteJid,
    fromMe: true,
    type: stored.type,
    body: stored.body,
    mediaMime: stored.mediaMime,
    timestamp: stored.timestamp,
  })
  return stored
}

async function sendMessage(id, jid, content, meta) {
  const sock = requireConnectedSocket(id)
  const session = await getSessionRow(id)
  if (!session) throw new Error('Session not found')
  if (!sock || session.status !== 'connected') {
    const err = new Error('Session is not connected. Connect it and scan the QR code first.')
    err.status = 409
    throw err
  }
  const result = await Promise.race([
    sock.sendMessage(jid, content),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Send timed out after 60s')), 60000)),
  ])
  const stored = await storeOutgoing(id, jid, result, meta.type, meta.body, meta.mediaMime)
  return stored
}

// ------------------------------------------------------------------- boot

async function resumeSessions() {
  if (!config.autoReconnect) return
  const sessions = await prisma.session.findMany({ where: { creds: { not: null } } })
  for (const s of sessions) {
    console.log(`[boot] resuming session "${s.name}" (${s.id})`)
    getRuntime(s.id).attempts = 0
    startSession(s.id).catch((err) =>
      console.error(`[boot] resume of ${s.name} failed: ${err.message}`)
    )
  }
}

async function stopAllSessions() {
  for (const [id] of runtimes) {
    try {
      const rt = getRuntime(id)
      detachSocket(rt)
    } catch {
      /* ignore */
    }
  }
}

module.exports = {
  getRuntime,
  startSession,
  stopSession,
  logoutSession,
  deleteSession,
  resumeSessions,
  stopAllSessions,
  requireConnectedSocket,
  sendMessage,
}

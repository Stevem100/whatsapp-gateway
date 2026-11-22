const express = require('express')
const QRCode = require('qrcode')
const prisma = require('../db')
const sessionManager = require('../wa/sessionManager')
const { HttpError, ah } = require('../utils/helpers')
const { postWebhook, samplePayload } = require('../webhook/forwarder')

const router = express.Router()

function serialize(row, rt) {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    botEnabled: row.botEnabled,
    webhookUrl: row.webhookUrl,
    connectedJid: row.connectedJid,
    connectedPhone: row.connectedPhone,
    lastConnectedAt: row.lastConnectedAt,
    createdAt: row.createdAt,
    hasCredentials: !!row.creds,
    reconnectAttempt: rt ? rt.attempts : 0,
    qrAvailable: !!(rt && rt.qr),
  }
}

const DEMO_RULES = [
  { matchType: 'exact', keyword: '!menu', reply: 'Available commands:\n- !menu -> show this menu\n- !ping -> check the bot is alive\n- say "hello" -> greeting', priority: 10 },
  { matchType: 'exact', keyword: '!ping', reply: 'pong', priority: 9 },
  { matchType: 'contains', keyword: 'hello', reply: 'Hi! This is an automated reply from your WhatsApp gateway bot.', priority: 1 },
]

async function seedDemoRules(sessionId) {
  const count = await prisma.botRule.count({ where: { sessionId } })
  if (count > 0) return
  await prisma.botRule.createMany({ data: DEMO_RULES.map((r) => ({ ...r, sessionId })) })
}

async function findSessionOr404(id) {
  const row = await prisma.session.findUnique({ where: { id } })
  if (!row) throw new HttpError(404, 'Session not found')
  return row
}

// GET /api/sessions
router.get('/', ah(async (req, res) => {
  const rows = await prisma.session.findMany({ orderBy: { createdAt: 'asc' } })
  res.json({ sessions: rows.map((r) => serialize(r, sessionManager.getRuntime(r.id))) })
}))

// POST /api/sessions  { name }
router.post('/', ah(async (req, res) => {
  const name = String((req.body && req.body.name) || '').trim()
  if (!name) throw new HttpError(400, 'Field "name" is required')
  if (name.length > 64) throw new HttpError(400, 'Name is too long (max 64 characters)')
  const existing = await prisma.session.findUnique({ where: { name } })
  if (existing) throw new HttpError(409, `A session named "${name}" already exists`)
  const row = await prisma.session.create({ data: { name } })
  await seedDemoRules(row.id)
  res.status(201).json({ session: serialize(row, sessionManager.getRuntime(row.id)) })
}))

// GET /api/sessions/:id
router.get('/:id', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  const [messages, rules, chats] = await Promise.all([
    prisma.message.count({ where: { sessionId: row.id } }),
    prisma.botRule.count({ where: { sessionId: row.id } }),
    prisma.message.groupBy({ by: ['remoteJid'], where: { sessionId: row.id } }),
  ])
  res.json({
    session: serialize(row, sessionManager.getRuntime(row.id)),
    stats: { messages, rules, chats: chats.length },
  })
}))

// POST /api/sessions/:id/connect
router.post('/:id/connect', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  sessionManager.getRuntime(row.id).attempts = 0
  await sessionManager.startSession(row.id)
  const updated = await findSessionOr404(row.id)
  res.json({ ok: true, session: serialize(updated, sessionManager.getRuntime(row.id)) })
}))

// POST /api/sessions/:id/disconnect
router.post('/:id/disconnect', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  await sessionManager.stopSession(row.id)
  const updated = await findSessionOr404(row.id)
  res.json({ ok: true, session: serialize(updated, sessionManager.getRuntime(row.id)) })
}))

// POST /api/sessions/:id/logout  (clears WhatsApp credentials on this device)
router.post('/:id/logout', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  await sessionManager.logoutSession(row.id)
  const updated = await findSessionOr404(row.id)
  res.json({ ok: true, session: serialize(updated, sessionManager.getRuntime(row.id)) })
}))

// DELETE /api/sessions/:id
router.delete('/:id', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  await sessionManager.deleteSession(row.id)
  res.json({ ok: true })
}))

// GET /api/sessions/:id/qr
router.get('/:id/qr', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  const rt = sessionManager.getRuntime(row.id)
  if (row.status !== 'qr' || !rt.qr) {
    return res.json({
      status: row.status,
      qr: null,
      message: row.status === 'connected'
        ? 'Already connected, no QR needed.'
        : 'No QR available. POST /connect first to request one.',
    })
  }
  let dataUrl = rt.qrDataUrl
  if (!dataUrl) {
    try {
      dataUrl = await QRCode.toDataURL(rt.qr, { width: 512, margin: 1 })
    } catch {
      dataUrl = null
    }
  }
  res.json({ status: 'qr', qr: dataUrl, raw: rt.qr, generatedAt: rt.qrAt, expiresInSec: 60 })
}))

// PUT /api/sessions/:id/webhook  { url }  (null or "" clears it)
router.put('/:id/webhook', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  let url = req.body ? req.body.url : undefined
  if (url === undefined) throw new HttpError(400, 'Field "url" is required (string or null)')
  url = url === null || url === '' ? null : String(url).trim()
  if (url && !/^https?:\/\//i.test(url)) {
    throw new HttpError(400, 'Webhook URL must start with http:// or https://')
  }
  const updated = await prisma.session.update({ where: { id: row.id }, data: { webhookUrl: url } })
  res.json({ ok: true, session: serialize(updated, sessionManager.getRuntime(row.id)) })
}))

// POST /api/sessions/:id/webhook/test
router.post('/:id/webhook/test', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  if (!row.webhookUrl) throw new HttpError(400, 'No webhook URL configured on this session')
  try {
    const status = await postWebhook(row.webhookUrl, samplePayload())
    res.json({ ok: true, httpStatus: status, url: row.webhookUrl })
  } catch (err) {
    res.json({ ok: false, error: err.message, url: row.webhookUrl })
  }
}))

// PUT /api/sessions/:id/bot  { enabled }
router.put('/:id/bot', ah(async (req, res) => {
  const row = await findSessionOr404(req.params.id)
  const enabled = req.body ? req.body.enabled : undefined
  if (typeof enabled !== 'boolean') throw new HttpError(400, 'Field "enabled" must be true or false')
  const updated = await prisma.session.update({ where: { id: row.id }, data: { botEnabled: enabled } })
  res.json({ ok: true, session: serialize(updated, sessionManager.getRuntime(row.id)) })
}))

module.exports = router

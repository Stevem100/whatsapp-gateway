const express = require('express')
const prisma = require('../db')
const config = require('../config')
const sessionManager = require('../wa/sessionManager')
const { HttpError, ah, normalizeToJid } = require('../utils/helpers')

const router = express.Router({ mergeParams: true })

async function findSessionOr404(id) {
  const row = await prisma.session.findUnique({ where: { id } })
  if (!row) throw new HttpError(404, 'Session not found')
  return row
}

async function loadMedia({ mediaUrl, mediaBase64, mimetype }) {
  if (mediaBase64) {
    const stripped = String(mediaBase64).replace(/^data:[^;]+;base64,/, '')
    const buffer = Buffer.from(stripped, 'base64')
    if (!buffer.length) throw new HttpError(400, 'mediaBase64 is not valid base64')
    if (buffer.length > config.maxMediaBytes) throw new HttpError(413, 'Media exceeds MAX_MEDIA_BYTES')
    return { buffer, mime: mimetype || null }
  }
  if (mediaUrl) {
    let res
    try {
      res = await fetch(String(mediaUrl), { signal: AbortSignal.timeout(30000) })
    } catch (err) {
      throw new HttpError(400, `Could not download mediaUrl: ${err.message}`)
    }
    if (!res.ok) throw new HttpError(400, `mediaUrl returned HTTP ${res.status}`)
    const len = Number(res.headers.get('content-length') || 0)
    if (len && len > config.maxMediaBytes) throw new HttpError(413, 'Media exceeds MAX_MEDIA_BYTES')
    const buffer = Buffer.from(await res.arrayBuffer())
    if (!buffer.length) throw new HttpError(400, 'Downloaded media is empty')
    if (buffer.length > config.maxMediaBytes) throw new HttpError(413, 'Media exceeds MAX_MEDIA_BYTES')
    return { buffer, mime: mimetype || res.headers.get('content-type') || null }
  }
  throw new HttpError(400, 'Provide "mediaUrl" or "mediaBase64" for this message type')
}

// GET /api/sessions/:id/messages/chats
router.get('/chats', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const [recent, counts] = await Promise.all([
    prisma.message.findMany({
      where: { sessionId: session.id },
      orderBy: { timestamp: 'desc' },
      take: 1000,
    }),
    prisma.message.groupBy({
      by: ['remoteJid'],
      where: { sessionId: session.id },
      _count: { _all: true },
    }),
  ])
  const countMap = new Map(counts.map((c) => [c.remoteJid, c._count._all]))
  const chatMap = new Map()
  for (const m of recent) {
    if (chatMap.has(m.remoteJid)) continue
    chatMap.set(m.remoteJid, {
      remoteJid: m.remoteJid,
      isGroup: m.remoteJid.endsWith('@g.us'),
      lastMessage: {
        fromMe: m.fromMe,
        type: m.type,
        body: m.body,
        timestamp: m.timestamp,
      },
      totalMessages: countMap.get(m.remoteJid) || 1,
    })
  }
  res.json({ chats: Array.from(chatMap.values()) })
}))

// GET /api/sessions/:id/messages?chatJid=&limit=&before=
router.get('/', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '50'), 10) || 50, 1), 200)
  const where = { sessionId: session.id }
  if (req.query.chatJid) where.remoteJid = String(req.query.chatJid)
  if (req.query.before) {
    const d = new Date(String(req.query.before))
    if (!Number.isNaN(d.getTime())) where.timestamp = { lt: d }
  }
  const rows = await prisma.message.findMany({
    where,
    orderBy: { timestamp: 'desc' },
    take: limit,
  })
  res.json({ messages: rows.reverse() }) // chronological order
}))

// POST /api/sessions/:id/messages
// body: { to, type: text|image|video|document|location, text, caption,
//         mediaUrl, mediaBase64, mimetype, filename, lat, lng }
router.post('/', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const body = req.body || {}
  const jid = normalizeToJid(body.to)
  const type = String(body.type || 'text').toLowerCase()

  let content
  let meta = { type, body: null, mediaMime: null }

  switch (type) {
    case 'text': {
      const text = String(body.text || '').trim()
      if (!text) throw new HttpError(400, 'Field "text" is required for type=text')
      content = { text }
      meta.body = text
      break
    }
    case 'image':
    case 'video': {
      const { buffer, mime } = await loadMedia(body)
      if (mime && !mime.startsWith(`${type}/`)) {
        throw new HttpError(400, `mimetype "${mime}" does not look like ${type}/*`)
      }
      content = { [type]: buffer, caption: body.caption || undefined, mimetype: mime || undefined }
      meta.body = body.caption || null
      meta.mediaMime = mime
      break
    }
    case 'document': {
      const { buffer, mime } = await loadMedia(body)
      const filename = String(body.filename || 'file').trim() || 'file'
      content = {
        document: buffer,
        mimetype: mime || 'application/octet-stream',
        fileName: filename,
        caption: body.caption || undefined,
      }
      meta.body = body.caption || filename
      meta.mediaMime = mime
      break
    }
    case 'location': {
      const lat = Number(body.lat)
      const lng = Number(body.lng)
      if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new HttpError(400, 'Valid numeric "lat" (-90..90) and "lng" (-180..180) are required')
      }
      content = { location: { degreesLatitude: lat, degreesLongitude: lng } }
      meta.body = `${lat},${lng}`
      break
    }
    default:
      throw new HttpError(400, 'type must be one of: text, image, video, document, location')
  }

  const stored = await sessionManager.sendMessage(session.id, jid, content, meta)
  res.status(201).json({ message: stored })
}))

module.exports = router

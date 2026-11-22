const { getContentType } = require('@whiskeysockets/baileys')

class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

// express 4 does not catch async errors automatically
const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

function normalizeToJid(to) {
  const raw = String(to || '').trim()
  if (!raw) throw new HttpError(400, 'Field "to" is required: a phone number (digits) or a full JID like 1234567890@g.us')
  if (raw.includes('@')) return raw
  const digits = raw.replace(/\D/g, '')
  if (!digits || digits.length < 6) {
    throw new HttpError(400, 'Invalid recipient: use full phone digits with country code (e.g. 15551234567) or a full JID')
  }
  return `${digits}@s.whatsapp.net`
}

function jidToPhone(jid) {
  if (!jid) return null
  return String(jid).split('@')[0].split(':')[0] || null
}

const TYPE_BY_CONTENT = {
  conversation: 'text',
  extendedTextMessage: 'text',
  imageMessage: 'image',
  videoMessage: 'video',
  audioMessage: 'audio',
  pttMessage: 'audio',
  documentMessage: 'document',
  documentWithCaptionMessage: 'document',
  locationMessage: 'location',
  liveLocationMessage: 'location',
  contactMessage: 'contact',
  contactsArrayMessage: 'contact',
  stickerMessage: 'sticker',
  reactionMessage: 'reaction',
}

const WRAPPERS = new Set([
  'viewOnceMessage',
  'viewOnceMessageV2',
  'viewOnceMessageV2Extension',
  'ephemeralMessage',
  'documentWithCaptionMessage',
])

function unwrapContent(content) {
  let node = content
  for (let depth = 0; depth < 6 && node; depth++) {
    const ct = getContentType(node)
    if (!ct) return [null, null]
    if (WRAPPERS.has(ct)) {
      const inner = node[ct] && node[ct].message
      if (!inner) return [ct, node[ct]]
      node = inner
      continue
    }
    return [ct, node[ct]]
  }
  return [null, null]
}

function classifyMessage(messageObj) {
  const empty = { type: 'other', body: null, mediaMime: null }
  if (!messageObj) return empty
  const [ct, payload] = unwrapContent(messageObj)
  if (!ct || !payload) return empty
  const type = TYPE_BY_CONTENT[ct] || 'other'
  let body = null
  let mediaMime = null
  if (type === 'text') {
    body = ct === 'conversation' ? payload : payload.text || null
  } else if (type === 'image' || type === 'video' || type === 'document') {
    body = payload.caption || null
    mediaMime = payload.mimetype || null
  } else if (type === 'audio' || type === 'sticker') {
    mediaMime = payload.mimetype || null
  } else if (type === 'location') {
    body = payload.address || `${payload.degreesLatitude || '?'},${payload.degreesLongitude || '?'}`
  } else if (type === 'contact') {
    body = payload.displayName || null
  } else if (type === 'reaction') {
    body = payload.text || null
  }
  return { type, body: body || null, mediaMime: mediaMime || null }
}

const MESSAGE_STATUS_BY_CODE = { 0: 'failed', 2: 'sent', 3: 'delivered', 4: 'read', 5: 'read' }

module.exports = { HttpError, ah, normalizeToJid, jidToPhone, classifyMessage, MESSAGE_STATUS_BY_CODE }

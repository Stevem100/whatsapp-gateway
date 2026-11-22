const crypto = require('crypto')
const config = require('./config')

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest()
  const hb = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

// API key check: header "x-api-key" or query "?api_key="
function requireApiKey(req, res, next) {
  const provided = req.get('x-api-key') || req.query.api_key || ''
  if (!provided || !safeEqual(provided, config.apiKey)) {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid x-api-key header' })
  }
  next()
}

module.exports = { requireApiKey }

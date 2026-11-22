require('dotenv').config()

const config = {
  port: parseInt(process.env.PORT || '3030', 10),
  // The gateway always uses its own SQLite file, ignoring any globally
  // exported DATABASE_URL. Override with GATEWAY_DATABASE_URL if needed.
  dbUrl: process.env.GATEWAY_DATABASE_URL || 'file:../db/gateway.db',
  apiKey: process.env.API_KEY || 'wg-dev-key-change-me',
  apiKeyHint: process.env.API_KEY_HINT || '',
  autoReconnect: (process.env.AUTO_RECONNECT || 'true').toLowerCase() === 'true',
  reconnectMaxAttempts: parseInt(process.env.RECONNECT_MAX_ATTEMPTS || '8', 10),
  reconnectDelayMs: parseInt(process.env.RECONNECT_DELAY_MS || '5000', 10),
  maxMediaBytes: parseInt(process.env.MAX_MEDIA_BYTES || String(25 * 1024 * 1024), 10),
}

module.exports = config

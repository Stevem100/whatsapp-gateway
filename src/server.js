const express = require('express')
const cors = require('cors')

const config = require('./config')
const prisma = require('./db')
const { requireApiKey } = require('./apikey')
const { HttpError, ah } = require('./utils/helpers')
const dashboard = require('./dashboard')
const sessionManager = require('./wa/sessionManager')

const sessionsRouter = require('./routes/sessions')
const messagesRouter = require('./routes/messages')
const rulesRouter = require('./routes/rules')
const groupsRouter = require('./routes/groups')
const storesRouter = require('./routes/stores')
const ordersRouter = require('./routes/orders')
const broadcastsRouter = require('./routes/broadcasts')
const botRouter = require('./routes/bot')

function buildApp() {
  const app = express()
  app.use(cors())
  app.use(express.json({ limit: '25mb' }))

  // Landing page: dashboard UI (the old JSON status lives on at /api/health)
  app.get('/', (req, res) => {
    res.type('html').send(dashboard.dashboardHtml())
  })

  // Swagger UI rendering docs/openapi.yaml
  app.get('/docs', (req, res) => {
    res.type('html').send(dashboard.docsHtml())
  })

  app.get('/api/openapi.yaml', (req, res) => {
    res.type('text/yaml').send(dashboard.openapiYaml())
  })

  // wrapped in ah() so a Prisma failure returns a 500 JSON error instead of
  // becoming an unhandled rejection that kills the whole process (Node >= 15)
  app.get('/api/health', ah(async (req, res) => {
    const sessions = await prisma.session.findMany({ select: { status: true } })
    res.json({
      ok: true,
      service: 'whatsapp-gateway',
      version: '1.0.0',
      uptimeSec: Math.floor(process.uptime()),
      authRequired: true,
      keyHint: config.apiKeyHint || null,
      node: process.version,
      cwd: process.cwd(),
      sessions: {
        total: sessions.length,
        connected: sessions.filter((s) => s.status === 'connected').length,
      },
    })
  }))

  app.use('/api/sessions/:id/groups', requireApiKey, groupsRouter)
  app.use('/api/sessions/:id/messages', requireApiKey, messagesRouter)
  app.use('/api/sessions/:id/rules', requireApiKey, rulesRouter)
  app.use('/api/sessions', requireApiKey, sessionsRouter)
  app.use('/api/stores', requireApiKey, storesRouter)
  app.use('/api/orders', requireApiKey, ordersRouter)
  app.use('/api/broadcasts', requireApiKey, broadcastsRouter)
  app.use('/api/bot', requireApiKey, botRouter)

  app.use((req, res) => {
    res.status(404).json({ error: `Not found: ${req.method} ${req.path}` })
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
      return res.status(err.status).json({ error: err.message })
    }
    if (typeof err.status === 'number' && err.status >= 400 && err.status < 600) {
      return res.status(err.status).json({ error: err.message })
    }
    if (err.type === 'entity.too.large') {
      return res.status(413).json({ error: 'Request body too large (max 25MB)' })
    }
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
    console.error(`[http] ${req.method} ${req.path} failed:`, err.message)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  })

  return app
}

function startServer() {
  const app = buildApp()
  const server = app.listen(config.port, () => {
    console.log(`[gateway] WhatsApp gateway listening on http://localhost:${config.port}`)
    console.log(`[gateway] API base: /api  |  auth: x-api-key  |  db: ${config.autoReconnect ? 'auto-reconnect on' : 'auto-reconnect off'}`)
  })

  const shutdown = async (signal) => {
    console.log(`[gateway] ${signal} received, shutting down...`)
    try {
      await sessionManager.stopAllSessions()
      await prisma.$disconnect()
    } catch {
      /* ignore */
    }
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(0), 3000).unref()
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))

  // Keep the gateway alive on stray async errors. Node >= 15 terminates the
  // process on an unhandled rejection by default, which on cPanel/LiteSpeed
  // leaves the site serving 503 until a manual restart.
  process.on('unhandledRejection', (reason) => {
    console.error('[gateway] unhandledRejection:', reason)
  })
  process.on('uncaughtException', (err) => {
    console.error('[gateway] uncaughtException:', err)
  })

  sessionManager.resumeSessions().catch((err) =>
    console.error(`[gateway] boot resume failed: ${err.message}`)
  )

  return server
}

module.exports = { buildApp, startServer }

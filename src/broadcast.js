// Broadcast worker: delivers one message to many chats sequentially with a
// randomised delay between sends (anti-ban). Jobs live in the Broadcast table;
// progress is written to the DB after every send so the dashboard can poll it.
const prisma = require('./db')
const sessionManager = require('./wa/sessionManager')
const { normalizeToJid } = require('./utils/helpers')

const running = new Set() // broadcast ids currently in-flight in this process

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function runJob(broadcastId) {
  if (running.has(broadcastId)) return
  running.add(broadcastId)
  try {
    const job = await prisma.broadcast.findUnique({ where: { id: broadcastId } })
    if (!job || job.status !== 'queued') return

    const targets = JSON.parse(job.targets || '[]')
    await prisma.broadcast.update({
      where: { id: broadcastId },
      data: { status: 'running', startedAt: new Date(), total: targets.length },
    })

    const results = []
    let sent = 0
    let failed = 0
    let cancelled = false

    for (let i = 0; i < targets.length; i++) {
      // re-read status so a cancel request stops the run promptly
      const current = await prisma.broadcast.findUnique({ where: { id: broadcastId }, select: { status: true } })
      if (!current || current.status === 'cancelled') {
        cancelled = true
        break
      }
      const target = targets[i]
      try {
        await sessionManager.sendMessage(job.sessionId, target, { text: job.message }, { type: 'text', body: job.message })
        sent += 1
        results.push({ target, ok: true })
      } catch (err) {
        failed += 1
        results.push({ target, ok: false, error: err.message })
      }
      await prisma.broadcast.update({
        where: { id: broadcastId },
        data: { sent, failed, results: JSON.stringify(results) },
      })
      if (i < targets.length - 1) {
        const min = Math.max(500, job.minDelayMs || 1500)
        const max = Math.max(min, job.maxDelayMs || min + 500)
        await sleep(min + Math.floor(Math.random() * (max - min)))
      }
    }

    await prisma.broadcast.update({
      where: { id: broadcastId },
      data: {
        status: cancelled ? 'cancelled' : 'done',
        finishedAt: new Date(),
        results: JSON.stringify(results),
      },
    })
  } catch (err) {
    console.error(`[broadcast] job ${broadcastId} crashed: ${err.message}`)
    await prisma.broadcast.update({
      where: { id: broadcastId },
      data: { status: 'failed', finishedAt: new Date() },
    }).catch(() => {})
  } finally {
    running.delete(broadcastId)
  }
}

// Creates + validates the job row, then kicks off the runner.
async function createBroadcast({ sessionId, message, targets, minDelayMs, maxDelayMs }) {
  if (!sessionId) throw badRequest('Field "sessionId" is required')
  if (!message || !String(message).trim()) throw badRequest('Field "message" is required')
  if (!Array.isArray(targets) || !targets.length) {
    throw badRequest('Field "targets" is required: an array of phone numbers or JIDs (phones and @g.us groups)')
  }
  if (targets.length > 500) throw badRequest('Too many targets (max 500 per broadcast)')
  // accept session id or unique session name
  const session = await prisma.session.findFirst({
    where: { OR: [{ id: sessionId }, { name: sessionId }] },
  })
  if (!session) {
    const err = new Error('Session not found')
    err.status = 404
    throw err
  }
  // session must be connected — sending will fail otherwise
  if (session.status !== 'connected') {
    const err = new Error('Session is not connected. Connect it and scan the QR code first.')
    err.status = 409
    throw err
  }
  const jids = targets.map((t) => normalizeToJid(t))
  const row = await prisma.broadcast.create({
    data: {
      sessionId: session.id,
      message: String(message),
      targets: JSON.stringify(jids),
      total: jids.length,
      minDelayMs: Math.max(500, Number(minDelayMs) || 1500),
      maxDelayMs: Math.max(500, Number(maxDelayMs) || 4000),
    },
  })
  runJob(row.id).catch((err) => console.error(`[broadcast] job ${row.id} failed to start: ${err.message}`))
  return row
}

function badRequest(message) {
  const err = new Error(message)
  err.status = 400
  return err
}

module.exports = { createBroadcast, runJob }

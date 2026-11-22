// Bulk-send jobs: one message, many chats/groups, sequential delivery with
// jitter delays. Progress is tracked in the Broadcast table.
const express = require('express')
const prisma = require('../db')
const broadcast = require('../broadcast')
const { HttpError, ah } = require('../utils/helpers')

const router = express.Router()

function serialize(row, { includeDetail = false } = {}) {
  const base = {
    id: row.id,
    sessionId: row.sessionId,
    message: row.message,
    status: row.status,
    minDelayMs: row.minDelayMs,
    maxDelayMs: row.maxDelayMs,
    total: row.total,
    sent: row.sent,
    failed: row.failed,
    createdAt: row.createdAt,
    startedAt: row.startedAt,
    finishedAt: row.finishedAt,
  }
  if (includeDetail) {
    base.targets = JSON.parse(row.targets || '[]')
    base.results = row.results ? JSON.parse(row.results) : null
  }
  return base
}

// GET /api/broadcasts?sessionId=&limit=
router.get('/', ah(async (req, res) => {
  const where = req.query.sessionId ? { sessionId: String(req.query.sessionId) } : {}
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '50'), 10) || 50, 1), 200)
  const rows = await prisma.broadcast.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit })
  res.json({ broadcasts: rows.map((r) => serialize(r)) })
}))

// POST /api/broadcasts  { sessionId, message, targets[], minDelayMs?, maxDelayMs? }
router.post('/', ah(async (req, res) => {
  const row = await broadcast.createBroadcast(req.body || {})
  res.status(201).json({ broadcast: serialize(row, { includeDetail: true }) })
}))

// GET /api/broadcasts/:id
router.get('/:id', ah(async (req, res) => {
  const row = await prisma.broadcast.findUnique({ where: { id: req.params.id } })
  if (!row) throw new HttpError(404, 'Broadcast not found')
  res.json({ broadcast: serialize(row, { includeDetail: true }) })
}))

// POST /api/broadcasts/:id/cancel
router.post('/:id/cancel', ah(async (req, res) => {
  const row = await prisma.broadcast.findUnique({ where: { id: req.params.id } })
  if (!row) throw new HttpError(404, 'Broadcast not found')
  if (row.status !== 'queued' && row.status !== 'running') {
    throw new HttpError(409, `Broadcast is already ${row.status}`)
  }
  const updated = await prisma.broadcast.update({
    where: { id: row.id },
    data: { status: row.status === 'queued' ? 'cancelled' : 'cancelled' },
  })
  res.json({ ok: true, broadcast: serialize(updated) })
}))

// DELETE /api/broadcasts/:id
router.delete('/:id', ah(async (req, res) => {
  const row = await prisma.broadcast.findUnique({ where: { id: req.params.id } })
  if (!row) throw new HttpError(404, 'Broadcast not found')
  if (row.status === 'running') throw new HttpError(409, 'Broadcast is still running — cancel it first')
  await prisma.broadcast.delete({ where: { id: row.id } })
  res.json({ ok: true })
}))

module.exports = router

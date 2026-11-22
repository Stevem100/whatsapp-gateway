const express = require('express')
const prisma = require('../db')
const { HttpError, ah } = require('../utils/helpers')

const router = express.Router({ mergeParams: true })

const MATCH_TYPES = ['exact', 'contains', 'starts_with', 'regex']

async function findSessionOr404(id) {
  const row = await prisma.session.findUnique({ where: { id } })
  if (!row) throw new HttpError(404, 'Session not found')
  return row
}

function validateRule(body, { partial = false } = {}) {
  const out = {}
  if (!partial || body.matchType !== undefined) {
    const matchType = String(body.matchType || 'contains')
    if (!MATCH_TYPES.includes(matchType)) {
      throw new HttpError(400, `matchType must be one of: ${MATCH_TYPES.join(', ')}`)
    }
    out.matchType = matchType
  }
  if (!partial || body.keyword !== undefined) {
    const keyword = String(body.keyword || '').trim()
    if (!keyword) throw new HttpError(400, 'Field "keyword" is required')
    out.keyword = keyword
  }
  if (!partial || body.reply !== undefined) {
    const reply = String(body.reply || '')
    if (!reply.trim()) throw new HttpError(400, 'Field "reply" is required')
    out.reply = reply
  }
  if (body.enabled !== undefined) {
    if (typeof body.enabled !== 'boolean') throw new HttpError(400, '"enabled" must be a boolean')
    out.enabled = body.enabled
  }
  if (body.priority !== undefined) {
    const priority = Number(body.priority)
    if (!Number.isInteger(priority)) throw new HttpError(400, '"priority" must be an integer')
    out.priority = priority
  }
  if (out.matchType === 'regex') {
    try {
      new RegExp(out.keyword, 'i')
    } catch {
      throw new HttpError(400, `"${out.keyword}" is not a valid regular expression`)
    }
  }
  return out
}

// GET /api/sessions/:id/rules
router.get('/', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const rules = await prisma.botRule.findMany({
    where: { sessionId: session.id },
    orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
  })
  res.json({ rules })
}))

// POST /api/sessions/:id/rules
router.post('/', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const data = validateRule(req.body || {})
  const rule = await prisma.botRule.create({ data: { ...data, sessionId: session.id } })
  res.status(201).json({ rule })
}))

// PATCH /api/sessions/:id/rules/:ruleId
router.patch('/:ruleId', ah(async (req, res) => {
  await findSessionOr404(req.params.id)
  const existing = await prisma.botRule.findUnique({ where: { id: req.params.ruleId } })
  if (!existing || existing.sessionId !== req.params.id) throw new HttpError(404, 'Rule not found')
  const data = validateRule(req.body || {}, { partial: true })
  const rule = await prisma.botRule.update({ where: { id: existing.id }, data })
  res.json({ rule })
}))

// DELETE /api/sessions/:id/rules/:ruleId
router.delete('/:ruleId', ah(async (req, res) => {
  await findSessionOr404(req.params.id)
  const existing = await prisma.botRule.findUnique({ where: { id: req.params.ruleId } })
  if (!existing || existing.sessionId !== req.params.id) throw new HttpError(404, 'Rule not found')
  await prisma.botRule.delete({ where: { id: existing.id } })
  res.json({ ok: true })
}))

module.exports = router

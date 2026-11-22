// Group community management: list groups, metadata, join via invite link,
// leave, invite link, participant management. Requires a connected session.
const express = require('express')
const prisma = require('../db')
const sessionManager = require('../wa/sessionManager')
const { HttpError, ah } = require('../utils/helpers')

const router = express.Router({ mergeParams: true })

// Resolve a session by its id OR by its unique name (nicer for raw API/curl use).
async function findSessionOr404(idOrName) {
  const row = await prisma.session.findFirst({
    where: { OR: [{ id: idOrName }, { name: idOrName }] },
  })
  if (!row) throw new HttpError(404, 'Session not found')
  return row
}

// GET /api/sessions/:id/groups
router.get('/', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const groups = await sessionManager.listGroups(session.id)
  res.json({ groups })
}))

// POST /api/sessions/:id/groups/join  { code }  (invite code or full link)
router.post('/join', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const code = req.body ? req.body.code : undefined
  if (!code) throw new HttpError(400, 'Field "code" is required: invite code or https://chat.whatsapp.com/… link')
  const result = await sessionManager.joinGroup(session.id, code)
  res.json({ ok: true, ...result })
}))

// GET /api/sessions/:id/groups/:jid — metadata + participants
router.get('/:jid', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const group = await sessionManager.getGroupMeta(session.id, req.params.jid)
  res.json({ group })
}))

// POST /api/sessions/:id/groups/:jid/leave
router.post('/:jid/leave', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const result = await sessionManager.leaveGroup(session.id, req.params.jid)
  res.json({ ok: true, ...result })
}))

// GET /api/sessions/:id/groups/:jid/invite
router.get('/:jid/invite', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const result = await sessionManager.groupInviteCode(session.id, req.params.jid)
  res.json({ ok: true, ...result })
}))

// POST /api/sessions/:id/groups/:jid/participants  { action, participants[] }
router.post('/:jid/participants', ah(async (req, res) => {
  const session = await findSessionOr404(req.params.id)
  const body = req.body || {}
  const results = await sessionManager.updateGroupParticipants(
    session.id,
    req.params.jid,
    String(body.action || ''),
    body.participants
  )
  res.json({ ok: true, results })
}))

module.exports = router

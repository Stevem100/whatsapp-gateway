// Bot pipeline test endpoint: run the commerce bot (and keyword rules) against
// a simulated incoming message without sending anything to WhatsApp by default.
// dryRun=false actually delivers the reply from the session's real socket.
const express = require('express')
const prisma = require('../db')
const sessionManager = require('../wa/sessionManager')
const { runCommerceBot } = require('../bot/commerce')
const { runAutoReply } = require('../bot/autoReply')
const { HttpError, ah } = require('../utils/helpers')

const router = express.Router()

// POST /api/bot/test  { sessionId, chatJid, text, dryRun? }
router.post('/test', ah(async (req, res) => {
  const body = req.body || {}
  const sessionId = String(body.sessionId || '').trim()
  const chatJid = String(body.chatJid || '').trim()
  const text = String(body.text || '').trim()
  const dryRun = body.dryRun === undefined ? true : !!body.dryRun
  if (!sessionId) throw new HttpError(400, 'Field "sessionId" is required')
  if (!chatJid) throw new HttpError(400, 'Field "chatJid" is required (customer phone digits or full JID)')
  if (!text) throw new HttpError(400, 'Field "text" is required')

  const session = await prisma.session.findUnique({ where: { id: sessionId } })
  if (!session) throw new HttpError(404, 'Session not found')

  const normalizedJid = chatJid.includes('@') ? chatJid : `${chatJid.replace(/\D/g, '')}@s.whatsapp.net`
  const ctx = { remoteJid: normalizedJid, body: text, pushName: body.pushName || 'Test Customer' }

  const sock = dryRun ? null : sessionManager.requireConnectedSocket(sessionId)

  const commerce = await runCommerceBot(session, sock, ctx, { dryRun })
  if (commerce) {
    return res.json({
      handled: 'commerce',
      action: commerce.action,
      reply: commerce.reply,
      orderId: commerce.order ? commerce.order.id : null,
      orderNumber: commerce.order ? commerce.order.number : null,
      dryRun,
    })
  }

  if (!dryRun) {
    const rule = await runAutoReply(session, sock, { remoteJid: normalizedJid, fromMe: false, body: text })
    if (rule) {
      return res.json({ handled: 'rule', ruleId: rule.id, keyword: rule.keyword, reply: rule.reply, dryRun })
    }
    return res.json({ handled: null, reply: null, dryRun })
  }

  // dry run: match rules without sending, cooldown or hits increment
  const { findMatchingRule } = require('../bot/autoReply')
  const rule = await findMatchingRule(session.id, text)
  if (rule) {
    return res.json({ handled: 'rule', ruleId: rule.id, keyword: rule.keyword, reply: rule.reply, dryRun })
  }
  res.json({ handled: null, reply: null, dryRun })
}))

module.exports = router

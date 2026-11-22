// Auto-reply bot: matches incoming message text against the session's
// enabled rules (highest priority first) and replies with the first hit.
const prisma = require('../db')

const MATCHERS = {
  exact: (t, kw) => t.toLowerCase() === kw.toLowerCase(),
  contains: (t, kw) => t.toLowerCase().includes(kw.toLowerCase()),
  starts_with: (t, kw) => t.toLowerCase().startsWith(kw.toLowerCase()),
  regex: (t, kw) => {
    try {
      return new RegExp(kw, 'i').test(t)
    } catch {
      return false
    }
  },
}

// Anti-loop cooldown: at most one auto-reply per chat per 3 seconds.
const cooldowns = new Map()
const COOLDOWN_MS = 3000

// Find the first enabled rule matching the text (priority desc, then oldest).
async function findMatchingRule(sessionId, text) {
  const rules = await prisma.botRule.findMany({
    where: { sessionId, enabled: true },
    orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
  })
  for (const rule of rules) {
    const matcher = MATCHERS[rule.matchType]
    if (!matcher) continue
    if (matcher(text, rule.keyword)) return rule
  }
  return null
}

async function runAutoReply(session, sock, incoming) {
  if (!session || !session.botEnabled || !sock) return null
  if (incoming.fromMe) return null
  const text = (incoming.body || '').trim()
  if (!text) return null
  const jid = incoming.remoteJid
  if (jid.endsWith('@broadcast') || jid.endsWith('@newsletter')) return null

  const cooldownKey = `${session.id}:${jid}`
  const last = cooldowns.get(cooldownKey) || 0
  const now = Date.now()
  if (now - last < COOLDOWN_MS) return null

  const rule = await findMatchingRule(session.id, text)
  if (!rule) return null

  cooldowns.set(cooldownKey, now)
  try {
    await sock.sendMessage(jid, { text: rule.reply })
  } catch (err) {
    console.log(`[bot] failed to reply for rule ${rule.id}: ${err.message}`)
    return null
  }
  await prisma.botRule.update({ where: { id: rule.id }, data: { hits: { increment: 1 } } })
  return rule
}

module.exports = { runAutoReply, findMatchingRule }

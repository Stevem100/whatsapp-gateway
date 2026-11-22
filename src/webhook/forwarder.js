const config = require('../config')

async function postWebhook(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  })
  return res.status
}

// Fire-and-forget event forwarding to the session's configured webhook URL.
async function forwardEvent(session, event, data) {
  const url = session && session.webhookUrl
  if (!url) return
  const payload = {
    event,
    sessionId: session.id,
    session: session.name,
    timestamp: new Date().toISOString(),
    data,
  }
  try {
    const status = await postWebhook(url, payload)
    console.log(`[webhook] ${event} -> "${session.name}" HTTP ${status}`)
  } catch (err) {
    console.log(`[webhook] ${event} -> "${session.name}" failed: ${err.message}`)
  }
}

module.exports = { forwardEvent, postWebhook, samplePayload: () => ({
  event: 'webhook.test',
  sessionId: 'test-session-id',
  session: 'test-session',
  timestamp: new Date().toISOString(),
  data: {
    id: 'TESTMESSAGEID',
    remoteJid: '15551234567@s.whatsapp.net',
    fromMe: false,
    type: 'text',
    body: 'Hello from the WhatsApp gateway webhook test',
    timestamp: new Date().toISOString(),
  },
}) }

// Orders created from WhatsApp chats: list, inspect, mark paid, cancel and
// notify the customer. Paid/cancelled states are pushed back to the external
// platform (WooCommerce/Shopify) and announced to the customer in chat.
const express = require('express')
const prisma = require('../db')
const stores = require('../stores')
const sessionManager = require('../wa/sessionManager')
const { HttpError, ah, normalizeToJid } = require('../utils/helpers')
const { forwardEvent } = require('../webhook/forwarder')

const router = express.Router()

function serialize(row) {
  const store = row.store || null
  return {
    id: row.id,
    number: row.number,
    sessionId: row.sessionId,
    storeId: row.storeId,
    store: store ? { id: store.id, name: store.name, type: store.type, currency: store.currency } : null,
    externalOrderId: row.externalOrderId,
    chatJid: row.chatJid,
    customerName: row.customerName,
    items: stores.safeParseJson(row.items, []),
    subtotal: row.subtotal,
    total: row.total,
    currency: row.currency,
    status: row.status,
    paymentStatus: row.paymentStatus,
    paymentProvider: row.paymentProvider,
    paymentUrl: row.paymentUrl,
    paymentRef: row.paymentRef,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

async function findOrderOr404(id) {
  const row = await prisma.order.findUnique({ where: { id }, include: { store: true } })
  if (!row) throw new HttpError(404, 'Order not found')
  return row
}

async function loadSession(sessionId) {
  // sessionId may be an id or a unique session name
  return prisma.session.findFirst({
    where: { OR: [{ id: sessionId }, { name: sessionId }] },
  })
}

// Best-effort WhatsApp notification to the customer chat.
async function notifyCustomer(order, text) {
  try {
    await sessionManager.sendMessage(order.sessionId, order.chatJid, { text }, { type: 'text', body: text })
    return true
  } catch (err) {
    console.log(`[orders] customer notification for order #${order.number} failed: ${err.message}`)
    return false
  }
}

// GET /api/orders?sessionId=&storeId=&chatJid=&status=&paymentStatus=&limit=
router.get('/', ah(async (req, res) => {
  const where = {}
  if (req.query.sessionId) where.sessionId = String(req.query.sessionId)
  if (req.query.storeId) where.storeId = String(req.query.storeId)
  if (req.query.chatJid) where.chatJid = String(req.query.chatJid)
  if (req.query.status) where.status = String(req.query.status)
  if (req.query.paymentStatus) where.paymentStatus = String(req.query.paymentStatus)
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '50'), 10) || 50, 1), 200)
  const rows = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { store: { select: { id: true, name: true, type: true, currency: true } } },
  })
  res.json({ orders: rows.map(serialize) })
}))

// GET /api/orders/:id
router.get('/:id', ah(async (req, res) => {
  const row = await findOrderOr404(req.params.id)
  res.json({ order: serialize(row) })
}))

// POST /api/orders/:id/mark-paid  { paymentRef?, notify? }
router.post('/:id/mark-paid', ah(async (req, res) => {
  const row = await findOrderOr404(req.params.id)
  const body = req.body || {}
  if (row.paymentStatus === 'paid') {
    return res.json({ ok: true, order: serialize(row), alreadyPaid: true })
  }
  const paymentRef = body.paymentRef ? String(body.paymentRef).slice(0, 120) : null
  const updated = await prisma.order.update({
    where: { id: row.id },
    data: { paymentStatus: 'paid', status: row.status === 'pending' ? 'paid' : row.status, paymentRef },
    include: { store: true },
  })

  const externalUpdated = await stores
    .updateExternalStatus(updated.store, updated.externalOrderId, 'paid')
    .catch(() => false)

  const session = await loadSession(updated.sessionId)
  await forwardEvent(session, 'order.paid', {
    id: updated.id,
    number: updated.number,
    chatJid: updated.chatJid,
    total: updated.total,
    currency: updated.currency,
    paymentRef,
    externalOrderId: updated.externalOrderId,
    externalUpdated,
  })

  let notified = false
  if (body.notify !== false) {
    notified = await notifyCustomer(updated, `Payment received for order #${updated.number} (${updated.currency} ${updated.total}). Thank you! We are processing it now.`)
  }
  res.json({ ok: true, order: serialize(updated), externalUpdated, notified })
}))

// POST /api/orders/:id/cancel  { notify?, reason? }
router.post('/:id/cancel', ah(async (req, res) => {
  const row = await findOrderOr404(req.params.id)
  if (row.status === 'cancelled') {
    return res.json({ ok: true, order: serialize(row), alreadyCancelled: true })
  }
  if (row.paymentStatus === 'paid') {
    throw new HttpError(409, 'Order is already paid — refund it in the store platform, then cancel here')
  }
  const updated = await prisma.order.update({
    where: { id: row.id },
    data: { status: 'cancelled', paymentStatus: 'failed' },
    include: { store: true },
  })

  const externalUpdated = await stores
    .updateExternalStatus(updated.store, updated.externalOrderId, 'cancelled')
    .catch(() => false)

  const session = await loadSession(updated.sessionId)
  await forwardEvent(session, 'order.cancelled', {
    id: updated.id,
    number: updated.number,
    chatJid: updated.chatJid,
    by: 'merchant',
    reason: req.body && req.body.reason ? String(req.body.reason).slice(0, 300) : null,
  })

  let notified = false
  if (!(req.body && req.body.notify === false)) {
    notified = await notifyCustomer(updated, `Order #${updated.number} has been cancelled by the shop. Reply "catalog" any time to shop again.`)
  }
  res.json({ ok: true, order: serialize(updated), externalUpdated, notified })
}))

// POST /api/orders/:id/notify  { text }
router.post('/:id/notify', ah(async (req, res) => {
  const row = await findOrderOr404(req.params.id)
  const text = String((req.body && req.body.text) || '').trim()
  if (!text) throw new HttpError(400, 'Field "text" is required')
  const notified = await notifyCustomer(row, text)
  res.json({ ok: notified, notified })
}))

// POST /api/orders/:id/payment-link — resend the payment URL / instructions
router.post('/:id/payment-link', ah(async (req, res) => {
  const row = await findOrderOr404(req.params.id)
  if (row.paymentStatus === 'paid') throw new HttpError(409, 'Order is already paid')
  if (row.status === 'cancelled') throw new HttpError(409, 'Order is cancelled')
  const message = row.paymentUrl
    ? `Payment link for order #${row.number} (${row.currency} ${row.total}): ${row.paymentUrl}`
    : `Payment details for order #${row.number}: ${row.paymentProvider === 'manual' ? 'check the instructions sent at checkout, or contact the shop.' : 'payment link will follow shortly.'}`
  const notified = await notifyCustomer(row, message)
  res.json({ ok: notified, notified, message })
}))

module.exports = router

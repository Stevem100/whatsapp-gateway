// Store orchestrator: dispatches to the platform connectors and builds the
// payment step (store-native payment page, Stripe Checkout, or manual
// instructions such as M-Pesa paybill details).
const prisma = require('../db')
const { HttpError } = require('../utils/helpers')

const woocommerce = require('./woocommerce')
const shopify = require('./shopify')
const custom = require('./custom')

const CONNECTORS = { woocommerce, shopify, custom }
const STORE_TYPES = ['manual', 'woocommerce', 'shopify', 'custom']
const PAYMENT_PROVIDERS = ['store', 'manual', 'stripe']

function getConnector(store) {
  return CONNECTORS[store.type] || null
}

function parseJson(str, fallback = {}) {
  try {
    return str ? JSON.parse(str) : { ...fallback }
  } catch {
    return { ...fallback }
  }
}

const safeParseJson = parseJson

async function getStoreOr404(id) {
  const store = await prisma.store.findUnique({ where: { id } })
  if (!store) throw new HttpError(404, 'Store not found')
  return store
}

// ------------------------------------------------------------ connection test

async function testConnection(store) {
  const connector = getConnector(store)
  if (!connector) {
    return { ok: true, message: 'Manual store: manage products via the products API, no external platform.' }
  }
  return connector.testConnection(store)
}

// ---------------------------------------------------------------- products

async function syncProducts(store) {
  const connector = getConnector(store)
  if (!connector) {
    throw new HttpError(400, 'Manual stores have no platform to sync from — create products via POST /api/stores/:id/products')
  }
  return connector.syncProducts(store)
}

// ----------------------------------------------------------------- orders

async function nextOrderNumber() {
  const agg = await prisma.order.aggregate({ _max: { number: true } })
  let n = (agg._max.number || 0) + 1
  while (await prisma.order.findUnique({ where: { number: n } })) n += 1
  return n
}

// Creates the order in the external platform (when connected) and returns
// { externalId, externalNumber, paymentUrl, total, currency }.
async function createExternalOrder(store, payload) {
  const connector = getConnector(store)
  if (!connector) {
    return { externalId: null, externalNumber: null, paymentUrl: null, total: payload.total, currency: store.currency }
  }
  return connector.createStoreOrder(store, payload)
}

async function updateExternalStatus(store, externalOrderId, gatewayStatus) {
  const connector = getConnector(store)
  if (!connector || !externalOrderId) return false
  return connector.updateExternalStatus(store, externalOrderId, gatewayStatus)
}

// --------------------------------------------------------------- payments

async function createStripeCheckout(store, { items, currency, orderNumber, customerPhone }) {
  const cfg = parseJson(store.paymentConfig)
  if (!cfg.secretKey) throw new HttpError(400, 'Stripe provider needs paymentConfig.secretKey (sk_live_… / sk_test_…)')
  const successUrl = cfg.successUrl || store.baseUrl || 'https://example.com/success'
  const cancelUrl = cfg.cancelUrl || successUrl
  const params = new URLSearchParams()
  params.set('mode', 'payment')
  params.set('success_url', successUrl)
  params.set('cancel_url', cancelUrl)
  params.set('client_reference_id', `wa-order-${orderNumber}`)
  if (customerPhone) params.set('customer_email', '') // keep empty; phone-only customers
  items.forEach((item, idx) => {
    params.set(`line_items[${idx}][quantity]`, String(item.qty))
    params.set(`line_items[${idx}][price_data][currency]`, String(currency || store.currency).toLowerCase())
    params.set(`line_items[${idx}][price_data][unit_amount]`, String(Math.round(Number(item.price) * 100)))
    params.set(`line_items[${idx}][price_data][product_data][name]`, String(item.name).slice(0, 120))
  })
  let res
  try {
    res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${cfg.secretKey}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      signal: AbortSignal.timeout(25000),
    })
  } catch (err) {
    throw new HttpError(502, `Stripe request failed: ${err.message}`)
  }
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const msg = data && data.error && data.error.message ? data.error.message : `Stripe returned HTTP ${res.status}`
    throw new HttpError(res.status >= 500 ? 502 : 400, msg)
  }
  return data.url
}

// Resolves the payment step for an order: a hosted payment URL and/or
// instructions to print in the WhatsApp reply.
async function buildPayment(store, { items, total, currency, orderNumber, externalPaymentUrl, chatPhone }) {
  const provider = PAYMENT_PROVIDERS.includes(store.paymentProvider) ? store.paymentProvider : 'store'
  if (provider === 'stripe') {
    const url = await createStripeCheckout(store, { items, currency, orderNumber, customerPhone: chatPhone })
    return { provider, url, instructions: null }
  }
  if (provider === 'manual') {
    const cfg = parseJson(store.paymentConfig)
    return { provider, url: null, instructions: cfg.instructions || 'Pay manually, then send your transaction code here. We confirm and ship.' }
  }
  // provider === 'store': use the platform-native payment page
  return { provider, url: externalPaymentUrl || null, instructions: externalPaymentUrl ? null : 'Payment link is not available yet — we will send it shortly.' }
}

module.exports = {
  STORE_TYPES,
  PAYMENT_PROVIDERS,
  getStoreOr404,
  testConnection,
  syncProducts,
  nextOrderNumber,
  createExternalOrder,
  updateExternalStatus,
  buildPayment,
  safeParseJson,
}

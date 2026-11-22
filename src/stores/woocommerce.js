// WooCommerce connector — WordPress WooCommerce REST API v3.
// Auth: HTTP Basic with consumer key/secret (read/write REST key from
// WooCommerce > Settings > Advanced > REST API).
const prisma = require('../db')
const { HttpError } = require('../utils/helpers')

function parseCredentials(store) {
  let creds = {}
  try {
    creds = JSON.parse(store.credentials || '{}')
  } catch {
    creds = {}
  }
  return creds
}

function base(store) {
  return String(store.baseUrl || '').replace(/\/+$/, '')
}

function requireWooConfig(store) {
  const creds = parseCredentials(store)
  if (!store.baseUrl) throw new HttpError(400, 'Store has no baseUrl configured')
  if (!creds.consumerKey || !creds.consumerSecret) {
    throw new HttpError(400, 'WooCommerce credentials need consumerKey and consumerSecret')
  }
  return creds
}

async function wooRequest(store, path, { method = 'GET', body } = {}) {
  const creds = requireWooConfig(store)
  const auth = Buffer.from(`${creds.consumerKey}:${creds.consumerSecret}`).toString('base64')
  let res
  try {
    res = await fetch(`${base(store)}/wp-json/wc/v3${path}`, {
      method,
      headers: {
        'content-type': 'application/json',
        authorization: `Basic ${auth}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(25000),
    })
  } catch (err) {
    throw new HttpError(502, `WooCommerce request failed: ${err.message}`)
  }
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  if (!res.ok) {
    const msg = data && data.message ? data.message : `WooCommerce API returned HTTP ${res.status}`
    throw new HttpError(res.status >= 500 ? 502 : 400, msg)
  }
  return data
}

function mapProduct(p) {
  return {
    externalId: String(p.id),
    sku: p.sku || null,
    name: String(p.name || 'Untitled').slice(0, 180),
    price: Number(p.price) || 0,
    stock: p.stock_status === 'instock' ? (p.stock_quantity == null ? 999 : Number(p.stock_quantity)) : 0,
    imageUrl: Array.isArray(p.images) && p.images.length ? p.images[0].src : null,
  }
}

async function testConnection(store) {
  const products = await wooRequest(store, '/products?per_page=1&status=publish')
  return { ok: true, message: `Connected. ${products.length === 1 ? 'Products found.' : 'Store reachable, no published products yet.'}` }
}

async function syncProducts(store) {
  const all = []
  for (const page of [1, 2]) {
    const products = await wooRequest(store, `/products?per_page=100&status=publish&page=${page}`)
    all.push(...products)
    if (products.length < 100) break
  }
  for (const p of all) {
    const mapped = mapProduct(p)
    await prisma.product.upsert({
      where: { storeId_externalId: { storeId: store.id, externalId: mapped.externalId } },
      update: {
        sku: mapped.sku,
        name: mapped.name,
        price: mapped.price,
        stock: mapped.stock,
        imageUrl: mapped.imageUrl,
        active: true,
      },
      create: { ...mapped, storeId: store.id, currency: store.currency },
    })
  }
  return all.length
}

// Creates the order in WooCommerce and returns a payment URL for the customer.
async function createStoreOrder(store, { customerName, chatPhone, items, note }) {
  const lineItems = items.map((i) => {
    const li = { quantity: i.qty }
    if (/^\d+$/.test(String(i.externalId))) li.product_id = Number(i.externalId)
    if (i.sku) li.sku = i.sku
    return li
  })
  const payload = {
    payment_method: 'whatsapp_gateway',
    payment_method_title: 'WhatsApp Checkout',
    status: 'pending',
    set_paid: false,
    currency: store.currency,
    billing: {
      first_name: customerName || 'WhatsApp Customer',
      phone: chatPhone || '',
    },
    shipping: { first_name: customerName || 'WhatsApp Customer' },
    line_items: lineItems,
    meta_data: [{ key: '_whatsapp_chat', value: chatPhone || '' }],
    ...(note ? { customer_note: note } : {}),
  }
  const order = await wooRequest(store, '/orders', { method: 'POST', body: payload })
  const paymentUrl = order.order_key
    ? `${base(store)}/checkout/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`
    : `${base(store)}/my-account/orders/`
  return {
    externalId: String(order.id),
    externalNumber: order.number ? String(order.number) : null,
    paymentUrl,
    total: Number(order.total) || 0,
    currency: order.currency || store.currency,
  }
}

// Map gateway status -> WooCommerce status and push it.
const WOO_STATUS = { paid: 'processing', fulfilled: 'completed', cancelled: 'cancelled' }

async function updateExternalStatus(store, externalOrderId, gatewayStatus) {
  const wooStatus = WOO_STATUS[gatewayStatus]
  if (!wooStatus || !/^\d+$/.test(String(externalOrderId))) return false
  try {
    await wooRequest(store, `/orders/${externalOrderId}`, { method: 'PUT', body: { status: wooStatus } })
    return true
  } catch (err) {
    console.log(`[stores] woo status update failed for order ${externalOrderId}: ${err.message}`)
    return false
  }
}

module.exports = { testConnection, syncProducts, createStoreOrder, updateExternalStatus }

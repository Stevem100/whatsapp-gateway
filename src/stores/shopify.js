// Shopify connector — Admin REST API (2024-01).
// Auth: custom app access token with write_draft_orders + read_products scopes
// (Shopify admin > Settings > Apps and sales channels > Develop apps).
const prisma = require('../db')
const { HttpError } = require('../utils/helpers')

const API_VER = '2024-01'

function parseCredentials(store) {
  let creds = {}
  try {
    creds = JSON.parse(store.credentials || '{}')
  } catch {
    creds = {}
  }
  return creds
}

function requireShopConfig(store) {
  const creds = parseCredentials(store)
  if (!store.baseUrl) throw new HttpError(400, 'Store has no baseUrl configured (https://your-shop.myshopify.com)')
  if (!creds.accessToken) throw new HttpError(400, 'Shopify credentials need an accessToken')
  return creds
}

async function shopRequest(store, path, { method = 'GET', body } = {}) {
  const creds = requireShopConfig(store)
  const root = String(store.baseUrl || '').replace(/\/+$/, '')
  let res
  try {
    res = await fetch(`${root}/admin/api/${API_VER}${path}`, {
      method,
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': creds.accessToken,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(25000),
    })
  } catch (err) {
    throw new HttpError(502, `Shopify request failed: ${err.message}`)
  }
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  if (!res.ok) {
    const msg = data && data.errors ? JSON.stringify(data.errors) : `Shopify API returned HTTP ${res.status}`
    throw new HttpError(res.status >= 500 ? 502 : 400, msg)
  }
  return data
}

function mapProduct(p) {
  const variants = Array.isArray(p.variants) ? p.variants : []
  const first = variants[0] || {}
  const stock = variants.reduce((sum, v) => sum + (Number(v.inventory_quantity) || 0), 0)
  return {
    externalId: String(p.id),
    sku: first.sku || null,
    name: String(p.title || 'Untitled').slice(0, 180),
    price: Number(first.price) || 0,
    stock: p.status === 'active' ? stock : 0,
    imageUrl: p.image && p.image.src ? p.image.src : null,
  }
}

async function testConnection(store) {
  const data = await shopRequest(store, '/shop.json')
  return { ok: true, message: `Connected to shop "${data && data.shop ? data.shop.name : '?'}"` }
}

async function syncProducts(store) {
  const data = await shopRequest(store, `/products.json?limit=100&status=active`)
  const products = Array.isArray(data.products) ? data.products : []
  for (const p of products) {
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
  return products.length
}

// Creates a Shopify draft order (custom line items, no variant ids needed) and
// returns the invoice URL the customer can pay through.
async function createStoreOrder(store, { customerName, chatPhone, items, note }) {
  const lineItems = items.map((i) => ({
    title: i.name,
    price: String(i.price),
    quantity: i.qty,
    ...(i.sku ? { sku: i.sku } : {}),
  }))
  const payload = {
    draft_order: {
      line_items: lineItems,
      note: note || `WhatsApp order from ${chatPhone || 'unknown chat'}`,
      tags: ['whatsapp-gateway'],
      use_customer_default_address: false,
      ...(customerName ? { customer: { first_name: customerName } } : {}),
    },
  }
  const data = await shopRequest(store, '/draft_orders.json', { method: 'POST', body: payload })
  const draft = data.draft_order || {}
  let invoiceUrl = draft.invoice_url || null
  if (!invoiceUrl && draft.id) {
    try {
      const again = await shopRequest(store, `/draft_orders/${draft.id}.json`)
      invoiceUrl = (again.draft_order && again.draft_order.invoice_url) || null
    } catch {
      /* invoice URL stays null */
    }
  }
  return {
    externalId: `draft-${draft.id}`,
    externalNumber: draft.name ? String(draft.name).replace('#', '') : null,
    paymentUrl: invoiceUrl,
    total: Number(draft.total_price) || 0,
    currency: draft.currency || store.currency,
  }
}

// Draft orders cannot change status; completing on payment is best-effort.
async function updateExternalStatus(store, externalOrderId, gatewayStatus) {
  if (gatewayStatus !== 'paid') return false
  const match = /^draft-(\d+)$/.exec(String(externalOrderId))
  if (!match) return false
  try {
    await shopRequest(store, `/draft_orders/${match[1]}/complete.json`, { method: 'POST', body: { payment_pending: true } })
    return true
  } catch (err) {
    console.log(`[stores] shopify draft complete failed for ${externalOrderId}: ${err.message}`)
    return false
  }
}

module.exports = { testConnection, syncProducts, createStoreOrder, updateExternalStatus }

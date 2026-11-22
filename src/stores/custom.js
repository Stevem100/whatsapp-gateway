// Custom connector — for self-coded e-commerce sites (Laravel/Django/Node …).
// Contract (all endpoints are your own):
//   credentials JSON: {
//     "headers": { "Authorization": "Bearer ..." },   // optional extra headers
//     "productsUrl":   "GET  -> { "products": [ { "externalId", "name", "price", "sku?", "stock?", "imageUrl?" } ] }  or a bare array",
//     "createOrderUrl":"POST <- { customer:{name,phone,chatJid}, currency, items:[{externalId,name,price,qty}], note }
//                            -> { externalOrderId?, paymentUrl?, total?, currency? }"
//   }
// Products can also be managed manually via the products API.
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

async function fetchJson(url, { method = 'GET', headers = {}, body } = {}) {
  let res
  try {
    res = await fetch(url, {
      method,
      headers: { 'content-type': 'application/json', ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(25000),
    })
  } catch (err) {
    throw new HttpError(502, `Custom store request failed: ${err.message}`)
  }
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  if (!res.ok) throw new HttpError(res.status >= 500 ? 502 : 400, `Custom store endpoint returned HTTP ${res.status}: ${String(text).slice(0, 200)}`)
  return data
}

function requireUrl(store, key) {
  const creds = parseCredentials(store)
  const url = creds[key]
  if (!url) throw new HttpError(400, `credentials.${key} is not configured for this store`)
  return url
}

async function testConnection(store) {
  if (parseCredentials(store).productsUrl) {
    await fetchJson(requireUrl(store, 'productsUrl'), { headers: parseCredentials(store).headers || {} })
    return { ok: true, message: 'productsUrl reachable.' }
  }
  if (store.baseUrl) {
    await fetchJson(store.baseUrl)
    return { ok: true, message: 'baseUrl reachable.' }
  }
  return { ok: true, message: 'Manual/custom store: nothing to test, manage products via the products API.' }
}

async function syncProducts(store) {
  const creds = parseCredentials(store)
  const data = await fetchJson(requireUrl(store, 'productsUrl'), { headers: creds.headers || {} })
  const list = Array.isArray(data) ? data : Array.isArray(data && data.products) ? data.products : null
  if (!list) throw new HttpError(400, 'productsUrl must return {"products":[…]} or an array')
  let n = 0
  for (const p of list) {
    if (!p || p.externalId == null || !p.name || p.price == null) continue
    const mapped = {
      externalId: String(p.externalId),
      sku: p.sku || null,
      name: String(p.name).slice(0, 180),
      price: Number(p.price) || 0,
      stock: p.stock == null ? null : Number(p.stock),
      imageUrl: p.imageUrl || null,
    }
    await prisma.product.upsert({
      where: { storeId_externalId: { storeId: store.id, externalId: mapped.externalId } },
      update: { ...mapped, active: true },
      create: { ...mapped, storeId: store.id, currency: store.currency },
    })
    n += 1
  }
  return n
}

async function createStoreOrder(store, { customerName, chatPhone, items, note }) {
  const creds = parseCredentials(store)
  if (!creds.createOrderUrl) return { externalId: null, externalNumber: null, paymentUrl: null }
  const payload = {
    customer: { name: customerName || 'WhatsApp Customer', phone: chatPhone || '', chatJid: chatPhone ? `${chatPhone}@s.whatsapp.net` : '' },
    currency: store.currency,
    items: items.map((i) => ({ externalId: i.externalId, name: i.name, price: i.price, qty: i.qty })),
    note: note || '',
  }
  const data = await fetchJson(requireUrl(store, 'createOrderUrl'), {
    method: 'POST',
    headers: creds.headers || {},
    body: payload,
  })
  return {
    externalId: data && data.externalOrderId != null ? String(data.externalOrderId) : null,
    externalNumber: data && data.externalOrderId != null ? String(data.externalOrderId) : null,
    paymentUrl: (data && data.paymentUrl) || null,
    total: data && data.total != null ? Number(data.total) : 0,
    currency: (data && data.currency) || store.currency,
  }
}

async function updateExternalStatus() {
  return false // custom sites handle status internally if they want; webhook events are sent
}

module.exports = { testConnection, syncProducts, createStoreOrder, updateExternalStatus }

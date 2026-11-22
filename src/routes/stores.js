// E-commerce stores: connect WooCommerce / Shopify / custom sites / manual
// catalogs to a WhatsApp session, sync products, manage the catalog.
const express = require('express')
const prisma = require('../db')
const stores = require('../stores')
const { HttpError, ah } = require('../utils/helpers')

const router = express.Router()

async function findStoreOr404(id) {
  return stores.getStoreOr404(id)
}

function serialize(row, extras = {}) {
  let credentials = null
  try {
    credentials = row.credentials ? JSON.parse(row.credentials) : null
  } catch {
    credentials = null
  }
  return {
    id: row.id,
    sessionId: row.sessionId,
    name: row.name,
    type: row.type,
    baseUrl: row.baseUrl,
    currency: row.currency,
    paymentProvider: row.paymentProvider,
    paymentConfig: row.paymentConfig ? JSON.parse(row.paymentConfig || '{}') : null,
    groupChat: row.groupChat,
    active: row.active,
    hasCredentials: !!row.credentials,
    credentialsPreview: credentials ? Object.keys(credentials) : [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    ...extras,
  }
}

async function validateStoreBody(body, { partial = false, current = null } = {}) {
  const out = {}
  const types = stores.STORE_TYPES
  if (!partial || body.sessionId !== undefined) {
    const sessionId = String(body.sessionId || '').trim()
    if (!sessionId) throw new HttpError(400, 'Field "sessionId" is required')
    const session = await prisma.session.findUnique({ where: { id: sessionId } })
    if (!session) throw new HttpError(404, 'Session not found')
    out.sessionId = sessionId
  }
  if (!partial || body.name !== undefined) {
    const name = String(body.name || '').trim()
    if (!name) throw new HttpError(400, 'Field "name" is required')
    out.name = name.slice(0, 80)
  }
  if (!partial || body.type !== undefined) {
    const type = String(body.type || 'manual').toLowerCase()
    if (!types.includes(type)) throw new HttpError(400, `type must be one of: ${types.join(', ')}`)
    out.type = type
  }
  if (body.baseUrl !== undefined) {
    const baseUrl = body.baseUrl === null ? null : String(body.baseUrl).trim() || null
    if (baseUrl && !/^https?:\/\//i.test(baseUrl)) throw new HttpError(400, 'baseUrl must start with http:// or https://')
    out.baseUrl = baseUrl
  }
  if (body.currency !== undefined) {
    const currency = String(body.currency || '').trim().toUpperCase() || 'KES'
    if (currency.length > 8) throw new HttpError(400, 'currency must be a short code like KES, USD, EUR')
    out.currency = currency
  }
  if (body.paymentProvider !== undefined) {
    const provider = String(body.paymentProvider || 'store').toLowerCase()
    if (!stores.PAYMENT_PROVIDERS.includes(provider)) {
      throw new HttpError(400, `paymentProvider must be one of: ${stores.PAYMENT_PROVIDERS.join(', ')}`)
    }
    out.paymentProvider = provider
  }
  if (body.paymentConfig !== undefined) {
    out.paymentConfig = body.paymentConfig === null ? null : JSON.stringify(body.paymentConfig)
  }
  if (body.groupChat !== undefined) {
    if (typeof body.groupChat !== 'boolean') throw new HttpError(400, '"groupChat" must be a boolean')
    out.groupChat = body.groupChat
  }
  if (body.active !== undefined) {
    if (typeof body.active !== 'boolean') throw new HttpError(400, '"active" must be a boolean')
    out.active = body.active
  }
  if (body.credentials !== undefined) {
    if (body.credentials === null) {
      out.credentials = null
    } else {
      if (typeof body.credentials !== 'object' || Array.isArray(body.credentials)) {
        throw new HttpError(400, 'credentials must be an object')
      }
      out.credentials = JSON.stringify(body.credentials)
    }
  }

  const effective = { ...(current ? current : {}), ...out }
  // per-type requirements
  if (!partial || body.type !== undefined) {
    const type = effective.type
    const creds = effective.credentials ? safeParse(effective.credentials) : {}
    if (type === 'woocommerce') {
      if (!effective.baseUrl) throw new HttpError(400, 'WooCommerce stores need baseUrl (https://your-site.com)')
      if (!creds.consumerKey || !creds.consumerSecret) {
        throw new HttpError(400, 'WooCommerce credentials need consumerKey and consumerSecret (REST API read/write keys)')
      }
    }
    if (type === 'shopify') {
      if (!effective.baseUrl) throw new HttpError(400, 'Shopify stores need baseUrl (https://your-shop.myshopify.com)')
      if (!creds.accessToken) throw new HttpError(400, 'Shopify credentials need accessToken (Admin API token with read_products, write_draft_orders)')
    }
    if (type === 'custom' && effective.paymentProvider === 'store' && partial && body.type !== undefined) {
      // custom stores may rely on manual products + manual/stripe payments; no hard requirement
    }
  }
  return out
}

function safeParse(jsonStr) {
  try {
    return jsonStr ? JSON.parse(jsonStr) : {}
  } catch {
    return {}
  }
}

// GET /api/stores?sessionId=
router.get('/', ah(async (req, res) => {
  const where = req.query.sessionId ? { sessionId: String(req.query.sessionId) } : {}
  const rows = await prisma.store.findMany({ where, orderBy: { createdAt: 'asc' } })
  const counts = await Promise.all(
    rows.map((r) => prisma.product.count({ where: { storeId: r.id } }))
  )
  res.json({ stores: rows.map((r, i) => serialize(r, { productCount: counts[i] })) })
}))

// POST /api/stores
router.post('/', ah(async (req, res) => {
  const data = await validateStoreBody(req.body || {})
  const row = await prisma.store.create({ data })
  res.status(201).json({ store: serialize(row, { productCount: 0 }) })
}))

// GET /api/stores/:id
router.get('/:id', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  const [productCount, orderCount] = await Promise.all([
    prisma.product.count({ where: { storeId: row.id } }),
    prisma.order.count({ where: { storeId: row.id } }),
  ])
  res.json({ store: serialize(row, { productCount, orderCount }) })
}))

// PATCH /api/stores/:id
router.patch('/:id', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  const data = await validateStoreBody(req.body || {}, { partial: true, current: row })
  const updated = await prisma.store.update({ where: { id: row.id }, data })
  res.json({ store: serialize(updated) })
}))

// DELETE /api/stores/:id
router.delete('/:id', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  await prisma.store.delete({ where: { id: row.id } })
  res.json({ ok: true })
}))

// POST /api/stores/:id/test
router.post('/:id/test', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  const result = await stores.testConnection(row)
  res.json(result)
}))

// POST /api/stores/:id/sync — pull products from the platform into the cache
router.post('/:id/sync', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  const synced = await stores.syncProducts(row)
  const total = await prisma.product.count({ where: { storeId: row.id } })
  res.json({ ok: true, synced, total })
}))

// GET /api/stores/:id/products
router.get('/:id/products', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  const products = await prisma.product.findMany({
    where: { storeId: row.id },
    orderBy: { createdAt: 'asc' },
    take: 500,
  })
  res.json({ products })
}))

// POST /api/stores/:id/products — create/replace a product manually
router.post('/:id/products', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  const body = req.body || {}
  const name = String(body.name || '').trim()
  if (!name) throw new HttpError(400, 'Field "name" is required')
  const price = Number(body.price)
  if (!Number.isFinite(price) || price < 0) throw new HttpError(400, 'Field "price" must be a positive number')
  const externalId = body.externalId != null && String(body.externalId).trim() !== ''
    ? String(body.externalId).trim()
    : `manual-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const product = await prisma.product.upsert({
    where: { storeId_externalId: { storeId: row.id, externalId } },
    update: {
      name: name.slice(0, 180),
      price,
      sku: body.sku ? String(body.sku) : null,
      stock: body.stock == null ? null : Number(body.stock),
      imageUrl: body.imageUrl ? String(body.imageUrl) : null,
      active: body.active === undefined ? true : !!body.active,
      currency: row.currency,
    },
    create: {
      storeId: row.id,
      externalId,
      name: name.slice(0, 180),
      price,
      sku: body.sku ? String(body.sku) : null,
      stock: body.stock == null ? null : Number(body.stock),
      imageUrl: body.imageUrl ? String(body.imageUrl) : null,
      active: body.active === undefined ? true : !!body.active,
      currency: row.currency,
    },
  })
  res.status(201).json({ product })
}))

// PATCH /api/stores/:id/products/:pid
router.patch('/:id/products/:pid', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  const product = await prisma.product.findUnique({ where: { id: req.params.pid } })
  if (!product || product.storeId !== row.id) throw new HttpError(404, 'Product not found')
  const body = req.body || {}
  const data = {}
  if (body.name !== undefined) data.name = String(body.name).trim().slice(0, 180)
  if (body.price !== undefined) {
    const price = Number(body.price)
    if (!Number.isFinite(price) || price < 0) throw new HttpError(400, '"price" must be a positive number')
    data.price = price
  }
  if (body.sku !== undefined) data.sku = body.sku === null ? null : String(body.sku)
  if (body.stock !== undefined) data.stock = body.stock === null ? null : Number(body.stock)
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl === null ? null : String(body.imageUrl)
  if (body.active !== undefined) data.active = !!body.active
  const updated = await prisma.product.update({ where: { id: product.id }, data })
  res.json({ product: updated })
}))

// DELETE /api/stores/:id/products/:pid
router.delete('/:id/products/:pid', ah(async (req, res) => {
  const row = await findStoreOr404(req.params.id)
  const product = await prisma.product.findUnique({ where: { id: req.params.pid } })
  if (!product || product.storeId !== row.id) throw new HttpError(404, 'Product not found')
  await prisma.product.delete({ where: { id: product.id } })
  res.json({ ok: true })
}))

module.exports = router

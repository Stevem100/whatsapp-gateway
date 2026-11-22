// Commerce bot: conversational shopping over WhatsApp.
// Catalog -> add to cart -> checkout (order created in the connected store)
// -> payment link / instructions, order tracking and self-service cancel.
// Runs BEFORE the keyword auto-reply rules when the session has an active store.
const prisma = require('../db')
const stores = require('../stores')
const { forwardEvent } = require('../webhook/forwarder')
const { jidToPhone } = require('../utils/helpers')

// In-memory catalog index per chat so "add 2" resolves the 2nd product shown.
// key `${sessionId}:${chatJid}` -> { products: [...], at }
const catalogIndex = new Map()
const CATALOG_TTL_MS = 15 * 60 * 1000
const CATALOG_SIZE = 12

// Anti-spam: at most one commerce reply per chat per 2 seconds.
const cooldowns = new Map()
const COOLDOWN_MS = 2000

function fmtMoney(n, currency) {
  const num = Number(n) || 0
  const formatted = num % 1 === 0
    ? num.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `${currency} ${formatted}`
}

async function getActiveStore(sessionId) {
  return prisma.store.findFirst({
    where: { sessionId, active: true },
    orderBy: { createdAt: 'asc' },
  })
}

async function getOpenCart(sessionId, chatJid, storeId) {
  const existing = await prisma.cart.findUnique({
    where: { sessionId_chatJid: { sessionId, chatJid } },
    include: { items: true },
  })
  if (existing && existing.status === 'open') return existing
  if (existing) {
    // previous cart was ordered; start a fresh one
    await prisma.cart.update({ where: { id: existing.id }, data: { status: 'abandoned' } }).catch(() => {})
  }
  return prisma.cart.create({ data: { sessionId, chatJid, storeId: storeId || null }, include: { items: true } })
}

function cartTotal(cart) {
  return cart.items.reduce((sum, i) => sum + i.price * i.qty, 0)
}

function cartLines(cart, currency) {
  if (!cart.items.length) return '(empty)'
  return cart.items
    .map((i, idx) => `${idx + 1}. ${i.qty} x ${i.name} — ${fmtMoney(i.price * i.qty, currency)}`)
    .join('\n')
}

async function catalogReply(store) {
  const products = await prisma.product.findMany({
    where: { storeId: store.id, active: true },
    orderBy: { createdAt: 'asc' },
    take: CATALOG_SIZE,
  })
  if (!products.length) {
    return {
      action: 'catalog',
      reply: `The ${store.name} catalog is empty right now. New products are coming soon — send "menu" any time.`,
    }
  }
  const lines = products.map((p, idx) => {
    const stock = p.stock == null ? '' : p.stock > 0 ? ` (${p.stock} in stock)` : ' (out of stock)'
    return `${idx + 1}. ${p.name} — ${fmtMoney(p.price, store.currency)}${stock}`
  })
  return {
    action: 'catalog',
    products,
    reply: [
      `*${store.name} — Catalog*`,
      ...lines,
      ``,
      `Reply "add <number> [qty]" to add an item, "cart" to review, "checkout" to place your order.`,
    ].join('\n'),
  }
}

function orderStatusLine(order) {
  const pay = order.paymentStatus === 'paid' ? 'PAID' : 'unpaid'
  return `#${order.number} — ${fmtMoney(order.total, order.currency)} — ${order.status} / ${pay}`
}

async function checkoutReply(session, sock, ctx, store, dryRun) {
  const chatJid = ctx.remoteJid
  const cart = await prisma.cart.findUnique({
    where: { sessionId_chatJid: { sessionId: session.id, chatJid } },
    include: { items: true },
  })
  if (!cart || !cart.items.length || cart.status !== 'open') {
    return { action: 'checkout', reply: `Your cart is empty. Send "catalog" to browse products first.` }
  }

  const items = cart.items.map((i) => ({
    productId: i.productId,
    externalId: i.productId,
    sku: null,
    name: i.name,
    price: i.price,
    qty: i.qty,
  }))
  // enrich with the product's external id / sku for the platform call
  const productIds = cart.items.map((i) => i.productId)
  const dbProducts = await prisma.product.findMany({ where: { id: { in: productIds } } })
  const byId = new Map(dbProducts.map((p) => [p.id, p]))
  for (const item of items) {
    const p = byId.get(item.productId)
    if (p) {
      item.externalId = p.externalId
      item.sku = p.sku
    }
  }

  const subtotal = cartTotal(cart)
  const total = Math.round(subtotal * 100) / 100
  const customerName = ctx.pushName || 'WhatsApp Customer'
  const chatPhone = jidToPhone(chatJid)

  // 1) external platform order (best effort — a failed sync still keeps a local order)
  let external = { externalId: null, externalNumber: null, paymentUrl: null }
  let syncNote = null
  try {
    external = await stores.createExternalOrder(store, {
      customerName,
      chatPhone,
      items,
      note: `WhatsApp order from ${chatPhone}`,
    })
  } catch (err) {
    syncNote = err.message
  }

  // 2) local order row
  const number = await stores.nextOrderNumber()
  let payment
  try {
    payment = await stores.buildPayment(store, {
      items,
      total,
      currency: store.currency,
      orderNumber: number,
      externalPaymentUrl: external.paymentUrl,
      chatPhone,
    })
  } catch (err) {
    payment = {
      provider: store.paymentProvider,
      url: null,
      instructions: `Payment link could not be generated (${err.message}). We will send it shortly.`,
    }
  }
  const order = await prisma.order.create({
    data: {
      sessionId: session.id,
      storeId: store.id,
      number,
      externalOrderId: external.externalId,
      chatJid,
      customerName,
      items: JSON.stringify(items.map(({ productId, externalId, name, price, qty }) => ({ productId, externalId, name, price, qty }))),
      subtotal,
      total,
      currency: store.currency,
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentProvider: payment.provider,
      paymentUrl: payment.url,
    },
  })
  await prisma.cart.update({ where: { id: cart.id }, data: { status: 'ordered' } })
  catalogIndex.delete(`${session.id}:${chatJid}`)

  await forwardEvent(session, 'order.created', {
    id: order.id,
    number: order.number,
    storeId: store.id,
    store: store.name,
    chatJid,
    customerName,
    itemCount: items.length,
    total: order.total,
    currency: order.currency,
    paymentProvider: order.paymentProvider,
    paymentUrl: order.paymentUrl,
    externalOrderId: order.externalOrderId,
    syncError: syncNote,
  })

  const paySection = payment.url
    ? `To pay:\n${payment.url}`
    : `To pay:\n${payment.instructions || 'We will send payment instructions shortly.'}`

  const lines = [
    `*Order #${order.number} confirmed* — thank you ${customerName}!`,
    cartLines({ items: cart.items }, store.currency),
    `Total: *${fmtMoney(order.total, order.currency)}*`,
    ``,
    paySection,
  ]
  if (syncNote) lines.push(``, `(Note: order saved here, but the store sync failed: ${syncNote})`)
  lines.push(``, `Reply "orders" anytime to track it, or "cancel ${order.number}" to cancel.`)

  return { action: 'checkout', reply: lines.join('\n'), order }
}

// ------------------------------------------------------------- entry point

async function runCommerceBot(session, sock, ctx, { dryRun = false } = {}) {
  if (!session || !session.botEnabled) return null
  const raw = (ctx.body || '').trim()
  if (!raw) return null
  const chatJid = ctx.remoteJid
  if (!chatJid) return null

  const store = await getActiveStore(session.id)
  if (!store) return null
  const isGroup = chatJid.endsWith('@g.us')
  if (isGroup && !store.groupChat) return null
  if (chatJid.endsWith('@broadcast') || chatJid.endsWith('@newsletter')) return null

  const text = raw.toLowerCase().replace(/\s+/g, ' ')
  const currency = store.currency

  if (!dryRun) {
    const key = `${session.id}:${chatJid}`
    const now = Date.now()
    if (now - (cooldowns.get(key) || 0) < COOLDOWN_MS) return null
    cooldowns.set(key, now)
  }

  const send = async (reply) => {
    if (!dryRun && sock) {
      try {
        await sock.sendMessage(chatJid, { text: reply })
      } catch (err) {
        console.log(`[commerce-bot] send failed: ${err.message}`)
      }
    }
    return reply
  }

  // --- greeting / menu
  if (/^(hi|hello|hey|menu|start|shop|habari|jambo|mambo|karibu)[.!\s]*$/.test(text)) {
    const reply = [
      `Welcome to *${store.name}*!`,
      `How it works:`,
      `1. "catalog" — browse products`,
      `2. "add <number> [qty]" — add to cart`,
      `3. "cart" — review your cart`,
      `4. "checkout" — place the order and get a payment link`,
      `5. "orders" — track your orders`,
      ``,
      `Send "help" to see every command.`,
    ].join('\n')
    return { action: 'menu', reply: await send(reply) }
  }

  // --- catalog
  if (/^(catalog|catalogue|products|price list|list)$/.test(text)) {
    const result = await catalogReply(store)
    if (result.products) catalogIndex.set(`${session.id}:${chatJid}`, { products: result.products, at: Date.now() })
    return { action: 'catalog', reply: await send(result.reply) }
  }

  // --- add to cart: "add 2", "add 2 3"
  const addMatch = /^(?:add|buy|order)\s+(\d{1,3})(?:\s+(\d{1,3}))?$/.exec(text)
  const bareNumber = /^(\d{1,3})$/.exec(text)
  if (addMatch || bareNumber) {
    const cached = catalogIndex.get(`${session.id}:${chatJid}`)
    if (!cached || Date.now() - cached.at > CATALOG_TTL_MS) {
      if (bareNumber) return null // plain number without catalog context: fall through to rules
      const result = await catalogReply(store)
      if (result.products) catalogIndex.set(`${session.id}:${chatJid}`, { products: result.products, at: Date.now() })
      return { action: 'catalog', reply: await send(`Here is the current catalog first:\n\n${result.reply}`) }
    }
    const index = Number((addMatch || bareNumber)[1])
    const qty = addMatch && addMatch[2] ? Number(addMatch[2]) : 1
    const product = cached.products[index - 1]
    if (!product) return { action: 'add', reply: await send(`Sorry, ${index} is not in the catalog. Send "catalog" to see the list again.`) }
    if (product.stock != null && product.stock < qty) {
      return { action: 'add', reply: await send(`Sorry, ${product.name} is out of stock${product.stock === 0 ? '' : ` (only ${product.stock} left)`}.`) }
    }
    if (qty < 1 || qty > 99) return { action: 'add', reply: await send(`Quantity must be between 1 and 99.`) }
    const cart = await getOpenCart(session.id, chatJid, store.id)
    if (cart.storeId && cart.storeId !== store.id) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    }
    const existing = cart.items.find((i) => i.productId === product.id)
    if (existing) {
      await prisma.cartItem.update({ where: { id: existing.id }, data: { qty: existing.qty + qty } })
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId: product.id, name: product.name, price: product.price, qty },
      })
    }
    await prisma.cart.update({ where: { id: cart.id }, data: { storeId: store.id } })
    const fresh = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: true } })
    const reply = `Added ${qty} x ${product.name} (${fmtMoney(product.price, currency)} each).\n\nCart:\n${cartLines(fresh, currency)}\nSubtotal: ${fmtMoney(cartTotal(fresh), currency)}\n\nReply "checkout" to place the order.`
    return { action: 'add', reply: await send(reply), cart: fresh }
  }

  // --- cart
  if (/^(cart|basket|my cart)$/.test(text)) {
    const cart = await prisma.cart.findUnique({
      where: { sessionId_chatJid: { sessionId: session.id, chatJid } },
      include: { items: true },
    })
    const usable = cart && cart.status === 'open' ? cart : null
    const reply = usable && usable.items.length
      ? `*Your cart*\n${cartLines(usable, currency)}\nSubtotal: ${fmtMoney(cartTotal(usable), currency)}\n\nReply "checkout" to place the order, "remove <n>" to drop a line, "clear" to empty.`
      : `Your cart is empty. Send "catalog" to browse products.`
    return { action: 'cart', reply: await send(reply) }
  }

  // --- remove line
  const removeMatch = /^(?:remove|delete|rm)\s+(\d{1,3})$/.exec(text)
  if (removeMatch) {
    const cart = await prisma.cart.findUnique({
      where: { sessionId_chatJid: { sessionId: session.id, chatJid } },
      include: { items: true },
    })
    if (!cart || cart.status !== 'open' || !cart.items.length) {
      return { action: 'remove', reply: await send(`Your cart is already empty.`) }
    }
    const index = Number(removeMatch[1])
    const item = cart.items[index - 1]
    if (!item) return { action: 'remove', reply: await send(`There is no line ${index}. Send "cart" to see your cart.`) }
    await prisma.cartItem.delete({ where: { id: item.id } })
    const fresh = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: true } })
    const reply = `Removed ${item.name}.\n\nCart:\n${cartLines(fresh, currency)}\nSubtotal: ${fmtMoney(cartTotal(fresh), currency)}`
    return { action: 'remove', reply: await send(reply) }
  }

  // --- clear cart
  if (/^(clear|empty cart|reset)$/.test(text)) {
    const cart = await prisma.cart.findUnique({
      where: { sessionId_chatJid: { sessionId: session.id, chatJid } },
      include: { items: true },
    })
    if (cart && cart.status === 'open' && cart.items.length) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    }
    return { action: 'clear', reply: await send(`Cart cleared. Send "catalog" to start again.`) }
  }

  // --- checkout
  if (/^(checkout|place order|order now|pay for cart)$/.test(text)) {
    return checkoutReply(session, sock, ctx, store, dryRun)
  }

  // --- my orders
  if (/^(orders|my orders|track|order status)$/.test(text)) {
    const orders = await prisma.order.findMany({
      where: { sessionId: session.id, chatJid },
      orderBy: { number: 'desc' },
      take: 5,
    })
    const reply = orders.length
      ? `*Your orders*\n${orders.map(orderStatusLine).join('\n')}\n\nReply "pay <order number>" for the payment link, or "cancel <order number>".`
      : `You have no orders yet. Send "catalog" to start shopping.`
    return { action: 'orders', reply: await send(reply) }
  }

  // --- pay <order>
  const payMatch = /^(?:pay|payment|invoice)\s+#?(\d{1,6})$/.test(text)
    ? /^(?:pay|payment|invoice)\s+#?(\d{1,6})$/.exec(text)
    : null
  if (payMatch) {
    const number = Number(payMatch[1])
    const order = await prisma.order.findFirst({ where: { sessionId: session.id, chatJid, number } })
    if (!order) return { action: 'pay', reply: await send(`Order #${number} was not found. Send "orders" to list your orders.`) }
    if (order.paymentStatus === 'paid') return { action: 'pay', reply: await send(`Order #${order.number} is already paid. Thank you!`) }
    const paySection = order.paymentUrl
      ? `Pay here: ${order.paymentUrl}`
      : (stores.buildPayment && (await stores.buildPayment(store, {
          items: JSON.parse(order.items || '[]'),
          total: order.total,
          currency: order.currency,
          orderNumber: order.number,
          externalPaymentUrl: null,
          chatPhone: jidToPhone(chatJid),
        })).instructions) || 'Payment instructions will follow shortly.'
    const reply = `Order #${order.number} — ${fmtMoney(order.total, order.currency)}\n${paySection}`
    return { action: 'pay', reply: await send(reply) }
  }

  // --- cancel <order>
  const cancelMatch = /^(?:cancel)\s+#?(\d{1,6})$/.exec(text)
  if (cancelMatch) {
    const number = Number(cancelMatch[1])
    const order = await prisma.order.findFirst({ where: { sessionId: session.id, chatJid, number } })
    if (!order) return { action: 'cancel', reply: await send(`Order #${number} was not found. Send "orders" to list your orders.`) }
    if (order.paymentStatus === 'paid' || order.status !== 'pending') {
      return { action: 'cancel', reply: await send(`Order #${order.number} is already ${order.paymentStatus === 'paid' ? 'paid' : order.status} — please contact the shop to change it.`) }
    }
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'cancelled', paymentStatus: 'failed' },
    })
    await stores.updateExternalStatus(store, order.externalOrderId, 'cancelled').catch(() => {})
    await forwardEvent(session, 'order.cancelled', {
      id: order.id,
      number: order.number,
      chatJid,
      by: 'customer',
    })
    return { action: 'cancel', reply: await send(`Order #${order.number} has been cancelled. Send "catalog" whenever you are ready to shop again.`) }
  }

  // --- help
  if (/^(help|commands|\?)$/.test(text)) {
    const reply = [
      `*${store.name} commands*`,
      `catalog — browse products`,
      `add <number> [qty] — add to cart`,
      `cart — review cart`,
      `remove <number> — remove a cart line`,
      `clear — empty the cart`,
      `checkout — place the order`,
      `orders — list your orders`,
      `pay <order number> — payment link`,
      `cancel <order number> — cancel an unpaid order`,
      `help — this menu`,
    ].join('\n')
    return { action: 'help', reply: await send(reply) }
  }

  return null // not a commerce command: fall through to the keyword rules
}

// Dry-run pipeline for POST /api/bot/test (no WhatsApp sends, no cooldowns).
async function testPipeline(session, ctx) {
  const commerce = await runCommerceBot(session, null, ctx, { dryRun: true })
  if (commerce) return { handled: 'commerce', action: commerce.action, reply: commerce.reply, order: commerce.order || null }
  return { handled: null, action: null, reply: null, order: null }
}

module.exports = { runCommerceBot, testPipeline, getActiveStore }

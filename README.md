# WhatsApp Gateway

A self-hosted **multi-session WhatsApp bot gateway with conversational commerce**:
it logs into real WhatsApp accounts using the WhatsApp Web multi-device protocol
([Baileys](https://github.com/WhiskeySockets/Baileys)) and exposes a clean REST API
plus a web dashboard.

Built with **Express + Baileys + Prisma (SQLite)**, protected by an API key.

## Features

- **Multi-session** - run many WhatsApp accounts on one server, each with its own QR login
- **Send API** - text, image, video, document (from URL or base64) and location messages
- **Receive** - every incoming message is stored in SQLite (chats + message history)
- **Auto-reply bot** - per-session keyword rules (`exact`, `contains`, `starts_with`, `regex`), priority ordered, hit counters, on/off switch
- **Conversational commerce** - customers chat to browse the catalog, add to cart, checkout, pay and track orders (see Shop below)
- **E-commerce integrations** - connect **WooCommerce**, **Shopify**, your own coded site (HTTP contract) or a manual catalog; products sync, orders are pushed to the platform
- **Payments** - store-native payment pages (Woo order-pay / Shopify invoice), **Stripe Checkout** links, or manual instructions (M-Pesa paybill, bank, cash)
- **Group communities** - list groups, join by invite link, members/invite-link management, group broadcasts
- **Broadcasts** - one message to many chats/groups, delivered sequentially with randomised anti-ban delays, live progress
- **Event webhooks** - forward messages, bot replies, order and connection events to any URL
- **Dashboard** - sessions, QR login, inbox, send box, rule editor, store manager, orders, broadcast composer, group manager, webhook tester
- **Persistence** - Baileys credentials and signal keys are stored in SQLite, so sessions survive restarts
- **Auto-reconnect** - configurable retries with backoff; `logged out` clears credentials

## Quick start

```bash
cd mini-services/whatsapp-gateway
npm install
npm run db:generate     # generate the Prisma client (output: generated/prisma)
npm run db:push         # create db/gateway.db
cp .env.example .env    # then edit API_KEY!
npm start               # or: npm run dev (auto-restart on file changes)
```

The API listens on `http://localhost:3030` (configurable via `PORT`).

Open the main project's web dashboard at `/` (Next.js app) or drive the API
directly with curl - every request needs the header `x-api-key: <your key>`.

> Note: if your shell has a global `DATABASE_URL` exported, Prisma CLI picks it
> up - that is why `npm run db:push` pins the path explicitly, and the runtime
> always uses `db/gateway.db` regardless.

## Configuration (.env)

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3030` | HTTP port |
| `API_KEY` | `wg-dev-key-change-me` | **Change this** before exposing the gateway |
| `API_KEY_HINT` | dev key | Shown in the dashboard key dialog; set empty in production |
| `GATEWAY_DATABASE_URL` | `file:../db/gateway.db` | SQLite file (relative to `prisma/`) |
| `AUTO_RECONNECT` | `true` | Reconnect sessions on boot and after drops |
| `RECONNECT_MAX_ATTEMPTS` | `8` | Give up after N failed retries |
| `RECONNECT_DELAY_MS` | `5000` | Delay between retries |
| `MAX_MEDIA_BYTES` | `26214400` (25 MB) | Cap for outbound media downloads |

## Deploy to cPanel (shared hosting)

The gateway ships as a self-contained cPanel bundle (source + production
`node_modules`, so **no npm install on the server**) plus a one-command deployer
that drives the cPanel UAPI with an API token: upload -> extract -> register the
Node.js (Passenger) app -> restart -> health check.

- Deployer + bundle + guide: `download/cpanel-deploy/` (`deploy-cpanel.sh`,
  `whatsapp-gateway-cpanel.zip`, `DEPLOY-GUIDE.md`)
- Production API key: baked into the bundle `.env`, also in `API-KEY.txt`
- Sessions are stored in SQLite (`db/gateway.db`) and survive restarts;
  sessions auto-reconnect on boot (`AUTO_RECONNECT=true`)

```bash
CPANEL_HOST=cpanel.yourdomain.com CPANEL_USER=USER CPANEL_TOKEN=TOKEN bash deploy-cpanel.sh
```

On cPanel, sessions resolve by **id or name** in the URL
(`/api/sessions/main/connect`, `/api/sessions/main/qr`), which keeps raw
`curl` usage pleasant without the dashboard.

## REST API

Base URL: `/api` - all routes except `/health` require `x-api-key`.

> Full endpoint-by-endpoint reference: [`docs/API.md`](./docs/API.md) -
> machine-readable spec: [`docs/openapi.yaml`](./docs/openapi.yaml) (OpenAPI 3.0,
> import into Postman/Swagger UI).

### Sessions

| Method | Path | Body / notes |
| --- | --- | --- |
| `GET` | `/api/sessions` | list all sessions |
| `POST` | `/api/sessions` | `{"name": "main"}` - creates session + demo bot rules |
| `GET` | `/api/sessions/:id` | details + stats `{messages, chats, rules}` |
| `POST` | `/api/sessions/:id/connect` | start Baileys, QR arrives via events |
| `POST` | `/api/sessions/:id/disconnect` | close the socket, keep credentials |
| `POST` | `/api/sessions/:id/logout` | logout and clear stored credentials |
| `DELETE` | `/api/sessions/:id` | delete session, history and rules |
| `GET` | `/api/sessions/:id/qr` | `{qr: <dataURL>, generatedAt}` while waiting for a scan |
| `PUT` | `/api/sessions/:id/bot` | `{"enabled": true/false}` - auto-reply switch |

Session status: `disconnected -> connecting -> qr -> connected`, plus
`reconnecting` and `logged_out`.

### Messages

| Method | Path | Body / notes |
| --- | --- | --- |
| `GET` | `/api/sessions/:id/messages/chats` | chat list with last message + counts |
| `GET` | `/api/sessions/:id/messages` | `?chatJid=&limit=&before=` - history, chronological |
| `POST` | `/api/sessions/:id/messages` | send - see below |

Send body examples:

```jsonc
// text
{ "to": "15551234567", "type": "text", "text": "hello!" }
// image (URL or base64, caption optional)
{ "to": "15551234567", "type": "image", "mediaUrl": "https://example.com/cat.jpg", "caption": "nice" }
// document
{ "to": "15551234567", "type": "document", "mediaUrl": "https://example.com/invoice.pdf", "filename": "invoice.pdf" }
// location
{ "to": "15551234567", "type": "location", "lat": -1.2921, "lng": 36.8219 }
```

`to` accepts plain digits (international format, no `+`) or a full JID such as
`123456-98765@g.us` for groups. Sending requires the session to be
`connected` (otherwise `409`).

### Auto-reply rules

| Method | Path | Body / notes |
| --- | --- | --- |
| `GET` | `/api/sessions/:id/rules` | list rules |
| `POST` | `/api/sessions/:id/rules` | `{"matchType":"contains","keyword":"price","reply":"...", "priority":5, "enabled":true}` |
| `PATCH` | `/api/sessions/:id/rules/:ruleId` | partial update |
| `DELETE` | `/api/sessions/:id/rules/:ruleId` | remove rule |

Incoming **text** messages are matched against enabled rules ordered by
priority (desc); the first match replies and its hit counter increments. A
3-second per-chat cooldown prevents bot loops. When the session has an active
store, the **commerce bot runs first** and keyword rules act as fallback.

### Shop - conversational commerce

Connect a store to a session, then customers order by chat. The bot answers
`hi`, `catalog`, `add 2 [qty]`, `cart`, `remove 1`, `clear`, `checkout`,
`orders`, `pay <n>`, `cancel <n>`, `help` (private chats by default;
`groupChat: true` also serves groups).

| Method | Path | Body / notes |
| --- | --- | --- |
| `POST` | `/api/stores` | `{sessionId, name, type: woocommerce\|shopify\|custom\|manual, baseUrl, credentials, currency, paymentProvider, paymentConfig, groupChat}` |
| `GET` | `/api/stores` | list (`?sessionId=` filter) |
| `GET/PATCH/DELETE` | `/api/stores/:id` | detail / update / disconnect |
| `POST` | `/api/stores/:id/test` | verify platform credentials |
| `POST` | `/api/stores/:id/sync` | pull products from Woo/Shopify/custom site |
| `GET/POST` | `/api/stores/:id/products` | catalog list / add manual product |
| `PATCH/DELETE` | `/api/stores/:id/products/:pid` | update / remove product |
| `GET` | `/api/orders` | `?sessionId=&storeId=&chatJid=&status=&paymentStatus=&limit=` |
| `GET` | `/api/orders/:id` | order detail |
| `POST` | `/api/orders/:id/mark-paid` | `{paymentRef}` - syncs to platform, notifies the customer |
| `POST` | `/api/orders/:id/cancel` | cancel + notify (unpaid orders only) |
| `POST` | `/api/orders/:id/notify` | `{text}` - message the customer in chat |
| `POST` | `/api/orders/:id/payment-link` | resend the payment URL / instructions |
| `POST` | `/api/bot/test` | `{sessionId, chatJid, text, dryRun}` - simulate an incoming message through the bot pipeline |

Payment providers: `store` (Woo order-pay URL / Shopify draft-order invoice),
`manual` (custom instructions text), `stripe` (Checkout Session link; needs
`paymentConfig.secretKey`). Orders are created in the connected platform
(WooCommerce order, Shopify draft order, custom site contract) and kept locally
with payment status; marking paid pushes the status back to the platform.

Custom-site contract: `credentials.productsUrl` returns
`{"products":[{externalId,name,price,sku,stock}]}` and
`credentials.createOrderUrl` receives `{customer, currency, items}` and returns
`{externalOrderId, paymentUrl}`.

### Groups

| Method | Path | Body / notes |
| --- | --- | --- |
| `GET` | `/api/sessions/:id/groups` | list joined groups |
| `POST` | `/api/sessions/:id/groups/join` | `{"code": "https://chat.whatsapp.com/..."}` |
| `GET` | `/api/sessions/:id/groups/:jid` | metadata + participants |
| `POST` | `/api/sessions/:id/groups/:jid/leave` | leave the group |
| `GET` | `/api/sessions/:id/groups/:jid/invite` | invite code + link (bot must be admin) |
| `POST` | `/api/sessions/:id/groups/:jid/participants` | `{action: add\|remove\|promote\|demote, participants: [phones]}` |

### Broadcasts

| Method | Path | Body / notes |
| --- | --- | --- |
| `POST` | `/api/broadcasts` | `{sessionId, message, targets: [phones or @g.us jids], minDelayMs, maxDelayMs}` |
| `GET` | `/api/broadcasts` | list with progress (`?sessionId=`) |
| `GET` | `/api/broadcasts/:id` | detail incl. per-target results |
| `POST` | `/api/broadcasts/:id/cancel` | stop a queued/running job |
| `DELETE` | `/api/broadcasts/:id` | remove the record (not while running) |

Delivered sequentially with a random delay between sends (default 1.5-4s) to
stay ban-safe. Max 500 targets per job.

### Webhooks

| Method | Path | Body / notes |
| --- | --- | --- |
| `PUT` | `/api/sessions/:id/webhook` | `{"url": "https://..."}` or `{"url": null}` to clear |
| `POST` | `/api/sessions/:id/webhook/test` | sends a sample payload, returns delivery result |

Forwarded events (POST JSON, 10s timeout):

- `message.received` / `message.sent` - new messages
- `bot.autoreplied` - a keyword rule fired
- `bot.commerce` - the shopping bot replied (action + reply)
- `order.created` / `order.paid` / `order.cancelled` - commerce orders
- `connection.qr` / `connection.open` / `connection.closed` / `connection.logged_out`

Payload shape:

```json
{
  "event": "message.received",
  "sessionId": "clx...",
  "session": "main",
  "timestamp": "2026-11-22T10:00:00.000Z",
  "data": { "id": "3EB0...", "remoteJid": "15551234567@s.whatsapp.net", "fromMe": false, "type": "text", "body": "hello", "timestamp": "..." }
}
```

### Health

`GET /api/health` - no auth. Returns uptime, session counts and the optional
`keyHint` used by the dashboard.

## Architecture

```
index.js                 entry
src/
  server.js              Express app, error handling, boot + graceful shutdown
  config.js              env config
  apikey.js              x-api-key middleware (timing-safe)
  db.js                  Prisma client (own SQLite file, immune to global DATABASE_URL)
  wa/
    sessionManager.js    one Baileys socket per session: QR, reconnect, events, sending, groups
    authState.js         Baileys auth state backed by SQLite (creds + signal keys)
  bot/autoReply.js       keyword rule matching engine
  bot/commerce.js        conversational shopping bot (catalog/cart/checkout/payments)
  stores/                platform connectors: woocommerce, shopify, custom + payments (Stripe)
  broadcast.js           bulk-send worker (sequential + jitter delays)
  webhook/forwarder.js   event delivery
  routes/                sessions, messages, rules, groups, stores, orders, broadcasts, bot
prisma/schema.prisma     Session, WaKey, Message, BotRule, Store, Product, Cart, CartItem, Order, Broadcast
db/gateway.db            SQLite database (created by db:push)
generated/prisma         generated Prisma client
```

## Security notes

- WhatsApp is an unofficial-protocol integration (Baileys). Automating your
  account can, in rare cases, lead to temporary bans - use a dedicated number
  for bots, keep volumes reasonable, and avoid spam-like behaviour.
- Change `API_KEY` before exposing the gateway, put it behind HTTPS, and clear
  `API_KEY_HINT`.
- Anyone with the API key can read the linked account's messages.

## Troubleshooting

- **No QR appears**: check `GET /api/sessions/:id` - `reconnecting` means the
  WhatsApp WebSocket could not be reached from this network.
- **409 on send**: the session is not `connected` yet.
- **Session lost after restart**: sessions with stored credentials reconnect
  automatically on boot (`AUTO_RECONNECT=true`); if the phone unlinked the
  device, `status` becomes `logged_out` and you must scan again.

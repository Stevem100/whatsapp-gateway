# WhatsApp Gateway — REST API Reference

Version 1.0.0 · Base URL `/api` · JSON over HTTP

A self-hosted multi-session WhatsApp bot gateway built on the WhatsApp Web
multi-device protocol ([Baileys](https://github.com/WhiskeySockets/Baileys)).
Every feature of the dashboard is backed by the REST API documented here.

---

## 1. Base URLs

| Access path | URL | Notes |
| --- | --- | --- |
| Gateway (direct) | `http://localhost:3030/api` | Primary base URL, configured via `PORT` |
| Dashboard proxy | `/api/wa/…` on the Next.js app | Server-side proxy: `/api/wa/<path>` → `http://localhost:3030/api/<path>`. Same methods, headers and bodies; returns `502` with `{"error": "WhatsApp gateway is unreachable (…)"}` when the gateway is down |

All examples below use the direct base URL. Through the proxy, replace
`/api/sessions` with `/api/wa/sessions` — everything else is identical.

## 2. Authentication

Every route under `/api` requires the API key, **except** `GET /api/health`
(and the service-info root `/`).

Send the key in the `x-api-key` header (recommended):

```bash
curl -H "x-api-key: $API_KEY" http://localhost:3030/api/sessions
```

or as a query parameter (handy for browsers/QR links):

```
GET /api/sessions?api_key=$API_KEY
```

Comparison is timing-safe. On failure you get:

```json
401 Unauthorized
{ "error": "Unauthorized: missing or invalid x-api-key header" }
```

The default development key is `wg-dev-key-change-me` (set via `API_KEY` in
`.env` — change it before exposing the gateway).

## 3. Conventions

- **Content type**: all requests and responses are `application/json` unless noted.
- **Request body limit**: 25 MB (larger bodies → `413`).
- **IDs**: sessions, rules and messages use Prisma `cuid()` strings (e.g. `clx8…`).
- **Phone numbers**: international format digits without `+` (e.g. `15551234567`).
- **JIDs**: WhatsApp identifiers — `<phone>@s.whatsapp.net` for private chats,
  `<id>@g.us` for groups; broadcast/newsletter JIDs end with `@broadcast`/`@newsletter`.
- **Timestamps**: ISO-8601 strings (`2026-11-22T10:00:00.000Z`).
- **Error envelope**: every non-2xx response is `{"error": "<message>"}`.

| Status | Meaning |
| --- | --- |
| `400` | Validation error (missing/invalid field, bad JSON, malformed JID/invite code) |
| `401` | Missing or invalid API key |
| `404` | Session, rule, store, product, order, broadcast or route not found |
| `409` | Duplicate session name, or action requires a `connected` session (send, broadcast, groups) |
| `413` | Body larger than 25 MB, or media exceeds `MAX_MEDIA_BYTES` |
| `500` | Internal error (includes send timeout after 60 s) |
| `502` | Upstream platform (WooCommerce/Shopify/Stripe/custom site) unreachable or 5xx |

## 4. Endpoint index

| # | Method | Path | Auth | Purpose |
| --- | --- | --- | --- | --- |
| 1 | `GET` | `/api/health` | no | Health check, uptime, session counters |
| 2 | `GET` | `/api/sessions` | yes | List sessions |
| 3 | `POST` | `/api/sessions` | yes | Create session (+ demo rules) |
| 4 | `GET` | `/api/sessions/:id` | yes | Session details + stats |
| 5 | `POST` | `/api/sessions/:id/connect` | yes | Start the WhatsApp connection |
| 6 | `POST` | `/api/sessions/:id/disconnect` | yes | Close the socket, keep credentials |
| 7 | `POST` | `/api/sessions/:id/logout` | yes | Log out and clear credentials |
| 8 | `DELETE` | `/api/sessions/:id` | yes | Delete session, history and rules |
| 9 | `GET` | `/api/sessions/:id/qr` | yes | Fetch the current QR code |
| 10 | `PUT` | `/api/sessions/:id/webhook` | yes | Set/clear the event webhook URL |
| 11 | `POST` | `/api/sessions/:id/webhook/test` | yes | Send a sample webhook payload |
| 12 | `PUT` | `/api/sessions/:id/bot` | yes | Enable/disable the auto-reply bot |
| 13 | `GET` | `/api/sessions/:id/messages/chats` | yes | Chat list with last message + counts |
| 14 | `GET` | `/api/sessions/:id/messages` | yes | Message history (paginated) |
| 15 | `POST` | `/api/sessions/:id/messages` | yes | Send a message (5 types) |
| 16 | `GET` | `/api/sessions/:id/rules` | yes | List auto-reply rules |
| 17 | `POST` | `/api/sessions/:id/rules` | yes | Create a rule |
| 18 | `PATCH` | `/api/sessions/:id/rules/:ruleId` | yes | Partially update a rule |
| 19 | `DELETE` | `/api/sessions/:id/rules/:ruleId` | yes | Delete a rule |
| 20 | `POST` | `/api/stores` | yes | Connect a store (Woo/Shopify/custom/manual) |
| 21 | `GET` | `/api/stores` | yes | List stores |
| 22 | `GET` | `/api/stores/:id` | yes | Store detail + counts |
| 23 | `PATCH` | `/api/stores/:id` | yes | Update store settings |
| 24 | `DELETE` | `/api/stores/:id` | yes | Disconnect store (+ catalog, orders) |
| 25 | `POST` | `/api/stores/:id/test` | yes | Test platform credentials |
| 26 | `POST` | `/api/stores/:id/sync` | yes | Sync products from the platform |
| 27 | `GET` | `/api/stores/:id/products` | yes | List catalog products |
| 28 | `POST` | `/api/stores/:id/products` | yes | Add/update a manual product |
| 29 | `PATCH` | `/api/stores/:id/products/:pid` | yes | Update a product |
| 30 | `DELETE` | `/api/stores/:id/products/:pid` | yes | Delete a product |
| 31 | `GET` | `/api/orders` | yes | List orders (filters) |
| 32 | `GET` | `/api/orders/:id` | yes | Order detail |
| 33 | `POST` | `/api/orders/:id/mark-paid` | yes | Mark paid, sync platform, notify customer |
| 34 | `POST` | `/api/orders/:id/cancel` | yes | Cancel + notify (unpaid only) |
| 35 | `POST` | `/api/orders/:id/notify` | yes | Send a chat message to the customer |
| 36 | `POST` | `/api/orders/:id/payment-link` | yes | Resend payment link/instructions |
| 37 | `POST` | `/api/bot/test` | yes | Simulate a message through the bot pipeline |
| 38 | `GET` | `/api/sessions/:id/groups` | yes | List joined groups |
| 39 | `POST` | `/api/sessions/:id/groups/join` | yes | Join via invite code/link |
| 40 | `GET` | `/api/sessions/:id/groups/:jid` | yes | Group metadata + participants |
| 41 | `POST` | `/api/sessions/:id/groups/:jid/leave` | yes | Leave a group |
| 42 | `GET` | `/api/sessions/:id/groups/:jid/invite` | yes | Get group invite code/link |
| 43 | `POST` | `/api/sessions/:id/groups/:jid/participants` | yes | Add/remove/promote/demote members |
| 44 | `POST` | `/api/broadcasts` | yes | Queue a bulk send |
| 45 | `GET` | `/api/broadcasts` | yes | List broadcast jobs |
| 46 | `GET` | `/api/broadcasts/:id` | yes | Job detail + per-target results |
| 47 | `POST` | `/api/broadcasts/:id/cancel` | yes | Cancel a queued/running job |
| 48 | `DELETE` | `/api/broadcasts/:id` | yes | Delete a finished job record |
| — | `GET` | `/` | no | Service info banner |

## 5. Health & service info

### `GET /api/health` (no auth)

```json
{
  "ok": true,
  "service": "whatsapp-gateway",
  "version": "1.0.0",
  "uptimeSec": 3600,
  "authRequired": true,
  "keyHint": "dev key",
  "sessions": { "total": 2, "connected": 1 }
}
```

`keyHint` mirrors `API_KEY_HINT` from `.env` (shown by the dashboard key
dialog; leave it empty in production).

### `GET /` (no auth)

```json
{
  "name": "whatsapp-gateway",
  "version": "1.0.0",
  "status": "ok",
  "apiBase": "/api",
  "auth": "x-api-key header (see .env API_KEY)"
}
```

## 6. Sessions

A **session** is one linked WhatsApp account. Status lifecycle:
`disconnected → connecting → qr → connected`, plus `reconnecting`
(transient network loss) and `logged_out` (device was unlinked).
Sessions with stored credentials reconnect automatically on gateway boot
(`AUTO_RECONNECT=true`).

### Session object

```json
{
  "id": "clxk2p9q40001abcd",
  "name": "main",
  "status": "connected",
  "botEnabled": true,
  "webhookUrl": "https://example.com/wa-hook",
  "connectedJid": "15551234567:12@s.whatsapp.net",
  "connectedPhone": "15551234567",
  "lastConnectedAt": "2026-11-22T09:00:00.000Z",
  "createdAt": "2026-11-21T15:30:00.000Z",
  "hasCredentials": true,
  "reconnectAttempt": 0,
  "qrAvailable": false
}
```

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Session id (use as `:id` everywhere) |
| `name` | string | Unique display name (max 64 chars) |
| `status` | string | `disconnected` / `connecting` / `qr` / `connected` / `reconnecting` / `logged_out` |
| `botEnabled` | boolean | Auto-reply bot master switch |
| `webhookUrl` | string \| null | Event forwarding target |
| `connectedJid` / `connectedPhone` | string \| null | Identity of the linked account |
| `hasCredentials` | boolean | Whether Baileys credentials are stored (survives restarts) |
| `reconnectAttempt` | int | Current reconnection attempt counter |
| `qrAvailable` | boolean | Whether a QR is currently in memory |

### `GET /api/sessions`

`200` → `{ "sessions": [ Session, … ] }` — ordered by creation time ascending.

### `POST /api/sessions`

```json
{ "name": "main" }
```

`201` → `{ "session": Session }`. Errors: `400` missing name or name > 64
chars; `409` name already exists. A brand-new session is seeded with three
demo rules (`!menu`, `!ping`, contains `hello`) if it has no rules yet.

### `GET /api/sessions/:id`

`200` → `{ "session": Session, "stats": { "messages": 128, "rules": 3, "chats": 9 } }`.
Errors: `404` unknown id.

### `POST /api/sessions/:id/connect`

Starts a Baileys socket for the session and resets the reconnect counter.
If credentials exist the session may go straight to `connected`; otherwise a
QR is issued — poll `GET /:id/qr` or listen for the `connection.qr` webhook.

`200` → `{ "ok": true, "session": Session }`.

### `POST /api/sessions/:id/disconnect`

Closes the WebSocket and sets status to `disconnected`. Credentials are kept,
so `connect` later resumes without re-scanning. `200` → `{ "ok": true, "session": Session }`.

### `POST /api/sessions/:id/logout`

Logs the device out of WhatsApp, **clears all stored credentials and signal
keys**, sets status `logged_out`. A new QR scan is required to link again.
`200` → `{ "ok": true, "session": Session }`.

### `DELETE /api/sessions/:id`

Stops the socket and deletes the session, its message history and its rules.
`200` → `{ "ok": true }`.

### `GET /api/sessions/:id/qr`

While status is `qr`:

```json
{
  "status": "qr",
  "qr": "data:image/png;base64,iVBORw0KGgo…",
  "raw": "2@AbCdEf…",
  "generatedAt": "2026-11-22T10:00:00.000Z",
  "expiresInSec": 60
}
```

Render `qr` (a PNG data URL) directly in an `<img>` tag. WhatsApp refreshes
the QR roughly every 60 s — poll this endpoint or call `connect` again for a
fresh code. Otherwise:

```json
{
  "status": "connected",
  "qr": null,
  "message": "Already connected, no QR needed."
}
```

### `PUT /api/sessions/:id/webhook`

```json
{ "url": "https://example.com/wa-hook" }
```

`200` → `{ "ok": true, "session": Session }`. Pass `null` or `""` to clear.
Errors: `400` field missing, or URL does not start with `http://`/`https://`.

### `POST /api/sessions/:id/webhook/test`

Posts a sample `webhook.test` payload to the configured URL.

- `200` → `{ "ok": true, "httpStatus": 200, "url": "https://…" }` on delivery
- `200` → `{ "ok": false, "error": "…", "url": "https://…" }` on failure
- `400` → no webhook URL configured on the session

### `PUT /api/sessions/:id/bot`

```json
{ "enabled": false }
```

`200` → `{ "ok": true, "session": Session }`. `400` if `enabled` is not a
boolean. When disabled, incoming messages are still stored and forwarded but
no auto-replies fire.

## 7. Messages

### Chat object

```json
{
  "remoteJid": "15551234567@s.whatsapp.net",
  "isGroup": false,
  "lastMessage": {
    "fromMe": false,
    "type": "text",
    "body": "hello!",
    "timestamp": "2026-11-22T10:00:00.000Z"
  },
  "totalMessages": 42
}
```

### Message object

```json
{
  "id": "clxk2p9q40001abcd",
  "sessionId": "clxk2p9q40001abcd",
  "waMessageId": "3EB0B430B6F8F5C0D2A184",
  "remoteJid": "15551234567@s.whatsapp.net",
  "senderJid": "15551234567",
  "pushName": "Alice",
  "fromMe": false,
  "type": "text",
  "body": "hello!",
  "mediaMime": null,
  "status": "received",
  "error": null,
  "timestamp": "2026-11-22T10:00:00.000Z",
  "createdAt": "2026-11-22T10:00:00.000Z"
}
```

`type` is one of `text | image | video | document | location | contact | audio |
sticker | reaction | other`. `status` is `received | sent | delivered | read |
failed` (delivery receipts update outgoing messages live).

### `GET /api/sessions/:id/messages/chats`

Chat list derived from stored messages: one entry per `remoteJid` with the
last message and total count. `200` → `{ "chats": [ Chat, … ] }`.

### `GET /api/sessions/:id/messages`

Query parameters:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `chatJid` | string | — | Filter to one chat |
| `limit` | int 1–200 | `50` | Page size |
| `before` | ISO date | — | Only messages older than this (cursor for paging backwards) |

`200` → `{ "messages": [ Message, … ] }` in **chronological order** (oldest
first of the returned page). Example:

```
GET /api/sessions/:id/messages?chatJid=15551234567@s.whatsapp.net&limit=100
```

### `POST /api/sessions/:id/messages` (send)

Requires the session to be `connected` — otherwise `409`. The recipient `to`
accepts plain digits (`15551234567` → `…@s.whatsapp.net`) or a full JID
(`120363…@g.us` for groups). Send timeout: 60 s → `500`.

**text**

```json
{ "to": "15551234567", "type": "text", "text": "hello!" }
```

**image / video** — supply `mediaUrl` (gateway downloads it, 30 s timeout) or
`mediaBase64` (raw base64 or a `data:` URL). Optional `caption`. The optional
`mimetype` must start with `image/` resp. `video/`.

```json
{ "to": "15551234567", "type": "image", "mediaUrl": "https://example.com/cat.jpg", "caption": "nice" }
{ "to": "15551234567", "type": "video", "mediaBase64": "data:video/mp4;base64,AAAAIGZ0eXA…" }
```

**document** — same media sources, plus `filename` (default `file`) and
optional `caption`.

```json
{ "to": "15551234567", "type": "document", "mediaUrl": "https://example.com/invoice.pdf", "filename": "invoice.pdf" }
```

**location**

```json
{ "to": "15551234567", "type": "location", "lat": -1.2921, "lng": 36.8219 }
```

`lat` must be within `-90..90`, `lng` within `-180..180`.

Responses: `201` → `{ "message": Message }` (stored with `fromMe: true`,
status `sent`). Errors: `400` invalid field/media, `409` not connected,
`413` media > `MAX_MEDIA_BYTES` (default 25 MB).

Every successful send also emits a `message.sent` webhook event.

## 8. Auto-reply rules

Incoming **text** messages (not your own, not broadcast/newsletter) are
matched against the session's **enabled** rules ordered by `priority`
descending, then creation time. The first match replies with the rule text
and its `hits` counter increments. A **3-second per-chat cooldown** prevents
bot loops. Matching is case-insensitive.

When the session has an **active store** (section 9), the commerce bot runs
first and handles shopping commands; keyword rules only fire when the commerce
bot does not handle the message.

| `matchType` | Fires when |
| --- | --- |
| `exact` | Message equals the keyword |
| `contains` (default) | Message contains the keyword |
| `starts_with` | Message starts with the keyword |
| `regex` | Message matches the keyword as a case-insensitive regular expression |

### Rule object

```json
{
  "id": "clxk2p9q40001efgh",
  "sessionId": "clxk2p9q40001abcd",
  "matchType": "contains",
  "keyword": "price",
  "reply": "Our price list: …",
  "enabled": true,
  "priority": 5,
  "hits": 12,
  "createdAt": "2026-11-21T15:30:00.000Z"
}
```

### `GET /api/sessions/:id/rules`

`200` → `{ "rules": [ Rule, … ] }` — priority descending.

### `POST /api/sessions/:id/rules`

```json
{
  "matchType": "contains",
  "keyword": "price",
  "reply": "Our catalogue: …",
  "priority": 5,
  "enabled": true
}
```

Only `keyword` and `reply` are required; `matchType` defaults to `contains`,
`enabled` to `true`, `priority` to `0`. `201` → `{ "rule": Rule }`. Errors:
`400` invalid `matchType` (must be one of the four), empty keyword/reply,
non-integer priority, non-boolean enabled, or a `regex` keyword that does not
compile.

### `PATCH /api/sessions/:id/rules/:ruleId`

Partial update — any subset of the fields above. `200` → `{ "rule": Rule }`.
`404` if the rule does not exist in this session.

### `DELETE /api/sessions/:id/rules/:ruleId`

`200` → `{ "ok": true }`. `404` if not found in this session.

## 9. Commerce — stores and products

A **store** links one e-commerce platform to a session. The commerce bot
(section 10) serves the session's oldest **active** store, so connect one
active shop per session. `type` is one of:

| Type | Required fields | Notes |
| --- | --- | --- |
| `manual` | — | Products managed via the products API; no external platform |
| `woocommerce` | `baseUrl`, `credentials.consumerKey`, `credentials.consumerSecret` | Woo REST API v3 keys (read/write) from WooCommerce → Settings → Advanced → REST API |
| `shopify` | `baseUrl`, `credentials.accessToken` | Admin API token (custom app) with `read_products` + `write_draft_orders` |
| `custom` | `credentials.productsUrl`, `credentials.createOrderUrl` (both optional) | HTTP contract for your own coded site — see below |

### Store object

```json
{
  "id": "clxk2p9q40001abcd",
  "sessionId": "clxk2p9q40001sess",
  "name": "Nairobi Shop",
  "type": "woocommerce",
  "baseUrl": "https://shop.example.com",
  "currency": "KES",
  "paymentProvider": "store",
  "paymentConfig": null,
  "groupChat": false,
  "active": true,
  "hasCredentials": true,
  "credentialsPreview": ["consumerKey", "consumerSecret"],
  "createdAt": "2026-11-22T09:00:00.000Z",
  "updatedAt": "2026-11-22T09:00:00.000Z",
  "productCount": 12
}
```

Credentials are stored server-side and **never returned** — only
`hasCredentials` and the credential key names (`credentialsPreview`).

### `POST /api/stores`

```json
{
  "sessionId": "clxk2p9q40001sess",
  "name": "Nairobi Shop",
  "type": "woocommerce",
  "baseUrl": "https://shop.example.com",
  "credentials": { "consumerKey": "ck_…", "consumerSecret": "cs_…" },
  "currency": "KES",
  "paymentProvider": "store",
  "paymentConfig": null,
  "groupChat": false
}
```

`201` → `{ "store": Store }`. Validation errors (`400`): missing session/name,
unknown `type`, missing `baseUrl`/credentials for woo/shopify, bad URL.
`404` if the session does not exist. Fields:

- `currency` — ISO-style code shown to customers (default `KES`).
- `paymentProvider` — `store` (platform payment page) | `manual` | `stripe`.
- `paymentConfig` — provider settings object:
  - manual: `{ "instructions": "Pay via M-Pesa Paybill 123456, …" }`
  - stripe: `{ "secretKey": "sk_live_…", "successUrl": "…", "cancelUrl": "…" }`
- `groupChat` — let the commerce bot answer inside group chats (default `false`).

### `GET /api/stores`

`?sessionId=` filters by session. `200` → `{ "stores": [Store, …] }`.

### `GET /api/stores/:id`

`200` → `{ "store": Store }` with `productCount` and `orderCount`. `404` unknown id.

### `PATCH /api/stores/:id`

Any subset of the create fields (credentials replaced wholesale when provided).
`200` → `{ "store": Store }`.

### `DELETE /api/stores/:id`

Disconnects the store and **deletes its cached products and locally stored
orders** (cascade). Orders already created in WooCommerce/Shopify remain on
the platform. `200` → `{ "ok": true }`.

### `POST /api/stores/:id/test`

Checks the platform credentials with a lightweight read call (Woo: 1 product;
Shopify: `shop.json`; custom: `productsUrl`/`baseUrl`).

- `200` → `{ "ok": true, "message": "Connected. Products found." }`
- `200` → `{ "ok": false, "message": "WooCommerce API returned HTTP 401" }` on bad credentials

### `POST /api/stores/:id/sync`

Pulls products from the platform into the gateway catalog (up to 200 Woo
products / 100 Shopify products per sync). `200` → `{ "ok": true, "synced": 12, "total": 12 }`.
`400` for manual stores (no platform to sync from); `502` if the platform is unreachable.

### `GET /api/stores/:id/products`

`200` → `{ "products": [Product, …] }` (max 500, oldest first).

### Product object

```json
{
  "id": "clxk2p9q40001prod",
  "storeId": "clxk2p9q40001abcd",
  "externalId": "101",
  "sku": "SB-1",
  "name": "Safari Bag",
  "price": 3500,
  "currency": "KES",
  "stock": 5,
  "imageUrl": "https://…/bag.jpg",
  "active": true,
  "createdAt": "…",
  "updatedAt": "…"
}
```

### `POST /api/stores/:id/products`

Create or upsert a product (by `externalId` when given). Useful for `manual`
and `custom` stores:

```json
{ "name": "Safari Bag", "price": 3500, "stock": 5, "sku": "SB-1", "imageUrl": "https://…" }
```

`201` → `{ "product": Product }`. Errors: `400` missing name, invalid price.

### `PATCH /api/stores/:id/products/:pid` · `DELETE /api/stores/:id/products/:pid`

Partial update (name, price, sku, stock, imageUrl, active) and delete.
`200` → `{ "product": Product }` / `{ "ok": true }`. `404` if not in this store.

## 10. Commerce — chat bot, orders and payments

### How a customer shops

The bot serves the session's oldest **active** store. In private chats it
always answers; in groups only when the store has `groupChat: true`. Commands
(case-insensitive, extra whitespace tolerated):

| Message | Bot behaviour |
| --- | --- |
| `hi` / `hello` / `menu` / `start` / `jambo` / `karibu` | Welcome + how it works |
| `catalog` (also `products`, `price list`) | Numbered product list with prices and stock (top 12) |
| `add 2 [qty]` (also `buy`, `order`) | Add catalog item #2 (qty defaults 1); stock is checked |
| `2` | Shorthand for `add 2` right after a catalog (15 min memory) |
| `cart` | Review cart lines + subtotal |
| `remove 1` / `delete 1` | Drop cart line #1 |
| `clear` | Empty the cart |
| `checkout` (also `place order`) | Create the order, sync to platform, reply with payment info |
| `orders` (also `my orders`) | Last 5 orders with status |
| `pay 12` / `payment 12` | Resend payment link/instructions for order #12 |
| `cancel 12` | Customer cancels an unpaid, pending order |
| `help` | Command list |

Anything else falls through to the keyword rules (section 8). A 2-second
per-chat cooldown guards against flooding.

### `POST /api/bot/test`

Runs the pipeline against a simulated incoming message — the same code path a
real WhatsApp message takes:

```json
{ "sessionId": "…", "chatJid": "254712345678", "text": "checkout", "dryRun": true }
```

- `dryRun: true` (default) — replies are computed (carts/orders **are** created)
  but nothing is sent to WhatsApp.
- `dryRun: false` — the reply is actually delivered from the session socket
  (session must be `connected`, else `409`).

`200` →

```json
{
  "handled": "commerce",
  "action": "checkout",
  "reply": "*Order #12 confirmed* — thank you Alice!\n…\nTo pay:\nhttps://shop.example.com/checkout/order-pay/…",
  "orderId": "clxk…",
  "orderNumber": 12,
  "dryRun": true
}
```

`handled` is `"commerce"`, `"rule"` (keyword rule matched; includes `ruleId`,
`keyword`, `reply`) or `null` when neither bot handled the text.

### Order object

```json
{
  "id": "clxk2p9q40001ordr",
  "number": 12,
  "sessionId": "…",
  "storeId": "…",
  "store": { "id": "…", "name": "Nairobi Shop", "type": "woocommerce", "currency": "KES" },
  "externalOrderId": "9001",
  "chatJid": "254712345678@s.whatsapp.net",
  "customerName": "Alice",
  "items": [{ "productId": "…", "externalId": "101", "name": "Safari Bag", "price": 3500, "qty": 2 }],
  "subtotal": 7000,
  "total": 7000,
  "currency": "KES",
  "status": "pending",
  "paymentStatus": "unpaid",
  "paymentProvider": "store",
  "paymentUrl": "https://shop.example.com/checkout/order-pay/9001/?pay_for_order=true&key=wc_order_…",
  "paymentRef": null,
  "createdAt": "…",
  "updatedAt": "…"
}
```

`status`: `pending` → `paid` → `fulfilled`, or `cancelled`.
`paymentStatus`: `unpaid` | `paid` | `failed`.
`number` is a short per-gateway sequence shown to customers.

### `GET /api/orders`

Query parameters: `sessionId`, `storeId`, `chatJid`, `status`,
`paymentStatus`, `limit` (1–200, default 50). Newest first.
`200` → `{ "orders": [Order, …] }`.

### `GET /api/orders/:id`

`200` → `{ "order": Order }`. `404` unknown id.

### `POST /api/orders/:id/mark-paid`

```json
{ "paymentRef": "QGH7XYZ01", "notify": true }
```

Sets `paymentStatus: paid` (and `status: paid` when pending), pushes
`processing` to WooCommerce / completes the Shopify draft order (best effort,
reported via `externalUpdated`), fires the `order.paid` webhook and sends the
customer a WhatsApp confirmation (`notify: false` skips the message).

`200` → `{ "ok": true, "order": Order, "externalUpdated": true, "notified": false }`.
Idempotent: already-paid orders return `alreadyPaid: true`.

### `POST /api/orders/:id/cancel`

Cancels an unpaid order, pushes `cancelled` to the platform, fires
`order.cancelled` and notifies the customer. `409` if the order is already
paid (refund it on the platform first). Already-cancelled orders return
`alreadyCancelled: true`.

### `POST /api/orders/:id/notify`

```json
{ "text": "Your order #12 has shipped! Track it here: …" }
```

Sends an arbitrary message to the customer's chat. `200` →
`{ "ok": true, "notified": true }` — `notified: false` means the session was
not connected (message skipped, no error).

### `POST /api/orders/:id/payment-link`

Resends the stored payment URL or manual instructions. `409` if the order is
paid or cancelled.

### Payments

| `paymentProvider` | What the customer receives |
| --- | --- |
| `store` | WooCommerce order-pay URL (`/checkout/order-pay/{id}/?pay_for_order=true&key=…`) or Shopify draft-order invoice URL |
| `manual` | The store's `paymentConfig.instructions` text (M-Pesa paybill/Till, bank, cash-on-delivery…) — confirm payment by marking the order paid |
| `stripe` | A hosted Stripe Checkout link created from the cart line items (`paymentConfig.secretKey` required) |

If the platform call fails at checkout the order is still saved locally and
the bot tells the customer the payment link will follow; the sync error is
included in the `order.created` webhook (`syncError`).

### Custom site contract (your own coded site)

```jsonc
// credentials
{
  "headers": { "Authorization": "Bearer …" },      // optional
  "productsUrl": "https://your-site.com/api/wa-products",
  "createOrderUrl": "https://your-site.com/api/wa-orders"
}

// GET productsUrl ->
{ "products": [ { "externalId": "c-1", "name": "…", "price": 240, "sku": "…", "stock": 40, "imageUrl": "…" } ] }
// (a bare JSON array also works)

// POST createOrderUrl <-
{ "customer": { "name": "Alice", "phone": "2547…", "chatJid": "2547…@s.whatsapp.net" },
  "currency": "KES",
  "items": [ { "externalId": "c-1", "name": "…", "price": 240, "qty": 2 } ],
  "note": "" }
// ->
{ "externalOrderId": "CUST-1001", "paymentUrl": "https://your-site.com/pay/abc", "total": 480, "currency": "KES" }
```

## 11. Groups

All group endpoints need a **connected** session (`409` otherwise) and act on
the linked WhatsApp account. Group JIDs look like `1203630…@g.us`.

### `GET /api/sessions/:id/groups`

`200` →

```json
{
  "groups": [
    { "id": "1203630…@g.us", "subject": "Nairobi Buyers Club", "participantsCount": 42,
      "subjectOwner": "2547…@s.whatsapp.net", "createdAt": "2026-01-05T…", "description": "…" }
  ]
}
```

### `POST /api/sessions/:id/groups/join`

```json
{ "code": "https://chat.whatsapp.com/AbCdEfGh12345" }
```

Accepts a full invite link or the bare code. `200` → `{ "ok": true, "joinedJid": "1203630…@g.us", "code": "AbCdEfGh12345" }`.
`400` malformed code or WhatsApp rejected the invite.

### `GET /api/sessions/:id/groups/:jid`

Metadata with the full participant list:

```json
{
  "group": {
    "id": "1203630…@g.us",
    "subject": "Nairobi Buyers Club",
    "participants": [
      { "jid": "2547…@s.whatsapp.net", "phone": "2547…", "admin": "admin" },
      { "jid": "2547…@s.whatsapp.net", "phone": "2547…", "admin": null }
    ]
  }
}
```

`admin` is `"admin"`, `"superadmin"` or `null`.

### `POST /api/sessions/:id/groups/:jid/leave`

`200` → `{ "ok": true, "left": "1203630…@g.us" }`.

### `GET /api/sessions/:id/groups/:jid/invite`

Returns `{ "ok": true, "code": "AbCdEfGh12345", "link": "https://chat.whatsapp.com/AbCdEfGh12345" }`.
`400` if the bot is not a group admin (WhatsApp restriction).

### `POST /api/sessions/:id/groups/:jid/participants`

```json
{ "action": "add", "participants": ["254712345678", "254720987654"] }
```

`action` is `add` | `remove` | `promote` | `demote`; participants are phone
numbers (digits) or full JIDs. `200` → `{ "ok": true, "results": [{ "phone": "2547…", "status": "200" }] }`
(per-participant WhatsApp status; `403`-style failures appear as `status` codes).
The bot must be a group admin.

## 12. Broadcasts

Bulk-send one text message to many chats and groups. Jobs run sequentially
with a **randomised delay between sends** (`minDelayMs`–`maxDelayMs`, default
1500–4000 ms) to stay ban-safe. Max 500 targets per job.

### `POST /api/broadcasts`

```json
{
  "sessionId": "…",
  "message": "Black Friday: 20% off everything this weekend!",
  "targets": ["254712345678", "1203630…@g.us"],
  "minDelayMs": 1500,
  "maxDelayMs": 4000
}
```

`201` → `{ "broadcast": Broadcast }`. Errors: `400` missing message/targets or
>500 targets; `404` unknown session; `409` session not connected. Phone-number
targets are normalised to JIDs; groups keep their `@g.us` JID.

### Broadcast object

```json
{
  "id": "clxk2p9q40001bcst",
  "sessionId": "…",
  "message": "Black Friday: …",
  "status": "running",
  "minDelayMs": 1500,
  "maxDelayMs": 4000,
  "total": 120,
  "sent": 37,
  "failed": 2,
  "createdAt": "…",
  "startedAt": "…",
  "finishedAt": null
}
```

`status`: `queued` → `running` → `done` (or `failed`/`cancelled`).

### `GET /api/broadcasts` · `GET /api/broadcasts/:id`

List (`?sessionId=`, `?limit=`) and detail. The detail adds `targets` and the
per-target `results` array `[{ "target": "…", "ok": true } | { "target": "…", "ok": false, "error": "…" }]`.

### `POST /api/broadcasts/:id/cancel`

Stops a queued/running job after the current send. `409` if already finished.

### `DELETE /api/broadcasts/:id`

Removes the record. `409` while the job is still running.

## 13. Webhooks

Set one webhook URL per session. Every event is delivered as an HTTP **POST
with JSON**, 10-second timeout, **fire-and-forget** (no retries, no auth
headers added — validate on your side). A failing endpoint only produces a
log line; the gateway keeps running.

### Envelope

```json
{
  "event": "message.received",
  "sessionId": "clxk2p9q40001abcd",
  "session": "main",
  "timestamp": "2026-11-22T10:00:00.000Z",
  "data": { }
}
```

### Event catalog

| Event | Fired when | `data` |
| --- | --- | --- |
| `message.received` | Incoming message stored | `{ id, remoteJid, senderJid, pushName, fromMe: false, type, body, mediaMime, timestamp }` |
| `message.sent` | Message sent via API **or** by the bot itself | `{ id, remoteJid, fromMe: true, type, body, mediaMime, timestamp }` (API sends also include `senderJid`, `pushName`) |
| `bot.autoreplied` | A keyword rule fired | `{ remoteJid, ruleId, keyword, reply }` |
| `bot.commerce` | The shopping bot replied | `{ remoteJid, action, reply }` |
| `order.created` | Checkout completed in chat | `{ id, number, storeId, store, chatJid, customerName, itemCount, total, currency, paymentProvider, paymentUrl, externalOrderId, syncError }` |
| `order.paid` | Order marked paid (API or dashboard) | `{ id, number, chatJid, total, currency, paymentRef, externalOrderId, externalUpdated }` |
| `order.cancelled` | Customer or merchant cancelled | `{ id, number, chatJid, by, reason? }` |
| `connection.qr` | QR issued | `{ message }` — scan within ~60 s |
| `connection.open` | Session connected | `{ jid, phone }` |
| `connection.closed` | Socket closed | `{ statusCode, willRetry }` |
| `connection.logged_out` | Device unlinked, credentials cleared | `{}` |
| `webhook.test` | Sent by the test endpoint | sample message payload |

## 14. Quick-start walkthrough

```bash
API=http://localhost:3030
KEY="wg-dev-key-change-me"   # your API_KEY

# 1. create a session
SID=$(curl -s -X POST $API/api/sessions -H "x-api-key: $KEY" \
  -H 'content-type: application/json' -d '{"name":"main"}' | jq -r .session.id)

# 2. start the connection and fetch the QR
curl -s -X POST $API/api/sessions/$SID/connect -H "x-api-key: $KEY" > /dev/null
curl -s $API/api/sessions/$SID/qr -H "x-api-key: $KEY" | jq -r .qr
# -> scan the data-URL QR from the linked phone (WhatsApp ▸ Linked devices)

# 3. wait for status=connected, then send
curl -s $API/api/sessions/$SID -H "x-api-key: $KEY" | jq -r .session.status
curl -s -X POST $API/api/sessions/$SID/messages -H "x-api-key: $KEY" \
  -H 'content-type: application/json' \
  -d '{"to":"15551234567","type":"text","text":"hello from the gateway"}'

# 4. add an auto-reply rule
curl -s -X POST $API/api/sessions/$SID/rules -H "x-api-key: $KEY" \
  -H 'content-type: application/json' \
  -d '{"matchType":"exact","keyword":"!ping","reply":"pong"}'

# 5. receive events
curl -s -X PUT $API/api/sessions/$SID/webhook -H "x-api-key: $KEY" \
  -H 'content-type: application/json' -d '{"url":"https://example.com/wa-hook"}'
```

### Conversational commerce walkthrough

```bash
API=http://localhost:3030
KEY="wg-dev-key-change-me"
SID=<session id>          # connected session from above

# 1. connect a store (manual catalog here; woo/shopify need baseUrl+credentials)
STORE=$(curl -s -X POST $API/api/stores -H "x-api-key: $KEY" \
  -H 'content-type: application/json' -d '{
    "sessionId":"'$SID'", "name":"My Shop", "type":"manual",
    "currency":"KES", "paymentProvider":"manual",
    "paymentConfig":{"instructions":"Pay via M-Pesa Paybill 123456, then send the code here."}}')
STORE_ID=$(echo $STORE | jq -r .store.id)

# 2. add products
curl -s -X POST $API/api/stores/$STORE_ID/products -H "x-api-key: $KEY" \
  -H 'content-type: application/json' \
  -d '{"name":"Safari Bag","price":3500,"stock":5,"sku":"SB-1"}' > /dev/null
curl -s -X POST $API/api/stores/$STORE_ID/products -H "x-api-key: $KEY" \
  -H 'content-type: application/json' \
  -d '{"name":"Beaded Bracelet","price":850,"stock":40}' > /dev/null

# 3. simulate the customer chat (dryRun=true: nothing is sent to WhatsApp)
T() { curl -s -X POST $API/api/bot/test -H "x-api-key: $KEY" \
  -H 'content-type: application/json' \
  -d '{"sessionId":"'$SID'","chatJid":"254712345678","text":"'$1'"}' | jq -r .reply; }
T "hi"; T "catalog"; T "add 1 2"; T "checkout"

# 4. the customer pays (M-Pesa code arrives in chat) -> mark the order paid
ORDER_ID=$(curl -s "$API/api/orders?sessionId=$SID" -H "x-api-key: $KEY" | jq -r '.orders[0].id')
curl -s -X POST $API/api/orders/$ORDER_ID/mark-paid -H "x-api-key: $KEY" \
  -H 'content-type: application/json' -d '{"paymentRef":"QGH7XYZ01"}' | jq .ok
```

For WooCommerce/Shopify the same flow pushes real orders to the platform and
returns its native payment URL — point `baseUrl` + credentials at your store,
sync the catalog, done. For your own coded site implement the two-endpoint
contract from section 9.

## 15. Configuration reference

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3030` | HTTP port |
| `API_KEY` | `wg-dev-key-change-me` | API key — change before exposing |
| `API_KEY_HINT` | dev key | Hint shown by the dashboard; clear in production |
| `GATEWAY_DATABASE_URL` | `file:../db/gateway.db` | SQLite file used at runtime |
| `AUTO_RECONNECT` | `true` | Reconnect on boot and after drops |
| `RECONNECT_MAX_ATTEMPTS` | `8` | Retries before giving up |
| `RECONNECT_DELAY_MS` | `5000` | Delay between retries |
| `MAX_MEDIA_BYTES` | `26214400` (25 MB) | Outbound media size cap |

Machine-readable spec: [`docs/openapi.yaml`](./openapi.yaml) (OpenAPI 3.0 —
import into Postman, Insomnia or Swagger UI).

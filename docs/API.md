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
| `400` | Validation error (missing/invalid field, bad JSON) |
| `401` | Missing or invalid API key |
| `404` | Session, rule or route not found |
| `409` | Duplicate session name, or send attempted while session not `connected` |
| `413` | Body larger than 25 MB, or media exceeds `MAX_MEDIA_BYTES` |
| `500` | Internal error (includes send timeout after 60 s) |

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

## 9. Webhooks

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
| `bot.autoreplied` | A rule fired | `{ remoteJid, ruleId, keyword, reply }` |
| `connection.qr` | QR issued | `{ message }` — scan within ~60 s |
| `connection.open` | Session connected | `{ jid, phone }` |
| `connection.closed` | Socket closed | `{ statusCode, willRetry }` |
| `connection.logged_out` | Device unlinked, credentials cleared | `{}` |
| `webhook.test` | Sent by the test endpoint | sample message payload |

## 10. Quick-start walkthrough

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

## 11. Configuration reference

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

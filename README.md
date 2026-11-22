# WhatsApp Gateway

A self-hosted **multi-session WhatsApp bot gateway**: it logs into real WhatsApp
accounts using the WhatsApp Web multi-device protocol ([Baileys](https://github.com/WhiskeySockets/Baileys))
and exposes a clean REST API plus a web dashboard.

Built with **Express + Baileys + Prisma (SQLite)**, protected by an API key.

## Features

- **Multi-session** - run many WhatsApp accounts on one server, each with its own QR login
- **Send API** - text, image, video, document (from URL or base64) and location messages
- **Receive** - every incoming message is stored in SQLite (chats + message history)
- **Auto-reply bot** - per-session keyword rules (`exact`, `contains`, `starts_with`, `regex`), priority ordered, hit counters, on/off switch
- **Event webhooks** - forward incoming/outgoing messages, bot replies and connection changes to any URL
- **Dashboard** - sessions list, QR login, chat inbox, send box, rule editor, webhook tester
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

## REST API

Base URL: `/api` - all routes except `/health` require `x-api-key`.

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
3-second per-chat cooldown prevents bot loops.

### Webhooks

| Method | Path | Body / notes |
| --- | --- | --- |
| `PUT` | `/api/sessions/:id/webhook` | `{"url": "https://..."}` or `{"url": null}` to clear |
| `POST` | `/api/sessions/:id/webhook/test` | sends a sample payload, returns delivery result |

Forwarded events (POST JSON, 10s timeout):

- `message.received` / `message.sent` - new messages
- `bot.autoreplied` - a rule fired
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
    sessionManager.js    one Baileys socket per session: QR, reconnect, events, sending
    authState.js         Baileys auth state backed by SQLite (creds + signal keys)
  bot/autoReply.js       rule matching engine
  webhook/forwarder.js   event delivery
  routes/                sessions, messages, rules routers
prisma/schema.prisma     Session, WaKey, Message, BotRule
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

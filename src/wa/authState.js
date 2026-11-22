// Baileys auth state backed by SQLite (Prisma) instead of files:
// credentials live in Session.creds, signal keys live in the WaKey table.
const { initAuthCreds, BufferJSON, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys')

async function usePrismaAuthState(sessionId, prisma, logger) {
  const row = await prisma.session.findUnique({ where: { id: sessionId }, select: { creds: true } })
  let creds = row && row.creds ? JSON.parse(row.creds, BufferJSON.reviver) : initAuthCreds()

  const write = (data) => JSON.stringify(data, BufferJSON.replacer)
  const read = (json) => JSON.parse(json, BufferJSON.reviver)

  const store = {
    async get(type, ids) {
      const rows = await prisma.waKey.findMany({
        where: { sessionId, category: type, keyId: { in: Array.from(ids) } },
      })
      const out = {}
      for (const r of rows) out[r.keyId] = read(r.data)
      return out
    },
    async set(data) {
      const tasks = []
      for (const [category, items] of Object.entries(data || {})) {
        for (const [keyId, value] of Object.entries(items || {})) {
          tasks.push(
            prisma.waKey.upsert({
              where: { sessionId_category_keyId: { sessionId, category, keyId } },
              update: { data: write(value) },
              create: { sessionId, category, keyId, data: write(value) },
            })
          )
        }
      }
      await Promise.all(tasks)
    },
    async clear(type, ids) {
      await prisma.waKey.deleteMany({
        where: { sessionId, category: type, keyId: { in: Array.from(ids) } },
      })
    },
  }

  return {
    state: { creds, keys: makeCacheableSignalKeyStore(store, logger) },
    saveCreds: async () => {
      await prisma.session.update({ where: { id: sessionId }, data: { creds: write(creds) } })
    },
  }
}

module.exports = { usePrismaAuthState }

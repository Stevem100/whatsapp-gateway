// Prisma client generated with a custom output path (see prisma/schema.prisma),
// so it survives dependency reinstalls.
// The gateway always uses its own SQLite file: force DATABASE_URL before the
// client is loaded, so a globally exported DATABASE_URL cannot hijack it.
const config = require('./config')

process.env.DATABASE_URL = config.dbUrl

const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports = prisma

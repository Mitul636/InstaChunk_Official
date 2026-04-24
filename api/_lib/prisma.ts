import { PrismaClient } from '@prisma/client'
import { neon } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const connectionString = process.env.DATABASE_URL
const sql = neon(connectionString!)
const adapter = new PrismaNeon(sql)

const prisma = new PrismaClient({ adapter })

export default prisma

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/index.js'

let instance

export function getPrisma() {
  if (!instance) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    instance = new PrismaClient({ adapter })
  }
  return instance
}

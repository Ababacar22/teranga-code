import { getPrisma } from '../db/prisma.js'

export async function requireAdmin(req, res, next) {
  const prisma = getPrisma()
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès administrateur requis.' })
  }
  next()
}

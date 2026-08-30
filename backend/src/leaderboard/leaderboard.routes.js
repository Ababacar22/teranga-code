import { Router } from 'express'
import { requireAuth } from '../auth/auth.middleware.js'
import { getPrisma } from '../db/prisma.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const prisma = getPrisma()
  const users = await prisma.user.findMany({
    orderBy: { xp: 'desc' },
    take: 20,
    select: { id: true, pseudo: true, xp: true, badges: true },
  })

  res.json({
    entries: users.map((u) => ({ id: u.id, pseudo: u.pseudo, xp: u.xp, badgesCount: u.badges.length })),
    currentUserId: req.userId,
  })
})

export default router

import { Router } from 'express'
import { requireAuth } from '../auth/auth.middleware.js'
import { getPrisma } from '../db/prisma.js'
import { getFriendIds } from '../friends/friendLogic.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const prisma = getPrisma()

  let where = {}
  if (req.query.scope === 'friends') {
    const friendships = await prisma.friendship.findMany({
      where: { OR: [{ requesterId: req.userId }, { addresseeId: req.userId }] },
    })
    const friendIds = getFriendIds(friendships, req.userId)
    where = { id: { in: [...friendIds, req.userId] } }
  }

  const users = await prisma.user.findMany({
    where,
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

import { Router } from 'express'
import { requireAuth } from '../auth/auth.middleware.js'
import { requireAdmin } from '../auth/admin.middleware.js'
import { getPrisma } from '../db/prisma.js'

const router = Router()

function summarize(user) {
  return {
    id: user.id,
    email: user.email,
    pseudo: user.pseudo,
    xp: user.xp,
    badgesCount: user.badges.length,
    role: user.role,
    onboarded: user.onboarded,
    streakCurrent: user.streakCurrent,
    streakLongest: user.streakLongest,
    createdAt: user.createdAt,
  }
}

router.get('/users', requireAuth, requireAdmin, async (req, res) => {
  const prisma = getPrisma()
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  const today = new Date().toISOString().slice(0, 10)

  res.json({
    users: users.map(summarize),
    stats: {
      total: users.length,
      totalXp: users.reduce((sum, u) => sum + u.xp, 0),
      activeToday: users.filter((u) => u.lastActiveDate === today).length,
    },
  })
})

router.post('/users/:id/reset', requireAuth, requireAdmin, async (req, res) => {
  const prisma = getPrisma()
  const target = await prisma.user.findUnique({ where: { id: req.params.id } })
  if (!target) return res.status(404).json({ error: 'Utilisateur introuvable.' })
  if (target.role === 'admin') {
    return res.status(400).json({ error: 'Impossible de réinitialiser un compte administrateur.' })
  }

  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      xp: 0,
      badges: [],
      missedQuestions: [],
      onboarded: false,
      streakCurrent: 0,
      streakLongest: 0,
      lastActiveDate: null,
      level: null,
      goal: null,
      focusAreas: [],
    },
  })
  res.json(summarize(updated))
})

router.delete('/users/:id', requireAuth, requireAdmin, async (req, res) => {
  const prisma = getPrisma()
  const target = await prisma.user.findUnique({ where: { id: req.params.id } })
  if (!target) return res.status(404).json({ error: 'Utilisateur introuvable.' })
  if (target.role === 'admin') {
    return res.status(400).json({ error: 'Impossible de supprimer un compte administrateur.' })
  }
  if (target.id === req.userId) {
    return res.status(400).json({ error: 'Impossible de supprimer son propre compte depuis ce panel.' })
  }

  await prisma.challenge.deleteMany({ where: { OR: [{ fromUserId: target.id }, { toUserId: target.id }] } })
  await prisma.user.delete({ where: { id: target.id } })
  res.json({ ok: true })
})

export default router

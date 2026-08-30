import { Router } from 'express'
import { requireAuth } from '../auth/auth.middleware.js'
import { getPrisma } from '../db/prisma.js'
import { VALID_BADGE_IDS, maxXpForBadge } from '../content/badges.js'

const router = Router()
const ABSOLUTE_MAX_XP = 200

function publicProgress(user) {
  return {
    xp: user.xp,
    badges: user.badges,
    onboarded: user.onboarded,
    missedQuestions: user.missedQuestions,
    streakCurrent: user.streakCurrent,
    streakLongest: user.streakLongest,
    level: user.level,
    goal: user.goal,
    focusAreas: user.focusAreas,
    role: user.role,
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayStr() {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

router.get('/', requireAuth, async (req, res) => {
  const prisma = getPrisma()
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' })
  res.json(publicProgress(user))
})

router.post('/xp', requireAuth, async (req, res) => {
  const amount = Number(req.body.amount)
  if (!Number.isFinite(amount) || amount < 0 || amount > ABSOLUTE_MAX_XP) {
    return res.status(400).json({ error: 'Montant invalide.' })
  }

  const prisma = getPrisma()
  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { xp: { increment: amount } },
  })
  res.json(publicProgress(user))
})

router.post('/badge', requireAuth, async (req, res) => {
  const { badgeId } = req.body
  if (!badgeId || !VALID_BADGE_IDS.has(badgeId)) {
    return res.status(400).json({ error: 'badgeId invalide.' })
  }

  const prisma = getPrisma()
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' })

  const badges = user.badges.includes(badgeId) ? user.badges : [...user.badges, badgeId]
  const updated = await prisma.user.update({ where: { id: req.userId }, data: { badges } })
  res.json(publicProgress(updated))
})

// Endpoint utilisé par la remise de récompense (fin de sujet/entretien) :
// atomique, avec liste blanche de badges et plafond d'XP. Idempotent une
// fois le badge obtenu : rejouer un sujet déjà maîtrisé ne réattribue plus
// d'XP (avant maîtrise, l'XP reste acquis même sans score parfait — seul
// le badge exige un score parfait).
router.post('/complete-topic', requireAuth, async (req, res) => {
  const { badgeId, xp, perfect } = req.body
  const amount = Number(xp)

  if (!badgeId || !VALID_BADGE_IDS.has(badgeId)) {
    return res.status(400).json({ error: 'badgeId invalide.' })
  }
  if (!Number.isFinite(amount) || amount < 0 || amount > maxXpForBadge(badgeId)) {
    return res.status(400).json({ error: 'Montant XP invalide.' })
  }

  const prisma = getPrisma()
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' })

  if (user.badges.includes(badgeId)) {
    // Sujet déjà maîtrisé : plus d'XP à farmer en rejouant.
    return res.json(publicProgress(user))
  }

  const badges = perfect ? [...user.badges, badgeId] : user.badges
  const updated = await prisma.user.update({
    where: { id: req.userId },
    data: { xp: { increment: amount }, badges },
  })
  res.json(publicProgress(updated))
})

router.post('/onboarded', requireAuth, async (req, res) => {
  const prisma = getPrisma()
  const updated = await prisma.user.update({ where: { id: req.userId }, data: { onboarded: true } })
  res.json(publicProgress(updated))
})

router.post('/missed', requireAuth, async (req, res) => {
  const { key, missed } = req.body
  if (!key) return res.status(400).json({ error: 'key requis.' })

  const prisma = getPrisma()
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' })

  const already = user.missedQuestions.includes(key)
  let missedQuestions = user.missedQuestions
  if (missed && !already) {
    missedQuestions = [...user.missedQuestions, key]
  } else if (!missed && already) {
    missedQuestions = user.missedQuestions.filter((k) => k !== key)
  }

  const updated = await prisma.user.update({ where: { id: req.userId }, data: { missedQuestions } })
  res.json(publicProgress(updated))
})

router.post('/ping', requireAuth, async (req, res) => {
  const prisma = getPrisma()
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' })

  const today = todayStr()
  let { streakCurrent, streakLongest, lastActiveDate } = user

  if (lastActiveDate !== today) {
    streakCurrent = lastActiveDate === yesterdayStr() ? streakCurrent + 1 : 1
    streakLongest = Math.max(streakLongest, streakCurrent)
    lastActiveDate = today
  }

  const updated = await prisma.user.update({
    where: { id: req.userId },
    data: { streakCurrent, streakLongest, lastActiveDate },
  })
  res.json(publicProgress(updated))
})

router.post('/wizard', requireAuth, async (req, res) => {
  const { level, goal, focusAreas } = req.body
  const prisma = getPrisma()
  const updated = await prisma.user.update({
    where: { id: req.userId },
    data: {
      level: level ?? null,
      goal: goal ?? null,
      focusAreas: Array.isArray(focusAreas) ? focusAreas : [],
    },
  })
  res.json(publicProgress(updated))
})

export default router

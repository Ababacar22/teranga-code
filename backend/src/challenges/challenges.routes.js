import { Router } from 'express'
import { requireAuth } from '../auth/auth.middleware.js'
import { getPrisma } from '../db/prisma.js'
import { computeScoreSubmission } from './challengeScoring.js'

const router = Router()

function publicChallenge(c) {
  return {
    id: c.id,
    topicId: c.topicId,
    status: c.status,
    fromScore: c.fromScore,
    toScore: c.toScore,
    createdAt: c.createdAt,
    fromUser: { id: c.fromUser.id, pseudo: c.fromUser.pseudo },
    toUser: { id: c.toUser.id, pseudo: c.toUser.pseudo },
  }
}

router.post('/', requireAuth, async (req, res) => {
  const { toPseudo, topicId } = req.body
  if (!toPseudo || !topicId) {
    return res.status(400).json({ error: 'toPseudo et topicId requis.' })
  }

  const prisma = getPrisma()
  const toUser = await prisma.user.findUnique({ where: { pseudo: toPseudo } })
  if (!toUser) return res.status(404).json({ error: 'Aucun joueur avec ce pseudo.' })
  if (toUser.id === req.userId) {
    return res.status(400).json({ error: 'Impossible de te défier toi-même.' })
  }

  const challenge = await prisma.challenge.create({
    data: { fromUserId: req.userId, toUserId: toUser.id, topicId },
    include: { fromUser: true, toUser: true },
  })
  res.status(201).json(publicChallenge(challenge))
})

router.get('/', requireAuth, async (req, res) => {
  const prisma = getPrisma()
  const challenges = await prisma.challenge.findMany({
    where: { OR: [{ fromUserId: req.userId }, { toUserId: req.userId }] },
    include: { fromUser: true, toUser: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json(challenges.map(publicChallenge))
})

router.post('/:id/complete', requireAuth, async (req, res) => {
  const score = Number(req.body.score)
  if (!Number.isFinite(score) || score < 0) {
    return res.status(400).json({ error: 'Score invalide.' })
  }

  const prisma = getPrisma()
  const challenge = await prisma.challenge.findUnique({ where: { id: req.params.id } })
  if (!challenge) return res.status(404).json({ error: 'Défi introuvable.' })

  const result = computeScoreSubmission({ challenge, userId: req.userId, score })
  if (result.error) return res.status(result.error.status).json({ error: result.error.message })

  const updated = await prisma.challenge.update({
    where: { id: req.params.id },
    data: { ...result.data, status: result.status },
    include: { fromUser: true, toUser: true },
  })
  res.json(publicChallenge(updated))
})

export default router

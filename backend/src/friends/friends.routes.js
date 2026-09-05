import { Router } from 'express'
import { requireAuth } from '../auth/auth.middleware.js'
import { getPrisma } from '../db/prisma.js'
import { validateFriendRequest } from './friendLogic.js'

const router = Router()

function publicFriendship(f) {
  return {
    id: f.id,
    status: f.status,
    createdAt: f.createdAt,
    requester: { id: f.requester.id, pseudo: f.requester.pseudo },
    addressee: { id: f.addressee.id, pseudo: f.addressee.pseudo },
  }
}

router.post('/', requireAuth, async (req, res) => {
  const { pseudo } = req.body
  if (!pseudo) return res.status(400).json({ error: 'pseudo requis.' })

  const prisma = getPrisma()
  const addressee = await prisma.user.findUnique({ where: { pseudo } })

  const existing = addressee
    ? await prisma.friendship.findFirst({
        where: {
          OR: [
            { requesterId: req.userId, addresseeId: addressee?.id },
            { requesterId: addressee?.id, addresseeId: req.userId },
          ],
        },
      })
    : null

  const check = validateFriendRequest({ requesterId: req.userId, addressee, existing })
  if (check.error) return res.status(400).json({ error: check.error })

  const friendship = await prisma.friendship.create({
    data: { requesterId: req.userId, addresseeId: addressee.id },
    include: { requester: true, addressee: true },
  })
  res.status(201).json(publicFriendship(friendship))
})

router.get('/', requireAuth, async (req, res) => {
  const prisma = getPrisma()
  const friendships = await prisma.friendship.findMany({
    where: { OR: [{ requesterId: req.userId }, { addresseeId: req.userId }] },
    include: { requester: true, addressee: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json(friendships.map(publicFriendship))
})

router.post('/:id/accept', requireAuth, async (req, res) => {
  const prisma = getPrisma()
  const friendship = await prisma.friendship.findUnique({ where: { id: req.params.id } })
  if (!friendship) return res.status(404).json({ error: 'Demande introuvable.' })
  if (friendship.addresseeId !== req.userId) {
    return res.status(403).json({ error: "Seul le destinataire peut accepter cette demande." })
  }
  if (friendship.status === 'accepted') return res.status(409).json({ error: 'Déjà acceptée.' })

  const updated = await prisma.friendship.update({
    where: { id: req.params.id },
    data: { status: 'accepted' },
    include: { requester: true, addressee: true },
  })
  res.json(publicFriendship(updated))
})

router.delete('/:id', requireAuth, async (req, res) => {
  const prisma = getPrisma()
  const friendship = await prisma.friendship.findUnique({ where: { id: req.params.id } })
  if (!friendship) return res.status(404).json({ error: 'Introuvable.' })
  if (friendship.requesterId !== req.userId && friendship.addresseeId !== req.userId) {
    return res.status(403).json({ error: "Cette relation ne t'appartient pas." })
  }
  await prisma.friendship.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

export default router

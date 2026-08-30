import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getPrisma } from '../db/prisma.js'

const router = Router()

function signToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    pseudo: user.pseudo,
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

router.post('/register', async (req, res) => {
  const { email, pseudo, password } = req.body

  if (!email || !pseudo || !password || password.length < 6) {
    return res.status(400).json({ error: 'Email, pseudo et mot de passe (6+ caractères) requis.' })
  }

  const prisma = getPrisma()
  const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { pseudo }] } })
  if (existing) {
    return res.status(409).json({ error: 'Email ou pseudo déjà utilisé.' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { email, pseudo, passwordHash } })

  res.status(201).json({ token: signToken(user), user: toPublicUser(user) })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' })
  }

  const prisma = getPrisma()
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: 'Identifiants invalides.' })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return res.status(401).json({ error: 'Identifiants invalides.' })
  }

  res.json({ token: signToken(user), user: toPublicUser(user) })
})

export default router

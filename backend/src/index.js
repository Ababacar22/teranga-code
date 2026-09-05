import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import authRoutes from './auth/auth.routes.js'
import progressRoutes from './progress/progress.routes.js'
import leaderboardRoutes from './leaderboard/leaderboard.routes.js'
import challengesRoutes from './challenges/challenges.routes.js'
import adminRoutes from './admin/admin.routes.js'
import { isValidJwtSecret } from './config/jwtSecret.js'

if (!isValidJwtSecret(process.env.JWT_SECRET)) {
  console.error(
    'JWT_SECRET manquant, trop court (< 32 caractères) ou égal à une valeur par défaut connue. ' +
      "Génère-en un avec `openssl rand -hex 32` et place-le dans backend/.env.",
  )
  process.exit(1)
}

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5185',
  }),
)
app.use(express.json())

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives, réessaie dans quelques minutes.' },
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/auth', authLimiter, authRoutes)
app.use('/progress', progressRoutes)
app.use('/leaderboard', leaderboardRoutes)
app.use('/challenges', challengesRoutes)
app.use('/admin', adminRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Erreur interne du serveur.' })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})

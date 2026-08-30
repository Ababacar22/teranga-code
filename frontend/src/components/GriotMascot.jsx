import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { GriotAvatar } from './Griot'
import { useAuth } from '../features/auth/AuthContext'
import { useProgress } from '../features/progression/useProgress'
import { getRecommendedNext } from '../lib/learningPath'

const HIDDEN_ROUTES = ['/bienvenue', '/connexion', '/inscription']

function pickMessage({ missedQuestions, streakCurrent, recommended, badges }) {
  if (missedQuestions.length >= 3) {
    return `Tu as ${missedQuestions.length} questions à revoir — un petit tour par la révision ?`
  }
  if (streakCurrent >= 3) {
    return `${streakCurrent} jours de suite, teranga ! Ne casse pas ta série aujourd'hui.`
  }
  if (badges.length === 0) {
    return "Ton premier badge t'attend — lance-toi sur un sujet !"
  }
  if (recommended) {
    return `Je te recommande "${recommended.title}" à ${recommended.villeName} ensuite.`
  }
  return 'Teranga ! Je suis là si tu as besoin d’un conseil.'
}

function GriotMascot() {
  const location = useLocation()
  const { user } = useAuth()
  const { onboarded, wizardDone, missedQuestions, streakCurrent, badges } = useProgress()
  const [open, setOpen] = useState(false)

  if (!user || !onboarded || !wizardDone) return null
  if (HIDDEN_ROUTES.includes(location.pathname)) return null

  const recommended = getRecommendedNext(user)
  const message = pickMessage({ missedQuestions, streakCurrent, recommended, badges })

  return (
    <div className="griot-mascot">
      <AnimatePresence>
        {open && (
          <motion.div
            className="griot-mascot__bubble"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        className="griot-mascot__avatar"
        onClick={() => setOpen((o) => !o)}
        aria-label="Ouvrir le message du Griot"
        animate={!open ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GriotAvatar />
      </motion.button>
    </div>
  )
}

export default GriotMascot

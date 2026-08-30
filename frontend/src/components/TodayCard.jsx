import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const GOAL_MESSAGES = {
  entretien: { icon: '🎯', headline: 'Ton entretien approche — restons concentrés sur l’essentiel.' },
  apprentissage: { icon: '🌱', headline: 'Prêt pour la suite de ton apprentissage ?' },
  'remise-a-niveau': { icon: '🔁', headline: 'Reprenons calmement, à ton rythme.' },
}

function TodayCard({ goal, recommended, streakCurrent, missedCount }) {
  const navigate = useNavigate()
  const message = GOAL_MESSAGES[goal] ?? { icon: '🗺️', headline: 'Prêt à continuer ton voyage ?' }

  return (
    <motion.div
      className="today-card"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="today-card__top">
        <span className="today-card__icon">{message.icon}</span>
        <div>
          <p className="today-card__headline">{message.headline}</p>
          {streakCurrent > 0 && (
            <span className="today-card__streak">
              🔥 {streakCurrent} jour{streakCurrent > 1 ? 's' : ''} de suite
            </span>
          )}
        </div>
      </div>

      {recommended ? (
        <button
          type="button"
          className="today-card__cta btn btn--primary btn--pulse"
          onClick={() => navigate(`/ville/${recommended.villeId}/quartier/${recommended.topicId}`)}
        >
          🧭 Continuer : {recommended.title} — {recommended.villeName}
        </button>
      ) : (
        <p className="today-card__done">🎉 Tous les sujets débloqués sont terminés — explore la carte librement !</p>
      )}

      <div className="today-card__secondary">
        {goal === 'entretien' && (
          <button type="button" className="btn btn--small btn--secondary" onClick={() => navigate('/entretien')}>
            🎤 Simuler un entretien
          </button>
        )}
        {goal === 'remise-a-niveau' && missedCount > 0 && (
          <button type="button" className="btn btn--small btn--secondary" onClick={() => navigate('/revision')}>
            📚 Réviser mes erreurs ({missedCount})
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default TodayCard

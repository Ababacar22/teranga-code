import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getVille } from '../content'
import { useProgress } from '../features/progression/useProgress'
import RecapSheet from '../components/RecapSheet'
import CityDiscovery from '../components/CityDiscovery'

function DistrictScene() {
  const { villeId } = useParams()
  const navigate = useNavigate()
  const { hasBadge } = useProgress()
  const ville = getVille(villeId)
  const [recapTopic, setRecapTopic] = useState(null)
  const [entering, setEntering] = useState(null)

  function handleStart(topic) {
    if (entering) return
    setEntering(topic.id)
    setTimeout(() => navigate(`/ville/${villeId}/quartier/${topic.id}`), 380)
  }

  if (!ville) {
    return (
      <div className="scene">
        <h2>Ville introuvable</h2>
        <button className="btn btn--secondary" onClick={() => navigate('/')}>
          Retour à la carte
        </button>
      </div>
    )
  }

  if (ville.special === 'interview') {
    return <Navigate to="/entretien" replace />
  }

  return (
    <div className="scene scene--district">
      <div className="district-header">
        <span className="quartier-header__ville">{ville.name}</span>
        <h2>{ville.rubrique}</h2>
        <p>Choisis un sujet à explorer avec le Griot.</p>
      </div>

      <CityDiscovery ville={ville} />

      <div className="topic-grid">
        {ville.topics.map((topic, i) => {
          const done = hasBadge(topic.badge.id)
          return (
            <motion.div
              key={topic.id}
              className={`topic-card ${done ? 'topic-card--done' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              animate={
                entering
                  ? entering === topic.id
                    ? { opacity: 1, y: 0, scale: 1.06 }
                    : { opacity: 0.2, y: 0, scale: 0.97 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={{ delay: entering ? 0 : i * 0.05, duration: entering ? 0.32 : 0.3 }}
            >
              <span className="topic-card__emoji">{topic.badge.emoji}</span>
              <h3>{topic.title}</h3>
              <span className="topic-card__category">{topic.category}</span>
              <div className="topic-card__actions">
                <button className="btn btn--primary" onClick={() => handleStart(topic)} disabled={!!entering}>
                  {done ? 'Rejouer' : 'Commencer'}
                </button>
                {done && (
                  <button className="btn btn--secondary" onClick={() => setRecapTopic(topic)} disabled={!!entering}>
                    Fiche récap
                  </button>
                )}
              </div>
              {done && <span className="topic-card__done-tag">✓ Terminé</span>}
            </motion.div>
          )
        })}
      </div>

      <button className="btn btn--secondary" onClick={() => navigate('/')}>
        ← Retour à la carte
      </button>

      {recapTopic && <RecapOverlay topic={recapTopic} onClose={() => setRecapTopic(null)} />}
    </div>
  )
}

function RecapOverlay({ topic, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <RecapSheet topic={topic} onClose={onClose} />
      </div>
    </div>
  )
}

export default DistrictScene

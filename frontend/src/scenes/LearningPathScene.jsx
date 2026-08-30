import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import { getFullPath } from '../lib/learningPath'

const STATUS_LABEL = {
  done: '✓ Terminé',
  next: '→ Prochain',
  upcoming: 'À venir',
  locked: '🔒 Verrouillé',
}

function LearningPathScene() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const path = getFullPath(user)

  return (
    <div className="scene scene--path">
      <h2>🧭 Ton parcours recommandé</h2>
      <p>Basé sur tes réponses au démarrage — libre à toi de suivre l'ordre ou de naviguer librement sur la carte.</p>

      <ol className="path-list">
        {path.map((step) => (
          <li key={step.topicId} className={`path-row path-row--${step.status}`}>
            <span className="path-row__ville">{step.villeName}</span>
            <span className="path-row__title">{step.title}</span>
            <span className="path-row__status">{STATUS_LABEL[step.status]}</span>
            {(step.status === 'next' || step.status === 'upcoming') && (
              <button
                className="btn btn--small btn--secondary"
                onClick={() => navigate(`/ville/${step.villeId}/quartier/${step.topicId}`)}
              >
                Jouer
              </button>
            )}
          </li>
        ))}
      </ol>

      <button className="btn btn--secondary" onClick={() => navigate('/')}>
        ← Retour à la carte
      </button>
    </div>
  )
}

export default LearningPathScene

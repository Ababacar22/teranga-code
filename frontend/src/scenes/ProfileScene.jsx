import { useNavigate } from 'react-router-dom'
import { villes } from '../content'
import { useProgress } from '../features/progression/useProgress'
import { useAuth } from '../features/auth/AuthContext'
import ShareCard from '../components/ShareCard'
import BadgeShareButton from '../components/BadgeShareButton'

function ProfileScene() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { xp, badges, streakCurrent } = useProgress()
  const xpLevel = Math.floor(xp / 100) + 1
  const earnedTopics = villes.flatMap((v) => v.topics ?? []).filter((t) => badges.includes(t.badge.id))

  return (
    <div className="scene scene--profile">
      <div className="profile-card">
        <div className="profile-card__header">
          <div>
            <h2>{user?.pseudo}</h2>
            <p>{user?.email}</p>
          </div>
          <div className="profile-card__stats">
            <span>Niveau {xpLevel}</span>
            <span>{xp} XP</span>
            <span>{badges.length} badges</span>
          </div>
        </div>

        <h3>Badges obtenus</h3>
        {badges.length === 0 ? (
          <p>Aucun badge pour l'instant — commence un sujet sur la carte !</p>
        ) : (
          <div className="profile-badges">
            {earnedTopics.map((t) => (
              <span key={t.badge.id} className="profile-badge">
                {t.badge.emoji} {t.badge.name}
                <BadgeShareButton
                  pseudo={user?.pseudo}
                  badgeEmoji={t.badge.emoji}
                  badgeName={t.badge.name}
                  topicTitle={t.title}
                />
              </span>
            ))}
          </div>
        )}

        <h3>Progression par rubrique</h3>
        <div className="profile-rubriques">
          {villes
            .filter((v) => v.topics)
            .map((v) => {
              const done = v.topics.filter((t) => badges.includes(t.badge.id)).length
              return (
                <div key={v.id} className="profile-rubrique-row">
                  <span>
                    {v.icon} {v.rubrique}
                  </span>
                  <span>
                    {done}/{v.topics.length} sujets maîtrisés
                  </span>
                </div>
              )
            })}
        </div>
        <details className="profile-scoring-info">
          <summary>Comment fonctionne le score ?</summary>
          <ul>
            <li>Chaque sujet rapporte jusqu'à <strong>100 XP</strong> (5 questions de quiz, ~20 XP chacune).</li>
            <li>La simulation d'entretien rapporte jusqu'à <strong>190 XP</strong> (19 questions).</li>
            <li>
              Un <strong>badge</strong> n'est obtenu qu'avec un score parfait sur le sujet — mais l'XP déjà gagné
              reste acquis même sans score parfait.
            </li>
            <li>
              Rejouer un sujet déjà maîtrisé (badge obtenu) ne rapporte plus d'XP supplémentaire — impossible de
              farmer en boucle.
            </li>
            <li>Ton niveau = XP total ÷ 100 (arrondi), donc 100 XP par niveau.</li>
          </ul>
        </details>
      </div>

      <div className="profile-actions">
        <ShareCard
          pseudo={user?.pseudo}
          level={xpLevel}
          xp={xp}
          badgesCount={badges.length}
          streakCurrent={streakCurrent}
          badgeEmojis={earnedTopics.map((t) => t.badge.emoji)}
        />
        <button className="btn btn--secondary" onClick={() => window.print()}>
          📄 Exporter en PDF
        </button>
        <button className="btn btn--secondary" onClick={() => navigate('/')}>
          ← Retour à la carte
        </button>
      </div>
    </div>
  )
}

export default ProfileScene

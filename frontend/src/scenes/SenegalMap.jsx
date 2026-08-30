import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { villes, getUnlockInfo } from '../content'
import ProgressBar from '../components/ProgressBar'
import StreakBadge from '../components/StreakBadge'
import SenegalLeafletMap from '../components/SenegalLeafletMap'
import OnboardingFlow from '../components/OnboardingFlow'
import TodayCard from '../components/TodayCard'
import { useProgress } from '../features/progression/useProgress'
import { useAuth } from '../features/auth/AuthContext'
import { getRecommendedNext } from '../lib/learningPath'

function SenegalMap() {
  const navigate = useNavigate()
  const {
    xp,
    badges,
    missedQuestions,
    onboarded,
    wizardDone,
    streakCurrent,
    streakLongest,
    goal,
    focusAreas,
    isGuest,
    offline,
    completeOnboarding,
    ping,
  } = useProgress()
  const { logout, user } = useAuth()
  const pinged = useRef(false)

  useEffect(() => {
    if (onboarded && wizardDone && !pinged.current) {
      pinged.current = true
      ping()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboarded, wizardDone])

  if (!onboarded || !wizardDone) {
    return <OnboardingFlow onFinish={completeOnboarding} />
  }

  const handleEnter = (ville) => {
    if (ville.special === 'interview') navigate('/entretien')
    else navigate(`/ville/${ville.id}`)
  }

  const recommended = getRecommendedNext(user)

  return (
    <div className="scene scene--map">
      <header className="map-header">
        <div className="map-header__top">
          <div>
            <h1>Teranga Code</h1>
            <p>Voyage à travers le Sénégal pour te préparer aux entretiens tech.</p>
          </div>
          <div className="map-header__account">
            {offline && <span className="status-chip status-chip--offline">🔌 Hors-ligne</span>}
            {isGuest && <span className="status-chip status-chip--guest">👤 Invité</span>}
            <span>{user?.pseudo}</span>
            <button
              className="btn btn--secondary btn--small"
              onClick={() => {
                if (!isGuest || window.confirm('Ta progression invité sera définitivement perdue. Continuer ?')) logout()
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
        {isGuest && (
          <p className="guest-banner">
            Ta progression n'est sauvegardée que sur cet appareil.{' '}
            <button
              type="button"
              className="guest-banner__link"
              onClick={() => {
                if (window.confirm('Créer un compte réinitialisera ta session invité actuelle. Continuer ?')) logout()
              }}
            >
              Crée un compte
            </button>{' '}
            pour ne pas la perdre.
          </p>
        )}
        <div className="map-header__meta">
          <ProgressBar xp={xp} />
          <StreakBadge current={streakCurrent} longest={streakLongest} />
        </div>
        <nav className="map-nav">
          <button className="btn btn--secondary btn--small" onClick={() => navigate('/parcours')}>
            🧭 Mon parcours
          </button>
          {!isGuest && (
            <button className="btn btn--secondary btn--small" onClick={() => navigate('/defis')}>
              ⚔️ Défis
            </button>
          )}
          {!isGuest && (
            <button className="btn btn--secondary btn--small" onClick={() => navigate('/classement')}>
              🏆 Classement
            </button>
          )}
          <button className="btn btn--secondary btn--small" onClick={() => navigate('/profil')}>
            🪪 Mon profil
          </button>
          <button className="btn btn--secondary btn--small" onClick={() => navigate('/lexique')}>
            📖 Lexique
          </button>
          {missedQuestions.length > 0 && (
            <button className="btn btn--secondary btn--small" onClick={() => navigate('/revision')}>
              🔁 Réviser mes erreurs ({missedQuestions.length})
            </button>
          )}
          {user?.role === 'admin' && (
            <button className="btn btn--secondary btn--small" onClick={() => navigate('/admin')}>
              🛠️ Admin
            </button>
          )}
        </nav>
      </header>

      <TodayCard goal={goal} recommended={recommended} streakCurrent={streakCurrent} missedCount={missedQuestions.length} />

      <SenegalLeafletMap
        villes={villes}
        unlockInfoFor={(ville) => getUnlockInfo(ville.id, badges, focusAreas)}
        onCityClick={handleEnter}
      />

      {badges.length > 0 && <p className="map-badges-count">{badges.length} badge(s) débloqué(s)</p>}
    </div>
  )
}

export default SenegalMap

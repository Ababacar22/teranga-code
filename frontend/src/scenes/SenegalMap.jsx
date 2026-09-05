import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { villes, getUnlockInfo } from '../content'
import ProgressBar from '../components/ProgressBar'
import StreakBadge from '../components/StreakBadge'
import SenegalLeafletMap from '../components/SenegalLeafletMap'
import OnboardingFlow from '../components/OnboardingFlow'
import TodayCard from '../components/TodayCard'
import DailyChallengeCard from '../components/DailyChallengeCard'
import { useProgress } from '../features/progression/useProgress'
import { useAuth } from '../features/auth/AuthContext'
import { getRecommendedNext } from '../lib/learningPath'
import { getLanguage } from '../lib/language'

const TEXT = {
  fr: {
    tagline: 'Voyage à travers le Sénégal pour te préparer aux entretiens tech.',
    offline: '🔌 Hors-ligne',
    guest: '👤 Invité',
    logout: 'Déconnexion',
    logoutGuestConfirm: 'Ta progression invité sera définitivement perdue. Continuer ?',
    guestBanner: "Ta progression n'est sauvegardée que sur cet appareil.",
    createAccount: 'Crée un compte',
    guestBannerEnd: 'pour ne pas la perdre.',
    createAccountConfirm: 'Créer un compte réinitialisera ta session invité actuelle. Continuer ?',
    path: '🧭 Mon parcours',
    challenges: '⚔️ Défis',
    leaderboard: '🏆 Classement',
    profile: '🪪 Mon profil',
    glossary: '📖 Lexique',
    revise: (n) => `🔁 Réviser mes erreurs (${n})`,
    admin: '🛠️ Admin',
    badgesUnlocked: (n) => `${n} badge(s) débloqué(s)`,
  },
  en: {
    tagline: 'Travel across Senegal to prepare for your tech interviews.',
    offline: '🔌 Offline',
    guest: '👤 Guest',
    logout: 'Log out',
    logoutGuestConfirm: 'Your guest progress will be permanently lost. Continue?',
    guestBanner: 'Your progress is only saved on this device.',
    createAccount: 'Create an account',
    guestBannerEnd: 'to avoid losing it.',
    createAccountConfirm: 'Creating an account will reset your current guest session. Continue?',
    path: '🧭 My path',
    challenges: '⚔️ Challenges',
    leaderboard: '🏆 Leaderboard',
    profile: '🪪 My profile',
    glossary: '📖 Glossary',
    revise: (n) => `🔁 Review my mistakes (${n})`,
    admin: '🛠️ Admin',
    badgesUnlocked: (n) => `${n} badge(s) unlocked`,
  },
}

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
  const t = TEXT[getLanguage()]

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
            <p>{t.tagline}</p>
          </div>
          <div className="map-header__account">
            {offline && <span className="status-chip status-chip--offline">{t.offline}</span>}
            {isGuest && <span className="status-chip status-chip--guest">{t.guest}</span>}
            <span>{user?.pseudo}</span>
            <button
              className="btn btn--secondary btn--small"
              onClick={() => {
                if (!isGuest || window.confirm(t.logoutGuestConfirm)) logout()
              }}
            >
              {t.logout}
            </button>
          </div>
        </div>
        {isGuest && (
          <p className="guest-banner">
            {t.guestBanner}{' '}
            <button
              type="button"
              className="guest-banner__link"
              onClick={() => {
                if (window.confirm(t.createAccountConfirm)) logout()
              }}
            >
              {t.createAccount}
            </button>{' '}
            {t.guestBannerEnd}
          </p>
        )}
        <div className="map-header__meta">
          <ProgressBar xp={xp} />
          <StreakBadge current={streakCurrent} longest={streakLongest} />
        </div>
        <nav className="map-nav">
          <button className="btn btn--secondary btn--small" onClick={() => navigate('/parcours')}>
            {t.path}
          </button>
          {!isGuest && (
            <button className="btn btn--secondary btn--small" onClick={() => navigate('/defis')}>
              {t.challenges}
            </button>
          )}
          {!isGuest && (
            <button className="btn btn--secondary btn--small" onClick={() => navigate('/classement')}>
              {t.leaderboard}
            </button>
          )}
          <button className="btn btn--secondary btn--small" onClick={() => navigate('/profil')}>
            {t.profile}
          </button>
          <button className="btn btn--secondary btn--small" onClick={() => navigate('/lexique')}>
            {t.glossary}
          </button>
          {missedQuestions.length > 0 && (
            <button className="btn btn--secondary btn--small" onClick={() => navigate('/revision')}>
              {t.revise(missedQuestions.length)}
            </button>
          )}
          {user?.role === 'admin' && (
            <button className="btn btn--secondary btn--small" onClick={() => navigate('/admin')}>
              {t.admin}
            </button>
          )}
        </nav>
      </header>

      <DailyChallengeCard />
      <TodayCard goal={goal} recommended={recommended} streakCurrent={streakCurrent} missedCount={missedQuestions.length} />

      <SenegalLeafletMap
        villes={villes}
        unlockInfoFor={(ville) => getUnlockInfo(ville.id, badges, focusAreas)}
        onCityClick={handleEnter}
      />

      {badges.length > 0 && <p className="map-badges-count">{t.badgesUnlocked(badges.length)}</p>}
    </div>
  )
}

export default SenegalMap

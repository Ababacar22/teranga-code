import { lazy, Suspense, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import RequireAuth from './features/auth/RequireAuth'
import ThemeToggle from './components/ThemeToggle'
import SoundToggle from './components/SoundToggle'
import { playWhoosh } from './lib/sound'
import './App.css'

const GriotMascot = lazy(() => import('./components/GriotMascot'))

const SenegalMap = lazy(() => import('./scenes/SenegalMap'))
const DistrictScene = lazy(() => import('./scenes/DistrictScene'))
const QuartierScene = lazy(() => import('./scenes/QuartierScene'))
const InterviewSim = lazy(() => import('./scenes/InterviewSim'))
const RevisionScene = lazy(() => import('./scenes/RevisionScene'))
const LeaderboardScene = lazy(() => import('./scenes/LeaderboardScene'))
const ProfileScene = lazy(() => import('./scenes/ProfileScene'))
const LearningPathScene = lazy(() => import('./scenes/LearningPathScene'))
const ChallengesScene = lazy(() => import('./scenes/ChallengesScene'))
const ChallengePlayScene = lazy(() => import('./scenes/ChallengePlayScene'))
const GlossaryScene = lazy(() => import('./scenes/GlossaryScene'))
const LoginScreen = lazy(() => import('./features/auth/LoginScreen'))
const RegisterScreen = lazy(() => import('./features/auth/RegisterScreen'))
const LandingScene = lazy(() => import('./scenes/LandingScene'))
const AdminScene = lazy(() => import('./scenes/AdminScene'))

function PageLoading() {
  return (
    <div className="page-loading">
      <span className="page-loading__dot" />
      <span className="page-loading__dot" />
      <span className="page-loading__dot" />
    </div>
  )
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function AnimatedRoutes() {
  const location = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    playWhoosh()
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.18 }}
        className="page-transition"
      >
        <Routes location={location}>
          <Route path="/bienvenue" element={<LandingScene />} />
          <Route path="/connexion" element={<LoginScreen />} />
          <Route path="/inscription" element={<RegisterScreen />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <SenegalMap />
              </RequireAuth>
            }
          />
          <Route
            path="/ville/:villeId"
            element={
              <RequireAuth>
                <DistrictScene />
              </RequireAuth>
            }
          />
          <Route
            path="/ville/:villeId/quartier/:topicId"
            element={
              <RequireAuth>
                <QuartierScene />
              </RequireAuth>
            }
          />
          <Route
            path="/entretien"
            element={
              <RequireAuth>
                <InterviewSim />
              </RequireAuth>
            }
          />
          <Route
            path="/revision"
            element={
              <RequireAuth>
                <RevisionScene />
              </RequireAuth>
            }
          />
          <Route
            path="/classement"
            element={
              <RequireAuth>
                <LeaderboardScene />
              </RequireAuth>
            }
          />
          <Route
            path="/profil"
            element={
              <RequireAuth>
                <ProfileScene />
              </RequireAuth>
            }
          />
          <Route
            path="/parcours"
            element={
              <RequireAuth>
                <LearningPathScene />
              </RequireAuth>
            }
          />
          <Route
            path="/defis"
            element={
              <RequireAuth>
                <ChallengesScene />
              </RequireAuth>
            }
          />
          <Route
            path="/defis/:challengeId"
            element={
              <RequireAuth>
                <ChallengePlayScene />
              </RequireAuth>
            }
          />
          <Route
            path="/lexique"
            element={
              <RequireAuth>
                <GlossaryScene />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminScene />
              </RequireAuth>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="app-shell">
      <div className="app-toolbar">
        <ThemeToggle />
        <SoundToggle />
      </div>
      <Suspense fallback={<PageLoading />}>
        <AnimatedRoutes />
      </Suspense>
      <Suspense fallback={null}>
        <GriotMascot />
      </Suspense>
    </div>
  )
}

export default App

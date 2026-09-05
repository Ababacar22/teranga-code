import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { getLanguage } from '../../lib/language'

const DEMO_ACCOUNT = { email: 'demo@terangacode.sn', pseudo: 'Demo', password: 'demo1234' }

const TEXT = {
  fr: {
    subtitle: 'Connecte-toi pour retrouver ta progression.',
    quickLogin: '⚡ Connexion rapide (démo)',
    connecting: 'Connexion...',
    or: 'ou',
    email: 'Email',
    password: 'Mot de passe',
    submit: 'Se connecter',
    noAccount: 'Pas encore de compte ?',
    createAccount: 'Créer un compte',
    continueGuest: '👤 Continuer sans compte',
    guestNote: 'Ta progression restera uniquement sur cet appareil et sera perdue si tu te déconnectes.',
    back: '← Retour à la présentation',
  },
  en: {
    subtitle: 'Log in to pick up your progress.',
    quickLogin: '⚡ Quick login (demo)',
    connecting: 'Logging in...',
    or: 'or',
    email: 'Email',
    password: 'Password',
    submit: 'Log in',
    noAccount: 'No account yet?',
    createAccount: 'Create an account',
    continueGuest: '👤 Continue without an account',
    guestNote: 'Your progress will stay only on this device and will be lost if you log out.',
    back: '← Back to the overview',
  },
}

function LoginScreen() {
  const { login, register, loginAsGuest } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [quickLoading, setQuickLoading] = useState(false)
  const t = TEXT[getLanguage()]

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ email, password })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleQuickLogin() {
    setError('')
    setQuickLoading(true)
    try {
      try {
        await login({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password })
      } catch {
        await register(DEMO_ACCOUNT)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setQuickLoading(false)
    }
  }

  return (
    <div className="scene scene--auth">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Teranga Code</h1>
        <p>{t.subtitle}</p>

        <button
          className="btn btn--primary btn--quick"
          type="button"
          onClick={handleQuickLogin}
          disabled={quickLoading || loading}
        >
          {quickLoading ? t.connecting : t.quickLogin}
        </button>

        <div className="auth-divider">
          <span>{t.or}</span>
        </div>

        <label>
          {t.email}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          {t.password}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button className="btn btn--secondary" type="submit" disabled={loading || quickLoading}>
          {loading ? t.connecting : t.submit}
        </button>

        <p>
          {t.noAccount} <Link to="/inscription">{t.createAccount}</Link>
        </p>

        <button
          type="button"
          className="btn btn--small btn--secondary auth-guest-btn"
          onClick={() => {
            loginAsGuest()
            navigate('/')
          }}
        >
          {t.continueGuest}
        </button>
        <p className="auth-guest-note">{t.guestNote}</p>

        <p>
          <Link to="/bienvenue">{t.back}</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginScreen

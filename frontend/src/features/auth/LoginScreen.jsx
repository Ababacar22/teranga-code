import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const DEMO_ACCOUNT = { email: 'demo@terangacode.sn', pseudo: 'Demo', password: 'demo1234' }

function LoginScreen() {
  const { login, register, loginAsGuest } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [quickLoading, setQuickLoading] = useState(false)

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
        <p>Connecte-toi pour retrouver ta progression.</p>

        <button
          className="btn btn--primary btn--quick"
          type="button"
          onClick={handleQuickLogin}
          disabled={quickLoading || loading}
        >
          {quickLoading ? 'Connexion...' : '⚡ Connexion rapide (démo)'}
        </button>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Mot de passe
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button className="btn btn--secondary" type="submit" disabled={loading || quickLoading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <p>
          Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
        </p>

        <button
          type="button"
          className="btn btn--small btn--secondary auth-guest-btn"
          onClick={() => {
            loginAsGuest()
            navigate('/')
          }}
        >
          👤 Continuer sans compte
        </button>
        <p className="auth-guest-note">Ta progression restera uniquement sur cet appareil et sera perdue si tu te déconnectes.</p>

        <p>
          <Link to="/bienvenue">← Retour à la présentation</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginScreen

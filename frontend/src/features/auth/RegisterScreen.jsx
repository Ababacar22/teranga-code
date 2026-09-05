import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { getLanguage } from '../../lib/language'

const TEXT = {
  fr: {
    title: 'Rejoindre Teranga Code',
    subtitle: 'Crée ton compte pour sauvegarder ton XP et tes badges.',
    pseudo: 'Pseudo',
    email: 'Email',
    password: 'Mot de passe (6 caractères min.)',
    creating: 'Création...',
    submit: 'Créer mon compte',
    hasAccount: 'Déjà un compte ?',
    login: 'Se connecter',
    back: '← Retour à la présentation',
  },
  en: {
    title: 'Join Teranga Code',
    subtitle: 'Create your account to save your XP and badges.',
    pseudo: 'Username',
    email: 'Email',
    password: 'Password (6 characters min.)',
    creating: 'Creating...',
    submit: 'Create my account',
    hasAccount: 'Already have an account?',
    login: 'Log in',
    back: '← Back to the overview',
  },
}

function RegisterScreen() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const t = TEXT[getLanguage()]

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ email, pseudo, password })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="scene scene--auth">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <label>
          {t.pseudo}
          <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
        </label>
        <label>
          {t.email}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          {t.password}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? t.creating : t.submit}
        </button>

        <p>
          {t.hasAccount} <Link to="/connexion">{t.login}</Link>
        </p>
        <p>
          <Link to="/bienvenue">{t.back}</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterScreen

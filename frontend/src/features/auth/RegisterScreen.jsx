import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

function RegisterScreen() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
        <h1>Rejoindre Teranga Code</h1>
        <p>Crée ton compte pour sauvegarder ton XP et tes badges.</p>

        <label>
          Pseudo
          <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Mot de passe (6 caractères min.)
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
          {loading ? 'Création...' : 'Créer mon compte'}
        </button>

        <p>
          Déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
        <p>
          <Link to="/bienvenue">← Retour à la présentation</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterScreen

import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

function RequireAuth({ children }) {
  const { isAuthenticated, ready } = useAuth()

  if (!ready) return null
  if (!isAuthenticated) return <Navigate to="/bienvenue" replace />

  return children
}

export default RequireAuth

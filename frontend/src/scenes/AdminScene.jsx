import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import { api } from '../api/client'

function AdminScene() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  function refresh() {
    api.getAdminUsers().then(setData).catch((err) => setError(err.message))
  }

  useEffect(refresh, [])

  if (user?.role !== 'admin') return <Navigate to="/" replace />

  async function handleReset(id, pseudo) {
    if (!window.confirm(`Réinitialiser toute la progression de ${pseudo} ?`)) return
    setBusyId(id)
    setError('')
    try {
      await api.resetAdminUser(id)
      refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(id, pseudo) {
    if (!window.confirm(`Supprimer définitivement le compte de ${pseudo} ? Cette action est irréversible.`)) return
    setBusyId(id)
    setError('')
    try {
      await api.deleteAdminUser(id)
      refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="scene scene--admin">
      <h2>🛠️ Panel administrateur</h2>

      {error && <p className="auth-error">{error}</p>}

      {data && (
        <>
          <div className="admin-stats">
            <div className="admin-stats__item">
              <strong>{data.stats.total}</strong>
              <span>Comptes</span>
            </div>
            <div className="admin-stats__item">
              <strong>{data.stats.totalXp}</strong>
              <span>XP cumulé</span>
            </div>
            <div className="admin-stats__item">
              <strong>{data.stats.activeToday}</strong>
              <span>Actifs aujourd'hui</span>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Pseudo</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>XP</th>
                  <th>Badges</th>
                  <th>Streak</th>
                  <th>Inscrit le</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.pseudo}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`admin-role admin-role--${u.role}`}>{u.role}</span>
                    </td>
                    <td>{u.xp}</td>
                    <td>{u.badgesCount}</td>
                    <td>
                      {u.streakCurrent} (max {u.streakLongest})
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="admin-table__actions">
                      {u.role !== 'admin' && (
                        <>
                          <button
                            type="button"
                            className="btn btn--small btn--secondary"
                            disabled={busyId === u.id}
                            onClick={() => handleReset(u.id, u.pseudo)}
                          >
                            Réinitialiser
                          </button>
                          <button
                            type="button"
                            className="btn btn--small btn--danger"
                            disabled={busyId === u.id}
                            onClick={() => handleDelete(u.id, u.pseudo)}
                          >
                            Supprimer
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <button className="btn btn--secondary" onClick={() => navigate('/')}>
        ← Retour à la carte
      </button>
    </div>
  )
}

export default AdminScene

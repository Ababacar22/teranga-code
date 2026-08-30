import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

function LeaderboardScene() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .getLeaderboard()
      .then(setData)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="scene scene--leaderboard">
      <h2>🏆 Classement</h2>
      <p>Les développeurs les plus actifs de Teranga Code.</p>

      {error && <p className="auth-error">{error}</p>}

      {data && (
        <ol className="leaderboard-list">
          {data.entries.map((entry, i) => (
            <li
              key={entry.id}
              className={`leaderboard-row ${entry.id === data.currentUserId ? 'leaderboard-row--me' : ''}`}
            >
              <span className="leaderboard-rank">#{i + 1}</span>
              <span className="leaderboard-pseudo">{entry.pseudo}</span>
              <span className="leaderboard-badges">{entry.badgesCount} 🏅</span>
              <span className="leaderboard-xp">{entry.xp} XP</span>
            </li>
          ))}
        </ol>
      )}

      <button className="btn btn--secondary" onClick={() => navigate('/')}>
        ← Retour à la carte
      </button>
    </div>
  )
}

export default LeaderboardScene

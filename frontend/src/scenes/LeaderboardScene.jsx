import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

function LeaderboardScene() {
  const navigate = useNavigate()
  const [scope, setScope] = useState('global')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [friends, setFriends] = useState(null)
  const [pseudoInput, setPseudoInput] = useState('')
  const [friendsError, setFriendsError] = useState('')
  const [busyId, setBusyId] = useState(null)

  function refreshLeaderboard(nextScope = scope) {
    api
      .getLeaderboard(nextScope)
      .then(setData)
      .catch((err) => setError(err.message))
  }

  function refreshFriends() {
    api
      .getFriends()
      .then(setFriends)
      .catch(() => setFriends([]))
  }

  useEffect(() => {
    refreshLeaderboard('global')
    refreshFriends()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function switchScope(nextScope) {
    setScope(nextScope)
    refreshLeaderboard(nextScope)
  }

  async function handleSendRequest(e) {
    e.preventDefault()
    if (!pseudoInput.trim()) return
    setFriendsError('')
    try {
      await api.sendFriendRequest(pseudoInput.trim())
      setPseudoInput('')
      refreshFriends()
    } catch (err) {
      setFriendsError(err.message)
    }
  }

  async function handleAccept(id) {
    setBusyId(id)
    try {
      await api.acceptFriendRequest(id)
      refreshFriends()
      refreshLeaderboard()
    } catch (err) {
      setFriendsError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  async function handleRemove(id) {
    setBusyId(id)
    try {
      await api.removeFriend(id)
      refreshFriends()
      refreshLeaderboard()
    } catch (err) {
      setFriendsError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  const currentUserId = data?.currentUserId
  const accepted = friends?.filter((f) => f.status === 'accepted') ?? []
  const incoming = friends?.filter((f) => f.status === 'pending' && f.addressee.id === currentUserId) ?? []
  const outgoing = friends?.filter((f) => f.status === 'pending' && f.requester.id === currentUserId) ?? []

  return (
    <div className="scene scene--leaderboard">
      <h2>🏆 Classement</h2>
      <p>Les développeurs les plus actifs de Teranga Code.</p>

      <div className="leaderboard-scope">
        <button
          type="button"
          className={`btn btn--small ${scope === 'global' ? 'btn--primary' : 'btn--secondary'}`}
          onClick={() => switchScope('global')}
        >
          Global
        </button>
        <button
          type="button"
          className={`btn btn--small ${scope === 'friends' ? 'btn--primary' : 'btn--secondary'}`}
          onClick={() => switchScope('friends')}
        >
          👥 Amis ({accepted.length})
        </button>
      </div>

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
          {scope === 'friends' && data.entries.length === 0 && (
            <p>Aucun ami pour l'instant — ajoute des amis ci-dessous pour comparer vos scores.</p>
          )}
        </ol>
      )}

      <section className="friends-manager">
        <h3>Gérer mes amis</h3>

        <form className="friends-manager__form" onSubmit={handleSendRequest}>
          <input
            type="text"
            placeholder="Pseudo d'un joueur"
            value={pseudoInput}
            onChange={(e) => setPseudoInput(e.target.value)}
          />
          <button type="submit" className="btn btn--small btn--primary">
            ➕ Ajouter
          </button>
        </form>

        {friendsError && <p className="auth-error">{friendsError}</p>}

        {incoming.length > 0 && (
          <div className="friends-manager__group">
            <strong>Demandes reçues</strong>
            {incoming.map((f) => (
              <div key={f.id} className="friends-manager__row">
                <span>{f.requester.pseudo}</span>
                <button className="btn btn--small btn--primary" disabled={busyId === f.id} onClick={() => handleAccept(f.id)}>
                  Accepter
                </button>
                <button className="btn btn--small btn--secondary" disabled={busyId === f.id} onClick={() => handleRemove(f.id)}>
                  Refuser
                </button>
              </div>
            ))}
          </div>
        )}

        {outgoing.length > 0 && (
          <div className="friends-manager__group">
            <strong>Demandes envoyées</strong>
            {outgoing.map((f) => (
              <div key={f.id} className="friends-manager__row">
                <span>{f.addressee.pseudo} (en attente)</span>
                <button className="btn btn--small btn--secondary" disabled={busyId === f.id} onClick={() => handleRemove(f.id)}>
                  Annuler
                </button>
              </div>
            ))}
          </div>
        )}

        {accepted.length > 0 && (
          <div className="friends-manager__group">
            <strong>Mes amis</strong>
            {accepted.map((f) => {
              const other = f.requester.id === currentUserId ? f.addressee : f.requester
              return (
                <div key={f.id} className="friends-manager__row">
                  <span>{other.pseudo}</span>
                  <button className="btn btn--small btn--secondary" disabled={busyId === f.id} onClick={() => handleRemove(f.id)}>
                    Retirer
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <button className="btn btn--secondary" onClick={() => navigate('/')}>
        ← Retour à la carte
      </button>
    </div>
  )
}

export default LeaderboardScene

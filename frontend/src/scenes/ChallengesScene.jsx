import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../features/auth/AuthContext'
import { villes, getTopic } from '../content'

const ALL_TOPICS = villes.filter((v) => v.topics).flatMap((v) => v.topics)

async function shareChallengeInvite({ opponent, topic }) {
  const text = `Je te défie sur "${topic?.title ?? 'un sujet'}" sur Teranga Code 🇸🇳 — connecte-toi pour jouer, ${opponent} !`
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Défi Teranga Code', text })
      return
    } catch {
      // annulé — on retombe sur le presse-papiers
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    window.alert('Message copié — colle-le dans ta conversation avec ton ami !')
  } catch {
    window.prompt('Copie ce message :', text)
  }
}

function ChallengesScene() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [challenges, setChallenges] = useState(null)
  const [toPseudo, setToPseudo] = useState('')
  const [topicId, setTopicId] = useState(ALL_TOPICS[0]?.id ?? '')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  function refresh() {
    api.getChallenges().then(setChallenges).catch((err) => setError(err.message))
  }

  useEffect(refresh, [])

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      await api.createChallenge({ toPseudo, topicId })
      setToPseudo('')
      refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="scene scene--challenges">
      <h2>⚔️ Défis entre amis</h2>
      <p>Défie un ami sur un sujet, il joue quand il veut, comparez vos scores.</p>

      <form className="challenge-form" onSubmit={handleCreate}>
        <input
          placeholder="Pseudo de ton ami"
          value={toPseudo}
          onChange={(e) => setToPseudo(e.target.value)}
          required
        />
        <select value={topicId} onChange={(e) => setTopicId(e.target.value)}>
          {ALL_TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <button className="btn btn--primary" type="submit" disabled={sending}>
          Défier
        </button>
      </form>

      {error && <p className="auth-error">{error}</p>}

      <div className="challenge-list">
        {challenges?.length === 0 && <p>Aucun défi pour l'instant — lance-en un !</p>}
        {challenges?.map((c) => {
          const isSender = c.fromUser.id === user?.id
          const opponent = isSender ? c.toUser : c.fromUser
          const myScore = isSender ? c.fromScore : c.toScore
          const theirScore = isSender ? c.toScore : c.fromScore
          const topic = getTopic(c.topicId)
          const iNeedToPlay = myScore === null

          return (
            <div key={c.id} className="challenge-row">
              <div>
                <strong>{topic?.title ?? c.topicId}</strong>
                <p>
                  {isSender ? 'Envoyé à' : 'Reçu de'} <strong>{opponent.pseudo}</strong>
                </p>
              </div>
              {c.status === 'completed' ? (
                <span className="challenge-result">
                  Toi : {myScore} — {opponent.pseudo} : {theirScore}
                  {myScore > theirScore ? ' 🏆' : myScore < theirScore ? ' 😅' : ' 🤝'}
                </span>
              ) : iNeedToPlay ? (
                <button className="btn btn--small btn--primary" onClick={() => navigate(`/defis/${c.id}`)}>
                  Jouer
                </button>
              ) : (
                <div className="challenge-waiting">
                  <span className="challenge-result">En attente de {opponent.pseudo}...</span>
                  <button
                    type="button"
                    className="btn btn--small btn--secondary"
                    onClick={() => shareChallengeInvite({ opponent: opponent.pseudo, topic })}
                  >
                    📤 Partager l'invitation
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button className="btn btn--secondary" onClick={() => navigate('/')}>
        ← Retour à la carte
      </button>
    </div>
  )
}

export default ChallengesScene

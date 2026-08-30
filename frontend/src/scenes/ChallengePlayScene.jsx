import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTopic } from '../content'
import { api } from '../api/client'
import { playCorrect, playIncorrect } from '../lib/sound'
import { shuffleOptions } from '../lib/shuffle'
import { useShake } from '../lib/useShake'

function ChallengePlayScene() {
  const { challengeId } = useParams()
  const navigate = useNavigate()
  const [challenge, setChallenge] = useState(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [error, setError] = useState('')
  const shake = useShake()

  useEffect(() => {
    api
      .getChallenges()
      .then((list) => {
        const found = list.find((c) => c.id === challengeId)
        if (!found) setError('Défi introuvable.')
        else setChallenge(found)
      })
      .catch((err) => setError(err.message))
  }, [challengeId])

  const topic = challenge ? getTopic(challenge.topicId) : null

  const quiz = useMemo(() => {
    if (!topic) return []
    return topic.quiz.map((q) => {
      const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex)
      return { ...q, options, correctIndex }
    })
  }, [topic])

  if (error) {
    return (
      <div className="scene">
        <h2>{error}</h2>
        <button className="btn btn--secondary" onClick={() => navigate('/defis')}>
          Retour aux défis
        </button>
      </div>
    )
  }

  if (!challenge) return null

  if (!topic) {
    return (
      <div className="scene">
        <h2>Sujet introuvable pour ce défi</h2>
        <button className="btn btn--secondary" onClick={() => navigate('/defis')}>
          Retour aux défis
        </button>
      </div>
    )
  }

  const current = quiz[index]

  function handleAnswer(i) {
    if (selected !== null) return
    setSelected(i)
    if (i === current.correctIndex) {
      setScore((s) => s + 1)
      playCorrect()
    } else {
      playIncorrect()
      shake.shake()
    }
  }

  async function next() {
    if (index + 1 >= quiz.length) {
      const finalScore = score
      try {
        await api.completeChallenge(challenge.id, finalScore)
      } catch {
        // le score reste affiché localement même si l'envoi échoue
      }
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  if (finished) {
    return (
      <div className="scene">
        <h2>Défi envoyé !</h2>
        <p className="reward-xp">
          {score}/{quiz.length} bonnes réponses
        </p>
        <p>Ton score a été enregistré. Retrouve la comparaison dans tes défis.</p>
        <button className="btn btn--secondary" onClick={() => navigate('/defis')}>
          Voir mes défis
        </button>
      </div>
    )
  }

  function handleExit() {
    if (window.confirm('Quitter ce défi maintenant ? Ton score ne sera pas envoyé.')) {
      navigate('/defis')
    }
  }

  return (
    <div className="scene scene--quartier">
      <button type="button" className="quartier-exit" onClick={handleExit}>
        ← Quitter
      </button>

      <div className="quartier-header">
        <span className="quartier-header__ville">Défi — {topic.title}</span>
        <h2>
          Question {index + 1}/{quiz.length}
        </h2>
      </div>

      <div className="quiz-card">
        <h3>{current.question}</h3>
        <motion.div className="options" animate={shake.controls}>
          {current.options.map((opt, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.96 }}
              className={`option-btn ${
                selected !== null
                  ? i === current.correctIndex
                    ? 'option-btn--correct'
                    : selected === i
                      ? 'option-btn--incorrect'
                      : ''
                  : ''
              }`}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
            >
              {opt}
            </motion.button>
          ))}
        </motion.div>
        {selected !== null && (
          <button className="btn btn--primary btn--pulse" onClick={next}>
            {index + 1 >= quiz.length ? 'Terminer' : 'Question suivante'}
          </button>
        )}
      </div>
    </div>
  )
}

export default ChallengePlayScene

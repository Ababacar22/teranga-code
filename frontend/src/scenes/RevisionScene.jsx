import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTopic } from '../content'
import { useProgress } from '../features/progression/useProgress'
import { playCorrect, playIncorrect } from '../lib/sound'
import { shuffleOptions } from '../lib/shuffle'
import { useShake } from '../lib/useShake'

function resolveQuestions(missedQuestions) {
  return missedQuestions
    .map((key) => {
      const [topicId, indexStr] = key.split('#')
      const topic = getTopic(topicId)
      const index = Number(indexStr)
      const question = topic?.quiz?.[index]
      if (!topic || !question) return null
      const { options, correctIndex } = shuffleOptions(question.options, question.correctIndex)
      return { key, topicTitle: topic.title, ...question, options, correctIndex }
    })
    .filter(Boolean)
}

function RevisionScene() {
  const navigate = useNavigate()
  const { missedQuestions, setMissed } = useProgress()
  const questions = useMemo(() => resolveQuestions(missedQuestions), [missedQuestions])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [resolved, setResolved] = useState(0)
  const shake = useShake()

  if (questions.length === 0) {
    return (
      <div className="scene">
        <h2>Aucune erreur à réviser 🎉</h2>
        <p>Tu n'as aucune question en attente de révision pour le moment.</p>
        <button className="btn btn--secondary" onClick={() => navigate('/')}>
          Retour à la carte
        </button>
      </div>
    )
  }

  if (index >= questions.length) {
    return (
      <div className="scene">
        <h2>Révision terminée</h2>
        <p>
          {resolved}/{questions.length} questions corrigées et retirées de ta liste.
        </p>
        <button className="btn btn--secondary" onClick={() => navigate('/')}>
          Retour à la carte
        </button>
      </div>
    )
  }

  const current = questions[index]

  function handleAnswer(i) {
    if (selected !== null) return
    setSelected(i)
    if (i === current.correctIndex) {
      playCorrect()
      setMissed(current.key, false)
      setResolved((r) => r + 1)
    } else {
      playIncorrect()
      shake.shake()
    }
  }

  function next() {
    setIndex((i) => i + 1)
    setSelected(null)
  }

  return (
    <div className="scene scene--quartier">
      <button type="button" className="quartier-exit" onClick={() => navigate('/')}>
        ← Quitter
      </button>

      <div className="quartier-header">
        <span className="quartier-header__ville">Révision — {current.topicTitle}</span>
        <h2>
          Question {index + 1}/{questions.length}
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
            {index + 1 >= questions.length ? 'Voir mon résultat' : 'Question suivante'}
          </button>
        )}
      </div>
    </div>
  )
}

export default RevisionScene

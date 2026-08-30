import { useMemo, useState } from 'react'
import { shuffleOptions } from '../lib/shuffle'

function CityQuiz({ quiz }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const shuffledQuiz = useMemo(
    () =>
      (quiz ?? []).map((q) => {
        const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex)
        return { ...q, options, correctIndex }
      }),
    [quiz],
  )

  if (!shuffledQuiz.length) return null

  const question = shuffledQuiz[index]

  function handleAnswer(i) {
    if (selected !== null) return
    setSelected(i)
    if (i === question.correctIndex) setScore((s) => s + 1)
  }

  function next() {
    if (index + 1 >= shuffledQuiz.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="city-quiz">
        <p className="city-quiz__result">
          🎉 {score} / {shuffledQuiz.length} bonnes réponses sur la culture locale !
        </p>
        <button type="button" className="btn btn--small btn--secondary" onClick={restart}>
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className="city-quiz">
      <p className="city-quiz__question">{question.question}</p>
      <div className="city-quiz__options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={`option-btn ${
              selected !== null
                ? i === question.correctIndex
                  ? 'option-btn--correct'
                  : i === selected
                    ? 'option-btn--incorrect'
                    : ''
                : ''
            }`}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <button type="button" className="btn btn--small btn--primary" onClick={next}>
          {index + 1 >= shuffledQuiz.length ? 'Voir le score' : 'Question suivante →'}
        </button>
      )}
      <p className="city-quiz__step-count">
        Question {index + 1} / {shuffledQuiz.length}
      </p>
    </div>
  )
}

export default CityQuiz

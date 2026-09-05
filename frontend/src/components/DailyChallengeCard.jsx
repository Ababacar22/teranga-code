import { useMemo, useState } from 'react'
import { getDailyQuestion, getTodayResult, recordTodayResult } from '../lib/dailyChallenge'
import { shuffleOptions } from '../lib/shuffle'
import { getAllTopics } from '../content'

function DailyChallengeCard() {
  const [result, setResult] = useState(getTodayResult)
  const [selected, setSelected] = useState(null)

  const question = useMemo(() => getDailyQuestion(getAllTopics()), [])
  const shuffled = useMemo(() => (question ? shuffleOptions(question.options, question.correctIndex) : null), [question])

  if (!question || !shuffled) return null

  function answer(index) {
    if (selected !== null) return
    setSelected(index)
    const correct = index === shuffled.correctIndex
    recordTodayResult(correct)
    setResult(correct)
  }

  const answered = result !== null

  return (
    <div className="daily-challenge">
      <div className="daily-challenge__header">
        <strong>🎯 Défi du jour</strong>
        <span className="daily-challenge__topic">
          {question.badgeEmoji} {question.topicTitle}
        </span>
      </div>

      {answered ? (
        <p className="daily-challenge__result">
          {result ? '✅ Bien joué, tu as trouvé la bonne réponse aujourd\'hui !' : '❌ Raté pour aujourd\'hui — reviens demain pour un nouveau défi.'}
        </p>
      ) : (
        <>
          <p className="daily-challenge__question">{question.question}</p>
          <div className="daily-challenge__options">
            {shuffled.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                className={`btn btn--small btn--secondary ${selected === i ? (i === shuffled.correctIndex ? 'btn--success' : 'btn--danger') : ''}`}
                onClick={() => answer(i)}
                disabled={selected !== null}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default DailyChallengeCard

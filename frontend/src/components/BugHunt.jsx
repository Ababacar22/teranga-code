import { useState } from 'react'
import { motion } from 'framer-motion'
import { playCorrect, playIncorrect } from '../lib/sound'
import { useShake } from '../lib/useShake'

function BugHunt({ bugHunt, onDone }) {
  const [selected, setSelected] = useState(null)
  const shake = useShake()

  function handleSelect(i) {
    if (selected !== null) return
    setSelected(i)
    if (i === bugHunt.buggyLineIndex) playCorrect()
    else {
      playIncorrect()
      shake.shake()
    }
  }

  const found = selected === bugHunt.buggyLineIndex

  return (
    <div className="bug-hunt">
      <h3>🐛 Repère le bug</h3>
      <p>Clique sur la ligne qui contient le problème.</p>
      <motion.pre className="bug-hunt__code" animate={shake.controls}>
        {bugHunt.lines.map((line, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.97 }}
            className={`bug-hunt__line ${
              selected !== null
                ? i === bugHunt.buggyLineIndex
                  ? 'bug-hunt__line--correct'
                  : selected === i
                    ? 'bug-hunt__line--incorrect'
                    : ''
                : ''
            }`}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
          >
            <span className="bug-hunt__lineno">{i + 1}</span>
            <code>{line}</code>
          </motion.button>
        ))}
      </motion.pre>
      {selected !== null && (
        <div className="explain-card">
          <p>{found ? '✅ Trouvé ! ' : '❌ Pas tout à fait. '}{bugHunt.explanation}</p>
          <button className="btn btn--primary btn--pulse" onClick={onDone}>
            Continuer
          </button>
        </div>
      )}
    </div>
  )
}

export default BugHunt

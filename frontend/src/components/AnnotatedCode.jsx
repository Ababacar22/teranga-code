import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function AnnotatedCode({ code, annotations }) {
  const [activeLine, setActiveLine] = useState(null)

  if (!code) return null

  const notesByLine = new Map((annotations ?? []).map((a) => [a.line, a.note]))
  const lines = code.split('\n')

  if (notesByLine.size === 0) {
    return (
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    )
  }

  return (
    <div className="annotated-code">
      <p className="annotated-code__hint">👆 Clique sur une ligne surlignée pour comprendre ce qu’elle fait</p>
      <pre className="code-block code-block--annotated">
        <code>
          {lines.map((line, i) => {
            const note = notesByLine.get(i)
            const isActive = activeLine === i
            if (note === undefined) {
              return (
                <div className="code-line" key={i}>
                  {line || ' '}
                </div>
              )
            }
            return (
              <div key={i}>
                <button
                  type="button"
                  className={`code-line code-line--annotated ${isActive ? 'code-line--active' : ''}`}
                  onClick={() => setActiveLine(isActive ? null : i)}
                >
                  {line || ' '}
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      className="code-line__note"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p>{note}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </code>
      </pre>
    </div>
  )
}

export default AnnotatedCode

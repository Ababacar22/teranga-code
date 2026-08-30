import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CALLERS = [
  { name: 'Composant Auth', icon: '🔐' },
  { name: 'Composant Cache', icon: '🗄️' },
  { name: 'Composant Config', icon: '⚙️' },
]

const INSTANCE_ID = `#${Math.random().toString(36).slice(2, 7)}`

function SingletonDemo() {
  const [log, setLog] = useState([])
  const [pulseKey, setPulseKey] = useState(0)

  function callGetInstance(caller) {
    setPulseKey((k) => k + 1)
    setLog((prev) => [{ caller, id: prev.length }, ...prev].slice(0, 4))
  }

  return (
    <div className="singleton-demo">
      <p className="singleton-demo__hint">
        Clique sur plusieurs composants : ils appellent tous <code>getInstance()</code>, regarde ce qu'ils reçoivent.
      </p>

      <div className="singleton-demo__callers">
        {CALLERS.map((c) => (
          <button key={c.name} className="caller-btn" onClick={() => callGetInstance(c.name)}>
            <span>{c.icon}</span>
            {c.name}
          </button>
        ))}
      </div>

      <motion.div
        key={pulseKey}
        className="instance-box"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.4 }}
      >
        🏛️
        <div>
          <strong>Instance unique</strong>
          <small>{INSTANCE_ID}</small>
        </div>
      </motion.div>

      <ul className="singleton-demo__log">
        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              {entry.caller} → <code>getInstance()</code> → même instance {INSTANCE_ID}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default SingletonDemo

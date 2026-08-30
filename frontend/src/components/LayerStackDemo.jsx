import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LAYERS = [
  { key: 'log', label: 'avecLog', icon: '📝' },
  { key: 'cache', label: 'avecCache', icon: '⚡' },
  { key: 'validation', label: 'avecValidation', icon: '✅' },
]

function LayerStackDemo() {
  const [active, setActive] = useState([])
  const [called, setCalled] = useState(false)

  function toggle(key) {
    setCalled(false)
    setActive((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const ordered = LAYERS.filter((l) => active.includes(l.key))

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Empile des décorateurs autour de additionner(2, 3), puis appelle la fonction.</p>

      <div className="viz-demo__controls">
        {LAYERS.map((l) => (
          <button
            key={l.key}
            type="button"
            className={`btn btn--small ${active.includes(l.key) ? 'btn--primary' : 'btn--secondary'}`}
            onClick={() => toggle(l.key)}
          >
            {l.icon} {l.label}
          </button>
        ))}
      </div>

      <div className="layer-demo__stack">
        <AnimatePresence>
          {ordered.map((l) => (
            <motion.div
              key={l.key}
              className="viz-demo__box layer-demo__layer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {l.icon} {l.label}(...)
            </motion.div>
          ))}
        </AnimatePresence>
        <div className={`viz-demo__box ${called ? 'viz-demo__box--success' : ''}`}>additionner(2, 3)</div>
      </div>

      <button type="button" className="btn btn--small btn--primary" onClick={() => setCalled(true)}>
        ▶ Appeler
      </button>

      <p className="viz-demo__note">
        {called
          ? `L'appel traverse ${ordered.length > 0 ? ordered.map((l) => l.label).join(' → ') + ' → ' : ''}additionner → résultat : 5${ordered.length > 0 ? ', avec le comportement de chaque couche appliqué au passage' : ''}.`
          : 'Choisis tes décorateurs, puis appelle la fonction pour voir comment ils s’enchaînent.'}
      </p>
    </div>
  )
}

export default LayerStackDemo

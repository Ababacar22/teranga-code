import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CHILDREN = [
  { name: 'Chien', emoji: '🐕', output: 'Wouf !' },
  { name: 'Chat', emoji: '🐈', output: 'Miaou !' },
]

function ClassTreeDemo() {
  const [called, setCalled] = useState(null)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Clique sur une classe fille pour appeler <code>.parler()</code> et voir le polymorphisme à l'œuvre.</p>

      <div className="class-tree-demo">
        <div className="viz-demo__box class-tree-demo__parent">🐾 Animal</div>
        <div className="class-tree-demo__branches">
          {CHILDREN.map((c) => (
            <div className="class-tree-demo__branch" key={c.name}>
              <span className="class-tree-demo__line" />
              <button
                type="button"
                className={`viz-demo__box class-tree-demo__child ${called === c.name ? 'viz-demo__box--active' : ''}`}
                onClick={() => setCalled(c.name)}
              >
                {c.emoji} {c.name}
              </button>
              <AnimatePresence>
                {called === c.name && (
                  <motion.div
                    className="class-tree-demo__bubble"
                    initial={{ opacity: 0, y: -8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {c.output}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <p className="viz-demo__note">
        {called
          ? `.parler() appelé sur un ${called} → "${CHILDREN.find((c) => c.name === called).output}" — même appel, comportement différent.`
          : "Le même appel .parler() donnera un résultat différent selon la classe réelle de l'objet."}
      </p>
    </div>
  )
}

export default ClassTreeDemo

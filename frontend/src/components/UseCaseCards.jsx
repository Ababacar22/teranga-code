import { useState } from 'react'
import { motion } from 'framer-motion'

const ICONS = ['🎯', '⚙️', '🚀', '🔧', '💡']

function UseCaseCard({ text, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.button
      type="button"
      className={`use-case-card ${flipped ? 'use-case-card--flipped' : ''}`}
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <div className="use-case-card__inner">
        <div className="use-case-card__face use-case-card__face--front">
          <span className="use-case-card__icon">{ICONS[index % ICONS.length]}</span>
          <strong>Cas d'usage {index + 1}</strong>
          <small>Clique pour révéler</small>
        </div>
        <div className="use-case-card__face use-case-card__face--back">
          <span className="use-case-card__icon use-case-card__icon--small">{ICONS[index % ICONS.length]}</span>
          <p>{text}</p>
        </div>
      </div>
    </motion.button>
  )
}

function UseCaseCards({ items }) {
  if (!items?.length) return null

  return (
    <div className="use-cases">
      <h4>Cas d'usage concrets</h4>
      <div className="use-case-cards">
        {items.map((text, i) => (
          <UseCaseCard key={i} text={text} index={i} />
        ))}
      </div>
    </div>
  )
}

export default UseCaseCards

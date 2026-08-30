import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CityIllustration from './CityIllustration'
import CityQuiz from './CityQuiz'

function CityDiscovery({ ville }) {
  const [open, setOpen] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  if (!ville?.discovery) return null

  const { facts, quickFacts, quiz } = ville.discovery

  return (
    <div className="discovery-card">
      <button className="discovery-card__toggle" onClick={() => setOpen((o) => !o)}>
        <span>🗺️ Découvrir {ville.name}</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="discovery-card__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="discovery-card__content">
              <CityIllustration villeId={ville.id} />

              <div className="discovery-card__info">
                {quickFacts && (
                  <div className="discovery-card__chips">
                    <span className="discovery-card__chip">👥 {quickFacts.population}</span>
                    <span className="discovery-card__chip">🍽️ {quickFacts.specialite}</span>
                    <span className="discovery-card__chip">🗣️ {quickFacts.langues}</span>
                  </div>
                )}

                <ul>
                  {facts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                  ))}
                </ul>

                {quiz?.length > 0 && (
                  <div className="discovery-card__quiz-toggle">
                    {!showQuiz ? (
                      <button type="button" className="btn btn--small btn--secondary" onClick={() => setShowQuiz(true)}>
                        🧠 Tester ma culture sur {ville.name}
                      </button>
                    ) : (
                      <CityQuiz quiz={quiz} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CityDiscovery

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function SplitDemo() {
  const [split, setSplit] = useState(false)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Cette classe a trois raisons de changer. Sépare-les pour respecter le principe de responsabilité unique.</p>

      <div className="split-demo__zone">
        <AnimatePresence mode="popLayout">
          {!split ? (
            <motion.div key="one" className="viz-demo__box split-demo__bloated" exit={{ opacity: 0, scale: 0.9 }}>
              <strong>Facture</strong>
              <span>calculerTotal()</span>
              <span>sauvegarderEnBDD()</span>
              <span>envoyerParEmail()</span>
            </motion.div>
          ) : (
            <motion.div key="three" className="viz-demo__row">
              {[
                { name: 'Facture', method: 'calculerTotal()' },
                { name: 'FactureRepository', method: 'sauvegarderEnBDD()' },
                { name: 'FactureMailer', method: 'envoyerParEmail()' },
              ].map((c, i) => (
                <motion.div
                  key={c.name}
                  className="viz-demo__box viz-demo__box--success"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <strong>{c.name}</strong>
                  <br />
                  <span>{c.method}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="viz-demo__note">
        {split
          ? 'Trois classes, trois responsabilités, trois raisons de changer séparées — chacune testable indépendamment.'
          : 'Trois responsabilités mélangées : calcul métier, persistance, notification. Un changement dans l’une affecte tout le reste.'}
      </p>

      <button type="button" className="btn btn--small btn--primary" onClick={() => setSplit((s) => !s)}>
        {split ? '↺ Réinitialiser' : '✂️ Séparer les responsabilités'}
      </button>
    </div>
  )
}

export default SplitDemo

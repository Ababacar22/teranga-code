import { useState } from 'react'
import { useShake } from '../lib/useShake'
import { motion } from 'framer-motion'

function EncapsulationLockDemo() {
  const [solde, setSolde] = useState(0)
  const [blocked, setBlocked] = useState(false)
  const shake = useShake()

  function tryDirectAccess() {
    setBlocked(true)
    shake.shake()
  }

  function deposer() {
    setBlocked(false)
    setSolde((s) => s + 100)
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Compare un accès direct au champ privé et un accès via une méthode publique.</p>

      <motion.div className="viz-demo__box" animate={shake.controls}>
        🔒 CompteBancaire {'{'} #solde: {solde} {'}'}
      </motion.div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--danger" onClick={tryDirectAccess}>
          compte.#solde = 999999
        </button>
        <button type="button" className="btn btn--small btn--primary" onClick={deposer}>
          compte.deposer(100)
        </button>
      </div>

      <p className="viz-demo__note">
        {blocked
          ? '❌ SyntaxError : #solde est privé, inaccessible depuis l’extérieur de la classe.'
          : '✅ deposer() est la seule porte d’entrée autorisée — elle peut valider le montant avant de modifier #solde.'}
      </p>
    </div>
  )
}

export default EncapsulationLockDemo

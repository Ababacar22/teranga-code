import { useState } from 'react'

function IdempotenceDemo() {
  const [key, setKey] = useState(1)
  const [processed, setProcessed] = useState({})
  const [log, setLog] = useState('Clique "Envoyer" plusieurs fois avec la même clé — observe qu\'un seul débit a lieu.')

  function send() {
    if (processed[key] !== undefined) {
      setLog(`🔁 Clé #${key} déjà traitée — résultat renvoyé tel quel, aucun nouveau débit.`)
      return
    }
    setProcessed((p) => ({ ...p, [key]: true }))
    setLog(`✅ Clé #${key} : paiement débité pour la première fois.`)
  }

  function newAttempt() {
    setKey((k) => k + 1)
    setLog(`🆕 Nouvelle tentative logique (clé #${key + 1}) — un vrai nouveau paiement, distinct du précédent.`)
  }

  const totalDebited = Object.keys(processed).length

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Simule un client qui rejoue la même requête après un timeout réseau.</p>

      <div className="viz-demo__row">
        <div className="viz-demo__box viz-demo__box--active">🔑 Clé d'idempotence #{key}</div>
        <span className="viz-demo__arrow">→</span>
        <div className={`viz-demo__box ${processed[key] ? 'viz-demo__box--success' : ''}`}>
          {processed[key] ? '✅ Traité' : '⏳ En attente'}
        </div>
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--primary" onClick={send}>
          📨 Envoyer (même clé)
        </button>
        <button type="button" className="btn btn--small btn--secondary" onClick={newAttempt}>
          🆕 Nouvelle tentative de paiement
        </button>
      </div>

      <p className="viz-demo__note">
        {log} — total réellement débité : {totalDebited} paiement(s) sur {key} envoi(s) de bouton "Envoyer" possibles.
      </p>
    </div>
  )
}

export default IdempotenceDemo

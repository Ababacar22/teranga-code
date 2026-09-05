import { useState } from 'react'

const SIGNALS = [
  { key: 'amount', label: '💰 Montant inhabituel (x5 la moyenne)', points: 30 },
  { key: 'travel', label: '✈️ Voyage impossible (500km en <1h)', points: 50 },
  { key: 'declined', label: '🚫 3+ tentatives refusées récentes', points: 20 },
]

function decide(score) {
  if (score >= 70) return { label: '🚫 Blocage', className: 'viz-demo__box--danger' }
  if (score >= 30) return { label: '📱 Vérification supplémentaire (SMS)', className: 'viz-demo__box--active' }
  return { label: '✅ Approuvé', className: 'viz-demo__box--success' }
}

function FraudScoreDemo() {
  const [active, setActive] = useState({})

  function toggle(key) {
    setActive((a) => ({ ...a, [key]: !a[key] }))
  }

  const score = SIGNALS.reduce((sum, s) => sum + (active[s.key] ? s.points : 0), 0)
  const decision = decide(score)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Active ou désactive des signaux de risque et observe le score et la décision changer.</p>

      <div className="viz-demo__controls">
        {SIGNALS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`btn btn--small ${active[s.key] ? 'btn--primary' : 'btn--secondary'}`}
            onClick={() => toggle(s.key)}
          >
            {s.label} (+{s.points})
          </button>
        ))}
      </div>

      <div className="viz-demo__row">
        <div className="viz-demo__box">Score : {score}</div>
        <span className="viz-demo__arrow">→</span>
        <div className={`viz-demo__box ${decision.className}`}>{decision.label}</div>
      </div>

      <p className="viz-demo__note">
        Seuils : &lt;30 approuvé automatiquement, 30-69 vérification supplémentaire, ≥70 blocage — un compromis entre sécurité et
        expérience client.
      </p>
    </div>
  )
}

export default FraudScoreDemo

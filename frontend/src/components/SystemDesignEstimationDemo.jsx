import { useState } from 'react'

const PRESETS = [
  { key: 'startup', label: '🌱 Startup', dau: 10_000, reqPerUser: 5 },
  { key: 'scaleup', label: '📈 Scale-up', dau: 1_000_000, reqPerUser: 8 },
  { key: 'giant', label: '🌍 Géant tech', dau: 100_000_000, reqPerUser: 10 },
]

function SystemDesignEstimationDemo() {
  const [preset, setPreset] = useState(null)
  const active = PRESETS.find((p) => p.key === preset)
  const reqPerDay = active ? active.dau * active.reqPerUser : 0
  const reqPerSec = active ? Math.round(reqPerDay / 86400) : 0

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Choisis une taille d'entreprise pour voir comment l'estimation change les ordres de grandeur.</p>

      <div className="viz-demo__row">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            type="button"
            className={`viz-demo__box selector-demo__option ${preset === p.key ? 'viz-demo__box--active' : ''}`}
            onClick={() => setPreset(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {active && (
        <>
          <span className="viz-demo__arrow">↓</span>
          <div className="viz-demo__box viz-demo__box--success">
            {active.dau.toLocaleString('fr-FR')} utilisateurs actifs/jour × {active.reqPerUser} req/jour ≈{' '}
            <strong>{reqPerSec.toLocaleString('fr-FR')} req/s en moyenne</strong>
          </div>
        </>
      )}

      <p className="viz-demo__note">
        {active
          ? `À ce débit, ${reqPerSec < 100 ? 'un seul serveur bien dimensionné peut suffire' : reqPerSec < 5000 ? 'il faut déjà penser cache et répartition de charge' : 'il faut du sharding, du cache distribué et plusieurs régions'}.`
          : "L'ordre de grandeur change radicalement les choix d'architecture, pas seulement la taille du serveur."}
      </p>
    </div>
  )
}

export default SystemDesignEstimationDemo

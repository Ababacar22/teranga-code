import { useState } from 'react'

const STEPS = [
  { key: 'S', label: 'Situation', emoji: '🎬', example: '"Sur un projet de refonte API, un collègue voulait déployer un breaking change sans versionner l\'endpoint."' },
  { key: 'T', label: 'Task', emoji: '🎯', example: '"En tant que responsable de la stabilité de l\'API, je devais éviter une coupure de service."' },
  { key: 'A', label: 'Action', emoji: '🛠️', example: '"J\'ai organisé un point pour montrer l\'impact, proposé un versionnement /v2, et fait la migration en pair programming."' },
  { key: 'R', label: 'Result', emoji: '✅', example: '"Le déploiement est passé sans incident, et la règle a été réutilisée sur 4 autres projets."' },
]

function StarBuilderDemo() {
  const [revealed, setRevealed] = useState([])

  function reveal(key) {
    setRevealed((r) => (r.includes(key) ? r : [...r, key]))
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Clique chaque lettre dans l'ordre pour construire une réponse STAR complète.</p>

      <div className="viz-demo__row">
        {STEPS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`viz-demo__box selector-demo__option ${revealed.includes(s.key) ? 'viz-demo__box--success' : ''}`}
            onClick={() => reveal(s.key)}
          >
            {s.emoji} {s.key} — {s.label}
          </button>
        ))}
      </div>

      {STEPS.filter((s) => revealed.includes(s.key)).map((s) => (
        <p className="viz-demo__note" key={s.key}>
          <strong>{s.label} :</strong> {s.example}
        </p>
      ))}

      {revealed.length === 0 && (
        <p className="viz-demo__note">Une réponse STAR complète tient en 4 phrases courtes — pas un long récit.</p>
      )}
    </div>
  )
}

export default StarBuilderDemo

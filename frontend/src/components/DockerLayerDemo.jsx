import { useState } from 'react'

const LAYERS = ['FROM node:22-alpine', 'WORKDIR /app', 'COPY package*.json ./', 'RUN npm install', 'COPY . .', 'CMD ["npm", "start"]']

const SCENARIOS = {
  code: { label: 'Je change un fichier .js', invalidatedFrom: 4 },
  deps: { label: "J'ajoute une dépendance dans package.json", invalidatedFrom: 2 },
}

function DockerLayerDemo() {
  const [scenario, setScenario] = useState(null)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Choisis ce que tu modifies, et regarde quelles couches Docker doit reconstruire.</p>

      <div className="docker-demo__layers">
        {LAYERS.map((l, i) => {
          const invalidated = scenario && i >= SCENARIOS[scenario].invalidatedFrom
          const cls = !scenario ? '' : invalidated ? 'viz-demo__box--danger' : 'viz-demo__box--success'
          return (
            <div key={l} className={`viz-demo__box docker-demo__layer ${cls}`}>
              <code>{l}</code>
              {scenario && <span className="docker-demo__tag">{invalidated ? '🔁 rebuild' : '✅ cache'}</span>}
            </div>
          )
        })}
      </div>

      <div className="viz-demo__controls">
        {Object.entries(SCENARIOS).map(([key, s]) => (
          <button
            key={key}
            type="button"
            className={`btn btn--small ${scenario === key ? 'btn--primary' : 'btn--secondary'}`}
            onClick={() => setScenario(key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="viz-demo__note">
        {scenario === 'deps'
          ? "package.json a changé : Docker doit refaire npm install et tout ce qui suit — build plus lent."
          : scenario === 'code'
            ? "Seul le code source a changé : npm install reste en cache, seule la fin du build est refaite — build rapide."
            : 'Docker met en cache chaque couche tant que rien au-dessus n’a changé.'}
      </p>
    </div>
  )
}

export default DockerLayerDemo

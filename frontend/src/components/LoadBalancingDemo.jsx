import { useState } from 'react'

const SERVERS = ['A', 'B', 'C']

function LoadBalancingDemo() {
  const [counts, setCounts] = useState({ A: 0, B: 0, C: 0 })
  const [down, setDown] = useState(null)
  const [lastHit, setLastHit] = useState(null)
  const [cursor, setCursor] = useState(0)

  function sendRequest() {
    let i = cursor
    for (let attempts = 0; attempts < SERVERS.length; attempts++) {
      const candidate = SERVERS[i % SERVERS.length]
      if (candidate !== down) {
        setCounts((c) => ({ ...c, [candidate]: c[candidate] + 1 }))
        setLastHit(candidate)
        setCursor(i + 1)
        return
      }
      i++
    }
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Envoie des requêtes, puis fais tomber un serveur pour voir le load balancer s'adapter.</p>

      <div className="viz-demo__row">
        {SERVERS.map((s) => (
          <div
            key={s}
            className={`viz-demo__box ${down === s ? 'viz-demo__box--danger' : lastHit === s ? 'viz-demo__box--active' : ''}`}
          >
            Serveur {s} ({counts[s]})
          </div>
        ))}
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--primary" onClick={sendRequest}>
          ▶ Envoyer une requête
        </button>
        <button
          type="button"
          className="btn btn--small btn--danger"
          onClick={() => setDown(down ? null : SERVERS[Math.floor(Math.random() * SERVERS.length)])}
        >
          {down ? `↺ Réparer le serveur ${down}` : '💥 Faire tomber un serveur au hasard'}
        </button>
      </div>

      <p className="viz-demo__note">
        {down
          ? `Le serveur ${down} est en panne — le load balancer route automatiquement vers les autres, sans requête perdue.`
          : 'Chaque requête tourne entre les serveurs disponibles (round-robin).'}
      </p>
    </div>
  )
}

export default LoadBalancingDemo

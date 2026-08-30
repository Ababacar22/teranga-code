import { useState } from 'react'

const DESIRED = 3

function OrchestrationDemo() {
  const [pods, setPods] = useState(['1', '2', '3'])
  const [log, setLog] = useState('L\'orchestrateur maintient 3 pods en permanence.')

  function killPod() {
    if (pods.length === 0) return
    const victim = pods[Math.floor(Math.random() * pods.length)]
    setPods((p) => p.filter((id) => id !== victim))
    setLog(`💥 Pod ${victim} vient de tomber. L'orchestrateur détecte l'écart avec l'état désiré...`)
    setTimeout(() => {
      setPods((p) => {
        if (p.length >= DESIRED) return p
        const newId = `${Date.now()}`.slice(-3)
        setLog(`✅ Nouveau pod ${newId} recréé automatiquement pour revenir à ${DESIRED} pods.`)
        return [...p, newId]
      })
    }, 1100)
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">L'orchestrateur compare en continu l'état réel à l'état désiré (3 pods). Fais tomber un pod et observe.</p>

      <div className="viz-demo__row">
        {pods.map((id) => (
          <div key={id} className="viz-demo__box viz-demo__box--success">
            🟢 Pod {id}
          </div>
        ))}
        {Array.from({ length: Math.max(0, DESIRED - pods.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="viz-demo__box viz-demo__box--danger">
            ⬛ manquant
          </div>
        ))}
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--danger" onClick={killPod} disabled={pods.length === 0}>
          💥 Tuer un pod au hasard
        </button>
      </div>

      <p className="viz-demo__note">{log}</p>
    </div>
  )
}

export default OrchestrationDemo

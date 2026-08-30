import { useState } from 'react'

const RING_SIZE = 12
const KEYS = [
  { id: 'clé 1', pos: 0 },
  { id: 'clé 2', pos: 2 },
  { id: 'clé 3', pos: 3 },
  { id: 'clé 4', pos: 4 },
  { id: 'clé 5', pos: 6 },
  { id: 'clé 6', pos: 7 },
  { id: 'clé 7', pos: 8 },
  { id: 'clé 8', pos: 10 },
  { id: 'clé 9', pos: 11 },
]
const INITIAL_NODES = [
  { id: 'Serveur A', pos: 1 },
  { id: 'Serveur B', pos: 5 },
  { id: 'Serveur C', pos: 9 },
]
const EXTRA_NODE = { id: 'Serveur D', pos: 7 }

function assign(nodes, keys) {
  const sorted = [...nodes].sort((a, b) => a.pos - b.pos)
  const result = {}
  for (const key of keys) {
    const target = sorted.find((n) => n.pos >= key.pos) || sorted[0]
    result[key.id] = target.id
  }
  return result
}

function ConsistentHashingDemo() {
  const [nodes, setNodes] = useState(INITIAL_NODES)
  const [prevAssignment, setPrevAssignment] = useState(null)

  const assignment = assign(nodes, KEYS)
  const hasD = nodes.some((n) => n.id === EXTRA_NODE.id)

  function toggleNodeD() {
    setPrevAssignment(assignment)
    setNodes((ns) => (hasD ? ns.filter((n) => n.id !== EXTRA_NODE.id) : [...ns, EXTRA_NODE]))
  }

  const moved = prevAssignment ? KEYS.filter((k) => prevAssignment[k.id] !== assignment[k.id]) : []

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">
        Anneau à {RING_SIZE} positions — chaque clé est assignée au premier serveur rencontré en avançant sur l'anneau (position ≥ sa propre position).
      </p>

      <div className="viz-demo__row" style={{ flexWrap: 'wrap' }}>
        {[...nodes]
          .sort((a, b) => a.pos - b.pos)
          .map((n) => (
            <div key={n.id} className="viz-demo__box viz-demo__box--active">
              🖥️ {n.id} <span style={{ opacity: 0.6 }}>(pos {n.pos})</span>
            </div>
          ))}
      </div>

      <div className="viz-demo__row" style={{ flexWrap: 'wrap' }}>
        {KEYS.map((k) => (
          <div
            key={k.id}
            className={`viz-demo__box ${moved.some((m) => m.id === k.id) ? 'viz-demo__box--danger' : 'viz-demo__box--success'}`}
          >
            🔑 {k.id} → {assignment[k.id]}
          </div>
        ))}
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--primary" onClick={toggleNodeD}>
          {hasD ? '➖ Retirer Serveur D' : '➕ Ajouter Serveur D (position 7)'}
        </button>
      </div>

      <p className="viz-demo__note">
        {prevAssignment
          ? `${moved.length} clé(s) sur ${KEYS.length} ont changé de serveur (en rouge) — pas toutes, contrairement à un hachage modulo classique où ajouter un serveur redistribuerait presque tout.`
          : '3 serveurs actifs pour le moment. Ajoute un 4e serveur pour voir combien de clés bougent réellement.'}
      </p>
    </div>
  )
}

export default ConsistentHashingDemo

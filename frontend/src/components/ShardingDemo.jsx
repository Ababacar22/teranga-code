import { useState } from 'react'

const SHARDS = 3
const USERS = ['Awa', 'Moussa', 'Fatou', 'Ibou', 'Khady', 'Seydou']

function hashToShard(name) {
  let h = 0
  for (const ch of name) h += ch.charCodeAt(0)
  return h % SHARDS
}

function ShardingDemo() {
  const [queried, setQueried] = useState(null)
  const [crossQuery, setCrossQuery] = useState(false)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Clique un utilisateur pour voir sur quel shard il vit, puis lance une requête globale.</p>

      <div className="viz-demo__row">
        {Array.from({ length: SHARDS }).map((_, s) => (
          <div key={s} className={`viz-demo__box ${crossQuery ? 'viz-demo__box--active' : ''}`}>
            🗄️ Shard {s}
            <div style={{ fontSize: '0.75em', marginTop: 4 }}>
              {USERS.filter((u) => hashToShard(u) === s).join(', ')}
            </div>
          </div>
        ))}
      </div>

      <div className="viz-demo__controls">
        {USERS.map((u) => (
          <button
            key={u}
            type="button"
            className={`btn btn--small ${queried === u ? 'btn--primary' : 'btn--secondary'}`}
            onClick={() => {
              setQueried(u)
              setCrossQuery(false)
            }}
          >
            {u}
          </button>
        ))}
      </div>
      <div className="viz-demo__controls">
        <button
          type="button"
          className="btn btn--small btn--danger"
          onClick={() => {
            setCrossQuery(true)
            setQueried(null)
          }}
        >
          🌍 Requête globale (top utilisateurs, tous shards)
        </button>
      </div>

      <p className="viz-demo__note">
        {crossQuery
          ? 'Une requête globale doit interroger les 3 shards puis fusionner les résultats — plus coûteux qu\'une requête ciblée.'
          : queried
            ? `${queried} vit toujours sur le shard ${hashToShard(queried)} — une seule base à interroger pour le retrouver.`
            : 'Chaque utilisateur est assigné à un shard fixe via une fonction de hachage.'}
      </p>
    </div>
  )
}

export default ShardingDemo

import { useState } from 'react'
import { motion } from 'framer-motion'

const USERS = [
  { id: 1, pseudo: 'aissatou' },
  { id: 2, pseudo: 'moussa' },
]

const ORDERS = [
  { id: 101, user_id: 1, total: 4500 },
  { id: 102, user_id: 2, total: 2200 },
]

function JoinDemo() {
  const [joined, setJoined] = useState(false)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Lance le JOIN et regarde comment SQL relie deux tables par une clé.</p>

      <div className="join-demo__tables">
        <table className="join-demo__table">
          <thead>
            <tr>
              <th>users.id</th>
              <th>pseudo</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.id} className={joined ? 'join-demo__row--linked' : ''}>
                <td>{u.id}</td>
                <td>{u.pseudo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="join-demo__table">
          <thead>
            <tr>
              <th>orders.user_id</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} className={joined ? 'join-demo__row--linked' : ''}>
                <td>{o.user_id}</td>
                <td>{o.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {joined && (
        <motion.div className="join-demo__result" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          {USERS.map((u) => {
            const order = ORDERS.find((o) => o.user_id === u.id)
            return (
              <div key={u.id} className="viz-demo__box">
                {u.pseudo} → {order.total} FCFA
              </div>
            )
          })}
        </motion.div>
      )}

      <p className="viz-demo__note">
        {joined
          ? 'JOIN relie chaque ligne de orders à la ligne de users qui a le même id — deux tables séparées, un résultat combiné.'
          : "Avec NoSQL, ces mêmes données pourraient être stockées imbriquées directement dans le document utilisateur, sans JOIN."}
      </p>

      <button type="button" className="btn btn--small btn--primary" onClick={() => setJoined((j) => !j)}>
        {joined ? '↺ Réinitialiser' : '▶ Exécuter le JOIN'}
      </button>
    </div>
  )
}

export default JoinDemo

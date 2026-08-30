import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const OBSERVERS = [
  { name: 'Écran', icon: '📺' },
  { name: 'App mobile', icon: '📱' },
  { name: 'Alerte email', icon: '📧' },
]

function ObserverDemo() {
  const [price, setPrice] = useState(1500)
  const [notified, setNotified] = useState(false)
  const [log, setLog] = useState([])

  function notify() {
    const newPrice = price + 100
    setPrice(newPrice)
    setNotified(true)
    setLog((prev) => [{ id: prev.length, price: newPrice }, ...prev].slice(0, 3))
    setTimeout(() => setNotified(false), 500)
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">
        Clique sur <code>notify()</code> : le sujet prévient tous ses observateurs abonnés, en une fois.
      </p>

      <motion.div className="viz-demo__box observer-demo__subject" animate={notified ? { scale: [1, 1.12, 1] } : {}}>
        🐟 Sujet : prixPoisson = {price}
      </motion.div>

      <div className="observer-demo__observers">
        {OBSERVERS.map((o, i) => (
          <motion.div
            key={o.name}
            className="viz-demo__box"
            animate={notified ? { scale: [1, 1.1, 1], borderColor: ['var(--border)', 'var(--sn-yellow)', 'var(--border)'] } : {}}
            transition={{ delay: notified ? i * 0.12 : 0 }}
          >
            {o.icon} {o.name}
          </motion.div>
        ))}
      </div>

      <button type="button" className="btn btn--small btn--primary" onClick={notify}>
        notify({price + 100})
      </button>

      <ul className="observer-demo__log">
        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.li key={entry.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              Tous les observateurs reçoivent le nouveau prix : {entry.price}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default ObserverDemo

import { useEffect, useState } from 'react'

function MessageQueuesDemo() {
  const [queue, setQueue] = useState([])
  const [processed, setProcessed] = useState(0)
  const [nextId, setNextId] = useState(1)

  function publish() {
    setQueue((q) => [...q, nextId])
    setNextId((n) => n + 1)
  }

  useEffect(() => {
    if (queue.length === 0) return
    const t = setTimeout(() => {
      setQueue((q) => q.slice(1))
      setProcessed((p) => p + 1)
    }, 900)
    return () => clearTimeout(t)
  }, [queue])

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Publie des messages plus vite que le consommateur ne les traite — la file absorbe l'écart.</p>

      <div className="viz-demo__row">
        <button type="button" className="btn btn--small btn--primary" onClick={publish}>
          📤 Publier un message
        </button>
      </div>

      <div className="viz-demo__row">
        {queue.length === 0 ? (
          <span className="viz-demo__note">File vide</span>
        ) : (
          queue.map((id, i) => (
            <div key={id} className={`viz-demo__box ${i === 0 ? 'viz-demo__box--active' : ''}`}>
              #{id}
            </div>
          ))
        )}
      </div>

      <p className="viz-demo__note">
        {queue.length > 0
          ? `Le consommateur traite le message #${queue[0]} en ce moment, à son propre rythme.`
          : `${processed} message${processed !== 1 ? 's' : ''} traité${processed !== 1 ? 's' : ''} au total.`}
      </p>
    </div>
  )
}

export default MessageQueuesDemo

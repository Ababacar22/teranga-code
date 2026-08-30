import { useEffect, useState } from 'react'

const CAPACITY = 5
const REFILL_MS = 1200

function RateLimiterDemo() {
  const [tokens, setTokens] = useState(CAPACITY)
  const [log, setLog] = useState('Le seau démarre plein (5 jetons). Chaque requête consomme 1 jeton.')

  useEffect(() => {
    const id = setInterval(() => {
      setTokens((t) => Math.min(CAPACITY, t + 1))
    }, REFILL_MS)
    return () => clearInterval(id)
  }, [])

  function sendRequest() {
    setTokens((t) => {
      if (t > 0) {
        setLog(`✅ Requête acceptée — il restait ${t} jeton(s), il en reste ${t - 1}.`)
        return t - 1
      }
      setLog('🚫 429 Too Many Requests — seau vide, requête rejetée.')
      return t
    })
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Algorithme "Token Bucket" : envoie des requêtes rapidement et regarde le seau se vider, puis se remplir.</p>

      <div className="viz-demo__row">
        {Array.from({ length: CAPACITY }).map((_, i) => (
          <div key={i} className={`viz-demo__box ${i < tokens ? 'viz-demo__box--success' : ''}`} style={{ minWidth: 40 }}>
            {i < tokens ? '🪙' : '⬜'}
          </div>
        ))}
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--primary" onClick={sendRequest}>
          📨 Envoyer une requête
        </button>
      </div>

      <p className="viz-demo__note">{log} Un jeton se régénère automatiquement toutes les {REFILL_MS / 1000}s.</p>
    </div>
  )
}

export default RateLimiterDemo

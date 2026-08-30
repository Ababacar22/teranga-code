import { useState } from 'react'

function UrlShortenerDemo() {
  const [cache, setCache] = useState({})
  const [lastCode, setLastCode] = useState(null)
  const [log, setLog] = useState('Crée un lien court, puis "visite"-le pour voir le cache entrer en jeu.')
  const [counter, setCounter] = useState(1)

  function createLink() {
    const code = `sn${counter}`
    setCounter((c) => c + 1)
    setLastCode(code)
    setLog(`✍️ Lien créé : /${code} → écrit en base (pas encore en cache).`)
  }

  function visitLink() {
    if (!lastCode) return
    if (cache[lastCode]) {
      setLog(`⚡ Cache HIT sur /${lastCode} — redirection immédiate, aucune requête base.`)
    } else {
      setCache((c) => ({ ...c, [lastCode]: true }))
      setLog(`🐢 Cache MISS sur /${lastCode} — lecture en base, puis mise en cache pour la prochaine fois.`)
    }
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Crée un lien, puis visite-le plusieurs fois : le premier accès est lent, les suivants sont instantanés.</p>

      <div className="viz-demo__row">
        <div className="viz-demo__box">✍️ Écriture (rare)</div>
        <span className="viz-demo__arrow">≪</span>
        <div className={`viz-demo__box ${lastCode && cache[lastCode] ? 'viz-demo__box--success' : ''}`}>📖 Lecture (massive)</div>
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--primary" onClick={createLink}>
          ➕ Créer un lien court
        </button>
        <button type="button" className="btn btn--small btn--secondary" onClick={visitLink} disabled={!lastCode}>
          👆 Visiter {lastCode ? `/${lastCode}` : 'le lien'}
        </button>
      </div>

      <p className="viz-demo__note">{log}</p>
    </div>
  )
}

export default UrlShortenerDemo

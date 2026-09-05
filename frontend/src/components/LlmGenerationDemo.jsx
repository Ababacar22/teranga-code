import { useState } from 'react'

const TOKENS = ['Le', 'Sénégal', 'est', 'connu', 'pour', 'sa', 'teranga', 'et', 'son', 'énergie', 'tech.']

function LlmGenerationDemo() {
  const [count, setCount] = useState(0)
  const done = count >= TOKENS.length

  function next() {
    if (!done) setCount((c) => c + 1)
  }

  function reset() {
    setCount(0)
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Clique "Générer le prochain token" pour voir la phrase se construire mot par mot, comme un LLM.</p>

      <div className="viz-demo__box" style={{ minHeight: 60, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
        {TOKENS.slice(0, count).map((t, i) => (
          <span key={i}>{t}</span>
        ))}
        {!done && <span className="viz-demo__box--active" style={{ padding: '2px 8px', borderRadius: 6 }}>▍</span>}
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--primary" onClick={next} disabled={done}>
          ▶️ Générer le prochain token
        </button>
        <button type="button" className="btn btn--small btn--secondary" onClick={reset}>
          ↺ Recommencer
        </button>
      </div>

      <p className="viz-demo__note">
        {done
          ? '✅ Token de fin atteint — génération terminée. Chaque mot a été choisi comme le plus probable étant donné tout ce qui précède.'
          : `Token ${count + 1}/${TOKENS.length} : le modèle prédit une distribution de probabilités sur tout son vocabulaire, puis en échantillonne un.`}
      </p>
    </div>
  )
}

export default LlmGenerationDemo

import { useState } from 'react'

const SIZES = [
  { lines: 30, thoroughness: 95, note: 'PR petite et ciblée : le relecteur peut examiner chaque ligne avec attention.' },
  { lines: 150, thoroughness: 70, note: "PR moyenne : encore lisible, mais l'attention commence à baisser." },
  { lines: 500, thoroughness: 35, note: 'Grosse PR : le relecteur survole plus qu’il ne lit — des bugs passent inaperçus.' },
  { lines: 1200, thoroughness: 15, note: "Très grosse PR : en pratique, la review devient un simple \"LGTM\" sans réelle vérification." },
]

function ReviewSizeDemo() {
  const [index, setIndex] = useState(0)
  const s = SIZES[index]

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Regarde comment la qualité de la review s'effondre avec la taille de la PR.</p>

      <div className="viz-demo__controls">
        {SIZES.map((size, i) => (
          <button
            key={size.lines}
            type="button"
            className={`btn btn--small ${i === index ? 'btn--primary' : 'btn--secondary'}`}
            onClick={() => setIndex(i)}
          >
            {size.lines} lignes
          </button>
        ))}
      </div>

      <div className="review-demo__gauge">
        <div className="review-demo__gauge-fill" style={{ width: `${s.thoroughness}%`, background: s.thoroughness > 60 ? 'var(--sn-green)' : s.thoroughness > 30 ? 'var(--sn-yellow)' : 'var(--sn-red)' }} />
      </div>
      <p className="review-demo__gauge-label">Attention portée à chaque ligne : {s.thoroughness}%</p>

      <p className="viz-demo__note">{s.note}</p>
    </div>
  )
}

export default ReviewSizeDemo

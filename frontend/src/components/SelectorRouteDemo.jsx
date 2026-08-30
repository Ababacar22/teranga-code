import { useState } from 'react'

function SelectorRouteDemo({ hint, options, placeholder }) {
  const [selected, setSelected] = useState(null)
  const active = options.find((o) => o.key === selected)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">{hint}</p>
      <div className="viz-demo__row">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            className={`viz-demo__box selector-demo__option ${selected === o.key ? 'viz-demo__box--active' : ''}`}
            onClick={() => setSelected(o.key)}
          >
            {o.icon} {o.label}
          </button>
        ))}
      </div>
      {active && (
        <>
          <span className="viz-demo__arrow">↓</span>
          <div className="viz-demo__box viz-demo__box--success">{active.result}</div>
        </>
      )}
      <p className="viz-demo__note">{active ? active.note : placeholder}</p>
    </div>
  )
}

export default SelectorRouteDemo

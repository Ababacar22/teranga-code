import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TOPPINGS = [
  { key: 'thiof', label: 'thiof', emoji: '🐟' },
  { key: 'oignons', label: 'oignons', emoji: '🧅' },
  { key: 'piment', label: 'piment', emoji: '🌶️' },
]

function StepBuilderDemo() {
  const [taille, setTaille] = useState(null)
  const [toppings, setToppings] = useState([])
  const [built, setBuilt] = useState(false)

  function addTopping(t) {
    if (built) return
    if (!toppings.includes(t)) setToppings((prev) => [...prev, t])
  }

  function reset() {
    setTaille(null)
    setToppings([])
    setBuilt(false)
  }

  const chain = [
    taille && `.taille('${taille}')`,
    ...toppings.map((t) => `.ajouterGarniture('${t}')`),
    built && '.build()',
  ].filter(Boolean)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Construis une pizza étape par étape, comme une API fluide.</p>

      <div className="builder-demo__pizza">
        🍕
        <AnimatePresence>
          {toppings.map((t) => (
            <motion.span
              key={t}
              className="builder-demo__topping"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {TOPPINGS.find((x) => x.key === t).emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="viz-demo__controls">
        {['S', 'M', 'L'].map((t) => (
          <button
            key={t}
            type="button"
            className={`btn btn--small ${taille === t ? 'btn--primary' : 'btn--secondary'}`}
            onClick={() => !built && setTaille(t)}
            disabled={built}
          >
            Taille {t}
          </button>
        ))}
      </div>

      <div className="viz-demo__controls">
        {TOPPINGS.map((t) => (
          <button
            key={t.key}
            type="button"
            className="btn btn--small btn--secondary"
            onClick={() => addTopping(t.key)}
            disabled={built || toppings.includes(t.key)}
          >
            + {t.emoji} {t.label}
          </button>
        ))}
      </div>

      <pre className="code-block builder-demo__chain">
        <code>{`new PizzaBuilder()\n${chain.map((c) => `  ${c}`).join('\n') || '  …'}`}</code>
      </pre>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--primary" onClick={() => setBuilt(true)} disabled={!taille || built}>
          build()
        </button>
        <button type="button" className="btn btn--small btn--secondary" onClick={reset}>
          Réinitialiser
        </button>
      </div>

      <p className="viz-demo__note">
        {built ? '🍕 Pizza construite ! L’objet final est valide et prêt.' : "Choisis une taille puis des garnitures, dans l'ordre que tu veux."}
      </p>
    </div>
  )
}

export default StepBuilderDemo

import { useState } from 'react'
import { motion } from 'framer-motion'

const INITIAL = [1, 2, 3]

function MutationDemo() {
  const [impureArrays, setImpureArrays] = useState([INITIAL])
  const [pureArrays, setPureArrays] = useState([INITIAL])
  const [nextValue, setNextValue] = useState(4)

  function runImpure() {
    const arr = impureArrays[impureArrays.length - 1]
    arr.push(nextValue) // mutation volontaire, pour la démo
    setImpureArrays([...impureArrays.slice(0, -1), arr])
    setNextValue((v) => v + 1)
  }

  function runPure() {
    const arr = pureArrays[pureArrays.length - 1]
    const newArr = [...arr, nextValue]
    setPureArrays([...pureArrays, newArr])
    setNextValue((v) => v + 1)
  }

  function reset() {
    setImpureArrays([INITIAL])
    setPureArrays([INITIAL])
    setNextValue(4)
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Ajoute {nextValue} et regarde ce qui arrive à la boîte originale.</p>

      <div className="mutation-demo__cols">
        <div className="mutation-demo__col">
          <strong>ajouterImpure (mute)</strong>
          <div className="mutation-demo__boxes">
            <motion.div key={impureArrays.length} className="viz-demo__box mutation-demo__box" animate={{ scale: [1, 1.08, 1] }}>
              [{impureArrays[impureArrays.length - 1].join(', ')}]
            </motion.div>
          </div>
          <p className="mutation-demo__caption">Toujours la même boîte — {impureArrays.length > 1 ? 'modifiée en place' : 'jamais modifiée pour l’instant'}.</p>
        </div>

        <div className="mutation-demo__col">
          <strong>ajouterPure (immuable)</strong>
          <div className="mutation-demo__boxes">
            {pureArrays.map((arr, i) => (
              <motion.div
                key={i}
                className={`viz-demo__box mutation-demo__box ${i < pureArrays.length - 1 ? 'mutation-demo__box--old' : ''}`}
                initial={i > 0 ? { opacity: 0, x: -12 } : false}
                animate={{ opacity: 1, x: 0 }}
              >
                [{arr.join(', ')}]
              </motion.div>
            ))}
          </div>
          <p className="mutation-demo__caption">{pureArrays.length > 1 ? 'Une nouvelle boîte à chaque appel — l’ancienne reste intacte.' : 'Une boîte pour l’instant.'}</p>
        </div>
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--danger" onClick={runImpure}>
          ajouterImpure(arr, {nextValue})
        </button>
        <button type="button" className="btn btn--small btn--primary" onClick={runPure}>
          ajouterPure(arr, {nextValue})
        </button>
        <button type="button" className="btn btn--small btn--secondary" onClick={reset}>
          Réinitialiser
        </button>
      </div>
    </div>
  )
}

export default MutationDemo

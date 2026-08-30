import { useEffect, useMemo, useState } from 'react'

const INITIAL_ARRAY = [5, 3, 8, 1, 9, 2]

function computeBubbleSortSteps(initial) {
  const a = [...initial]
  const n = a.length
  const steps = [{ array: [...a], compare: null, swapped: false, sortedFrom: n, note: 'Tableau de départ.' }]

  for (let i = 0; i < n - 1; i++) {
    let swappedAny = false
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: [...a],
        compare: [j, j + 1],
        swapped: false,
        sortedFrom: n - i,
        note: `On compare ${a[j]} et ${a[j + 1]}${a[j] > a[j + 1] ? ' — ils sont dans le mauvais ordre.' : ' — déjà dans le bon ordre.'}`,
      })
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swappedAny = true
        steps.push({
          array: [...a],
          compare: [j, j + 1],
          swapped: true,
          sortedFrom: n - i,
          note: `On échange ${a[j + 1]} et ${a[j]}.`,
        })
      }
    }
    if (!swappedAny) break
  }
  steps.push({ array: [...a], compare: null, swapped: false, sortedFrom: 0, note: 'Tableau trié !' })
  return steps
}

function SortingDemo() {
  const steps = useMemo(() => computeBubbleSortSteps(INITIAL_ARRAY), [])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing || index >= steps.length - 1) return
    const t = setTimeout(() => setIndex((i) => i + 1), 700)
    return () => clearTimeout(t)
  }, [playing, index, steps.length])

  const step = steps[index]
  const max = Math.max(...INITIAL_ARRAY)
  const isDone = index >= steps.length - 1

  function togglePlay() {
    if (isDone) {
      setIndex(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }

  return (
    <div className="sorting-demo">
      <p className="sorting-demo__hint">Regarde le tri à bulles trier ce tableau, une comparaison à la fois.</p>

      <div className="sorting-demo__bars">
        {step.array.map((v, i) => {
          const isCompared = step.compare?.includes(i)
          const isSorted = i >= step.sortedFrom
          return (
            <div className="sorting-demo__bar-wrap" key={i}>
              <div
                className={`sorting-demo__bar ${
                  isCompared ? (step.swapped ? 'sorting-demo__bar--swap' : 'sorting-demo__bar--compare') : ''
                } ${isSorted ? 'sorting-demo__bar--sorted' : ''}`}
                style={{ height: `${(v / max) * 100}%` }}
              />
              <span className="sorting-demo__value">{v}</span>
            </div>
          )
        })}
      </div>

      <p className="sorting-demo__note">{step.note}</p>

      <div className="sorting-demo__controls">
        <button
          type="button"
          className="btn btn--small btn--secondary"
          onClick={() => {
            setPlaying(false)
            setIndex((i) => Math.max(0, i - 1))
          }}
          disabled={index === 0}
        >
          ← Précédent
        </button>
        <button type="button" className="btn btn--small btn--primary" onClick={togglePlay}>
          {isDone ? '🔁 Rejouer' : playing ? 'Pause' : '▶ Lecture auto'}
        </button>
        <button
          type="button"
          className="btn btn--small btn--secondary"
          onClick={() => {
            setPlaying(false)
            setIndex((i) => Math.min(steps.length - 1, i + 1))
          }}
          disabled={isDone}
        >
          Suivant →
        </button>
      </div>
      <p className="sorting-demo__step-count">
        Étape {index + 1} / {steps.length}
      </p>
    </div>
  )
}

export default SortingDemo

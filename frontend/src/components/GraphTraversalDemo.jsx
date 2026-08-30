import { useEffect, useMemo, useState } from 'react'

const GRAPH = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D', 'E'],
  D: ['B', 'C', 'F'],
  E: ['C', 'F'],
  F: ['D', 'E'],
}

const POSITIONS = {
  A: { x: 60, y: 40 },
  B: { x: 200, y: 30 },
  C: { x: 40, y: 140 },
  D: { x: 180, y: 130 },
  E: { x: 90, y: 200 },
  F: { x: 220, y: 200 },
}

const EDGES = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['C', 'D'],
  ['C', 'E'],
  ['D', 'F'],
  ['E', 'F'],
]

const START = 'A'

function computeBfsSteps() {
  const visited = new Set([START])
  const queue = [START]
  const steps = [
    { current: null, visited: new Set(visited), queue: [...queue], note: `Départ : "${START}" rejoint la file et les visités.` },
  ]

  while (queue.length) {
    const node = queue.shift()
    steps.push({ current: node, visited: new Set(visited), queue: [...queue], note: `On traite "${node}".` })
    for (const neighbor of GRAPH[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
        steps.push({
          current: node,
          visited: new Set(visited),
          queue: [...queue],
          note: `"${neighbor}" n'est pas encore visité : on l'ajoute à la file.`,
        })
      }
    }
  }
  steps.push({ current: null, visited: new Set(visited), queue: [], note: 'Parcours terminé — tous les nœuds atteignables ont été visités.' })
  return steps
}

function GraphTraversalDemo() {
  const steps = useMemo(() => computeBfsSteps(), [])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing || index >= steps.length - 1) return
    const t = setTimeout(() => setIndex((i) => i + 1), 900)
    return () => clearTimeout(t)
  }, [playing, index, steps.length])

  const step = steps[index]
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
    <div className="graph-demo">
      <p className="graph-demo__hint">Regarde le BFS explorer ce graphe niveau par niveau, en partant de "{START}".</p>

      <svg className="graph-demo__svg" viewBox="0 0 260 220" role="img" aria-label="Visualisation du parcours BFS">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={POSITIONS[a].x}
            y1={POSITIONS[a].y}
            x2={POSITIONS[b].x}
            y2={POSITIONS[b].y}
            className="graph-demo__edge"
          />
        ))}
        {Object.entries(POSITIONS).map(([node, pos]) => {
          const isVisited = step.visited.has(node)
          const isCurrent = step.current === node
          return (
            <g key={node}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={18}
                className={`graph-demo__node ${isVisited ? 'graph-demo__node--visited' : ''} ${
                  isCurrent ? 'graph-demo__node--current' : ''
                }`}
              />
              <text x={pos.x} y={pos.y + 5} className="graph-demo__label" textAnchor="middle">
                {node}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="graph-demo__queue">
        <span className="graph-demo__queue-label">File :</span>
        {step.queue.length === 0 ? (
          <span className="graph-demo__queue-empty">vide</span>
        ) : (
          step.queue.map((n, i) => (
            <span className="graph-demo__queue-chip" key={`${n}-${i}`}>
              {n}
            </span>
          ))
        )}
      </div>

      <p className="graph-demo__note">{step.note}</p>

      <div className="graph-demo__controls">
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
      <p className="graph-demo__step-count">
        Étape {index + 1} / {steps.length}
      </p>
    </div>
  )
}

export default GraphTraversalDemo

import { useState } from 'react'

const PHASES = [
  {
    key: 'red',
    label: 'Red',
    emoji: '🔴',
    code: "test('additionne', () => {\n  expect(additionner(2, 3)).toBe(5);\n});\n// additionner n'existe pas encore → le test échoue",
    note: "On écrit un test pour une fonctionnalité qui n'existe pas encore — il échoue, c'est normal.",
  },
  {
    key: 'green',
    label: 'Green',
    emoji: '🟢',
    code: 'function additionner(a, b) {\n  return a + b;\n}\n// Le test passe',
    note: 'On écrit le code MINIMAL pour faire passer le test — pas plus.',
  },
  {
    key: 'refactor',
    label: 'Refactor',
    emoji: '🔵',
    code: '// Le code fonctionne déjà : on peut le nettoyer\n// (renommer, simplifier...) sans changer son comportement,\n// le test reste vert pour le prouver.',
    note: 'On améliore le code (lisibilité, structure) en gardant le test vert comme filet de sécurité.',
  },
]

function TDDCycleDemo() {
  const [index, setIndex] = useState(0)
  const phase = PHASES[index]

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Le cycle TDD tourne en boucle : Red → Green → Refactor → Red...</p>

      <div className="tdd-demo__cycle">
        {PHASES.map((p, i) => (
          <button
            key={p.key}
            type="button"
            className={`viz-demo__box tdd-demo__phase ${i === index ? 'viz-demo__box--active' : ''}`}
            onClick={() => setIndex(i)}
          >
            {p.emoji} {p.label}
          </button>
        ))}
      </div>

      <pre className="code-block tdd-demo__code">
        <code>{phase.code}</code>
      </pre>

      <p className="viz-demo__note">{phase.note}</p>

      <button type="button" className="btn btn--small btn--primary" onClick={() => setIndex((i) => (i + 1) % PHASES.length)}>
        Étape suivante →
      </button>
    </div>
  )
}

export default TDDCycleDemo

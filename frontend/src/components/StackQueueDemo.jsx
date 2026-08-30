import { useMemo } from 'react'
import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const OPS = [
  { type: 'push-pile', val: 'a' },
  { type: 'push-pile', val: 'b' },
  { type: 'pop-pile' },
  { type: 'push-file', val: 'a' },
  { type: 'push-file', val: 'b' },
  { type: 'shift-file' },
]

function computeSteps() {
  let pile = []
  let file = []
  const steps = [{ pile: [...pile], file: [...file], removed: null, note: 'On va remplir une pile (LIFO) puis une file (FIFO).' }]

  for (const op of OPS) {
    let removed = null
    if (op.type === 'push-pile') {
      pile = [...pile, op.val]
      steps.push({ pile: [...pile], file: [...file], removed: null, note: `pile.push('${op.val}') — ajouté en haut de la pile.` })
    } else if (op.type === 'pop-pile') {
      removed = pile[pile.length - 1]
      pile = pile.slice(0, -1)
      steps.push({ pile: [...pile], file: [...file], removed: `pile:${removed}`, note: `pile.pop() → retire '${removed}', le DERNIER ajouté (LIFO).` })
    } else if (op.type === 'push-file') {
      file = [...file, op.val]
      steps.push({ pile: [...pile], file: [...file], removed: null, note: `file.push('${op.val}') — ajouté en fin de file.` })
    } else if (op.type === 'shift-file') {
      removed = file[0]
      file = file.slice(1)
      steps.push({ pile: [...pile], file: [...file], removed: `file:${removed}`, note: `file.shift() → retire '${removed}', le PREMIER ajouté (FIFO).` })
    }
  }
  return steps
}

function StackQueueDemo() {
  const steps = useMemo(() => computeSteps(), [])
  const player = useStepPlayer(steps.length, 900)
  const step = steps[player.index]

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Même séquence d'opérations, deux comportements : LIFO (pile) vs FIFO (file).</p>

      <div className="stack-queue-demo__cols">
        <div className="stack-queue-demo__col">
          <strong>Pile (LIFO)</strong>
          <div className="stack-queue-demo__stack">
            {step.pile.map((v, i) => (
              <div key={i} className="viz-demo__box">
                {v}
              </div>
            ))}
            {step.pile.length === 0 && <span className="stack-queue-demo__empty">vide</span>}
          </div>
        </div>
        <div className="stack-queue-demo__col">
          <strong>File (FIFO)</strong>
          <div className="stack-queue-demo__row">
            {step.file.map((v, i) => (
              <div key={i} className="viz-demo__box">
                {v}
              </div>
            ))}
            {step.file.length === 0 && <span className="stack-queue-demo__empty">vide</span>}
          </div>
        </div>
      </div>

      <p className="viz-demo__note">{step.note}</p>
      <StepControls
        index={player.index}
        stepCount={steps.length}
        isDone={player.isDone}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.togglePlay}
        onNext={player.next}
      />
    </div>
  )
}

export default StackQueueDemo

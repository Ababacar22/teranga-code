import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STEPS = [
  { pos: 0, note: "AncienService.recupererDonnees() renvoie { d: [1,2,3] } — un format incompatible avec notre app." },
  { pos: 1, note: "ServiceAdapter enveloppe AncienService et traduit son format." },
  { pos: 2, note: 'getData() renvoie [1,2,3] — exactement ce que notre app attend.' },
]

const SHAPES = ['🔲', '🔀', '✅']

function AdapterFitDemo() {
  const player = useStepPlayer(STEPS.length, 1000)
  const step = STEPS[player.index]

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Suis la donnée qui traverse l'Adapter pour devenir compatible.</p>

      <div className="viz-demo__row">
        <div className={`viz-demo__box ${step.pos === 0 ? 'viz-demo__box--active' : step.pos > 0 ? 'viz-demo__box--success' : ''}`}>
          {SHAPES[0]} AncienService
        </div>
        <span className="viz-demo__arrow">→</span>
        <div className={`viz-demo__box ${step.pos === 1 ? 'viz-demo__box--active' : step.pos > 1 ? 'viz-demo__box--success' : ''}`}>
          {SHAPES[1]} ServiceAdapter
        </div>
        <span className="viz-demo__arrow">→</span>
        <div className={`viz-demo__box ${step.pos === 2 ? 'viz-demo__box--success' : ''}`}>{SHAPES[2]} Notre app</div>
      </div>

      <p className="viz-demo__note">{step.note}</p>
      <StepControls
        index={player.index}
        stepCount={STEPS.length}
        isDone={player.isDone}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.togglePlay}
        onNext={player.next}
      />
    </div>
  )
}

export default AdapterFitDemo

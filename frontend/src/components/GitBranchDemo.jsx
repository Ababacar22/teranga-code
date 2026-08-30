import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STEPS = [
  { mainDots: [0, 1], featureVisible: false, featureDots: [], merge: false, note: 'La branche main a déjà 2 commits.' },
  { mainDots: [0, 1], featureVisible: true, featureDots: [], merge: false, note: "git checkout -b feature/login : une nouvelle branche part du dernier commit de main." },
  { mainDots: [0, 1], featureVisible: true, featureDots: [2], merge: false, note: 'Premier commit sur feature/login.' },
  { mainDots: [0, 1], featureVisible: true, featureDots: [2, 3], merge: false, note: 'Deuxième commit sur feature/login.' },
  { mainDots: [0, 1, 4], featureVisible: true, featureDots: [2, 3], merge: true, note: 'Merge : les commits de feature/login sont intégrés dans main.' },
]

const SLOTS = [0, 1, 2, 3, 4]

function GitBranchDemo() {
  const player = useStepPlayer(STEPS.length, 1000)
  const step = STEPS[player.index]

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Suis la création d'une branche, ses commits, puis son merge dans main.</p>

      <div className="git-demo">
        <div className="git-demo__row">
          <span className="git-demo__row-label">main</span>
          <div className="git-demo__track">
            {SLOTS.map((s) => (
              <span key={s} className={`git-demo__dot ${step.mainDots.includes(s) ? 'git-demo__dot--filled' : ''}`} />
            ))}
          </div>
        </div>
        {step.featureVisible && (
          <div className="git-demo__row git-demo__row--feature">
            <span className="git-demo__row-label">feature/login</span>
            <div className="git-demo__track">
              {SLOTS.map((s) => (
                <span key={s} className={`git-demo__dot ${step.featureDots.includes(s) ? 'git-demo__dot--filled-feature' : ''}`} />
              ))}
            </div>
          </div>
        )}
        {step.merge && <p className="git-demo__merge">🔀 merge</p>}
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

export default GitBranchDemo

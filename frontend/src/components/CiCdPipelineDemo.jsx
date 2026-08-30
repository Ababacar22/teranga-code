import { useState } from 'react'
import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STAGES = ['Push', 'Install', 'Lint', 'Test', 'Build', 'Deploy']

function CiCdPipelineDemo() {
  const [scenario, setScenario] = useState('ok')
  const failIndex = 3 // Test
  const visibleCount = scenario === 'fail' ? failIndex + 1 : STAGES.length
  const player = useStepPlayer(visibleCount, 700)

  function launch(nextScenario) {
    setScenario(nextScenario)
    player.reset()
  }

  const isFailedStage = scenario === 'fail' && player.index === failIndex && player.isDone

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Lance le pipeline, avec ou sans échec des tests.</p>

      <div className="viz-demo__row">
        {STAGES.map((label, i) => {
          const isCurrent = i === player.index
          const isSkipped = scenario === 'fail' && i > failIndex
          let cls = ''
          if (isCurrent && isFailedStage) cls = 'viz-demo__box--danger'
          else if (isCurrent) cls = 'viz-demo__box--active'
          else if (i < player.index) cls = 'viz-demo__box--success'
          return (
            <div className="viz-demo__row" key={label}>
              <div className={`viz-demo__box ${cls}`} style={isSkipped ? { opacity: 0.4 } : undefined}>
                {label}
              </div>
              {i < STAGES.length - 1 && <span className="viz-demo__arrow">→</span>}
            </div>
          )
        })}
      </div>

      <p className="viz-demo__note">
        {isFailedStage
          ? '❌ Les tests échouent : le pipeline s’arrête ici, build et déploiement n’ont jamais lieu.'
          : player.isDone
            ? '✅ Pipeline terminé avec succès, déployé en production.'
            : `Étape en cours : ${STAGES[player.index]}.`}
      </p>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--primary" onClick={() => launch('ok')}>
          ▶ Lancer (tests OK)
        </button>
        <button type="button" className="btn btn--small btn--danger" onClick={() => launch('fail')}>
          ▶ Lancer (tests échouent)
        </button>
      </div>

      <StepControls
        index={player.index}
        stepCount={visibleCount}
        isDone={player.isDone}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.togglePlay}
        onNext={player.next}
      />
    </div>
  )
}

export default CiCdPipelineDemo

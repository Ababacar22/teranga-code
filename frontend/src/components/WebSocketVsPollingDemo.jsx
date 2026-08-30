import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STEPS = [
  { client: 'active', note: 'Polling : le client demande "y a-t-il du nouveau ?"' },
  { server: 'active', note: 'Le serveur répond : rien de nouveau. Requête inutile.' },
  { client: 'active', note: 'Une seconde plus tard, le client redemande...' },
  { server: 'active', note: 'Toujours rien. Encore une requête pour rien.' },
  { client: 'active', note: 'Et encore une fois...' },
  { server: 'success', note: 'Enfin une nouvelle donnée — mais elle a attendu le prochain cycle de polling.' },
  { both: 'ws', note: 'Avec un WebSocket : une seule connexion reste ouverte en continu.' },
  { server: 'success', both: 'ws', note: 'Dès qu\'une donnée est prête, le serveur la POUSSE immédiatement — sans attendre une question.' },
]

function boxClass(active, danger) {
  if (danger) return 'viz-demo__box--danger'
  if (active) return 'viz-demo__box--active'
  return ''
}

function WebSocketVsPollingDemo() {
  const player = useStepPlayer(STEPS.length, 800)
  const step = STEPS[player.index]

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Compare le rythme du polling répété à une connexion WebSocket permanente.</p>

      <div className="viz-demo__row">
        <div className={`viz-demo__box ${boxClass(step.client)}`}>📱 Client</div>
        <span className="viz-demo__arrow">{step.both === 'ws' ? '↔' : '→'}</span>
        <div className={`viz-demo__box ${boxClass(step.server || step.both)}`}>🖥️ Serveur</div>
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

export default WebSocketVsPollingDemo

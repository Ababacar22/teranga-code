import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STEPS = [
  { client: 'active', cache: '', db: '', note: 'Requête 1 : le client demande user:42.' },
  { client: '', cache: 'active', db: '', note: 'On vérifie le cache… MISS ❌ (rien pour user:42).' },
  { client: '', cache: '', db: 'active', note: "On interroge la base de données — plus lent." },
  { client: '', cache: 'success', db: '', note: "Le résultat est stocké dans le cache (expire dans 60s)." },
  { client: 'success', cache: '', db: '', note: 'La réponse est envoyée au client.' },
  { client: 'active', cache: '', db: '', note: 'Requête 2 : le client redemande user:42.' },
  { client: '', cache: 'success', db: '', note: 'On vérifie le cache… HIT ✅ (déjà présent).' },
  { client: 'success', cache: '', db: '', note: 'Réponse envoyée directement depuis le cache, sans toucher la base de données.' },
]

function boxClass(state) {
  if (state === 'active') return 'viz-demo__box--active'
  if (state === 'success') return 'viz-demo__box--success'
  return ''
}

function CacheFlowDemo() {
  const player = useStepPlayer(STEPS.length, 900)
  const step = STEPS[player.index]

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Compare une requête en cache miss puis en cache hit.</p>

      <div className="viz-demo__row">
        <div className={`viz-demo__box ${boxClass(step.client)}`}>📱 Client</div>
        <span className="viz-demo__arrow">→</span>
        <div className={`viz-demo__box ${boxClass(step.cache)}`}>⚡ Cache (Redis)</div>
        <span className="viz-demo__arrow">→</span>
        <div className={`viz-demo__box ${boxClass(step.db)}`}>🗃️ Base de données</div>
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

export default CacheFlowDemo

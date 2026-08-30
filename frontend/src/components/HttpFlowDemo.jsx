import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STAGES = [
  { label: 'Client', emoji: '📱', note: 'Le navigateur veut charger https://teranga-code.sn.' },
  { label: 'DNS', emoji: '🧭', note: 'Le nom de domaine est résolu en adresse IP.' },
  { label: 'TCP', emoji: '🤝', note: "Une connexion TCP s'établit avec le serveur (three-way handshake)." },
  { label: 'TLS', emoji: '🔒', note: 'La connexion est chiffrée : certificat vérifié, clé de session négociée.' },
  { label: 'Requête', emoji: '📤', note: 'La requête HTTP part enfin, avec méthode, en-têtes et éventuellement un corps.' },
  { label: 'Réponse', emoji: '📥', note: 'Le serveur répond avec un code de statut et des données.' },
]

function HttpFlowDemo() {
  const player = useStepPlayer(STAGES.length, 900)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Suis toutes les étapes cachées derrière une simple visite de page web.</p>

      <div className="viz-demo__row">
        {STAGES.map((s, i) => (
          <div className="viz-demo__row" key={s.label}>
            <div
              className={`viz-demo__box ${i === player.index ? 'viz-demo__box--active' : ''} ${
                i < player.index ? 'viz-demo__box--success' : ''
              }`}
            >
              {s.emoji} {s.label}
            </div>
            {i < STAGES.length - 1 && <span className="viz-demo__arrow">→</span>}
          </div>
        ))}
      </div>

      <p className="viz-demo__note">{STAGES[player.index].note}</p>
      <StepControls
        index={player.index}
        stepCount={STAGES.length}
        isDone={player.isDone}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.togglePlay}
        onNext={player.next}
      />
    </div>
  )
}

export default HttpFlowDemo

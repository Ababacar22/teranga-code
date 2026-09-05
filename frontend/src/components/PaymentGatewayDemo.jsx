import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STAGES = [
  { label: 'Marchand', emoji: '🛒', note: 'Le marchand envoie les détails du paiement à la passerelle.' },
  { label: 'Tokenisation', emoji: '🔐', note: 'Les données de carte réelles sont immédiatement remplacées par un jeton inutilisable ailleurs.' },
  { label: 'Routage', emoji: '🧭', note: 'La passerelle choisit le bon réseau (carte, UPI, portefeuille mobile) selon le contexte.' },
  { label: 'Banque émettrice', emoji: '🏦', note: 'La banque du client autorise — ou refuse — la transaction.' },
  { label: 'Audit', emoji: '📝', note: 'Chaque décision est journalisée pour la conformité réglementaire, réussie ou non.' },
  { label: 'Confirmation', emoji: '✅', note: 'La réponse redescend toute la chaîne jusqu\'au marchand, en quelques centaines de millisecondes.' },
]

function PaymentGatewayDemo() {
  const player = useStepPlayer(STAGES.length, 900)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Suis le chemin d'une autorisation de paiement, maillon par maillon.</p>

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

export default PaymentGatewayDemo

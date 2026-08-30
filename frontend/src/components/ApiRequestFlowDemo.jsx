import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STAGES = [
  { label: 'Client', emoji: '📱', note: "Le client envoie GET /users/42 avec son token dans l'en-tête." },
  { label: 'Routeur', emoji: '🧭', note: 'Le serveur identifie quelle route/contrôleur doit traiter la demande.' },
  { label: 'Traitement', emoji: '⚙️', note: 'La logique métier vérifie le token, applique les règles.' },
  { label: 'Base de données', emoji: '🗃️', note: "L'utilisateur 42 est recherché en base de données." },
  { label: 'Réponse', emoji: '📦', note: 'Le serveur renvoie un code de statut HTTP (200) et les données en JSON.' },
]

function ApiRequestFlowDemo() {
  const player = useStepPlayer(STAGES.length, 900)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Suis une requête GET /users/42 à travers le serveur, étape par étape.</p>

      <div className="viz-demo__row">
        {STAGES.map((s, i) => (
          <div key={s.label} className="viz-demo__row">
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

export default ApiRequestFlowDemo

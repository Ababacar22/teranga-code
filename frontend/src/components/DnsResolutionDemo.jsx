import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STAGES = [
  { label: 'Cache navigateur', emoji: '🌐', note: "Le navigateur vérifie s'il connaît déjà cette adresse (résolution récente)." },
  { label: 'Cache OS', emoji: '💻', note: "À défaut, le système d'exploitation vérifie son propre cache DNS." },
  { label: 'Résolveur', emoji: '🧭', note: 'Le résolveur DNS (souvent celui du fournisseur internet) prend le relais.' },
  { label: 'Racine', emoji: '🌳', note: 'Le résolveur interroge un serveur racine, qui indique où trouver le domaine .sn.' },
  { label: 'TLD (.sn)', emoji: '🇸🇳', note: "Le serveur du domaine de premier niveau indique le serveur autoritaire du domaine exact." },
  { label: 'Autoritaire', emoji: '🗂️', note: "Le serveur autoritaire connaît l'adresse IP exacte de ce domaine." },
  { label: 'IP renvoyée', emoji: '✅', note: "L'adresse IP remonte toute la chaîne et est mise en cache pour les prochaines fois." },
]

function DnsResolutionDemo() {
  const player = useStepPlayer(STAGES.length, 800)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Suis la résolution d'un nom de domaine, étape par étape.</p>

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

export default DnsResolutionDemo

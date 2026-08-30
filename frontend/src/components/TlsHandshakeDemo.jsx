import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STAGES = [
  { label: 'ClientHello', emoji: '👋', note: 'Le client annonce les méthodes de chiffrement qu’il supporte.' },
  { label: 'Certificat', emoji: '📜', note: 'Le serveur répond avec son certificat, contenant sa clé publique.' },
  { label: 'Vérification CA', emoji: '🔍', note: 'Le navigateur vérifie que le certificat est signé par une autorité de confiance.' },
  { label: 'Échange de clé', emoji: '🔑', note: 'Une clé de session temporaire est négociée entre les deux parties.' },
  { label: 'Chiffré', emoji: '🔒', note: 'Toutes les données suivantes sont chiffrées avec cette clé de session.' },
]

function TlsHandshakeDemo() {
  const player = useStepPlayer(STAGES.length, 900)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Suis la poignée de main TLS avant qu'une seule donnée chiffrée ne circule.</p>

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

export default TlsHandshakeDemo

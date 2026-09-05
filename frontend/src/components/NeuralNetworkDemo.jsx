import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const LAYERS = [
  { label: 'Entrée', emoji: '📥', note: "Les données brutes (ex: pixels d'une image) entrent dans le réseau." },
  { label: 'Couche cachée 1', emoji: '🔵', note: 'Chaque neurone combine les entrées avec des poids appris, puis applique une non-linéarité (ex: ReLU).' },
  { label: 'Couche cachée 2', emoji: '🔵', note: 'Les couches profondes apprennent des représentations de plus en plus abstraites des données.' },
  { label: 'Sortie', emoji: '📤', note: 'La dernière couche produit la prédiction finale (ex: probabilité que ce soit un chat).' },
]

function NeuralNetworkDemo() {
  const player = useStepPlayer(LAYERS.length, 900)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Suis le passage avant (forward pass) à travers les couches d'un réseau de neurones.</p>

      <div className="viz-demo__row">
        {LAYERS.map((l, i) => (
          <div className="viz-demo__row" key={l.label}>
            <div
              className={`viz-demo__box ${i === player.index ? 'viz-demo__box--active' : ''} ${
                i < player.index ? 'viz-demo__box--success' : ''
              }`}
            >
              {l.emoji} {l.label}
            </div>
            {i < LAYERS.length - 1 && <span className="viz-demo__arrow">→</span>}
          </div>
        ))}
      </div>

      <p className="viz-demo__note">{LAYERS[player.index].note}</p>
      <StepControls
        index={player.index}
        stepCount={LAYERS.length}
        isDone={player.isDone}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.togglePlay}
        onNext={player.next}
      />
    </div>
  )
}

export default NeuralNetworkDemo

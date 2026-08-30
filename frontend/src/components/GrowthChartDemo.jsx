import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const MAX_N = 20
const SERIES = [
  { key: 'o1', label: 'O(1)', color: 'var(--sn-green)', fn: () => 1 },
  { key: 'ologn', label: 'O(log n)', color: 'var(--sn-yellow)', fn: (n) => Math.max(1, Math.log2(n)) },
  { key: 'on', label: 'O(n)', color: 'var(--clay)', fn: (n) => n },
  { key: 'on2', label: 'O(n²)', color: 'var(--sn-red)', fn: (n) => n * n },
]

const MAX_VALUE = MAX_N * MAX_N

function GrowthChartDemo() {
  const player = useStepPlayer(MAX_N, 400)
  const n = player.index + 1

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Regarde le nombre d'opérations grandir avec la taille des données (n).</p>

      <div className="growth-demo__chart">
        {SERIES.map((s) => {
          const value = Math.round(s.fn(n))
          const heightPct = (s.fn(n) / MAX_VALUE) * 100
          return (
            <div className="growth-demo__series" key={s.key}>
              <div className="growth-demo__track">
                <div
                  className="growth-demo__bar"
                  style={{ height: `${Math.max(heightPct, 1.5)}%`, background: s.color }}
                />
              </div>
              <span className="growth-demo__value">{value.toLocaleString('fr-FR')}</span>
              <span className="growth-demo__label">{s.label}</span>
            </div>
          )
        })}
      </div>

      <p className="viz-demo__note">n = {n} — à n = {MAX_N}, O(n²) fait déjà {MAX_N * MAX_N} opérations contre {MAX_N} pour O(n).</p>
      <StepControls
        index={player.index}
        stepCount={MAX_N}
        isDone={player.isDone}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.togglePlay}
        onNext={player.next}
      />
    </div>
  )
}

export default GrowthChartDemo

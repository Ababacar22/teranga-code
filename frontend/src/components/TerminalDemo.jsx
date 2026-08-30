import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const COMMANDS = [
  { cmd: 'ls -la', output: 'drwxr-xr-x  5 dev  staff   160 app/\n-rw-r--r--  1 dev  staff  1204 app.log' },
  { cmd: 'cd /var/log', output: '' },
  { cmd: 'grep -i "error" app.log | tail -20', output: '[10:42:03] ERROR Connexion à la base perdue\n[10:44:19] ERROR Timeout sur /api/users' },
  { cmd: 'chmod 644 fichier.txt', output: '' },
  { cmd: 'ps aux | grep node', output: 'dev   1842  0.3  1.2  node server.js' },
  { cmd: 'kill -9 1842', output: '' },
]

function TerminalDemo() {
  const player = useStepPlayer(COMMANDS.length, 1100)
  const visible = COMMANDS.slice(0, player.index + 1)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Rejoue la séquence de commandes, une par une.</p>

      <div className="terminal-demo">
        {visible.map((c, i) => (
          <div key={i} className="terminal-demo__line">
            <span className="terminal-demo__prompt">$</span> {c.cmd}
            {c.output && <pre className="terminal-demo__output">{c.output}</pre>}
          </div>
        ))}
      </div>

      <StepControls
        index={player.index}
        stepCount={COMMANDS.length}
        isDone={player.isDone}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.togglePlay}
        onNext={player.next}
      />
    </div>
  )
}

export default TerminalDemo

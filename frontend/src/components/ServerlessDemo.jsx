import { useState } from 'react'

function ServerlessDemo() {
  const [running, setRunning] = useState(false)
  const [calls, setCalls] = useState(0)

  function invoke() {
    setRunning(true)
    setCalls((c) => c + 1)
    setTimeout(() => setRunning(false), 700)
  }

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Appelle la fonction et regarde-la exister uniquement pendant son exécution.</p>

      <div className={`viz-demo__box ${running ? 'viz-demo__box--active' : ''}`}>
        {running ? '⚙️ Instance active...' : '💤 Aucune instance (rien ne tourne)'}
      </div>

      <button type="button" className="btn btn--small btn--primary" onClick={invoke} disabled={running}>
        ▶ Appeler la fonction
      </button>

      <p className="viz-demo__note">
        {running
          ? "Le fournisseur cloud vient de démarrer une instance pour traiter cet appel — facturée uniquement pour ce court instant."
          : calls > 0
            ? `${calls} appel${calls > 1 ? 's' : ''} traité${calls > 1 ? 's' : ''} — entre deux appels, aucune instance ne tourne (ni n'est facturée).`
            : 'Entre deux appels, la fonction n’existe littéralement plus en mémoire.'}
      </p>
    </div>
  )
}

export default ServerlessDemo

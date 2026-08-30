import { useState } from 'react'

function FailureIsolationDemo() {
  const [crashed, setCrashed] = useState(false)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Simule une panne du service de paiement, et compare l'impact.</p>

      <div className="failure-demo__systems">
        <div className="failure-demo__system">
          <strong>Monolithe</strong>
          <div className={`failure-demo__block ${crashed ? 'failure-demo__block--down' : ''}`}>
            <span>👤 Users</span>
            <span>📦 Orders</span>
            <span>💳 Payments</span>
          </div>
          <p className="failure-demo__status">{crashed ? '🔴 Toute l’application est en panne' : '🟢 Tout fonctionne'}</p>
        </div>

        <div className="failure-demo__system">
          <strong>Microservices</strong>
          <div className="failure-demo__services">
            <div className="viz-demo__box viz-demo__box--success">👤 Users</div>
            <div className="viz-demo__box viz-demo__box--success">📦 Orders</div>
            <div className={`viz-demo__box ${crashed ? 'viz-demo__box--danger' : 'viz-demo__box--success'}`}>💳 Payments</div>
          </div>
          <p className="failure-demo__status">
            {crashed ? '🟡 Payments est en panne, Users et Orders continuent de fonctionner' : '🟢 Tout fonctionne'}
          </p>
        </div>
      </div>

      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--danger" onClick={() => setCrashed(true)} disabled={crashed}>
          💥 Faire planter Payments
        </button>
        <button type="button" className="btn btn--small btn--secondary" onClick={() => setCrashed(false)} disabled={!crashed}>
          Réinitialiser
        </button>
      </div>
    </div>
  )
}

export default FailureIsolationDemo

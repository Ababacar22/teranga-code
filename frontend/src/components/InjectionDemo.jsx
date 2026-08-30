import { useState } from 'react'

const SAFE_EXAMPLE = 'aissatou@mail.com'
const PAYLOAD = "' OR '1'='1"

function InjectionDemo() {
  const [email, setEmail] = useState(SAFE_EXAMPLE)
  const compromised = email.includes("'")

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Modifie l'email envoyé par le client et regarde ce qui arrive aux deux requêtes.</p>

      <div className="injection-demo__input-row">
        <label htmlFor="injection-email">Email envoyé par le client :</label>
        <input
          id="injection-email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="injection-demo__input"
        />
        <button type="button" className="btn btn--small btn--danger" onClick={() => setEmail(PAYLOAD)}>
          Essayer une injection
        </button>
        <button type="button" className="btn btn--small btn--secondary" onClick={() => setEmail(SAFE_EXAMPLE)}>
          Réinitialiser
        </button>
      </div>

      <div className={`injection-demo__query ${compromised ? 'injection-demo__query--danger' : ''}`}>
        <strong>Requête vulnérable (concaténation)</strong>
        <code>{`SELECT * FROM users WHERE email = '${email}'`}</code>
        {compromised && <p className="injection-demo__warning">⚠️ La condition devient toujours vraie : TOUS les utilisateurs sont retournés.</p>}
      </div>

      <div className="injection-demo__query injection-demo__query--safe">
        <strong>Requête protégée (paramétrée)</strong>
        <code>{`prisma.user.findUnique({ where: { email: ${JSON.stringify(email)} } })`}</code>
        <p className="injection-demo__safe-note">✅ La valeur reste une simple donnée, jamais du code SQL — aucun utilisateur trouvé si l'email n'existe pas.</p>
      </div>
    </div>
  )
}

export default InjectionDemo

import { useState } from 'react'

const PARTS = [
  { key: 'major', label: 'MAJOR', desc: 'Changement incompatible : du code existant peut casser.', color: 'var(--sn-red)' },
  { key: 'minor', label: 'MINOR', desc: 'Nouvelle fonctionnalité, rétrocompatible.', color: 'var(--sn-yellow)' },
  { key: 'patch', label: 'PATCH', desc: 'Correctif de bug, rétrocompatible.', color: 'var(--sn-green)' },
]

const BASE_MAJOR = 5

function SemverDemo() {
  const [version, setVersion] = useState({ major: BASE_MAJOR, minor: 2, patch: 1 })
  const [hovered, setHovered] = useState(null)

  function bump(key) {
    setVersion((v) => {
      if (key === 'major') return { major: v.major + 1, minor: 0, patch: 0 }
      if (key === 'minor') return { ...v, minor: v.minor + 1, patch: 0 }
      return { ...v, patch: v.patch + 1 }
    })
  }

  const allowedByCaret = version.major === BASE_MAJOR

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">Survole une partie du numéro de version pour comprendre ce qu'elle signifie.</p>

      <div className="semver-demo__number">
        {PARTS.map((p, i) => (
          <span key={p.key}>
            <span
              className="semver-demo__part"
              style={{ color: p.color, borderColor: hovered === p.key ? p.color : 'transparent' }}
              onMouseEnter={() => setHovered(p.key)}
              onMouseLeave={() => setHovered(null)}
            >
              {version[p.key]}
            </span>
            {i < PARTS.length - 1 && '.'}
          </span>
        ))}
      </div>

      <p className="viz-demo__note">
        {hovered
          ? `${PARTS.find((p) => p.key === hovered).label} — ${PARTS.find((p) => p.key === hovered).desc}`
          : "^5.2.1 accepte automatiquement les mises à jour MINOR et PATCH, jamais MAJOR."}
      </p>

      <div className="viz-demo__controls">
        {PARTS.map((p) => (
          <button key={p.key} type="button" className="btn btn--small btn--secondary" onClick={() => bump(p.key)}>
            Bump {p.label}
          </button>
        ))}
      </div>

      <p className={`semver-demo__caret-note ${allowedByCaret ? 'semver-demo__caret-note--ok' : 'semver-demo__caret-note--blocked'}`}>
        {allowedByCaret
          ? `✅ ^5.2.1 accepterait automatiquement ${version.major}.${version.minor}.${version.patch}`
          : `❌ ^5.2.1 n'accepterait PAS ${version.major}.${version.minor}.${version.patch} — saut de version majeure`}
      </p>
    </div>
  )
}

export default SemverDemo

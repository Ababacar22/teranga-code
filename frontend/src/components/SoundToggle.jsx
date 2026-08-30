import { useAmbient } from '../lib/useAmbient'

function SoundToggle() {
  const { enabled, toggle } = useAmbient()

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Activer ou couper l’ambiance sonore">
      {enabled ? '🔊 Ambiance' : '🔈 Silence'}
    </button>
  )
}

export default SoundToggle

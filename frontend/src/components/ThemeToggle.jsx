import { useTheme } from '../lib/useTheme'

const CYCLE = ['system', 'light', 'dark']
const LABELS = { system: '🌗 Auto', light: '☀️ Clair', dark: '🌙 Sombre' }

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function next() {
    const i = CYCLE.indexOf(theme)
    setTheme(CYCLE[(i + 1) % CYCLE.length])
  }

  return (
    <button type="button" className="theme-toggle" onClick={next} aria-label="Changer de thème">
      {LABELS[theme]}
    </button>
  )
}

export default ThemeToggle

import { getLanguage, setLanguage } from '../lib/language'

const LABELS = { fr: '🇫🇷 FR', en: '🇬🇧 EN' }

function LanguageToggle() {
  const lang = getLanguage()

  function toggle() {
    setLanguage(lang === 'en' ? 'fr' : 'en')
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Change language / Changer de langue">
      {LABELS[lang]}
    </button>
  )
}

export default LanguageToggle

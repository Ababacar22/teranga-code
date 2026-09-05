const LANG_KEY = 'terangaLang'

export function getLanguage() {
  try {
    return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'fr'
  } catch {
    return 'fr'
  }
}

export function setLanguage(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang === 'en' ? 'en' : 'fr')
  } catch {
    // stockage indisponible (mode privé strict) — la langue restera celle par défaut
  }
  window.location.reload()
}

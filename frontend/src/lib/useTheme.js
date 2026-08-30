import { useEffect, useState } from 'react'

const STORAGE_KEY = 'teranga-theme'

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'system') delete root.dataset.theme
  else root.dataset.theme = theme
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'system'
    } catch {
      return 'system'
    }
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function setTheme(next) {
    setThemeState(next)
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // stockage indisponible (navigation privée...) — le thème reste actif pour la session
    }
  }

  return { theme, setTheme }
}

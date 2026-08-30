const CACHE_KEY = 'teranga-cached-user'

export function loadCachedUser() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY))
  } catch {
    return null
  }
}

export function saveCachedUser(user) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(user))
  } catch {
    // stockage indisponible — la session ne survivra pas à une coupure réseau au démarrage
  }
}

export function clearCachedUser() {
  try {
    localStorage.removeItem(CACHE_KEY)
  } catch {
    // ignore
  }
}

const GUEST_KEY = 'teranga-guest-user'

export function loadGuestUser() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_KEY))
  } catch {
    return null
  }
}

export function saveGuestUser(user) {
  try {
    localStorage.setItem(GUEST_KEY, JSON.stringify(user))
  } catch {
    // stockage indisponible — la partie reste jouable pour la session en cours
  }
}

export function clearGuestUser() {
  try {
    localStorage.removeItem(GUEST_KEY)
  } catch {
    // ignore
  }
}

export function createGuestUser() {
  return {
    id: 'guest',
    isGuest: true,
    pseudo: 'Invité',
    email: null,
    xp: 0,
    badges: [],
    missedQuestions: [],
    onboarded: false,
    streakCurrent: 0,
    streakLongest: 0,
    level: null,
    goal: null,
    focusAreas: [],
  }
}

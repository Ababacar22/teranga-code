// Miroir de backend/src/progress/weeklyGoal.js — dupliqué ici car le mode
// local/desktop (localClient.js) n'a pas de serveur pour calculer ces
// valeurs côté backend. Garder les deux fichiers synchronisés si la
// logique de l'objectif hebdomadaire change.
const LEVEL_TARGETS = { debutant: 100, intermediaire: 200, avance: 300 }
const DEFAULT_TARGET = 150
const INTERVIEW_BONUS = 100

export function getWeekStart(date = new Date()) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = d.getUTCDay()
  const diff = (day === 0 ? -6 : 1) - day
  d.setUTCDate(d.getUTCDate() + diff)
  return d.toISOString().slice(0, 10)
}

export function computeWeeklyTarget(level, goal) {
  const base = LEVEL_TARGETS[level] ?? DEFAULT_TARGET
  return goal === 'entretien' ? base + INTERVIEW_BONUS : base
}

export function currentWeeklyXp(user, now = new Date()) {
  return user.weekStart === getWeekStart(now) ? user.weeklyXp : 0
}

export function applyWeeklyXp(user, amount, now = new Date()) {
  const weekStart = getWeekStart(now)
  const weeklyXp = user.weekStart === weekStart ? (user.weeklyXp || 0) + amount : amount
  return { weekStart, weeklyXp }
}

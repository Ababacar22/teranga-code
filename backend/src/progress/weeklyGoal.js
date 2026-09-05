const LEVEL_TARGETS = { debutant: 100, intermediaire: 200, avance: 300 }
const DEFAULT_TARGET = 150
const INTERVIEW_BONUS = 100

// Lundi (UTC) de la semaine contenant `date`, au format YYYY-MM-DD.
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

// XP hebdomadaire à afficher : si la semaine stockée n'est plus la semaine
// en cours, l'XP affiché retombe à 0 sans qu'il soit nécessaire d'écrire
// en base (l'écriture réelle n'a lieu que lors d'un gain d'XP, voir
// applyWeeklyXp) — évite une écriture DB sur un simple GET.
export function currentWeeklyXp(user, now = new Date()) {
  return user.weekStart === getWeekStart(now) ? user.weeklyXp : 0
}

// Calcule les nouvelles valeurs {weekStart, weeklyXp} à persister quand un
// montant d'XP vient d'être gagné — réinitialise automatiquement le
// compteur si on a changé de semaine depuis la dernière écriture.
export function applyWeeklyXp(user, amount, now = new Date()) {
  const weekStart = getWeekStart(now)
  const weeklyXp = user.weekStart === weekStart ? user.weeklyXp + amount : amount
  return { weekStart, weeklyXp }
}

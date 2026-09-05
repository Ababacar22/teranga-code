const STORAGE_KEY = 'terangaDailyChallenge'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

// Hash simple et déterministe d'une chaîne vers un entier positif —
// garantit que tout le monde reçoit la MÊME question un jour donné.
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function getDailyQuestion(allTopics) {
  const pool = allTopics.flatMap((t) => t.quiz.map((q) => ({ ...q, topicId: t.id, topicTitle: t.title, badgeEmoji: t.badge.emoji })))
  if (pool.length === 0) return null
  const index = hashString(todayStr()) % pool.length
  return pool[index]
}

function readState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function getTodayResult() {
  const state = readState()
  return state.date === todayStr() ? state.correct : null
}

export function recordTodayResult(correct) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayStr(), correct }))
}

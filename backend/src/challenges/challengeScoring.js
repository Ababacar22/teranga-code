// Logique pure de soumission de score pour un défi, isolée de Prisma/Express
// pour être testable sans base de données.
export function computeScoreSubmission({ challenge, userId, score }) {
  const isFromUser = challenge.fromUserId === userId
  const isToUser = challenge.toUserId === userId

  if (!isFromUser && !isToUser) {
    return { error: { status: 403, message: "Ce défi ne t'appartient pas." } }
  }

  const alreadySubmitted = isFromUser ? challenge.fromScore !== null : challenge.toScore !== null
  if (alreadySubmitted) {
    return { error: { status: 409, message: 'Score déjà soumis pour ce défi.' } }
  }

  const data = isFromUser ? { fromScore: score } : { toScore: score }
  const bothDone = (isFromUser ? true : challenge.fromScore !== null) && (isToUser ? true : challenge.toScore !== null)

  return { data, status: bothDone ? 'completed' : 'pending' }
}

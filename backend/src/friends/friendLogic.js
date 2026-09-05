// Extrait les ids des amis ACCEPTÉS d'un utilisateur à partir d'une liste
// de lignes Friendship (les deux sens de la relation sont représentés par
// une seule ligne, requester <-> addressee).
export function getFriendIds(friendships, userId) {
  return friendships
    .filter((f) => f.status === 'accepted')
    .map((f) => (f.requesterId === userId ? f.addresseeId : f.addresseeId === userId ? f.requesterId : null))
    .filter(Boolean)
}

// Détermine si une demande d'ami est valide avant de la créer.
export function validateFriendRequest({ requesterId, addressee, existing }) {
  if (!addressee) return { error: 'Aucun joueur avec ce pseudo.' }
  if (addressee.id === requesterId) return { error: 'Impossible de t’ajouter toi-même.' }
  if (existing) {
    return existing.status === 'accepted'
      ? { error: 'Vous êtes déjà amis.' }
      : { error: 'Une demande est déjà en attente entre vous.' }
  }
  return { ok: true }
}

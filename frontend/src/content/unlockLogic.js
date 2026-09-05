// Logique de déblocage/indexation partagée entre les jeux de contenu FR et
// EN — dépend uniquement du tableau `villes` passé en paramètre, pour ne
// jamais dupliquer cette logique par langue.
const UNLOCK_THRESHOLD = 2

export function createContentHelpers(villes, requirementLabel) {
  function orderedVilles(focusAreas = []) {
    const technical = villes.filter((v) => v.topics)
    const dakar = technical.find((v) => v.id === 'dakar')
    const others = technical.filter((v) => v.id !== 'dakar')
    const prioritized = (focusAreas ?? []).map((id) => others.find((v) => v.id === id)).filter(Boolean)
    const rest = others.filter((v) => !prioritized.includes(v))
    return dakar ? [dakar, ...prioritized, ...rest] : [...prioritized, ...rest]
  }

  function getUnlockInfo(villeId, badges, focusAreas = []) {
    if (villeId === 'goree') return { unlocked: true }

    const chain = orderedVilles(focusAreas)
    const chainIndex = chain.findIndex((v) => v.id === villeId)
    if (chainIndex <= 0) return { unlocked: true }

    const previousVille = chain[chainIndex - 1]
    const earnedInPrevious = previousVille.topics.filter((t) => badges.includes(t.badge.id)).length

    return {
      unlocked: earnedInPrevious >= UNLOCK_THRESHOLD,
      requirement: requirementLabel(UNLOCK_THRESHOLD, previousVille.name),
      progress: earnedInPrevious,
      threshold: UNLOCK_THRESHOLD,
    }
  }

  const topicsById = {}
  for (const ville of villes) {
    for (const topic of ville.topics ?? []) {
      topicsById[topic.id] = { ...topic, villeId: ville.id, villeName: ville.name }
    }
  }

  function getVille(villeId) {
    return villes.find((v) => v.id === villeId)
  }

  function getTopic(topicId) {
    return topicsById[topicId]
  }

  function getAllTopics() {
    return Object.values(topicsById)
  }

  return { orderedVilles, getUnlockInfo, getVille, getTopic, getAllTopics }
}

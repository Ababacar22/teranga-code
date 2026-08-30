import { getUnlockInfo, orderedVilles } from '../content'

export function getFullPath(user) {
  const badges = user?.badges ?? []
  const focusAreas = user?.focusAreas ?? []
  const path = []
  let nextAssigned = false

  for (const ville of orderedVilles(focusAreas)) {
    const unlockInfo = getUnlockInfo(ville.id, badges, focusAreas)
    for (const topic of ville.topics) {
      const done = badges.includes(topic.badge.id)
      let status = 'upcoming'
      if (!unlockInfo.unlocked) status = 'locked'
      else if (done) status = 'done'
      else if (!nextAssigned) {
        status = 'next'
        nextAssigned = true
      }
      path.push({ villeId: ville.id, villeName: ville.name, topicId: topic.id, title: topic.title, status })
    }
  }

  return path
}

export function getRecommendedNext(user) {
  return getFullPath(user).find((step) => step.status === 'next') ?? null
}

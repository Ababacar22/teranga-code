// Liste blanche des badges réellement attribuables et de leur plafond d'XP
// par attribution. Extraite du contenu frontend (frontend/src/content/topics/*.json
// + le badge de la simulation d'entretien). À tenir à jour si un sujet est
// ajouté/retiré — le script `validate:content` pourra un jour la générer
// automatiquement pour éviter la dérive.

const TOPIC_BADGE_IDS = [
  'badge-singleton',
  'badge-factory',
  'badge-observer',
  'badge-strategy',
  'badge-adapter',
  'badge-decorator',
  'badge-builder',
  'badge-git',
  'badge-docker',
  'badge-cicd',
  'badge-linux',
  'badge-deps',
  'badge-bigo',
  'badge-structures',
  'badge-graphes',
  'badge-tri',
  'badge-rest',
  'badge-db',
  'badge-archi',
  'badge-scale',
  'badge-owasp',
  'badge-clean',
  'badge-tests',
  'badge-review',
  'badge-encapsulation',
  'badge-heritage',
  'badge-composition',
  'badge-fp',
]

const MAX_XP_PER_BADGE = {
  // 5 questions à 20 XP max chacune pour un sujet.
  topic: 100,
  // 19 questions à 10 XP max chacune pour la simulation d'entretien.
  'badge-interview': 190,
}

export const VALID_BADGE_IDS = new Set([...TOPIC_BADGE_IDS, 'badge-interview'])

export function maxXpForBadge(badgeId) {
  return MAX_XP_PER_BADGE[badgeId] ?? MAX_XP_PER_BADGE.topic
}

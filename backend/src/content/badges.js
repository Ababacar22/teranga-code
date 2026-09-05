// Liste blanche des badges réellement attribuables et de leur plafond d'XP
// par attribution. Doit correspondre exactement aux `badge.id` des 55 sujets
// de `frontend/src/content/topics/*.json` — vérifiable avec :
//   node -e "const fs=require('fs');fs.readdirSync('frontend/src/content/topics').forEach(f=>JSON.parse(fs.readFileSync('frontend/src/content/topics/'+f)).forEach(t=>console.log(t.badge.id)))" | sort

const TOPIC_BADGE_IDS = [
  // designPatterns.json
  'badge-singleton',
  'badge-factory',
  'badge-observer',
  'badge-strategy',
  'badge-adapter',
  'badge-decorator',
  'badge-builder',
  // outils.json
  'badge-git',
  'badge-docker',
  'badge-cicd',
  'badge-linux',
  'badge-deps',
  // algorithmie.json
  'badge-bigo',
  'badge-structures',
  'badge-graphes',
  'badge-tri',
  // architecture.json
  'badge-rest',
  'badge-db',
  'badge-archi',
  'badge-scale',
  // qualiteSecurite.json
  'badge-owasp',
  'badge-clean',
  'badge-tests',
  'badge-review',
  // poo.json
  'badge-encapsulation',
  'badge-heritage',
  'badge-composition',
  'badge-fp',
  // frameworksEcosysteme.json
  'badge-framework-lib',
  'badge-frontend-frameworks',
  'badge-runtimes',
  'badge-bundlers',
  // webReseaux.json
  'badge-http',
  'badge-dns',
  'badge-tls',
  'badge-websocket',
  // cloudDistribue.json
  'badge-load-balancing',
  'badge-message-queues',
  'badge-cap',
  'badge-serverless',
  // architectureSI.json
  'badge-cache-strategies',
  'badge-lb-algo',
  'badge-orchestration',
  'badge-db-types',
  'badge-patterns-si',
  // systemDesign.json
  'badge-system-design-fond',
  'badge-url-shortener',
  'badge-news-feed',
  'badge-tradeoffs-scale',
  'badge-scale-evolution',
  'badge-rate-limiter',
  'badge-consistent-hashing',
  // carriereInternationale.json
  'badge-star-method',
  'badge-technical-english',
  'badge-hiring-process',
  // fintech.json
  'badge-idempotence',
  'badge-payment-gateway',
  'badge-fraud-detection',
  // iaMachineLearning.json
  'badge-ml-fond',
  'badge-neural-networks',
  'badge-generative-ai',
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

// Validateur JSON Schema minimal (sous-ensemble utilisé par topic.schema.json),
// volontairement sans dépendance externe pour rester léger.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const topicsDir = join(__dirname, '../src/content/topics')
const topicsEnDir = join(__dirname, '../src/content/topics-en')
const schemaPath = join(__dirname, '../src/content/schema/topic.schema.json')
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'))

function validate(value, node, path, errors) {
  if (node.type === 'object') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      errors.push(`${path}: attendu un objet`)
      return
    }
    for (const key of node.required ?? []) {
      if (!(key in value)) errors.push(`${path}: champ requis manquant "${key}"`)
    }
    for (const [key, subNode] of Object.entries(node.properties ?? {})) {
      if (key in value) validate(value[key], subNode, `${path}.${key}`, errors)
    }
  } else if (node.type === 'array') {
    if (!Array.isArray(value)) {
      errors.push(`${path}: attendu un tableau`)
      return
    }
    if (node.minItems && value.length < node.minItems) {
      errors.push(`${path}: attendu au moins ${node.minItems} élément(s), trouvé ${value.length}`)
    }
    value.forEach((item, i) => validate(item, node.items, `${path}[${i}]`, errors))
  } else if (node.type === 'string') {
    if (typeof value !== 'string') {
      errors.push(`${path}: attendu une chaîne`)
      return
    }
    if (node.minLength && value.length < node.minLength) errors.push(`${path}: chaîne vide non autorisée`)
    if (node.pattern && !new RegExp(node.pattern).test(value)) {
      errors.push(`${path}: ne respecte pas le format attendu (${node.pattern})`)
    }
    if (node.enum && !node.enum.includes(value)) {
      errors.push(`${path}: valeur "${value}" hors de l'ensemble autorisé [${node.enum.join(', ')}]`)
    }
  } else if (node.type === 'integer') {
    if (!Number.isInteger(value)) {
      errors.push(`${path}: attendu un entier`)
      return
    }
    if (node.minimum !== undefined && value < node.minimum) errors.push(`${path}: doit être >= ${node.minimum}`)
  }
}

let totalErrors = 0
let totalTopics = 0

for (const file of readdirSync(topicsDir).filter((f) => f.endsWith('.json'))) {
  const topics = JSON.parse(readFileSync(join(topicsDir, file), 'utf-8'))
  for (const topic of topics) {
    totalTopics++
    const errors = []
    validate(topic, schema, `${file}#${topic.id ?? '?'}`, errors)
    if (errors.length > 0) {
      totalErrors += errors.length
      console.error(`✗ ${file} — sujet "${topic.id ?? '?'}"`)
      errors.forEach((e) => console.error(`  - ${e}`))
    }
  }
}

// Contenu anglais (topics-en/) : mêmes règles de schéma, plus une parité
// stricte des `id` avec le fichier français correspondant — un sujet
// ajouté en français sans son équivalent anglais laisserait la version EN
// du jeu incomplète silencieusement.
let totalTopicsEn = 0
for (const file of readdirSync(topicsDir).filter((f) => f.endsWith('.json'))) {
  const topicsFr = JSON.parse(readFileSync(join(topicsDir, file), 'utf-8'))
  const enPath = join(topicsEnDir, file)
  let topicsEn
  try {
    topicsEn = JSON.parse(readFileSync(enPath, 'utf-8'))
  } catch {
    totalErrors++
    console.error(`✗ topics-en/${file} — fichier manquant ou JSON invalide (traduction anglaise absente)`)
    continue
  }

  const frIds = topicsFr.map((t) => t.id).sort()
  const enIds = topicsEn.map((t) => t.id).sort()
  if (JSON.stringify(frIds) !== JSON.stringify(enIds)) {
    totalErrors++
    console.error(`✗ topics-en/${file} — les sujets ne correspondent pas à la version française (FR: ${frIds.join(', ')} / EN: ${enIds.join(', ')})`)
  }

  for (const topic of topicsEn) {
    totalTopicsEn++
    const errors = []
    validate(topic, schema, `topics-en/${file}#${topic.id ?? '?'}`, errors)
    if (errors.length > 0) {
      totalErrors += errors.length
      console.error(`✗ topics-en/${file} — sujet "${topic.id ?? '?'}"`)
      errors.forEach((e) => console.error(`  - ${e}`))
    }
  }
}

// Vérifie que la liste blanche de badges du backend (utilisée pour valider
// /progress/complete-topic) reste synchronisée avec les sujets réels — un
// sujet ajouté ici sans y être ajouté empêche silencieusement tout compte
// réel (non invité) de recevoir XP/badge pour ce sujet.
const badgesPath = join(__dirname, '../../backend/src/content/badges.js')
const badgesSource = readFileSync(badgesPath, 'utf-8')
const validBadgeIds = new Set(
  [...badgesSource.matchAll(/'(badge-[a-z0-9-]+)'/g)].map((m) => m[1]),
)

for (const file of readdirSync(topicsDir).filter((f) => f.endsWith('.json'))) {
  const topics = JSON.parse(readFileSync(join(topicsDir, file), 'utf-8'))
  for (const topic of topics) {
    if (topic.badge?.id && !validBadgeIds.has(topic.badge.id)) {
      totalErrors++
      console.error(`✗ ${file} — sujet "${topic.id}" : badge "${topic.badge.id}" absent de backend/src/content/badges.js`)
      console.error(`  → un compte réel ne recevra jamais d'XP/badge pour ce sujet tant que ce n'est pas corrigé.`)
    }
  }
}

if (totalErrors > 0) {
  console.error(`\n${totalErrors} erreur(s) sur ${totalTopics} sujets (FR) + ${totalTopicsEn} sujets (EN).`)
  process.exit(1)
}

console.log(`✔ ${totalTopics} sujets valides (FR) + ${totalTopicsEn} sujets valides (EN).`)

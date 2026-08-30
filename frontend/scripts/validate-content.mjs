// Validateur JSON Schema minimal (sous-ensemble utilisé par topic.schema.json),
// volontairement sans dépendance externe pour rester léger.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const topicsDir = join(__dirname, '../src/content/topics')
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

if (totalErrors > 0) {
  console.error(`\n${totalErrors} erreur(s) sur ${totalTopics} sujets.`)
  process.exit(1)
}

console.log(`✔ ${totalTopics} sujets valides.`)

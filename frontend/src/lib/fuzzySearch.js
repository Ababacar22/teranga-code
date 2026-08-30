function normalize(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function subsequenceScore(query, text) {
  let qi = 0
  let firstIndex = -1
  let lastIndex = -1
  for (let i = 0; i < text.length && qi < query.length; i++) {
    if (text[i] === query[qi]) {
      if (firstIndex === -1) firstIndex = i
      lastIndex = i
      qi++
    }
  }
  if (qi < query.length) return 0
  const span = lastIndex - firstIndex + 1
  return query.length / span
}

export function fuzzyScore(query, text) {
  const q = normalize(query)
  const t = normalize(text)
  if (!q || !t) return 0
  if (t === q) return 100
  if (t.startsWith(q)) return 80
  const idx = t.indexOf(q)
  if (idx !== -1) return Math.max(60 - idx * 0.1, 45)
  const words = t.split(/\s+/)
  if (words.some((w) => w.startsWith(q))) return 40
  const sub = subsequenceScore(q, t)
  return sub > 0.3 ? sub * 20 : 0
}

/**
 * items: liste d'objets à rechercher
 * query: texte tapé par l'utilisateur
 * getFields: (item) => [{ text, weight }] — champs à comparer, pondérés
 * Retourne les items dont au moins un champ matche, triés par pertinence décroissante.
 */
export function fuzzySearch(items, query, getFields) {
  const q = query.trim()
  if (!q) return items

  const scored = items
    .map((item) => {
      const fields = getFields(item)
      const score = Math.max(0, ...fields.map(({ text, weight = 1 }) => fuzzyScore(q, text || '') * weight))
      return { item, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.map((r) => r.item)
}

export function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Mélange les options d'une question sans muter l'objet original, et
 * recalcule l'index de la bonne réponse dans le nouvel ordre.
 */
export function shuffleOptions(options, correctIndex) {
  const indexed = shuffleArray(options.map((text, originalIndex) => ({ text, originalIndex })))
  const newCorrectIndex = indexed.findIndex((o) => o.originalIndex === correctIndex)
  return { options: indexed.map((o) => o.text), correctIndex: newCorrectIndex }
}

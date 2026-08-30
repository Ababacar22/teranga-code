export const DIFFICULTY_LEVELS = {
  facile: {
    label: 'Facile',
    description: 'Questions de base, plus de temps pour réfléchir.',
    tags: ['facile', 'moyen'],
    time: 40,
  },
  moyen: {
    label: 'Moyen',
    description: "L'ensemble des questions du sujet, temps standard.",
    tags: ['facile', 'moyen', 'difficile'],
    time: 30,
  },
  difficile: {
    label: 'Difficile',
    description: 'Questions les plus poussées, chrono serré.',
    tags: ['moyen', 'difficile'],
    time: 20,
  },
}

import { shuffleArray, shuffleOptions } from './shuffle'

export function filterQuizByDifficulty(quiz, level) {
  const tags = DIFFICULTY_LEVELS[level]?.tags
  const filtered = tags ? quiz.filter((q) => tags.includes(q.difficulty)) : quiz
  const base = filtered.length > 0 ? filtered : quiz
  return shuffleArray(base).map((q) => {
    const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex)
    return { ...q, options, correctIndex }
  })
}

export function suggestDifficultyFromLevel(userLevel) {
  if (userLevel === 'debutant') return 'facile'
  if (userLevel === 'avance') return 'difficile'
  return 'moyen'
}

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getWeekStart, computeWeeklyTarget, currentWeeklyXp, applyWeeklyXp } from './weeklyGoal.js'

test('getWeekStart renvoie le lundi de la semaine (UTC)', () => {
  // Mercredi 2026-09-02 -> lundi 2026-08-31
  assert.equal(getWeekStart(new Date('2026-09-02T10:00:00Z')), '2026-08-31')
  // Dimanche 2026-09-06 -> lundi 2026-08-31 (même semaine)
  assert.equal(getWeekStart(new Date('2026-09-06T23:59:00Z')), '2026-08-31')
  // Lundi lui-même -> lui-même
  assert.equal(getWeekStart(new Date('2026-08-31T00:00:00Z')), '2026-08-31')
})

test('computeWeeklyTarget varie selon le niveau', () => {
  assert.equal(computeWeeklyTarget('debutant', 'apprentissage'), 100)
  assert.equal(computeWeeklyTarget('intermediaire', 'apprentissage'), 200)
  assert.equal(computeWeeklyTarget('avance', 'apprentissage'), 300)
  assert.equal(computeWeeklyTarget(null, null), 150)
})

test('computeWeeklyTarget ajoute un bonus pour un objectif entretien', () => {
  assert.equal(computeWeeklyTarget('debutant', 'entretien'), 200)
  assert.equal(computeWeeklyTarget('avance', 'entretien'), 400)
})

test('currentWeeklyXp retombe à 0 si la semaine stockée est dépassée', () => {
  const now = new Date('2026-09-02T10:00:00Z')
  const user = { weekStart: '2026-08-24', weeklyXp: 80 } // semaine précédente
  assert.equal(currentWeeklyXp(user, now), 0)
})

test('currentWeeklyXp renvoie la valeur stockée si toujours dans la semaine en cours', () => {
  const now = new Date('2026-09-02T10:00:00Z')
  const user = { weekStart: '2026-08-31', weeklyXp: 80 }
  assert.equal(currentWeeklyXp(user, now), 80)
})

test('applyWeeklyXp cumule dans la même semaine', () => {
  const now = new Date('2026-09-02T10:00:00Z')
  const user = { weekStart: '2026-08-31', weeklyXp: 50 }
  const result = applyWeeklyXp(user, 20, now)
  assert.deepEqual(result, { weekStart: '2026-08-31', weeklyXp: 70 })
})

test('applyWeeklyXp repart de zéro (plus le nouveau gain) au changement de semaine', () => {
  const now = new Date('2026-09-02T10:00:00Z')
  const user = { weekStart: '2026-08-17', weeklyXp: 999 } // vieille semaine
  const result = applyWeeklyXp(user, 30, now)
  assert.deepEqual(result, { weekStart: '2026-08-31', weeklyXp: 30 })
})

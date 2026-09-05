import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeScoreSubmission } from './challengeScoring.js'

const baseChallenge = { fromUserId: 'u1', toUserId: 'u2', fromScore: null, toScore: null }

test("refuse un utilisateur étranger au défi", () => {
  const result = computeScoreSubmission({ challenge: baseChallenge, userId: 'u3', score: 10 })
  assert.equal(result.error.status, 403)
})

test('accepte le premier score du challenger et laisse le défi en attente', () => {
  const result = computeScoreSubmission({ challenge: baseChallenge, userId: 'u1', score: 8 })
  assert.deepEqual(result.data, { fromScore: 8 })
  assert.equal(result.status, 'pending')
  assert.equal(result.error, undefined)
})

test('complète le défi quand le second joueur soumet son score', () => {
  const challenge = { ...baseChallenge, fromScore: 8 }
  const result = computeScoreSubmission({ challenge, userId: 'u2', score: 9 })
  assert.deepEqual(result.data, { toScore: 9 })
  assert.equal(result.status, 'completed')
})

test('refuse une seconde soumission du même joueur (anti double-score)', () => {
  const challenge = { ...baseChallenge, fromScore: 8 }
  const result = computeScoreSubmission({ challenge, userId: 'u1', score: 10 })
  assert.equal(result.error.status, 409)
})

test('le destinataire peut soumettre même si le challenger ne l’a pas encore fait', () => {
  const result = computeScoreSubmission({ challenge: baseChallenge, userId: 'u2', score: 7 })
  assert.deepEqual(result.data, { toScore: 7 })
  assert.equal(result.status, 'pending')
})

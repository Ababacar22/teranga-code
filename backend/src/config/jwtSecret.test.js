import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isValidJwtSecret } from './jwtSecret.js'

test('rejette un secret manquant', () => {
  assert.equal(isValidJwtSecret(undefined), false)
  assert.equal(isValidJwtSecret(''), false)
})

test('rejette un secret trop court', () => {
  assert.equal(isValidJwtSecret('a'.repeat(31)), false)
})

test('accepte un secret de 32 caractères ou plus', () => {
  assert.equal(isValidJwtSecret('a'.repeat(32)), true)
  assert.equal(isValidJwtSecret('a'.repeat(64)), true)
})

test('rejette les valeurs par défaut connues, même longues', () => {
  assert.equal(isValidJwtSecret('dev_secret_change_me_in_production'), false)
  assert.equal(isValidJwtSecret('changeme'), false)
})

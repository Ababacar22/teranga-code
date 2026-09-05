import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getFriendIds, validateFriendRequest } from './friendLogic.js'

test('getFriendIds ne retient que les amitiés acceptées', () => {
  const friendships = [
    { requesterId: 'u1', addresseeId: 'u2', status: 'accepted' },
    { requesterId: 'u3', addresseeId: 'u1', status: 'pending' },
  ]
  assert.deepEqual(getFriendIds(friendships, 'u1'), ['u2'])
})

test('getFriendIds fonctionne dans les deux sens de la relation', () => {
  const friendships = [
    { requesterId: 'u2', addresseeId: 'u1', status: 'accepted' }, // u1 est l'addressee ici
  ]
  assert.deepEqual(getFriendIds(friendships, 'u1'), ['u2'])
})

test('getFriendIds ignore les amitiés qui ne concernent pas l’utilisateur', () => {
  const friendships = [{ requesterId: 'u5', addresseeId: 'u6', status: 'accepted' }]
  assert.deepEqual(getFriendIds(friendships, 'u1'), [])
})

test('validateFriendRequest refuse un pseudo introuvable', () => {
  const result = validateFriendRequest({ requesterId: 'u1', addressee: null, existing: null })
  assert.ok(result.error)
})

test('validateFriendRequest refuse de s’ajouter soi-même', () => {
  const result = validateFriendRequest({ requesterId: 'u1', addressee: { id: 'u1' }, existing: null })
  assert.ok(result.error)
})

test('validateFriendRequest refuse une demande déjà en attente', () => {
  const result = validateFriendRequest({
    requesterId: 'u1',
    addressee: { id: 'u2' },
    existing: { status: 'pending' },
  })
  assert.ok(result.error)
})

test('validateFriendRequest refuse si déjà amis', () => {
  const result = validateFriendRequest({
    requesterId: 'u1',
    addressee: { id: 'u2' },
    existing: { status: 'accepted' },
  })
  assert.ok(result.error)
})

test('validateFriendRequest accepte une demande valide', () => {
  const result = validateFriendRequest({ requesterId: 'u1', addressee: { id: 'u2' }, existing: null })
  assert.equal(result.ok, true)
})

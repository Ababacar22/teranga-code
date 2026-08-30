import { localApi } from './localClient'
import { isDesktopApp } from '../lib/platform'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const TOKEN_KEY = 'terangaCodeToken'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export class NetworkError extends Error {}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new NetworkError('Pas de connexion réseau.')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || 'Une erreur est survenue.')
  }

  return data
}

const remoteApi = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  getProgress: () => request('/progress', { auth: true }),
  addXp: (amount) => request('/progress/xp', { method: 'POST', body: { amount }, auth: true }),
  addBadge: (badgeId) => request('/progress/badge', { method: 'POST', body: { badgeId }, auth: true }),
  completeTopic: (badgeId, xp, perfect) =>
    request('/progress/complete-topic', { method: 'POST', body: { badgeId, xp, perfect }, auth: true }),
  markOnboarded: () => request('/progress/onboarded', { method: 'POST', auth: true }),
  setMissed: (key, missed) => request('/progress/missed', { method: 'POST', body: { key, missed }, auth: true }),
  getLeaderboard: () => request('/leaderboard', { auth: true }),
  ping: () => request('/progress/ping', { method: 'POST', auth: true }),
  setWizard: (payload) => request('/progress/wizard', { method: 'POST', body: payload, auth: true }),
  createChallenge: (payload) => request('/challenges', { method: 'POST', body: payload, auth: true }),
  getChallenges: () => request('/challenges', { auth: true }),
  completeChallenge: (id, score) => request(`/challenges/${id}/complete`, { method: 'POST', body: { score }, auth: true }),
  getAdminUsers: () => request('/admin/users', { auth: true }),
  resetAdminUser: (id) => request(`/admin/users/${id}/reset`, { method: 'POST', auth: true }),
  deleteAdminUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE', auth: true }),
}

export const api = isDesktopApp ? localApi : remoteApi

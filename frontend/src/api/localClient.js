const USERS_KEY = 'terangaLocalUsers'
const SESSION_KEY = 'terangaLocalSession'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function findByEmailOrPseudo(users, email, pseudo) {
  return Object.values(users).find((u) => u.email === email || u.pseudo === pseudo)
}

async function hashPassword(password, salt) {
  const enc = new TextEncoder()
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(`${salt}:${password}`))
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function randomSalt() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    pseudo: user.pseudo,
    xp: user.xp,
    badges: user.badges,
    onboarded: user.onboarded,
    missedQuestions: user.missedQuestions,
    streakCurrent: user.streakCurrent,
    streakLongest: user.streakLongest,
    level: user.level,
    goal: user.goal,
    focusAreas: user.focusAreas,
    role: user.role,
  }
}

function currentUser() {
  const email = localStorage.getItem(SESSION_KEY)
  if (!email) throw new Error('Session locale introuvable.')
  const users = readUsers()
  const user = users[email]
  if (!user) throw new Error('Utilisateur local introuvable.')
  return { users, user }
}

function saveCurrent(users, user) {
  users[user.email] = user
  writeUsers(users)
  return user
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayStr() {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

export const localApi = {
  async register({ email, pseudo, password }) {
    if (!email || !pseudo || !password || password.length < 6) {
      throw new Error('Email, pseudo et mot de passe (6+ caractères) requis.')
    }
    const users = readUsers()
    if (findByEmailOrPseudo(users, email, pseudo)) {
      throw new Error('Email ou pseudo déjà utilisé.')
    }
    const salt = randomSalt()
    const passwordHash = await hashPassword(password, salt)
    const user = {
      id: crypto.randomUUID(),
      email,
      pseudo,
      passwordHash,
      salt,
      xp: 0,
      badges: [],
      onboarded: false,
      missedQuestions: [],
      streakCurrent: 0,
      streakLongest: 0,
      lastActiveDate: null,
      level: null,
      goal: null,
      focusAreas: [],
      role: 'user',
    }
    saveCurrent(users, user)
    localStorage.setItem(SESSION_KEY, email)
    return { token: `local:${user.id}`, user: toPublicUser(user) }
  },

  async login({ email, password }) {
    if (!email || !password) throw new Error('Email et mot de passe requis.')
    const users = readUsers()
    const user = users[email]
    if (!user) throw new Error('Identifiants invalides.')
    const attemptHash = await hashPassword(password, user.salt)
    if (attemptHash !== user.passwordHash) throw new Error('Identifiants invalides.')
    localStorage.setItem(SESSION_KEY, email)
    return { token: `local:${user.id}`, user: toPublicUser(user) }
  },

  async getProgress() {
    const { user } = currentUser()
    return toPublicUser(user)
  },

  async addXp(amount) {
    const { users, user } = currentUser()
    user.xp += amount
    saveCurrent(users, user)
    return toPublicUser(user)
  },

  async addBadge(badgeId) {
    const { users, user } = currentUser()
    if (!user.badges.includes(badgeId)) user.badges = [...user.badges, badgeId]
    saveCurrent(users, user)
    return toPublicUser(user)
  },

  async completeTopic(badgeId, xp, perfect) {
    const { users, user } = currentUser()
    if (user.badges.includes(badgeId)) return toPublicUser(user)
    user.xp += Number(xp) || 0
    if (perfect) user.badges = [...user.badges, badgeId]
    saveCurrent(users, user)
    return toPublicUser(user)
  },

  async markOnboarded() {
    const { users, user } = currentUser()
    user.onboarded = true
    saveCurrent(users, user)
    return toPublicUser(user)
  },

  async setMissed(key, missed) {
    const { users, user } = currentUser()
    const already = user.missedQuestions.includes(key)
    if (missed && !already) user.missedQuestions = [...user.missedQuestions, key]
    else if (!missed && already) user.missedQuestions = user.missedQuestions.filter((k) => k !== key)
    saveCurrent(users, user)
    return toPublicUser(user)
  },

  async getLeaderboard() {
    const { user } = currentUser()
    return {
      entries: [{ id: user.id, pseudo: user.pseudo, xp: user.xp, badgesCount: user.badges.length }],
      currentUserId: user.id,
    }
  },

  async ping() {
    const { users, user } = currentUser()
    const today = todayStr()
    if (user.lastActiveDate !== today) {
      user.streakCurrent = user.lastActiveDate === yesterdayStr() ? user.streakCurrent + 1 : 1
      user.streakLongest = Math.max(user.streakLongest, user.streakCurrent)
      user.lastActiveDate = today
    }
    saveCurrent(users, user)
    return toPublicUser(user)
  },

  async setWizard({ level, goal, focusAreas }) {
    const { users, user } = currentUser()
    user.level = level ?? null
    user.goal = goal ?? null
    user.focusAreas = Array.isArray(focusAreas) ? focusAreas : []
    saveCurrent(users, user)
    return toPublicUser(user)
  },

  async createChallenge() {
    throw new Error('Les défis entre joueurs nécessitent plusieurs comptes en ligne — indisponibles en mode local.')
  },

  async getChallenges() {
    return []
  },

  async completeChallenge() {
    throw new Error('Les défis entre joueurs nécessitent plusieurs comptes en ligne — indisponibles en mode local.')
  },

  async getAdminUsers() {
    return []
  },

  async resetAdminUser() {
    throw new Error("Le panel d'administration nécessite un serveur en ligne — indisponible en mode local.")
  },

  async deleteAdminUser() {
    throw new Error("Le panel d'administration nécessite un serveur en ligne — indisponible en mode local.")
  },
}

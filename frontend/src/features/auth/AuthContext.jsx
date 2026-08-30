import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { api, getToken, setToken, NetworkError } from '../../api/client'
import { loadCachedUser, saveCachedUser, clearCachedUser } from '../../lib/cachedUser'
import { createGuestUser, loadGuestUser, saveGuestUser, clearGuestUser } from '../../lib/guestStorage'
import { readQueue, removeFromQueue } from '../../lib/offlineQueue'

const REPLAY_HANDLERS = {
  addXp: (p) => api.addXp(p.amount),
  addBadge: (p) => api.addBadge(p.badgeId),
  completeTopic: (p) => api.completeTopic(p.badgeId, p.xp, p.perfect),
  markOnboarded: () => api.markOnboarded(),
  setMissed: (p) => api.setMissed(p.key, p.missed),
  setWizard: (p) => api.setWizard(p),
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => loadGuestUser() || loadCachedUser())
  const [ready, setReady] = useState(false)
  const [offline, setOffline] = useState(false)
  const userRef = useRef(user)

  useEffect(() => {
    userRef.current = user
  }, [user])

  function persist(next) {
    if (next?.isGuest) saveGuestUser(next)
    else if (next) saveCachedUser(next)
    return next
  }

  function updateUser(updater) {
    setUserState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      return persist(next)
    })
  }

  async function flushQueue() {
    if (!getToken() || userRef.current?.isGuest) return
    for (const action of readQueue()) {
      const handler = REPLAY_HANDLERS[action.type]
      if (!handler) {
        removeFromQueue(action.id)
        continue
      }
      try {
        const progress = await handler(action.payload)
        removeFromQueue(action.id)
        if (progress) updateUser((prev) => ({ ...prev, ...progress }))
      } catch (err) {
        if (err instanceof NetworkError) return // toujours hors-ligne, on réessaiera plus tard
        removeFromQueue(action.id) // action invalide côté serveur, inutile de la rejouer indéfiniment
      }
    }
    setOffline(false)
  }

  useEffect(() => {
    if (user?.isGuest) {
      setReady(true)
      return
    }
    const token = getToken()
    if (!token) {
      setReady(true)
      return
    }
    api
      .getProgress()
      .then((progress) => {
        updateUser((prev) => ({ ...(prev || {}), ...progress }))
        setOffline(false)
      })
      .catch((err) => {
        if (err instanceof NetworkError) {
          // hors-ligne : on garde la session en cache plutôt que de déconnecter
          setOffline(true)
        } else {
          setToken(null)
          clearCachedUser()
          setUserState(null)
        }
      })
      .finally(() => setReady(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function handleOnline() {
      flushQueue()
    }
    window.addEventListener('online', handleOnline)
    if (navigator.onLine) flushQueue()
    return () => window.removeEventListener('online', handleOnline)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function register(payload) {
    const data = await api.register(payload)
    setToken(data.token)
    updateUser(data.user)
    return data.user
  }

  async function login(payload) {
    const data = await api.login(payload)
    setToken(data.token)
    updateUser(data.user)
    return data.user
  }

  function loginAsGuest() {
    updateUser(createGuestUser())
  }

  function logout() {
    setToken(null)
    clearCachedUser()
    clearGuestUser()
    setUserState(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        ready,
        offline,
        register,
        login,
        loginAsGuest,
        logout,
        isAuthenticated: !!getToken() || !!user?.isGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans un AuthProvider')
  return ctx
}

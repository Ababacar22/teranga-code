import { useCallback } from 'react'
import { api, NetworkError } from '../../api/client'
import { useAuth } from '../auth/AuthContext'
import { pushToQueue } from '../../lib/offlineQueue'
import { currentWeeklyXp, applyWeeklyXp, computeWeeklyTarget } from '../../lib/weeklyGoal'

function guardedCall(user, type, payload, run) {
  if (user?.isGuest) return Promise.resolve() // pas de compte serveur à synchroniser : la progression reste locale
  return run().catch((err) => {
    if (err instanceof NetworkError) pushToQueue({ type, payload })
  })
}

export function useProgress() {
  const { user, setUser, offline } = useAuth()

  const xp = user?.xp ?? 0
  const badges = user?.badges ?? []
  const missedQuestions = user?.missedQuestions ?? []
  const onboarded = user?.onboarded ?? false
  const streakCurrent = user?.streakCurrent ?? 0
  const streakLongest = user?.streakLongest ?? 0
  const level = user?.level ?? null
  const goal = user?.goal ?? null
  const focusAreas = user?.focusAreas ?? []
  const wizardDone = Boolean(user?.level)
  const isGuest = Boolean(user?.isGuest)
  const weeklyXp = user ? currentWeeklyXp(user) : 0
  const weeklyTarget = computeWeeklyTarget(level, goal)

  const addXp = useCallback(
    (amount) => {
      setUser((prev) => {
        const week = applyWeeklyXp(prev ?? {}, amount)
        return { ...prev, xp: (prev?.xp ?? 0) + amount, ...week }
      })
      guardedCall(user, 'addXp', { amount }, () => api.addXp(amount))
    },
    [setUser, user],
  )

  const addBadge = useCallback(
    (badgeId) => {
      setUser((prev) => {
        if (prev?.badges?.includes(badgeId)) return prev
        return { ...prev, badges: [...(prev?.badges ?? []), badgeId] }
      })
      guardedCall(user, 'addBadge', { badgeId }, () => api.addBadge(badgeId))
    },
    [setUser, user],
  )

  const hasBadge = useCallback((badgeId) => badges.includes(badgeId), [badges])

  const markOnboarded = useCallback(() => {
    setUser((prev) => ({ ...prev, onboarded: true }))
    guardedCall(user, 'markOnboarded', {}, () => api.markOnboarded())
  }, [setUser, user])

  const setMissed = useCallback(
    (key, missed) => {
      setUser((prev) => {
        const list = prev?.missedQuestions ?? []
        const already = list.includes(key)
        if (missed && !already) return { ...prev, missedQuestions: [...list, key] }
        if (!missed && already) return { ...prev, missedQuestions: list.filter((k) => k !== key) }
        return prev
      })
      guardedCall(user, 'setMissed', { key, missed }, () => api.setMissed(key, missed))
    },
    [setUser, user],
  )

  const ping = useCallback(() => {
    if (user?.isGuest) return
    api
      .ping()
      .then((progress) => setUser((prev) => ({ ...prev, ...progress })))
      .catch(() => {})
  }, [setUser, user])

  const submitWizard = useCallback(
    (payload) => {
      setUser((prev) => ({ ...prev, ...payload }))
      return guardedCall(user, 'setWizard', payload, () =>
        api.setWizard(payload).then((progress) => setUser((prev) => ({ ...prev, ...progress }))),
      )
    },
    [setUser, user],
  )

  const completeTopic = useCallback(
    (badgeId, xp, perfect) => {
      setUser((prev) => {
        if (prev?.badges?.includes(badgeId)) return prev
        const week = applyWeeklyXp(prev ?? {}, xp)
        return {
          ...prev,
          xp: (prev?.xp ?? 0) + xp,
          badges: perfect ? [...(prev?.badges ?? []), badgeId] : (prev?.badges ?? []),
          ...week,
        }
      })
      return guardedCall(user, 'completeTopic', { badgeId, xp, perfect }, () =>
        api.completeTopic(badgeId, xp, perfect).then((progress) => setUser((prev) => ({ ...prev, ...progress }))),
      )
    },
    [setUser, user],
  )

  const completeOnboarding = useCallback(
    (payload) => {
      setUser((prev) => ({ ...prev, ...payload, onboarded: true }))
      if (user?.isGuest) return Promise.resolve()
      return Promise.all([
        guardedCall(user, 'markOnboarded', {}, () => api.markOnboarded()),
        guardedCall(user, 'setWizard', payload, () =>
          api.setWizard(payload).then((progress) => setUser((prev) => ({ ...prev, ...progress }))),
        ),
      ])
    },
    [setUser, user],
  )

  return {
    xp,
    badges,
    missedQuestions,
    onboarded,
    streakCurrent,
    streakLongest,
    level,
    goal,
    focusAreas,
    weeklyXp,
    weeklyTarget,
    wizardDone,
    isGuest,
    offline,
    addXp,
    addBadge,
    hasBadge,
    markOnboarded,
    setMissed,
    ping,
    submitWizard,
    completeOnboarding,
    completeTopic,
  }
}

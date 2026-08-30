import { useEffect, useState } from 'react'
import { startAmbient, stopAmbient } from './sound'

const STORAGE_KEY = 'teranga-ambient'

export function useAmbient() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'on'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (enabled) startAmbient()
    else stopAmbient()
    return () => stopAmbient()
  }, [enabled])

  function toggle() {
    setEnabled((e) => {
      const next = !e
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
      } catch {
        // stockage indisponible — le choix reste actif pour la session
      }
      return next
    })
  }

  return { enabled, toggle }
}

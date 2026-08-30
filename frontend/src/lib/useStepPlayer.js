import { useEffect, useState } from 'react'

export function useStepPlayer(stepCount, intervalMs = 800) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const isDone = index >= stepCount - 1

  useEffect(() => {
    if (!playing || isDone) return
    const t = setTimeout(() => setIndex((i) => i + 1), intervalMs)
    return () => clearTimeout(t)
  }, [playing, isDone, intervalMs])

  function togglePlay() {
    if (isDone) {
      setIndex(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }

  function prev() {
    setPlaying(false)
    setIndex((i) => Math.max(0, i - 1))
  }

  function next() {
    setPlaying(false)
    setIndex((i) => Math.min(stepCount - 1, i + 1))
  }

  function reset() {
    setPlaying(false)
    setIndex(0)
  }

  return { index, setIndex, playing, isDone, togglePlay, prev, next, reset }
}

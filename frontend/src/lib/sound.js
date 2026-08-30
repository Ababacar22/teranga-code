let ctx

function getContext() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return null
    ctx = new AudioContextClass()
  }
  return ctx
}

function tone({ freq, duration = 0.15, type = 'sine', delay = 0, gain = 0.08 }) {
  const audioCtx = getContext()
  if (!audioCtx) return

  const osc = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gainNode.gain.value = gain

  osc.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  const startAt = audioCtx.currentTime + delay
  gainNode.gain.setValueAtTime(gain, startAt)
  gainNode.gain.exponentialRampToValueAtTime(0.001, startAt + duration)

  osc.start(startAt)
  osc.stop(startAt + duration)
}

export function playCorrect() {
  tone({ freq: 660, duration: 0.12, type: 'triangle' })
  tone({ freq: 880, duration: 0.15, type: 'triangle', delay: 0.08 })
}

export function playIncorrect() {
  tone({ freq: 180, duration: 0.25, type: 'sawtooth', gain: 0.06 })
}

export function playReward() {
  ;[523, 659, 784, 1046].forEach((freq, i) => tone({ freq, duration: 0.2, type: 'triangle', delay: i * 0.1 }))
}

export function playStreak() {
  ;[784, 988, 1175].forEach((freq, i) => tone({ freq, duration: 0.16, type: 'sine', delay: i * 0.07, gain: 0.06 }))
}

export function playWhoosh() {
  const audioCtx = getContext()
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(320, audioCtx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.18)
  gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18)
  osc.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  osc.start()
  osc.stop(audioCtx.currentTime + 0.18)
}

export function playClick() {
  tone({ freq: 520, duration: 0.05, type: 'sine', gain: 0.05 })
}

let ambientNodes = null

export function startAmbient() {
  const audioCtx = getContext()
  if (!audioCtx || ambientNodes) return

  const masterGain = audioCtx.createGain()
  masterGain.gain.value = 0
  masterGain.connect(audioCtx.destination)
  masterGain.gain.linearRampToValueAtTime(0.035, audioCtx.currentTime + 1.5)

  const filter = audioCtx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 800
  filter.connect(masterGain)

  const oscillators = [130.81, 164.81, 196.0].map((freq) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    osc.connect(filter)
    osc.start()
    return osc
  })

  const lfo = audioCtx.createOscillator()
  const lfoGain = audioCtx.createGain()
  lfo.frequency.value = 0.05
  lfoGain.gain.value = 300
  lfo.connect(lfoGain)
  lfoGain.connect(filter.frequency)
  lfo.start()

  ambientNodes = { masterGain, filter, oscillators, lfo, lfoGain }
}

export function stopAmbient() {
  if (!ambientNodes) return
  const audioCtx = getContext()
  const { masterGain, oscillators, lfo } = ambientNodes
  const now = audioCtx.currentTime
  masterGain.gain.cancelScheduledValues(now)
  masterGain.gain.setValueAtTime(masterGain.gain.value, now)
  masterGain.gain.linearRampToValueAtTime(0, now + 0.8)
  setTimeout(() => {
    oscillators.forEach((osc) => osc.stop())
    lfo.stop()
  }, 900)
  ambientNodes = null
}

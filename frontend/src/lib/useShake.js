import { useAnimation } from 'framer-motion'

export function useShake() {
  const controls = useAnimation()

  function shake() {
    controls.start({ x: [0, -8, 8, -8, 8, -4, 4, 0], transition: { duration: 0.4 } })
  }

  return { controls, shake }
}

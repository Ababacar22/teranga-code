import { AnimatePresence, motion } from 'framer-motion'

export function GriotAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="griot-avatar" aria-hidden="true">
      <circle cx="50" cy="38" r="20" fill="#c97b3d" />
      <path d="M20 95 C20 60 80 60 80 95 Z" fill="var(--sn-green)" />
      <path d="M20 95 C20 60 80 60 80 95 Z" fill="url(#wax)" opacity="0.5" />
      <circle cx="42" cy="36" r="3" fill="#2b1d0e" />
      <circle cx="58" cy="36" r="3" fill="#2b1d0e" />
      <path d="M42 48 Q50 54 58 48" stroke="#2b1d0e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 24 Q50 8 70 24 Q65 30 50 24 Q35 30 30 24 Z" fill="var(--sn-yellow)" />
      <defs>
        <pattern id="wax" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="none" />
          <circle cx="5" cy="5" r="2" fill="var(--sn-red)" />
        </pattern>
      </defs>
    </svg>
  )
}

function Griot({ lines, onDone, ctaLabel = 'Continuer' }) {
  const text = Array.isArray(lines) ? lines.join(' ') : lines

  return (
    <div className="griot-box">
      <GriotAvatar />
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          className="griot-bubble"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{text}</p>
          {onDone && (
            <button className="btn btn--primary" onClick={onDone}>
              {ctaLabel}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Griot

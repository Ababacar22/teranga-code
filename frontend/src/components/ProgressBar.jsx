import { motion } from 'framer-motion'

function ProgressBar({ xp, level = Math.floor(xp / 100) + 1 }) {
  const pctInLevel = xp % 100

  return (
    <div className="xp-bar" title={`${xp} XP`}>
      <span className="xp-bar__level">Niv. {level}</span>
      <div className="xp-bar__track">
        <motion.div
          className="xp-bar__fill"
          initial={{ width: 0 }}
          animate={{ width: `${pctInLevel}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="xp-bar__value">{xp} XP</span>
    </div>
  )
}

export default ProgressBar

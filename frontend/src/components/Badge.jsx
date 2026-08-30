import { motion } from 'framer-motion'

function Badge({ emoji, name }) {
  return (
    <motion.div
      className="badge"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 15 }}
    >
      <span className="badge__emoji">{emoji}</span>
      <span className="badge__name">{name}</span>
    </motion.div>
  )
}

export default Badge

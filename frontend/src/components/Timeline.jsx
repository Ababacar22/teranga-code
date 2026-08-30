import { motion } from 'framer-motion'

function Timeline({ steps }) {
  if (!steps?.length) return null

  return (
    <div className="timeline">
      <h4>Déroulé étape par étape</h4>
      <div className="timeline__track">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="timeline__step"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
          >
            <span className="timeline__marker">{i + 1}</span>
            <div className="timeline__content">
              <strong>{step.label}</strong>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Timeline

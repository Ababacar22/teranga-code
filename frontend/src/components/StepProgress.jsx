function StepProgress({ steps, currentIndex }) {
  return (
    <div className="step-progress">
      {steps.map((label, i) => (
        <div key={label} className="step-progress__item">
          <span
            className={`step-progress__dot ${
              i < currentIndex ? 'step-progress__dot--done' : i === currentIndex ? 'step-progress__dot--current' : ''
            }`}
          >
            {i < currentIndex ? '✓' : i + 1}
          </span>
          <span className="step-progress__label">{label}</span>
          {i < steps.length - 1 && (
            <span className={`step-progress__line ${i < currentIndex ? 'step-progress__line--done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default StepProgress

function StepControls({ index, stepCount, isDone, playing, onPrev, onToggle, onNext }) {
  return (
    <>
      <div className="viz-demo__controls">
        <button type="button" className="btn btn--small btn--secondary" onClick={onPrev} disabled={index === 0}>
          ← Précédent
        </button>
        <button type="button" className="btn btn--small btn--primary" onClick={onToggle}>
          {isDone ? '🔁 Rejouer' : playing ? 'Pause' : '▶ Lecture auto'}
        </button>
        <button type="button" className="btn btn--small btn--secondary" onClick={onNext} disabled={isDone}>
          Suivant →
        </button>
      </div>
      <p className="viz-demo__step-count">
        Étape {index + 1} / {stepCount}
      </p>
    </>
  )
}

export default StepControls

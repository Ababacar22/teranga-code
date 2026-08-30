function RecapSheet({ topic, onClose }) {
  return (
    <div className="recap-sheet">
      <h3>Fiche récap — {topic.title}</h3>
      <p className="explain-text">{topic.explanation.text}</p>

      {topic.useCases?.length > 0 && (
        <>
          <h4>Cas d'usage concrets</h4>
          <ul className="recap-sheet__list">
            {topic.useCases.map((uc, i) => (
              <li key={i}>{uc}</li>
            ))}
          </ul>
        </>
      )}

      <h4>Points clés à retenir</h4>
      <ul className="recap-sheet__list">
        {topic.quiz.map((q, i) => (
          <li key={i}>
            <strong>{q.question}</strong>
            <br />
            <span>→ {q.options[q.correctIndex]}</span>
          </li>
        ))}
      </ul>

      <button className="btn btn--secondary" onClick={onClose}>
        Fermer
      </button>
    </div>
  )
}

export default RecapSheet

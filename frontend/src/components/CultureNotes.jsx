function CultureNotes({ culture, ambiguite }) {
  if (!culture && !ambiguite) return null

  return (
    <div className="culture-notes">
      {culture && (
        <div className="culture-notes__card culture-notes__card--culture">
          <strong>🌍 Culture IT</strong>
          <p>{culture}</p>
        </div>
      )}
      {ambiguite && (
        <div className="culture-notes__card culture-notes__card--ambiguite">
          <strong>❓ Ambiguïté à connaître</strong>
          <p className="culture-notes__question">{ambiguite.question}</p>
          <p>{ambiguite.reponse}</p>
        </div>
      )}
    </div>
  )
}

export default CultureNotes

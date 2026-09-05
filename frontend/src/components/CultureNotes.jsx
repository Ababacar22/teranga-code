function CultureNotes({ culture, ambiguite, pionnier }) {
  if (!culture && !ambiguite && !pionnier) return null

  return (
    <div className="culture-notes">
      {pionnier && (
        <div className="culture-notes__card culture-notes__card--pionnier">
          <strong>🚀 Pionnier·ère du domaine — {pionnier.nom}</strong>
          {pionnier.portrait && <p className="culture-notes__question">{pionnier.portrait}</p>}
          <p>{pionnier.contribution}</p>
          <p>
            <strong>Problème : </strong>
            {pionnier.problematique}
          </p>
          <p>
            <strong>Solution : </strong>
            {pionnier.solution}
          </p>
          <p>
            <strong>Résultat : </strong>
            {pionnier.resultat}
          </p>
        </div>
      )}
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

function RelatedTools({ items }) {
  if (!items?.length) return null

  return (
    <div className="related-tools">
      <h4>Outils & frameworks liés</h4>
      <div className="related-tools__list">
        {items.map((tool, i) => (
          <div key={i} className="related-tools__item">
            <strong>{tool.name}</strong>
            <span>{tool.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedTools

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import glossary from '../content/glossary.json'
import { getAllTopics } from '../content'
import { fuzzySearch } from '../lib/fuzzySearch'

const CATEGORIES = ['Tous', ...new Set(glossary.map((g) => g.category))]
const ALL_TOPICS = getAllTopics()

function GlossaryScene() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Tous')
  const [openId, setOpenId] = useState(null)

  const filtered = useMemo(() => {
    const byCategory = category === 'Tous' ? glossary : glossary.filter((g) => g.category === category)
    return fuzzySearch(byCategory, query, (g) => [
      { text: g.term, weight: 3 },
      { text: g.explanation, weight: 1 },
      { text: g.example, weight: 1 },
    ])
  }, [query, category])

  const topicResults = useMemo(() => {
    if (!query.trim()) return []
    return fuzzySearch(ALL_TOPICS, query, (t) => [
      { text: t.title, weight: 3 },
      { text: t.category, weight: 1.5 },
      { text: t.culture, weight: 1 },
      { text: t.ambiguite?.question, weight: 1 },
      { text: t.ambiguite?.reponse, weight: 0.5 },
    ]).slice(0, 6)
  }, [query])

  return (
    <div className="scene scene--glossary">
      <h2>📖 Lexique & recherche</h2>
      <p>Les ambiguïtés classiques d'entretien, la culture IT, et une recherche qui retrouve aussi les sujets liés — pour parler comme quelqu'un du métier.</p>

      <div className="glossary-controls">
        <input
          className="glossary-search"
          placeholder="Rechercher un terme, un sujet, une ambiguïté..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="glossary-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`glossary-filter ${category === c ? 'glossary-filter--active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {topicResults.length > 0 && (
        <div className="glossary-topic-results">
          <h3>🧭 Sujets liés</h3>
          <div className="glossary-topic-results__list">
            {topicResults.map((t) => (
              <button
                key={t.id}
                type="button"
                className="glossary-topic-result"
                onClick={() => navigate(`/ville/${t.villeId}/quartier/${t.id}`)}
              >
                <span className="glossary-topic-result__emoji">{t.badge.emoji}</span>
                <span>
                  <strong>{t.title}</strong>
                  <small>
                    {t.villeName} · {t.category}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="glossary-list">
        {filtered.length === 0 && <p>Aucun terme ne correspond à ta recherche.</p>}
        {filtered.map((g) => {
          const open = openId === g.id
          return (
            <motion.div
              key={g.id}
              className="glossary-entry"
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button className="glossary-entry__toggle" onClick={() => setOpenId(open ? null : g.id)}>
                <span className="glossary-entry__category">{g.category}</span>
                <strong>{g.term}</strong>
                <span>{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <motion.div
                  className="glossary-entry__body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{g.explanation}</p>
                  {g.example && (
                    <p className="glossary-entry__example">
                      <strong>Exemple : </strong>
                      {g.example}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      <button className="btn btn--secondary" onClick={() => navigate('/')}>
        ← Retour à la carte
      </button>
    </div>
  )
}

export default GlossaryScene

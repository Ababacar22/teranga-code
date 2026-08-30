import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import rawQuestions from '../content/interviewQuestions.json'
import Badge from '../components/Badge'
import Confetti from '../components/Confetti'
import CityDiscovery from '../components/CityDiscovery'
import { useProgress } from '../features/progression/useProgress'
import { playCorrect, playIncorrect, playReward } from '../lib/sound'
import { DIFFICULTY_LEVELS, filterQuizByDifficulty } from '../lib/difficulty'
import { useShake } from '../lib/useShake'
import { getVille } from '../content'

const GOREE = getVille('goree')

const INTERVIEW_BADGE = { id: 'badge-interview', name: 'Prêt pour l’entretien', emoji: '🎤' }

const TYPE_LABELS = {
  technique: 'Question technique',
  comportemental: 'Question comportementale',
  motivation: 'Question de motivation',
  recruteur: 'Question à poser au recruteur',
}

const ROLES = [
  { id: 'fullstack', label: 'Fullstack', emoji: '🧩', description: 'Front + back, généraliste' },
  { id: 'backend', label: 'Backend', emoji: '🗄️', description: 'API, bases de données, fiabilité' },
  { id: 'frontend', label: 'Frontend', emoji: '🖼️', description: 'Interfaces, performance, accessibilité' },
  { id: 'devops', label: 'DevOps / SRE', emoji: '🛠️', description: 'CI/CD, observabilité, infra' },
  { id: 'data', label: 'Data Engineer', emoji: '📊', description: 'Pipelines, qualité de données' },
  { id: 'mobile', label: 'Mobile', emoji: '📱', description: 'Cycle de vie, offline, performance' },
]

const SESSION_LENGTH = 10

function buildSession(roleId, difficulty) {
  const pool = rawQuestions.filter((q) => q.roles.includes('general') || q.roles.includes(roleId))
  return filterQuizByDifficulty(pool, difficulty).slice(0, SESSION_LENGTH)
}

function RoleSelect({ onSelect }) {
  return (
    <div className="scene scene--interview">
      <div className="recruiter-card">
        <div className="recruiter-avatar" aria-hidden="true">
          🎙️
        </div>
        <div>
          <span className="recruiter-tag">Avant de commencer</span>
          <h2>Quel poste vises-tu ?</h2>
        </div>
      </div>
      <p>Les questions techniques s'adapteront au type de poste que tu simules.</p>
      <div className="role-grid">
        {ROLES.map((r) => (
          <button key={r.id} type="button" className="role-card" onClick={() => onSelect(r.id)}>
            <span className="role-card__emoji">{r.emoji}</span>
            <strong>{r.label}</strong>
            <span className="role-card__desc">{r.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function DifficultySelect({ onSelect }) {
  return (
    <div className="scene scene--interview">
      <div className="recruiter-card">
        <div className="recruiter-avatar" aria-hidden="true">
          🎙️
        </div>
        <div>
          <span className="recruiter-tag">Dernière étape</span>
          <h2>Quel niveau ?</h2>
        </div>
      </div>
      <p>Le niveau ajuste la difficulté des questions et le temps que tu as pour y répondre.</p>
      <div className="role-grid">
        {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
          <button key={key} type="button" className="role-card" onClick={() => onSelect(key)}>
            <strong>{level.label}</strong>
            <span className="role-card__desc">{level.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function InterviewSim() {
  const navigate = useNavigate()
  const { completeTopic } = useProgress()
  const [role, setRole] = useState(null)
  const [difficulty, setDifficulty] = useState(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const rewardGranted = useRef(false)
  const shake = useShake()

  const questions = useMemo(() => (role && difficulty ? buildSession(role, difficulty) : []), [role, difficulty])

  const current = questions[index]
  const perfect = questions.length > 0 && score === questions.length

  const competencyBreakdown = useMemo(() => {
    const byCompetency = {}
    for (const a of answers) {
      for (const c of a.competencies ?? []) {
        byCompetency[c] = byCompetency[c] ?? { correct: 0, total: 0 }
        byCompetency[c].total += 1
        if (a.correct) byCompetency[c].correct += 1
      }
    }
    return Object.entries(byCompetency).sort((a, b) => b[1].total - a[1].total)
  }, [answers])

  useEffect(() => {
    if (!finished || rewardGranted.current) return
    rewardGranted.current = true
    completeTopic(INTERVIEW_BADGE.id, score * 10, perfect)
    playReward()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  function handleAnswer(i) {
    if (selected !== null) return
    setSelected(i)
    const correct = i === current.correctIndex
    setAnswers((prev) => [...prev, { competencies: current.competencies, correct }])
    if (correct) {
      setScore((s) => s + 1)
      playCorrect()
    } else {
      playIncorrect()
      shake.shake()
    }
  }

  function next() {
    if (index + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  function handleExit() {
    if (window.confirm('Quitter la simulation maintenant ? Ta progression ne sera pas enregistrée.')) {
      navigate('/')
    }
  }

  if (!role) {
    return <RoleSelect onSelect={setRole} />
  }

  if (!difficulty) {
    return <DifficultySelect onSelect={setDifficulty} />
  }

  if (finished) {
    return (
      <div className="scene scene--interview">
        <motion.div
          className="reward-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {perfect && <Confetti />}
          <h2>Entretien terminé</h2>
          <p className="reward-xp">
            {score}/{questions.length} bonnes réponses
          </p>
          <p className="reward-xp">+{score * 10} XP</p>
          {perfect && <Badge emoji={INTERVIEW_BADGE.emoji} name={INTERVIEW_BADGE.name} />}
          <p>
            {perfect
              ? "Excellent — tu es prêt à affronter un vrai recruteur !"
              : 'Rejoue cette simulation pour progresser sur les questions ratées.'}
          </p>

          {competencyBreakdown.length > 0 && (
            <div className="competency-grid">
              <h3>📋 Grille de compétences</h3>
              {competencyBreakdown.map(([name, { correct, total }]) => (
                <div key={name} className="competency-row">
                  <span>{name}</span>
                  <span className="competency-row__score">
                    {correct}/{total}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button className="btn btn--secondary" onClick={() => navigate('/')}>
            Retour à la carte
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="scene scene--interview">
      <button type="button" className="quartier-exit" onClick={handleExit}>
        ← Quitter
      </button>
      {index === 0 && <CityDiscovery ville={GOREE} />}
      <div className="recruiter-card">
        <div className="recruiter-avatar" aria-hidden="true">
          🎙️
        </div>
        <div>
          <span className="recruiter-tag">{TYPE_LABELS[current.type] ?? 'Question'}</span>
          <h2>{current.question}</h2>
        </div>
      </div>

      <motion.div className="options" animate={shake.controls}>
        {current.options.map((opt, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.96 }}
            className={`option-btn ${
              selected !== null
                ? i === current.correctIndex
                  ? 'option-btn--correct'
                  : selected === i
                    ? 'option-btn--incorrect'
                    : ''
                : ''
            }`}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null}
          >
            {opt}
          </motion.button>
        ))}
      </motion.div>

      {selected !== null && (
        <div className="explain-card">
          <p>{selected === current.correctIndex ? current.feedback.correct : current.feedback.incorrect}</p>
          {current.rubric && (
            <p className="interview-rubric">
              <strong>Ce qu'un recruteur attend :</strong> {current.rubric}
            </p>
          )}
          <button className="btn btn--primary btn--pulse" onClick={next}>
            {index + 1 >= questions.length ? 'Voir mon résultat' : 'Question suivante'}
          </button>
        </div>
      )}

      <span className="quiz-meta">
        Question {index + 1}/{questions.length}
      </span>
    </div>
  )
}

export default InterviewSim

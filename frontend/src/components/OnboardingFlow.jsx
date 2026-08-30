import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Griot from './Griot'
import StepProgress from './StepProgress'
import { villes } from '../content'

const MACRO_STEPS = ['Bienvenue', 'Comment jouer', 'Ton niveau', 'Ton objectif', 'Tes priorités']

const STORY_BEATS = [
  "Teranga ! Je suis le Griot, ton guide à travers le Sénégal du code. Prêt à apprendre en jouant ?",
  "Chaque ville de la carte est une rubrique à explorer : apprends une notion avec moi, pratique, puis passe un quiz pour gagner de l'XP et débloquer des badges. Les villes s'ouvrent au fur et à mesure de ta progression, et tu peux réviser tes erreurs à tout moment.",
]

const LEVELS = [
  { id: 'debutant', label: 'Débutant', description: 'Je découvre encore beaucoup de ces concepts' },
  { id: 'intermediaire', label: 'Intermédiaire', description: 'Je connais les bases, je veux consolider' },
  { id: 'avance', label: 'Avancé', description: "Je veux être challengé au niveau d'un entretien" },
]

const GOALS = [
  { id: 'entretien', label: "J'ai un entretien bientôt", description: 'Préparation intensive et ciblée' },
  { id: 'apprentissage', label: "J'apprends pour progresser", description: 'Pas de deadline, avancer à mon rythme' },
  { id: 'remise-a-niveau', label: 'Je me remets à niveau', description: "Réviser des bases que j'ai oubliées" },
]

const TECHNICAL_VILLES = villes.filter((v) => v.topics)

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

function OnboardingFlow({ onFinish }) {
  const [step, setStep] = useState(0)
  const [level, setLevel] = useState(null)
  const [goal, setGoal] = useState(null)
  const [focusAreas, setFocusAreas] = useState([])

  function toggleFocus(id) {
    setFocusAreas((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const canContinue = step < 2 ? true : step === 2 ? !!level : step === 3 ? !!goal : true

  function next() {
    if (step < MACRO_STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    onFinish({ level, goal, focusAreas })
  }

  return (
    <div className="scene scene--onboarding">
      <StepProgress steps={MACRO_STEPS} currentIndex={step} />

      <AnimatePresence mode="wait">
        <motion.div key={step} className="wizard-card" variants={slideVariants} initial="enter" animate="center" exit="exit">
          {step < 2 && (
            <Griot lines={STORY_BEATS[step]} ctaLabel="Continuer" onDone={next} />
          )}

          {step === 2 && (
            <>
              <Griot lines="Avant de commencer, dis-moi où tu en es — ça m'aide à te proposer le bon rythme." />
              <div className="wizard-options">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    className={`wizard-option ${level === l.id ? 'wizard-option--selected' : ''}`}
                    onClick={() => setLevel(l.id)}
                  >
                    <strong>{l.label}</strong>
                    <span>{l.description}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <Griot lines="Et quel est ton objectif principal en ce moment ?" />
              <div className="wizard-options">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    className={`wizard-option ${goal === g.id ? 'wizard-option--selected' : ''}`}
                    onClick={() => setGoal(g.id)}
                  >
                    <strong>{g.label}</strong>
                    <span>{g.description}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <Griot lines="Enfin, quelles rubriques veux-tu prioriser ? (plusieurs choix possibles, ou aucun)" />
              <div className="wizard-options">
                {TECHNICAL_VILLES.map((v) => (
                  <button
                    key={v.id}
                    className={`wizard-option ${focusAreas.includes(v.id) ? 'wizard-option--selected' : ''}`}
                    onClick={() => toggleFocus(v.id)}
                  >
                    <strong>
                      {v.icon} {v.rubrique}
                    </strong>
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step >= 2 && (
            <button className="btn btn--primary btn--pulse" disabled={!canContinue} onClick={next}>
              {step < MACRO_STEPS.length - 1 ? 'Continuer' : 'Générer mon parcours'}
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      <button className="onboarding-skip" onClick={() => onFinish({ level: 'intermediaire', goal: 'apprentissage', focusAreas: [] })}>
        Passer l'introduction
      </button>
    </div>
  )
}

export default OnboardingFlow

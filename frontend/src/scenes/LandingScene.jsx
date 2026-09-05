import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GriotAvatar } from '../components/Griot'
import SortingDemo from '../components/SortingDemo'
import AnnotatedCode from '../components/AnnotatedCode'
import { villes, getAllTopics, getTopic } from '../content'
import { getLanguage } from '../lib/language'

const TOTAL_TOPICS = getAllTopics().length
const TECHNICAL_RUBRIQUES = new Set(villes.filter((v) => v.topics).map((v) => v.rubrique))
const SINGLETON_TOPIC = getTopic('singleton')

const TEXT = {
  fr: {
    tagline: "Prépare tes entretiens d'ingénieur logiciel en jouant — à travers un voyage au Sénégal.",
    start: "Commencer l'aventure",
    haveAccount: "J'ai déjà un compte",
    pwa: '📲 Installable sur ton téléphone · fonctionne hors-ligne une fois ouverte',
    seeForYourself: 'Vois par toi-même',
    seeForYourselfText: "Pas de blabla — voici un vrai extrait interactif, tel qu'il apparaît dans une leçon. Essaie-le, aucun compte requis.",
    howItWorks: 'Comment ça marche',
    steps: [
      { icon: '🗺️', title: 'Explore la carte', text: 'Voyage à travers le Sénégal — chaque ville est une rubrique technique à débloquer.' },
      { icon: '🧙🏾', title: 'Apprends avec le Griot', text: 'Explications concrètes, code, cas d’usage et outils réels liés à chaque notion.' },
      { icon: '🏆', title: 'Progresse en jouant', text: 'Quiz chronométrés, badges, XP, séries, défis entre amis et classement.' },
    ],
    codeExplains: "Le code s'explique lui-même",
    codeExplainsText: 'Clique sur une ligne surlignée pour voir apparaître son explication — exactement comme dans une vraie leçon.',
    journey: 'Un vrai voyage à travers le Sénégal',
    journeyText: 'Chaque ville débloque une rubrique — sur une vraie carte, avec sa culture et son histoire.',
    moreVilles: (n) => `+ ${n} autres villes`,
    everything: 'Tout ce qu’il te faut pour progresser',
    features: [
      {
        icon: '🧩',
        title: `${TOTAL_TOPICS} sujets, ${TECHNICAL_RUBRIQUES.size} rubriques`,
        text: 'Design Patterns, Algorithmie, Architecture, Frameworks, Web & Réseaux, Cloud, Sécurité, POO, entretien comportemental.',
      },
      { icon: '🎮', title: 'Gamification complète', text: 'XP, badges, niveaux de difficulté, séries quotidiennes, confettis à chaque score parfait.' },
      { icon: '⚔️', title: 'Défis & classement', text: 'Défie tes amis sur un sujet, comparez vos scores, grimpe dans le classement général.' },
      { icon: '🧭', title: 'Parcours personnalisé', text: 'Un assistant de démarrage adapte le rythme et l’ordre des sujets à ton niveau et ton objectif.' },
      { icon: '🔁', title: 'Révision espacée', text: 'Les questions ratées reviennent automatiquement dans un mode révision dédié.' },
      { icon: '📖', title: 'Lexique & culture IT', text: 'Les ambiguïtés classiques d’entretien (framework vs bibliothèque, etc.) et la culture du métier.' },
    ],
    why: 'Pourquoi ce projet',
    whyText:
      "Teranga Code est né d'un besoin simple : se préparer sérieusement aux entretiens d'ingénieur logiciel, sans que ce soit ennuyeux — pour aider tout développeur, où qu'il soit, à apprendre en s'amusant.",
    join: 'Rejoindre Teranga Code',
    credit: 'Développé par',
  },
  en: {
    tagline: 'Get ready for your software engineering interviews by playing — through a journey across Senegal.',
    start: 'Start the adventure',
    haveAccount: 'I already have an account',
    pwa: '📲 Installable on your phone · works offline once opened',
    seeForYourself: 'See for yourself',
    seeForYourselfText: 'No fluff — here is a real interactive snippet, exactly as it appears in a lesson. Try it, no account required.',
    howItWorks: 'How it works',
    steps: [
      { icon: '🗺️', title: 'Explore the map', text: 'Travel across Senegal — each city is a technical track to unlock.' },
      { icon: '🧙🏾', title: 'Learn with the Griot', text: 'Concrete explanations, code, real use cases and tools tied to each concept.' },
      { icon: '🏆', title: 'Progress by playing', text: 'Timed quizzes, badges, XP, streaks, challenges with friends, and a leaderboard.' },
    ],
    codeExplains: 'The code explains itself',
    codeExplainsText: 'Click a highlighted line to reveal its explanation — exactly like in a real lesson.',
    journey: 'A real journey across Senegal',
    journeyText: 'Each city unlocks a track — on a real map, with its own culture and history.',
    moreVilles: (n) => `+ ${n} more cities`,
    everything: 'Everything you need to improve',
    features: [
      {
        icon: '🧩',
        title: `${TOTAL_TOPICS} topics, ${TECHNICAL_RUBRIQUES.size} tracks`,
        text: 'Design Patterns, Algorithms, Architecture, Frameworks, Web & Networking, Cloud, Security, OOP, behavioral interviews.',
      },
      { icon: '🎮', title: 'Full gamification', text: 'XP, badges, difficulty levels, daily streaks, confetti on every perfect score.' },
      { icon: '⚔️', title: 'Challenges & leaderboard', text: 'Challenge friends on a topic, compare scores, climb the overall leaderboard.' },
      { icon: '🧭', title: 'Personalized path', text: 'An onboarding wizard adapts the pace and order of topics to your level and goal.' },
      { icon: '🔁', title: 'Spaced revision', text: 'Missed questions automatically resurface in a dedicated revision mode.' },
      { icon: '📖', title: 'Glossary & IT culture', text: "Classic interview gotchas (framework vs. library, etc.) and the culture of the craft." },
    ],
    why: 'Why this project',
    whyText:
      'Teranga Code was born from a simple need: preparing seriously for software engineering interviews without it being boring — to help any developer, anywhere, learn by having fun.',
    join: 'Join Teranga Code',
    credit: 'Built by',
  },
}

function LandingScene() {
  const navigate = useNavigate()
  const previewVilles = villes.slice(0, 4)
  const lang = getLanguage()
  const t = TEXT[lang]

  return (
    <div className="landing">
      <section className="landing-hero">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <GriotAvatar />
          <h1>Teranga Code</h1>
          <p className="landing-hero__tagline">{t.tagline}</p>
          <div className="landing-hero__cta">
            <button className="btn btn--primary btn--pulse" onClick={() => navigate('/inscription')}>
              {t.start}
            </button>
            <button className="btn btn--secondary" onClick={() => navigate('/connexion')}>
              {t.haveAccount}
            </button>
          </div>
          <p className="landing-hero__pwa">{t.pwa}</p>
        </motion.div>
      </section>

      <section className="landing-section">
        <h2>{t.seeForYourself}</h2>
        <p>{t.seeForYourselfText}</p>
        <motion.div
          className="landing-demo"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
        >
          <SortingDemo />
        </motion.div>
      </section>

      <section className="landing-section">
        <h2>{t.howItWorks}</h2>
        <div className="landing-steps">
          {t.steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="landing-step"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <span className="landing-step__icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <h2>{t.codeExplains}</h2>
        <p>{t.codeExplainsText}</p>
        <motion.div
          className="landing-demo landing-demo--code"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
        >
          <AnnotatedCode code={SINGLETON_TOPIC.explanation.code} annotations={SINGLETON_TOPIC.explanation.annotations} />
        </motion.div>
      </section>

      <section className="landing-section landing-section--map">
        <h2>{t.journey}</h2>
        <p>{t.journeyText}</p>
        <div className="landing-villes">
          {previewVilles.map((v) => (
            <div key={v.id} className="landing-ville-chip">
              <span>{v.icon}</span>
              <strong>{v.name}</strong>
              <small>{v.rubrique}</small>
            </div>
          ))}
          <div className="landing-ville-chip landing-ville-chip--more">{t.moreVilles(villes.length - previewVilles.length)}</div>
        </div>
      </section>

      <section className="landing-section">
        <h2>{t.everything}</h2>
        <div className="landing-features">
          {t.features.map((f, i) => (
            <motion.div
              key={f.title}
              className="landing-feature"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
            >
              <span className="landing-feature__icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section--mission">
        <h2>{t.why}</h2>
        <p>{t.whyText}</p>
      </section>

      <section className="landing-footer">
        <button className="btn btn--primary btn--pulse" onClick={() => navigate('/inscription')}>
          {t.join}
        </button>
        <p className="landing-credit">
          {t.credit}{' '}
          <a href="https://gainde-it.com" target="_blank" rel="noopener noreferrer">
            gainde-it.com
          </a>
        </p>
      </section>
    </div>
  )
}

export default LandingScene

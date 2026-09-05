import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GriotAvatar } from '../components/Griot'
import SortingDemo from '../components/SortingDemo'
import AnnotatedCode from '../components/AnnotatedCode'
import designPatterns from '../content/topics/designPatterns.json'
import { villes, getAllTopics } from '../content'

const TOTAL_TOPICS = getAllTopics().length
const TECHNICAL_RUBRIQUES = new Set(villes.filter((v) => v.topics).map((v) => v.rubrique))
const SINGLETON_TOPIC = designPatterns.find((t) => t.id === 'singleton')

const STEPS = [
  {
    icon: '🗺️',
    title: 'Explore la carte',
    text: 'Voyage à travers le Sénégal — chaque ville est une rubrique technique à débloquer.',
  },
  {
    icon: '🧙🏾',
    title: 'Apprends avec le Griot',
    text: 'Explications concrètes, code, cas d’usage et outils réels liés à chaque notion.',
  },
  {
    icon: '🏆',
    title: 'Progresse en jouant',
    text: 'Quiz chronométrés, badges, XP, séries, défis entre amis et classement.',
  },
]

const FEATURES = [
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
]

function LandingScene() {
  const navigate = useNavigate()
  const previewVilles = villes.slice(0, 4)

  return (
    <div className="landing">
      <section className="landing-hero">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <GriotAvatar />
          <h1>Teranga Code</h1>
          <p className="landing-hero__tagline">
            Prépare tes entretiens d'ingénieur logiciel en jouant — à travers un voyage au Sénégal.
          </p>
          <div className="landing-hero__cta">
            <button className="btn btn--primary btn--pulse" onClick={() => navigate('/inscription')}>
              Commencer l'aventure
            </button>
            <button className="btn btn--secondary" onClick={() => navigate('/connexion')}>
              J'ai déjà un compte
            </button>
          </div>
          <p className="landing-hero__pwa">📲 Installable sur ton téléphone · fonctionne hors-ligne une fois ouverte</p>
        </motion.div>
      </section>

      <section className="landing-section">
        <h2>Vois par toi-même</h2>
        <p>Pas de blabla — voici un vrai extrait interactif, tel qu'il apparaît dans une leçon. Essaie-le, aucun compte requis.</p>
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
        <h2>Comment ça marche</h2>
        <div className="landing-steps">
          {STEPS.map((step, i) => (
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
        <h2>Le code s'explique lui-même</h2>
        <p>Clique sur une ligne surlignée pour voir apparaître son explication — exactement comme dans une vraie leçon.</p>
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
        <h2>Un vrai voyage à travers le Sénégal</h2>
        <p>Chaque ville débloque une rubrique — sur une vraie carte, avec sa culture et son histoire.</p>
        <div className="landing-villes">
          {previewVilles.map((v) => (
            <div key={v.id} className="landing-ville-chip">
              <span>{v.icon}</span>
              <strong>{v.name}</strong>
              <small>{v.rubrique}</small>
            </div>
          ))}
          <div className="landing-ville-chip landing-ville-chip--more">+ {villes.length - previewVilles.length} autres villes</div>
        </div>
      </section>

      <section className="landing-section">
        <h2>Tout ce qu'il te faut pour progresser</h2>
        <div className="landing-features">
          {FEATURES.map((f, i) => (
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
        <h2>Pourquoi ce projet</h2>
        <p>
          Teranga Code est né d'un besoin simple : se préparer sérieusement aux entretiens d'ingénieur logiciel,
          sans que ce soit ennuyeux — pour aider tout développeur, où qu'il soit, à apprendre en s'amusant.
        </p>
      </section>

      <section className="landing-footer">
        <button className="btn btn--primary btn--pulse" onClick={() => navigate('/inscription')}>
          Rejoindre Teranga Code
        </button>
        <p className="landing-credit">
          Développé par{' '}
          <a href="https://gainde-it.com" target="_blank" rel="noopener noreferrer">
            gainde-it.com
          </a>
        </p>
      </section>
    </div>
  )
}

export default LandingScene

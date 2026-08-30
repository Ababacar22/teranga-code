import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getTopic } from '../content'
import Griot from '../components/Griot'
import Badge from '../components/Badge'
import SingletonDemo from '../components/SingletonDemo'
import SortingDemo from '../components/SortingDemo'
import GraphTraversalDemo from '../components/GraphTraversalDemo'
import StackQueueDemo from '../components/StackQueueDemo'
import GrowthChartDemo from '../components/GrowthChartDemo'
import ApiRequestFlowDemo from '../components/ApiRequestFlowDemo'
import CacheFlowDemo from '../components/CacheFlowDemo'
import FailureIsolationDemo from '../components/FailureIsolationDemo'
import GitBranchDemo from '../components/GitBranchDemo'
import CiCdPipelineDemo from '../components/CiCdPipelineDemo'
import ObserverDemo from '../components/ObserverDemo'
import ClassTreeDemo from '../components/ClassTreeDemo'
import MutationDemo from '../components/MutationDemo'
import InjectionDemo from '../components/InjectionDemo'
import TDDCycleDemo from '../components/TDDCycleDemo'
import JoinDemo from '../components/JoinDemo'
import FactoryDemo from '../components/FactoryDemo'
import StrategyDemo from '../components/StrategyDemo'
import CompositionDemo from '../components/CompositionDemo'
import AdapterFitDemo from '../components/AdapterFitDemo'
import LayerStackDemo from '../components/LayerStackDemo'
import StepBuilderDemo from '../components/StepBuilderDemo'
import SplitDemo from '../components/SplitDemo'
import ReviewSizeDemo from '../components/ReviewSizeDemo'
import SemverDemo from '../components/SemverDemo'
import TerminalDemo from '../components/TerminalDemo'
import EncapsulationLockDemo from '../components/EncapsulationLockDemo'
import DockerLayerDemo from '../components/DockerLayerDemo'
import FrameworkVsLibrairieDemo from '../components/FrameworkVsLibrairieDemo'
import ReactVueAngularDemo from '../components/ReactVueAngularDemo'
import NodeDenoBunDemo from '../components/NodeDenoBunDemo'
import BundlersDemo from '../components/BundlersDemo'
import CapTheoremDemo from '../components/CapTheoremDemo'
import ServerlessDemo from '../components/ServerlessDemo'
import MessageQueuesDemo from '../components/MessageQueuesDemo'
import LoadBalancingDemo from '../components/LoadBalancingDemo'
import HttpFlowDemo from '../components/HttpFlowDemo'
import DnsResolutionDemo from '../components/DnsResolutionDemo'
import TlsHandshakeDemo from '../components/TlsHandshakeDemo'
import WebSocketVsPollingDemo from '../components/WebSocketVsPollingDemo'
import CacheStrategiesDemo from '../components/CacheStrategiesDemo'
import LoadBalancingAlgorithmesDemo from '../components/LoadBalancingAlgorithmesDemo'
import OrchestrationDemo from '../components/OrchestrationDemo'
import TypologieBasesDonneesDemo from '../components/TypologieBasesDonneesDemo'
import PatternsArchitectureSiDemo from '../components/PatternsArchitectureSiDemo'
import SystemDesignEstimationDemo from '../components/SystemDesignEstimationDemo'
import UrlShortenerDemo from '../components/UrlShortenerDemo'
import NewsFeedFanoutDemo from '../components/NewsFeedFanoutDemo'
import ShardingDemo from '../components/ShardingDemo'
import StarBuilderDemo from '../components/StarBuilderDemo'
import TechnicalEnglishDemo from '../components/TechnicalEnglishDemo'
import HiringProcessRegionsDemo from '../components/HiringProcessRegionsDemo'
import ArchitectureEvolutionDemo from '../components/ArchitectureEvolutionDemo'
import RateLimiterDemo from '../components/RateLimiterDemo'
import ConsistentHashingDemo from '../components/ConsistentHashingDemo'
import AnnotatedCode from '../components/AnnotatedCode'
import RecapSheet from '../components/RecapSheet'
import BugHunt from '../components/BugHunt'
import Confetti from '../components/Confetti'
import UseCaseCards from '../components/UseCaseCards'
import CultureNotes from '../components/CultureNotes'
import StepProgress from '../components/StepProgress'
import Timeline from '../components/Timeline'
import RelatedTools from '../components/RelatedTools'
import { useProgress } from '../features/progression/useProgress'
import { playCorrect, playIncorrect, playReward } from '../lib/sound'
import { DIFFICULTY_LEVELS, filterQuizByDifficulty, suggestDifficultyFromLevel } from '../lib/difficulty'
import { shuffleOptions } from '../lib/shuffle'
import { useShake } from '../lib/useShake'

const TOPIC_DEMOS = {
  singleton: SingletonDemo,
  'tri-recherche': SortingDemo,
  'arbres-graphes': GraphTraversalDemo,
  'structures-lineaires': StackQueueDemo,
  'big-o': GrowthChartDemo,
  'api-rest': ApiRequestFlowDemo,
  'scalabilite-cache': CacheFlowDemo,
  'monolithe-microservices': FailureIsolationDemo,
  git: GitBranchDemo,
  'ci-cd': CiCdPipelineDemo,
  observer: ObserverDemo,
  'heritage-polymorphisme': ClassTreeDemo,
  'fp-vs-oop': MutationDemo,
  owasp: InjectionDemo,
  tests: TDDCycleDemo,
  'sql-nosql': JoinDemo,
  factory: FactoryDemo,
  strategy: StrategyDemo,
  'composition-heritage': CompositionDemo,
  adapter: AdapterFitDemo,
  decorator: LayerStackDemo,
  builder: StepBuilderDemo,
  'clean-code-solid': SplitDemo,
  'code-review': ReviewSizeDemo,
  dependances: SemverDemo,
  linux: TerminalDemo,
  'encapsulation-abstraction': EncapsulationLockDemo,
  docker: DockerLayerDemo,
  'framework-vs-librairie': FrameworkVsLibrairieDemo,
  'react-vue-angular': ReactVueAngularDemo,
  'node-deno-bun': NodeDenoBunDemo,
  bundlers: BundlersDemo,
  'cap-theorem': CapTheoremDemo,
  serverless: ServerlessDemo,
  'message-queues': MessageQueuesDemo,
  'load-balancing': LoadBalancingDemo,
  'http-fondamentaux': HttpFlowDemo,
  dns: DnsResolutionDemo,
  'https-tls': TlsHandshakeDemo,
  websockets: WebSocketVsPollingDemo,
  'cache-strategies': CacheStrategiesDemo,
  'load-balancing-algorithmes': LoadBalancingAlgorithmesDemo,
  'orchestration-conteneurs': OrchestrationDemo,
  'typologie-bases-donnees': TypologieBasesDonneesDemo,
  'patterns-architecture-si': PatternsArchitectureSiDemo,
  'system-design-fondamentaux': SystemDesignEstimationDemo,
  'etude-cas-raccourcisseur-url': UrlShortenerDemo,
  'etude-cas-fil-actualite': NewsFeedFanoutDemo,
  'compromis-echelle': ShardingDemo,
  'entretien-comportemental-star': StarBuilderDemo,
  'anglais-technique-entretien': TechnicalEnglishDemo,
  'process-recrutement-regions': HiringProcessRegionsDemo,
  'evolution-architecture-echelle': ArchitectureEvolutionDemo,
  'rate-limiter': RateLimiterDemo,
  'consistent-hashing': ConsistentHashingDemo,
}

const STEPS = ['Histoire', 'Pratique', 'Quiz', 'Récompense']
const STEP_INDEX = {
  intro: 0,
  explain: 0,
  practice: 1,
  bughunt: 1,
  difficulty: 2,
  quiz: 2,
  reward: 3,
}

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

function QuartierScene() {
  const { villeId, topicId } = useParams()
  const navigate = useNavigate()
  const { completeTopic, setMissed, level: userLevel } = useProgress()
  const topic = getTopic(topicId)
  const TopicDemo = topic ? TOPIC_DEMOS[topic.id] : null

  const [phase, setPhase] = useState('intro')
  const [introIndex, setIntroIndex] = useState(0)
  const [practiceAnswer, setPracticeAnswer] = useState(null)
  const [difficulty, setDifficulty] = useState(() => suggestDifficultyFromLevel(userLevel))
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizSelected, setQuizSelected] = useState(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showRecap, setShowRecap] = useState(false)
  const rewardGranted = useRef(false)
  const practiceShake = useShake()
  const quizShake = useShake()

  const activeQuiz = useMemo(
    () => (topic ? filterQuizByDifficulty(topic.quiz, difficulty) : []),
    [topic, difficulty],
  )

  const shuffledPractice = useMemo(() => {
    if (!topic) return null
    const { options, correctIndex } = shuffleOptions(topic.practice.options, topic.practice.correctIndex)
    return { ...topic.practice, options, correctIndex }
  }, [topic])
  const questionTime = DIFFICULTY_LEVELS[difficulty]?.time ?? 30

  useEffect(() => {
    if (phase !== 'quiz' || quizSelected !== null) return
    if (timeLeft <= 0) {
      setQuizSelected(-1)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, quizSelected])

  const finalScore = quizScore
  const perfect = activeQuiz.length > 0 && finalScore === activeQuiz.length
  const earnedXp = finalScore * 20

  useEffect(() => {
    if (!topic || phase !== 'reward' || rewardGranted.current) return
    rewardGranted.current = true
    completeTopic(topic.badge.id, earnedXp, perfect)
    playReward()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, topic])

  if (!topic) {
    return (
      <div className="scene">
        <h2>Notion introuvable</h2>
        <button className="btn btn--secondary" onClick={() => navigate('/')}>
          Retour à la carte
        </button>
      </div>
    )
  }

  function handlePracticeAnswer(i) {
    if (practiceAnswer !== null) return
    setPracticeAnswer(i)
    if (i === shuffledPractice.correctIndex) playCorrect()
    else {
      playIncorrect()
      practiceShake.shake()
    }
  }

  function startQuiz() {
    setQuizIndex(0)
    setQuizScore(0)
    setQuizSelected(null)
    setTimeLeft(questionTime)
    setPhase('quiz')
  }

  function handleQuizAnswer(optionIndex, correctIndex) {
    if (quizSelected !== null) return
    setQuizSelected(optionIndex)
    const key = `${topic.id}#${quizIndex}`
    if (optionIndex === correctIndex) {
      setQuizScore((s) => s + 1)
      playCorrect()
      setMissed(key, false)
    } else {
      playIncorrect()
      quizShake.shake()
      setMissed(key, true)
    }
  }

  function nextQuizQuestion() {
    if (quizIndex + 1 >= activeQuiz.length) {
      setPhase('reward')
      return
    }
    setQuizIndex((i) => i + 1)
    setQuizSelected(null)
    setTimeLeft(questionTime)
  }

  function handleExit() {
    const midSession = phase !== 'intro' && phase !== 'reward'
    if (midSession && !window.confirm('Quitter maintenant ? Ta progression sur ce sujet ne sera pas enregistrée.')) {
      return
    }
    navigate(`/ville/${villeId}`)
  }

  return (
    <div className="scene scene--quartier">
      <button type="button" className="quartier-exit" onClick={handleExit}>
        ← Quitter
      </button>

      <div className="quartier-header">
        <span className="quartier-header__ville">{topic.villeName}</span>
        <h2>{topic.title}</h2>
      </div>

      <StepProgress steps={STEPS} currentIndex={STEP_INDEX[phase]} />

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div key="intro" variants={slideVariants} initial="enter" animate="center" exit="exit">
            <Griot
              lines={topic.griotIntro[introIndex]}
              ctaLabel={introIndex + 1 < topic.griotIntro.length ? 'Continuer' : "C'est parti !"}
              onDone={() => {
                if (introIndex + 1 < topic.griotIntro.length) {
                  setIntroIndex((i) => i + 1)
                } else {
                  setPhase('explain')
                }
              }}
            />
          </motion.div>
        )}

        {phase === 'explain' && (
          <motion.div key="explain" className="explain-card" variants={slideVariants} initial="enter" animate="center" exit="exit">
            <Griot
              lines={
                topic.explanation.annotations?.length
                  ? topic.explanation.text
                  : `Voici ${topic.title} en concret :`
              }
            />
            {TopicDemo && <TopicDemo />}
            <AnnotatedCode code={topic.explanation.code} annotations={topic.explanation.annotations} />
            <Timeline steps={topic.timeline} />
            {!topic.explanation.annotations?.length && (
              <p className="explain-text">{topic.explanation.text}</p>
            )}
            <UseCaseCards items={topic.useCases} />
            <RelatedTools items={topic.relatedTools} />
            <CultureNotes culture={topic.culture} ambiguite={topic.ambiguite} />
            <button className="btn btn--primary btn--pulse" onClick={() => setPhase('practice')}>
              On pratique !
            </button>
          </motion.div>
        )}

        {phase === 'practice' && (
          <motion.div key="practice" className="practice-card" variants={slideVariants} initial="enter" animate="center" exit="exit">
            <h3>{shuffledPractice.question}</h3>
            <motion.div className="options" animate={practiceShake.controls}>
              {shuffledPractice.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.96 }}
                  className={`option-btn ${
                    practiceAnswer === i
                      ? i === shuffledPractice.correctIndex
                        ? 'option-btn--correct'
                        : 'option-btn--incorrect'
                      : ''
                  }`}
                  onClick={() => handlePracticeAnswer(i)}
                  disabled={practiceAnswer !== null}
                >
                  <code>{opt}</code>
                </motion.button>
              ))}
            </motion.div>
            {practiceAnswer !== null && (
              <Griot
                lines={
                  practiceAnswer === shuffledPractice.correctIndex
                    ? shuffledPractice.feedback.correct
                    : shuffledPractice.feedback.incorrect
                }
                ctaLabel={topic.bugHunt ? 'Défi bonus' : 'Choisir la difficulté'}
                onDone={() => setPhase(topic.bugHunt ? 'bughunt' : 'difficulty')}
              />
            )}
          </motion.div>
        )}

        {phase === 'bughunt' && topic.bugHunt && (
          <motion.div key="bughunt" variants={slideVariants} initial="enter" animate="center" exit="exit">
            <BugHunt bugHunt={topic.bugHunt} onDone={() => setPhase('difficulty')} />
          </motion.div>
        )}

        {phase === 'difficulty' && (
          <motion.div key="difficulty" className="difficulty-card" variants={slideVariants} initial="enter" animate="center" exit="exit">
            <h3>Choisis ta difficulté</h3>
            <div className="difficulty-options">
              {Object.entries(DIFFICULTY_LEVELS).map(([key, cfg]) => (
                <button
                  key={key}
                  className={`difficulty-btn ${difficulty === key ? 'difficulty-btn--selected' : ''}`}
                  onClick={() => setDifficulty(key)}
                >
                  <strong>{cfg.label}</strong>
                  <span>{cfg.description}</span>
                  <small>⏱ {cfg.time}s / question</small>
                </button>
              ))}
            </div>
            <button className="btn btn--primary btn--pulse" onClick={startQuiz}>
              Lancer le quiz
            </button>
          </motion.div>
        )}

        {phase === 'quiz' && activeQuiz[quizIndex] && (
          <motion.div key={`quiz-${quizIndex}`} className="quiz-card" variants={slideVariants} initial="enter" animate="center" exit="exit">
            <div className="quiz-meta">
              <span>
                Question {quizIndex + 1}/{activeQuiz.length}
              </span>
              <span className={`quiz-timer ${timeLeft <= 10 ? 'quiz-timer--low' : ''}`}>⏱ {timeLeft}s</span>
            </div>
            <h3>{activeQuiz[quizIndex].question}</h3>
            <motion.div className="options" animate={quizShake.controls}>
              {activeQuiz[quizIndex].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.96 }}
                  className={`option-btn ${
                    quizSelected !== null
                      ? i === activeQuiz[quizIndex].correctIndex
                        ? 'option-btn--correct'
                        : quizSelected === i
                          ? 'option-btn--incorrect'
                          : ''
                      : ''
                  }`}
                  onClick={() => handleQuizAnswer(i, activeQuiz[quizIndex].correctIndex)}
                  disabled={quizSelected !== null}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>
            {quizSelected !== null && (
              <button className="btn btn--primary btn--pulse" onClick={nextQuizQuestion}>
                {quizIndex + 1 >= activeQuiz.length ? 'Voir mon résultat' : 'Question suivante'}
              </button>
            )}
          </motion.div>
        )}

        {phase === 'reward' && (
          <motion.div
            key="reward"
            className="reward-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {perfect && <Confetti />}
            <h3>
              {finalScore}/{activeQuiz.length} bonnes réponses
            </h3>
            <p className="reward-xp">+{earnedXp} XP</p>
            {perfect && <Badge emoji={topic.badge.emoji} name={topic.badge.name} />}
            {perfect ? (
              <p>Score parfait ! Le Griot est fier de toi.</p>
            ) : (
              <p>Bien joué — reviens plus tard pour viser le score parfait et débloquer le badge.</p>
            )}
            <div className="reward-actions">
              <button className="btn btn--secondary" onClick={() => setShowRecap(true)}>
                Voir la fiche récap
              </button>
              <button className="btn btn--secondary" onClick={() => navigate(`/ville/${villeId}`)}>
                Retour aux sujets
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showRecap && (
        <div className="overlay" onClick={() => setShowRecap(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <RecapSheet topic={topic} onClose={() => setShowRecap(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default QuartierScene

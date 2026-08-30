import { useStepPlayer } from '../lib/useStepPlayer'
import StepControls from './StepControls'

const STEPS = [
  {
    title: 'Serveur unique',
    added: ['client', 'server'],
    note: "Web, application et base de données cohabitent sur UNE seule machine. Simple, mais point unique de défaillance (SPOF) : web et base se battent pour les mêmes ressources.",
  },
  {
    title: 'Séparer la base de données',
    added: ['db'],
    note: "Première évolution presque universelle : sortir la base sur sa propre machine. Le web tier et la base peuvent maintenant évoluer (scaler) indépendamment.",
  },
  {
    title: 'Load balancer + scaling horizontal',
    added: ['lb', 'web2'],
    note: "Un load balancer répartit le trafic entre plusieurs serveurs web identiques. Si l'un tombe, les autres absorbent la charge — fin du SPOF côté web.",
  },
  {
    title: 'HTTPS + health checks',
    added: ['ssl', 'healthCheck'],
    note: "Le load balancer termine le chiffrement TLS (il déchiffre une fois, plutôt que chaque serveur web) et sonde en continu chaque serveur — un serveur qui ne répond plus est automatiquement retiré de la rotation, sans intervention humaine.",
  },
  {
    title: 'Réplication de la base',
    added: ['dbReplica'],
    note: "Une base primaire (écritures) et une ou plusieurs répliques (lectures). La majorité du trafic étant en lecture, cela soulage énormément la base primaire.",
  },
  {
    title: 'Indexation de la base',
    added: ['dbIndex'],
    note: "Avant de sauter sur un cache ou un sharding, le premier réflexe face à des requêtes lentes est presque toujours l'indexation : un bon index peut transformer un scan de table en une recherche quasi instantanée, pour un coût d'implémentation minime.",
  },
  {
    title: 'Cache',
    added: ['cache'],
    note: "Un cache en mémoire (Redis) absorbe les lectures répétées avant même d'atteindre la base — les temps de réponse chutent radicalement pour les données populaires.",
  },
  {
    title: 'CDN',
    added: ['cdn'],
    note: "Les fichiers statiques (images, CSS, JS) sont servis depuis des serveurs proches géographiquement de l'utilisateur, pas depuis l'origine — latence réduite à l'échelle mondiale.",
  },
  {
    title: 'GeoDNS et routage multi-région',
    added: ['geoDns'],
    note: "Le DNS ne renvoie plus toujours la même IP : il route chaque utilisateur vers le centre de données le plus proche géographiquement, réduisant la latence réseau bien au-delà de ce que le CDN seul permet pour le trafic dynamique.",
  },
  {
    title: 'Web tier sans état (stateless)',
    added: ['sessionStore'],
    note: "Les sessions utilisateur sortent de la mémoire de chaque serveur web vers un store partagé. N'importe quel serveur peut alors traiter n'importe quelle requête — le scaling horizontal devient réellement sans limite.",
  },
  {
    title: 'File de messages',
    added: ['queue', 'worker'],
    note: "Les tâches lourdes ou non-urgentes (envoi d'email, génération de rapport) sont mises en file et traitées en arrière-plan par des workers — le serveur web répond immédiatement sans attendre.",
  },
  {
    title: 'Supervision & logs',
    added: ['monitoring'],
    note: "Logging centralisé, métriques et alertes deviennent indispensables : à cette échelle, on ne peut plus se connecter à chaque serveur pour comprendre ce qui se passe.",
  },
  {
    title: 'Sharding de la base',
    added: ['shard'],
    note: "Quand une seule base (même répliquée) ne suffit plus en écriture, les données sont réparties entre plusieurs bases (shards) selon une clé (ex: ID utilisateur). Dernière étape avant l'échelle des géants du web.",
  },
]

const BOX_META = {
  client: { emoji: '📱', label: 'Client' },
  server: { emoji: '🖥️', label: 'Serveur (web+app+DB)' },
  db: { emoji: '🗄️', label: 'Base de données' },
  lb: { emoji: '⚖️', label: 'Load Balancer' },
  web2: { emoji: '🖥️', label: 'Serveur web #2' },
  ssl: { emoji: '🔒', label: 'HTTPS / TLS' },
  healthCheck: { emoji: '🩺', label: 'Health Check' },
  dbReplica: { emoji: '🗄️', label: 'Réplique (lecture)' },
  dbIndex: { emoji: '📇', label: 'Index DB' },
  cache: { emoji: '⚡', label: 'Cache' },
  cdn: { emoji: '🌍', label: 'CDN' },
  geoDns: { emoji: '🗺️', label: 'GeoDNS' },
  sessionStore: { emoji: '🔑', label: 'Session Store' },
  queue: { emoji: '📬', label: 'File de messages' },
  worker: { emoji: '⚙️', label: 'Worker' },
  monitoring: { emoji: '📊', label: 'Monitoring' },
  shard: { emoji: '🧩', label: 'Shards' },
}

function ArchitectureEvolutionDemo() {
  const player = useStepPlayer(STEPS.length, 1400)
  const visible = new Set()
  for (let i = 0; i <= player.index; i++) {
    for (const key of STEPS[i].added) visible.add(key)
  }
  const justAdded = new Set(STEPS[player.index].added)

  return (
    <div className="viz-demo">
      <p className="viz-demo__hint">
        Étape {player.index + 1}/{STEPS.length} — <strong>{STEPS[player.index].title}</strong>
      </p>

      <div className="viz-demo__row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.keys(BOX_META)
          .filter((key) => visible.has(key))
          .map((key) => (
            <div
              key={key}
              className={`viz-demo__box ${justAdded.has(key) ? 'viz-demo__box--active' : 'viz-demo__box--success'}`}
            >
              {BOX_META[key].emoji} {BOX_META[key].label}
            </div>
          ))}
      </div>

      <p className="viz-demo__note">{STEPS[player.index].note}</p>

      <StepControls
        index={player.index}
        stepCount={STEPS.length}
        isDone={player.isDone}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.togglePlay}
        onNext={player.next}
      />
    </div>
  )
}

export default ArchitectureEvolutionDemo

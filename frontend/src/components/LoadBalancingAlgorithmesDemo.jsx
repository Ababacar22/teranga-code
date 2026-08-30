import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  {
    key: 'round-robin',
    icon: '🔄',
    label: 'Round-robin',
    result: 'A → B → C → A → ...',
    note: "Chaque requête va au serveur suivant dans la liste, en boucle. Simple et prévisible, mais ignore la charge réelle de chaque serveur.",
  },
  {
    key: 'least-connections',
    icon: '📉',
    label: 'Least connections',
    result: 'Le moins chargé gagne',
    note: "La requête part vers le serveur qui a le moins de connexions actives en ce moment. Plus juste quand les requêtes ont des durées très différentes.",
  },
  {
    key: 'ip-hash',
    icon: '🔑',
    label: 'IP hash',
    result: 'Même client → même serveur',
    note: "Une fonction de hash sur l'IP du client détermine toujours le même serveur cible. Utile pour garder un client 'collé' à la même instance (sessions en mémoire).",
  },
]

function LoadBalancingAlgorithmesDemo() {
  return (
    <SelectorRouteDemo
      hint="Compare trois algorithmes de répartition de charge."
      options={OPTIONS}
      placeholder="Clique sur un algorithme pour voir comment il choisit le serveur cible."
    />
  )
}

export default LoadBalancingAlgorithmesDemo

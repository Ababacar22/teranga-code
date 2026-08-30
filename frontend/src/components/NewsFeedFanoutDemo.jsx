import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  {
    key: 'fanout-write',
    icon: '✍️',
    label: 'Fan-out on write',
    result: 'Écriture coûteuse, lecture instantanée',
    note: "À chaque publication, le post est poussé dans le fil pré-calculé de CHAQUE abonné. Rapide à lire, mais catastrophique pour un compte à des millions de followers.",
  },
  {
    key: 'fanout-read',
    icon: '📖',
    label: 'Fan-out on read',
    result: 'Écriture simple, lecture plus lente',
    note: "Le fil est assemblé à la volée à chaque ouverture de l'app, en agrégeant les posts récents des comptes suivis. Simple à écrire, plus coûteux à chaque lecture.",
  },
  {
    key: 'hybrid',
    icon: '⚖️',
    label: 'Hybride',
    result: 'Le meilleur des deux, selon le compte',
    note: "Fan-out on write pour les comptes normaux, fan-out on read pour les comptes à très forte audience. C'est l'approche utilisée par la plupart des grands réseaux sociaux en production.",
  },
]

function NewsFeedFanoutDemo() {
  return (
    <SelectorRouteDemo
      hint="Compare les stratégies de diffusion d'un fil d'actualité à grande échelle."
      options={OPTIONS}
      placeholder="Clique sur une stratégie pour voir son compromis écriture/lecture."
    />
  )
}

export default NewsFeedFanoutDemo

import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  {
    key: 'write-through',
    icon: '✍️',
    label: 'Write-through',
    result: 'Cache + BD écrits ensemble',
    note: "Chaque écriture met à jour le cache ET la base de données avant de répondre. Lent mais le cache est toujours cohérent avec la BD.",
  },
  {
    key: 'write-back',
    icon: '⏳',
    label: 'Write-back',
    result: 'Cache écrit, BD différée',
    note: "L'écriture répond dès que le cache est mis à jour ; la base est synchronisée plus tard, en arrière-plan. Rapide, mais risque de perte de données si le cache tombe avant la synchro.",
  },
  {
    key: 'cache-aside',
    icon: '🔍',
    label: 'Cache-aside',
    result: "L'appli gère le cache",
    note: "L'application vérifie le cache d'abord ; si absent (cache miss), elle lit la BD et remplit le cache elle-même. Le pattern le plus courant, simple mais laisse une fenêtre de miss.",
  },
]

function CacheStrategiesDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis une stratégie de cache pour voir comment elle traite une écriture."
      options={OPTIONS}
      placeholder="Clique sur une stratégie pour voir son comportement à l'écriture."
    />
  )
}

export default CacheStrategiesDemo

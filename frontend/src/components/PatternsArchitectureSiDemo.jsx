import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  {
    key: 'appel-direct',
    icon: '📞',
    label: 'Appel direct',
    result: 'Service A → attend → Service B',
    note: "Le service A appelle B et attend sa réponse avant de continuer. Simple à suivre, mais A et B sont couplés : si B est lent ou tombe, A est bloqué aussi.",
  },
  {
    key: 'evenementiel',
    icon: '📡',
    label: 'Événementiel',
    result: 'Service A publie, continue',
    note: "Le service A publie un événement et continue immédiatement son travail. D'autres services réagissent à l'événement quand ils le peuvent. Découplé et résilient, mais plus dur à tracer.",
  },
]

function PatternsArchitectureSiDemo() {
  return (
    <SelectorRouteDemo
      hint="Compare la communication directe entre services et la communication par événements."
      options={OPTIONS}
      placeholder="Clique sur un pattern pour voir comment les services communiquent."
    />
  )
}

export default PatternsArchitectureSiDemo

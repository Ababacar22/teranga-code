import SelectorRouteDemo from './SelectorRouteDemo'

const MONTANT = 1000

const OPTIONS = [
  { key: 'carte', icon: '💳', label: 'carte', result: `${Math.round(MONTANT * 1.02)} FCFA`, note: 'strategies.carte applique 2% de frais.' },
  { key: 'wave', icon: '📲', label: 'wave', result: `${Math.round(MONTANT * 1.01)} FCFA`, note: 'strategies.wave applique 1% de frais.' },
  { key: 'especes', icon: '💵', label: 'espèces', result: `${MONTANT} FCFA`, note: 'strategies.especes ne change rien au montant.' },
]

function StrategyDemo() {
  return (
    <SelectorRouteDemo
      hint={`Pour un montant de ${MONTANT} FCFA, choisis un mode de paiement : chaque stratégie calcule différemment.`}
      options={OPTIONS}
      placeholder="Clique un mode de paiement pour voir le total calculé."
    />
  )
}

export default StrategyDemo

import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  { key: 'cp', icon: '🔒', label: 'Système CP', result: 'Refuse plutôt que risquer', note: "En cas de coupure réseau, le nœud minoritaire refuse d'écrire — mieux vaut aucune réponse qu'une réponse incohérente." },
  { key: 'ap', icon: '🌍', label: 'Système AP', result: 'Répond quand même', note: 'En cas de coupure, le nœud répond avec ses données locales, potentiellement périmées, plutôt que de rien répondre.' },
]

function CapTheoremDemo() {
  return (
    <SelectorRouteDemo
      hint="Une coupure réseau survient entre deux nœuds. Choisis une stratégie."
      options={OPTIONS}
      placeholder="Clique une stratégie pour voir son comportement pendant la coupure."
    />
  )
}

export default CapTheoremDemo

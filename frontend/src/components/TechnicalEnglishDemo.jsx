import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  {
    key: 'architecture',
    icon: '🏗️',
    label: 'Décrire une architecture',
    result: '"This component is responsible for..."',
    note: "Utilise 'responsible for' pour décrire un rôle, 'talks to' ou 'communicates with' pour une dépendance entre services.",
  },
  {
    key: 'tradeoff',
    icon: '⚖️',
    label: 'Expliquer un compromis',
    result: '"The trade-off here is between X and Y."',
    note: "'Trade-off' est LE mot-clé attendu en entretien technique anglophone — l'utiliser naturellement signale une bonne maîtrise des enjeux.",
  },
  {
    key: 'role',
    icon: '👤',
    label: 'Parler de son rôle',
    result: '"I owned / led this project."',
    note: "Préfère 'I owned' ou 'I led' à 'I worked on' — ces verbes signalent une prise de responsabilité, très valorisée en culture anglo-saxonne.",
  },
]

function TechnicalEnglishDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis une situation d'entretien pour voir la formulation anglaise attendue."
      options={OPTIONS}
      placeholder="Clique sur une situation pour voir le vocabulaire technique adapté."
    />
  )
}

export default TechnicalEnglishDemo

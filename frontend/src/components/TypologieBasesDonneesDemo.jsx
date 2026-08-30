import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  {
    key: 'relationnelle',
    icon: '🗂️',
    label: 'Relationnelle',
    result: 'Tables + jointures + SQL',
    note: "Données structurées en tables liées par des clés, avec des contraintes fortes (schéma fixe, transactions ACID). Idéale quand la cohérence prime : facturation, comptes bancaires.",
  },
  {
    key: 'document',
    icon: '📄',
    label: 'Document (NoSQL)',
    result: 'JSON imbriqué, sans schéma fixe',
    note: "Chaque enregistrement est un document flexible (souvent JSON). Pratique pour des données hétérogènes qui évoluent vite : catalogues produits, profils utilisateurs.",
  },
  {
    key: 'graphe',
    icon: '🕸️',
    label: 'Graphe',
    result: 'Nœuds + relations directes',
    note: "Les relations entre entités sont stockées comme des liens de première classe, pas recalculées par jointure. Parfait pour les réseaux sociaux, recommandations, détection de fraude.",
  },
]

function TypologieBasesDonneesDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis un type de base de données pour voir à quoi elle sert le mieux."
      options={OPTIONS}
      placeholder="Clique sur un type pour découvrir son terrain de jeu idéal."
    />
  )
}

export default TypologieBasesDonneesDemo

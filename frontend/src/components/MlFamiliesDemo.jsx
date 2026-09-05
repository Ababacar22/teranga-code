import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  {
    key: 'supervised',
    icon: '🏷️',
    label: 'Supervisé',
    result: 'Exemples déjà étiquetés',
    note: "Le modèle apprend à partir d'exemples dont la bonne réponse est connue (ex: emails marqués spam/non-spam) pour prédire l'étiquette de nouveaux cas.",
  },
  {
    key: 'unsupervised',
    icon: '🔍',
    label: 'Non-supervisé',
    result: 'Aucune étiquette, structure cachée',
    note: "Le modèle cherche des structures ou regroupements dans des données SANS étiquette connue — ex: segmenter des clients en groupes similaires.",
  },
  {
    key: 'reinforcement',
    icon: '🎮',
    label: 'Par renforcement',
    result: 'Essais-erreurs + récompense',
    note: "Un agent apprend en interagissant avec un environnement, récompensé ou pénalisé selon ses actions — ex: un programme qui apprend à jouer à un jeu.",
  },
]

function MlFamiliesDemo() {
  return (
    <SelectorRouteDemo
      hint="Compare les trois grandes familles du Machine Learning."
      options={OPTIONS}
      placeholder="Clique sur une famille pour voir comment elle apprend."
    />
  )
}

export default MlFamiliesDemo

import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  { key: 'ailes', icon: '🦆', label: 'ailes', result: '"vole avec ses ailes"', note: 'Le comportement injecté détermine le résultat de canard.voler() — sans créer de nouvelle classe.' },
  { key: 'moteur', icon: '🚀', label: 'moteur', result: '"vole avec un moteur"', note: 'Même méthode voler(), comportement totalement différent selon la dépendance injectée.' },
  { key: 'aucun', icon: '🚫', label: 'aucun', result: '"ne peut pas voler"', note: 'On peut même injecter un comportement qui empêche de voler, sans toucher à la classe Canard.' },
]

function CompositionDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis le comportement de vol injecté dans ce Canard."
      options={OPTIONS}
      placeholder="Clique un comportement pour voir ce que renvoie canard.voler()."
    />
  )
}

export default CompositionDemo

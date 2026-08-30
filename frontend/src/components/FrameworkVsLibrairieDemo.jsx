import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  { key: 'lib', icon: '📚', label: 'Librairie (date-fns)', result: 'TOI appelles la fonction', note: 'Tu gardes le contrôle du flux — la librairie attend d’être sollicitée, quand tu le décides.' },
  { key: 'fw', icon: '🧩', label: 'Framework (React)', result: 'LUI t’appelle (inversion de contrôle)', note: 'React décide quand rendre ton composant — ton code s’insère dans SA structure, pas l’inverse.' },
]

function FrameworkVsLibrairieDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis un outil pour voir qui contrôle réellement l'exécution."
      options={OPTIONS}
      placeholder="Clique une option pour voir qui appelle qui."
    />
  )
}

export default FrameworkVsLibrairieDemo

import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  { key: 'react', icon: '⚛️', label: 'React', result: 'Liberté maximale', note: 'JSX mélange logique et affichage dans une fonction — flexible, peu de conventions imposées.' },
  { key: 'vue', icon: '💚', label: 'Vue', result: 'Compromis accessible', note: 'Template déclaratif séparé de la logique — syntaxe lisible même sans grande expérience JS.' },
  { key: 'angular', icon: '🅰️', label: 'Angular', result: 'Structure imposée', note: 'TypeScript, injection de dépendances, CLI officiel — le plus directif des trois.' },
]

function ReactVueAngularDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis un framework pour voir sa philosophie dominante."
      options={OPTIONS}
      placeholder="Clique un framework pour voir son approche."
    />
  )
}

export default ReactVueAngularDemo

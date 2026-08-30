import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  { key: 'vite', icon: '⚡', label: 'Vite', result: 'Quasi instantané en dev', note: 'Sert les modules natifs du navigateur en développement, ne bundle vraiment qu’au build final.' },
  { key: 'webpack', icon: '📦', label: 'Webpack', result: 'Très configurable', note: 'Le bundler historique, réputé plus lent et plus complexe à paramétrer que Vite.' },
  { key: 'esbuild', icon: '🚀', label: 'esbuild', result: 'Ultra-rapide (Go)', note: 'Écrit dans un langage compilé plutôt qu’en JS — souvent utilisé comme moteur interne d’autres outils.' },
]

function BundlersDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis un bundler pour voir ce qui le distingue des autres."
      options={OPTIONS}
      placeholder="Clique un bundler pour voir son atout principal."
    />
  )
}

export default BundlersDemo

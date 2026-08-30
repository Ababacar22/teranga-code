import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  { key: 'node', icon: '🟢', label: 'Node.js', result: 'Accès système libre', note: 'Écosystème npm le plus mature — mais accès fichiers/réseau libre par défaut, sans permissions.' },
  { key: 'deno', icon: '🦕', label: 'Deno', result: 'Sécurité par défaut', note: 'Permissions explicites requises (--allow-read...), TypeScript natif sans configuration.' },
  { key: 'bun', icon: '🥟', label: 'Bun', result: 'Vitesse tout-en-un', note: 'Runtime + bundler + gestionnaire de paquets réunis, compatible avec l’API Node existante.' },
]

function NodeDenoBunDemo() {
  return (
    <SelectorRouteDemo
      hint="Choisis un runtime pour voir son argument de conception principal."
      options={OPTIONS}
      placeholder="Clique un runtime pour voir ce qui le distingue."
    />
  )
}

export default NodeDenoBunDemo

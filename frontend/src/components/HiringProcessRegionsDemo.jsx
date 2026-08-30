import SelectorRouteDemo from './SelectorRouteDemo'

const OPTIONS = [
  {
    key: 'usa',
    icon: '🇺🇸',
    label: 'USA',
    result: 'Onsite loop, 4-6 entretiens en 1 jour',
    note: "Algo (LeetCode medium/hard) + system design + behavioral (STAR). Un 'bar raiser' externe à l'équipe peut avoir un droit de veto sur l'offre.",
  },
  {
    key: 'france',
    icon: '🇫🇷',
    label: 'France',
    result: '2-3 tours, process plus variable',
    note: "Technique (souvent moins algo pur) puis culture fit, parfois un test à domicile. L'anglais n'est pas systématique sauf entreprises internationales.",
  },
  {
    key: 'golfe',
    icon: '🌍',
    label: 'Moyen-Orient',
    result: 'Process rapide, anglais oral requis',
    note: "Souvent 1-4 semaines. Anglais oral quasi systématique, et discussion de package incluant logement/relocation, pas seulement le salaire.",
  },
]

function HiringProcessRegionsDemo() {
  return (
    <SelectorRouteDemo
      hint="Compare le format d'entretien attendu selon la région ciblée."
      options={OPTIONS}
      placeholder="Clique sur une région pour voir le format de recrutement typique."
    />
  )
}

export default HiringProcessRegionsDemo

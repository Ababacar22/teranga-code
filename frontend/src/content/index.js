import { getLanguage } from '../lib/language'
import * as fr from './content.fr.js'
import * as en from './content.en.js'

// La langue est lue une seule fois au chargement (changer de langue
// déclenche un rechargement complet de la page, voir lib/language.js) —
// ce module reste donc un simple aiguillage statique, sans logique
// réactive à maintenir dans chaque composant consommateur.
const active = getLanguage() === 'en' ? en : fr

export const villes = active.villes
export const orderedVilles = active.orderedVilles
export const getUnlockInfo = active.getUnlockInfo
export const getVille = active.getVille
export const getTopic = active.getTopic
export const getAllTopics = active.getAllTopics

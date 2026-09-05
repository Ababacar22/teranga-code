import designPatterns from './topics/designPatterns.json'
import outils from './topics/outils.json'
import algorithmie from './topics/algorithmie.json'
import architecture from './topics/architecture.json'
import qualiteSecurite from './topics/qualiteSecurite.json'
import poo from './topics/poo.json'
import frameworksEcosysteme from './topics/frameworksEcosysteme.json'
import webReseaux from './topics/webReseaux.json'
import cloudDistribue from './topics/cloudDistribue.json'
import architectureSI from './topics/architectureSI.json'
import systemDesign from './topics/systemDesign.json'
import carriereInternationale from './topics/carriereInternationale.json'
import fintech from './topics/fintech.json'
import iaMachineLearning from './topics/iaMachineLearning.json'
import { createContentHelpers } from './unlockLogic'

export const villes = [
  {
    id: 'dakar',
    name: 'Dakar',
    rubrique: 'Design Patterns',
    icon: '🧩',
    lonLat: [-17.4467, 14.6928],
    topics: designPatterns,
    discovery: {
      facts: [
        "Dakar est la capitale du Sénégal et le point le plus à l'ouest du continent africain, sur la presqu'île du Cap-Vert.",
        "Le Monument de la Renaissance africaine, l'une des plus hautes statues d'Afrique, domine la ville depuis les Mamelles.",
        "Ville portuaire dynamique, Dakar est aussi devenue un pôle technologique majeur en Afrique de l'Ouest.",
        "Le rallye Dakar tire historiquement son nom de la ville, qui en était la destination finale avant son déplacement en Amérique du Sud.",
        "Le wolof est la langue la plus parlée au quotidien dans les rues de Dakar, aux côtés du français, langue officielle.",
        "Dakar accueille le siège de nombreuses organisations internationales et institutions financières régionales, confirmant son rôle de hub économique ouest-africain.",
        "La Corniche de Dakar, qui longe l'océan Atlantique, est un lieu de vie populaire pour le sport et la détente au coucher du soleil.",
      ],
      quickFacts: {
        population: '~1,2 million d’habitants (agglomération : plus de 3 millions)',
        specialite: 'Le thiéboudienne, plat national à base de riz et de poisson',
        langues: 'Wolof et français',
      },
      quiz: [
        {
          question: 'Quelle langue est la plus parlée au quotidien à Dakar ?',
          options: ['Le wolof', "L'anglais", 'Le peul'],
          correctIndex: 0,
        },
        {
          question: 'Quel monument domine Dakar depuis les Mamelles ?',
          options: ['Le Monument de la Renaissance africaine', 'La Tour Eiffel', 'La Grande Mosquée de Touba'],
          correctIndex: 0,
        },
        {
          question: 'Dakar se situe à quelle extrémité du continent africain ?',
          options: ['Le point le plus à l’ouest', 'Le point le plus au nord', 'Le point le plus au sud'],
          correctIndex: 0,
        },
        {
          question: 'Quel océan borde la ville de Dakar ?',
          options: ['L’océan Atlantique', 'L’océan Indien', 'La mer Méditerranée'],
          correctIndex: 0,
        },
        {
          question: 'Quel rôle économique joue Dakar en Afrique de l’Ouest ?',
          options: [
            'Un hub économique et financier régional',
            'Une ville essentiellement agricole isolée',
            'Un simple village de pêcheurs sans activité économique',
          ],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'saint-louis',
    name: 'Saint-Louis',
    rubrique: 'Outils & DevOps',
    icon: '🛠️',
    lonLat: [-16.4818, 16.0326],
    topics: outils,
    discovery: {
      facts: [
        "Saint-Louis fut la capitale de l'Afrique-Occidentale française jusqu'en 1902, avant Dakar.",
        "Son île historique, classée au patrimoine mondial de l'UNESCO, est célèbre pour son architecture coloniale colorée.",
        "Le pont Faidherbe, construit à la fin du XIXe siècle, relie l'île au continent au-dessus du fleuve Sénégal.",
        "Chaque année, le Saint-Louis Jazz Festival attire des musiciens et festivaliers venus du monde entier.",
        "Les pêcheurs de Saint-Louis utilisent encore aujourd'hui des pirogues colorées traditionnelles, image emblématique de la ville.",
        "Saint-Louis a donné son nom à toute une scène musicale et artistique, en résonance avec son riche passé culturel.",
        "La ville est bordée par le fleuve Sénégal, qui a longtemps servi de voie de commerce entre l'intérieur des terres et l'océan.",
      ],
      quickFacts: {
        population: '~250 000 habitants',
        specialite: 'La pêche artisanale et les pirogues colorées',
        langues: 'Wolof et français',
      },
      quiz: [
        {
          question: 'Saint-Louis fut la capitale de quelle entité coloniale avant Dakar ?',
          options: ["L'Afrique-Occidentale française", 'L’Empire du Mali', 'Le Sénégal indépendant'],
          correctIndex: 0,
        },
        {
          question: 'Quel pont emblématique relie l’île de Saint-Louis au continent ?',
          options: ['Le pont Faidherbe', 'Le pont de Millau', 'Le pont Léopold Sédar Senghor'],
          correctIndex: 0,
        },
        {
          question: 'Quel festival musical rend Saint-Louis célèbre chaque année ?',
          options: ['Le Saint-Louis Jazz Festival', 'Le Festival de Cannes', 'Coachella'],
          correctIndex: 0,
        },
        {
          question: 'Quel fleuve borde la ville de Saint-Louis ?',
          options: ['Le fleuve Sénégal', 'Le fleuve Niger', 'Le fleuve Congo'],
          correctIndex: 0,
        },
        {
          question: 'Sur quel type de site l’île historique de Saint-Louis est-elle construite ?',
          options: ['Une île sur le fleuve Sénégal, classée UNESCO', 'Une presqu’île volcanique', 'Un plateau désertique'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'thies',
    name: 'Thiès',
    rubrique: 'Algorithmie & structures de données',
    icon: '🧮',
    lonLat: [-16.9246, 14.791],
    topics: algorithmie,
    discovery: {
      facts: [
        "Thiès fut un carrefour ferroviaire essentiel de la ligne Dakar-Niger, au cœur de l'histoire industrielle du Sénégal.",
        "La ville abrite les célèbres Manufactures Sénégalaises des Arts Décoratifs, reconnues pour leurs tapisseries tissées à la main.",
        "Troisième ville du pays, elle reste un carrefour commercial et culturel important.",
        "Thiès est parfois surnommée la ville aux 'deux gares', héritage de son passé de grand centre ferroviaire.",
        "La région est aussi connue pour ses activités agricoles, notamment la culture de l'arachide et du mil.",
        "Thiès est parfois surnommée la « capitale du rail » du Sénégal, en lien avec son passé de nœud ferroviaire majeur.",
        "La ville abrite également d'importantes carrières de phosphates, une ressource économique clé pour le pays.",
      ],
      quickFacts: {
        population: '~320 000 habitants',
        specialite: 'Les tapisseries tissées à la main',
        langues: 'Wolof et français',
      },
      quiz: [
        {
          question: 'Pourquoi Thiès fut-elle historiquement importante au Sénégal ?',
          options: ['Carrefour ferroviaire de la ligne Dakar-Niger', 'Capitale religieuse', 'Port principal du pays'],
          correctIndex: 0,
        },
        {
          question: 'Pour quel artisanat Thiès est-elle réputée ?',
          options: ['Les tapisseries tissées à la main', 'La poterie', 'Le travail du cuir'],
          correctIndex: 0,
        },
        {
          question: 'Quelle est la place de Thiès parmi les villes du Sénégal ?',
          options: ['La troisième ville du pays', 'La capitale', 'La plus petite ville'],
          correctIndex: 0,
        },
        {
          question: 'Quelle ressource minière est associée à la région de Thiès ?',
          options: ['Le phosphate', 'Le pétrole', 'L’or'],
          correctIndex: 0,
        },
        {
          question: 'Quel surnom est parfois donné à Thiès en lien avec son histoire ferroviaire ?',
          options: ['« La capitale du rail »', '« La ville des mille lacs »', '« La cité interdite »'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'touba',
    name: 'Touba',
    rubrique: 'Architecture & systèmes',
    icon: '🏗️',
    lonLat: [-15.8833, 14.85],
    topics: architecture,
    discovery: {
      facts: [
        'Touba est la capitale spirituelle du mouridisme, confrérie soufie fondée par Cheikh Ahmadou Bamba.',
        "Sa Grande Mosquée, l'une des plus grandes d'Afrique, est un chef-d'œuvre architectural visible de loin.",
        'Chaque année, le Grand Magal de Touba rassemble des millions de pèlerins venus du monde entier.',
        'Le Grand Magal commémore le départ en exil de Cheikh Ahmadou Bamba en 1895, un événement fondateur pour la confrérie.',
        "Touba fonctionne en grande partie selon des règles propres à la confrérie mouride, avec une organisation urbaine particulière.",
        'Touba est administrée selon une organisation propre à la confrérie mouride, distincte de l’administration classique des autres villes.',
        'La ville a connu une croissance démographique très rapide, portée par son attractivité religieuse et économique.',
      ],
      quickFacts: {
        population: 'plusieurs centaines de milliers d’habitants (bien plus lors du Grand Magal)',
        specialite: 'Capitale spirituelle du mouridisme',
        langues: 'Wolof et français',
      },
      quiz: [
        {
          question: 'Qui a fondé la confrérie mouride, dont Touba est la capitale spirituelle ?',
          options: ['Cheikh Ahmadou Bamba', 'Léopold Sédar Senghor', 'El Hadj Malick Sy'],
          correctIndex: 0,
        },
        {
          question: 'Que commémore le Grand Magal de Touba ?',
          options: ["Le départ en exil de Cheikh Ahmadou Bamba en 1895", "L'indépendance du Sénégal", 'La construction du pont Faidherbe'],
          correctIndex: 0,
        },
        {
          question: 'Qu’abrite la Grande Mosquée de Touba ?',
          options: ["L'une des plus grandes mosquées d'Afrique", "Un musée d'art colonial", 'Un aéroport'],
          correctIndex: 0,
        },
        {
          question: 'Comment est administrée la ville de Touba par rapport aux autres villes du Sénégal ?',
          options: [
            'Selon une organisation propre liée à la confrérie mouride',
            'Exactement comme toutes les autres villes, sans particularité',
            'Par un gouvernement étranger',
          ],
          correctIndex: 0,
        },
        {
          question: 'Qu’est-ce qui explique la croissance rapide de la population de Touba ?',
          options: [
            'Son attractivité religieuse et économique liée au mouridisme',
            'Une politique de délocalisation forcée',
            'Un climat exceptionnellement favorable à l’agriculture',
          ],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'kaolack',
    name: 'Kaolack',
    rubrique: 'Sécurité & qualité de code',
    icon: '🛡️',
    lonLat: [-16.0728, 14.1517],
    topics: qualiteSecurite,
    discovery: {
      facts: [
        "Kaolack fut historiquement l'un des plus grands centres de commerce de l'arachide en Afrique de l'Ouest.",
        'La ville est connue pour ses immenses salines à ciel ouvert, visibles depuis les airs.',
        "Elle se situe à proximité du delta du Saloum, classé réserve de biosphère par l'UNESCO.",
        "Kaolack est traversée par le fleuve Saloum, dont l'estuaire abrite une riche mangrove protégée.",
        'La ville reste un carrefour commercial stratégique entre Dakar, la Gambie et le sud du Sénégal.',
        'Kaolack fut longtemps desservie par une ligne de chemin de fer reliant la ville à Dakar, facilitant l’export de l’arachide vers le port.',
        'La région autour de Kaolack fait partie du bassin arachidier historique du Sénégal, cœur de l’économie agricole du pays au XXe siècle.',
      ],
      quickFacts: {
        population: '~230 000 habitants',
        specialite: 'Le sel extrait des salines à ciel ouvert',
        langues: 'Wolof, sérère et français',
      },
      quiz: [
        {
          question: 'Pour quel produit agricole Kaolack fut-elle historiquement un grand centre de commerce ?',
          options: ["L'arachide", 'Le café', 'Le cacao'],
          correctIndex: 0,
        },
        {
          question: 'Quel écosystème protégé se trouve à proximité de Kaolack ?',
          options: ['Le delta du Saloum', "La forêt amazonienne", 'Le désert du Sahara'],
          correctIndex: 0,
        },
        {
          question: 'Que peut-on observer depuis les airs près de Kaolack ?',
          options: ['D’immenses salines à ciel ouvert', 'Des volcans actifs', 'Des glaciers'],
          correctIndex: 0,
        },
        {
          question: 'À quel grand bassin agricole historique la région de Kaolack appartient-elle ?',
          options: ['Le bassin arachidier', 'Le bassin viticole', 'Le bassin caféier'],
          correctIndex: 0,
        },
        {
          question: 'Comment l’arachide produite près de Kaolack était-elle historiquement exportée ?',
          options: ['Par chemin de fer jusqu’au port de Dakar', 'Par avion cargo', 'Elle n’était jamais exportée'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'ziguinchor',
    name: 'Ziguinchor',
    rubrique: 'POO & paradigmes',
    icon: '🌳',
    lonLat: [-16.2719, 12.5833],
    topics: poo,
    discovery: {
      facts: [
        'Ziguinchor est la principale ville de la Casamance, région du sud du Sénégal séparée par la Gambie.',
        'Le fleuve Casamance et ses mangroves façonnent un paysage verdoyant, bien différent du nord sahélien.',
        'La région est réputée pour la richesse de sa végétation, sa culture rizicole et son artisanat.',
        'La Casamance est réputée pour la diversité de ses ethnies, notamment les Diolas, et pour ses traditions culturelles fortes.',
        "Le climat plus humide de la Casamance permet une riziculture en bas-fonds, différente du reste du pays.",
        'Ziguinchor est un port fluvial sur le fleuve Casamance, historiquement utilisé pour le commerce entre la région et l’extérieur.',
        'La Casamance est aussi réputée pour ses cases à impluvium, une architecture traditionnelle typique de certaines ethnies de la région.',
      ],
      quickFacts: {
        population: '~230 000 habitants',
        specialite: 'La riziculture et l’artisanat casamançais',
        langues: 'Diola, wolof et français',
      },
      quiz: [
        {
          question: 'Ziguinchor est la principale ville de quelle région du Sénégal ?',
          options: ['La Casamance', 'Le Sahel', 'La région de Dakar'],
          correctIndex: 0,
        },
        {
          question: 'Quel pays sépare géographiquement la Casamance du reste du Sénégal ?',
          options: ['La Gambie', 'Le Mali', 'La Guinée'],
          correctIndex: 0,
        },
        {
          question: 'Quelle activité agricole est particulièrement développée en Casamance grâce à son climat humide ?',
          options: ['La riziculture', 'La viticulture', "L'élevage de rennes"],
          correctIndex: 0,
        },
        {
          question: 'Ziguinchor est un port situé sur quel type de voie d’eau ?',
          options: ['Un fleuve (le fleuve Casamance)', 'Un océan directement', 'Un lac artificiel'],
          correctIndex: 0,
        },
        {
          question: 'Qu’est-ce qu’une case à impluvium, typique de certaines zones de Casamance ?',
          options: [
            'Une architecture traditionnelle conçue pour recueillir l’eau de pluie',
            'Un type de bateau de pêche',
            'Un marché couvert moderne',
          ],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'louga',
    name: 'Louga',
    rubrique: 'Frameworks & Écosystème',
    icon: '⚙️',
    lonLat: [-16.2247, 15.6144],
    topics: frameworksEcosysteme,
    discovery: {
      facts: [
        "Louga est une ville du nord du Sénégal, à un carrefour historique entre la côte et l'intérieur du pays, sur la route reliant Dakar à Saint-Louis et à la Mauritanie.",
        "La région de Louga est réputée pour son importante diaspora : de nombreux Sénégalais installés à l'étranger, notamment en Europe, en sont originaires.",
        "Le climat sahélien de la région a façonné une économie historiquement tournée vers l'élevage et le commerce du bétail.",
        "Louga a longtemps servi d'étape caravanière entre le littoral atlantique et les routes commerciales vers l'intérieur des terres.",
        "La ville continue de jouer un rôle de carrefour routier important dans le nord du Sénégal.",
        'Louga se situe dans une zone de transition entre les terres agricoles plus au sud et les paysages plus arides du Sahel sénégalais.',
        'La ville accueille un grand marché régional qui attire des commerçants de toute la zone nord du pays.',
      ],
      quickFacts: {
        population: '~130 000 habitants',
        specialite: 'Le commerce du bétail et une forte tradition d’émigration',
        langues: 'Wolof et français',
      },
      quiz: [
        {
          question: 'Louga se situe sur quel axe routier historique ?',
          options: ['Entre Dakar, Saint-Louis et la Mauritanie', 'Entre Dakar et la Casamance', 'Entre Thiès et la Gambie'],
          correctIndex: 0,
        },
        {
          question: 'Pour quoi la région de Louga est-elle particulièrement connue ?',
          options: ['Une importante diaspora sénégalaise à l’étranger', 'La plus grande forêt du pays', 'Les plus hautes montagnes du Sénégal'],
          correctIndex: 0,
        },
        {
          question: 'Quel climat caractérise la région de Louga ?',
          options: ['Un climat sahélien semi-aride', 'Un climat tropical humide', 'Un climat désertique absolu'],
          correctIndex: 0,
        },
        {
          question: 'Louga se situe dans quel type de zone climatique de transition ?',
          options: [
            'Entre terres agricoles et paysages sahéliens plus arides',
            'Entre une forêt tropicale et un désert de sable',
            'Entre deux grandes chaînes de montagnes',
          ],
          correctIndex: 0,
        },
        {
          question: 'Qu’est-ce qui attire des commerçants de toute la région nord vers Louga ?',
          options: ['Un grand marché régional', 'Un aéroport international', 'Une usine unique au pays'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'tambacounda',
    name: 'Tambacounda',
    rubrique: 'Web & Réseaux',
    icon: '🦁',
    lonLat: [-13.6673, 13.7707],
    topics: webReseaux,
    discovery: {
      facts: [
        "Tambacounda est la plus grande région du Sénégal en superficie, à l'est du pays, à la frontière avec le Mali.",
        'La ville est un important carrefour routier et ferroviaire, historiquement traversée par la ligne de chemin de fer Dakar-Niger.',
        "Tambacounda se situe à proximité du parc national du Niokolo-Koba, classé au patrimoine mondial de l'UNESCO pour sa biodiversité exceptionnelle.",
        'La région abrite une grande diversité ethnique, avec notamment une importante présence mandingue et peule.',
        'Le climat de Tambacounda est parmi les plus chauds du Sénégal, avec des températures très élevées en saison sèche.',
        'La ville joue un rôle de porte d’entrée vers le Mali et la Guinée, au carrefour de plusieurs routes régionales.',
        'L’agriculture et l’élevage restent des activités économiques majeures de la région de Tambacounda.',
      ],
      quickFacts: {
        population: '~130 000 habitants',
        specialite: 'Porte d’entrée vers le Niokolo-Koba et le Mali',
        langues: 'Mandingue, peul, wolof et français',
      },
      quiz: [
        {
          question: 'Tambacounda est la plus grande région du Sénégal en quoi ?',
          options: ['Superficie', 'Population', 'Nombre de plages'],
          correctIndex: 0,
        },
        {
          question: 'Quel célèbre parc national se trouve à proximité de Tambacounda ?',
          options: ['Le parc national du Niokolo-Koba', 'Le parc de Yellowstone', 'Le parc Kruger'],
          correctIndex: 0,
        },
        {
          question: 'Avec quel pays la région de Tambacounda partage-t-elle une frontière ?',
          options: ['Le Mali', 'Le Maroc', "L'Algérie"],
          correctIndex: 0,
        },
        {
          question: 'Quelles langues, en plus du wolof et du français, sont couramment parlées dans la région de Tambacounda ?',
          options: ['Le mandingue et le peul', 'Le mandarin et le russe', "Le portugais et l'italien"],
          correctIndex: 0,
        },
        {
          question: 'Comment est le climat de Tambacounda par rapport au reste du Sénégal ?',
          options: ['Parmi les plus chauds du pays', 'Le plus froid du pays', 'Un climat de montagne enneigé'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'kolda',
    name: 'Kolda',
    rubrique: 'Cloud & Systèmes distribués',
    icon: '🌾',
    lonLat: [-14.95, 12.8833],
    topics: cloudDistribue,
    discovery: {
      facts: [
        'Kolda est une ville du sud du Sénégal, dans la région naturelle de la Haute Casamance.',
        "La région de Kolda est réputée pour son agriculture, notamment la culture du coton et de l'arachide.",
        'Le climat plus humide de la Haute Casamance favorise une végétation plus dense que dans le nord du pays.',
        'Kolda abrite une grande diversité ethnique, avec une forte présence peule, mandingue et diola.',
        "L'élevage occupe une place importante dans l'économie locale, en particulier chez les communautés peules de la région.",
        'La ville se situe non loin du fleuve Casamance, qui traverse toute la région du sud du Sénégal.',
        'Kolda reste moins densément peuplée que les grandes villes du nord, avec un tissu majoritairement rural autour d’elle.',
      ],
      quickFacts: {
        population: '~70 000 habitants',
        specialite: 'L’agriculture (coton, arachide) et l’élevage',
        langues: 'Peul, mandingue, diola et français',
      },
      quiz: [
        {
          question: 'Kolda se situe dans quelle région naturelle du Sénégal ?',
          options: ['La Haute Casamance', 'Le Sahel', 'La presqu’île du Cap-Vert'],
          correctIndex: 0,
        },
        {
          question: 'Quelle culture agricole est particulièrement associée à la région de Kolda ?',
          options: ['Le coton', 'Le café', 'La canne à sucre'],
          correctIndex: 0,
        },
        {
          question: 'Quel groupe ethnique est fortement présent autour de Kolda, notamment lié à l’élevage ?',
          options: ['Les Peuls', 'Les Inuits', 'Les Vikings'],
          correctIndex: 0,
        },
        {
          question: 'Quel fleuve traverse la région du sud du Sénégal, non loin de Kolda ?',
          options: ['Le fleuve Casamance', "Le fleuve Amazone", 'Le fleuve Nil'],
          correctIndex: 0,
        },
        {
          question: 'Comment décrirait-on le tissu urbain autour de Kolda par rapport aux grandes villes du nord ?',
          options: ['Majoritairement rural, moins densément peuplé', 'Une mégalopole ultra-dense', 'La plus grande ville du pays'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'diourbel',
    name: 'Diourbel',
    rubrique: "Architecture des Systèmes d'Information",
    icon: '🏛️',
    lonLat: [-16.2333, 14.65],
    topics: architectureSI,
    discovery: {
      facts: [
        'Diourbel est une ville du centre du Sénégal, à quelques kilomètres seulement de Touba, la capitale spirituelle du mouridisme.',
        'La région de Diourbel fait partie du bassin arachidier historique du pays, comme Kaolack et Thiès.',
        'Diourbel fut un centre administratif important durant la période coloniale, avant que Touba ne prenne une place grandissante dans la région.',
        'La ville est traversée par plusieurs axes routiers reliant Dakar au centre et à l’est du Sénégal.',
        'La région de Diourbel a une forte influence de la confrérie mouride, en raison de sa proximité immédiate avec Touba.',
        'Le climat sahélien de la région favorise une agriculture centrée sur l’arachide et le mil.',
        'Diourbel reste une ville de taille moyenne, éclipsée en population par sa voisine Touba, en forte croissance.',
      ],
      quickFacts: {
        population: '~100 000 habitants',
        specialite: 'Agriculture arachidière, proximité avec Touba',
        langues: 'Wolof et français',
      },
      quiz: [
        {
          question: 'Diourbel se situe à proximité immédiate de quelle ville, capitale spirituelle du mouridisme ?',
          options: ['Touba', 'Dakar', 'Ziguinchor'],
          correctIndex: 0,
        },
        {
          question: 'À quel bassin agricole historique la région de Diourbel appartient-elle ?',
          options: ['Le bassin arachidier', 'Le bassin viticole', 'Le bassin caféier'],
          correctIndex: 0,
        },
        {
          question: 'Quel rôle Diourbel a-t-elle joué durant la période coloniale ?',
          options: ['Un centre administratif important', 'La capitale nationale', 'Un port maritime majeur'],
          correctIndex: 0,
        },
        {
          question: 'Comment la population de Diourbel se compare-t-elle à celle de Touba aujourd’hui ?',
          options: [
            'Diourbel reste plus petite, éclipsée par la forte croissance de Touba',
            'Diourbel est bien plus grande que Touba',
            'Les deux villes ont exactement la même population',
          ],
          correctIndex: 0,
        },
        {
          question: 'Quel climat caractérise la région de Diourbel ?',
          options: ['Un climat sahélien', 'Un climat équatorial humide', 'Un climat polaire'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'kedougou',
    name: 'Kédougou',
    rubrique: 'System Design',
    icon: '🏗️',
    lonLat: [-12.1833, 12.5556],
    topics: systemDesign,
    discovery: {
      facts: [
        "Kédougou est la région la plus au sud-est du Sénégal, aux confins du Mali et de la Guinée.",
        "C'est une région de collines et de massifs, un relief rare dans le reste du pays, largement plat.",
        "La région est connue pour ses ressources minières, notamment l'or, exploité à petite et grande échelle.",
        "Kédougou abrite une grande diversité ethnique : Bassari, Bedik, Peul, Malinké cohabitent sur un territoire restreint.",
        "Le Parc national du Niokolo-Koba, classé à l'UNESCO, se trouve dans cette région, abritant lions, éléphants et hippopotames.",
        "Kédougou reste l'une des régions les moins densément peuplées du Sénégal, en partie à cause de son relief.",
        "La région connaît une croissance économique liée à l'exploitation minière, avec ses opportunités et ses défis.",
      ],
      quickFacts: {
        population: '~180 000 habitants',
        specialite: 'Exploitation minière (or) et biodiversité (Niokolo-Koba)',
        langues: 'Bassari, Peul, Malinké et français',
      },
      quiz: [
        {
          question: 'Où se situe la région de Kédougou au Sénégal ?',
          options: [
            'Au sud-est, aux confins du Mali et de la Guinée',
            'Au nord, à la frontière mauritanienne',
            'Sur la côte atlantique',
          ],
          correctIndex: 0,
        },
        {
          question: 'Quelle ressource naturelle est particulièrement exploitée dans la région de Kédougou ?',
          options: ["L'or", 'Le pétrole', 'Le gaz naturel'],
          correctIndex: 0,
        },
        {
          question: 'Quel parc national classé UNESCO se trouve dans la région de Kédougou ?',
          options: ['Le Parc national du Niokolo-Koba', 'Le Parc national des oiseaux du Djoudj', 'Le Parc de la Langue de Barbarie'],
          correctIndex: 0,
        },
        {
          question: 'Quel relief caractérise la région de Kédougou, plutôt rare au Sénégal ?',
          options: ['Des collines et massifs', 'Un désert de dunes', 'Une plaine côtière'],
          correctIndex: 0,
        },
        {
          question: 'Quelles communautés ethniques cohabitent dans la région de Kédougou ?',
          options: ['Bassari, Bedik, Peul, Malinké', 'Uniquement Wolof', 'Uniquement Sérère'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'mbour',
    name: 'Mbour',
    rubrique: 'Carrière Internationale',
    icon: '🧭',
    lonLat: [-16.9667, 14.4167],
    topics: carriereInternationale,
    discovery: {
      facts: [
        "Mbour est une ville côtière de la Petite Côte sénégalaise, à environ 80 km au sud de Dakar.",
        "La station balnéaire de Saly, juste à côté, est l'une des destinations touristiques internationales les plus connues du pays.",
        "Mbour est historiquement un port de pêche artisanal parmi les plus actifs du Sénégal.",
        "La ville accueille chaque année de nombreux visiteurs étrangers, ce qui en fait un carrefour culturel et linguistique.",
        "Le tourisme international a fait de la région un pôle économique important, complémentaire à la pêche.",
        "Mbour connaît une croissance urbaine rapide, portée par le tourisme et la proximité de Dakar.",
        "La Petite Côte est réputée pour ses plages et son climat plus tempéré que le reste du pays.",
      ],
      quickFacts: {
        population: '~250 000 habitants',
        specialite: 'Pêche artisanale et tourisme international (Saly)',
        langues: 'Wolof, français, et de nombreuses langues des visiteurs internationaux',
      },
      quiz: [
        {
          question: 'À quelle distance environ de Dakar se trouve Mbour ?',
          options: ['Environ 80 km au sud', 'Environ 500 km au nord', 'Environ 10 km'],
          correctIndex: 0,
        },
        {
          question: 'Quelle station balnéaire internationale se trouve juste à côté de Mbour ?',
          options: ['Saly', 'Cap Skirring', 'Popenguine'],
          correctIndex: 0,
        },
        {
          question: 'Quelle activité économique traditionnelle est historiquement forte à Mbour ?',
          options: ['La pêche artisanale', "L'extraction minière", "L'industrie textile"],
          correctIndex: 0,
        },
        {
          question: 'Sur quelle portion du littoral sénégalais se situe Mbour ?',
          options: ['La Petite Côte', 'La Casamance', 'Le littoral nord'],
          correctIndex: 0,
        },
        {
          question: 'Pourquoi Mbour est-elle considérée comme un carrefour culturel et linguistique ?',
          options: [
            "En raison de l'afflux régulier de visiteurs internationaux liés au tourisme",
            "Parce qu'elle est la capitale administrative du pays",
            "Parce qu'elle n'accueille aucun visiteur étranger",
          ],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'goree',
    name: 'Gorée',
    rubrique: 'Entretien comportemental',
    icon: '💬',
    lonLat: [-17.3984, 14.6672],
    special: 'interview',
    discovery: {
      facts: [
        "L'île de Gorée, au large de Dakar, est classée au patrimoine mondial de l'UNESCO depuis 1978.",
        "Elle est un lieu de mémoire majeur de la traite négrière transatlantique, symbolisé par la Maison des Esclaves.",
        "Aujourd'hui île sans voitures et haut lieu artistique, elle est devenue un symbole de réconciliation et de dialogue.",
        "L'île se visite en une vingtaine de minutes de bateau depuis le port de Dakar.",
        'De nombreux artistes et artisans y exposent aujourd’hui leurs œuvres, faisant de Gorée un lieu de création autant que de mémoire.',
        'L’île de Gorée a été occupée successivement par plusieurs puissances coloniales européennes avant de revenir sous administration française.',
        'Chaque année, l’île accueille des commémorations internationales en mémoire des victimes de la traite négrière.',
      ],
      quickFacts: {
        population: 'quelques centaines d’habitants',
        specialite: 'Lieu de mémoire et d’art',
        langues: 'Wolof et français',
      },
      quiz: [
        {
          question: 'Depuis quand l’île de Gorée est-elle classée au patrimoine mondial de l’UNESCO ?',
          options: ['Depuis 1978', 'Depuis 1960', 'Depuis 2000'],
          correctIndex: 0,
        },
        {
          question: 'Quel bâtiment emblématique de Gorée symbolise la mémoire de la traite négrière ?',
          options: ['La Maison des Esclaves', 'Le Palais présidentiel', 'La Grande Mosquée'],
          correctIndex: 0,
        },
        {
          question: 'Comment se déplace-t-on sur l’île de Gorée ?',
          options: ["À pied, l'île est sans voitures", 'Uniquement en voiture', 'En métro'],
          correctIndex: 0,
        },
        {
          question: 'Combien de puissances coloniales européennes ont occupé l’île de Gorée au fil de son histoire ?',
          options: ['Plusieurs, successivement', 'Une seule, tout au long de son histoire', 'Aucune, l’île n’a jamais été occupée'],
          correctIndex: 0,
        },
        {
          question: 'Que se passe-t-il chaque année sur l’île de Gorée en lien avec son histoire ?',
          options: [
            'Des commémorations internationales en mémoire de la traite négrière',
            'Un grand marathon international',
            'Un festival de cinéma d’action',
          ],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    rubrique: 'Fintech & Paiements',
    icon: '💳',
    lonLat: [77.5946, 12.9716],
    topics: fintech,
    alwaysUnlocked: true,
    discovery: {
      facts: [
        "Bangalore est surnommée la « Silicon Valley de l'Inde », capitale technologique du pays depuis les années 1990.",
        "La ville abrite les sièges ou centres majeurs de milliers d'entreprises tech, indiennes comme internationales.",
        "L'Inde a développé l'India Stack, un ensemble d'infrastructures numériques publiques incluant UPI, l'un des systèmes de paiement instantané les plus utilisés au monde.",
        "Bangalore compte l'une des plus fortes concentrations d'ingénieurs logiciels au monde, formés notamment dans les grands instituts indiens (IIT, IISc).",
        "La ville est aussi appelée « Garden City » pour ses nombreux parcs, héritage de son urbanisme du XIXe siècle.",
        "L'écosystème de startups de Bangalore est l'un des plus actifs d'Asie, avec un fort accent sur la fintech et le SaaS.",
        "Le climat tempéré de Bangalore, rare en Inde, a historiquement attiré les industries de haute technologie dans la ville.",
      ],
      quickFacts: {
        population: '~13 millions d’habitants (agglomération)',
        specialite: 'Technologie de l’information et fintech',
        langues: 'Kannada, anglais et hindi',
      },
      quiz: [
        {
          question: 'Comment surnomme-t-on souvent Bangalore ?',
          options: ['La Silicon Valley de l’Inde', 'La capitale religieuse de l’Inde', 'Le plus grand port du pays'],
          correctIndex: 0,
        },
        {
          question: 'Qu’est-ce que l’India Stack ?',
          options: [
            'Un ensemble d’infrastructures numériques publiques indiennes, incluant UPI',
            'Une chaîne de montagnes près de Bangalore',
            'Un festival annuel de musique',
          ],
          correctIndex: 0,
        },
        {
          question: 'Pourquoi Bangalore est-elle aussi appelée « Garden City » ?',
          options: ['Pour ses nombreux parcs hérités de son urbanisme du XIXe siècle', 'Pour ses plages', 'Pour ses cultures de riz environnantes'],
          correctIndex: 0,
        },
        {
          question: 'Dans quel secteur l’écosystème de startups de Bangalore est-il particulièrement actif ?',
          options: ['La fintech et le SaaS', 'La pêche industrielle', 'L’extraction minière'],
          correctIndex: 0,
        },
        {
          question: 'Quelle particularité climatique a historiquement attiré la tech à Bangalore ?',
          options: ['Un climat tempéré, rare en Inde', 'Un climat glacial toute l’année', 'Une absence totale de saison des pluies'],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: 'silicon-valley',
    name: 'Silicon Valley',
    rubrique: 'IA & Machine Learning',
    icon: '🤖',
    lonLat: [-122.143, 37.4419],
    topics: iaMachineLearning,
    alwaysUnlocked: true,
    discovery: {
      facts: [
        "La Silicon Valley, dans la baie de San Francisco, doit son nom au silicium utilisé dans les semi-conducteurs qui y ont été développés dès les années 1950-60.",
        "Elle abrite les sièges de géants technologiques comme Google, Apple, Meta et Nvidia, ainsi que Stanford, université au cœur de son écosystème.",
        "La région concentre une part majeure des investissements mondiaux en capital-risque, en particulier dans l'intelligence artificielle depuis les années 2020.",
        "Le terme « Silicon Valley » a été popularisé par le journaliste Don Hoefler en 1971.",
        "L'université de Stanford a directement engendré des entreprises comme Google et Hewlett-Packard, nées de projets ou thèses d'étudiants.",
        "La région a connu plusieurs vagues technologiques majeures : semi-conducteurs, micro-informatique, internet, puis intelligence artificielle.",
        "Malgré son image de pointe technologique, la Silicon Valley fait aussi face à d'importants défis de coût de la vie et d'inégalités locales.",
      ],
      quickFacts: {
        population: '~3,5 millions d’habitants (baie de San Francisco)',
        specialite: 'Capital-risque, intelligence artificielle et grandes entreprises tech',
        langues: 'Anglais, espagnol et de nombreuses autres langues (forte immigration internationale)',
      },
      quiz: [
        {
          question: 'D’où vient le nom « Silicon Valley » ?',
          options: [
            'Du silicium utilisé dans les semi-conducteurs développés dans la région',
            'D’une chaîne de montagnes en forme de silicium',
            'D’un lac local appelé « Silicon »',
          ],
          correctIndex: 0,
        },
        {
          question: 'Quelle université est particulièrement associée à l’écosystème de la Silicon Valley ?',
          options: ['Stanford', 'Harvard', 'Oxford'],
          correctIndex: 0,
        },
        {
          question: 'Qui a popularisé le terme « Silicon Valley » ?',
          options: ['Le journaliste Don Hoefler en 1971', 'Un ingénieur de la NASA', 'Le gouverneur de Californie'],
          correctIndex: 0,
        },
        {
          question: 'Quelles vagues technologiques successives ont marqué la Silicon Valley ?',
          options: [
            'Semi-conducteurs, micro-informatique, internet, intelligence artificielle',
            'Uniquement l’intelligence artificielle, depuis toujours',
            'Textile, sidérurgie, automobile',
          ],
          correctIndex: 0,
        },
        {
          question: 'Quel défi important accompagne le succès technologique de la région ?',
          options: ['Un coût de la vie très élevé et des inégalités locales importantes', 'Un manque total d’entreprises', 'L’absence de toute université'],
          correctIndex: 0,
        },
      ],
    },
  },
]

// Ordre de déblocage progressif : Dakar (et Gorée) toujours ouvertes ; les
// autres villes se débloquent une à une en exigeant 2 badges dans la ville
// précédente. L'ORDRE de cette chaîne dépend des priorités choisies à
// l'onboarding (focusAreas) — une ville visée en priorité se débloque plus
// tôt, plutôt que de forcer un ordre géographique fixe pour tout le monde.
export const { orderedVilles, getUnlockInfo, getVille, getTopic, getAllTopics } = createContentHelpers(
  villes,
  (threshold, name) => `Termine ${threshold} sujets à ${name} pour débloquer`,
)

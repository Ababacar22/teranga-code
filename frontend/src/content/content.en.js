import designPatterns from './topics-en/designPatterns.json'
import outils from './topics-en/outils.json'
import algorithmie from './topics-en/algorithmie.json'
import architecture from './topics-en/architecture.json'
import qualiteSecurite from './topics-en/qualiteSecurite.json'
import poo from './topics-en/poo.json'
import frameworksEcosysteme from './topics-en/frameworksEcosysteme.json'
import webReseaux from './topics-en/webReseaux.json'
import cloudDistribue from './topics-en/cloudDistribue.json'
import architectureSI from './topics-en/architectureSI.json'
import systemDesign from './topics-en/systemDesign.json'
import carriereInternationale from './topics-en/carriereInternationale.json'
import { createContentHelpers } from './unlockLogic'

export const villes = [
  {
    id: "dakar",
    name: "Dakar",
    rubrique: "Design Patterns",
    icon: "🧩",
    lonLat: [-17.4467, 14.6928],
    topics: designPatterns,
    discovery: {
      facts: [
        "Dakar is the capital of Senegal and the westernmost point of the African continent, sitting on the Cap-Vert peninsula.",
        "The African Renaissance Monument, one of the tallest statues in Africa, overlooks the city from the Mamelles hills.",
        "A bustling port city, Dakar has also become a major tech hub in West Africa.",
        "The Dakar Rally historically takes its name from the city, which was the race's final destination before it moved to South America.",
        "Wolof is the most widely spoken everyday language in Dakar's streets, alongside French, the official language.",
        "Dakar hosts the headquarters of many international organizations and regional financial institutions, confirming its role as a West African economic hub.",
        "The Corniche of Dakar, which runs along the Atlantic coast, is a popular spot for sports and relaxation at sunset.",
      ],
      quickFacts: {
        population: "~1.2 million (metro area: over 3 million)",
        specialite: "Thieboudienne, the national dish made of rice and fish",
        langues: "Wolof and French",
      },
      quiz: [
        {
          question: "Which language is most commonly spoken day-to-day in Dakar?",
          options: ["Wolof", "English", "Fula"],
          correctIndex: 0,
        },
        {
          question: "Which monument overlooks Dakar from the Mamelles hills?",
          options: ["The African Renaissance Monument", "The Eiffel Tower", "The Great Mosque of Touba"],
          correctIndex: 0,
        },
        {
          question: "Where is Dakar located on the African continent?",
          options: ["The westernmost point", "The northernmost point", "The southernmost point"],
          correctIndex: 0,
        },
        {
          question: "Which ocean borders the city of Dakar?",
          options: ["The Atlantic Ocean", "The Indian Ocean", "The Mediterranean Sea"],
          correctIndex: 0,
        },
        {
          question: "What economic role does Dakar play in West Africa?",
          options: ["A regional economic and financial hub", "An isolated, mostly agricultural town", "A simple fishing village with no economic activity"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "saint-louis",
    name: "Saint-Louis",
    rubrique: "Tools & DevOps",
    icon: "🛠️",
    lonLat: [-16.4818, 16.0326],
    topics: outils,
    discovery: {
      facts: [
        "Saint-Louis was the capital of French West Africa until 1902, before Dakar.",
        "Its historic island, a UNESCO World Heritage Site, is famous for its colorful colonial architecture.",
        "The Faidherbe Bridge, built in the late 19th century, connects the island to the mainland over the Senegal River.",
        "Every year, the Saint-Louis Jazz Festival draws musicians and festivalgoers from all over the world.",
        "Saint-Louis fishermen still use traditional colorful pirogues today, an iconic image of the city.",
        "Saint-Louis lent its name to an entire musical and artistic scene, echoing its rich cultural past.",
        "The city sits along the Senegal River, which long served as a trade route between the interior and the ocean.",
      ],
      quickFacts: {
        population: "~250,000",
        specialite: "Traditional fishing and colorful pirogues",
        langues: "Wolof and French",
      },
      quiz: [
        {
          question: "Saint-Louis was the capital of which colonial entity before Dakar?",
          options: ["French West Africa", "The Mali Empire", "Independent Senegal"],
          correctIndex: 0,
        },
        {
          question: "Which iconic bridge connects Saint-Louis island to the mainland?",
          options: ["The Faidherbe Bridge", "The Millau Viaduct", "The Léopold Sédar Senghor Bridge"],
          correctIndex: 0,
        },
        {
          question: "Which music festival makes Saint-Louis famous every year?",
          options: ["The Saint-Louis Jazz Festival", "The Cannes Film Festival", "Coachella"],
          correctIndex: 0,
        },
        {
          question: "Which river runs alongside the city of Saint-Louis?",
          options: ["The Senegal River", "The Niger River", "The Congo River"],
          correctIndex: 0,
        },
        {
          question: "What kind of site is the historic island of Saint-Louis built on?",
          options: ["An island on the Senegal River, listed by UNESCO", "A volcanic peninsula", "A desert plateau"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "thies",
    name: "Thiès",
    rubrique: "Algorithms & Data Structures",
    icon: "🧮",
    lonLat: [-16.9246, 14.791],
    topics: algorithmie,
    discovery: {
      facts: [
        "Thies was a key railway junction on the Dakar-Niger line, at the heart of Senegal's industrial history.",
        "The city is home to the renowned Senegalese Decorative Arts Manufactures, known for their hand-woven tapestries.",
        "As the country's third-largest city, it remains an important commercial and cultural hub.",
        "Thies is sometimes nicknamed the city of the 'two stations,' a legacy of its past as a major railway center.",
        "The region is also known for its agriculture, particularly peanut and millet farming.",
        "Thies is sometimes called Senegal's 'rail capital,' reflecting its history as a major railway junction.",
        "The city is also home to significant phosphate quarries, a key economic resource for the country.",
      ],
      quickFacts: {
        population: "~320,000",
        specialite: "Hand-woven tapestries",
        langues: "Wolof and French",
      },
      quiz: [
        {
          question: "Why was Thies historically important in Senegal?",
          options: ["A railway junction on the Dakar-Niger line", "A religious capital", "The country's main port"],
          correctIndex: 0,
        },
        {
          question: "What craft is Thies known for?",
          options: ["Hand-woven tapestries", "Pottery", "Leatherwork"],
          correctIndex: 0,
        },
        {
          question: "Where does Thies rank among Senegal's cities?",
          options: ["The country's third-largest city", "The capital", "The smallest city"],
          correctIndex: 0,
        },
        {
          question: "Which mineral resource is associated with the Thies region?",
          options: ["Phosphate", "Oil", "Gold"],
          correctIndex: 0,
        },
        {
          question: "What nickname is sometimes given to Thies because of its railway history?",
          options: ["'The rail capital'", "'The city of a thousand lakes'", "'The forbidden city'"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "touba",
    name: "Touba",
    rubrique: "Architecture & Systems",
    icon: "🏗️",
    lonLat: [-15.8833, 14.85],
    topics: architecture,
    discovery: {
      facts: [
        "Touba is the spiritual capital of Mouridism, a Sufi brotherhood founded by Cheikh Ahmadou Bamba.",
        "Its Great Mosque, one of the largest in Africa, is an architectural masterpiece visible from afar.",
        "Every year, the Grand Magal of Touba draws millions of pilgrims from around the world.",
        "The Grand Magal commemorates Cheikh Ahmadou Bamba's exile in 1895, a founding event for the brotherhood.",
        "Touba largely operates under rules specific to the Mouride brotherhood, with a distinctive urban organization.",
        "Touba is administered according to a system specific to the Mouride brotherhood, distinct from the standard administration of other cities.",
        "The city has experienced very rapid population growth, driven by its religious and economic appeal.",
      ],
      quickFacts: {
        population: "several hundred thousand (far more during the Grand Magal)",
        specialite: "Spiritual capital of Mouridism",
        langues: "Wolof and French",
      },
      quiz: [
        {
          question: "Who founded the Mouride brotherhood, of which Touba is the spiritual capital?",
          options: ["Cheikh Ahmadou Bamba", "Léopold Sédar Senghor", "El Hadj Malick Sy"],
          correctIndex: 0,
        },
        {
          question: "What does the Grand Magal of Touba commemorate?",
          options: ["Cheikh Ahmadou Bamba's exile in 1895", "Senegal's independence", "The building of the Faidherbe Bridge"],
          correctIndex: 0,
        },
        {
          question: "What does the Great Mosque of Touba house?",
          options: ["One of the largest mosques in Africa", "A museum of colonial art", "An airport"],
          correctIndex: 0,
        },
        {
          question: "How is Touba administered compared to other Senegalese cities?",
          options: ["Under a distinct system tied to the Mouride brotherhood", "Exactly like every other city, with no distinction", "By a foreign government"],
          correctIndex: 0,
        },
        {
          question: "What explains Touba's rapid population growth?",
          options: ["Its religious and economic appeal linked to Mouridism", "A forced relocation policy", "An exceptionally favorable climate for farming"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "kaolack",
    name: "Kaolack",
    rubrique: "Security & Code Quality",
    icon: "🛡️",
    lonLat: [-16.0728, 14.1517],
    topics: qualiteSecurite,
    discovery: {
      facts: [
        "Kaolack was historically one of the largest peanut trading hubs in West Africa.",
        "The city is known for its vast open-air salt flats, visible from the air.",
        "It sits near the Saloum Delta, a UNESCO-listed biosphere reserve.",
        "Kaolack is crossed by the Saloum River, whose estuary shelters a rich, protected mangrove.",
        "The city remains a strategic trading crossroads between Dakar, Gambia, and southern Senegal.",
        "Kaolack was long served by a railway line connecting it to Dakar, which helped export peanuts to the port.",
        "The area around Kaolack is part of Senegal's historic peanut basin, the heart of the country's agricultural economy in the 20th century.",
      ],
      quickFacts: {
        population: "~230,000",
        specialite: "Salt harvested from open-air salt flats",
        langues: "Wolof, Serer, and French",
      },
      quiz: [
        {
          question: "Which agricultural product made Kaolack a major trading hub historically?",
          options: ["Peanuts", "Coffee", "Cocoa"],
          correctIndex: 0,
        },
        {
          question: "Which protected ecosystem lies near Kaolack?",
          options: ["The Saloum Delta", "The Amazon rainforest", "The Sahara Desert"],
          correctIndex: 0,
        },
        {
          question: "What can be seen from the air near Kaolack?",
          options: ["Vast open-air salt flats", "Active volcanoes", "Glaciers"],
          correctIndex: 0,
        },
        {
          question: "Which major historic agricultural basin does the Kaolack region belong to?",
          options: ["The peanut basin", "The wine basin", "The coffee basin"],
          correctIndex: 0,
        },
        {
          question: "How were peanuts grown near Kaolack historically exported?",
          options: ["By rail to the port of Dakar", "By cargo plane", "They were never exported"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "ziguinchor",
    name: "Ziguinchor",
    rubrique: "OOP & Paradigms",
    icon: "🌳",
    lonLat: [-16.2719, 12.5833],
    topics: poo,
    discovery: {
      facts: [
        "Ziguinchor is the main city of Casamance, a region in southern Senegal separated from the rest of the country by Gambia.",
        "The Casamance River and its mangroves shape a lush landscape, very different from the Sahelian north.",
        "The region is known for its rich vegetation, rice farming, and craftsmanship.",
        "Casamance is known for the diversity of its ethnic groups, notably the Diola, and for its strong cultural traditions.",
        "Casamance's wetter climate allows for lowland rice farming, unlike the rest of the country.",
        "Ziguinchor is a river port on the Casamance River, historically used for trade between the region and the outside world.",
        "Casamance is also known for its impluvium houses, a traditional architectural style typical of certain ethnic groups in the region.",
      ],
      quickFacts: {
        population: "~230,000",
        specialite: "Rice farming and Casamance craftsmanship",
        langues: "Diola, Wolof, and French",
      },
      quiz: [
        {
          question: "Ziguinchor is the main city of which region of Senegal?",
          options: ["Casamance", "The Sahel", "The Dakar region"],
          correctIndex: 0,
        },
        {
          question: "Which country geographically separates Casamance from the rest of Senegal?",
          options: ["Gambia", "Mali", "Guinea"],
          correctIndex: 0,
        },
        {
          question: "Which farming activity is especially developed in Casamance thanks to its humid climate?",
          options: ["Rice farming", "Winegrowing", "Reindeer herding"],
          correctIndex: 0,
        },
        {
          question: "Ziguinchor is a port on what kind of waterway?",
          options: ["A river (the Casamance River)", "The open ocean", "An artificial lake"],
          correctIndex: 0,
        },
        {
          question: "What is an impluvium house, typical of certain areas of Casamance?",
          options: ["A traditional structure designed to collect rainwater", "A type of fishing boat", "A modern covered market"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "louga",
    name: "Louga",
    rubrique: "Frameworks & Ecosystem",
    icon: "⚙️",
    lonLat: [-16.2247, 15.6144],
    topics: frameworksEcosysteme,
    discovery: {
      facts: [
        "Louga is a city in northern Senegal, at a historic crossroads between the coast and the interior, on the route linking Dakar to Saint-Louis and Mauritania.",
        "The Louga region is known for its large diaspora: many Senegalese living abroad, especially in Europe, come from here.",
        "The region's Sahelian climate has shaped an economy historically centered on livestock herding and trade.",
        "Louga long served as a caravan stop between the Atlantic coast and trade routes toward the interior.",
        "The city continues to play an important role as a road crossroads in northern Senegal.",
        "Louga sits in a transition zone between farmland further south and the more arid landscapes of the Senegalese Sahel.",
        "The city hosts a large regional market that draws traders from across the northern part of the country.",
      ],
      quickFacts: {
        population: "~130,000",
        specialite: "Livestock trade and a strong tradition of emigration",
        langues: "Wolof and French",
      },
      quiz: [
        {
          question: "Louga lies on which historic road route?",
          options: ["Between Dakar, Saint-Louis, and Mauritania", "Between Dakar and Casamance", "Between Thies and Gambia"],
          correctIndex: 0,
        },
        {
          question: "What is the Louga region particularly known for?",
          options: ["A large Senegalese diaspora abroad", "The country's largest forest", "Senegal's highest mountains"],
          correctIndex: 0,
        },
        {
          question: "What climate characterizes the Louga region?",
          options: ["A semi-arid Sahelian climate", "A humid tropical climate", "An absolute desert climate"],
          correctIndex: 0,
        },
        {
          question: "Louga sits in what kind of climatic transition zone?",
          options: ["Between farmland and more arid Sahelian landscapes", "Between a tropical rainforest and a sand desert", "Between two major mountain ranges"],
          correctIndex: 0,
        },
        {
          question: "What draws traders from across the northern region to Louga?",
          options: ["A large regional market", "An international airport", "The country's only factory"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "tambacounda",
    name: "Tambacounda",
    rubrique: "Web & Networks",
    icon: "🦁",
    lonLat: [-13.6673, 13.7707],
    topics: webReseaux,
    discovery: {
      facts: [
        "Tambacounda is Senegal's largest region by area, in the east of the country, on the border with Mali.",
        "The city is an important road and rail crossroads, historically served by the Dakar-Niger railway line.",
        "Tambacounda lies near Niokolo-Koba National Park, a UNESCO World Heritage Site prized for its exceptional biodiversity.",
        "The region is home to great ethnic diversity, with a significant Mandinka and Fula presence.",
        "Tambacounda's climate is among the hottest in Senegal, with very high temperatures during the dry season.",
        "The city serves as a gateway to Mali and Guinea, at the crossroads of several regional routes.",
        "Farming and livestock herding remain major economic activities in the Tambacounda region.",
      ],
      quickFacts: {
        population: "~130,000",
        specialite: "Gateway to Niokolo-Koba and Mali",
        langues: "Mandinka, Fula, Wolof, and French",
      },
      quiz: [
        {
          question: "Tambacounda is Senegal's largest region in terms of what?",
          options: ["Area", "Population", "Number of beaches"],
          correctIndex: 0,
        },
        {
          question: "Which famous national park is located near Tambacounda?",
          options: ["Niokolo-Koba National Park", "Yellowstone National Park", "Kruger National Park"],
          correctIndex: 0,
        },
        {
          question: "Which country does the Tambacounda region share a border with?",
          options: ["Mali", "Morocco", "Algeria"],
          correctIndex: 0,
        },
        {
          question: "Besides Wolof and French, which languages are commonly spoken in the Tambacounda region?",
          options: ["Mandinka and Fula", "Mandarin and Russian", "Portuguese and Italian"],
          correctIndex: 0,
        },
        {
          question: "How does Tambacounda's climate compare to the rest of Senegal?",
          options: ["Among the hottest in the country", "The coldest in the country", "A snowy mountain climate"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "kolda",
    name: "Kolda",
    rubrique: "Cloud & Distributed Systems",
    icon: "🌾",
    lonLat: [-14.95, 12.8833],
    topics: cloudDistribue,
    discovery: {
      facts: [
        "Kolda is a city in southern Senegal, in the natural region of Upper Casamance.",
        "The Kolda region is known for its agriculture, particularly cotton and peanut farming.",
        "Upper Casamance's wetter climate supports denser vegetation than in the north of the country.",
        "Kolda has great ethnic diversity, with a strong Fula, Mandinka, and Diola presence.",
        "Livestock herding plays an important role in the local economy, especially among the region's Fula communities.",
        "The city lies close to the Casamance River, which flows through the whole southern region of Senegal.",
        "Kolda remains less densely populated than the major cities of the north, surrounded by a mostly rural landscape.",
      ],
      quickFacts: {
        population: "~70,000",
        specialite: "Agriculture (cotton, peanuts) and livestock herding",
        langues: "Fula, Mandinka, Diola, and French",
      },
      quiz: [
        {
          question: "Which natural region of Senegal is Kolda located in?",
          options: ["Upper Casamance", "The Sahel", "The Cap-Vert peninsula"],
          correctIndex: 0,
        },
        {
          question: "Which crop is especially associated with the Kolda region?",
          options: ["Cotton", "Coffee", "Sugar cane"],
          correctIndex: 0,
        },
        {
          question: "Which ethnic group has a strong presence around Kolda, notably tied to livestock herding?",
          options: ["The Fula", "The Inuit", "The Vikings"],
          correctIndex: 0,
        },
        {
          question: "Which river flows through southern Senegal near Kolda?",
          options: ["The Casamance River", "The Amazon River", "The Nile"],
          correctIndex: 0,
        },
        {
          question: "How would you describe the urban landscape around Kolda compared to the major cities of the north?",
          options: ["Mostly rural, less densely populated", "An ultra-dense megacity", "The largest city in the country"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "diourbel",
    name: "Diourbel",
    rubrique: "Information Systems Architecture",
    icon: "🏛️",
    lonLat: [-16.2333, 14.65],
    topics: architectureSI,
    discovery: {
      facts: [
        "Diourbel is a city in central Senegal, just a few kilometers from Touba, the spiritual capital of Mouridism.",
        "The Diourbel region is part of the country's historic peanut basin, like Kaolack and Thies.",
        "Diourbel was an important administrative center during the colonial period, before Touba grew to prominence in the region.",
        "The city is crossed by several roads linking Dakar to central and eastern Senegal.",
        "The Diourbel region has a strong Mouride influence due to its immediate proximity to Touba.",
        "The region's Sahelian climate supports farming centered on peanuts and millet.",
        "Diourbel remains a mid-sized city, overshadowed in population by its fast-growing neighbor Touba.",
      ],
      quickFacts: {
        population: "~100,000",
        specialite: "Peanut farming, proximity to Touba",
        langues: "Wolof and French",
      },
      quiz: [
        {
          question: "Diourbel is located right next to which city, the spiritual capital of Mouridism?",
          options: ["Touba", "Dakar", "Ziguinchor"],
          correctIndex: 0,
        },
        {
          question: "Which historic agricultural basin does the Diourbel region belong to?",
          options: ["The peanut basin", "The wine basin", "The coffee basin"],
          correctIndex: 0,
        },
        {
          question: "What role did Diourbel play during the colonial period?",
          options: ["An important administrative center", "The national capital", "A major seaport"],
          correctIndex: 0,
        },
        {
          question: "How does Diourbel's population compare to Touba's today?",
          options: ["Diourbel remains smaller, overshadowed by Touba's rapid growth", "Diourbel is far larger than Touba", "The two cities have exactly the same population"],
          correctIndex: 0,
        },
        {
          question: "What climate characterizes the Diourbel region?",
          options: ["A Sahelian climate", "A humid equatorial climate", "A polar climate"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "kedougou",
    name: "Kédougou",
    rubrique: "System Design",
    icon: "🏗️",
    lonLat: [-12.1833, 12.5556],
    topics: systemDesign,
    discovery: {
      facts: [
        "Kedougou is Senegal's southeasternmost region, bordering Mali and Guinea.",
        "It is a region of hills and highlands, a rare landscape in the rest of the largely flat country.",
        "The region is known for its mineral resources, notably gold, mined at both small and large scale.",
        "Kedougou has great ethnic diversity: Bassari, Bedik, Fula, and Malinke communities live side by side in a small area.",
        "Niokolo-Koba National Park, a UNESCO World Heritage Site, is located in this region and is home to lions, elephants, and hippopotamuses.",
        "Kedougou remains one of the least densely populated regions of Senegal, partly due to its terrain.",
        "The region is experiencing economic growth driven by mining, with both opportunities and challenges.",
      ],
      quickFacts: {
        population: "~180,000",
        specialite: "Gold mining and biodiversity (Niokolo-Koba)",
        langues: "Bassari, Fula, Malinke, and French",
      },
      quiz: [
        {
          question: "Where is the Kedougou region located in Senegal?",
          options: ["In the southeast, bordering Mali and Guinea", "In the north, on the Mauritanian border", "On the Atlantic coast"],
          correctIndex: 0,
        },
        {
          question: "Which natural resource is especially mined in the Kedougou region?",
          options: ["Gold", "Oil", "Natural gas"],
          correctIndex: 0,
        },
        {
          question: "Which UNESCO-listed national park is located in the Kedougou region?",
          options: ["Niokolo-Koba National Park", "Djoudj Bird Sanctuary", "Langue de Barbarie National Park"],
          correctIndex: 0,
        },
        {
          question: "What kind of terrain characterizes the Kedougou region, rather rare in Senegal?",
          options: ["Hills and highlands", "A dune desert", "A coastal plain"],
          correctIndex: 0,
        },
        {
          question: "Which ethnic communities live together in the Kedougou region?",
          options: ["Bassari, Bedik, Fula, Malinke", "Only Wolof", "Only Serer"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "mbour",
    name: "Mbour",
    rubrique: "International Career",
    icon: "🧭",
    lonLat: [-16.9667, 14.4167],
    topics: carriereInternationale,
    discovery: {
      facts: [
        "Mbour is a coastal city on Senegal's Petite Cote, about 80 km south of Dakar.",
        "The nearby seaside resort of Saly is one of the country's best-known international tourist destinations.",
        "Mbour has historically been one of the busiest artisanal fishing ports in Senegal.",
        "The city welcomes many foreign visitors every year, making it a cultural and linguistic crossroads.",
        "International tourism has made the region an important economic hub, complementing fishing.",
        "Mbour is experiencing rapid urban growth, driven by tourism and its proximity to Dakar.",
        "The Petite Cote is known for its beaches and a milder climate than the rest of the country.",
      ],
      quickFacts: {
        population: "~250,000",
        specialite: "Artisanal fishing and international tourism (Saly)",
        langues: "Wolof, French, and many languages spoken by international visitors",
      },
      quiz: [
        {
          question: "About how far from Dakar is Mbour?",
          options: ["About 80 km south", "About 500 km north", "About 10 km"],
          correctIndex: 0,
        },
        {
          question: "Which international seaside resort is located right next to Mbour?",
          options: ["Saly", "Cap Skirring", "Popenguine"],
          correctIndex: 0,
        },
        {
          question: "Which traditional economic activity is historically strong in Mbour?",
          options: ["Artisanal fishing", "Mineral extraction", "The textile industry"],
          correctIndex: 0,
        },
        {
          question: "Which stretch of Senegal's coastline is Mbour located on?",
          options: ["The Petite Cote", "Casamance", "The northern coast"],
          correctIndex: 0,
        },
        {
          question: "Why is Mbour considered a cultural and linguistic crossroads?",
          options: ["Because of the steady influx of international visitors drawn by tourism", "Because it is the country's administrative capital", "Because it receives no foreign visitors at all"],
          correctIndex: 0,
        },
      ],
    },
  },
  {
    id: "goree",
    name: "Gorée",
    rubrique: "Behavioral Interview",
    icon: "💬",
    lonLat: [-17.3984, 14.6672],
    special: "interview",
    discovery: {
      facts: [
        "Goree Island, off the coast of Dakar, has been a UNESCO World Heritage Site since 1978.",
        "It is a major site of remembrance for the transatlantic slave trade, symbolized by the House of Slaves.",
        "Today a car-free island and a thriving artistic hub, it has become a symbol of reconciliation and dialogue.",
        "The island is a roughly twenty-minute boat ride from the port of Dakar.",
        "Many artists and craftspeople now display their work there, making Goree a place of creation as much as of memory.",
        "Goree Island was occupied successively by several European colonial powers before coming under French administration.",
        "Every year, the island hosts international commemorations in memory of the victims of the slave trade.",
      ],
      quickFacts: {
        population: "a few hundred residents",
        specialite: "A place of memory and art",
        langues: "Wolof and French",
      },
    },
  },
]

export const { orderedVilles, getUnlockInfo, getVille, getTopic, getAllTopics } = createContentHelpers(
  villes,
  (threshold, name) => `Complete ${threshold} topics in ${name} to unlock`,
)

# Guide de contribution / Contributing Guide

*Français ci-dessous · English below*

---

## 🇫🇷 Français

Merci de vouloir contribuer à **Teranga Code** — une initiative de
[gainde-it.com](https://gainde-it.com), lancée par **Khalifa Ababacar
DIALLO**, pour aider tout apprenant, où qu'il soit, à se préparer
sérieusement aux entretiens techniques d'ingénieur logiciel.

### Comment contribuer

- **Signaler un bug** : ouvre une issue en décrivant le comportement
  observé, le comportement attendu, et les étapes pour reproduire.
- **Proposer une fonctionnalité** : ouvre une issue pour en discuter avant
  de coder — certaines idées peuvent déjà être en réflexion ou hors scope.
- **Ajouter ou enrichir du contenu pédagogique** (sujets, quiz, démos
  visuelles) : c'est la contribution la plus précieuse pour ce projet.
- **Corriger / améliorer le code** : voir la checklist plus bas avant
  d'ouvrir une pull request.

### Mise en route

Prérequis et installation automatique (Mac/Windows) : voir
[SETUP.md](SETUP.md).

```bash
git clone https://github.com/Ababacar22/teranga-code.git
cd teranga-code
cp .env.example .env   # génère un JWT_SECRET avec: openssl rand -hex 32
docker compose up --build
```

- Frontend : http://localhost:5185
- Backend : http://localhost:4000

### Ajouter un sujet pédagogique

Le contenu vit dans `frontend/src/content/topics/*.json` (un fichier par
région/rubrique). Chaque sujet doit respecter le schéma défini dans
`frontend/src/content/schema/topic.schema.json` — champs obligatoires :
`id`, `title`, `category`, `badge`, `griotIntro`, `explanation`,
`practice`, `quiz` (minimum 3 questions, avec `difficulty`:
`facile`/`moyen`/`difficile`).

Avant toute pull request touchant au contenu :

```bash
cd frontend
npm run validate:content
```

Si tu ajoutes une démonstration visuelle interactive pour un nouveau
sujet, crée un composant dans `frontend/src/components/` et enregistre-le
dans `TOPIC_DEMOS` (`frontend/src/scenes/QuartierScene.jsx`) avec l'`id`
exact du sujet comme clé.

### Style de code

- Pas de commentaires inutiles — le code doit être lisible par lui-même ;
  un commentaire n'est justifié que pour une contrainte non-évidente (bug
  contourné, invariant caché).
- Lint avant de proposer une PR :

```bash
cd frontend && npx oxlint src
```

- Pas d'abstraction prématurée : préfère la simplicité à la généricité
  anticipée.

### Pull requests

1. Fork puis crée une branche depuis `main`.
2. Un sujet par PR autant que possible (plus facile à relire).
3. Vérifie que `npm run validate:content`, `npx oxlint src` et
   `npm run build` passent sans erreur.
4. Décris clairement le *pourquoi* du changement dans la description de
   la PR, pas seulement le *quoi*.

### Code de conduite

Sois respectueux·se. Ce projet s'adresse à des apprenants — le ton doit
rester bienveillant, y compris dans les revues de code.

---

## 🇬🇧 English

Thank you for considering a contribution to **Teranga Code** — an
initiative by [gainde-it.com](https://gainde-it.com), launched by
**Khalifa Ababacar DIALLO**, to help any learner, anywhere, seriously
prepare for software engineering technical interviews.

### How to contribute

- **Report a bug**: open an issue describing observed vs. expected
  behavior, and steps to reproduce.
- **Propose a feature**: open an issue to discuss it before coding — some
  ideas may already be planned or out of scope.
- **Add or enrich learning content** (topics, quizzes, visual demos): this
  is the most valuable kind of contribution for this project.
- **Fix or improve code**: see the checklist below before opening a pull
  request.

### Getting started

Prerequisites and automated setup (Mac/Windows): see [SETUP.md](SETUP.md).

```bash
git clone https://github.com/Ababacar22/teranga-code.git
cd teranga-code
cp .env.example .env   # generate a JWT_SECRET with: openssl rand -hex 32
docker compose up --build
```

- Frontend: http://localhost:5185
- Backend: http://localhost:4000

### Adding a learning topic

Content lives in `frontend/src/content/topics/*.json` (one file per
region/track). Every topic must follow the schema defined in
`frontend/src/content/schema/topic.schema.json` — required fields:
`id`, `title`, `category`, `badge`, `griotIntro`, `explanation`,
`practice`, `quiz` (at least 3 questions, each with a `difficulty`:
`facile`/`moyen`/`difficile`).

Before opening any content-related pull request:

```bash
cd frontend
npm run validate:content
```

If you add an interactive visual demo for a new topic, create a component
under `frontend/src/components/` and register it in `TOPIC_DEMOS`
(`frontend/src/scenes/QuartierScene.jsx`) keyed by the topic's exact `id`.

### Code style

- No unnecessary comments — code should be self-explanatory; a comment is
  only justified for a non-obvious constraint (a worked-around bug, a
  hidden invariant).
- Lint before submitting a PR:

```bash
cd frontend && npx oxlint src
```

- No premature abstraction: prefer simplicity over anticipated
  genericity.

### Pull requests

1. Fork, then create a branch from `main`.
2. One topic per PR whenever possible (easier to review).
3. Make sure `npm run validate:content`, `npx oxlint src`, and
   `npm run build` all pass cleanly.
4. Clearly explain the *why* of the change in the PR description, not
   just the *what*.

### Code of conduct

Be respectful. This project serves learners — keep the tone kind, code
reviews included.

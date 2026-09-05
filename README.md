# Teranga Code — jeu interactif d'entraînement aux entretiens dev

**Teranga Code** est une initiative de [gainde-it.com](https://gainde-it.com),
lancée par **Khalifa Ababacar DIALLO**.

## But de la plateforme

Beaucoup d'étudiants et jeunes ingénieurs sénégalais arrivent en entretien
technique avec de bonnes bases mais peu d'entraînement au format réel de
l'exercice — que ce soit pour un poste au Sénégal, en France, aux
États-Unis ou dans le Golfe. Teranga Code transforme cette préparation en
un jeu sérieux : chaque ville du Sénégal correspond à une rubrique
technique (algorithmie, architecture, system design, outils, qualité et
sécurité, entretien comportemental...) à débloquer en progressant, avec du
contenu annoté, des démonstrations visuelles interactives, des quiz notés
par niveau de difficulté et une simulation d'entretien complète.

L'objectif : rendre cette préparation accessible, gratuite et motivante —
et, en la rendant open source, permettre à la communauté d'enrichir le
contenu pédagogique pour d'autres apprenants.

## Stack

- **Frontend** : React + Vite, carte interactive (Leaflet), animations
  (Framer Motion), PWA installable et jouable hors-ligne
- **Backend** : Node.js + Express + Prisma + PostgreSQL, auth JWT
- **Desktop** : application native (Tauri) pour Mac et Windows, 100 % locale
  hors-ligne — voir `frontend/src-tauri/`
- **Déploiement** : Docker Compose, auto-hébergé

## Développement local

Prérequis et script d'installation automatique (Mac/Windows) : voir
[SETUP.md](SETUP.md).

```bash
cp .env.example .env   # renseigne un JWT_SECRET (openssl rand -hex 32)
docker compose up --build
```

- Frontend : http://localhost:5185
- Backend : http://localhost:4000
- PostgreSQL : localhost:5443

## Structure

```
frontend/          # React + Vite, contenu pédagogique en JSON
frontend/src-tauri # Wrapper desktop (Tauri) Mac/Windows
backend/            # Express + Prisma
docker-compose.yml
```

## Application desktop

```bash
cd frontend
npm install
npm run build
npm run desktop:build   # génère les installateurs Mac/Windows dans src-tauri/target/release/bundle
```

L'app desktop fonctionne 100 % hors-ligne, avec création de compte locale
(aucun serveur requis).

## Contribuer

Les contributions sont bienvenues — voir [CONTRIBUTING.md](CONTRIBUTING.md)
(français et anglais).

## Licence

[MIT](LICENSE) — © gainde-it.com

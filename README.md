# Teranga Code — jeu interactif d'entraînement aux entretiens dev

Jeu web éducatif, ambiance sénégalaise, pour s'entraîner sérieusement aux
entretiens techniques d'ingénieur logiciel (algorithmie, architecture,
system design, outils, culture dev, entretiens comportementaux...) en
s'amusant — sous la forme d'un voyage à travers les villes du Sénégal,
chacune associée à une rubrique technique à débloquer.

Open source, pour aider d'autres apprenants sénégalais (et au-delà) à
progresser en jouant.

## Stack

- **Frontend** : React + Vite, carte interactive (Leaflet), animations
  (Framer Motion), PWA installable et jouable hors-ligne
- **Backend** : Node.js + Express + Prisma + PostgreSQL, auth JWT
- **Desktop** : application native (Tauri) pour Mac et Windows, 100 % locale
  hors-ligne — voir `frontend/src-tauri/`
- **Déploiement** : Docker Compose, auto-hébergé

## Développement local

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

## Licence

[MIT](LICENSE) — © gainde-it.com

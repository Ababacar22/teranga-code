# Sénégal Tech — jeu interactif d'entraînement aux entretiens dev

Jeu web interactif en 3D, ambiance sénégalaise, pour s'entraîner aux entretiens
techniques d'ingénieur logiciel (outils, design patterns, culture dev) en
s'amusant. Objectif à terme : open source, pour aider d'autres apprenants
sénégalais à progresser en jouant.

## Stack

- **Frontend** : React + Vite + react-three-fiber (Three.js) pour le hub 3D
- **Backend** : Node.js + Express + Prisma + PostgreSQL, auth JWT
- **Déploiement** : Docker Compose, auto-hébergé

## Développement local

```bash
docker compose up --build
```

- Frontend : http://localhost:5173
- Backend : http://localhost:4000/health
- PostgreSQL : localhost:5432

## Structure

```
frontend/   # React + react-three-fiber
backend/    # Express + Prisma
docker-compose.yml
```

## Roadmap

Voir le plan de développement étape par étape (hub 3D, auth, rubrique
Design Patterns, progression XP/badges, déploiement OVH).

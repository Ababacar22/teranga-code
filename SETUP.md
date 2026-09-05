# Guide d'installation / Setup Guide

*Français ci-dessous · English below*

---

## 🇫🇷 Français

### Ce qu'il faut installer

| Outil | Pourquoi | Obligatoire ? |
|---|---|---|
| [Git](https://git-scm.com) | Cloner le dépôt | Oui |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Faire tourner le frontend, le backend et PostgreSQL sans rien installer d'autre | Oui (parcours recommandé) |
| [Node.js](https://nodejs.org) (LTS) | Lancer les scripts hors Docker (validation de contenu, lint, build desktop) | Recommandé |
| [Rust](https://rustup.rs) | Construire l'application desktop (Tauri) | Seulement pour `npm run desktop:build` |
| Visual Studio Build Tools *(Windows)* / Xcode Command Line Tools *(Mac)* | Compiler Rust/Tauri | Seulement pour le build desktop |

Tu n'as **pas besoin** de Node.js ni de Rust pour simplement lancer le jeu
en local — `docker compose up --build` suffit. Ils ne sont nécessaires
que pour contribuer au code hors conteneur ou construire l'app desktop.

### Installation automatique des prérequis

Un script est fourni par plateforme (il détecte ce qui est déjà installé
et ne réinstalle rien inutilement) :

**macOS :**
```bash
bash scripts/setup-mac.sh
```

**Windows** (PowerShell) :
```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup-windows.ps1
```

> Un script shell unique ne peut pas tourner nativement à la fois sur Mac
> et sur Windows (pas d'interpréteur bash sur Windows par défaut) — d'où
> ces deux scripts séparés, avec la même logique.

### Démarrer le projet

```bash
git clone https://github.com/Ababacar22/teranga-code.git
cd teranga-code
cp .env.example .env      # génère un secret : openssl rand -hex 32
docker compose up --build
```

- Frontend : http://localhost:5185
- Backend : http://localhost:4000
- PostgreSQL : localhost:5443

### Construire l'application desktop (optionnel)

Nécessite Node.js et Rust (voir ci-dessus) :

```bash
cd frontend
npm install
npm run build
npm run desktop:build
```

Les installateurs (`.dmg` sur Mac, `.exe`/`.msi` sur Windows) sont générés
dans `frontend/src-tauri/target/release/bundle/`.

---

## 🇬🇧 English

### What to install

| Tool | Why | Required? |
|---|---|---|
| [Git](https://git-scm.com) | Clone the repository | Yes |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Run the frontend, backend and PostgreSQL without installing anything else | Yes (recommended path) |
| [Node.js](https://nodejs.org) (LTS) | Run scripts outside Docker (content validation, lint, desktop build) | Recommended |
| [Rust](https://rustup.rs) | Build the desktop app (Tauri) | Only for `npm run desktop:build` |
| Visual Studio Build Tools *(Windows)* / Xcode Command Line Tools *(Mac)* | Compile Rust/Tauri | Only for the desktop build |

You do **not** need Node.js or Rust just to run the game locally —
`docker compose up --build` is enough. They're only needed to contribute
to the code outside the container, or to build the desktop app.

### Automated prerequisite install

One script per platform is provided (it detects what's already installed
and won't reinstall anything unnecessarily):

**macOS:**
```bash
bash scripts/setup-mac.sh
```

**Windows** (PowerShell):
```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup-windows.ps1
```

> A single shell script can't natively run on both Mac and Windows (no
> bash interpreter on Windows by default) — hence these two separate
> scripts, sharing the same logic.

### Getting the project running

```bash
git clone https://github.com/Ababacar22/teranga-code.git
cd teranga-code
cp .env.example .env      # generate a secret: openssl rand -hex 32
docker compose up --build
```

- Frontend: http://localhost:5185
- Backend: http://localhost:4000
- PostgreSQL: localhost:5443

### Building the desktop app (optional)

Requires Node.js and Rust (see above):

```bash
cd frontend
npm install
npm run build
npm run desktop:build
```

Installers (`.dmg` on Mac, `.exe`/`.msi` on Windows) are generated in
`frontend/src-tauri/target/release/bundle/`.

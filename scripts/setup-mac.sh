#!/usr/bin/env bash
# Installe les prérequis pour développer sur Teranga Code (macOS).
# Usage : bash scripts/setup-mac.sh

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RESET='\033[0m'

ok()   { echo -e "${GREEN}✔${RESET} $1"; }
todo() { echo -e "${YELLOW}→${RESET} $1"; }

echo "Teranga Code — installation des prérequis (macOS)"
echo "---------------------------------------------------"

# 1. Xcode Command Line Tools (nécessaire pour compiler quoi que ce soit, dont Rust)
if xcode-select -p >/dev/null 2>&1; then
  ok "Xcode Command Line Tools déjà installés"
else
  todo "Installation des Xcode Command Line Tools (une fenêtre va s'ouvrir)..."
  xcode-select --install || true
  echo "  Relance ce script une fois l'installation terminée."
  exit 0
fi

# 2. Homebrew
if command -v brew >/dev/null 2>&1; then
  ok "Homebrew déjà installé"
else
  todo "Installation de Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# 3. Git
if command -v git >/dev/null 2>&1; then
  ok "Git déjà installé ($(git --version))"
else
  todo "Installation de Git..."
  brew install git
fi

# 4. Docker Desktop (nécessaire pour `docker compose up`)
if command -v docker >/dev/null 2>&1; then
  ok "Docker déjà installé"
else
  todo "Installation de Docker Desktop..."
  brew install --cask docker
  echo "  Lance Docker Desktop une première fois manuellement (icône dans Applications) avant de continuer."
fi

# 5. Node.js (utile pour lancer les scripts hors Docker, ex: validation de contenu, build desktop)
if command -v node >/dev/null 2>&1; then
  ok "Node.js déjà installé ($(node --version))"
else
  todo "Installation de Node.js (LTS)..."
  brew install node
fi

# 6. Rust (uniquement nécessaire pour construire l'application desktop Tauri)
read -r -p "Installer Rust pour pouvoir construire l'app desktop (Mac/Windows) ? [y/N] " answer
if [[ "$answer" =~ ^[Yy]$ ]]; then
  if command -v cargo >/dev/null 2>&1; then
    ok "Rust déjà installé ($(rustc --version))"
  else
    todo "Installation de Rust via rustup..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    echo "  Ouvre un nouveau terminal (ou lance : source \"\$HOME/.cargo/env\") pour que 'cargo' soit disponible."
  fi
else
  todo "Rust non installé — nécessaire seulement si tu veux construire l'app desktop (npm run desktop:build)."
fi

echo ""
echo "---------------------------------------------------"
echo "Prochaines étapes :"
echo "  cp .env.example .env   # renseigne un JWT_SECRET : openssl rand -hex 32"
echo "  docker compose up --build"
echo ""
echo "Frontend : http://localhost:5185"
echo "Backend  : http://localhost:4000"

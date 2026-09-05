# Changelog

Toutes les évolutions notables du projet sont documentées ici, dans
l'esprit de [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [Non publié]

### Prévu (voir la roadmap dans le [README](README.md#roadmap))
- Traduction anglaise complète du contenu pédagogique
- Nouvelles régions internationales (au-delà du Sénégal)
- Défi quotidien, objectif hebdomadaire, classement entre amis

## 2026-08-31

### Ajouté
- Un pionnier IT réel (problème/solution/résultat) sur chacun des 55
  sujets pédagogiques, toutes origines confondues.
- Guide de contribution bilingue (FR/EN) et guide d'installation des
  prérequis avec scripts automatisés Mac/Windows.
- Licence MIT — le projet passe en open source public.

### Corrigé
- Page blanche au lancement de l'application desktop (routage
  incompatible avec le protocole interne de l'app native) — bascule vers
  un routeur adapté (hash-based) pour ce contexte uniquement.
- Absence d'écran de chargement visible pendant le démarrage initial.

## 2026-08-30

### Ajouté
- Application desktop native (Mac/Windows, via Tauri) : installateurs
  `.dmg` / `.exe` / `.msi`, fonctionnement 100 % hors-ligne avec création
  de compte locale (aucun serveur requis).
- Pipeline de build automatique (GitHub Actions) pour générer les
  installateurs desktop à chaque mise à jour.

## Avant

Voir l'historique complet des sujets pédagogiques, du module Architecture
des Systèmes d'Information, du simulateur d'entretien avec niveaux de
difficulté, et des illustrations interactives dans l'historique Git du
projet.

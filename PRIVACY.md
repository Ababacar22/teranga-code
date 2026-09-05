# Confidentialité des données / Data & Privacy

*Français ci-dessous · English below*

---

## 🇫🇷 Français

Teranga Code est un projet open source, auto-hébergé — il n'y a pas de
société tierce qui collecte tes données. Ce document explique clairement
ce qui est stocké, où, et pourquoi.

### Mode "compte" (backend en ligne)

Si tu crées un compte (email + mot de passe), voici ce qui est stocké
dans la base PostgreSQL de l'instance que tu utilises :

| Donnée | Pourquoi |
|---|---|
| Email | Identifiant de connexion |
| Pseudo | Affiché sur le classement et les défis |
| Mot de passe (haché avec bcrypt, jamais en clair) | Authentification |
| XP, badges, niveau, objectif, centres d'intérêt | Suivre ta progression |
| Questions manquées, série de jours actifs (streak) | Personnaliser tes révisions |

**Ce qui n'est jamais fait** : revente de données, publicité ciblée,
tracking tiers (pas de Google Analytics, pas de pixel Facebook), partage
avec un tiers quel qu'il soit.

### Mode invité / application desktop

En mode invité (navigateur) ou dans l'application desktop, **rien ne
quitte ton appareil** : la progression est stockée uniquement en local
(`localStorage` du navigateur ou stockage local de l'app desktop). Aucun
serveur n'est contacté. Supprimer l'application ou vider les données du
site supprime définitivement cette progression — il n'existe pas de
sauvegarde côté serveur pour ce mode.

### Auto-hébergement

Le code étant open source (voir [README](README.md)), n'importe qui peut
héberger sa propre instance de Teranga Code. Dans ce cas, c'est
l'opérateur de cette instance (pas gainde-it.com) qui est responsable des
données de ses utilisateurs.

### Questions

Une question sur ces pratiques ? Ouvre une issue sur le [dépôt
GitHub](https://github.com/Ababacar22/teranga-code).

---

## 🇬🇧 English

Teranga Code is an open-source, self-hosted project — there is no third
party collecting your data. This document explains clearly what is
stored, where, and why.

### Account mode (online backend)

If you create an account (email + password), here's what is stored in
the PostgreSQL database of the instance you're using:

| Data | Why |
|---|---|
| Email | Login identifier |
| Pseudo (username) | Shown on the leaderboard and challenges |
| Password (hashed with bcrypt, never stored in plain text) | Authentication |
| XP, badges, level, goal, focus areas | Track your progress |
| Missed questions, active-day streak | Personalize your revision |

**What is never done**: selling data, targeted advertising, third-party
tracking (no Google Analytics, no Facebook pixel), sharing with any
third party.

### Guest mode / desktop app

In guest mode (browser) or in the desktop app, **nothing leaves your
device**: progress is stored locally only (browser `localStorage` or the
desktop app's local storage). No server is ever contacted. Deleting the
app or clearing site data permanently deletes this progress — there is
no server-side backup for this mode.

### Self-hosting

Since the code is open source (see [README](README.md)), anyone can host
their own instance of Teranga Code. In that case, the operator of that
instance (not gainde-it.com) is responsible for their users' data.

### Questions

Have a question about these practices? Open an issue on the [GitHub
repository](https://github.com/Ababacar22/teranga-code).

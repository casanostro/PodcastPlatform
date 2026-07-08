# PodcastPlatform — Portfolio terminal RobCo

> **Nouveau : portfolio statique « cyberpunk monochrome »** dans [`docs/`](docs/) — un `index.html` autonome déployable sur GitHub Pages sans build. Voir [`docs/README.md`](docs/README.md) pour les instructions de publication.

Site portfolio/CV au style terminal Fallout (RobCo), construit avec React + Vite côté client et Express côté serveur, servis sur un port unique. Le projet était à l'origine hébergé sur Replit ; il est désormais autonome et tourne sur n'importe quelle machine avec Node.js.

## Prérequis

- Node.js 20+ (testé avec Node 22)
- npm

Aucune base de données ni service externe n'est requis : les données (projets, podcasts) sont chargées depuis `shared/data/*.json` et servies depuis un stockage en mémoire (`server/storage.ts`). Les soumissions du formulaire de contact sont conservées en mémoire uniquement et disparaissent au redémarrage du serveur.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le serveur Express démarre avec Vite en middleware (HMR inclus) et sert l'application sur http://localhost:5000.

## Production

```bash
npm run build   # build client (dist/public) + bundle serveur (dist/index.js)
npm run start   # sert l'application buildée
```

## Variables d'environnement

| Variable | Requise | Défaut | Description |
|----------|---------|--------|-------------|
| `PORT` | non | `5000` | Port d'écoute du serveur (API + client) |
| `NODE_ENV` | non | — | Positionnée par les scripts npm (`development` / `production`) |
| `DATABASE_URL` | non | — | Uniquement pour `npm run db:push` (voir ci-dessous) ; jamais utilisée au runtime |

## Scripts

- `npm run dev` — serveur de développement (Express + Vite HMR)
- `npm run build` — build de production
- `npm run start` — lance le build de production
- `npm run check` — vérification TypeScript (`tsc`)
- `npm run db:push` — pousse le schéma Drizzle (`shared/schema.ts`) vers une base Postgres. **Optionnel** : l'application n'utilise pas de base de données ; ce script n'est utile que si vous décidez un jour de remplacer le stockage en mémoire par Postgres. Il exige alors `DATABASE_URL`.

## Structure

```
client/        Front React (Vite) — pages, composants UI (shadcn), thème terminal
server/        Express : index.ts (bootstrap), routes.ts (API), storage.ts (stockage mémoire), vite.ts (dev middleware / static prod)
shared/        Schéma Drizzle/Zod partagé + données JSON (projects.json, podcasts.json)
attached_assets/  Restes de l'export Replit (non utilisés par l'application)
```

## API

- `GET /api/projects`, `GET /api/projects/:id`, `GET /api/projects/slug/:slug`
- `GET /api/podcasts`, `GET /api/podcasts/featured`, `GET /api/podcasts/:id` (héritage de la version « marketplace » ; la page `client/src/pages/marketplace.tsx` existe mais n'est pas routée)
- `POST /api/contact` — soumission du formulaire de contact (`name`, `email`, `subject`, `message`)

## Historique migration Replit

Le projet a été extrait de Replit (juillet 2026) : fichier `.replit`, script `replit-dev-banner.js`, plugins Vite `@replit/*` et dépendances base de données/auth inutilisées ont été retirés ; le port est configurable via `PORT` et le bug de validation du formulaire de contact (champ `createdAt` exigé du client alors qu'il est ajouté côté serveur) a été corrigé.

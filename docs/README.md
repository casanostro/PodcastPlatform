# Portfolio — Business Analyst Supply Chain & Data

Site portfolio statique mono-page, direction visuelle **« futur cyberpunk, monochrome à dégradés »** : noir profond, gris, blanc cassé — zéro couleur saturée, typo mono technique (JetBrains Mono), grille HUD discrète, micro-animations au scroll.

## Contenu

- `index.html` — le site complet, **100 % autonome** (CSS et JS inline). Aucun build, aucun backend, aucune API key, aucune donnée sensible.
- Dépendances externes via CDN uniquement :
  - [Chart.js 4.4.3](https://www.chartjs.org/) (graphiques, thémés monochrome)
  - Google Fonts (JetBrains Mono + Inter)

  Si un CDN est indisponible, la page reste entièrement fonctionnelle (les graphiques sont simplement omis, les polices retombent sur les polices système).

## Anonymisation

Aucun nom, aucune photo, aucun détail interne (tables, vues, codes, chemins). Les contextes sectoriels et les chiffres d'impact affichés sont agrégés et anonymisés. Les liens GitHub / LinkedIn du footer sont des placeholders (`#`) à remplacer.

## Déployer sur GitHub Pages

### Option A — depuis ce dossier `docs/` (recommandé, rien à déplacer)

1. Pousser la branche contenant `docs/index.html` (ou la merger dans `main`).
2. Sur GitHub : **Settings → Pages**.
3. Sous *Build and deployment* : **Source = Deploy from a branch**, branche = `main` (ou la vôtre), dossier = **`/docs`**.
4. Sauvegarder. Le site est publié sous `https://<utilisateur>.github.io/<repo>/` en une à deux minutes.

### Option B — repo dédié

1. Créer un repo (par ex. `portfolio` ou `<utilisateur>.github.io`).
2. Y copier `index.html` à la racine.
3. **Settings → Pages** → Source = branche `main`, dossier `/ (root)`.

Aucune étape de build, aucun workflow Actions requis : c'est du HTML statique servi tel quel.

## Personnaliser

- **Liens footer** : chercher `foot-links` dans `index.html` et remplacer les `#`.
- **Palette** : tous les tokens sont dans le bloc `:root` en tête du `<style>`.
- **Chiffres** : les compteurs animés lisent `data-target` (et `data-decimals` / `data-group` pour le format français).

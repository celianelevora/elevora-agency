# Audit de sécurité — Elevora (elevora-next-v55)

_Dernière revue : 2026-06-17 — `next@14.2.35` (dernière version de la branche 14.2.x)._

## Résumé `npm audit`

| État | Détail |
|---|---|
| ✅ Corrigé | `js-yaml` (moderate, DoS) — résolu via `npm audit fix` non-breaking. |
| ⚠️ Résiduel accepté | 5 vulnérabilités (4 high + 1 moderate) **uniquement** corrigeables par une **major breaking** (`next@16` / `eslint-config-next@16`). Voir ci-dessous. |

## Pourquoi les vulnérabilités résiduelles ne sont pas corrigées

La contrainte projet est de **rester sur `next@14.2.x`** (pas de migration `next@16`,
qui est une rupture majeure : App Router, runtime, config et nombre d'APIs changent
et imposeraient une recette complète de non-régression). `npm audit fix --force`
installerait `next@16.2.9` — explicitement hors périmètre.

### 1. `next` — 4 advisories HIGH (DoS / SSRF / cache-poisoning / XSS)
- **Statut** : non corrigeable sans `next@16`. `14.2.35` est déjà le dernier patch 14.2.x.
- **Exposition réelle réduite par la configuration** :
  - **DoS Image Optimizer / remotePatterns / cache image** → l'app **n'utilise pas**
    `next/image` avec `remotePatterns` en wildcard ni d'optimiseur d'images exposé
    (images servies en `'self'`, cf. CSP `img-src 'self' data: blob:`).
  - **XSS via CSP nonces / beforeInteractive** → l'app n'emploie **pas** de nonces CSP
    dynamiques ni de scripts `beforeInteractive` avec entrée non fiable.
  - **Cache-poisoning / request smuggling / SSRF WebSocket** → atténué par l'hébergement
    (Infomaniak, instance Node unique, pas de couche de cache partagée custom), HSTS,
    `X-Frame-Options: DENY`, et CSP stricte (`frame-ancestors 'none'`, `object-src 'none'`).
- **Plan** : planifier une migration `next@15`/`16` lors d'une itération dédiée avec
  recette complète. À surveiller à chaque release de patch 14.2.x.

### 2. `glob` (HIGH) via `eslint-config-next` / `@next/eslint-plugin-next`
- **Nature** : injection de commande via le **flag CLI `-c/--cmd`** de `glob`.
- **Exposition réelle : nulle.** `glob` est une dépendance **de développement** (lint),
  jamais invoquée en CLI avec `-c` dans ce projet, jamais embarquée dans le bundle de
  production. Aucun chemin d'exploitation côté runtime/visiteur.
- **Statut** : non corrigée pour éviter un `eslint-config-next@16` désaligné de `next@14`.

### 3. `postcss` (moderate) — XSS via `</style>` non échappé dans la sortie Stringify
- **Statut** : version `postcss` imbriquée sous `next` → suit la chaîne `next` (cf. point 1).
  Outil de **build** (génération CSS au build SSG), pas exposé au runtime visiteur.

## Mitigations de sécurité déjà en place (rappel)

- **En-têtes** (`next.config.js`) : CSP stricte, HSTS 2 ans + preload, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `poweredByHeader: false`.
- **API `/api/contact`** : rate limiting (5 / 10 min / IP), vérification d'origine (anti-CSRF),
  honeypot `confirm_field`, plafonds de longueur par champ, échappement HTML des entrées,
  validation des pièces jointes (≤ 5 Mo, types MIME restreints).
- **Secrets** : `RESEND_API_KEY` côté serveur uniquement (jamais `NEXT_PUBLIC_`), `.env.local` git-ignoré.

## Action de revue recommandée

`npm audit` à chaque montée de version + revue trimestrielle de la faisabilité d'une
migration `next@16`.

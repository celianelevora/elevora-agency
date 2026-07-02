# Audit Responsive Elevora — Plan de correction

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans.

**Goal:** Corriger les défauts visuels mobile/tablette du site Elevora sans toucher au desktop.

**Architecture:** Couche de raffinement CSS additive en fin de `app/globals.css`, **uniquement** en `@media (max-width)`. Aucune règle desktop modifiée.

**Tech Stack:** Next.js 14 SSG, CSS global (6305 lignes), Tailwind.

## Global Constraints (verbatim)
- Ne pas toucher : `app/api/contact/route.ts`, `.env.local`, `/public`.
- Ne pas changer les couleurs charte : `#1B4F8A`, `#C9266A`, `#1A1A2E`, `#EAE9EE`.
- Corrections en `max-width` uniquement — desktop strictement intact.
- `npx tsc --noEmit` = 0 erreur. `npm run build` = succès.

---

## Constat d'audit (mesuré via Playwright à 320 / 360 / 768px sur 7 pages)

Le site est **déjà très solide en responsive** : 58 media queries existantes, grilles
qui collapsent (`.form-grid-2`, `.site-footer-cols`, `.footer-grid`…), drawer mobile
à liens ≥47px, formulaires en pleine largeur, titres en `clamp()`. **Aucun overflow
horizontal réel** détecté (home, tarifs, démarrer-un-projet, agence, réalisations,
méthode, service). Les hover-reveal (`.svc-inc`) sont décoratifs → contenu accessible au touch.

Défauts authentiques restants, tous mobiles :

| # | Défaut | Preuve | Sévérité |
|---|--------|--------|----------|
| 1 | Micro-scroll horizontal ~8px (home) | `scrollW 313 > vw 305` à 320px ; marquee CTA | P2 |
| 2 | Inputs `font-size:14px` → zoom auto iOS | `inputFontSize:"14px"` mesuré | P1 |
| 3 | Liens footer : zone de tap ~20px (<44px) | `smallTaps` h:20 sur `.site-footer-col a` | P2 |
| 4 | Préfixe tarif `.tz-row__from` 11px | `tinyFonts` fs:11 | P3 |

---

### Task 1 : Couche de raffinement mobile (append `app/globals.css`)

**Files:** Modify `app/globals.css` (append fin de fichier, après l. 6305).

- [ ] Étape 1 : Appendre le bloc CSS (4 sections, toutes `@media max-width`).
- [ ] Étape 2 : `npx tsc --noEmit` → 0 erreur.
- [ ] Étape 3 : `npm run build` → succès.
- [ ] Étape 4 : Re-mesurer le micro-scroll home à 320/360px via Playwright → `scrollW === vw`.
- [ ] Étape 5 : Vérifier inputs = 16px à 375px, liens footer tap ≥44px.

Contenu : voir bloc appliqué en fin de `globals.css` (commentaire « AUDIT RESPONSIVE »).

# Elevora — Animations & Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Enrichir le site Elevora avec des animations de texte à l'apparition, des boutons plus vivants et des micro-interactions cohérentes, sans rien casser ni supprimer.

**Architecture:** Réutilisation stricte des primitives existantes `StaggerText` (titres h1/h2) et `BlurFade` (paragraphes/leads), déjà employées sur `app/agence/page.tsx`. Le support `prefers-reduced-motion` est centralisé dans ces deux primitives pour couvrir tout le site d'un coup. Les boutons et micro-interactions sont enrichis dans `app/globals.css` (la plupart des classes existent déjà — on AMÉLIORE, on ne duplique pas).

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind v3, Framer Motion, GSAP.

**Contraintes absolues :** ne pas toucher `app/api/contact/route.ts`, `.env.local`, `/public`, ni les couleurs charte (#1B4F8A Klein, #C9266A framboise, #1A1A2E, #EAE9EE). Ne pas casser `CinematicHero`. Base = v55, en place.

**État des lieux (déjà présent, à NE PAS dupliquer) :**
- `ForWho`, `Manifesto`, toute la page `agence` : StaggerText/BlurFade ✅
- `EngagementsGrid` : entrée staggered au scroll (`.eng-cards.in-view`) ✅
- Cards projet : `translateY(-6px)` + image `scale(1.04)` ✅ (déjà ≥ demande)
- FAQ : chevron rotate 180° (FaqsSection) / +→× (FAQ.tsx) ✅
- Header underline animé (`.hdr-link::after` scaleX) ✅ — à améliorer en slide gauche→droite
- Form focus : glow Klein box-shadow ✅ — à intensifier
- `.elv-cta-btn` : reflet glissant + press ✅ — à généraliser aux autres boutons primaires

---

### Task 1 : Support prefers-reduced-motion centralisé

**Files:**
- Modify: `components/ui/stagger-text.tsx`
- Modify: `components/ui/blur-fade.tsx`

- [ ] **Step 1 :** Dans `stagger-text.tsx`, importer `useReducedMotion` depuis framer-motion. Si `true`, rendre le `text` en clair dans un `<span>` sans motion (état final visible, pas d'animation).
- [ ] **Step 2 :** Dans `blur-fade.tsx`, importer `useReducedMotion`. Si `true`, forcer `isInView` visible immédiatement et neutraliser y/blur (variant visible sans translation/flou).
- [ ] **Step 3 :** `npx tsc --noEmit` → 0 erreur.

### Task 2 : Système de boutons + micro-interactions (globals.css)

**Files:** Modify `app/globals.css`

- [ ] **Step 1 — reflet glissant boutons primaires :** ajouter un pseudo `::before` reflet (modèle `.elv-cta-btn::before` lignes 246-251) sur `.cta-big`, `.hdr-cta`, `.form-submit`. Ajouter `overflow:hidden; position:relative` si manquant, et `position:relative;z-index:1` au contenu.
- [ ] **Step 2 — press scale(0.97) :** sur `.cta-big:active`, `.hdr-cta:active`, `.form-submit:active`, `.elv-cta-btn:active`, `.elv-cta-btn-ghost:active` → `transform: scale(0.97)`.
- [ ] **Step 3 — boutons ghost/outline :** sur `.projects-cta`, `.agence-approche-link`, `.elv-cta-btn-ghost`, `.reali-*` ghost → transition `background .3s ease` + `:hover { transform: translateY(-2px); }`.
- [ ] **Step 4 — header underline slide gauche→droite :** `.hdr-link::after { transform-origin: left; }` (hover conserve scaleX(1)).
- [ ] **Step 5 — focus glow champs :** `.form-input:focus, .form-textarea:focus, .form-select:focus` → glow Klein plus marqué (`box-shadow: 0 0 0 3px rgba(27,79,138,.18), 0 0 0 1px var(--klein)`) avec transition déjà présente.
- [ ] **Step 6 :** uniformiser les CTA services (voir Task 4) via classe partagée `.svc-cta` / `.svc-cta-ghost` ajoutée ici.
- [ ] **Step 7 :** bloc `@media (prefers-reduced-motion: reduce)` neutralisant les `transform`/`::before` ajoutés.
- [ ] **Step 8 :** `npx tsc --noEmit`.

### Task 3 : Titres de la page d'accueil (StaggerText/BlurFade)

**Files:** Modify `components/WhyNow.tsx`, `components/ProjectShowcase.tsx`, `components/MethodSteps.tsx`

- [ ] **Step 1 — WhyNow :** importer `StaggerText`/`BlurFade`; wrapper `.whynow-title` en StaggerText (parties regular + italic séparées comme agence) et `.whynow-lead` en `BlurFade inView`.
- [ ] **Step 2 — ProjectShowcase :** ajouter `'use client'`; wrapper `.projects-title` en StaggerText.
- [ ] **Step 3 — MethodSteps :** wrapper `.method2-title` en StaggerText (déjà client).
- [ ] **Step 4 :** `npx tsc --noEmit`.

### Task 4 : Animations texte sur les pages restantes (sous-agents parallèles)

**Files:** Modify `app/tarifs/page.tsx`, `app/realisations/page.tsx`, `app/contact/page.tsx`, `app/demarrer-un-projet/page.tsx`, `app/services/{site-vitrine/VitrineClient,site-ecommerce/EcommerceClient,landing-page/LandingClient,application-web-mobile/AppClient,crm-outil-de-gestion/CrmClient}.tsx`

- [ ] **Step 1 :** Pour chaque fichier : h1/h2 de section → `StaggerText` (texte simple ; spans stylés italic/couleur = StaggerText séparés) ; leads/descriptions → `BlurFade inView delay`. Ne pas toucher au reste, garder les classes/couleurs. CTA services inline-style → classes `.svc-cta`/`.svc-cta-ghost`.
- [ ] **Step 2 :** `npx tsc --noEmit`.

### Task 5 : Passe polish + validation finale

- [ ] **Step 1 :** Skill `polish` sur les fichiers modifiés (alignement, cohérence delays, espacement).
- [ ] **Step 2 :** Vérifier que chaque animation respecte `prefers-reduced-motion` (via Task 1 + Task 2 Step 7).
- [ ] **Step 3 :** `npx tsc --noEmit` final → 0 erreur TypeScript.

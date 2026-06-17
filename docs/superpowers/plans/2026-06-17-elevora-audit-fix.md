# Elevora — Audit complet & corrections post-restauration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réparer les gaps introduits par la restauration partielle, corriger les 2 écarts CLAUDE.md (polices Google→Fontshare, npm audit), combler les manques sécurité/a11y, et valider le projet (tsc 0 erreur + build OK).

**Architecture:** Next.js 14.2.35 App Router (SSG), TypeScript strict, Tailwind + shadcn, GSAP/Framer Motion. Pas de test runner → les portes de vérification sont `npx tsc --noEmit`, `npm run build` et des `grep` ciblés.

**Tech Stack:** Next 14.2.35, React 18, Tailwind 3.4, Resend 4, Framer Motion 11, GSAP 3.

## Global Constraints

- Ne JAMAIS supprimer de contenu existant — ajouter/compléter (CLAUDE.md §1).
- Polices via `next/font` OU Fontshare uniquement — Roboto/Inter/Arial bannis (CLAUDE.md §3/§4).
- Pas de major breaking : rester en next@14.2.x (PAS next@16).
- TypeScript strict, pas de `console.log` en prod (CLAUDE.md §6.8).
- WCAG 2.2 AA, menu burger mobile, headers de sécurité, rate limiting (CLAUDE.md §6/§7/§9).
- Mention « Site conçu par Elevora Agency » conservée dans le footer.

---

### Task 1: Recréer `CookieBanner.tsx` (P0 — build cassé)

**Files:**
- Create: `components/CookieBanner.tsx`

**Contexte:** `app/layout.tsx:9` importe `@/components/CookieBanner` et le rend `app/layout.tsx:87`. Le fichier a disparu à la restauration → `tsc` échoue, build impossible. Une page `/cookies` existe déjà (lien). Design system : `--night #1A1A2E`, `--cream #EAE9EE`, `--pink #C9266A`, `--klein #1B4F8A`, `--serif`, `--radius-lg`.

- [ ] **Step 1:** Créer le composant client : bannière fixée en bas, `role="dialog"` + `aria-label`, texte RGPD + lien `/cookies`, boutons « Tout accepter » / « Refuser » (≥44px), persistance `localStorage('elevora-cookie-consent')`, montée après `mount` (pas de mismatch SSR), animation d'entrée douce, ne bloque pas le scroll.
- [ ] **Step 2:** Vérifier : `npx tsc --noEmit` → 0 erreur (la seule erreur TS2307 disparaît).

---

### Task 2: Corriger le honeypot anti-spam (P1 — sécurité)

**Files:**
- Modify: `components/ContactSimpleForm.tsx`
- Modify: `components/StartProjectForm.tsx`
- Modify (si présent et utilisé): `components/ContactForm.tsx`

**Contexte:** Le serveur (`app/api/contact/route.ts:275`) teste `data.confirm_field` et son commentaire déconseille explicitement `website` (autofill). Or les formulaires envoient `name="website"` → honeypot inopérant.

- [ ] **Step 1:** Renommer le champ honeypot `name="website"` → `name="confirm_field"` dans chaque formulaire (garder `tabIndex={-1}`, `aria-hidden`, off-screen, `autoComplete="off"`).
- [ ] **Step 2:** Vérifier : `grep -rn "confirm_field" components/` retourne les formulaires ; plus aucun `name="website"` honeypot.

---

### Task 3: Accessibilité formulaires — `htmlFor`/`id` + erreurs `role="alert"` (P1)

**Files:**
- Modify: `components/ContactSimpleForm.tsx`
- Modify: `components/StartProjectForm.tsx`
- Modify: `components/PhoneInput.tsx`
- Modify (si utilisé): `components/ContactForm.tsx`

**Contexte:** Labels sans `htmlFor`, inputs sans `id` → non associés (échec WCAG 1.3.1 / 4.1.2). Les erreurs passent par `alert()` natif (pas annoncé proprement, mauvaise UX). Succès non annoncé aux lecteurs d'écran.

- [ ] **Step 1:** Donner un `id` unique à chaque `input/select/textarea` et `htmlFor` correspondant sur chaque `<label>`. Idem dans `PhoneInput`.
- [ ] **Step 2:** Remplacer `alert(...)` par un état d'erreur inline rendu dans un conteneur `role="alert"` (message FR clair).
- [ ] **Step 3:** Ajouter `role="status"` / `aria-live="polite"` sur les écrans de succès.
- [ ] **Step 4:** Vérifier : `npx tsc --noEmit` → 0 erreur.

---

### Task 4: Polices Google → Fontshare (P1 — écart CLAUDE.md §4)

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css` (`--sans`)
- Modify: `next.config.js` (CSP : autoriser Fontshare)

**Contexte:** `layout.tsx` charge `Roboto` via `next/font/google` (banni). Décision : corps Roboto → **Satoshi** (Fontshare, prescrit pour « Agence » dans CLAUDE.md). **Cormorant Garamond** n'existe PAS sur Fontshare → conservé en `next/font/google` self-hosted, exception documentée en commentaire (le client veut Cochin ; Cormorant en est le fallback le plus fidèle).

- [ ] **Step 1:** Retirer l'import/instance `Roboto` de `layout.tsx`. Ajouter dans le `<head>` : `preconnect` + `preconnect cdn.fontshare.com` + `<link>` Fontshare Satoshi (300,400,500,700). Retirer `roboto.variable` du `<html className>`.
- [ ] **Step 2:** Mettre à jour `globals.css` `--sans: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;` (supprimer la dépendance à `--font-roboto`/`'Roboto'`).
- [ ] **Step 3:** Mettre à jour la CSP dans `next.config.js` : `style-src` += `https://api.fontshare.com`, `font-src` += `https://cdn.fontshare.com`.
- [ ] **Step 4:** Documenter en commentaire l'exception Cormorant (next/font/google self-hosted, pas d'équivalent Fontshare).
- [ ] **Step 5:** Vérifier : `grep -n "Roboto" app/layout.tsx` → plus d'import next/font Roboto.

---

### Task 5: npm audit — corriger le non-breaking + documenter le résiduel (P1 — écart CLAUDE.md §6.7)

**Files:**
- Modify: `package.json` (commentaire de doc si besoin)
- Create: `docs/SECURITY-AUDIT.md`

**Contexte:** `next@14.2.35` est déjà la dernière 14.2.x. Les 4 HIGH `next` (DoS/SSRF/cache-poisoning) ne se corrigent que par `next@16` (major breaking) → hors périmètre. `glob` HIGH vient de `eslint-config-next` (devDep, command-injection via flag CLI `-c` jamais utilisé). `js-yaml`/`postcss` moderate.

- [ ] **Step 1:** Lancer `npm audit fix` (SANS `--force`) pour récupérer les correctifs non-breaking.
- [ ] **Step 2:** Re-`npm audit` ; documenter dans `docs/SECURITY-AUDIT.md` chaque vuln résiduelle, sa raison de non-correction (major breaking next@16 / devDep non exploitable) et les mitigations en place (CSP, pas de remotePatterns wildcard, image optimizer non exposé).
- [ ] **Step 3:** Vérifier : `npm run build` passe toujours.

---

### Task 6: Vérification du travail antérieur + passes skills (P2)

**Files:** lecture/grep ciblés ; corrections seulement si gap réel.

- [ ] **Step 1:** SEO — confirmer metadata, JSON-LD (`lib/seo.ts`), `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`. (déjà vérifié présents)
- [ ] **Step 2:** Sécurité — CSP/HSTS/X-Frame/poweredByHeader (`next.config.js`), rate limit (`lib/rate-limit.ts`), origin check. (présents)
- [ ] **Step 3:** Animations — `grep BlurFade|StaggerText` sur `app/` + clients services ; vérifier WhyNow/ProjectShowcase/MethodSteps.
- [ ] **Step 4:** Lancer les skills `audit`, `seo-structure`, `security-review`, `ui-ux-pro-max`, `polish` ; traiter tout P0/P1 surfacé.

---

### Task 7: Validation finale

- [ ] **Step 1:** `npx tsc --noEmit` → 0 erreur.
- [ ] **Step 2:** `npm run build` → succès (toutes les routes générées).
- [ ] **Step 3:** Confirmer `.env.local` contient `RESEND_API_KEY` (présence de la clé, sans l'exposer).
- [ ] **Step 4:** Récap final des changements.

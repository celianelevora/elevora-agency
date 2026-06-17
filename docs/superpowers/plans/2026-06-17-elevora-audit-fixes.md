# Elevora Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all issues identified in the elevora-next-v55 audit (accessibility, RGPD, SEO credibility, branding) without breaking existing content, styles, animations, SEO or security.

**Architecture:** Next.js 14 App Router project. Fixes touch form components, the root layout, the error boundary, SEO schema helper, the app icon, and add a new client-side cookie banner. All edits are additive or surgical; no visible content or existing styling changes.

**Tech Stack:** Next.js 14, React, TypeScript (strict), App Router file conventions (`app/icon.tsx` ImageResponse for favicon).

## Global Constraints (verbatim from spec)

- Ne pas toucher à `app/api/contact/route.ts`
- Ne pas toucher à `.env.local`
- Ne pas modifier `/public` (sauf si favicon nécessaire — ici on utilise `app/icon.tsx`, donc /public reste intact)
- Ne pas changer le contenu visible ni les styles existants
- Ne pas casser les animations, le SEO, la sécurité déjà en place
- `npx tsc --noEmit` = 0 erreur à la fin
- Couleur Klein officielle Elevora : `#1B4F8A` ; crème : `#EAE9EE` ; Nuit (bandeau cookies) : `#1A1A2E`

---

### Task 1 (CRITIQUE): Accessibilité formulaires — association label↔input

**Files:**
- Modify: `components/ContactSimpleForm.tsx`
- Modify: `components/StartProjectForm.tsx`

- [ ] Add `htmlFor` on each `<label>` and matching `id` on each `<input>/<textarea>/<select>`. Use the existing `name` value as the id (e.g. `id="first_name"`). The RGPD checkbox label wraps its input — keep wrapping but still add id+htmlFor for robustness. PhoneInput is a separate component (already labelled internally) — leave as-is.

### Task 2 (CRITIQUE): Skip navigation link

**Files:**
- Modify: `app/layout.tsx`

- [ ] Add `<a href="#main-content" className="skip-link">Aller au contenu principal</a>` as the very first child of `<body>`. Add `id="main-content"` to `<main>`. The `.skip-link` class already-or-newly visually hidden but focusable — confirm `sr-only`/skip-link CSS exists in globals.css; if not, use inline-style approach that hides off-screen but becomes visible on `:focus`. (Do not modify globals.css if avoidable — use a self-contained style.)

### Task 3 (CRITIQUE): Vidéo hero preload

**Files:**
- Modify: `components/CinematicHero.tsx`

- [ ] Change `preload="auto"` to `preload="metadata"` on the hero `<video>`.

### Task 4 (IMPORTANT): error.tsx honest copy + home button

**Files:**
- Modify: `app/error.tsx`

- [ ] Replace the false "Notre équipe a été automatiquement notifiée" promise with honest copy inviting refresh / return home. Ensure a "Retour à l'accueil" button pointing to `/` exists (already present via Link — keep it).

### Task 5 (IMPORTANT): Accessible form error messages

**Files:**
- Modify: `components/ContactSimpleForm.tsx`
- Modify: `components/StartProjectForm.tsx`

- [ ] Replace `alert(...)` send-error with an inline error message element carrying `role="alert"` and `aria-live="polite"`. Use error state. Style minimally inline (no globals.css change), keep wording identical: "Une erreur est survenue, merci de réessayer."

### Task 6 (IMPORTANT): Favicon via app/icon.tsx

**Files:**
- Create: `app/icon.tsx`

- [ ] Create `app/icon.tsx` using `ImageResponse` (32x32): background `#1B4F8A`, centered "E" in `#EAE9EE`.

### Task 7 (IMPORTANT): icon.svg color

**Files:**
- Modify: `app/icon.svg`

- [ ] Replace `#0033A0` with `#1B4F8A`.

### Task 8 (SEO): Remove AggregateRating (5/5, 2 avis)

**Files:**
- Modify: `lib/seo.ts`
- Modify: `app/page.tsx`
- Modify: `app/realisations/page.tsx`

- [ ] Comment out the `aggregateRating` block in `aggregateRatingSchema` with a note to re-enable at 10+ avis; remove the `aggregateRatingSchema(5, 2)` calls from both pages and clean their imports. Keep tsc clean.

### Task 9 (RGPD): Cookie banner

**Files:**
- Create: `components/CookieBanner.tsx`
- Modify: `app/layout.tsx`

- [ ] Client component: bottom fixed banner, bg `#1A1A2E`, crème text, "Accepter"/"Refuser" buttons, persists choice in `localStorage`, shows only if no choice made. Import in layout (after content).

### Final verification

- [ ] `npx tsc --noEmit` → 0 error
- [ ] grep confirms no remaining `preload="auto"`, no `#0033A0`, no active `aggregateRatingSchema(` call, no false-notification copy.
</content>
</invoke>

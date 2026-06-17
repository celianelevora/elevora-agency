# Elevora — Security Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`).

**Goal:** Durcir la sécurité du site Elevora (headers HTTP/CSP, protection de l'API contact, hardening général) sans casser les fonctionnalités, animations, SEO, ni toucher au contenu visible / `.env.local`.

**Architecture:** Headers + CSP via `next.config.js` `async headers()` (CSP assouplie en dev pour HMR, stricte en prod). Rate limiting in-memory réutilisable dans `lib/rate-limit.ts`. Route `/api/contact` durcie : rate limit par IP, vérif d'origine, honeypot, plafonds de longueur, limite de pièce jointe. Honeypot invisible ajouté aux 2 formulaires.

**Tech Stack:** Next.js 14.2.35 (App Router), TypeScript, Resend.

**Constat audit :**
- console.log fuyant : 0. `process.env` : seulement `RESEND_API_KEY` côté serveur. ✅ Aucune fuite client.
- robots : `/api/` déjà en disallow ; pages légales indexables. ✅
- npm audit : 6 vulns (4 high next, 2 moderate postcss). next déjà en 14.2.35 (dernier patch). Correctif complet = `next@16` (BREAKING) → **non appliqué** (casserait le projet). Advisories non-applicables/faible risque pour ce site (documenté).

**Contraintes :** ne pas toucher `.env.local`, ni contenu visible/styles ; ne pas casser forms/animations/SEO ; CSP ne doit pas bloquer Framer Motion, GSAP, Google Fonts (self-hostées via next/font) ni l'envoi des formulaires ; `npx tsc --noEmit` = 0 erreur.

---

### Task 1 : Headers HTTP de sécurité + CSP (next.config.js)

**Files:** Modify `next.config.js`

- [ ] **Step 1 :** Ajouter `poweredByHeader: false` (supprime `X-Powered-By`).
- [ ] **Step 2 :** `async headers()` appliquant à `/:path*` : `Content-Security-Policy`, `Strict-Transport-Security` (max-age 2 ans, includeSubDomains, preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/microphone/geolocation/browsing-topics désactivés), `X-DNS-Prefetch-Control: on`.
- [ ] **Step 3 — CSP :** `default-src 'self'`; `script-src 'self' 'unsafe-inline'` (+ `'unsafe-eval'` en dev) ; `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` (inline styles Framer/GSAP/projet) ; `img-src 'self' data: blob:` ; `font-src 'self' https://fonts.gstatic.com data:` ; `media-src 'self'` ; `connect-src 'self'` (+ `ws:` en dev pour HMR) ; `object-src 'none'` ; `base-uri 'self'` ; `form-action 'self'` ; `frame-ancestors 'none'` ; `upgrade-insecure-requests`. CSP calculée selon `process.env.NODE_ENV`.
- [ ] **Step 4 :** `npx tsc --noEmit` (js mais vérifie la base) + relecture manuelle.

### Task 2 : Rate limiter in-memory

**Files:** Create `lib/rate-limit.ts`

- [ ] **Step 1 :** `rateLimit(key, { limit, windowMs })` → `{ allowed: boolean, remaining, retryAfter }`. Map en mémoire `key -> { count, resetAt }`, nettoyage paresseux des entrées expirées. Sans dépendance externe.
- [ ] **Step 2 :** Helper `getClientIp(request)` lisant `x-forwarded-for` (1er IP) puis `x-real-ip`, fallback `'unknown'`.
- [ ] **Step 3 :** `npx tsc --noEmit`.

### Task 3 : Hardening de /api/contact

**Files:** Modify `app/api/contact/route.ts`

- [ ] **Step 1 — Origine (CORS/CSRF) :** en POST, lire `origin`/`referer`. Autoriser `https://elevora-agency.com`, `https://www.elevora-agency.com`, et localhost en dev. Si `origin` présent et non autorisé → 403.
- [ ] **Step 2 — Rate limit :** clé = IP, `limit: 5`, `windowMs: 10 * 60_000`. Si dépassé → 429 + header `Retry-After`.
- [ ] **Step 3 — Honeypot :** si `data.website` (champ piège) non vide → renvoyer `{ ok: true }` 200 SANS envoyer d'email (leurre anti-bot).
- [ ] **Step 4 — Longueurs :** plafonds par champ (noms/sujet ≤ 200, email ≤ 200, message/description ≤ 5000, autres ≤ 1000). Au-delà → 400. Tronquer les champs non critiques par sécurité.
- [ ] **Step 5 — Pièce jointe :** refuser si > 5 Mo (400) ; restreindre les types MIME (pdf, images, doc/docx, txt) ; sinon ignorer le fichier.
- [ ] **Step 6 :** garder la sanitisation `esc()` et le logging `console.error` (serveur, sans secrets). `npx tsc --noEmit`.

### Task 4 : Honeypot dans les formulaires

**Files:** Modify `components/ContactSimpleForm.tsx`, `components/StartProjectForm.tsx`

- [ ] **Step 1 :** Ajouter un champ honeypot invisible (non lu par les humains) juste après l'ouverture du `<form>` : `<input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position:'absolute', left:'-9999px', width:1, height:1, opacity:0 }} />`. N'altère AUCUN contenu visible.
- [ ] **Step 2 :** `npx tsc --noEmit`.

### Task 5 : Dépendances & vérifs finales

- [ ] **Step 1 :** `npm audit` — confirmer que les highs restants exigent `next@16` (breaking) ; ne PAS lancer `--force`. Documenter (faible risque / non applicable pour ce site).
- [ ] **Step 2 :** Confirmer `robots.ts` (`/api/` disallow, légales indexables) et absence de secret/console.log client.
- [ ] **Step 3 :** `npx tsc --noEmit` final = 0 erreur.

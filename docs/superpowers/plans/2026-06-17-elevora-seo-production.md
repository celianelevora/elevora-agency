# Elevora — SEO Production-Ready Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`).

**Goal:** SEO/AEO/GEO/SXO complet et production-ready sur le site Elevora : données structurées Schema.org, métadonnées par page (title/description/canonical/OG), OG image, sitemap/robots corrigés — sans toucher au contenu visible.

**Architecture:** Une lib centrale `lib/seo.ts` exporte les constantes business (NAP) + les objets JSON-LD (Organization, WebSite, LocalBusiness/ProfessionalService) et des helpers (`serviceSchema`, `faqSchema`, `breadcrumbSchema`, `howToSchema`). Un composant serveur `components/StructuredData.tsx` rend les `<script type="application/ld+json">`. Le schéma site-wide est injecté dans `app/layout.tsx`; le schéma spécifique est injecté par page. L'OG image est générée via `app/opengraph-image.tsx` (next/og, pas de fichier dans /public).

**Tech Stack:** Next.js 14 App Router, TypeScript strict, next/og.

**Données business (NAP) :** Elevora — Agence digitale, 96 rue des Sports, 44840 Les Sorinières, France · contact@elevora-agency.com · +33 7 78 43 57 21 · Fondateur Célian Soulet Lapetina · SIREN 105 274 112 · https://elevora-agency.com · zone : Nantes & France.

**Contraintes :** NE PAS toucher `app/api/contact/route.ts`, `.env.local`, `/public`, ni le **contenu visible**. JSON-LD = scripts invisibles (OK). `npx tsc --noEmit` = 0 erreur.

---

### Task 1 : Lib SEO + composant StructuredData

**Files:** Create `lib/seo.ts`, `components/StructuredData.tsx`

- [ ] **Step 1 :** `lib/seo.ts` — exporter `SITE` (url, name, NAP, founder, siren, phone, email, sameAs[]), `organizationSchema`, `websiteSchema`, `localBusinessSchema` (ProfessionalService avec address PostalAddress, geo approx Les Sorinières lat 47.1457 lng -1.5286, areaServed, founder, telephone, email, priceRange "€€"), et helpers `serviceSchema({name,description,url})`, `faqSchema(items)`, `breadcrumbSchema(items)`, `howToSchema({name,description,steps})`. Tous typés, retournant des objets `Record<string, unknown>` avec `@context`/`@type`.
- [ ] **Step 2 :** `components/StructuredData.tsx` — composant serveur `({ data }: { data: object | object[] })` qui rend un `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`.
- [ ] **Step 3 :** `npx tsc --noEmit`.

### Task 2 : Injection site-wide + OG image + sitemap/robots

**Files:** Modify `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`; Create `app/opengraph-image.tsx`, `app/twitter-image.tsx`

- [ ] **Step 1 :** `layout.tsx` — importer `StructuredData` + schémas; rendre `<StructuredData data={[organizationSchema, websiteSchema, localBusinessSchema]} />` dans `<body>`. Ajouter `alternates: { canonical: '/' }` et `openGraph.images`/`twitter` (gérés par opengraph-image.tsx, donc juste vérifier la cohérence). Ne pas casser l'existant.
- [ ] **Step 2 :** `app/opengraph-image.tsx` — `next/og` ImageResponse 1200x630, fond charte (#1A1A2E + accent Klein #1B4F8A), "Elevora" + "Agence digitale — Nantes". `export const size = {width:1200,height:630}`, `contentType='image/png'`, `alt`, `runtime` par défaut (nodejs). `app/twitter-image.tsx` réexporte le même rendu.
- [ ] **Step 3 :** `sitemap.ts` — ajouter `{ url: '/demarrer-un-projet', priority: 0.8, changeFrequency: 'yearly' }`. Vérifier que les redirects (`sites-web`, `outils-de-gestion`) restent EXCLUS.
- [ ] **Step 4 :** `robots.ts` — ajouter `host: 'https://elevora-agency.com'`; garder `disallow: ['/api/']`.
- [ ] **Step 5 :** `npx tsc --noEmit`.

### Task 3 : Métadonnées par page (title/description/canonical/OG)

**Files:** Modify metadata de `app/page.tsx`, `app/methode`, `app/realisations`, `app/tarifs`, `app/agence`, `app/contact`, `app/demarrer-un-projet`, `app/services/*` (5), `app/{mentions-legales,confidentialite,cgv,cookies}`

- [ ] **Step 1 :** Pour CHAQUE page, normaliser le `metadata` :
  - `title`: utiliser `{ absolute: '<50-60c, mot-clé en tête>' }` pour éviter le double suffixe « — Elevora » (les titres légaux actuels produisent « … — Elevora Agency — Elevora »).
  - `description`: 150-160c, mot-clé + bénéfice (générer si absent, FR).
  - `alternates: { canonical: '<path>' }`.
  - `openGraph: { title, description, url: '<url absolue>', type: 'website' }`.
  - Pages légales : ajouter `robots: { index: true, follow: true }` (laisser indexable) mais canonical correct.
- [ ] **Step 2 :** `npx tsc --noEmit`.

### Task 4 : JSON-LD par page (Service, FAQPage, HowTo, Breadcrumb)

**Files:** Modify `app/services/*` (5), `app/methode/page.tsx`, `app/page.tsx`, `app/tarifs/page.tsx`

- [ ] **Step 1 — Services (×5) :** dans chaque `page.tsx`, rendre `<><StructuredData data={[serviceSchema({...}), breadcrumbSchema([{Accueil,/},{Services,/services...},{<nom>,<url>}])]} /><XClient/></>`. Service.provider = Organization, areaServed = "France", serviceType adapté.
- [ ] **Step 2 — Méthode :** `howToSchema` avec les 4 étapes (Cadrage, Design, Développement, Livraison) + descriptions courtes. Injecter via StructuredData.
- [ ] **Step 3 — Accueil :** `faqSchema` avec les 6 Q/R de FaqsSection (copiées dans la page, 40-60 mots). Injecter dans `app/page.tsx`.
- [ ] **Step 4 — Tarifs :** `faqSchema` avec les Q/R FAQ tarifs si présentes ; sinon `breadcrumbSchema`. Injecter.
- [ ] **Step 5 :** `npx tsc --noEmit` final → 0 erreur.

### Task 5 : Validation finale
- [ ] **Step 1 :** `npx tsc --noEmit` = 0 erreur.
- [ ] **Step 2 :** Vérifier qu'aucun fichier interdit n'a été modifié (`route.ts`, `.env.local`, `/public`) et qu'aucun contenu visible n'a changé (seuls metadata + scripts JSON-LD ajoutés).

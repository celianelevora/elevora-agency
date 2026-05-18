# Elevora — Site Next.js

Site officiel de l'agence Elevora, construit avec **Next.js 14** (App Router) et **React 18**.

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir http://localhost:3000 dans le navigateur
```

Le site se rafraîchit automatiquement à chaque modification de fichier.

---

## 📁 Structure du projet

```
elevora-next/
├── app/                          # Pages (routing par dossier)
│   ├── layout.js                # Layout racine (header + footer partagés)
│   ├── page.js                  # Page d'accueil
│   ├── globals.css              # Styles globaux + design system
│   ├── api/
│   │   └── contact/
│   │       └── route.js         # API route — réception du formulaire
│   ├── services/
│   │   ├── sites-web/page.js
│   │   └── outils-de-gestion/page.js
│   ├── realisations/page.js
│   ├── methode/page.js
│   ├── agence/page.js
│   ├── contact/page.js
│   └── [pages légales]
│
├── components/                   # Composants réutilisables
│   ├── Header.js                # Menu de navigation
│   ├── Footer.js                # Pied de page
│   ├── Hero.js                  # Hero générique (réutilisé sur 6 pages)
│   ├── EngagementsGrid.js       # Grille des 6 engagements
│   ├── ContactForm.js           # Formulaire interactif
│   ├── FAQ.js                   # Accordéon de FAQ
│   ├── LegalLayout.js           # Wrapper des pages légales
│   └── ... (10 autres composants)
│
├── package.json
├── next.config.js
└── jsconfig.json                 # Alias @/ pour imports
```

---

## ✏️ Modifier le contenu

**Pour changer un texte dans le menu ou le footer** → ouvrir `components/Header.js` ou `components/Footer.js` (modification une seule fois pour tout le site).

**Pour modifier une page** → ouvrir `app/[nom-de-la-page]/page.js`.

**Pour changer les engagements** → `components/EngagementsGrid.js` (utilisé sur l'accueil ET la page agence).

---

## 📧 Activer l'envoi d'email réel

Aujourd'hui, le formulaire de contact **log les messages dans la console serveur**. Pour envoyer de vrais emails à `contact@elevora-agency.com` :

### Option recommandée : Resend (gratuit jusqu'à 3000 mails/mois)

```bash
npm install resend
```

1. Créer un compte sur https://resend.com et récupérer une API key.
2. Créer un fichier `.env.local` à la racine du projet :
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
3. Ouvrir `app/api/contact/route.js` et **décommenter le bloc Resend** (entre `/* ... */`).
4. Vérifier le domaine `elevora-agency.com` dans Resend pour pouvoir envoyer depuis `noreply@elevora-agency.com`.

C'est tout.

---

## 🚢 Mettre en ligne

### Option 1 — Vercel (recommandé, gratuit, 30 secondes)

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

Vercel détecte automatiquement Next.js et déploie. HTTPS et CDN mondial inclus.

### Option 2 — Infomaniak (hébergement Node.js)

1. Activer "Node.js" dans le panneau d'administration Infomaniak.
2. Uploader le projet via FTP / SSH.
3. Lancer `npm install && npm run build && npm start`.

---

## ⚠️ À compléter manuellement avant publication

- **`app/mentions-legales/page.js`** : les `[À compléter]` (SIRET, RCS, TVA, forme juridique, directeur de publication).
- **Témoignages** : remplacer le placeholder "Témoignage à venir" sur l'accueil quand vous aurez un deuxième verbatim client.
- **Réalisations** : remplacer le "Projet confidentiel" par un vrai cas quand il sortira.
- **Favicon** : ajouter un `favicon.ico` dans le dossier `app/` (Next le détectera automatiquement).
- **Open Graph image** : ajouter un visuel `og-image.png` dans `public/` pour les partages sur réseaux sociaux.

---

## 🎨 Design system

Toutes les couleurs et typographies sont définies dans `app/globals.css` (variables CSS).

- **Bleu Klein** : `#0033A0` (dominante)
- **Crème** : `#F5F0E8` (fond)
- **Rose-violet** : `#C9569E` (accent rare, ~2%)
- **Typographies** : Fraunces (italiques) + Geist (sans-serif), chargées via `next/font/google`.

---

## 🔧 Stack technique

- **Framework** : Next.js 14 (App Router)
- **UI** : React 18
- **Styles** : CSS variables + style inline
- **Police** : Google Fonts (Fraunces + Geist) optimisée par Next
- **Hébergement recommandé** : Vercel ou Infomaniak

Aucune dépendance lourde, aucune librairie UI tierce. Le projet est volontairement minimaliste.

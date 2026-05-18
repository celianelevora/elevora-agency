# Elevora — Site Next.js v2

Site officiel de l'agence Elevora, construit avec **Next.js 14**, **TypeScript** et **Tailwind CSS**.

---

## 🚀 Démarrage rapide

```bash
npm install
npm run dev
```

Le site se lance sur `http://localhost:3000`.

---

## 🆕 Nouveautés v2

- **TypeScript** : tout le code est typé pour plus de robustesse
- **Tailwind CSS** : système de styles moderne, classes utilitaires
- **shadcn/ui** : librairie de composants UI accessible
- **framer-motion** : animations fluides
- **lucide-react** : icônes modernes

Le rendu visuel est **identique** à la v1 — c'est la fondation technique qui change.

---

## 📁 Structure

```
elevora-agency/
├── app/                       # Pages Next.js (App Router)
│   ├── layout.tsx
│   ├── page.tsx              # Accueil
│   ├── globals.css           # CSS global + Tailwind
│   ├── api/contact/route.ts  # API formulaire
│   ├── services/
│   ├── realisations/
│   ├── methode/
│   ├── agence/
│   ├── contact/
│   └── [pages légales]
│
├── components/               # Composants Elevora
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ... (13 composants au total)
│   └── ui/                   # Composants shadcn/ui (Button, Tooltip, etc.)
│
├── lib/
│   └── utils.ts              # Helper cn() pour Tailwind
│
├── tailwind.config.js        # Config Tailwind + palette Elevora
├── tsconfig.json             # Config TypeScript
├── components.json           # Config shadcn/ui
├── postcss.config.js
└── package.json
```

---

## 🎨 Design system

Toutes les couleurs et typos sont dans `tailwind.config.js` :

- **Bleu Klein** : `bg-klein` / `text-klein` (#0033A0)
- **Crème** : `bg-cream` / `text-cream` (#F5F0E8)
- **Rose** : `bg-pink` / `text-pink` (#C9569E)
- **Ink** : couleurs de texte (#0A0A0A et nuances)
- **Polices** : `font-serif` (Fraunces) et `font-sans` (Geist)

Les variables CSS Elevora (`--klein`, `--cream`, etc.) sont conservées pour la rétrocompatibilité.

---

## 📧 Activer l'envoi d'email

Voir `app/api/contact/route.ts` — le code Resend est commenté, prêt à activer.

```bash
npm install resend
# Ajouter RESEND_API_KEY dans les variables d'environnement Infomaniak
```

---

## 🚢 Déploiement Infomaniak

1. Pousser les changements via GitHub Desktop
2. Sur le serveur SSH Infomaniak : `cd ~/sites/test.elevora-agency.com && git pull`
3. Dashboard Infomaniak → Build (réinstaller les dépendances : OUI)

---

## ⚠️ À compléter

- `app/mentions-legales/page.tsx` : SIRET, RCS, TVA (les `[À compléter]`)
- Témoignage n°2 sur l'accueil (placeholder en attente)
- Favicon dans `app/favicon.ico`

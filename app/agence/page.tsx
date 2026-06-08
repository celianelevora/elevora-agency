import Link from 'next/link';

export const metadata = {
  title: "L'agence | Elevora",
  description: "Trois personnes, une conviction : le web artisanal existe encore. Découvrez l'équipe derrière Elevora.",
};

const FOUNDERS = [
  {
    photo: '/celian-soulet.jpg',
    prenom: 'Célian',
    nom: 'Soulet Lapetina',
    role: 'Président',
    tag: 'Relations grands comptes',
    description:
      "Le visage d'Elevora. Célian gère les relations avec les PME et les structures qui ont besoin d'un interlocuteur qui comprend leurs enjeux — pas juste leur brief. Diplomate dans l'âme, il traduit les ambitions en projets concrets.",
    linkedin: 'https://www.linkedin.com/in/c%C3%A9lian-soulet-lapetina/',
  },
  {
    photo: '/raphael-chain.jpg',
    prenom: 'Raphaël',
    nom: 'Chain',
    role: 'Directeur Général',
    tag: 'Réseaux & petites structures',
    description:
      "Raphaël est celui qui va chercher les clients là où ils sont. Il accompagne indépendants et petites entreprises — de la première prise de contact jusqu'à la livraison — avec une énergie qui ne se simule pas.",
    linkedin: 'https://www.linkedin.com/in/rapha%C3%ABl-chain/',
  },
  {
    photo: '/paloma-morio.jpg',
    prenom: 'Paloma',
    nom: 'Morio',
    role: 'Directrice Générale',
    tag: 'Création web & réseau',
    description:
      "Paloma conçoit. Sites web, identités, parcours utilisateur — elle pose les questions que les autres oublient de poser. Elle développe aussi le réseau d'Elevora avec une précision qu'on aurait tort de sous-estimer.",
    linkedin: 'https://www.linkedin.com/in/paloma-morio/',
  },
];

const APPROACH = [
  {
    num: '01',
    title: 'Comprendre',
    desc: "On démarre par écouter — pas par proposer. Votre métier, vos clients, ce qui marche, ce qui coince. Cadrage écrit, devis ferme, zéro flou.",
  },
  {
    num: '02',
    title: 'Construire',
    desc: "Design sur mesure, code propre, performance mesurée. Validation à chaque étape, pas de surprise à la livraison.",
  },
  {
    num: '03',
    title: 'Accompagner',
    desc: "Le site est en ligne ? Le vrai travail commence. Formation, suivi 30 jours offert, évolutions à la demande.",
  },
];

const CONCERNS = [
  {
    icon: 'search',
    label: 'Référencement',
    title: 'Être trouvé sur Google.',
    desc: "Architecture SEO pensée dès la maquette : structure sémantique, balisage Schema.org, sitemap, méta optimisées, vitesse. Pas de magie — du technique propre.",
    tags: ['Next.js SSR', 'Schema.org', 'Search Console'],
  },
  {
    icon: 'lightning',
    label: 'Performance',
    title: 'Charger en moins d\'une seconde.',
    desc: "Images optimisées automatiquement, code minifié, hébergement européen rapide. Vos visiteurs ne partent pas avant d'avoir vu votre page.",
    tags: ['Core Web Vitals', 'Images WebP', 'CDN'],
  },
  {
    icon: 'shield',
    label: 'Sécurité & RGPD',
    title: 'Vos données — et celles de vos clients.',
    desc: "Hébergement Infomaniak (Suisse, ISO 27001), HTTPS systématique, mentions légales et bandeau cookies conformes, sauvegardes quotidiennes.",
    tags: ['ISO 27001', 'RGPD', 'SSL'],
  },
  {
    icon: 'devices',
    label: 'Mobile & responsive',
    title: 'Aussi beau sur iPhone que sur 4K.',
    desc: "Mobile-first, testé sur tous les formats. Plus de 60% de votre trafic vient du mobile — c'est notre référence de départ, pas une adaptation après coup.",
    tags: ['Mobile-first', 'Breakpoints', 'Tactile'],
  },
  {
    icon: 'sparkles',
    label: 'Design & identité',
    title: 'Un site qui vous ressemble.',
    desc: "Pas de template. Identité visuelle pensée pour votre métier, vos clients, votre ton. Maquettes validées avant la première ligne de code.",
    tags: ['Figma', 'Sur-mesure', 'Direction artistique'],
  },
  {
    icon: 'chart',
    label: 'Mesure & pilotage',
    title: 'Savoir ce qui fonctionne.',
    desc: "Analytics respectueux de la vie privée, tableau de bord clair, suivi des conversions. Vous savez d'où viennent vos clients — et pourquoi ils restent.",
    tags: ['Plausible', 'GA4', 'Heatmaps'],
  },
];

const VALUES = [
  { roman: 'I.', title: 'Transparence radicale', desc: "On dit ce qu'on fait. On dit ce qu'on ne fait pas. On dit combien ça coûte avant de commencer. On dit quand on s'est planté." },
  { roman: 'II.', title: 'Sobriété technique', desc: "La techno qui sert votre projet, pas celle qui flatte notre CV. Code simple, performant, maintenable par n'importe quel autre développeur." },
  { roman: 'III.', title: 'Présence après livraison', desc: "Le projet n'est pas fini quand le site est en ligne. Il est fini quand vous savez l'utiliser et qu'il vous rapporte des clients." },
];

const ECO_STATS = [
  { value: '100%', label: 'Énergie renouvelable', sub: '60% hydraulique + 40% certifié' },
  { value: '200%', label: 'Compensation CO₂', sub: 'Certifié myclimate depuis 10+ ans' },
  { value: '1.06', label: 'PUE datacenter', sub: 'Moyenne européenne : 1.8' },
  { value: '15 ans', label: 'Durée de vie serveurs', sub: 'Refroidissement par air extérieur' },
];

function Icon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/></svg>;
    case 'lightning':
      return <svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
    case 'shield':
      return <svg {...common}><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/></svg>;
    case 'devices':
      return <svg {...common}><rect x="2" y="4" width="14" height="11" rx="1"/><rect x="16" y="9" width="6" height="11" rx="1"/><line x1="6" y1="19" x2="12" y2="19"/></svg>;
    case 'sparkles':
      return <svg {...common}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>;
    case 'chart':
      return <svg {...common}><line x1="4" y1="20" x2="20" y2="20"/><line x1="6" y1="16" x2="6" y2="12"/><line x1="11" y1="16" x2="11" y2="8"/><line x1="16" y1="16" x2="16" y2="4"/></svg>;
    case 'leaf':
      return <svg {...common}><path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 14 4h6v6c0 6-4 10-9 10z"/><path d="M2 22c4-4 7-6 14-12"/></svg>;
    default:
      return null;
  }
}

export default function AgencePage() {
  return (
    <>
      <style>{`
        /* ── Hero + Origine wrapper (image de fond commune) ─ */
        .agence-hero-origine {
          margin-top: -76px;
          padding-top: 76px;
          background-image: url('/agence-bg-hero.jpg');
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
        }

        /* ── Hero agence ───────────────────────────────── */
        .agence-hero {
          padding: 80px 0 100px;
          background: transparent;
          position: relative;
          overflow: hidden;
        }
        .agence-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ink-muted); font-weight: 500; margin-bottom: 28px;
        }
        .agence-hero-eyebrow::before {
          content: ''; width: 28px; height: 1px; background: var(--ink-muted);
        }
        .agence-hero h1 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(44px, 6vw, 82px); line-height: 1.02;
          letter-spacing: -0.02em; color: var(--ink);
          max-width: 820px; margin: 0 0 32px;
        }
        .agence-hero-lead {
          font-size: clamp(16px, 1.8vw, 19px); line-height: 1.65;
          color: var(--ink-soft); max-width: 560px;
        }

        /* ── Origine ───────────────────────────────────── */
        .agence-origine {
          padding: 60px 0 120px;
          background: transparent;
        }
        .agence-origine-grid {
          display: grid; grid-template-columns: 340px 1fr; gap: 80px;
          align-items: flex-start;
        }
        .agence-origine-left h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(30px, 3.5vw, 42px); line-height: 1.08;
          letter-spacing: -0.02em; color: var(--ink); margin: 16px 0 0;
        }
        .agence-origine-right p {
          font-size: 17px; line-height: 1.75; color: var(--ink-soft);
          margin-bottom: 22px;
        }
        .agence-origine-right p:last-child { margin-bottom: 0; }
        .agence-origine-right em { color: var(--ink); font-style: italic; }

        /* ── Fondateurs ────────────────────────────────── */
        .agence-founders {
          padding: 100px 0 120px;
          background-color: var(--night);
          background-image: url('/agence-bg-fondateurs.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }
        .agence-founders::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(26,26,46,0.35) 0%, rgba(26,26,46,0.15) 50%, rgba(26,26,46,0.45) 100%);
          pointer-events: none;
        }
        .agence-founders > .container { position: relative; z-index: 1; }
        .agence-founders-head { margin-bottom: 72px; }
        .agence-founders-head .eyebrow-dark {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(234,233,238,0.45); font-weight: 500; margin-bottom: 20px;
        }
        .agence-founders-head .eyebrow-dark::before {
          content: ''; width: 28px; height: 1px; background: rgba(234,233,238,0.35);
        }
        .agence-founders-head h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(34px, 4vw, 54px); line-height: 1.05;
          letter-spacing: -0.02em; color: var(--cream);
          max-width: 680px; margin: 0;
        }
        .agence-founders-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
        }
        .founder-card { display: flex; flex-direction: column; }
        .founder-photo-wrap {
          position: relative; width: 100%;
          aspect-ratio: 3/4; overflow: hidden;
          border-radius: var(--radius-lg);
          margin-bottom: 28px;
        }
        .founder-photo-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center top;
          filter: grayscale(30%) contrast(1.05) brightness(0.95);
          transition: transform 0.6s var(--ease), filter 0.5s;
        }
        .founder-photo-wrap::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(13,43,80,0.55) 100%);
          mix-blend-mode: multiply; pointer-events: none;
        }
        .founder-card:hover .founder-photo-wrap img {
          transform: scale(1.03);
          filter: grayscale(0%) contrast(1.05) brightness(1);
        }
        .founder-tag {
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--pink-light); font-weight: 500; margin-bottom: 10px;
        }
        .founder-name {
          font-family: var(--serif); font-weight: 400; font-style: italic;
          font-size: clamp(28px, 2.8vw, 38px); line-height: 1;
          color: var(--cream); letter-spacing: -0.01em;
          margin-bottom: 4px;
        }
        .founder-role {
          font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(234,233,238,0.45); margin-bottom: 18px;
        }
        .founder-desc {
          font-size: 14.5px; line-height: 1.7;
          color: rgba(234,233,238,0.72); flex: 1;
          margin-bottom: 20px;
        }
        .founder-linkedin {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(234,233,238,0.45);
          text-decoration: none; transition: color 0.2s;
          border-top: 1px solid rgba(234,233,238,0.1); padding-top: 16px;
          width: 100%;
        }
        .founder-linkedin:hover { color: var(--cream); }

        /* ── Approche + Préoccupations wrapper (image commune) ── */
        .agence-approche-concerns {
          background-image: url('/agence-bg-approche-concerns.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* ── Approche en 3 temps ───────────────────────── */
        .agence-approche {
          padding: 110px 0;
          background: transparent;
          position: relative;
        }
        .agence-approche-head {
          display: flex; justify-content: space-between;
          align-items: flex-end; gap: 48px; margin-bottom: 64px;
        }
        .agence-approche-head-left { flex: 1; }
        .agence-approche-head h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(34px, 4vw, 54px); line-height: 1.05;
          letter-spacing: -0.02em; color: var(--ink); margin: 16px 0 0;
          max-width: 600px;
        }
        .agence-approche-link {
          font-size: 15px; letter-spacing: 0.04em; font-weight: 500;
          color: var(--klein); text-decoration: none;
          padding: 10px 20px;
          border: 1.5px solid var(--klein);
          border-radius: 999px;
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.3s var(--ease);
          display: inline-flex; align-items: center; gap: 9px;
          flex-shrink: 0;
        }
        .agence-approche-link:hover {
          background: var(--klein);
          color: var(--cream);
          gap: 13px;
        }
        .approche-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
          border-top: 1px solid var(--line);
        }
        .approche-step {
          padding: 40px 32px 40px 0;
          border-right: 1px solid var(--line);
          position: relative;
        }
        .approche-step:last-child { border-right: none; padding-right: 0; }
        .approche-step:not(:first-child) { padding-left: 32px; }
        .approche-num {
          font-family: var(--serif); font-style: italic;
          font-size: 64px; color: var(--klein);
          line-height: 1; margin-bottom: 20px;
        }
        .approche-title {
          font-family: var(--serif); font-weight: 400;
          font-size: 28px; color: var(--ink);
          margin-bottom: 16px; letter-spacing: -0.01em;
        }
        .approche-desc {
          font-size: 15px; line-height: 1.65; color: var(--ink-soft);
        }

        /* ── Préoccupations clients ────────────────────── */
        .agence-concerns {
          padding: 110px 0;
          background: transparent;
        }
        .agence-concerns-head {
          margin-bottom: 64px; max-width: 720px;
        }
        .agence-concerns-head h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(34px, 4vw, 54px); line-height: 1.05;
          letter-spacing: -0.02em; color: var(--ink); margin: 16px 0 18px;
        }
        .agence-concerns-head p {
          font-size: 16px; line-height: 1.7; color: var(--ink-soft);
        }
        .concerns-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .concern-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: flex; flex-direction: column;
          transition: border-color 0.3s, transform 0.3s var(--ease), box-shadow 0.3s, background 0.3s;
          box-shadow: 0 4px 24px rgba(27, 79, 138, 0.05);
        }
        .concern-card:hover {
          background: rgba(255, 255, 255, 0.65);
          border-color: rgba(27, 79, 138, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(27,79,138,0.10);
        }
        .concern-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(6px);
          color: var(--klein);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        .concern-label {
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--pink); font-weight: 500; margin-bottom: 10px;
        }
        .concern-title {
          font-family: var(--serif); font-weight: 400;
          font-size: 20px; line-height: 1.2; color: var(--ink);
          letter-spacing: -0.01em; margin-bottom: 14px;
        }
        .concern-desc {
          font-size: 14.5px; line-height: 1.65;
          color: var(--ink-soft); flex: 1; margin-bottom: 20px;
        }
        .concern-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          padding-top: 16px; border-top: 1px solid rgba(229,229,232,0.7);
        }
        .concern-tag {
          font-size: 10.5px; letter-spacing: 0.04em;
          color: var(--ink-muted);
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(6px);
          padding: 4px 9px; border-radius: 4px;
        }

        /* ── Valeurs ───────────────────────────────────── */
        .agence-valeurs {
          padding: 140px 0;
          background-color: var(--night);
          background-image: url('/agence-bg-valeurs.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          color: var(--cream);
          position: relative;
          display: flex;
          align-items: center;
          min-height: 620px;
        }
        .agence-valeurs::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(26,26,46,0.25) 0%, rgba(26,26,46,0.1) 100%);
          pointer-events: none;
        }
        .agence-valeurs > .container { position: relative; z-index: 1; width: 100%; }
        .agence-valeurs-head { margin-bottom: 64px; }
        .agence-valeurs-head .eyebrow { color: rgba(234,233,238,0.5); }
        .agence-valeurs-head .eyebrow::before { background: rgba(234,233,238,0.4); }
        .agence-valeurs-head h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(32px, 4vw, 50px); line-height: 1.05;
          color: var(--cream); margin: 16px 0 0;
        }
        .valeurs-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px;
          border-top: 1px solid rgba(234,233,238,0.12);
          padding-top: 48px;
        }
        .valeur-roman {
          font-family: var(--serif); font-style: italic;
          font-size: 52px; color: var(--pink-light);
          line-height: 1; margin-bottom: 18px;
        }
        .valeur-title {
          font-size: 17px; font-weight: 500;
          color: var(--cream); margin-bottom: 14px;
        }
        .valeur-desc {
          font-size: 14.5px; line-height: 1.7;
          color: rgba(234,233,238,0.72);
        }

        /* ── Écologie + CTA wrapper (image commune) ────── */
        .agence-eco-cta {
          background-image: url('/agence-bg-eco-cta.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* ── Écologie / Infomaniak ──────────────────────── */
        .agence-eco {
          padding: 120px 0;
          background: transparent;
          position: relative;
          overflow: hidden;
        }
        .eco-grid {
          display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px;
          align-items: center; position: relative; z-index: 1;
        }
        .eco-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4A7C59; font-weight: 500; margin-bottom: 24px;
        }
        .eco-eyebrow svg { color: #4A7C59; }
        .eco-eyebrow::before {
          content: ''; width: 24px; height: 1px; background: #4A7C59;
        }
        .eco-title {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(32px, 4vw, 52px); line-height: 1.05;
          letter-spacing: -0.02em; color: var(--ink);
          margin: 0 0 24px;
        }
        .eco-title em { color: #4A7C59; font-style: italic; }
        .eco-text p {
          font-size: 16px; line-height: 1.7; color: var(--ink-soft);
          margin-bottom: 18px;
        }
        .eco-text p:last-of-type { margin-bottom: 28px; }
        .eco-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 0.06em;
          color: #4A7C59; text-decoration: none;
          border-bottom: 1px solid #4A7C59; padding-bottom: 3px;
          transition: gap 0.2s;
        }
        .eco-link:hover { gap: 12px; }
        .eco-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 0;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 20px;
          padding: 16px;
          position: relative;
          box-shadow: 0 16px 48px rgba(74, 124, 89, 0.08), 0 4px 16px rgba(74, 124, 89, 0.06);
        }
        /* Divider vertical (gold-tinted thin line) */
        .eco-stats::before {
          content: '';
          position: absolute;
          left: 50%; top: 18%; bottom: 18%;
          width: 1px;
          background: linear-gradient(180deg, transparent 0%, rgba(74,124,89,0.35) 30%, rgba(184,156,89,0.4) 50%, rgba(74,124,89,0.35) 70%, transparent 100%);
        }
        /* Divider horizontal */
        .eco-stats::after {
          content: '';
          position: absolute;
          top: 50%; left: 18%; right: 18%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(74,124,89,0.35) 30%, rgba(184,156,89,0.4) 50%, rgba(74,124,89,0.35) 70%, transparent 100%);
        }
        .eco-stat {
          padding: 32px 28px;
          background: transparent;
          color: var(--ink);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .eco-stat-value {
          font-family: var(--serif); font-weight: 400;
          font-style: italic;
          font-size: clamp(48px, 5vw, 64px);
          background: linear-gradient(135deg, #2D5238 0%, #4A7C59 50%, #6B8E5E 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1; margin-bottom: 14px;
          letter-spacing: -0.02em;
        }
        .eco-stat-label {
          font-size: 13.5px; font-weight: 500;
          color: var(--ink); margin-bottom: 6px;
          letter-spacing: 0.01em;
        }
        .eco-stat-sub {
          font-size: 11.5px; line-height: 1.5;
          color: var(--ink-soft);
          font-style: italic;
        }
        .eco-infomaniak {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; letter-spacing: 0.12em;
          color: var(--ink-muted); text-transform: uppercase;
          margin-bottom: 14px;
        }
        .eco-infomaniak-logo {
          background: var(--ink); color: #7FB069;
          padding: 3px 8px; border-radius: 3px;
          font-weight: 600; letter-spacing: 0;
        }

        /* ── CTA ───────────────────────────────────────── */
        .agence-cta {
          padding: 160px 0;
          background: transparent;
          min-height: 520px;
          display: flex;
          align-items: center;
        }
        .agence-cta > .container { width: 100%; }
        .agence-cta-inner {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 48px;
        }
        .agence-cta h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(54px, 7.5vw, 110px); line-height: 0.98;
          letter-spacing: -0.025em; color: var(--ink); margin: 0;
          max-width: 700px;
        }
        .agence-cta-right { flex-shrink: 0; text-align: right; max-width: 360px; }
        .agence-cta-sub {
          font-size: 16px; color: var(--ink-soft); margin-bottom: 32px;
          line-height: 1.6;
        }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 1024px) {
          .concerns-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .agence-origine-grid { grid-template-columns: 1fr; gap: 40px; }
          .agence-founders-grid { grid-template-columns: 1fr; gap: 48px; }
          .approche-grid { grid-template-columns: 1fr; }
          .approche-step {
            border-right: none; border-bottom: 1px solid var(--line);
            padding: 32px 0 !important;
          }
          .approche-step:last-child { border-bottom: none; }
          .concerns-grid { grid-template-columns: 1fr; }
          .valeurs-grid { grid-template-columns: 1fr; gap: 36px; }
          .eco-grid { grid-template-columns: 1fr; gap: 48px; }
          .agence-cta-inner { flex-direction: column; align-items: flex-start; }
          .agence-cta-right { text-align: left; }
          .agence-approche-head { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* ── HERO + ORIGINE (fond commun) ── */}
      <div className="agence-hero-origine">
        <section className="agence-hero">
        <div className="container">
          <div className="agence-hero-eyebrow">L'agence</div>
          <h1>
            Trois personnes.<br />
            Une <span style={{ fontStyle: 'italic', color: 'var(--klein)' }}>obsession</span><br />
            commune.
          </h1>
          <p className="agence-hero-lead">
            Elevora est née d'une conviction simple : le web artisanal, rigoureux et accessible, ça devrait être la norme — pas l'exception. On a décidé de le faire exister.
          </p>
        </div>
      </section>

      {/* ── ORIGINE ── */}
      <section className="agence-origine">
        <div className="container">
          <div className="agence-origine-grid">
            <div className="agence-origine-left">
              <span className="eyebrow">Notre histoire</span>
              <h2>D'où vient<br /><span style={{ fontStyle: 'italic' }}>Elevora.</span></h2>
            </div>
            <div className="agence-origine-right">
              <p>
                On a grandi dans un secteur où les agences prometteuses finissent par décevoir — devis flous, délais qui glissent, interlocuteurs injoignables une fois le chèque encaissé. On l'a vécu des deux côtés de la table.
              </p>
              <p>
                Fin 2025, à Nantes, on a créé Elevora. Pas pour révolutionner le marché — pour faire <em>simplement ce qu'on s'engage à faire</em>, avec des vrais gens derrière chaque projet. Légère, directe, joignable.
              </p>
              <p>
                On est jeunes, assumés, et motivés par quelque chose que les grosses structures ont souvent perdu : l'envie que chaque client reparte avec quelque chose de bien fait.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
      {/* ── /HERO + ORIGINE ── */}

      {/* ── FONDATEURS ── */}
      <section className="agence-founders">
        <div className="container">
          <div className="agence-founders-head">
            <div className="eyebrow-dark">L'équipe fondatrice</div>
            <h2>
              Ceux qui font<br />
              <span style={{ fontStyle: 'italic', color: 'var(--pink-light)' }}>tourner la machine.</span>
            </h2>
          </div>
          <div className="agence-founders-grid">
            {FOUNDERS.map((f) => (
              <div key={f.prenom} className="founder-card">
                <div className="founder-photo-wrap">
                  <img src={f.photo} alt={`${f.prenom} ${f.nom}`} />
                </div>
                <div className="founder-tag">{f.tag}</div>
                <div className="founder-name">{f.prenom}</div>
                <div className="founder-role">{f.nom} — {f.role}</div>
                <p className="founder-desc">{f.description}</p>
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="founder-linkedin">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROCHE + PRÉOCCUPATIONS (fond commun) ── */}
      <div className="agence-approche-concerns">

      {/* ── APPROCHE EN 3 TEMPS ── */}
      <section className="agence-approche">
        <div className="container">
          <div className="agence-approche-head">
            <div className="agence-approche-head-left">
              <span className="eyebrow">Notre approche</span>
              <h2>
                Trois temps,<br />
                <span style={{ fontStyle: 'italic', color: 'var(--klein)' }}>une exigence.</span>
              </h2>
            </div>
            <Link href="/methode" className="agence-approche-link">
              Voir notre méthode complète
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
          <div className="approche-grid">
            {APPROACH.map((a) => (
              <div key={a.num} className="approche-step">
                <div className="approche-num">{a.num}</div>
                <div className="approche-title">{a.title}</div>
                <p className="approche-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRÉOCCUPATIONS CLIENTS ── */}
      <section className="agence-concerns">
        <div className="container">
          <div className="agence-concerns-head">
            <span className="eyebrow">Vos préoccupations</span>
            <h2>
              On a une réponse<br />
              <span style={{ fontStyle: 'italic', color: 'var(--klein)' }}>à chacune.</span>
            </h2>
            <p>
              Chaque client arrive avec ses questions. Référencement, sécurité, vitesse, design, données — voici ce qu'on intègre dans tous nos projets, quel que soit votre métier.
            </p>
          </div>
          <div className="concerns-grid">
            {CONCERNS.map((c) => (
              <div key={c.label} className="concern-card">
                <div className="concern-icon"><Icon name={c.icon} /></div>
                <div className="concern-label">{c.label}</div>
                <div className="concern-title">{c.title}</div>
                <p className="concern-desc">{c.desc}</p>
                <div className="concern-tags">
                  {c.tags.map((t) => <span key={t} className="concern-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>
      {/* ── /APPROCHE + PRÉOCCUPATIONS ── */}

      {/* ── VALEURS ── */}
      <section className="agence-valeurs">
        <div className="container">
          <div className="agence-valeurs-head">
            <span className="eyebrow">Ce qui nous tient</span>
            <h2>
              Trois valeurs<br />
              <span style={{ color: 'var(--pink-light)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>non négociables.</span>
            </h2>
          </div>
          <div className="valeurs-grid">
            {VALUES.map((v) => (
              <div key={v.roman}>
                <div className="valeur-roman">{v.roman}</div>
                <div className="valeur-title">{v.title}</div>
                <p className="valeur-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉCOLOGIE + CTA (fond commun) ── */}
      <div className="agence-eco-cta">

      {/* ── ÉCOLOGIE / INFOMANIAK ── */}
      <section className="agence-eco">
        <div className="container">
          <div className="eco-grid">
            <div className="eco-text">
              <div className="eco-eyebrow">
                <Icon name="leaf" />
                Engagement environnemental
              </div>
              <h2 className="eco-title">
                Vos sites tournent sur<br />
                <em>les datacenters les plus<br />écologiques d'Europe.</em>
              </h2>
              <div className="eco-infomaniak">
                Partenaire d'hébergement <span className="eco-infomaniak-logo">infomaniak</span>
              </div>
              <p>
                On a choisi <strong style={{ color: 'var(--ink)' }}>Infomaniak</strong> pour héberger l'intégralité de nos projets. Pas pour suivre une tendance — parce que leurs engagements sont vérifiables, certifiés, et concrets.
              </p>
              <p>
                Datacenters en Suisse, alimentés à 100% en énergie renouvelable (hydraulique et solaire). Refroidis par air extérieur depuis 2013 — zéro climatisation. Serveurs utilisés 15 ans avant remplacement. Compensation CO₂ à 200% via myclimate.
              </p>
              <p>
                Bonus en 2025 : leur nouveau datacenter D4 revalorise 100% de sa chaleur pour chauffer 6 000 logements à Genève.
              </p>
              <a href="https://www.infomaniak.com/fr/ecologie" target="_blank" rel="noopener noreferrer" className="eco-link">
                Voir les engagements d'Infomaniak
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
            <div className="eco-stats">
              {ECO_STATS.map((s) => (
                <div key={s.label} className="eco-stat">
                  <div className="eco-stat-value">{s.value}</div>
                  <div className="eco-stat-label">{s.label}</div>
                  <div className="eco-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="agence-cta">
        <div className="container">
          <div className="agence-cta-inner">
            <h2>
              On prend<br />
              <span style={{ fontStyle: 'italic', color: 'var(--klein)' }}>un café ?</span>
            </h2>
            <div className="agence-cta-right">
              <p className="agence-cta-sub">
                En visio ou autour d'un café à Nantes. On vous écoute, on vous dit ce qu'on en pense.
              </p>
              <Link href="/contact" className="cta-big">
                Nous contacter
                <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
      {/* ── /ÉCOLOGIE + CTA ── */}
    </>
  );
}

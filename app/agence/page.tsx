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
    accent: 'var(--klein)',
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
    accent: 'var(--pink)',
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
    accent: 'var(--klein)',
    linkedin: 'https://www.linkedin.com/in/paloma-morio/',
  },
];

const VALUES = [
  { roman: 'I.', title: 'Transparence radicale', desc: "On dit ce qu'on fait. On dit ce qu'on ne fait pas. On dit combien ça coûte avant de commencer. On dit quand on s'est planté." },
  { roman: 'II.', title: 'Sobriété technique', desc: "La techno qui sert votre projet, pas celle qui flatte notre CV. Code simple, performant, maintenable par n'importe quel autre développeur." },
  { roman: 'III.', title: 'Présence après livraison', desc: "Le projet n'est pas fini quand le site est en ligne. Il est fini quand vous savez l'utiliser et qu'il vous rapporte des clients." },
];

export default function AgencePage() {
  return (
    <>
      <style>{`
        /* ── Hero agence ───────────────────────────────── */
        .agence-hero {
          padding: 140px 0 100px;
          background: var(--cream);
          position: relative;
          overflow: hidden;
        }
        .agence-hero::before {
          content: '';
          position: absolute;
          top: -120px; right: -80px;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(27,79,138,0.07) 0%, transparent 70%);
          pointer-events: none;
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
          padding: 100px 0;
          border-top: 1px solid var(--line);
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
          background: var(--night);
        }
        .agence-founders-head {
          margin-bottom: 72px;
        }
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
        .founder-card {
          display: flex; flex-direction: column;
        }
        .founder-photo-wrap {
          position: relative; width: 100%;
          aspect-ratio: 3/4; overflow: hidden;
          border-radius: var(--radius-lg);
          margin-bottom: 28px;
        }
        .founder-photo-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center top;
          /* Duotone Klein : dessature + teinte bleue */
          filter: grayscale(30%) contrast(1.05) brightness(0.95);
          transition: transform 0.6s var(--ease), filter 0.5s;
        }
        .founder-photo-wrap::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            180deg,
            transparent 40%,
            rgba(13,43,80,0.55) 100%
          );
          mix-blend-mode: multiply;
          pointer-events: none;
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
        .founder-linkedin svg { flex-shrink: 0; }

        /* ── Valeurs ───────────────────────────────────── */
        .agence-valeurs {
          padding: 100px 0;
          background: var(--klein);
          color: var(--cream);
        }
        .agence-valeurs-head {
          margin-bottom: 64px;
        }
        .agence-valeurs-head .eyebrow {
          color: rgba(234,233,238,0.5);
        }
        .agence-valeurs-head .eyebrow::before {
          background: rgba(234,233,238,0.4);
        }
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
        .valeur-item {}
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

        /* ── CTA ───────────────────────────────────────── */
        .agence-cta {
          padding: 100px 0;
          background: var(--cream);
        }
        .agence-cta-inner {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 48px;
        }
        .agence-cta h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(36px, 5vw, 68px); line-height: 1.02;
          letter-spacing: -0.02em; color: var(--ink); margin: 0;
          max-width: 600px;
        }
        .agence-cta-right {
          flex-shrink: 0; text-align: right;
        }
        .agence-cta-sub {
          font-size: 15px; color: var(--ink-soft); margin-bottom: 28px;
          max-width: 280px; line-height: 1.6;
        }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 900px) {
          .agence-origine-grid { grid-template-columns: 1fr; gap: 40px; }
          .agence-founders-grid { grid-template-columns: 1fr; gap: 48px; }
          .valeurs-grid { grid-template-columns: 1fr; gap: 36px; }
          .agence-cta-inner { flex-direction: column; align-items: flex-start; }
          .agence-cta-right { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
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
              <div key={v.roman} className="valeur-item">
                <div className="valeur-roman">{v.roman}</div>
                <div className="valeur-title">{v.title}</div>
                <p className="valeur-desc">{v.desc}</p>
              </div>
            ))}
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
    </>
  );
}

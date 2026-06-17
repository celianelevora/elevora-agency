'use client';

/* ============================================================
   CinematicFooter — RECONSTRUCTION COMPLÈTE (table rase).

   Repris de l'esprit du template fourni, mais réécrit 100% IN-FLOW :
   - position:relative, AUCUN position:fixed, AUCUN clip-path,
     AUCUN ScrollTrigger -> il ne peut PAS disparaître ni se dédoubler.
   - le seul effet JS est un magnétisme léger (GSAP core) sur les
     boutons, sans aucune dépendance au scroll/layout.

   Bloc CTA cinématique (crème, DA Elevora), personnalisé sur le
   visuel demandé :
     marquee de marque · « On démarre votre projet ? » · sous-titre ·
     2 boutons (Démarrer un projet / Voir nos réalisations) ·
     pavés (Sites web / Outils de gestion / Méthode / Tarifs) ·
     immense filigrane ELEVORA en fond.

   Le copyright + les colonnes (Services / Agence / Contact) + les
   liens légaux vivent dans le footer navy juste EN-DESSOUS (composant
   <Footer> global, .site-footer) -> aucun doublon ici.
   ============================================================ */

import Link from 'next/link';

const MARQUEE = [
  'Outils de gestion sur mesure',
  'Accompagnement de A à Z',
  'Agence indépendante à Nantes',
  'Sites web qui convertissent',
];

const PILLS = [
  { label: 'Sites web', href: '/services/site-vitrine' },
  { label: 'Outils de gestion', href: '/services/crm-outil-de-gestion' },
  { label: 'Méthode', href: '/methode' },
  { label: 'Tarifs', href: '/tarifs' },
];

export function CinematicFooter() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section className="elv-cta" aria-label="Démarrer un projet">
        {/* Calques d'ambiance (décoratifs, in-flow) */}
        <span className="elv-cta-grid" aria-hidden="true" />
        <span className="elv-cta-aurora" aria-hidden="true" />
        <span className="elv-cta-aurora elv-cta-aurora-2" aria-hidden="true" />
        <span className="elv-cta-giant" aria-hidden="true">ELEVORA</span>

        {/* Marquee de marque (légèrement incliné) */}
        <div className="elv-cta-marquee" aria-hidden="true">
          <div className="elv-cta-marquee-track">
            {[0, 1].map((dup) => (
              <div className="elv-cta-marquee-set" key={dup}>
                {MARQUEE.map((m, i) => (
                  <span className="elv-cta-marquee-item" key={`${dup}-${i}`}>
                    {m}
                    <span className="elv-cta-star" aria-hidden="true">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Contenu central */}
        <div className="elv-cta-inner">
          <h2 className="elv-cta-title">
            On démarre <span className="elv-cta-em">votre projet</span> ?
          </h2>
          <p className="elv-cta-sub">
            Premier échange gratuit et sans engagement. On comprend votre besoin,
            on évalue la faisabilité, on vous propose un devis ferme sous 5 jours.
          </p>

          <div className="elv-cta-actions">
            <Link href="/demarrer-un-projet" className="elv-cta-btn">
              <span className="elv-cta-btn-label">
                Démarrer un projet
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
            <Link href="/realisations" className="elv-cta-btn-ghost">
              Voir nos réalisations
            </Link>
          </div>

          <div className="elv-cta-pills">
            {PILLS.map((p) => (
              <Link key={p.href + p.label} href={p.href} className="elv-cta-pill">
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const STYLES = `
.elv-cta {
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding bas généreux : laisse respirer le filigrane ELEVORA et donne
     une assise propre au footer navy (carte arrondie) qui suit juste après.
     Top resserré pour que le marquee serve de raccord visuel avec la FAQ. */
  padding: clamp(92px, 13vh, 150px) 24px clamp(140px, 20vh, 220px);
  background: var(--cream, #EAE9EE);
  color: var(--ink, #1A1A2E);
  font-family: var(--font-roboto), 'Roboto', -apple-system, sans-serif;
}

/* Grille technique discrète, masquée vers les bords */
.elv-cta-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(26,26,46,.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(26,26,46,.05) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(120% 100% at 50% 40%, #000 34%, transparent 80%);
          mask-image: radial-gradient(120% 100% at 50% 40%, #000 34%, transparent 80%);
}

/* Halos aurora Klein -> framboise, respiration douce (2 calques = profondeur) */
.elv-cta-aurora {
  position: absolute; left: 50%; top: 40%; z-index: 0; pointer-events: none;
  width: 80vw; height: 62vh; transform: translate(-50%, -50%);
  background: radial-gradient(circle at 50% 50%,
    rgba(43,108,196,.22) 0%,
    rgba(201,38,106,.14) 44%,
    transparent 70%);
  filter: blur(64px);
  border-radius: 50%;
  animation: elvCtaBreathe 9s ease-in-out infinite alternate;
}
.elv-cta-aurora-2 {
  top: 64%; width: 52vw; height: 44vh;
  background: radial-gradient(circle at 50% 50%,
    rgba(201,38,106,.14) 0%,
    rgba(43,108,196,.10) 50%,
    transparent 72%);
  filter: blur(80px);
  animation: elvCtaBreathe 11s ease-in-out .6s infinite alternate-reverse;
}
@keyframes elvCtaBreathe {
  0%   { transform: translate(-50%, -50%) scale(1);    opacity: .7; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
}

/* Filigrane géant ELEVORA en bas */
.elv-cta-giant {
  position: absolute; left: 50%; bottom: -2.5vh; z-index: 0;
  transform: translateX(-50%);
  font-family: var(--font-playfair), 'Playfair Display', serif;
  font-weight: 800; letter-spacing: -.03em; line-height: .8;
  font-size: clamp(4rem, 21vw, 20rem);
  white-space: nowrap; user-select: none; pointer-events: none;
  color: transparent;
  -webkit-text-stroke: 1px rgba(26,26,46,.08);
  background: linear-gradient(180deg, rgba(26,26,46,.08) 0%, transparent 60%);
  -webkit-background-clip: text; background-clip: text;
}

/* Marquee */
.elv-cta-marquee {
  position: absolute; top: clamp(18px, 3vh, 32px); left: -4%; z-index: 1;
  width: 108%;
  transform: rotate(-2deg);
  border-top: 1px solid rgba(26,26,46,.10);
  border-bottom: 1px solid rgba(26,26,46,.10);
  background: rgba(255,255,255,.46);
  -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
  padding: 13px 0;
  overflow: hidden;
  box-shadow: 0 18px 40px -28px rgba(26,26,46,.5);
}
.elv-cta-marquee-track { display: flex; width: max-content; animation: elvCtaMarquee 34s linear infinite; }
.elv-cta-marquee-set { display: flex; }
.elv-cta-marquee-item {
  display: inline-flex; align-items: center;
  font-size: .72rem; font-weight: 700; letter-spacing: .26em;
  text-transform: uppercase; color: rgba(26,26,46,.55);
  white-space: nowrap;
}
.elv-cta-star { color: var(--c-framboise, #C9266A); margin: 0 2.4rem; font-size: .6rem; }
.elv-cta-marquee-item:nth-child(2n) .elv-cta-star { color: var(--klein-bright, #2B6CC4); }
@keyframes elvCtaMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* Contenu central */
.elv-cta-inner {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  max-width: 880px; margin: 0 auto;
}
.elv-cta-title {
  font-family: var(--font-playfair), 'Playfair Display', serif;
  font-weight: 600; line-height: 1.04; letter-spacing: -.01em;
  font-size: clamp(2.6rem, 6.4vw, 5.2rem);
  color: var(--ink, #1A1A2E);
  margin: 0 0 clamp(18px, 2.6vh, 28px);
}
.elv-cta-em { font-style: italic; color: var(--klein-bright, #2B6CC4); }
.elv-cta-sub {
  max-width: 560px;
  font-size: clamp(1rem, 1.25vw, 1.18rem); line-height: 1.6;
  color: rgba(26,26,46,.62); margin: 0 0 clamp(34px, 5vh, 52px);
}

/* Actions */
.elv-cta-actions {
  display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; align-items: center;
  margin-bottom: clamp(22px, 3.4vh, 36px);
}

/* Bouton primaire — gradient Klein, bordure éclairée, glow + reflet */
.elv-cta-btn {
  position: relative; display: inline-flex; align-items: center; justify-content: center;
  padding: 17px 34px; border-radius: 999px;
  font-size: 1rem; font-weight: 600; letter-spacing: .015em; text-decoration: none;
  color: #fff;
  background: linear-gradient(135deg, #3B79D4 0%, #235FA6 52%, #163F70 100%);
  border: 1px solid rgba(255,255,255,.22);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.32),
    inset 0 -2px 6px rgba(8,22,46,.45),
    0 12px 26px -10px rgba(27,79,138,.6),
    0 0 38px -8px rgba(43,108,196,.5);
  overflow: hidden;
  transition: box-shadow .35s cubic-bezier(.16,1,.3,1), filter .35s ease;
}
.elv-cta-btn::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.28) 48%, transparent 72%);
  transform: translateX(-130%); transition: transform .7s cubic-bezier(.16,1,.3,1);
}
.elv-cta-btn:hover::before { transform: translateX(130%); }
.elv-cta-btn:hover {
  filter: brightness(1.06);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.4),
    inset 0 -2px 6px rgba(8,22,46,.5),
    0 18px 34px -10px rgba(27,79,138,.7),
    0 0 52px -6px rgba(43,108,196,.62);
}
.elv-cta-btn-label { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 10px; }
.elv-cta-btn-label svg { transition: transform .35s cubic-bezier(.16,1,.3,1); }
.elv-cta-btn:hover .elv-cta-btn-label svg { transform: translateX(4px); }

/* Bouton fantôme — verre clair */
.elv-cta-btn-ghost {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 17px 30px; border-radius: 999px;
  font-size: 1rem; font-weight: 600; letter-spacing: .01em; text-decoration: none;
  color: var(--ink, #1A1A2E);
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(26,26,46,.14);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  box-shadow: 0 8px 22px -14px rgba(26,26,46,.4);
  transition: background .3s ease, border-color .3s ease, box-shadow .3s ease, color .3s ease;
}
.elv-cta-btn-ghost:hover {
  background: rgba(255,255,255,.82);
  border-color: rgba(27,79,138,.4);
  color: var(--c-bleu, #1B4F8A);
  box-shadow: 0 14px 30px -14px rgba(27,79,138,.45);
}

/* Pavés secondaires */
.elv-cta-pills { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
.elv-cta-pill {
  display: inline-flex; align-items: center;
  padding: 9px 20px; border-radius: 999px;
  font-size: .82rem; font-weight: 500; letter-spacing: .01em; text-decoration: none;
  color: rgba(26,26,46,.66);
  background: rgba(255,255,255,.5);
  border: 1px solid rgba(26,26,46,.10);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
  transition: color .3s ease, border-color .3s ease, background .3s ease, transform .3s ease;
}
.elv-cta-pill:hover {
  color: var(--c-framboise, #C9266A);
  border-color: rgba(201,38,106,.4);
  background: rgba(255,255,255,.78);
  transform: translateY(-1px);
}

@media (max-width: 760px) {
  .elv-cta-actions { flex-direction: column; width: 100%; }
  .elv-cta-btn, .elv-cta-btn-ghost { width: 100%; max-width: 360px; }
  .elv-cta-giant { font-size: clamp(3.2rem, 27vw, 9rem); }
  .elv-cta-marquee-item { font-size: .64rem; letter-spacing: .2em; }
}

@media (prefers-reduced-motion: reduce) {
  .elv-cta-aurora, .elv-cta-marquee-track { animation: none; }
}
`;

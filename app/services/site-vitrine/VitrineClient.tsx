'use client';

/**
 * PAGE 1 — SITE VITRINE  ·  refonte v3
 * Charte : titres Cochin (fallback Cormorant Garamond), corps Roboto.
 * Fil rouge : LA RÉVÉLATION — une vitrine qui dévoile une marque.
 * Alternance d'images STRICTE (1 image = 1 section, dans l'ordre du dossier) :
 *   Hero img-1 sombre · PourQui img-2 crème · Construit img-3 sombre ·
 *   Approche img-4 blush · Socle img-5 sombre · Tarif+FAQ img-6 crème · CTA img-7 sombre.
 * Aucun widget : tarif = révélation typographique, approche = frise qui se dessine.
 * Sur les sections sombres : une lumière suit le curseur et révèle la texture.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import {
  SectionBg,
  Reveal,
  RevealText,
  Counter,
  MiniFaq,
} from '@/components/ServiceFX';

const IMG = '/services/site-vitrine';

/* ---- type display calé sur Cormorant (hampes longues, x-height basse) ---- */
const H2 = (size: string): React.CSSProperties => ({
  fontSize: size,
  fontWeight: 500,
  letterSpacing: '-0.012em',
  lineHeight: 1.04,
});

/* ---------------------------------------------------------------- */
const POURQUOI = [
  { kw: 'Confiance', t: 'Indépendants & artisans', d: 'Vous êtes excellent dans votre métier, mais presque invisible en ligne. On vous donne une vitrine qui inspire confiance dès la première seconde.' },
  { kw: 'Crédibilité', t: 'Professions libérales', d: 'Avocat, thérapeute, consultant : votre site doit refléter votre sérieux. Une présence à la hauteur de votre expertise.' },
  { kw: 'Image', t: 'PME & commerces', d: 'Votre activité grandit, votre image doit suivre. Un site qui parle aussi bien à vos clients qu’à vos futurs partenaires.' },
];
const POURQUOI_OUTRO = 'Un point commun : l’envie d’une image enfin à la hauteur de la qualité de votre travail.';

const CONSTRUIT = [
  { kw: 'Sur mesure', t: 'Design 100 % sur mesure', d: 'Pas de template recyclé. Chaque pixel est pensé pour votre marque, votre univers, vos clients.' },
  { kw: 'Visible', t: 'Référencement natif', d: 'Structure SEO propre dès le premier jour. Google comprend votre site, vos clients vous trouvent.' },
  { kw: 'Autonome', t: 'Back-office simple', d: 'Vous modifiez vos textes, vos photos, vos actualités en toute autonomie. Sans toucher une ligne de code.' },
  { kw: 'Rapide', t: 'Performance maximale', d: 'Chargement quasi instantané, Core Web Vitals au vert. Un site rapide retient ses visiteurs.' },
];
const CONSTRUIT_INTRO = 'Peu importe le format, ces quatre piliers sont systématiques. C’est notre standard, jamais une option.';

const APPROCHE = [
  { n: 'I', k: 'Découverte', t: 'On apprend à vous connaître', d: 'Un échange pour comprendre votre activité, vos clients, et ce qui vous différencie.' },
  { n: 'II', k: 'Direction artistique', t: 'On dessine votre univers', d: 'Maquettes, couleurs, typographies : vous validez la direction avant la moindre ligne de code.' },
  { n: 'III', k: 'Développement', t: 'On donne vie au design', d: 'Code propre, animations soignées, responsive parfait. Le site prend forme sous vos yeux.' },
  { n: 'IV', k: 'Mise en ligne', t: 'On vous accompagne', d: 'Formation, mise en ligne, suivi. Vous n’êtes jamais seul face à votre outil.' },
];

const SOCLE_LEAD = 'Next.js, hébergement suisse Infomaniak, base de données fiable. Un socle solide, durable, prêt à grandir avec vous.';
const SOCLE_STATS = [
  { v: 100, s: '/100', l: 'Score de performance visé', d: 0 },
  { v: 99.9, s: '%', l: 'Disponibilité serveur', d: 1 },
  { v: 0, s: '€', l: 'Frais cachés', d: 0 },
  { v: 15, s: ' j', l: 'Garantie incluse', d: 0 },
];

const INCLUS = [
  'Design 100 % sur mesure', 'Jusqu’à 6 pages soignées', 'Référencement (SEO) natif',
  'Back-office pour tout modifier', 'Responsive mobile & tablette', 'Nom de domaine + e-mail pro',
  'Hébergement la première année', 'Formation à la prise en main', 'Garantie 15 jours après livraison',
];
const TARIF_NOTE = 'Paiement en deux fois : 30 % à la commande, le solde à la livraison. Devis ferme, sans engagement.';

const FAQ = [
  { q: 'Que comprend exactement le tarif de 1 500 € ?', a: 'Tout ce qu’il faut pour être en ligne : design sur mesure, jusqu’à 6 pages, SEO natif, back-office, nom de domaine, e-mail pro et hébergement la première année. Aucun coût caché.' },
  { q: 'Pourrai-je modifier mon site moi-même ?', a: 'Oui. On livre un back-office simple et on vous forme à sa prise en main. Vous changez vos textes, vos photos et vos actualités sans jamais toucher au code.' },
  { q: 'Combien de temps avant la mise en ligne ?', a: 'Comptez 4 à 6 semaines entre le lancement et la mise en ligne, selon la rapidité des allers-retours et la fourniture de vos contenus.' },];

function Arrow() {
  return (
    <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* filet qui se dessine au scroll */
function DrawLine({ delay = 0, color, width = '100%', height = 2, mb = 0, mt = 0 }: { delay?: number; color: string; width?: number | string; height?: number; mb?: number; mt?: number }) {
  return (
    <motion.span
      aria-hidden
      style={{ display: 'block', width, height, background: color, transformOrigin: 'left', marginBottom: mb, marginTop: mt, borderRadius: 2 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export default function VitrineClient() {
  return (
    <>
      <style>{VITRINE_CSS}</style>

      {/* 1 — HERO (img-1, sombre, halos animés) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="dark"
        glow
        eyebrow="Site vitrine"
        title={
          <>
            Une vitrine qui
            <br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 500 }}>
              révèle
            </span>{' '}
            votre marque.
          </>
        }
        lead="Le digne représentant de votre activité sur le web. Conçu pour rassurer, convaincre et retenir, dès le premier regard."
        primary={{ label: 'Démarrer mon projet', href: '/contact' }}
        secondary={{ label: 'Voir nos réalisations', href: '/realisations' }}
        tags={['Design sur mesure', 'SEO natif', 'À partir de 1500 €']}
      />

      {/* 2 — POUR QUI (img-2, crème) — galerie éditoriale */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="light-strong" parallax={55} py={144} glow="blush">
        <div style={{ maxWidth: 820, marginBottom: 66 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Pour qui</span>
          </Reveal>
          <RevealText as="h2" text="Fait pour celles et ceux qui veulent être pris au sérieux." emphasis="sérieux." style={{ margin: '22px 0 0', ...H2('clamp(33px,4.4vw,58px)') }} />
        </div>

        <div className="vit-aud">
          {POURQUOI.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.12} className="vit-aud__col">
              <span className="vit-aud__glow" aria-hidden />
              <DrawLine delay={i * 0.12 + 0.2} color="var(--klein)" mb={28} />
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--pink)', marginBottom: 14 }}>{p.kw}</div>
              <h3 style={{ fontSize: 'clamp(21px,2.1vw,26px)', fontWeight: 500, marginBottom: 14, lineHeight: 1.16 }}>{p.t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--ink-soft)' }}>{p.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p style={{ marginTop: 58, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(20px,2.1vw,27px)', color: 'var(--klein)', maxWidth: 760, lineHeight: 1.38 }}>
            {POURQUOI_OUTRO}
          </p>
        </Reveal>
      </SectionBg>

      {/* 3 — CE QU'ON CONSTRUIT (img-3, sombre) — lignes lumineuses */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="dark-strong" parallax={65} py={144} glow="klein-pink">
        <div style={{ maxWidth: 680, marginBottom: 58 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)' }}>Ce qu’on construit</span>
          </Reveal>
          <RevealText as="h2" text="Un site, quatre exigences non négociables." emphasis="quatre" style={{ margin: '22px 0 22px', color: '#EAE9EE', ...H2('clamp(32px,4.2vw,54px)') }} />
          <Reveal delay={0.15}>
            <p style={{ fontSize: 16.5, lineHeight: 1.75, color: 'rgba(234,233,238,.72)', maxWidth: 520 }}>{CONSTRUIT_INTRO}</p>
          </Reveal>
        </div>

        <div className="vit-crows">
          {CONSTRUIT.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08} className="vit-crow">
              <span className="vit-crow__sweep" aria-hidden />
              <span className="vit-crow__bar" aria-hidden />
              <div>
                <h3 style={{ fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 500, color: '#EAE9EE', marginBottom: 9, lineHeight: 1.16 }}>{c.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(234,233,238,.68)', maxWidth: 560 }}>{c.d}</p>
              </div>
              <span className="vit-crow__kw" aria-hidden>{c.kw}</span>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 4 — NOTRE APPROCHE (img-4, blush) — frise qui se dessine */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="light-strong" parallax={50} py={144} glow="blush">
        <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 74px' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Notre approche</span>
          </Reveal>
          <RevealText as="h2" text="De la première idée à la mise en ligne." emphasis="première" style={{ margin: '22px 0 0', ...H2('clamp(32px,4.2vw,54px)') }} />
        </div>

        <div className="vit-tl">
          <span className="vit-tl__track" aria-hidden />
          <motion.span className="vit-tl__fill" aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-120px' }} transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }} />
          {APPROCHE.map((a, i) => (
            <Reveal key={a.k} delay={0.15 + i * 0.14} className="vit-tl__step">
              <span className="vit-tl__node">{a.n}</span>
              <div>
                <div style={{ fontSize: 12.5, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--pink)', fontWeight: 600, marginBottom: 9 }}>{a.k}</div>
                <h3 style={{ fontSize: 'clamp(19px,1.9vw,23px)', fontWeight: 500, marginBottom: 9, lineHeight: 1.2 }}>{a.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 5 — SOCLE TECHNIQUE (img-5, sombre) — grands chiffres */}
      <SectionBg image={`${IMG}/img-5.webp`} scrim="dark-strong" parallax={65} py={144} glow="pink-klein">
        <div className="vit-socle">
          <div>
            <Reveal>
              <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)' }}>Le socle technique</span>
            </Reveal>
            <RevealText as="h2" text="Les bonnes technos. Pas les plus à la mode." emphasis="bonnes" style={{ margin: '22px 0 24px', color: '#EAE9EE', ...H2('clamp(30px,3.9vw,50px)') }} />
            <Reveal delay={0.15}>
              <p style={{ fontSize: 16.5, lineHeight: 1.75, color: 'rgba(234,233,238,.74)', maxWidth: 440 }}>{SOCLE_LEAD}</p>
            </Reveal>
          </div>

          <div className="vit-stats">
            {SOCLE_STATS.map((stat, i) => (
              <Reveal key={stat.l} delay={i * 0.1} className="vit-stat">
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(52px,6.2vw,80px)', fontWeight: 500, letterSpacing: '-0.005em', color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)', lineHeight: 1, fontVariantNumeric: 'lining-nums tabular-nums' }}>
                  <Counter to={stat.v} suffix={stat.s} decimals={stat.d} />
                </div>
                <motion.div aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 1, delay: i * 0.1 + 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ height: 2, width: 46, background: i % 2 ? 'var(--pink)' : 'var(--klein-bright)', transformOrigin: 'left', margin: '15px 0 11px', borderRadius: 2 }} />
                <div style={{ fontSize: 13.5, color: 'rgba(234,233,238,.62)' }}>{stat.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBg>

      {/* 6 — TARIF & QUESTIONS (img-6, crème) — révélation typographique + FAQ */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="light-strong" parallax={45} py={144} glow="blush">
        <div className="vit-price">
          <div>
            <Reveal>
              <span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Tarif & délais</span>
            </Reveal>
            <RevealText as="h2" text="Un investissement clair, sans surprise." emphasis="clair," style={{ margin: '20px 0 38px', ...H2('clamp(30px,3.8vw,50px)') }} />
            <Reveal delay={0.1}>
              <div style={{ fontSize: 13, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600 }}>À partir de</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(82px,12vw,150px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--klein)', lineHeight: 0.82, fontVariantNumeric: 'lining-nums' }}>1 500</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px,4.5vw,54px)', fontWeight: 500, color: 'var(--klein)', marginBottom: '0.08em' }}>€</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
                <span style={{ width: 34, height: 1, background: 'var(--line-strong)' }} aria-hidden />
                <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>livré en</span>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(25px,3vw,34px)', color: 'var(--pink)' }}>4 à 6 semaines</span>
              </div>
              <p style={{ marginTop: 28, fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 400 }}>{TARIF_NOTE}</p>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="cta-big" style={{ display: 'inline-flex' }}>Demander un devis<Arrow /></Link>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--klein)', marginBottom: 4 }}>Tout est compris</div>
            </Reveal>
            <div>
              {INCLUS.map((it, i) => (
                <Reveal key={it} delay={i * 0.05} className="svc-inc">
                  <span className="svc-inc__check" aria-hidden>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--klein)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span style={{ fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink)' }}>{it}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div style={{ margin: 'clamp(60px,8vw,96px) 0 clamp(50px,6vw,72px)' }}><DrawLine color="var(--line)" height={1} /></div>
        <MiniFaq theme="light" eyebrow="Questions fréquentes" title="Ce que vous vous demandez sûrement." emphasis="demandez" items={FAQ} />
      </SectionBg>

      {/* 7 — CTA final (img-7, sombre, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="On démarre ?"
        title={`Votre vitrine vous attend.<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 500;">Construisons-la.</span>`}
        description="Premier échange gratuit. On comprend votre besoin, on vous propose un devis ferme sous 5 jours."
        primaryLabel="Démarrer mon projet"
        secondaryLabel="Voir nos réalisations"
        secondaryHref="/realisations"
        showContactInfo
      />
    </>
  );
}

/* ---------------------------------------------------------------- */
const VITRINE_CSS = `
/* Pour qui — galerie 3 colonnes */
.vit-aud { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
.vit-aud__col { position: relative; padding: 4px 38px; border-left: 0.5px solid var(--line); transition: transform .45s cubic-bezier(.22,1,.36,1); overflow: hidden; }
.vit-aud__col:first-child { border-left: none; padding-left: 0; }
.vit-aud__col:hover { transform: translateY(-6px); }
.vit-aud__glow { position: absolute; left: 0; right: 0; bottom: -30%; height: 70%; background: radial-gradient(ellipse at 50% 100%, rgba(27,79,138,.14), transparent 70%); opacity: 0; transition: opacity .5s; }
.vit-aud__col:hover .vit-aud__glow { opacity: 1; }
@media (max-width: 820px) {
  .vit-aud { grid-template-columns: 1fr; }
  .vit-aud__col { border-left: none; border-top: 0.5px solid var(--line); padding: 32px 0; }
  .vit-aud__col:first-child { border-top: none; padding-top: 0; }
}

/* Construit — lignes lumineuses pleine largeur */
.vit-crow { position: relative; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 18px 44px; align-items: center; padding: 30px 0 30px 0; border-top: 0.5px solid rgba(234,233,238,.14); transition: padding-left .45s cubic-bezier(.22,1,.36,1); }
.vit-crow__sweep { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(43,108,196,.14), transparent 55%); transform: scaleX(0); transform-origin: left; transition: transform .55s cubic-bezier(.22,1,.36,1); }
.vit-crow__bar { position: absolute; left: 0; top: 50%; width: 3px; height: 58%; border-radius: 2px; background: linear-gradient(180deg, var(--klein-bright), var(--pink)); transform: translateY(-50%) scaleY(0); transform-origin: center; transition: transform .45s cubic-bezier(.22,1,.36,1); }
.vit-crow:hover { padding-left: 22px; }
.vit-crow:hover .vit-crow__sweep { transform: scaleX(1); }
.vit-crow:hover .vit-crow__bar { transform: translateY(-50%) scaleY(1); }
.vit-crow__kw { font-family: var(--serif); font-style: italic; font-size: clamp(22px,2.6vw,33px); color: rgba(234,233,238,.30); white-space: nowrap; transition: color .4s; }
.vit-crow:hover .vit-crow__kw { color: var(--klein-bright); }
@media (max-width: 680px) {
  .vit-crow { grid-template-columns: 1fr; gap: 6px; }
  .vit-crow__kw { font-size: 18px; }
}

/* Approche — frise qui se dessine */
.vit-tl { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
.vit-tl__track, .vit-tl__fill { position: absolute; top: 24px; left: 12.5%; right: 12.5%; height: 2px; border-radius: 2px; }
.vit-tl__track { background: rgba(27,79,138,.16); }
.vit-tl__fill { background: linear-gradient(90deg, var(--klein), var(--pink)); transform-origin: left; }
.vit-tl__step { position: relative; text-align: center; padding: 0 6px; }
.vit-tl__node { width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; background: #fff; border: 1.5px solid var(--klein); color: var(--klein); font-family: var(--serif); font-style: italic; font-size: 21px; box-shadow: 0 10px 30px -14px rgba(27,79,138,.5); transition: transform .4s, box-shadow .4s, border-color .4s, color .4s; position: relative; z-index: 1; }
.vit-tl__step:hover .vit-tl__node { transform: translateY(-6px) scale(1.07); box-shadow: 0 18px 44px -16px rgba(201,38,106,.55); border-color: var(--pink); color: var(--pink); }
@media (max-width: 860px) {
  .vit-tl { grid-template-columns: 1fr; gap: 0; }
  .vit-tl__track, .vit-tl__fill { display: none; }
  .vit-tl__step { text-align: left; display: grid; grid-template-columns: 50px 1fr; gap: 22px; padding: 24px 0; border-top: 0.5px solid var(--line); align-items: start; }
  .vit-tl__step:first-of-type { border-top: none; }
  .vit-tl__node { margin: 0; }
}

/* Socle — copie + quadrant de chiffres */
.vit-socle { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.05fr); gap: clamp(40px,6vw,80px); align-items: center; }
.vit-stats { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(34px,4vw,54px) clamp(28px,3vw,40px); }
@media (max-width: 860px) { .vit-socle { grid-template-columns: 1fr; gap: 50px; } }

/* Tarif — révélation typographique + inclus */
.vit-price { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: clamp(40px,6vw,90px); align-items: start; }
@media (max-width: 860px) { .vit-price { grid-template-columns: 1fr; gap: 52px; } }
`;

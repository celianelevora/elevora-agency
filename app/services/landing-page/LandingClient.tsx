'use client';

/**
 * PAGE 3 — LANDING PAGE  ·  refonte v2
 * Charte 2026 : titres Noto Serif Display, corps Montserrat.
 * Identité propre (≠ vitrine, ≠ e-commerce) : CONVERSION / FOCUS / VERTICAL.
 *   Manifeste centré · frise verticale qui se dessine au scroll · grand chiffre
 *   au dégradé animé (texte « liquide ») · usages éditoriaux.
 * Ordre strict des images : 1 sombre · 2 blush · 3 sombre · 4 blush · 5 sombre ·
 *   6 crème · 7 sombre. Alternance parfaite.
 * Aucun widget, aucun effet magnétique, aucun halo blanc.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import { SectionBg, Reveal, RevealText } from '@/components/ServiceFX';

const IMG = '/services/landing-page';

const H2 = (size: string): React.CSSProperties => ({ fontSize: size, fontWeight: 500, letterSpacing: '-0.012em', lineHeight: 1.06 });

const ANATOMIE = [
  { t: 'Une accroche qui claque', d: 'Les 3 premières secondes décident de tout. On écrit un titre qui capte et donne envie de lire la suite.' },
  { t: 'Une promesse claire', d: 'Le visiteur doit comprendre en un instant ce qu’il gagne. Pas de jargon, pas de flou : un bénéfice net.' },
  { t: 'La preuve qui rassure', d: 'Témoignages, chiffres, logos clients. On lève les doutes avant même qu’ils n’apparaissent.' },
  { t: 'Un seul appel à l’action', d: 'Une landing page = un objectif. Tout converge vers un bouton, répété au bon moment, impossible à manquer.' },
];

const USAGES = [
  { t: 'Lancement produit', d: 'Créez l’attente, capturez vos premiers clients.' },
  { t: 'Campagne pub', d: 'Une page dédiée par campagne, pour un ROI mesurable.' },
  { t: 'Événement', d: 'Inscriptions, billetterie, comptes à rebours.' },
  { t: 'Capture d’emails', d: 'Construisez votre liste avant même de vendre.' },
];

const INCLUS = [
  'Page unique haute conversion', 'Copywriting orienté action', 'Tracking & analytics posés',
  'Connexion CRM / Brevo', 'Test A/B au lancement', 'Formulaire intelligent',
  'Responsive mobile parfait', 'En ligne sous une semaine', 'Garantie 30 jours',
];
const TARIF_NOTE = 'Idéale pour une campagne, un lancement ou une publicité. Paiement en deux fois possible, devis ferme renvoyé sous 5 jours.';

const FAQ = [
  { q: 'Pourquoi une landing page plutôt qu’une page de mon site ?', a: 'Parce qu’une landing page n’a qu’un seul objectif et zéro distraction : pas de menu, pas de liens qui font fuir. Tout est calibré pour transformer le visiteur en contact ou en client.' },
  { q: 'Le tarif de 600 € est-il vraiment tout compris ?', a: 'Oui : design, copywriting, tracking, connexion à votre CRM et test A/B au lancement. Le seul variable, c’est si vous voulez plusieurs versions de page ou une intégration spécifique.' },
  { q: 'En combien de temps ma page est-elle en ligne ?', a: 'De deux à quatre semaines selon l’ampleur du projet et votre réactivité sur les contenus. Pour une page simple et pressée, on peut tenir la semaine en express ; on s’aligne toujours sur l’échéance de votre campagne.' },
  { q: 'Comment je sais si elle convertit ?', a: 'On pose le tracking et les analytics dès le départ, et on peut lancer un test A/B. Vous voyez vos chiffres en clair : visites, conversions, coût par contact.' },
];

function Arrow() {
  return (<svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
}
function DrawLine({ color, height = 1 }: { color: string; height?: number }) {
  return (<motion.span aria-hidden style={{ display: 'block', width: '100%', height, background: color, transformOrigin: 'left', borderRadius: 2 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />);
}

/* Frise verticale : chaque segment se dessine en entrant dans le champ */
function AnatomieTimeline() {
  return (
    <div className="land-anat">
      {ANATOMIE.map((a, i) => (
        <Reveal key={a.t} delay={i * 0.1} className="land-anat__step">
          {i < ANATOMIE.length - 1 && (
            <motion.span
              className="land-anat__seg"
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          <span className="land-anat__node"><span>{i + 1}</span></span>
          <div className="land-anat__txt">
            <h3 style={{ fontSize: 'clamp(20px,2.1vw,25px)', fontWeight: 500, color: '#EAE9EE', marginBottom: 10, lineHeight: 1.2 }}>{a.t}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(234,233,238,.68)' }}>{a.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function LandingClient() {
  return (
    <>
      <style>{LAND_CSS}</style>

      {/* 1 — HERO (img-1 sombre) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="dark"
        glow
        eyebrow="Landing page"
        title={
          <>
            Une page.
            <br />
            Un objectif.{' '}
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 500 }}>Convertir.</span>
          </>
        }
        lead="Idéale pour une campagne, un lancement, un événement. Chaque élément est pensé pour transformer le visiteur en lead, puis en client."
        primary={{ label: 'Créer ma landing page', href: '/contact' }}
        secondary={{ label: 'Voir nos réalisations', href: '/realisations' }}
        tags={['Copywriting', 'A/B test', 'À partir de 600 € TTC']}
      />

      {/* 2 — LE PRINCIPE (img-2 blush) — manifeste centré */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="light-strong" parallax={50} py={150} glow="blush">
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Le principe</span></Reveal>
          <RevealText as="h2" text="Un site disperse l’attention. Une landing page la concentre." emphasis="concentre." style={{ margin: '24px 0 28px', ...H2('clamp(31px,4.4vw,56px)') }} />
          <Reveal delay={0.2}>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--ink-soft)', maxWidth: 600, margin: '0 auto' }}>
              Pas de menu qui distrait, pas de lien qui fait fuir. Juste un message, une promesse, une action. C’est cette concentration qui fait grimper vos conversions.
            </p>
          </Reveal>
        </div>
      </SectionBg>

      {/* 3 — ANATOMIE (img-3 sombre) — frise verticale qui se dessine */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="dark-strong" parallax={65} py={150} glow="klein-pink">
        <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 62px' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)', justifyContent: 'center' }}>Anatomie d’une landing</span></Reveal>
          <RevealText as="h2" text="Quatre étages, une seule direction." emphasis="seule" style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(30px,4vw,50px)') }} />
        </div>
        <AnatomieTimeline />
      </SectionBg>

      {/* 4 — POUR QUELS USAGES (img-4 blush) — colonnes éditoriales */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="light-strong" parallax={55} py={150} glow="blush">
        <div style={{ maxWidth: 620, margin: '0 auto 60px', textAlign: 'center' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Pour quels usages</span></Reveal>
          <RevealText as="h2" text="Une page taillée pour chaque moment clé." emphasis="clé." style={{ margin: '22px 0 0', ...H2('clamp(30px,4vw,50px)') }} />
        </div>
        <div className="land-usages">
          {USAGES.map((u, i) => (
            <Reveal key={u.t} delay={i * 0.1} className="land-usage">
              <span className="land-usage__num" aria-hidden style={{ color: i % 2 ? 'var(--pink)' : 'var(--klein)' }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 style={{ fontSize: 'clamp(19px,2vw,22px)', fontWeight: 500, color: 'var(--ink)', marginBottom: 10, lineHeight: 1.2 }}>{u.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.68, color: 'var(--ink-soft)' }}>{u.d}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 5 — CE QU'ON GARANTIT (img-5 sombre) — grand chiffre au dégradé animé */}
      <SectionBg image={`${IMG}/img-5.webp`} scrim="dark-strong" parallax={70} py={156} glow="pink-klein">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)', justifyContent: 'center' }}>Ce qu’on garantit</span></Reveal>
          <Reveal delay={0.1}>
            <div className="flow-text" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(58px,9.5vw,124px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, margin: '16px 0 8px' }}>
              1 semaine
            </div>
          </Reveal>
          <RevealText as="h2" text="Votre landing page en ligne dès une semaine." emphasis="semaine." style={{ margin: '0 0 24px', color: '#EAE9EE', ...H2('clamp(26px,3.4vw,42px)') }} />
          <Reveal delay={0.2}>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(234,233,238,.76)', maxWidth: 540, margin: '0 auto' }}>
              Pour une page simple, on tient le délai d’une semaine. Sur un projet plus riche, comptez 2 à 4 semaines maximum — copywriting, design, tracking et mise en ligne compris.
            </p>
          </Reveal>
        </div>
      </SectionBg>

      {/* 6 — TARIF & QUESTIONS (img-6 crème) — révélation typographique + FAQ */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="light-strong" parallax={45} py={150} glow="blush">
        <div className="land-price">
          <div>
            <Reveal><span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Tarif & délais</span></Reveal>
            <RevealText as="h2" text="Un prix net, pour convertir vite." emphasis="net," style={{ margin: '20px 0 36px', ...H2('clamp(29px,3.8vw,46px)') }} />
            <Reveal delay={0.1}>
              <div style={{ fontSize: 13, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600 }}>À partir de</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(82px,12vw,150px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--klein)', lineHeight: 0.82, fontVariantNumeric: 'lining-nums' }}>600</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px,4.5vw,54px)', fontWeight: 500, color: 'var(--klein)', marginBottom: '0.08em' }}>€</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, letterSpacing: '.14em', color: 'var(--ink-muted)', marginBottom: '0.9em', marginLeft: 4 }}>TTC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
                <span style={{ width: 34, height: 1, background: 'var(--line-strong)' }} aria-hidden />
                <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>livré en</span>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(25px,3vw,34px)', color: 'var(--pink)' }}>2 à 4 semaines</span>
              </div>
              <p style={{ marginTop: 28, fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 400 }}>{TARIF_NOTE}</p>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="svc-cta"><span>Créer ma landing</span><Arrow /></Link>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal><div style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--klein)', marginBottom: 4 }}>Tout est compris</div></Reveal>
            <div>
              {INCLUS.map((it, i) => (
                <Reveal key={it} delay={i * 0.05} className="svc-inc">
                  <span className="svc-inc__check" aria-hidden><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--klein)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  <span className="svc-inc__text">{it}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div style={{ margin: 'clamp(60px,8vw,96px) 0 clamp(46px,6vw,68px)' }}><DrawLine color="var(--line)" /></div>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <RevealText as="h2" text="Les questions qu’on nous pose le plus." emphasis="pose" style={{ margin: 0, ...H2('clamp(26px,3.4vw,40px)') }} />
        </div>
        <div className="land-faq">
          {FAQ.map((it, i) => (
            <Reveal key={it.q} delay={(i % 2) * 0.1} className="land-faq__item">
              <h3 style={{ fontSize: 'clamp(18px,1.9vw,21px)', color: 'var(--ink)', marginBottom: 12, display: 'flex', gap: 12, lineHeight: 1.3 }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', flexShrink: 0 }}>Q.</span>
                {it.q}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--ink-soft)', paddingLeft: 28 }}>{it.a}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 7 — CTA (img-7 sombre, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="On lance ?"
        title={`Une campagne en vue ?<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 500;">Donnons-lui une page.</span>`}
        description="Premier échange gratuit. Dites-nous votre objectif, on vous propose la landing page qui convertit — et le devis sous 5 jours."
        primaryLabel="Créer ma landing page"
        secondaryLabel="Voir la méthode"
        secondaryHref="/methode"
        showContactInfo
      />
    </>
  );
}

/* ---------------------------------------------------------------- */
const LAND_CSS = `
/* Texte au dégradé qui coule (signature landing) */
.flow-text {
  background: linear-gradient(90deg, var(--klein) 0%, var(--klein-bright) 28%, var(--pink) 50%, var(--klein-bright) 72%, var(--klein) 100%);
  background-size: 220% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: landFlow 7s linear infinite;
}
@keyframes landFlow { to { background-position: -220% 0; } }
/* Filet de sécurité : si le navigateur ne sait pas clipper le texte, on
   retombe sur une couleur pleine (sinon le texte serait invisible). */
@supports not ((-webkit-background-clip: text) or (background-clip: text)) {
  .flow-text { color: var(--klein); -webkit-text-fill-color: var(--klein); }
}

/* Frise verticale (segments connectés, fin nette au dernier nœud) */
.land-anat { position: relative; max-width: 980px; margin: 0 auto; }
.land-anat__step { position: relative; display: grid; grid-template-columns: 56px 1fr; gap: 28px; align-items: flex-start; padding-bottom: 46px; }
.land-anat__step:last-child { padding-bottom: 0; }
.land-anat__seg { position: absolute; top: 28px; left: 27px; width: 2px; height: 100%; background: linear-gradient(180deg, var(--klein-bright), var(--pink)); transform-origin: top; border-radius: 2px; z-index: 0; }
.land-anat__node {
  position: relative; z-index: 1;
  width: 56px; height: 56px; border-radius: 50%;
  background: #13182b;
  border: 1.5px solid rgba(43,108,196,.65);
  display: flex; align-items: center; justify-content: center;
  transition: transform .5s cubic-bezier(.22,1,.36,1), box-shadow .55s var(--ease), border-color .5s var(--ease);
}
.land-anat__node > span {
  font-family: var(--serif); font-style: italic; font-size: 23px;
  line-height: 1; color: #EAE9EE;
  transform: translateY(0.06em);
  font-variant-numeric: lining-nums;
  transition: color .5s var(--ease);
}
.land-anat__step:hover .land-anat__node {
  transform: scale(1.06);
  border-color: var(--pink);
  box-shadow: 0 0 0 5px rgba(201,38,106,.10), 0 14px 32px -12px rgba(201,38,106,.5);
}
.land-anat__step:hover .land-anat__node > span { color: var(--pink); }
.land-anat__txt { padding-top: 7px; }
.land-anat__txt p { white-space: nowrap; }
@media (max-width: 1040px) {
  .land-anat__txt p { white-space: normal; text-wrap: pretty; }
}

/* Usages — colonnes éditoriales */
.land-usages { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.land-usage { position: relative; padding: 4px 28px; border-left: 0.5px solid var(--line); transition: transform .4s cubic-bezier(.22,1,.36,1); }
.land-usage:first-child { border-left: none; padding-left: 0; }
.land-usage__num { display: block; font-family: var(--serif); font-style: italic; font-size: clamp(40px,4.5vw,62px); line-height: 1; margin-bottom: 16px; transition: transform .4s cubic-bezier(.22,1,.36,1); }
.land-usage:hover { transform: translateY(-7px); }
.land-usage:hover .land-usage__num { transform: scale(1.08); }
@media (max-width: 820px) { .land-usages { grid-template-columns: 1fr 1fr; gap: 38px 28px; } .land-usage { border-left: none; padding: 0; } }
@media (max-width: 480px) { .land-usages { grid-template-columns: 1fr; } }

/* Tarif + FAQ */
.land-price { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: clamp(40px,6vw,90px); align-items: start; }
@media (max-width: 860px) { .land-price { grid-template-columns: 1fr; gap: 52px; } }
.land-faq { display: grid; grid-template-columns: 1fr 1fr; gap: 0 clamp(40px,6vw,80px); max-width: 1000px; margin: 0 auto; }
.land-faq__item { padding: 30px 0; border-top: 0.5px solid var(--line); }
@media (max-width: 760px) { .land-faq { grid-template-columns: 1fr; } }
`;

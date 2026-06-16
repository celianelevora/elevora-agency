'use client';

/**
 * PAGE 4 — APPLICATION WEB & MOBILE  ·  refonte
 * Charte : titres Cochin (fallback Cormorant Garamond), corps Roboto.
 * Identité propre (≠ vitrine, ≠ e-commerce, ≠ landing) : PRODUIT / SYSTÈME /
 *   MULTI-ÉCRANS. Deux interactions signatures : crochets de focus (sélection
 *   d'interface) au survol des modules, et ligne de données animée (tirets qui
 *   défilent) dans le parcours.
 * Ordre strict des images : 1 rose · 2 sombre · 3 rose · 4 sombre · 5 rose ·
 *   6 sombre · 7 crème. Alternance parfaite. Le tarif (liste « Tout est
 *   compris ») est posé sur une section CLAIRE (img-5) pour rester lisible.
 * Aucun widget, aucun effet magnétique, aucun halo blanc.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import { SectionBg, Reveal, RevealText } from '@/components/ServiceFX';

const IMG = '/services/application';

const H2 = (size: string): React.CSSProperties => ({ fontSize: size, fontWeight: 500, letterSpacing: '-0.012em', lineHeight: 1.06 });

const POURQUOI = [
  { t: 'Startups', d: 'Vous avez une idée à valider vite. On construit un MVP solide et évolutif, prêt à pivoter sans tout réécrire.' },
  { t: 'PME à digitaliser', d: 'Un process métier sur Excel qui montre ses limites ? On le transforme en application qui tient la charge.' },
  { t: 'Porteurs de projet', d: 'Vous savez ce que vous voulez, pas comment le coder. On traduit votre vision en produit qui tourne.' },
];

const MODULES = [
  { code: 'APP', t: 'Applications web', d: 'Dashboards, espaces clients, back-offices, plateformes métier. Accessibles partout, sans installation.' },
  { code: 'PWA', t: 'Apps mobiles', d: 'Progressive Web Apps installables ou apps natives. Notifications push, mode hors-ligne, expérience fluide.' },
  { code: 'API', t: 'Intégrations & API', d: 'Connexion à vos outils existants, synchronisations, automatisations entre vos services.' },
  { code: 'DATA', t: 'Bases de données', d: 'Architecture de données pensée pour durer, sécurisée, prête pour la montée en charge.' },
];

const PARCOURS = [
  { t: 'Cadrage', d: 'On comprend vos process et on cible là où le gain de temps est réel.' },
  { t: 'Maquettage', d: 'Des maquettes cliquables que vous testez avant qu’une ligne ne soit codée.' },
  { t: 'Développement', d: 'On livre par modules, vous testez en vrai, on ajuste. Aucun effet tunnel.' },
  { t: 'Production', d: 'Migration, formation, support. L’outil tourne, on assure le suivi.' },
];

const STACK = [
  { l: 'Front', t: 'Next.js · React · TypeScript', d: 'Interfaces rapides, robustes, maintenables.' },
  { l: 'Back', t: 'Node.js · PostgreSQL', d: 'Logique métier fiable, données structurées.' },
  { l: 'Mobile', t: 'PWA · React Native', d: 'Une base de code, tous les écrans.' },
  { l: 'Infra', t: 'Infomaniak · Suisse', d: 'Hébergement souverain, RGPD natif, vert.' },
];

const INCLUS = [
  'Cadrage produit complet', 'Maquettes cliquables validées', 'Développement 100 % sur mesure',
  'Back-office d’administration', 'Authentification sécurisée', 'Hébergement Infomaniak (Suisse)',
  'Code source entièrement à vous', 'Formation à la prise en main', 'Garantie & suivi 30 jours',
];
const TARIF_NOTE = 'Le tarif dépend des fonctionnalités et des plateformes visées. On cadre le périmètre ensemble, puis devis ferme — paiement échelonné par modules.';

const FAQ = [
  { q: 'Web, mobile, ou les deux ?', a: 'On part de votre besoin. Souvent une Progressive Web App couvre web et mobile avec une seule base de code — moins cher, plus rapide à maintenir. Si le natif s’impose vraiment, on le fait.' },
  { q: 'Le code m’appartient vraiment ?', a: 'Oui, à 100 %. Vous récupérez le dépôt, les accès et la documentation. Aucune dépendance à nous, aucun abonnement caché pour utiliser votre propre outil.' },
  { q: 'En combien de temps une première version ?', a: 'Comptez 2 à 4 mois pour un produit solide selon le périmètre. On livre par modules, donc vous voyez l’application prendre forme très tôt — pas au bout de quatre mois.' },
  { q: 'Et après le lancement ?', a: 'Formation, documentation et un suivi de 30 jours inclus. Au-delà, on propose maintenance et évolutions au rythme que vous voulez, sans engagement.' },
];

function Arrow() {
  return (<svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
}
function DrawLine({ color }: { color: string }) {
  return (<motion.span aria-hidden style={{ display: 'block', width: '100%', height: 1, background: color, transformOrigin: 'left', borderRadius: 2 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />);
}

export default function AppClient() {
  return (
    <>
      <style>{APP_CSS}</style>

      {/* 1 — HERO (img-1 rose, clair) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="light"
        glow
        eyebrow="Application web & mobile"
        title={
          <>
            Votre métier,
            <br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 500 }}>en application.</span>
          </>
        }
        lead="Web, mobile, outil métier : on conçoit et on code l’application sur mesure qui fait gagner du temps à votre équipe — et qui vous appartient à 100 %."
        primary={{ label: 'Décrire mon projet', href: '/contact' }}
        secondary={{ label: 'Voir la méthode', href: '/methode' }}
        tags={['iOS & Android', 'Web app / PWA', 'Sur devis']}
      />

      {/* 2 — POUR QUI (img-2 sombre) — rangées numérotées */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="dark-strong" parallax={65} py={146} glow="klein-pink">
        <div style={{ maxWidth: 660, marginBottom: 60 }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)' }}>Pour qui</span></Reveal>
          <RevealText as="h2" text="Pour celles et ceux qui transforment une idée en produit." emphasis="produit." style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(30px,3.9vw,50px)') }} />
        </div>
        <div className="app-who">
          {POURQUOI.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.1} className="app-who__row">
              <span className="app-who__num" aria-hidden style={{ color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)' }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 style={{ fontSize: 'clamp(21px,2.3vw,28px)', fontWeight: 500, color: '#EAE9EE', marginBottom: 10, lineHeight: 1.18 }}>{p.t}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.72, color: 'rgba(234,233,238,.68)', maxWidth: 620 }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 3 — CE QU'ON CONSTRUIT (img-3 rose, clair) — modules + crochets de focus */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="light-strong" parallax={50} py={146} glow="blush">
        <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 60px' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'var(--klein)', justifyContent: 'center' }}>Ce qu’on construit</span></Reveal>
          <RevealText as="h2" text="De l’idée au produit qui tourne." emphasis="tourne." style={{ margin: '22px 0 0', ...H2('clamp(30px,4vw,50px)') }} />
        </div>
        <div className="app-mods">
          {MODULES.map((m, i) => (
            <Reveal key={m.code} delay={(i % 2) * 0.1} className="app-mod">
              <span className="app-mod__code" style={{ color: i % 2 ? 'var(--pink)' : 'var(--klein)' }}>{m.code}</span>
              <h3 style={{ fontSize: 'clamp(22px,2.4vw,28px)', fontWeight: 500, margin: '14px 0 12px', lineHeight: 1.18 }}>{m.t}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.72, color: 'var(--ink-soft)', maxWidth: 460 }}>{m.d}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 4 — LE PARCOURS (img-4 sombre) — ligne de données animée */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="dark-strong" parallax={60} py={146} glow="pink-klein">
        <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 66px' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)', justifyContent: 'center' }}>Le parcours</span></Reveal>
          <RevealText as="h2" text="Un parcours clair, sans effet tunnel." emphasis="tunnel." style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(30px,3.9vw,48px)') }} />
        </div>
        <div className="app-flow">
          <span className="app-flow__line" aria-hidden />
          {PARCOURS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.1} className="app-step">
              <span className="app-step__node"><span>{i + 1}</span></span>
              <h3 style={{ fontSize: 'clamp(18px,1.9vw,22px)', fontWeight: 500, color: '#EAE9EE', margin: '20px 0 10px', lineHeight: 1.2 }}>{s.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.68, color: 'rgba(234,233,238,.66)', maxWidth: 240, margin: '0 auto' }}>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 5 — TARIF (img-5 rose, clair) — révélation typographique + inclusions */}
      <SectionBg image={`${IMG}/img-5.webp`} scrim="light-strong" parallax={45} py={146} glow="blush">
        <div className="app-price">
          <div>
            <Reveal><span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Tarif & délais</span></Reveal>
            <RevealText as="h2" text="Un produit sur mesure, un budget cadré." emphasis="cadré." style={{ margin: '20px 0 36px', ...H2('clamp(29px,3.7vw,46px)') }} />
            <Reveal delay={0.1}>
              <div style={{ fontSize: 13, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600 }}>Budget</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(54px,8vw,104px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--klein)', lineHeight: 0.9 }}>Sur devis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
                <span style={{ width: 34, height: 1, background: 'var(--line-strong)' }} aria-hidden />
                <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>livré en</span>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(25px,3vw,34px)', color: 'var(--pink)' }}>2 à 4 mois</span>
              </div>
              <p style={{ marginTop: 28, fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 420 }}>{TARIF_NOTE}</p>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="cta-big" style={{ display: 'inline-flex' }}>Décrire mon projet<Arrow /></Link>
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
      </SectionBg>

      {/* 6 — SOCLE TECHNIQUE + FAQ (img-6 sombre) */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="dark-strong" parallax={55} py={146} glow="klein-pink">
        <div style={{ maxWidth: 640, marginBottom: 52 }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)' }}>Sous le capot</span></Reveal>
          <RevealText as="h2" text="Un socle technique solide." emphasis="solide." style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(28px,3.6vw,46px)') }} />
        </div>
        <div className="app-stack">
          {STACK.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className="app-stack__row">
              <span className="app-stack__label" style={{ color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)' }}>{s.l}</span>
              <div>
                <h3 style={{ fontSize: 'clamp(17px,1.8vw,20px)', fontWeight: 500, color: '#EAE9EE', marginBottom: 6 }}>{s.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(234,233,238,.64)' }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ margin: 'clamp(60px,8vw,92px) 0 clamp(46px,6vw,64px)' }}><DrawLine color="rgba(234,233,238,.16)" /></div>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <RevealText as="h2" text="Les questions qu’on nous pose le plus." emphasis="pose" style={{ margin: 0, color: '#EAE9EE', ...H2('clamp(26px,3.4vw,40px)') }} />
        </div>
        <div className="app-faq">
          {FAQ.map((it, i) => (
            <Reveal key={it.q} delay={(i % 2) * 0.1} className="app-faq__item">
              <h3 style={{ fontSize: 'clamp(18px,1.9vw,21px)', color: '#EAE9EE', marginBottom: 12, display: 'flex', gap: 12, lineHeight: 1.3 }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', flexShrink: 0 }}>Q.</span>
                {it.q}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(234,233,238,.68)', paddingLeft: 28 }}>{it.a}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 7 — CTA (img-7 crème, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="On en parle ?"
        title={`Une idée d’application ?<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 500;">Donnons-lui vie.</span>`}
        description="Premier échange gratuit. Dites-nous ce que vous voulez construire, on cadre le projet et on vous chiffre tout ça sous 5 jours."
        primaryLabel="Décrire mon projet"
        secondaryLabel="Voir la méthode"
        secondaryHref="/methode"
        showContactInfo
      />
    </>
  );
}

/* ---------------------------------------------------------------- */
const APP_CSS = `
/* Pour qui — rangées numérotées */
.app-who { max-width: 940px; }
.app-who__row { display: grid; grid-template-columns: clamp(70px,9vw,124px) 1fr; gap: clamp(20px,3vw,48px); align-items: baseline; padding: 32px 0; border-top: 0.5px solid rgba(234,233,238,.14); transition: transform .45s cubic-bezier(.22,1,.36,1); }
.app-who__row:first-child { border-top: none; }
.app-who__num { font-family: var(--serif); font-style: italic; font-size: clamp(40px,5vw,70px); line-height: 0.9; transition: transform .45s cubic-bezier(.22,1,.36,1); }
.app-who__row:hover { transform: translateX(8px); }
.app-who__row:hover .app-who__num { transform: scale(1.07); }
@media (max-width: 640px) { .app-who__row { grid-template-columns: 1fr; gap: 8px; } }

/* Modules — crochets de focus au survol (sélection d'interface) */
.app-mods { display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(40px,6vw,72px); max-width: 1040px; margin: 0 auto; }
.app-mod { position: relative; padding: 40px 30px; border-top: 0.5px solid var(--line); transition: transform .5s cubic-bezier(.22,1,.36,1); }
.app-mod::before, .app-mod::after { content: ''; position: absolute; width: 20px; height: 20px; opacity: 0; transition: opacity .45s var(--ease), transform .55s cubic-bezier(.22,1,.36,1); }
.app-mod::before { top: 30px; left: 2px; border-top: 2px solid var(--klein); border-left: 2px solid var(--klein); border-top-left-radius: 3px; transform: translate(9px,9px); }
.app-mod::after { bottom: 30px; right: 2px; border-bottom: 2px solid var(--pink); border-right: 2px solid var(--pink); border-bottom-right-radius: 3px; transform: translate(-9px,-9px); }
.app-mod:hover { transform: translateY(-4px); }
.app-mod:hover::before, .app-mod:hover::after { opacity: 0.9; transform: translate(0,0); }
.app-mod__code { font-size: 12px; letter-spacing: .22em; font-weight: 700; }
@media (max-width: 680px) { .app-mods { grid-template-columns: 1fr; } }

/* Parcours — ligne de données animée (tirets qui défilent) */
.app-flow { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(20px,3vw,44px); max-width: 1040px; margin: 0 auto; }
.app-flow__line { position: absolute; top: 27px; left: 11%; right: 11%; height: 2px; background-image: repeating-linear-gradient(90deg, var(--klein-bright) 0 7px, transparent 7px 15px); background-size: 15px 2px; opacity: .55; animation: appFlow 1.1s linear infinite; }
@keyframes appFlow { to { background-position: 15px 0; } }
.app-step { text-align: center; position: relative; }
.app-step__node { width: 54px; height: 54px; border-radius: 50%; background: #13182b; border: 1.5px solid rgba(43,108,196,.6); display: inline-flex; align-items: center; justify-content: center; position: relative; z-index: 1; transition: transform .45s cubic-bezier(.22,1,.36,1), box-shadow .5s var(--ease), border-color .45s var(--ease); }
.app-step__node > span { font-family: var(--serif); font-style: italic; font-size: 22px; line-height: 1; color: #EAE9EE; transform: translateY(0.06em); font-variant-numeric: lining-nums; transition: color .45s var(--ease); }
.app-step:hover .app-step__node { transform: scale(1.08); border-color: var(--pink); box-shadow: 0 0 0 5px rgba(201,38,106,.10), 0 14px 30px -12px rgba(201,38,106,.5); }
.app-step:hover .app-step__node > span { color: var(--pink); }
@media (max-width: 720px) {
  .app-flow { grid-template-columns: 1fr 1fr; gap: 40px 24px; }
  .app-flow__line { display: none; }
}
@media (max-width: 420px) { .app-flow { grid-template-columns: 1fr; } }

/* Tarif */
.app-price { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: clamp(40px,6vw,90px); align-items: start; }
@media (max-width: 860px) { .app-price { grid-template-columns: 1fr; gap: 52px; } }

/* Socle technique */
.app-stack { display: grid; gap: 0; max-width: 980px; }
.app-stack__row { display: grid; grid-template-columns: clamp(86px,11vw,150px) 1fr; gap: clamp(20px,3vw,40px); align-items: baseline; padding: 26px 0; border-top: 0.5px solid rgba(234,233,238,.14); transition: transform .4s cubic-bezier(.22,1,.36,1); }
.app-stack__row:first-child { border-top: none; }
.app-stack__row:hover { transform: translateX(6px); }
.app-stack__label { font-size: 12px; letter-spacing: .16em; text-transform: uppercase; font-weight: 700; }
@media (max-width: 560px) { .app-stack__row { grid-template-columns: 1fr; gap: 6px; } }

/* FAQ 2×2 */
.app-faq { display: grid; grid-template-columns: 1fr 1fr; gap: 0 clamp(40px,6vw,80px); max-width: 1000px; margin: 0 auto; }
.app-faq__item { padding: 30px 0; border-top: 0.5px solid rgba(234,233,238,.14); }
@media (max-width: 760px) { .app-faq { grid-template-columns: 1fr; } }
`;

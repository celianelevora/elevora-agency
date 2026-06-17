'use client';

/**
 * PAGE 2 — SITE E-COMMERCE  ·  refonte v3
 * Charte : titres Cochin (fallback Cormorant Garamond), corps Roboto.
 * Identité propre (≠ vitrine) : circulation, abondance, commerce.
 *   Bandeau de chiffres · piliers en zigzag · grille « fiche technique ».
 * IMAGE 1 (crème, 4:3) couvre le HERO + « Pour qui » comme UNE SEULE image
 *   continue (un seul fond, zoom « cover », aucune coupure, aucun objet dupliqué).
 * Ordre strict ensuite : 2 sombre · 3 blush · 4 sombre · 5 crème · 6 sombre · 7 blush.
 * Aucun widget : tarif = révélation typographique, tout est intégré.
 */

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CTASection from '@/components/CTASection';
import { SectionBg, Reveal, RevealText, Counter } from '@/components/ServiceFX';

const IMG = '/services/site-ecommerce';

const H2 = (size: string): React.CSSProperties => ({ fontSize: size, fontWeight: 500, letterSpacing: '-0.012em', lineHeight: 1.05 });

const POURQUOI = [
  { kw: 'Histoire', t: 'Créateurs & marques', d: 'Vous fabriquez, vous créez, vous vendez. Votre boutique doit raconter votre histoire autant que vendre vos produits.' },
  { kw: 'Indépendance', t: 'Commerces physiques', d: 'Vous voulez vendre en ligne sans dépendre des marketplaces qui prennent leur commission. On vous rend indépendant.' },
  { kw: 'Scalabilité', t: 'Marques en croissance', d: 'Votre catalogue s’étend, vos volumes augmentent. On construit une base technique qui suit votre rythme sans casser.' },
];

const STATS = [
  { v: 0, s: '%', l: 'de commission sur vos ventes' },
  { v: 100, s: '%', l: 'de vos données vous appartiennent' },
  { v: 70, s: '%', l: 'des achats faits sur mobile' },
  { v: 24, s: '/7', l: 'votre boutique vend pour vous' },
];

const CONSTRUIT = [
  { t: 'Tunnel de conversion optimisé', d: 'Chaque étape du parcours d’achat est pensée pour réduire les abandons de panier et maximiser vos ventes.' },
  { t: 'Fiches produit qui vendent', d: 'Photos, descriptions, avis, cross-selling. La fiche produit est votre meilleur vendeur, on la soigne.' },
  { t: 'Mobile-first absolu', d: 'Plus de 70 % des achats se font sur mobile. Votre boutique est parfaite sur chaque écran, sans exception.' },
];

const FONCTIONS = [
  { t: 'Catalogue illimité', d: 'Produits, variantes, collections, filtres intelligents.' },
  { t: 'Paiement sécurisé', d: 'Stripe, virement, prélèvement. Encaissez en toute sérénité.' },
  { t: 'Gestion des stocks', d: 'Stocks, commandes, clients, le tout centralisé.' },
  { t: 'Transporteurs intégrés', d: 'Colissimo, Mondial Relay, Chronopost. Livraison fluide.' },
  { t: 'Codes promo & ventes', d: 'Campagnes, réductions, ventes flash en quelques clics.' },
  { t: 'Analytics ventes', d: 'Tableau de bord clair : CA, paniers, conversions.' },
];

const INCLUS = [
  'Boutique 100 % sur mesure', 'Paiement Stripe sécurisé', 'Gestion stocks & commandes',
  'Fiches produits illimitées', 'Comptes clients & historique', 'Codes promo & relance panier',
  'Responsive mobile & tablette', 'Référencement (SEO) natif', 'Formation + garantie 30 jours',
];
const TARIF_NOTE = 'Le tarif final dépend de votre catalogue et de vos intégrations. Paiement échelonné : 30 % à la commande, le solde réparti sur le projet.';

const FAQ = [
  { q: 'Pourquoi pas Shopify ou une marketplace ?', a: 'Parce qu’une boutique sur mesure vous appartient à 100 %. Aucune commission sur vos ventes, aucune dépendance à une plateforme, et une expérience pensée pour votre marque — pas pour un template.' },
  { q: 'Comment se passent les paiements ?', a: 'On intègre Stripe : cartes, Apple Pay, Google Pay, paiement en plusieurs fois. Sécurisé, conforme, et les fonds arrivent directement sur votre compte.' },
  { q: 'Pourrai-je gérer mes produits seul ?', a: 'Oui. Vous ajoutez vos produits, gérez vos stocks, suivez vos commandes et éditez vos prix depuis un back-office clair. On vous forme à la prise en main.' },
  { q: 'Combien de temps pour lancer la boutique ?', a: 'Comptez 6 à 10 semaines selon la taille du catalogue et les intégrations. On avance par étapes, avec des points réguliers pour valider ensemble.' },
];

function Arrow() {
  return (<svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
}
function DrawLine({ delay = 0, color, width = '100%', height = 2, mb = 0 }: { delay?: number; color: string; width?: number | string; height?: number; mb?: number }) {
  return (<motion.span aria-hidden style={{ display: 'block', width, height, background: color, transformOrigin: 'left', marginBottom: mb, borderRadius: 2 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }} />);
}

/* ===== Bloc combiné HERO + POUR QUI : une SEULE image continue ===== */
function HeroPourQui() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
  const item = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden', marginTop: -76, background: '#EAE9EE' }}>
      {/* UNE seule image de fond, couvre hero + pour qui sans coupure */}
      <motion.div aria-hidden style={{ position: 'absolute', inset: '-8% 0 -8% 0', backgroundImage: `url(${IMG}/img-1.webp)`, backgroundSize: 'cover', backgroundPosition: 'right center', y: imgY, zIndex: 0 }} />
      {/* Voile crème pour lisibilité */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(234,233,238,.85) 0%, rgba(234,233,238,.52) 44%, rgba(234,233,238,.12) 80%, transparent 100%)' }} />
      {/* Halos blush (jeu de lumière) */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(58% 48% at 76% 30%, rgba(201,38,106,.10), transparent 70%), radial-gradient(48% 42% at 16% 72%, rgba(27,79,138,.08), transparent 72%)' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* HERO */}
        <motion.div className="container" variants={stagger} initial="hidden" animate="visible" style={{ minHeight: 'calc(100vh + 76px)', paddingTop: 'clamp(104px, 12vh, 156px)', paddingBottom: 64 }}>
          <motion.span variants={item} className="svc-eyebrow svc-hero-eyebrow" style={{ color: 'var(--klein)', marginBottom: 22 }}>Site e-commerce</motion.span>
          <motion.h1 variants={item} style={{ margin: '18px 0 30px', maxWidth: 860, color: 'var(--ink)', lineHeight: 1.02 }}>
            Vendez en ligne.<br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 500 }}>Vraiment.</span>
          </motion.h1>
          <motion.p variants={item} className="lead" style={{ marginBottom: 44, maxWidth: 600, color: 'var(--ink-soft)' }}>
            Une boutique sur mesure pensée pour vendre, fidéliser et scaler. Sans commission de marketplace, sans dépendance, 100 % à vous.
          </motion.p>
          <motion.div variants={item} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }} style={{ display: 'inline-flex' }}>
              <Link href="/contact" className="svc-cta"><span>Lancer ma boutique</span><Arrow /></Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }} style={{ display: 'inline-flex' }}>
              <Link href="/methode" className="svc-cta-ghost"><span>Voir la méthode</span></Link>
            </motion.div>
          </motion.div>
          <motion.div variants={item} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 40 }}>
            {['Stripe', 'Stocks & commandes', 'À partir de 1 500 € TTC'].map((t) => (
              <motion.span key={t} whileHover={{ y: -4, scale: 1.06, backgroundColor: 'rgba(255,255,255,.85)' }} whileTap={{ scale: 0.94 }} transition={{ type: 'spring', stiffness: 420, damping: 20 }} style={{ fontSize: 12.5, letterSpacing: '.02em', padding: '8px 16px', borderRadius: 999, cursor: 'default', color: 'var(--ink-soft)', border: '0.5px solid var(--line)', background: 'rgba(255,255,255,.5)', backdropFilter: 'blur(8px)' }}>{t}</motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* POUR QUI (même image, prolongée) */}
        <div className="container" style={{ paddingBottom: 'clamp(64px,8vw,104px)' }}>
          <div className="ecom-pourqui">
            <div className="ecom-pourqui__head">
              <Reveal><span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Pour qui</span></Reveal>
              <RevealText as="h2" text="Pour celles et ceux qui veulent vendre à leur façon." emphasis="vendre" style={{ margin: '22px 0 18px', ...H2('clamp(31px,4vw,52px)') }} />
              <Reveal delay={0.15}><p style={{ fontSize: 16, lineHeight: 1.74, color: 'var(--ink-soft)', maxWidth: 380 }}>Trois profils, une même envie : posséder leur boutique de bout en bout.</p></Reveal>
            </div>
            <div className="ecom-pourqui__list">
              {POURQUOI.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.1} className="ecom-aud">
                  <DrawLine delay={i * 0.1 + 0.15} color="var(--klein)" mb={20} />
                  <div className="ecom-aud__row">
                    <h3 style={{ fontSize: 'clamp(21px,2.2vw,27px)', fontWeight: 500, lineHeight: 1.15 }}>{p.t}</h3>
                    <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--pink)', whiteSpace: 'nowrap' }}>{p.kw}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--ink-soft)', marginTop: 12 }}>{p.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EcommerceClient() {
  return (
    <>
      <style>{ECOM_CSS}</style>

      {/* 1 + 2 — HERO & POUR QUI (img-1 crème, une seule image continue) */}
      <HeroPourQui />

      {/* 3 — LE SUR-MESURE PAIE (img-2 sombre) — bandeau de chiffres */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="dark-strong" parallax={65} py={144} glow="klein-pink">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 70px' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)', justifyContent: 'center' }}>Le sur-mesure paie</span></Reveal>
          <RevealText as="h2" text="Sortir des marketplaces, c’est reprendre le contrôle." emphasis="contrôle." style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(30px,3.9vw,50px)') }} />
        </div>
        <div className="ecom-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1} className="ecom-stat">
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(54px,7vw,92px)', fontWeight: 500, letterSpacing: '-0.01em', color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)', lineHeight: 0.95, fontVariantNumeric: 'lining-nums' }}>
                <Counter to={s.v} suffix={s.s} />
              </div>
              <motion.div aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 1, delay: i * 0.1 + 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ height: 2, width: 40, background: i % 2 ? 'var(--pink)' : 'var(--klein-bright)', transformOrigin: 'left', margin: '16px auto 12px', borderRadius: 2 }} />
              <div style={{ fontSize: 13.5, color: 'rgba(234,233,238,.64)', maxWidth: 170, margin: '0 auto' }}>{s.l}</div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 4 — CE QU'ON CONSTRUIT (img-3 blush) — piliers en zigzag */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="light-strong" parallax={50} py={144} glow="blush">
        <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 64px' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Ce qu’on construit</span></Reveal>
          <RevealText as="h2" text="Une boutique pensée pour la conversion." emphasis="conversion." style={{ margin: '22px 0 0', ...H2('clamp(30px,4vw,50px)') }} />
        </div>
        <div className="ecom-zig">
          {CONSTRUIT.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08} className="ecom-zig__row">
              <span className="ecom-zig__num" aria-hidden style={{ color: i % 2 ? 'var(--pink)' : 'var(--klein)' }}>{String(i + 1).padStart(2, '0')}</span>
              <div className="ecom-zig__txt">
                <h3 style={{ fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 500, marginBottom: 10, lineHeight: 1.16 }}>{c.t}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.72, color: 'var(--ink-soft)', maxWidth: 540 }}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 5 — FONCTIONNALITÉS (img-4 sombre) — fiche technique éditoriale */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="dark-strong" parallax={60} py={144} glow="pink-klein">
        <div style={{ maxWidth: 620, marginBottom: 58 }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)' }}>Fonctionnalités clés</span></Reveal>
          <RevealText as="h2" text="Tout ce qu’il faut pour vendre sereinement." emphasis="sereinement." style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(30px,3.9vw,48px)') }} />
        </div>
        <div className="ecom-feats">
          {FONCTIONS.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 0.08} className="ecom-feat">
              <span className="ecom-feat__dot" aria-hidden style={{ background: i % 2 ? 'var(--pink)' : 'var(--klein-bright)', color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)' }} />
              <div className="ecom-feat__body">
                <h3 style={{ fontSize: 'clamp(18px,1.9vw,21px)', fontWeight: 500, color: '#EAE9EE', marginBottom: 9, lineHeight: 1.2 }}>{f.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(234,233,238,.66)' }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 6 — TARIF (img-5 crème) — révélation typographique */}
      <SectionBg image={`${IMG}/img-5.webp`} scrim="light-strong" parallax={45} py={144} glow="blush">
        <div className="ecom-price">
          <div>
            <Reveal><span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Tarif & délais</span></Reveal>
            <RevealText as="h2" text="Votre boutique, sans surprise." emphasis="surprise." style={{ margin: '20px 0 36px', ...H2('clamp(30px,3.8vw,48px)') }} />
            <Reveal delay={0.1}>
              <div style={{ fontSize: 13, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600 }}>À partir de</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(80px,12vw,148px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--klein)', lineHeight: 0.82, fontVariantNumeric: 'lining-nums' }}>1 500</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px,4.5vw,54px)', fontWeight: 500, color: 'var(--klein)', marginBottom: '0.08em' }}>€</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, letterSpacing: '.14em', color: 'var(--ink-muted)', marginBottom: '0.9em', marginLeft: 4 }}>TTC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
                <span style={{ width: 34, height: 1, background: 'var(--line-strong)' }} aria-hidden />
                <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>livré en</span>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(25px,3vw,34px)', color: 'var(--pink)' }}>6 à 10 semaines</span>
              </div>
              <p style={{ marginTop: 28, fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 420 }}>{TARIF_NOTE}</p>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="svc-cta"><span>Obtenir mon devis</span><Arrow /></Link>
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

      {/* 7 — FAQ (img-6 sombre) — 2×2 éditorial */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="dark-strong" parallax={55} py={140} glow="klein-pink">
        <div style={{ maxWidth: 680, margin: '0 auto 56px', textAlign: 'center' }}>
          <Reveal><span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.72)', justifyContent: 'center' }}>Questions fréquentes</span></Reveal>
          <RevealText as="h2" text="Ce que les marchands nous demandent." emphasis="demandent." style={{ margin: '22px 0 0', color: '#EAE9EE', ...H2('clamp(28px,3.7vw,46px)') }} />
        </div>
        <div className="ecom-faq">
          {FAQ.map((it, i) => (
            <Reveal key={it.q} delay={(i % 2) * 0.1} className="ecom-faq__item">
              <h3 style={{ fontSize: 'clamp(18px,1.9vw,21px)', color: '#EAE9EE', marginBottom: 12, display: 'flex', gap: 12, lineHeight: 1.3 }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', flexShrink: 0 }}>Q.</span>
                {it.q}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(234,233,238,.68)', paddingLeft: 28 }}>{it.a}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 8 — CTA (img-7 blush, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        theme="light"
        eyebrow="Prêt à vendre ?"
        title={`Votre catalogue mérite<br>une <span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 500;">vraie</span> boutique.`}
        description="Premier échange gratuit. On évalue votre projet, votre catalogue, vos besoins, et on vous chiffre tout ça sous 5 jours."
        primaryLabel="Lancer ma boutique"
        secondaryLabel="Voir nos réalisations"
        secondaryHref="/realisations"
        showContactInfo
      />
    </>
  );
}

/* ---------------------------------------------------------------- */
const ECOM_CSS = `
/* Pour qui — entête + liste verticale */
.ecom-pourqui { display: grid; grid-template-columns: minmax(0,0.85fr) minmax(0,1.15fr); gap: clamp(40px,6vw,90px); align-items: start;
  /* Le hero est forcé à 100vh : on garantit TOUJOURS une respiration avant
     pour-qui (l'image continue derrière, donc ce padding ne montre que l'image). */
  padding-top: clamp(40px, 6vh, 88px); }
.ecom-aud { padding: 26px 0; }
.ecom-aud:first-child { padding-top: 0; }
.ecom-aud__row { display: flex; align-items: baseline; justify-content: space-between; gap: 20px; }
@media (max-width: 880px) { .ecom-pourqui { grid-template-columns: 1fr; gap: 44px; padding-top: clamp(48px, 11vw, 80px); } }
/* Écrans COURTS (ex. laptop 1366×768) : le hero 100vh laisse peu d'espace sous lui.
   On cible la hauteur (pas la largeur) pour rétablir la séparation sur ces écrans. */
@media (max-height: 820px) {
  .ecom-pourqui { padding-top: clamp(56px, 10vh, 104px); }
}
@media (max-width: 880px) {
  .ecom-pourqui { padding-top: clamp(56px, 11vw, 88px); }
}

/* Bandeau de chiffres */
.ecom-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.ecom-stat { text-align: center; padding: 0 clamp(14px,2vw,30px); border-left: 0.5px solid rgba(234,233,238,.14); }
.ecom-stat:first-child { border-left: none; }
@media (max-width: 780px) {
  .ecom-stats { grid-template-columns: 1fr 1fr; gap: 44px 0; }
  .ecom-stat:nth-child(3) { border-left: none; }
}

/* Piliers en zigzag */
.ecom-zig { display: grid; gap: 0; max-width: 1000px; margin: 0 auto; }
.ecom-zig__row { display: grid; grid-template-columns: clamp(90px,12vw,170px) 1fr; gap: clamp(24px,4vw,56px); align-items: center; padding: 38px 0; border-top: 0.5px solid var(--line); transition: transform .4s cubic-bezier(.22,1,.36,1); }
.ecom-zig__row:first-child { border-top: none; }
.ecom-zig__num { font-family: var(--serif); font-style: italic; font-size: clamp(56px,8vw,108px); line-height: 0.85; transition: transform .45s cubic-bezier(.22,1,.36,1); }
.ecom-zig__row:hover { transform: translateX(8px); }
.ecom-zig__row:hover .ecom-zig__num { transform: scale(1.06); }
.ecom-zig__row:nth-child(even) { grid-template-columns: 1fr clamp(90px,12vw,170px); }
.ecom-zig__row:nth-child(even) .ecom-zig__num { order: 2; text-align: right; }
.ecom-zig__row:nth-child(even) .ecom-zig__txt { order: 1; }
.ecom-zig__row:nth-child(even):hover { transform: translateX(-8px); }
@media (max-width: 720px) {
  .ecom-zig__row, .ecom-zig__row:nth-child(even) { grid-template-columns: 1fr; gap: 8px; }
  .ecom-zig__row:nth-child(even) .ecom-zig__num { order: 0; text-align: left; }
  .ecom-zig__row:nth-child(even) .ecom-zig__txt { order: 0; }
  .ecom-zig__num { font-size: 52px; }
}

/* Fonctionnalités — grille fiche technique (dot dans la gouttière, pas de saut au survol) */
.ecom-feats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
.ecom-feat { position: relative; padding: 28px 30px 30px 30px; border-top: 0.5px solid rgba(234,233,238,.14); }
.ecom-feat__dot { position: absolute; left: 3px; top: 37px; width: 8px; height: 8px; border-radius: 999px; transition: transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s; }
.ecom-feat__body { transition: transform .4s cubic-bezier(.22,1,.36,1); }
.ecom-feat:hover .ecom-feat__body { transform: translateX(10px); }
.ecom-feat:hover .ecom-feat__dot { transform: scale(1.7); box-shadow: 0 0 16px 2px currentColor; }
@media (max-width: 860px) { .ecom-feats { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .ecom-feats { grid-template-columns: 1fr; } }

/* Tarif */
.ecom-price { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: clamp(40px,6vw,90px); align-items: start; }
@media (max-width: 860px) { .ecom-price { grid-template-columns: 1fr; gap: 52px; } }

/* FAQ 2×2 */
.ecom-faq { display: grid; grid-template-columns: 1fr 1fr; gap: 0 clamp(40px,6vw,80px); max-width: 1000px; margin: 0 auto; }
.ecom-faq__item { padding: 30px 0; border-top: 0.5px solid rgba(234,233,238,.14); }
@media (max-width: 760px) { .ecom-faq { grid-template-columns: 1fr; } }
`;

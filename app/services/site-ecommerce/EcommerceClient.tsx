'use client';

/**
 * PAGE 2 — SITE E-COMMERCE
 * Parti pris visuel : SHOWCASE / BOUTIQUE.
 * Grandes cartes produit, grille mosaique, bandeau de features qui defile,
 * compteurs de resultats. Energie commerciale, rythme soutenu.
 * Tres different de la page Vitrine (qui etait calme et editoriale).
 *
 * Alternance : cream / navy / blush / navy / cream / navy / blush
 *  1 Hero (img-1, light/cream)
 *  2 "Pour qui" (img-1, cream)        [meme image que hero]
 *  3 "Pourquoi sur mesure" (img-2 navy)
 *  4 "Ce qu'on construit" (img-4 blush)
 *  5 "Fonctionnalites" (img-3 navy)   bandeau mosaique
 *  6 "Tarif" (img-6 cream)
 *  7 CTA (img-7 blush->navy)
 */

import Link from 'next/link';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import { SectionBg, Reveal, RevealText, Counter, Tilt } from '@/components/ServiceFX';

const IMG = '/services/site-ecommerce';

const POURQUOI = [
  { t: 'Créateurs & marques', d: "Vous fabriquez, vous créez, vous vendez. Votre boutique doit raconter votre histoire autant que vendre vos produits." },
  { t: 'Commerces physiques', d: "Vous voulez vendre en ligne sans dépendre des marketplaces qui prennent leur commission. On vous rend indépendant." },
  { t: 'Marques en croissance', d: "Votre catalogue s'étend, vos volumes augmentent. On construit une base technique qui suit votre rythme sans casser." },
];

const FONCTIONS = [
  { t: 'Catalogue illimité', d: 'Produits, variantes, collections, filtres intelligents.' },
  { t: 'Paiement sécurisé', d: 'Stripe, virement, prélèvement. Encaissez en toute sérénité.' },
  { t: 'Gestion des stocks', d: 'Stocks, commandes, clients, le tout centralisé.' },
  { t: 'Transporteurs intégrés', d: 'Colissimo, Mondial Relay, Chronopost. Livraison fluide.' },
  { t: 'Codes promo & ventes', d: "Campagnes, réductions, ventes flash en quelques clics." },
  { t: 'Analytics ventes', d: 'Tableau de bord clair : CA, paniers, conversions.' },
];

const CONSTRUIT = [
  { t: 'Tunnel de conversion optimisé', d: "Chaque étape du parcours d'achat est pensée pour réduire les abandons de panier et maximiser vos ventes." },
  { t: 'Fiches produit qui vendent', d: "Photos, descriptions, avis, cross-selling. La fiche produit est votre meilleur vendeur, on la soigne." },
  { t: 'Mobile-first absolu', d: "Plus de 70 % des achats se font sur mobile. Votre boutique est parfaite sur chaque écran, sans exception." },
];

export default function EcommerceClient() {
  return (
    <>
      {/* 1 — HERO (img-1 cream, theme clair) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="light"
        eyebrow="Site e-commerce"
        title={
          <>
            Vendez en ligne.
            <br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 400 }}>
              Vraiment.
            </span>
          </>
        }
        lead="Une boutique sur mesure pensée pour vendre, fidéliser et scaler. Sans commission de marketplace, sans dépendance, 100 % à vous."
        primary={{ label: 'Lancer ma boutique', href: '/contact' }}
        secondary={{ label: 'Voir la méthode', href: '/methode' }}
        tags={['Stripe', 'Stocks & commandes', 'À partir de 3500 €']}
      />

      {/* 2 — POUR QUI (cream, img-1) cartes Tilt */}
      <SectionBg image={`${IMG}/img-1.webp`} scrim="light-strong" parallax={60} py={150}>
        <div style={{ maxWidth: 600, marginBottom: 64 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Pour qui</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Pour celles et ceux qui veulent vendre à leur façon."
            emphasis="vendre"
            style={{ margin: '20px 0 0', fontSize: 'clamp(30px,4vw,50px)', lineHeight: 1.08 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
          {POURQUOI.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.12}>
              <Tilt max={6} glare>
                <div
                  style={{
                    background: 'rgba(255,255,255,.62)',
                    border: '0.5px solid rgba(255,255,255,.85)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '34px 30px',
                    height: '100%',
                    boxShadow: '0 22px 55px -34px rgba(26,26,46,.35)',
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: i === 1 ? 'var(--pink)' : 'var(--klein)', marginBottom: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 20, marginBottom: 12 }}>{p.t}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>{p.d}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 3 — POURQUOI SUR MESURE (navy, img-2) — chiffres percutants */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="dark-strong" parallax={65} py={150}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)', justifyContent: 'center' }}>Le sur-mesure paie</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Sortir des marketplaces, c'est reprendre le contrôle."
            emphasis="contrôle."
            style={{ margin: '20px 0 0', color: '#EAE9EE', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 'clamp(28px,4vw,56px)' }}>
          {[
            { v: 0, s: '%', l: 'de commission sur vos ventes', c: 'var(--klein-bright)' },
            { v: 100, s: '%', l: 'de vos données vous appartiennent', c: 'var(--pink)' },
            { v: 70, s: '%', l: 'des achats faits sur mobile', c: 'var(--klein-bright)' },
            { v: 24, s: '/7', l: 'votre boutique vend pour vous', c: 'var(--pink)' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(42px,5.5vw,66px)', fontWeight: 500, letterSpacing: '-0.03em', color: s.c, lineHeight: 1 }}>
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div style={{ fontSize: 13.5, color: 'rgba(234,233,238,.65)', marginTop: 12, maxWidth: 180, marginInline: 'auto' }}>{s.l}</div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 4 — CE QU'ON CONSTRUIT (blush, img-4) — alternance gauche/droite */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="light-strong" parallax={50} py={150}>
        <div style={{ maxWidth: 600, margin: '0 auto 70px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Ce qu'on construit</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Une boutique pensée pour la conversion."
            emphasis="conversion."
            style={{ margin: '20px 0 0', fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.08 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 920, margin: '0 auto' }}>
          {CONSTRUIT.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: 26,
                  background: 'rgba(255,255,255,.55)',
                  border: '0.5px solid rgba(255,255,255,.8)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '30px 34px',
                  alignItems: 'center',
                  boxShadow: '0 18px 45px -32px rgba(26,26,46,.3)',
                }}
              >
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 40, color: i % 2 ? 'var(--pink)' : 'var(--klein)', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ fontSize: 20, marginBottom: 8 }}>{c.t}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)' }}>{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 5 — FONCTIONNALITES (navy, img-3) — mosaique de cartes */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="dark-strong" parallax={60} py={150}>
        <div style={{ maxWidth: 600, marginBottom: 60 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)' }}>Fonctionnalités clés</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Tout ce qu'il faut pour vendre sereinement."
            emphasis="sereinement."
            style={{ margin: '20px 0 0', color: '#EAE9EE', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 1, background: 'rgba(234,233,238,.1)', border: '0.5px solid rgba(234,233,238,.1)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {FONCTIONS.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 0.08}>
              <div style={{ background: 'rgba(10,16,30,.5)', padding: '32px 28px', height: '100%', backdropFilter: 'blur(4px)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: i % 2 ? 'var(--pink)' : 'var(--klein-bright)', marginBottom: 20 }} />
                <h3 style={{ fontSize: 18, color: '#EAE9EE', marginBottom: 10 }}>{f.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(234,233,238,.66)' }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 6 — TARIF (cream, img-6) */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="light-strong" parallax={45} py={150}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)', justifyContent: 'center' }}>Tarif</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Votre boutique, à partir de 3500 €."
            emphasis="3500"
            style={{ margin: '20px 0 24px', fontSize: 'clamp(30px,4vw,50px)', lineHeight: 1.08 }}
          />
          <Reveal delay={0.15}>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-soft)', maxWidth: 540, margin: '0 auto 44px' }}>
              Le prix dépend de votre catalogue, vos intégrations, votre logistique. On chiffre précisément après un premier échange, sans engagement.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link href="/contact" className="cta-big" style={{ display: 'inline-flex' }}>
              Obtenir mon devis e-commerce
              <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </SectionBg>

      {/* 7 — CTA (img-7 blush, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="Prêt à vendre ?"
        title={`Votre catalogue mérite<br>une <span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">vraie</span> boutique.`}
        description="Premier échange gratuit. On évalue votre projet, votre catalogue, vos besoins, et on vous chiffre tout ça sous 5 jours."
        primaryLabel="Lancer ma boutique"
        secondaryLabel="Voir nos réalisations"
        secondaryHref="/realisations"
        showContactInfo
      />
    </>
  );
}

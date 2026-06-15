'use client';

/**
 * PAGE 1 — SITE VITRINE
 * Parti pris visuel : EDITORIAL / MAGAZINE.
 * Grands numeros serif, colonnes asymetriques, filets fins, beaucoup d'air.
 * Le contenu respire ; les images de fond alternent navy / cream / blush.
 *
 * Sequence (alternance imposee dark/light) :
 *  1 Hero (image 1, dark)               -> herite img-1
 *  2 "Pour qui" (image 1, dark)         -> img-1  [meme image que hero]
 *  3 "Ce qu'on construit" (cream)       -> img-2
 *  4 "Notre approche" (blush)           -> img-4
 *  5 "Le socle technique" (navy)        -> img-3
 *  6 "Tarif & delais" (cream)           -> img-6
 *  7 CTA (navy)                         -> img-7
 */

import Link from 'next/link';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import {
  SectionBg,
  Reveal,
  RevealText,
  Counter,
  Magnetic,
  PriceBlock,
  MiniFaq,
} from '@/components/ServiceFX';

const IMG = '/services/site-vitrine';

const POURQUOI = [
  {
    n: '01',
    t: 'Indépendants & artisans',
    d: "Vous êtes excellent dans votre métier mais invisible en ligne. On vous donne une vitrine qui inspire confiance dès la première seconde.",
  },
  {
    n: '02',
    t: 'Professions libérales',
    d: "Avocat, thérapeute, consultant : votre site doit refléter votre sérieux. On construit une présence à la hauteur de votre expertise.",
  },
  {
    n: '03',
    t: 'PME & commerces',
    d: "Votre activité grandit, votre image doit suivre. On vous offre un site qui parle aussi bien à vos clients qu'à vos futurs partenaires.",
  },
];

const CONSTRUIT = [
  {
    t: 'Design 100 % sur mesure',
    d: "Pas de template recyclé. Chaque pixel est pensé pour votre marque, votre univers, vos clients.",
  },
  {
    t: 'Référencement natif',
    d: "Structure SEO propre dès le premier jour. Google comprend votre site, vos clients vous trouvent.",
  },
  {
    t: 'Back-office simple',
    d: "Vous modifiez vos textes, vos photos, vos actualités en toute autonomie. Sans toucher une ligne de code.",
  },
  {
    t: 'Performance maximale',
    d: "Chargement quasi instantané, Core Web Vitals au vert. Un site rapide retient ses visiteurs.",
  },
];

const APPROCHE = [
  { k: 'Découverte', t: 'On apprend à vous connaître', d: "Un échange pour comprendre votre activité, vos clients, ce qui vous différencie." },
  { k: 'Direction artistique', t: 'On dessine votre univers', d: "Maquettes, couleurs, typographies : vous validez la direction avant la moindre ligne de code." },
  { k: 'Développement', t: 'On donne vie au design', d: "Code propre, animations soignées, responsive parfait. Le site prend forme sous vos yeux." },
  { k: 'Mise en ligne', t: 'On vous accompagne', d: "Formation, mise en ligne, suivi. Vous n'êtes jamais seul face à votre outil." },
];

export default function VitrineClient() {
  return (
    <>
      {/* 1 — HERO (herite de l'image 1, theme sombre) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="dark"
        eyebrow="Site vitrine"
        title={
          <>
            Une vitrine qui
            <br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 400 }}>
              révèle
            </span>{' '}
            votre marque.
          </>
        }
        lead="Le digne représentant de votre activité sur le web. Conçu pour rassurer, convaincre, et retenir, dès le premier regard."
        primary={{ label: 'Démarrer mon projet', href: '/contact' }}
        secondary={{ label: 'Voir nos réalisations', href: '/realisations' }}
        tags={['Design sur mesure', 'SEO natif', 'À partir de 1500 €']}
      />

      {/* 2 — POUR QUI (image 5, theme sombre — distinct du hero) */}
      <SectionBg image={`${IMG}/img-5.webp`} scrim="dark-strong" parallax={70} py={150}>
        <div style={{ maxWidth: 560, marginBottom: 80 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)' }}>
              Pour qui
            </span>
          </Reveal>
          <RevealText
            as="h2"
            text="Fait pour ceux qui veulent être pris au sérieux."
            emphasis="sérieux."
            style={{ margin: '20px 0 0', color: '#EAE9EE', fontSize: 'clamp(30px,4vw,50px)', lineHeight: 1.08 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0 }}>
          {POURQUOI.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 0.12}
              style={{
                padding: '36px 32px 36px 0',
                borderLeft: '0.5px solid rgba(234,233,238,.16)',
                paddingLeft: 32,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 52,
                  lineHeight: 1,
                  color: 'var(--pink)',
                  marginBottom: 22,
                }}
              >
                {p.n}
              </div>
              <h3 style={{ fontSize: 21, color: '#EAE9EE', marginBottom: 12 }}>{p.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(234,233,238,.7)' }}>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 3 — CE QU'ON CONSTRUIT (cream, image 2) — layout magazine 2 colonnes */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="light-strong" parallax={55} py={150}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)', gap: 'clamp(40px,6vw,100px)', alignItems: 'start' }}>
          {/* colonne gauche sticky */}
          <div style={{ position: 'sticky', top: 120 }}>
            <Reveal>
              <span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Ce qu'on construit</span>
            </Reveal>
            <RevealText
              as="h2"
              text="Un site, quatre exigences non négociables."
              emphasis="quatre"
              style={{ margin: '20px 0 24px', fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.08 }}
            />
            <Reveal delay={0.15}>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-soft)', maxWidth: 380 }}>
                Peu importe le format, ces quatre piliers sont systématiques. C'est notre standard, jamais une option.
              </p>
            </Reveal>
          </div>
          {/* colonne droite : liste numerotee a filets */}
          <div>
            {CONSTRUIT.map((c, i) => (
              <Reveal
                key={c.t}
                delay={i * 0.1}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr',
                  gap: 22,
                  padding: '28px 0',
                  borderTop: i === 0 ? 'none' : '0.5px solid var(--line)',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--klein)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{ fontSize: 20, marginBottom: 8 }}>{c.t}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)' }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBg>

      {/* 4 — NOTRE APPROCHE (blush, image 4) — timeline horizontale */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="light-strong" parallax={50} py={150}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 70px' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Notre approche</span>
          </Reveal>
          <RevealText
            as="h2"
            text="De la première idée à la mise en ligne."
            emphasis="première"
            style={{ margin: '20px 0 0', fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.08 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 28 }}>
          {APPROCHE.map((a, i) => (
            <Reveal key={a.k} delay={i * 0.12}>
              <div
                className="svc-glass"
                style={{
                  background: 'rgba(255,255,255,.55)',
                  border: '0.5px solid rgba(255,255,255,.8)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '30px 26px',
                  height: '100%',
                  boxShadow: '0 20px 50px -30px rgba(26,26,46,.3)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'var(--klein)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 18,
                    marginBottom: 20,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 12.5, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: 10, fontWeight: 600 }}>
                  {a.k}
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 10 }}>{a.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 5 — SOCLE TECHNIQUE (navy, image 3) — gros chiffres */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="dark-strong" parallax={65} py={150}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(30px,5vw,70px)', alignItems: 'center' }}>
          <div>
            <Reveal>
              <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)' }}>Le socle technique</span>
            </Reveal>
            <RevealText
              as="h2"
              text="Les bonnes technos. Pas les plus à la mode."
              emphasis="bonnes"
              style={{ margin: '20px 0 24px', color: '#EAE9EE', fontSize: 'clamp(28px,3.6vw,46px)', lineHeight: 1.1 }}
            />
            <Reveal delay={0.15}>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(234,233,238,.72)', maxWidth: 420 }}>
                Next.js, hébergement suisse Infomaniak, base de données fiable. Un socle solide, durable, prêt à grandir avec vous.
              </p>
            </Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 36px' }}>
            {[
              { v: 100, s: '/100', l: 'Score performance visé', d: 0 },
              { v: 99.9, s: '%', l: 'Disponibilité serveur', d: 1 },
              { v: 0, s: '€', l: 'Frais cachés', d: 0 },
              { v: 15, s: ' j', l: 'Garantie incluse', d: 0 },
            ].map((stat, i) => (
              <Reveal key={stat.l} delay={i * 0.1}>
                <div style={{ fontSize: 'clamp(40px,5vw,60px)', fontWeight: 500, letterSpacing: '-0.03em', color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)', lineHeight: 1 }}>
                  <Counter to={stat.v} suffix={stat.s} decimals={stat.d} />
                </div>
                <div style={{ fontSize: 13, color: 'rgba(234,233,238,.6)', marginTop: 10 }}>{stat.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBg>

      {/* 6 — TARIF & DELAIS (cream, image 6) */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="light-strong" parallax={45} py={150}>
        <div style={{ maxWidth: 720, margin: '0 auto 56px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)', justifyContent: 'center' }}>Tarif & délais</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Un investissement clair, sans surprise."
            emphasis="clair,"
            style={{ margin: '20px 0 22px', fontSize: 'clamp(30px,4vw,50px)', lineHeight: 1.08 }}
          />
          <Reveal delay={0.15}>
            <p className="svc-lead" style={{ maxWidth: 560, margin: '0 auto' }}>
              Un prix de départ, et tout ce qu&rsquo;il contient, posé noir sur blanc. Pas de
              ligne cachée, pas de supplément qui tombe à la livraison.
            </p>
          </Reveal>
        </div>
        <div style={{ maxWidth: 940, margin: '0 auto' }}>
          <PriceBlock
            theme="light"
            price="1500"
            delay="4 à 6 semaines"
            included={[
              'Design 100 % sur mesure',
              'Jusqu’à 6 pages soignées',
              'Référencement (SEO) natif',
              'Back-office pour tout modifier',
              'Responsive mobile & tablette',
              'Nom de domaine + e-mail pro',
              'Hébergement la première année',
              'Formation à la prise en main',
              'Garantie 15 jours après livraison',
            ]}
            note="Paiement en deux fois : 30 % à la commande, le solde à la livraison. Devis ferme, sans engagement."
            ctaLabel="Demander un devis"
            ctaHref="/contact"
          />
        </div>
      </SectionBg>

      {/* 6 bis — FAQ (navy, image 3) */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="dark-strong" parallax={55} py={140}>
        <MiniFaq
          theme="dark"
          title="Ce que vous vous demandez sûrement."
          emphasis="demandez"
          items={[
            {
              q: 'Que comprend exactement le tarif de 1500 € ?',
              a: 'Tout ce qu’il faut pour être en ligne : design sur mesure, jusqu’à 6 pages, SEO natif, back-office, nom de domaine, e-mail pro et hébergement la première année. Aucun coût caché.',
            },
            {
              q: 'Pourrai-je modifier mon site moi-même ?',
              a: 'Oui. On livre un back-office simple et on vous forme à sa prise en main. Vous changez vos textes, vos photos et vos actualités sans jamais toucher au code.',
            },
            {
              q: 'Combien de temps avant la mise en ligne ?',
              a: 'Comptez 4 à 6 semaines entre le lancement et la mise en ligne, selon la rapidité des allers-retours et la fourniture de vos contenus.',
            },
            {
              q: 'Et une fois le site livré ?',
              a: 'Vous avez 15 jours de garantie pour ajuster les derniers détails. Au-delà, on reste joignables pour faire évoluer votre vitrine quand vous en avez besoin.',
            },
          ]}
        />
      </SectionBg>

      {/* 7 — CTA final (navy, image 7) — noBleed pour ne pas couper le footer */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="On démarre ?"
        title={`Votre vitrine vous attend.<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">Construisons-la.</span>`}
        description="Premier échange gratuit. On comprend votre besoin, on vous propose un devis ferme sous 5 jours."
        primaryLabel="Démarrer mon projet"
        secondaryLabel="Voir nos réalisations"
        secondaryHref="/realisations"
        showContactInfo
      />
    </>
  );
}

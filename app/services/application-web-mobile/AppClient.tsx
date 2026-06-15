'use client';

/**
 * PAGE 4 — APPLICATION WEB & MOBILE
 * Parti pris visuel : TECHNIQUE / ARCHITECTURE / SYSTEME.
 * Grille structuree facon blueprint, blocs interconnectes, stack en cartes 3D,
 * process en "marches" (escalier = ascension/elevation, theme de la page).
 * Ton plus tech, plus carre que les 3 pages precedentes.
 *
 * Alternance : blush / navy / cream / navy / blush / navy / cream
 *  1 Hero (img-1, light/blush)
 *  2 "Pour qui" (img-1 blush)   [meme image hero]
 *  3 "Ce qu'on construit" (img-2 navy) blueprint grid
 *  4 "Stack" (img-3 cream) cartes tilt
 *  5 "Process" (img-5 blush) escalier
 *  6 "Web & mobile" (img-6 navy)
 *  7 CTA (img-7 cream->navy)
 */

import Link from 'next/link';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import { SectionBg, Reveal, RevealText, Tilt, Counter, PriceBlock, MiniFaq } from '@/components/ServiceFX';

const IMG = '/services/application';

const POURQUOI = [
  { t: 'Startups', d: "Vous avez une idée à valider vite. On construit votre MVP solide, évolutif, prêt à pivoter." },
  { t: 'PME à digitaliser', d: "Un process métier sur Excel qui montre ses limites ? On le transforme en application qui tient la charge." },
  { t: 'Porteurs de projet', d: "Vous savez ce que vous voulez, pas comment le coder. On traduit votre vision en produit." },
];

const CONSTRUIT = [
  { code: 'APP', t: 'Applications web', d: "Dashboards, espaces clients, back-offices, plateformes métier. Accessibles partout, sans installation." },
  { code: 'PWA', t: 'Apps mobiles', d: "Progressive Web Apps installables ou apps natives. Notifications, hors-ligne, expérience fluide." },
  { code: 'API', t: 'Intégrations & API', d: "Connexion à vos outils existants, synchronisations, automatisations entre services." },
  { code: 'DATA', t: 'Bases de données', d: "Architecture de données pensée pour durer, sécurisée, prête pour la montée en charge." },
];

const STACK = [
  { l: 'Front', t: 'Next.js · React · TypeScript', d: 'Interfaces rapides, robustes, maintenables.' },
  { l: 'Back', t: 'Node.js · PostgreSQL', d: 'Logique métier fiable, données structurées.' },
  { l: 'Mobile', t: 'PWA · React Native', d: 'Une base, tous les écrans.' },
  { l: 'Infra', t: 'Infomaniak · Suisse', d: 'Hébergement souverain, RGPD natif, vert.' },
];

const PROCESS = [
  { t: 'Cadrage', d: "On comprend vos process, on identifie où le gain de temps est réel." },
  { t: 'Maquettage', d: "Maquettes cliquables que vous testez avant qu'une ligne ne soit codée." },
  { t: 'Développement par modules', d: "On livre par étapes, vous testez en vrai, on ajuste. Pas d'effet tunnel." },
  { t: 'Production & suivi', d: "Migration, formation, support. L'outil tourne, on assure le SAV." },
];

export default function AppClient() {
  return (
    <>
      {/* 1 — HERO (img-1 blush) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="light"
        eyebrow="Application web & mobile"
        title={
          <>
            On code l'outil
            <br />
            qui vous fait{' '}
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 400 }}>
              décoller.
            </span>
          </>
        }
        lead="Application web, mobile ou les deux. On crée, on connecte, on automatise. Un produit sur mesure, dont le code et les données vous appartiennent."
        primary={{ label: 'Discuter de mon projet', href: '/contact' }}
        secondary={{ label: 'Voir notre méthode', href: '/methode' }}
        tags={['Next.js & React', 'Code à vous', 'Hébergé en Suisse']}
      />

      {/* 2 — POUR QUI (blush, img-7) */}
      <SectionBg image={`${IMG}/img-7.webp`} scrim="light-strong" parallax={60} py={150}>
        <div style={{ maxWidth: 600, marginBottom: 60 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Pour qui</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Pour ceux qui ont dépassé les limites du tableur."
            emphasis="limites"
            style={{ margin: '20px 0 0', fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.08 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 22 }}>
          {POURQUOI.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.12}>
              <div style={{ borderTop: '2px solid var(--klein)', paddingTop: 24, height: '100%' }}>
                <div style={{ fontSize: 13, fontFamily: 'var(--mono, monospace)', color: 'var(--pink)', marginBottom: 14, letterSpacing: '.05em' }}>
                  0{i + 1} / 03
                </div>
                <h3 style={{ fontSize: 21, marginBottom: 12 }}>{p.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)' }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 3 — CE QU'ON CONSTRUIT (navy, img-2) — grille blueprint avec codes */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="dark-strong" parallax={65} py={150}>
        <div style={{ maxWidth: 600, marginBottom: 60 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)' }}>Ce qu'on construit</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Du dashboard à l'app mobile, on architecture tout."
            emphasis="architecture"
            style={{ margin: '20px 0 0', color: '#EAE9EE', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
          {CONSTRUIT.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div
                style={{
                  position: 'relative',
                  padding: '32px 30px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,.04)',
                  border: '0.5px solid rgba(234,233,238,.18)',
                  height: '100%',
                  backdropFilter: 'blur(6px)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 22,
                    fontSize: 12,
                    fontFamily: 'var(--mono, monospace)',
                    letterSpacing: '.12em',
                    color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)',
                    opacity: 0.7,
                  }}
                >
                  {c.code}
                </div>
                <h3 style={{ fontSize: 20, color: '#EAE9EE', marginBottom: 12, marginTop: 8 }}>{c.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(234,233,238,.68)' }}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 4 — STACK (cream, img-3) — cartes tilt 3D */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="light-strong" parallax={50} py={150}>
        <div style={{ maxWidth: 600, margin: '0 auto 60px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Notre stack</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Des technos modernes, choisies pour durer."
            emphasis="durer."
            style={{ margin: '20px 0 0', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 22 }}>
          {STACK.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}>
              <Tilt max={9} glare>
                <div
                  style={{
                    background: 'rgba(255,255,255,.6)',
                    border: '0.5px solid rgba(255,255,255,.85)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '30px 26px',
                    height: '100%',
                    boxShadow: '0 22px 55px -34px rgba(26,26,46,.35)',
                  }}
                >
                  <div style={{ fontSize: 12.5, fontFamily: 'var(--mono, monospace)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--klein)', marginBottom: 16, fontWeight: 600 }}>
                    {s.l}
                  </div>
                  <h3 style={{ fontSize: 17, marginBottom: 10 }}>{s.t}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{s.d}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 5 — PROCESS (blush, img-5) — escalier ascendant */}
      <SectionBg image={`${IMG}/img-5.webp`} scrim="light-strong" parallax={45} py={150}>
        <div style={{ maxWidth: 600, margin: '0 auto 64px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Notre processus</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Quatre marches, de l'idée à la production."
            emphasis="production."
            style={{ margin: '20px 0 0', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {PROCESS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.12}>
              <div
                style={{
                  marginLeft: `${i * 7}%`,
                  marginBottom: 16,
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: 24,
                  alignItems: 'center',
                  background: 'rgba(255,255,255,.6)',
                  border: '0.5px solid rgba(255,255,255,.85)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '26px 32px',
                  boxShadow: '0 16px 40px -30px rgba(26,26,46,.35)',
                }}
              >
                <div style={{ fontSize: 40, fontWeight: 500, color: i % 2 ? 'var(--pink)' : 'var(--klein)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {i + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: 19, marginBottom: 7 }}>{p.t}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-soft)' }}>{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 6 — WEB & MOBILE (navy, img-6) — split 2 colonnes + chiffre */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="dark-strong" parallax={60} py={150}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(30px,5vw,70px)', alignItems: 'center' }}>
          <div>
            <Reveal>
              <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)' }}>Une base, tous les écrans</span>
            </Reveal>
            <RevealText
              as="h2"
              text="Pensé mobile, parfait partout."
              emphasis="partout."
              style={{ margin: '20px 0 24px', color: '#EAE9EE', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
            />
            <Reveal delay={0.15}>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(234,233,238,.72)', maxWidth: 420 }}>
                Une seule application qui s'adapte à l'ordinateur, à la tablette, au téléphone. Vos utilisateurs retrouvent la même expérience fluide, où qu'ils soient.
              </p>
            </Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px' }}>
            {[
              { v: 1, s: '', l: 'base de code', c: 'var(--klein-bright)' },
              { v: 3, s: '+', l: "types d'écrans couverts", c: 'var(--pink)' },
              { v: 100, s: '%', l: 'responsive', c: 'var(--klein-bright)' },
              { v: 0, s: '', l: 'installation requise (PWA)', c: 'var(--pink)' },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.1}>
                <div style={{ fontSize: 'clamp(38px,5vw,56px)', fontWeight: 500, letterSpacing: '-0.03em', color: s.c, lineHeight: 1 }}>
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div style={{ fontSize: 13, color: 'rgba(234,233,238,.6)', marginTop: 8 }}>{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBg>

      {/* 6 bis — TARIF & DELAIS (cream, img-1) — PriceBlock sur devis */}
      <SectionBg image={`${IMG}/img-1.webp`} scrim="light-strong" parallax={45} py={150}>
        <div style={{ maxWidth: 720, margin: '0 auto 56px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)', justifyContent: 'center' }}>Tarif & délais</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Un budget calé sur votre projet, pas l'inverse."
            emphasis="projet,"
            style={{ margin: '20px 0 22px', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
          <Reveal delay={0.15}>
            <p className="svc-lead" style={{ maxWidth: 560, margin: '0 auto' }}>
              Une application se chiffre sur ce qu&rsquo;elle doit faire. On cadre le périmètre
              ensemble, puis on pose un devis ferme — payé une fois, sans abonnement.
            </p>
          </Reveal>
        </div>
        <div style={{ maxWidth: 940, margin: '0 auto' }}>
          <PriceBlock
            theme="light"
            priceLabel="Tarif"
            price="Sur devis"
            unit=""
            priceFontSize="clamp(34px,4vw,48px)"
            delay="8 à 14 semaines"
            includedTitle="Toujours dans le projet"
            included={[
              'Application web ou mobile',
              'Architecture sur mesure',
              'Next.js & React modernes',
              'Base de données dédiée',
              'Comptes & rôles utilisateurs',
              'Tableau de bord & exports',
              'Code source à vous',
              'Hébergement en Suisse',
              'Garantie & suivi 90 jours',
            ]}
            note="Le devis dépend du nombre de modules, des intégrations et de la complexité métier. Payé une fois — aucun abonnement, et le code vous appartient."
            ctaLabel="Cadrer mon projet"
            ctaHref="/contact"
          />
        </div>
      </SectionBg>

      {/* 6 ter — FAQ (navy, img-4) */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="dark-strong" parallax={55} py={140}>
        <MiniFaq
          theme="dark"
          title="Ce qu'on nous demande avant de se lancer."
          emphasis="lancer."
          items={[
            {
              q: 'Web, mobile, ou les deux ?',
              a: 'On part de vos usages. Une app web couvre la majorité des besoins métier ; on ajoute le mobile (iOS / Android) quand vos utilisateurs en ont vraiment besoin sur le terrain.',
            },
            {
              q: 'Pourquoi payer une fois plutôt qu’un abonnement ?',
              a: 'Parce qu’un SaaS vous facture à vie, par utilisateur. Une app sur mesure est un investissement unique : passé un certain volume, elle est largement plus rentable — et elle est à vous.',
            },
            {
              q: 'Le code m’appartient vraiment ?',
              a: 'Oui, à 100 %. On vous livre le code source et les accès. Vous pouvez le faire évoluer avec nous, en interne, ou avec qui vous voulez. Aucune dépendance.',
            },
            {
              q: 'Combien de temps pour développer ?',
              a: 'Comptez 8 à 14 semaines selon le périmètre. On avance par lots livrables, avec des démos régulières pour valider au fur et à mesure plutôt qu’à la toute fin.',
            },
          ]}
        />
      </SectionBg>

      {/* 7 — CTA (img-7 cream, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="On en parle ?"
        title={`Une idée d'application ?<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">Architecturons-la.</span>`}
        description="Premier échange gratuit. On évalue la faisabilité, on chiffre, et on vous dit franchement si on est les bons pour votre projet."
        primaryLabel="Discuter de mon projet"
        secondaryLabel="Voir notre méthode"
        secondaryHref="/methode"
        showContactInfo
      />
    </>
  );
}

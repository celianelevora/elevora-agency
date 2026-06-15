'use client';

/**
 * PAGE 3 — LANDING PAGE
 * Parti pris visuel : CONVERSION / FOCUS.
 * Tout est centre, vertical, un seul fil conducteur du haut vers le bas.
 * Anatomie d'une landing presentee comme une liste numerotee verticale (le
 * visiteur "descend" la page comme il descendrait une vraie landing).
 * Tres different des pages 1 et 2 : ici c'est lineaire et dirige.
 *
 * Alternance : navy / blush / navy / cream / navy / blush / navy
 *  1 Hero (img-1, dark)
 *  2 "Une page un objectif" (img-1 navy)  [meme image hero]
 *  3 "Anatomie d'une landing" (img-2 blush) liste verticale
 *  4 "Ce qu'on garantit" (img-3 navy) wreath
 *  5 "Vitesse" (img-6 cream)
 *  6 "Pour quels usages" (img-4 navy)
 *  7 CTA (img-7 navy)
 */

import Link from 'next/link';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import { SectionBg, Reveal, RevealText, Counter } from '@/components/ServiceFX';

const IMG = '/services/landing-page';

const ANATOMIE = [
  { t: "Une accroche qui claque", d: "Les 3 premières secondes décident de tout. On écrit un titre qui capte et donne envie de lire la suite." },
  { t: "Une promesse claire", d: "Le visiteur doit comprendre en un instant ce qu'il gagne. Pas de jargon, pas de flou : un bénéfice net." },
  { t: "La preuve qui rassure", d: "Témoignages, chiffres, logos clients. On lève les doutes avant même qu'ils n'apparaissent." },
  { t: "Un seul appel à l'action", d: "Une landing = un objectif. Tout converge vers un bouton, répété au bon moment, impossible à manquer." },
];

const USAGES = [
  { t: 'Lancement produit', d: "Créez l'attente, capturez les premiers clients." },
  { t: 'Campagne pub', d: "Une page dédiée par campagne, pour un ROI mesurable." },
  { t: 'Événement', d: "Inscriptions, billetterie, comptes à rebours." },
  { t: "Capture d'emails", d: "Construisez votre liste avant même de vendre." },
];

export default function LandingClient() {
  return (
    <>
      {/* 1 — HERO (img-1 navy) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="dark"
        eyebrow="Landing page"
        title={
          <>
            Une page.
            <br />
            Un objectif.{' '}
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 400 }}>
              Convertir.
            </span>
          </>
        }
        lead="Idéale pour une campagne, un lancement, un événement. Chaque élément est pensé pour transformer le visiteur en lead, puis en client."
        primary={{ label: 'Créer ma landing', href: '/contact' }}
        secondary={{ label: 'Voir nos réalisations', href: '/realisations' }}
        tags={['Copywriting', 'A/B test', 'À partir de 900 €']}
      />

      {/* 2 — UNE PAGE UN OBJECTIF (navy, img-1) — manifeste centre */}
      <SectionBg image={`${IMG}/img-1.webp`} scrim="dark-strong" parallax={70} py={160}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)', justifyContent: 'center' }}>
              Le principe
            </span>
          </Reveal>
          <RevealText
            as="h2"
            text="Un site disperse l'attention. Une landing la concentre."
            emphasis="concentre."
            style={{ margin: '24px 0 28px', color: '#EAE9EE', fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.08 }}
          />
          <Reveal delay={0.2}>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: 'rgba(234,233,238,.78)', maxWidth: 600, margin: '0 auto' }}>
              Pas de menu qui distrait, pas de lien qui fait fuir. Juste un message, une promesse, une action. C'est cette concentration qui fait grimper vos conversions.
            </p>
          </Reveal>
        </div>
      </SectionBg>

      {/* 3 — ANATOMIE (blush, img-2) — liste verticale numerotee, fil conducteur */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="light-strong" parallax={50} py={150}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Reveal>
              <span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Anatomie d'une landing</span>
            </Reveal>
            <RevealText
              as="h2"
              text="Quatre étages, une seule direction."
              emphasis="seule"
              style={{ margin: '20px 0 0', fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.08 }}
            />
          </div>
          {/* ligne verticale reliant les etapes */}
          <div style={{ position: 'relative', paddingLeft: 8 }}>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 35,
                top: 20,
                bottom: 20,
                width: 1.5,
                background: 'linear-gradient(to bottom, var(--klein), var(--pink))',
                opacity: 0.4,
              }}
            />
            {ANATOMIE.map((a, i) => (
              <Reveal key={a.t} delay={i * 0.12}>
                <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 26, alignItems: 'flex-start', paddingBottom: i < ANATOMIE.length - 1 ? 40 : 0 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: '#EAE9EE',
                      border: '1.5px solid var(--klein)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                      fontSize: 22,
                      color: 'var(--klein)',
                      position: 'relative',
                      zIndex: 1,
                      boxShadow: '0 8px 20px -10px rgba(27,79,138,.4)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ paddingTop: 6 }}>
                    <h3 style={{ fontSize: 21, marginBottom: 10 }}>{a.t}</h3>
                    <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>{a.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBg>

      {/* 4 — CE QU'ON GARANTIT (navy, img-3) — autour d'un chiffre central */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="dark-strong" parallax={65} py={160}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)', justifyContent: 'center' }}>Ce qu'on garantit</span>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ fontSize: 'clamp(80px,14vw,180px)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--pink)', lineHeight: 1, margin: '20px 0 8px', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
              <Counter to={48} suffix="h" />
            </div>
          </Reveal>
          <RevealText
            as="h2"
            text="Votre landing en ligne en 48 heures chrono."
            emphasis="chrono."
            style={{ margin: '0 0 24px', color: '#EAE9EE', fontSize: 'clamp(26px,3.4vw,42px)', lineHeight: 1.12 }}
          />
          <Reveal delay={0.2}>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(234,233,238,.76)', maxWidth: 520, margin: '0 auto' }}>
              Pour une landing simple et pressée, on peut aller très vite. Copywriting, design, tracking et mise en ligne : tout est prêt à capturer vos premiers leads en deux jours.
            </p>
          </Reveal>
        </div>
      </SectionBg>

      {/* 5 — VITESSE / inclus (cream, img-6) — bandeau de pastilles */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="light-strong" parallax={45} py={140}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)', justifyContent: 'center' }}>Toujours inclus</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Le nécessaire pour mesurer et améliorer."
            emphasis="mesurer"
            style={{ margin: '20px 0 44px', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {['Copywriting orienté conversion', 'Tracking & analytics', 'Connexion CRM / Brevo', 'Test A/B', 'Responsive parfait', 'Formulaire intelligent'].map((tag, i) => (
              <Reveal key={tag} delay={i * 0.06}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '13px 22px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,.62)',
                    border: '0.5px solid rgba(255,255,255,.85)',
                    fontSize: 14.5,
                    color: 'var(--ink)',
                    boxShadow: '0 12px 30px -22px rgba(26,26,46,.4)',
                  }}
                >
                  {tag}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBg>

      {/* 6 — POUR QUELS USAGES (navy, img-4) — grille 2x2 sobre */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="dark-strong" parallax={60} py={150}>
        <div style={{ maxWidth: 600, margin: '0 auto 56px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)', justifyContent: 'center' }}>Pour quels usages</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Une page taillée pour chaque moment clé."
            emphasis="clé."
            style={{ margin: '20px 0 0', color: '#EAE9EE', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
          {USAGES.map((u, i) => (
            <Reveal key={u.t} delay={i * 0.1}>
              <div style={{ padding: '30px 28px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,.05)', border: '0.5px solid rgba(234,233,238,.16)', height: '100%', backdropFilter: 'blur(6px)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 30, color: i % 2 ? 'var(--pink)' : 'var(--klein-bright)', marginBottom: 16 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: 19, color: '#EAE9EE', marginBottom: 10 }}>{u.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'rgba(234,233,238,.68)' }}>{u.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 7 — CTA (img-7 navy, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="On lance ?"
        title={`Une campagne en vue ?<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">Donnons-lui une page.</span>`}
        description="Premier échange gratuit. Dites-nous votre objectif, on vous propose la landing qui convertit — et le devis sous 5 jours."
        primaryLabel="Créer ma landing"
        secondaryLabel="Voir la méthode"
        secondaryHref="/methode"
        showContactInfo
      />
    </>
  );
}

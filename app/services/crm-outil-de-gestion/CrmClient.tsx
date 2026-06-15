'use client';

/**
 * PAGE 5 — CRM & OUTIL DE GESTION
 * Parti pris visuel : ORDRE / SYSTEME / TABLEAU DE BORD.
 * Grille dense facon dashboard, tableau comparatif SaaS vs sur-mesure,
 * categories en grille modulaire structuree. Le meandre (motif des images)
 * est le fil rouge : ordre, structure, maitrise.
 * Le plus "structure" des 5 layouts.
 *
 * Alternance : navy / cream / navy / blush / navy / cream / navy
 *  1 Hero (img-1, dark)
 *  2 "Le probleme SaaS" (img-1 navy)  [meme image hero]
 *  3 "Ce qu'on developpe" (img-2 cream) grille modulaire
 *  4 "SaaS vs sur-mesure" (img-3 navy) comparatif
 *  5 "Pourquoi sur-mesure" (img-4 blush) 3 raisons
 *  6 "Comment ca se passe" (img-6 cream)
 *  7 CTA (img-7 navy)
 */

import Link from 'next/link';
import ServiceHero from '@/components/ServiceHero';
import CTASection from '@/components/CTASection';
import { SectionBg, Reveal, RevealText, Counter } from '@/components/ServiceFX';

const IMG = '/services/crm';

const CATEGORIES = [
  { t: 'CRM & clients', d: 'Pipeline, relances, historique. Conçu pour votre cycle de vente.', tags: ['Pipeline', 'Relances'] },
  { t: 'Facturation', d: 'Devis, factures, impayés, export comptable conforme.', tags: ['Devis', 'Export FEC'] },
  { t: 'RH & paie', d: 'Salariés, congés, notes de frais, plannings. RGPD natif.', tags: ['Congés', 'Frais'] },
  { t: 'Planning & ops', d: "Interventions, chantiers, ordres de service. Mobile inclus.", tags: ['Plannings', 'Mobile'] },
  { t: 'Extranet client', d: 'Espace privé : suivi, documents, factures, support.', tags: ['Espace', 'Docs'] },
  { t: 'Outil métier', d: "Un besoin que rien ne couvre ? On part de zéro avec vous.", tags: ['Sur mesure', 'Évolutif'] },
];

const COMPARE = [
  { crit: 'Coût dans le temps', saas: 'Abonnement à vie, par utilisateur', sur: 'Payé une fois, rentable dès ~18 mois' },
  { crit: 'Fonctionnalités', saas: 'Celles de l\'éditeur, ni plus ni moins', sur: 'Exactement les vôtres, rien d\'inutile' },
  { crit: 'Vos données', saas: "Chez l'éditeur, soumises à ses CGU", sur: 'À vous, hébergées en Suisse' },
  { crit: 'Évolution', saas: 'Au rythme de l\'éditeur', sur: 'Au vôtre, quand vous voulez' },
];

const RAISONS = [
  { big: 'Une fois', t: 'Vous payez une fois, pas tous les mois', d: "À partir de 18 mois d'usage, un outil sur mesure devient quasi systématiquement plus rentable qu'un abonnement." },
  { big: 'Vous', t: "Vous décidez ce qu'il fait", d: "Pas de fonctionnalité inutile, pas de fonctionnalité manquante. Le périmètre, c'est vous qui le dessinez." },
  { big: 'À vous', t: "L'outil vous appartient", d: 'Code source, base de données, accès serveur. Tout est à votre nom. Personne ne peut vous le retirer.' },
];

const COMMENT = [
  { t: 'Cadrage', d: "On observe comment vous travaillez : tableurs, papiers, gestes répétitifs." },
  { t: 'Maquettage', d: "On dessine l'interface avec vous. On corrige sur le papier avant de coder." },
  { t: 'Développement', d: "Module par module, vous testez en vrai, on ajuste. Pas d'effet tunnel." },
  { t: 'Production', d: "Migration, formation, support. L'outil tourne, on assure le SAV." },
];

export default function CrmClient() {
  return (
    <>
      {/* 1 — HERO (img-1 navy) */}
      <ServiceHero
        image={`${IMG}/img-1.webp`}
        theme="dark"
        eyebrow="CRM & outil de gestion"
        title={
          <>
            L'outil qui vous va.
            <br />
            Pas{' '}
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 400 }}>
              l'inverse.
            </span>
          </>
        }
        lead="CRM, facturation, RH, extranet, outil métier. On développe l'outil dont votre entreprise a vraiment besoin. Pour centraliser, automatiser et enfin tout maîtriser."
        primary={{ label: 'Discuter de mon outil', href: '/contact' }}
        secondary={{ label: 'Voir notre méthode', href: '/methode' }}
        tags={['Payé une fois', 'Code à vous', 'Hébergé en Suisse']}
      />

      {/* 2 — LE PROBLEME SAAS (navy, img-1) — 3 colonnes a filets */}
      <SectionBg image={`${IMG}/img-1.webp`} scrim="dark-strong" parallax={70} py={150}>
        <div style={{ maxWidth: 640, marginBottom: 72 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)' }}>Le problème</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Vous avez essayé les outils du marché. Ils ne vous vont pas."
            emphasis="pas."
            style={{ margin: '20px 0 0', color: '#EAE9EE', fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.1 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 0 }}>
          {[
            { t: 'Trop générique', d: "Les SaaS vous forcent à rentrer dans leur logique au lieu d'épouser la vôtre." },
            { t: 'Trop cher à l\'échelle', d: "Les abonnements par utilisateur finissent par coûter plus cher qu'un outil acheté une fois." },
            { t: 'Trop dépendant', d: "Vos données vivent chez quelqu'un d'autre, qui change ses prix et sa stratégie." },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 0.12} style={{ padding: '0 28px', borderLeft: i === 0 ? 'none' : '0.5px solid rgba(234,233,238,.16)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 46, color: 'var(--pink)', lineHeight: 1, marginBottom: 20 }}>
                0{i + 1}
              </div>
              <h3 style={{ fontSize: 21, color: '#EAE9EE', marginBottom: 12 }}>{p.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(234,233,238,.68)' }}>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 3 — CE QU'ON DEVELOPPE (cream, img-2) — grille modulaire dashboard */}
      <SectionBg image={`${IMG}/img-2.webp`} scrim="light-strong" parallax={55} py={150}>
        <div style={{ maxWidth: 600, marginBottom: 60 }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)' }}>Ce qu'on développe</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Tout ce qui vous fait gagner du temps."
            emphasis="temps."
            style={{ margin: '20px 0 0', fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.08 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 1, background: 'var(--line)', border: '0.5px solid var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 0.08}>
              <div style={{ background: 'rgba(255,255,255,.72)', padding: '32px 28px', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: i % 2 ? 'var(--pink)' : 'var(--klein)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 14 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 style={{ fontSize: 19, marginBottom: 10 }}>{c.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 16 }}>{c.d}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.tags.map((t) => (
                    <span key={t} style={{ fontSize: 11.5, padding: '4px 11px', borderRadius: 999, background: 'rgba(27,79,138,.08)', color: 'var(--klein)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 4 — COMPARATIF (navy, img-3) — tableau SaaS vs sur-mesure */}
      <SectionBg image={`${IMG}/img-3.webp`} scrim="dark-strong" parallax={65} py={150}>
        <div style={{ maxWidth: 620, margin: '0 auto 56px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'rgba(234,233,238,.7)', justifyContent: 'center' }}>SaaS vs sur-mesure</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Deux philosophies. Une seule vous rend libre."
            emphasis="libre."
            style={{ margin: '20px 0 0', color: '#EAE9EE', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
        </div>
        <Reveal delay={0.1}>
          <div style={{ maxWidth: 920, margin: '0 auto', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '0.5px solid rgba(234,233,238,.16)' }}>
            {/* en-tete */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', background: 'rgba(255,255,255,.05)' }}>
              <div style={{ padding: '18px 24px', fontSize: 13, color: 'rgba(234,233,238,.55)', letterSpacing: '.04em' }}>Critère</div>
              <div style={{ padding: '18px 24px', fontSize: 13, color: 'rgba(234,233,238,.7)', letterSpacing: '.04em' }}>SaaS classique</div>
              <div style={{ padding: '18px 24px', fontSize: 13, color: 'var(--pink)', letterSpacing: '.04em', fontWeight: 600 }}>Sur mesure Elevora</div>
            </div>
            {COMPARE.map((row, i) => (
              <div key={row.crit} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderTop: '0.5px solid rgba(234,233,238,.1)', background: i % 2 ? 'rgba(255,255,255,.02)' : 'transparent' }}>
                <div style={{ padding: '20px 24px', fontSize: 14.5, color: '#EAE9EE', fontWeight: 500 }}>{row.crit}</div>
                <div style={{ padding: '20px 24px', fontSize: 14, color: 'rgba(234,233,238,.6)', lineHeight: 1.55 }}>{row.saas}</div>
                <div style={{ padding: '20px 24px', fontSize: 14, color: 'rgba(234,233,238,.92)', lineHeight: 1.55, borderLeft: '2px solid var(--pink)' }}>{row.sur}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionBg>

      {/* 5 — POURQUOI SUR-MESURE (blush, img-4) — 3 grandes raisons */}
      <SectionBg image={`${IMG}/img-4.webp`} scrim="light-strong" parallax={50} py={150}>
        <div style={{ maxWidth: 600, margin: '0 auto 64px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--pink)', justifyContent: 'center' }}>Pourquoi sur mesure</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Trois raisons de ne plus jamais louer votre outil."
            emphasis="jamais"
            style={{ margin: '20px 0 0', fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
          {RAISONS.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.12}>
              <div style={{ background: 'rgba(255,255,255,.6)', border: '0.5px solid rgba(255,255,255,.85)', borderRadius: 'var(--radius-lg)', padding: '34px 30px', height: '100%', boxShadow: '0 20px 50px -34px rgba(26,26,46,.32)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 34, color: i % 2 ? 'var(--pink)' : 'var(--klein)', marginBottom: 18, lineHeight: 1 }}>
                  {r.big}
                </div>
                <h3 style={{ fontSize: 19, marginBottom: 12 }}>{r.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 6 — COMMENT CA SE PASSE (cream, img-6) — 4 etapes en ligne */}
      <SectionBg image={`${IMG}/img-6.webp`} scrim="light-strong" parallax={45} py={150}>
        <div style={{ maxWidth: 600, margin: '0 auto 60px', textAlign: 'center' }}>
          <Reveal>
            <span className="svc-eyebrow" style={{ color: 'var(--klein)', justifyContent: 'center' }}>Comment ça se passe</span>
          </Reveal>
          <RevealText
            as="h2"
            text="De l'idée à l'outil en production."
            emphasis="production."
            style={{ margin: '20px 0 0', fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.08 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
          {COMMENT.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div style={{ position: 'relative', paddingTop: 28 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, fontSize: 13, fontWeight: 600, color: 'var(--pink)', letterSpacing: '.06em' }}>
                  ÉTAPE {i + 1}
                </div>
                <div style={{ height: 2, background: i % 2 ? 'var(--pink)' : 'var(--klein)', width: 40, marginBottom: 18, marginTop: 4 }} />
                <h3 style={{ fontSize: 19, marginBottom: 10 }}>{c.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-soft)' }}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBg>

      {/* 7 — CTA (img-7 navy, noBleed) */}
      <CTASection
        bgImage={`${IMG}/img-7.webp`}
        noBleed
        eyebrow="On en discute ?"
        title={`Un outil en tête ?<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">Parlons-en.</span>`}
        description="Premier échange gratuit. On évalue la faisabilité, on chiffre, et on vous dit franchement si une solution du marché ferait l'affaire — ou pas."
        primaryLabel="Démarrer la discussion"
        secondaryLabel="Voir notre méthode"
        secondaryHref="/methode"
        showContactInfo
      />
    </>
  );
}

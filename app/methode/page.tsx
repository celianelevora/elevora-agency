import Hero from '@/components/Hero';
import Link from 'next/link';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';

export const metadata = {
  title: 'Méthode | Comment on travaille',
  description: "Notre méthode en 4 étapes : cadrage, design, développement, livraison. Transparente, jalonnée, sans zone d'ombre.",
};


const NEVERS = [
  { title: "Vous facturer un changement qu'on aurait dû anticiper", desc: "Si on a mal cadré, c'est sur nous. Vous ne payez jamais notre approximation initiale." },
  { title: 'Sous-traiter sans vous le dire', desc: "Tout est fait par nous, à Nantes. Si jamais on devait s'appuyer sur un partenaire, vous le saurez avant." },
  { title: 'Vous prendre en otage à la fin', desc: "Le code, les accès, le nom de domaine — tout vous appartient. Si vous voulez changer d'agence demain, vous pouvez." },
  { title: "Accepter un projet qu'on ne saurait pas faire", desc: 'Si votre besoin dépasse nos compétences, on vous le dit franchement et on vous oriente vers la bonne personne.' },
];

export default function MethodePage() {
  return (
    <>
      <Hero
        pillText="Notre méthode"
        title={`Quatre étapes,<br>aucune <span class="italic">zone d'ombre.</span>`}
        lead="Un projet digital se passe mal quand le client ne sait pas où il en est, ce qu'on attend de lui, et combien ça va coûter. On a structuré notre méthode pour que ces trois informations soient toujours sur la table."
      />

      {/* STORY SCROLL — Les 4 étapes en immersion */}
      <article>
        <FlowArt aria-label="Méthode Elevora — 4 étapes">
          <FlowSection
            aria-label="Étape 1 — Cadrage"
            style={{ background: 'var(--cream-warm)' }}
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <span
                style={{
                  fontSize: 13,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  fontWeight: 500,
                }}
              >
                Étape 01 — Cadrage · 1 semaine
              </span>
              <h2
                style={{
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                On comprend<br />
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--klein)' }}>
                  avant
                </span>{' '}
                d'agir.
              </h2>
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: 'var(--ink-soft)',
                  maxWidth: 600,
                  marginTop: 16,
                }}
              >
                Premier rendez-vous : on parle de votre métier, de vos clients, de vos concurrents. On définit les objectifs concrets et les indicateurs qui diront si c'est réussi.
              </p>
            </div>
            <div
              className="self-end max-w-md"
              style={{
                background: 'rgba(0,51,160,0.06)',
                borderRadius: 16,
                padding: '24px 28px',
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
                Ce que vous repartez avec
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--klein)' }}>→</span> Une note de cadrage qui synthétise tout
                </li>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--klein)' }}>→</span> Un planning prévisionnel détaillé
                </li>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--klein)' }}>→</span> Un devis ferme, valable 30 jours
                </li>
              </ul>
            </div>
          </FlowSection>

          <FlowSection
            aria-label="Étape 2 — Design"
            style={{ background: 'var(--klein)' }}
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <span
                style={{
                  fontSize: 13,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.6)',
                  fontWeight: 500,
                }}
              >
                Étape 02 — Design · 2 semaines
              </span>
              <h2
                style={{
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--cream)',
                  margin: 0,
                }}
              >
                On dessine.<br />
                Vous{' '}
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)' }}>
                  validez.
                </span>
              </h2>
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: 'rgba(245,240,232,0.8)',
                  maxWidth: 600,
                  marginTop: 16,
                }}
              >
                Maquettes interactives sur Figma : vous cliquez, vous naviguez, vous testez avant qu'une seule ligne de code soit écrite. Retours gratuits et illimités à cette étape.
              </p>
            </div>
            <div
              className="self-end max-w-md"
              style={{
                background: 'rgba(245,240,232,0.08)',
                borderRadius: 16,
                padding: '24px 28px',
                border: '0.5px solid rgba(245,240,232,0.15)',
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: 12 }}>
                Ce que vous repartez avec
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ fontSize: 14, color: 'rgba(245,240,232,0.85)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink)' }}>→</span> Maquettes haute-fidélité de toutes les pages
                </li>
                <li style={{ fontSize: 14, color: 'rgba(245,240,232,0.85)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink)' }}>→</span> Charte graphique appliquée à l'ensemble
                </li>
                <li style={{ fontSize: 14, color: 'rgba(245,240,232,0.85)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink)' }}>→</span> Prototype cliquable
                </li>
              </ul>
            </div>
          </FlowSection>

          <FlowSection
            aria-label="Étape 3 — Développement"
            style={{ background: 'var(--klein-deep)' }}
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <span
                style={{
                  fontSize: 13,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.6)',
                  fontWeight: 500,
                }}
              >
                Étape 03 — Développement · 3 à 5 semaines
              </span>
              <h2
                style={{
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--cream)',
                  margin: 0,
                }}
              >
                Du code{' '}
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)' }}>
                  propre.
                </span><br />
                Pas de magie.
              </h2>
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: 'rgba(245,240,232,0.8)',
                  maxWidth: 600,
                  marginTop: 16,
                }}
              >
                Développement par sprints hebdomadaires. Vous voyez le site progresser semaine après semaine sur une URL privée. Pas de surprise à la livraison.
              </p>
            </div>
            <div
              className="self-end max-w-md"
              style={{
                background: 'rgba(245,240,232,0.08)',
                borderRadius: 16,
                padding: '24px 28px',
                border: '0.5px solid rgba(245,240,232,0.15)',
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: 12 }}>
                Ce que vous repartez avec
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ fontSize: 14, color: 'rgba(245,240,232,0.85)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink)' }}>→</span> Démos de progression chaque semaine
                </li>
                <li style={{ fontSize: 14, color: 'rgba(245,240,232,0.85)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink)' }}>→</span> Code propre, commenté, archivé sur Git
                </li>
                <li style={{ fontSize: 14, color: 'rgba(245,240,232,0.85)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink)' }}>→</span> Performance et accessibilité auditées
                </li>
              </ul>
            </div>
          </FlowSection>

          <FlowSection
            aria-label="Étape 4 — Livraison"
            style={{ background: 'var(--pink-light)' }}
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <span
                style={{
                  fontSize: 13,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--pink-deep)',
                  fontWeight: 500,
                }}
              >
                Étape 04 — Livraison · 1 semaine
              </span>
              <h2
                style={{
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                On vous{' '}
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink-deep)' }}>
                  forme.
                </span><br />
                On reste là.
              </h2>
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: 'var(--ink-soft)',
                  maxWidth: 600,
                  marginTop: 16,
                }}
              >
                Mise en ligne, formation à l'administration, suivi 30 jours. Vous êtes autonome avec votre outil, et on reste joignables sans facturation cachée.
              </p>
            </div>
            <div
              className="self-end max-w-md"
              style={{
                background: 'rgba(153,53,86,0.08)',
                borderRadius: 16,
                padding: '24px 28px',
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
                Ce que vous repartez avec
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink-deep)' }}>→</span> Site en ligne avec votre nom de domaine
                </li>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink-deep)' }}>→</span> Vidéo de formation à l'administration
                </li>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--pink-deep)' }}>→</span> 30 jours de suivi inclus
                </li>
              </ul>
            </div>
          </FlowSection>
        </FlowArt>
      </article>

      <DynamicIslandTOC selector="article h2" accentColor="var(--pink)" />

      {/* CE QU'ON NE FAIT PAS */}
      <section style={{ background: 'var(--klein)', color: 'var(--cream)' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'rgba(245,240,232,0.6)' }}>Et aussi</span>
          <h2 style={{ margin: '18px 0 56px', maxWidth: 640, color: 'var(--cream)' }}>
            Ce qu'on ne fera<br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 400 }}>jamais.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
            {NEVERS.map((n, i) => (
              <div key={i} style={{ borderLeft: '2px solid var(--pink)', paddingLeft: 24 }}>
                <h4 style={{ fontSize: 18, marginBottom: 8, color: 'var(--cream)' }}>{n.title}</h4>
                <p style={{ fontSize: 14, opacity: 0.78, lineHeight: 1.65 }}>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="eyebrow">Démarrer</span>
            <h2 style={{ margin: '18px 0 24px' }}>
              Tout commence par<br />
              un <span className="italic">échange.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 36 }}>
              30 minutes en visio ou en café à Nantes. Vous nous racontez votre projet, on vous dit ce qu'on en pense. Aucun engagement.
            </p>
            <Link href="/contact" className="cta-big">
              Prendre rendez-vous
              <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

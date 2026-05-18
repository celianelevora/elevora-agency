import Hero from '@/components/Hero';
import Link from 'next/link';

export const metadata = {
  title: 'Méthode | Comment on travaille',
  description: "Notre méthode en 4 étapes : cadrage, design, développement, livraison. Transparente, jalonnée, sans zone d'ombre.",
};

const STEPS = [
  {
    n: '01',
    label: 'Cadrage · 1 semaine',
    title: "On comprend votre activité avant de toucher au design",
    desc: "Premier rendez-vous (en visio ou à Nantes) : on parle de votre métier, de vos clients, de vos concurrents, de ce qui marche déjà et de ce qui coince. On définit ensemble les objectifs concrets du projet et les indicateurs qui diront si c'est réussi.",
    deliverables: [
      "Une note de cadrage qui synthétise tout ce qu'on a compris",
      'Un planning prévisionnel détaillé',
      'Un devis ferme, valable 30 jours',
    ],
    deliverableLabel: 'Ce que vous repartez avec',
  },
  {
    n: '02',
    label: 'Design · 2 semaines',
    title: 'On dessine. Vous validez. Page par page.',
    desc: "Maquettes interactives sur Figma : vous cliquez, vous naviguez, vous testez avant qu'une seule ligne de code soit écrite. Les retours sont rapides, gratuits et illimités à cette étape. Une fois la maquette validée, c'est elle qui fait foi pour le développement.",
    deliverables: [
      'Maquettes haute-fidélité de toutes les pages',
      "Charte graphique appliquée à l'ensemble",
      "Prototype cliquable pour anticiper l'expérience finale",
    ],
    deliverableLabel: 'Ce que vous validez',
  },
  {
    n: '03',
    label: 'Développement · 3 à 6 semaines',
    title: 'On code, vous suivez en temps réel',
    desc: "Accès à un environnement de test (URL privée) dès le premier jour. Vous voyez le site se construire. Points de synchro hebdomadaires. Code propre, performant, optimisé SEO. Aucun effet tunnel : vous n'attendez pas 6 semaines pour découvrir le résultat.",
    deliverables: [
      'Environnement de test accessible 24h/24',
      'Point hebdomadaire de 30 min',
      'Tests sur tous les navigateurs et appareils',
      'Optimisation Core Web Vitals systématique',
    ],
    deliverableLabel: 'Comment ça se passe',
  },
  {
    n: '04',
    label: 'Livraison · + suivi 30 jours',
    title: 'On livre, on forme, on reste joignables',
    desc: "Mise en ligne sur votre domaine, redirections SEO si refonte, transfert des accès. Formation à la gestion du contenu en visio (1h enregistrée que vous gardez). Suivi gratuit pendant 30 jours : on corrige les bugs, on ajuste, on répond aux questions. Au-delà, vous êtes autonome — ou on prolonge avec un contrat de maintenance.",
    deliverables: [
      'Site en ligne sur votre domaine',
      'Code source complet et documentation',
      'Vidéo de formation à votre back-office',
      '30 jours de support inclus',
    ],
    deliverableLabel: 'Ce que vous obtenez à la fin',
  },
];

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

      <section>
        <div className="container">
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 48, marginBottom: i < STEPS.length - 1 ? 80 : 0, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 80, fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--klein)', lineHeight: 0.9, fontWeight: 400 }}>
                {s.n}
              </div>
              <div>
                <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pink-deep)', marginBottom: 12 }}>
                  {s.label}
                </div>
                <h2 style={{ marginBottom: 18, fontSize: 'clamp(28px, 3.2vw, 38px)' }}>{s.title}</h2>
                <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 24, maxWidth: 720 }}>
                  {s.desc}
                </p>
                <div style={{ background: 'var(--cream-warm)', borderRadius: 'var(--radius-md)', padding: '24px 28px' }}>
                  <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
                    {s.deliverableLabel}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {s.deliverables.map((d, j) => (
                      <li key={j} style={{ fontSize: 14, color: 'var(--ink-soft)', display: 'flex', gap: 10 }}>
                        <span style={{ color: 'var(--klein)' }}>→</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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

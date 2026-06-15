import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import ServicesKinetic from '@/components/ServicesKinetic';

export const metadata = {
  title: 'Outils de gestion sur mesure | CRM, compta, RH',
  description:
    "Développement d'outils de gestion sur mesure pour PME : CRM, facturation, RH, extranet client, outils métier. Code à vous, hébergement Infomaniak.",
};

const PROBLEMS = [
  { n: '01', title: 'Trop générique', desc: "Votre métier a ses spécificités. Les outils SaaS vous forcent à rentrer dans leur logique au lieu d'épouser la vôtre." },
  { n: '02', title: 'Trop cher à grande échelle', desc: "Les abonnements par utilisateur, par fonctionnalité, par mois finissent par coûter plus cher qu'un outil acheté une fois." },
  { n: '03', title: 'Trop dépendant', desc: "Vos données vivent chez quelqu'un d'autre, qui change ses prix, ses CGU, sa stratégie. Vous n'êtes plus maître." },
];

const CATEGORIES = [
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iconClass: 'icon-box-klein',
    title: 'CRM & gestion clients',
    desc: "Fichier clients, pipeline commercial, suivi des relances, historique des échanges. Conçu pour votre cycle de vente.",
    tags: ['Pipeline', 'Relances auto', 'Synchro mail'],
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Facturation & compta',
    desc: 'Devis, factures, relances impayés, export comptable. Conforme aux normes françaises et à la facturation électronique.',
    tags: ['Devis & factures', 'Facturation élec.', 'Export FEC'],
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    iconClass: 'icon-box-klein',
    title: 'Gestion RH & paie',
    desc: 'Dossiers salariés, congés, notes de frais, plannings, entretiens annuels. Centralisé, accessible, conforme RGPD.',
    tags: ['Congés', 'Notes de frais', 'Plannings'],
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Planning & opérations',
    desc: "Plannings d'équipes, gestion d'interventions, suivi de chantier, ordres de service. L'outil qui orchestre votre activité au quotidien.",
    tags: ['Plannings', 'Interventions', 'Mobile inclus'],
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    iconClass: 'icon-box-klein',
    title: 'Extranet client',
    desc: "Espace privé pour vos clients : suivi de commande, documents, factures, support. L'image que vous voulez projeter.",
    tags: ['Espace client', 'Documents', 'Support'],
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Outil métier sur mesure',
    desc: "Vous avez un besoin que ne couvre aucun logiciel ? C'est notre terrain de jeu. On part de zéro et on construit avec vous.",
    tags: ['100% sur mesure', 'Évolutif'],
  },
];

const REASONS = [
  { big: 'Une fois', title: 'Vous payez une fois, pas tous les mois', desc: "Investissement initial vs abonnements à vie. À partir de 18 mois d'usage, un outil sur mesure devient quasi systématiquement plus rentable." },
  { big: 'Vous', title: "Vous décidez ce qu'il fait", desc: "Pas de fonctionnalité inutile, pas de fonctionnalité manquante. Le périmètre, c'est vous qui le dessinez. On le code." },
  { big: 'À vous', title: "L'outil et les données vous appartiennent", desc: 'Code source, base de données, accès serveur. Tout est à votre nom, hébergé en Suisse. Personne ne peut vous le retirer.' },
];

const HOW = [
  { label: '01 — Cadrage', title: 'On comprend vos process actuels', desc: "On observe comment vous travaillez aujourd'hui : tableurs, papiers, outils utilisés, gestes répétitifs. Le but : identifier où l'outil va vraiment vous faire gagner du temps." },
  { label: '02 — Maquettage', title: "On dessine l'interface avec vous", desc: "Maquettes cliquables que vous pouvez tester, naviguer, critiquer. On corrige sur le papier (rapide) avant de coder (lent)." },
  { label: '03 — Développement par modules', title: 'On livre par étapes, vous testez en vrai', desc: "Module par module, on déploie sur un environnement de test. Vous l'utilisez, vous remontez ce qui coince, on ajuste. Pas d'effet tunnel." },
  { label: '04 — Mise en production', title: 'On bascule, on forme, on reste là', desc: "Migration de vos données existantes si besoin, formation de vos équipes, support post-livraison. L'outil tourne, vous l'utilisez, on assure le SAV." },
];

export default function OutilsGestionPage() {
  return (
    <>
      <Hero
        title={`L'outil qui vous va.<br>Pas <span class="italic">l'inverse.</span>`}
        lead="CRM, facturation, gestion RH, extranet client, outil métier. On développe l'outil dont votre entreprise a vraiment besoin — pas une usine à gaz qu'il faut tordre pour qu'elle s'adapte à vous."
        primaryCTA={{ label: 'Discutons de votre outil', href: '/contact' }}
        secondaryCTA={{ label: 'Voir notre méthode', href: '/methode' }}
      />

      {/* TYPOGRAPHIE CINÉTIQUE — Automatiser · Centraliser · Maîtriser */}
      <ServicesKinetic variant="outils" />

      {/* PROBLÈME */}
      <section style={{ background: '#FFF' }}>
        <div className="container">
          <span className="eyebrow">Le problème</span>
          <h2 style={{ margin: '18px 0 56px', maxWidth: 720 }}>
            Vous avez essayé <span className="italic">les outils</span><br />
            du marché. Ils ne vous vont pas.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {PROBLEMS.map((p, i) => (
              <div key={i}>
                <div style={{ fontSize: 32, fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', marginBottom: 16 }}>{p.n}</div>
                <h4 style={{ fontSize: 18, marginBottom: 10 }}>{p.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section>
        <div className="container">
          <span className="eyebrow">Ce qu'on peut développer</span>
          <h2 style={{ margin: '18px 0 64px', maxWidth: 640 }}>
            Tout ce qui vous fait<br />
            <span className="italic">gagner du temps.</span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
              background: 'var(--line)',
              border: '0.5px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}
          >
            {CATEGORIES.map((c, i) => (
              <div key={i} style={{ background: 'var(--cream)', padding: '36px 32px' }}>
                <div className={`icon-box ${c.iconClass}`} style={{ marginBottom: 18 }}>
                  {c.icon}
                </div>
                <h4 style={{ fontSize: 20, marginBottom: 10 }}>{c.title}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 16 }}>{c.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.tags.map((t, j) => (
                    <span key={j} className="tag" style={{ fontSize: 11 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI SUR MESURE */}
      <section style={{ background: 'var(--klein)', color: 'var(--cream)' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'rgba(245,240,232,0.6)' }}>Pourquoi sur mesure</span>
          <h2 style={{ margin: '18px 0 56px', maxWidth: 720, color: 'var(--cream)' }}>
            Trois raisons de préférer<br />
            le <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 400 }}>sur mesure</span> au SaaS.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {REASONS.map((r, i) => (
              <div key={i}>
                <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--pink)', fontFamily: 'var(--serif)', fontStyle: 'italic', marginBottom: 16, lineHeight: 1 }}>
                  {r.big}
                </div>
                <h4 style={{ fontSize: 19, marginBottom: 12, color: 'var(--cream)' }}>{r.title}</h4>
                <p style={{ fontSize: 14, opacity: 0.78, lineHeight: 1.65 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT */}
      <section>
        <div className="container">
          <span className="eyebrow">Comment ça se passe</span>
          <h2 style={{ margin: '18px 0 56px', maxWidth: 640 }}>
            De l'idée<br />à l'outil <span className="italic">en production.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px 56px' }}>
            {HOW.map((h, i) => (
              <div key={i}>
                <div style={{ fontSize: 13, color: 'var(--pink)', fontFamily: 'var(--serif)', fontStyle: 'italic', marginBottom: 12 }}>{h.label}</div>
                <h4 style={{ fontSize: 18, marginBottom: 10 }}>{h.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Un outil en tête ?<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">Parlons-en.</span>`}
        description="Premier échange gratuit. On évalue la faisabilité, on chiffre, on vous dit si on peut vous aider — ou si une solution du marché ferait l'affaire."
        primaryLabel="Démarrer la discussion"
      />
    </>
  );
}

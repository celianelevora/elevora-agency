const ENGAGEMENTS = [
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="8" rx="1" />
        <rect x="2" y="13" width="20" height="8" rx="1" />
        <line x1="6" y1="7" x2="6.01" y2="7" />
        <line x1="6" y1="17" x2="6.01" y2="17" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Hébergement Infomaniak',
    desc: "Serveurs suisses, énergie verte, RGPD natif. Vos données ne quittent pas l'Europe.",
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
    iconClass: 'icon-box-blue-light',
    title: 'Le code vous appartient',
    desc: 'Pas de location, pas de dépendance. Vous repartez avec votre site, vos accès, votre liberté.',
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Aucune sous-traitance offshore',
    desc: 'Tout est fait à Nantes, par nous. Vous parlez aux gens qui codent votre projet.',
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    iconClass: 'icon-box-blue-light',
    title: 'Devis ferme, zéro surprise',
    desc: "Le prix qu'on annonce est le prix que vous payez. Pas de ligne cachée, pas de surcoût en cours de route.",
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Suivi inclus après livraison',
    desc: "On ne disparaît pas une fois le site en ligne. Bugs, ajustements, questions — on reste joignables.",
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    iconClass: 'icon-box-blue-light',
    title: 'Fondateurs accessibles',
    desc: 'Pas de commercial intermédiaire. Vous parlez directement à ceux qui décident et qui livrent.',
  },
];

interface EngagementsGridProps {
  eyebrow?: string;
  title?: React.ReactNode;
}

export default function EngagementsGrid({ eyebrow = '03 — Pourquoi Elevora', title }: EngagementsGridProps) {
  return (
    <section id="engagements">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h2 style={{ margin: '18px 0 64px', maxWidth: 680 }}>
          {title || (
            <>
              Une jeune agence,<br />
              des engagements <span className="italic">fermes.</span>
            </>
          )}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '0.5px solid var(--line)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          {ENGAGEMENTS.map((e, i) => (
            <div key={i} style={{ background: 'var(--cream)', padding: '36px 32px' }}>
              <div className={`icon-box ${e.iconClass}`} style={{ marginBottom: 18 }}>
                {e.icon}
              </div>
              <h4 style={{ fontSize: 19, marginBottom: 10 }}>{e.title}</h4>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

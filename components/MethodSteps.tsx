const STEPS = [
  {
    label: '01 — Cadrage',
    title: 'On comprend votre activité',
    desc: "Atelier de découverte, objectifs business, contraintes techniques. On part de votre métier, pas d'un template.",
    duration: '~ 1 semaine',
  },
  {
    label: '02 — Design',
    title: 'On dessine, vous validez',
    desc: 'Maquettes interactives, allers-retours, validation page par page avant la moindre ligne de code.',
    duration: '~ 2 semaines',
  },
  {
    label: '03 — Développement',
    title: 'On construit, vous suivez',
    desc: "Code propre, performances optimisées, environnement de test partagé pour suivre l'avancement.",
    duration: '~ 3-6 semaines',
  },
  {
    label: '04 — Livraison',
    title: 'On livre, on reste là',
    desc: 'Mise en ligne, formation à la gestion, suivi sur 30 jours inclus. Vous repartez autonome.',
    duration: '+ suivi 30j',
  },
];

export default function MethodSteps() {
  return (
    <section style={{ background: 'transparent' }}>
      <div className="container">
        <span className="eyebrow">05 — Notre méthode</span>
        <h2 style={{ margin: '18px 0 64px', maxWidth: 720 }}>
          De l'idée à la mise en ligne,<br />
          un chemin <span className="italic">clair et balisé.</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            borderTop: '0.5px solid var(--line)',
          }}
        >
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <div
                key={i}
                style={{
                  padding: i === 0 ? '36px 28px 0 0' : isLast ? '36px 0 0 28px' : '36px 28px 0',
                  borderRight: isLast ? 'none' : '0.5px solid var(--line)',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--pink)',
                    fontWeight: 500,
                    marginBottom: 16,
                    letterSpacing: '0.04em',
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                  }}
                >
                  {step.label}
                </div>
                <h4 style={{ fontSize: 18, marginBottom: 12, letterSpacing: '-0.01em' }}>
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: 'var(--ink-soft)',
                    marginBottom: 20,
                  }}
                >
                  {step.desc}
                </p>
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--ink-muted)',
                    background: 'var(--cream)',
                    padding: '5px 11px',
                    borderRadius: 999,
                  }}
                >
                  {step.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

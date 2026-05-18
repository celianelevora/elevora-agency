const TESTIMONIALS = [
  {
    quote: "Une équipe à l'écoute, des allers-retours rapides, et un résultat qui dépasse ce que j'imaginais pour mon site.",
    initials: 'LK',
    name: 'Lala-K',
    role: 'Créatrice indépendante',
    iconBg: 'var(--pink-light)',
    iconColor: 'var(--pink-deep)',
  },
  {
    quote: 'Devis clair dès le départ, communication directe avec les fondateurs. Du sérieux pour une jeune agence.',
    initials: '—',
    name: 'Témoignage à venir',
    role: 'Verbatim client en cours',
    iconBg: '#E6F1FB',
    iconColor: '#0C447C',
    placeholder: true,
  },
];

export default function Testimonials() {
  return (
    <section>
      <div className="container">
        <span className="eyebrow">06 — Témoignages</span>
        <h2 style={{ margin: '18px 0 64px', maxWidth: 640 }}>
          Ce qu'en disent<br />
          nos <span className="italic">premiers clients.</span>
        </h2>

        <div className="grid-2">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: '#FFF',
                border: '0.5px solid var(--line-soft)',
                borderRadius: 'var(--radius-lg)',
                padding: 36,
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  lineHeight: 0.5,
                  color: 'var(--klein)',
                  marginBottom: 24,
                  fontFamily: 'var(--serif)',
                  height: 32,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: 'var(--ink)',
                  marginBottom: 28,
                  letterSpacing: '-0.005em',
                }}
              >
                {t.quote}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  borderTop: '0.5px solid var(--line-soft)',
                  paddingTop: 20,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: t.iconBg,
                    color: t.iconColor,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: t.placeholder ? 'var(--ink-muted)' : 'inherit',
                    }}
                  >
                    {t.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

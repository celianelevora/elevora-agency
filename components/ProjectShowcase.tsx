import Link from 'next/link';

export default function ProjectShowcase() {
  return (
    <section>
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 56,
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <span className="eyebrow">05 — Réalisations</span>
            <h2 style={{ marginTop: 18 }}>
              Ce qu'on a livré<br />
              <span className="italic">jusqu'ici.</span>
            </h2>
          </div>
          <Link
            href="/realisations"
            style={{
              fontSize: 14,
              color: 'var(--klein)',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Voir tous les projets
            <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Row 1 — Lala-K (large) + Garage */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Lala-K */}
          <Link
            href="/realisations"
            style={{
              background: '#FFF',
              border: '0.5px solid var(--line-soft)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'block',
            }}
          >
            <div
              style={{
                aspectRatio: '16/10',
                background: 'var(--pink-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '0.5px solid var(--line-soft)',
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: '75%',
                  background: '#FFF',
                  borderRadius: 10,
                  border: '0.5px solid var(--line)',
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  boxShadow: '0 12px 32px rgba(10,10,10,0.06)',
                }}
              >
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
                </div>
                <div style={{ height: 12, width: '30%', background: 'var(--pink)', borderRadius: 3 }} />
                <div style={{ height: 7, width: '60%', background: 'var(--cream-warm)', borderRadius: 2 }} />
                <div style={{ height: 7, width: '50%', background: 'var(--cream-warm)', borderRadius: 2 }} />
                <div
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, var(--pink-light), var(--cream-warm))',
                    borderRadius: 6,
                    marginTop: 4,
                  }}
                />
              </div>
            </div>
            <div style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="tag">Refonte</span>
                <span className="tag">Site vitrine</span>
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>2026</span>
              </div>
              <h3 style={{ marginBottom: 8 }}>Lala-K</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                Refonte complète du site d'une créatrice indépendante : nouvelle identité, navigation repensée, mise en valeur des collections.
              </p>
            </div>
          </Link>

          {/* Garage */}
          <Link
            href="/realisations"
            style={{
              background: 'var(--klein)',
              color: 'var(--cream)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'block',
            }}
          >
            <div
              style={{
                aspectRatio: '16/10',
                background: 'var(--klein-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: '75%',
                  background: 'var(--klein)',
                  borderRadius: 10,
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(245,240,232,0.3)' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(245,240,232,0.3)' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(245,240,232,0.3)' }} />
                </div>
                <div style={{ height: 12, width: '40%', background: 'var(--pink)', borderRadius: 3 }} />
                <div style={{ height: 7, width: '70%', background: 'rgba(245,240,232,0.25)', borderRadius: 2 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flex: 1, marginTop: 6 }}>
                  <div style={{ background: 'rgba(245,240,232,0.12)', borderRadius: 6 }} />
                  <div style={{ background: 'rgba(245,240,232,0.12)', borderRadius: 6 }} />
                </div>
              </div>
            </div>
            <div style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="tag tag-light">Site vitrine</span>
                <span style={{ fontSize: 12, opacity: 0.65 }}>2026</span>
              </div>
              <h3 style={{ marginBottom: 8, color: 'var(--cream)' }}>Garage automobile</h3>
              <p style={{ fontSize: 14, opacity: 0.78, lineHeight: 1.55 }}>
                Site vitrine pour un garage indépendant : présentation des services, prise de contact, ancrage local.
              </p>
            </div>
          </Link>
        </div>

        {/* Row 2 — Projet confidentiel + Démo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20 }}>
          <Link
            href="/realisations"
            style={{
              background: '#FFF',
              border: '0.5px solid var(--line-soft)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'block',
            }}
          >
            <div
              style={{
                aspectRatio: '16/10',
                background: 'var(--cream-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: '75%',
                  background: '#FFF',
                  borderRadius: 10,
                  border: '0.5px solid var(--line)',
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ height: 12, width: '35%', background: 'var(--klein)', borderRadius: 3 }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 6, flex: 1 }}>
                  <div style={{ background: 'var(--cream-warm)', borderRadius: 5 }} />
                  <div style={{ background: 'var(--cream-warm)', borderRadius: 5 }} />
                  <div style={{ background: 'var(--cream-warm)', borderRadius: 5 }} />
                </div>
              </div>
            </div>
            <div style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="tag">En cours</span>
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>2026</span>
              </div>
              <h3 style={{ marginBottom: 8 }}>Projet confidentiel</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                Refonte d'envergure en cours pour une activité de service. Mise en ligne prochaine.
              </p>
            </div>
          </Link>

          <Link
            href="/realisations"
            style={{
              background: '#FFF',
              border: '0.5px solid var(--line-soft)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'block',
            }}
          >
            <div
              style={{
                aspectRatio: '16/10',
                background: 'var(--cream-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '0.5px solid var(--line-soft)',
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: '75%',
                  background: '#FFF',
                  borderRadius: 10,
                  border: '0.5px solid var(--line)',
                  padding: 18,
                  display: 'flex',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 70,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    borderRight: '0.5px solid var(--line)',
                    paddingRight: 10,
                  }}
                >
                  <div style={{ height: 8, background: 'var(--klein)', borderRadius: 2 }} />
                  <div style={{ height: 8, background: 'var(--cream-warm)', borderRadius: 2 }} />
                  <div style={{ height: 8, background: 'var(--cream-warm)', borderRadius: 2 }} />
                  <div style={{ height: 8, background: 'var(--cream-warm)', borderRadius: 2 }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ height: 8, width: '60%', background: 'var(--ink)', borderRadius: 2 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, flex: 1 }}>
                    <div style={{ background: 'var(--pink-light)', borderRadius: 5 }} />
                    <div style={{ background: '#E6F1FB', borderRadius: 5 }} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="tag" style={{ background: 'var(--pink-light)', color: 'var(--pink-deep)' }}>
                  Démo Elevora
                </span>
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>2026</span>
              </div>
              <h3 style={{ marginBottom: 8 }}>Projet vitrine interne</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                Démonstration de notre savoir-faire : architecture moderne, design soigné, performances optimales.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

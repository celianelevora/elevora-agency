import Link from 'next/link';

export default function ServicesGrid() {
  return (
    <section>
      <div className="container">
        <span className="eyebrow">02 — Ce qu'on fait</span>
        <h2 style={{ margin: '18px 0 64px', maxWidth: 640 }}>
          Deux métiers,<br />
          une <span className="italic">même</span> obsession.
        </h2>

        <div className="grid-2">
          {/* Sites web — carte claire */}
          <Link
            href="/services/sites-web"
            className="service-card"
            style={{
              background: '#FFF',
              borderRadius: 'var(--radius-lg)',
              padding: '40px 36px',
              border: '0.5px solid var(--line-soft)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 420,
              transition: 'transform 0.3s var(--ease), border-color 0.3s var(--ease)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div className="icon-box icon-box-klein">
                <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span style={{ fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
                SERVICE 01
              </span>
            </div>
            <h3 style={{ marginBottom: 16 }}>Sites web qui convertissent</h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 28 }}>
              Vitrine, e-commerce, refonte. Des sites pensés pour vos clients et vos résultats, pas pour le portfolio de l'agence.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'auto' }}>
              <span className="tag">Site vitrine</span>
              <span className="tag">E-commerce</span>
              <span className="tag">Refonte complète</span>
              <span className="tag">Landing page</span>
            </div>
            <div
              style={{
                marginTop: 32,
                paddingTop: 20,
                borderTop: '0.5px solid var(--line-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>À partir de 1500 €</span>
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--klein)',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                Découvrir
                <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Outils de gestion — carte bleue */}
          <Link
            href="/services/outils-de-gestion"
            className="service-card"
            style={{
              background: 'var(--klein)',
              color: 'var(--cream)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 420,
              transition: 'transform 0.3s var(--ease)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div className="icon-box" style={{ background: 'var(--pink)', color: 'var(--cream)' }}>
                <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <span style={{ fontSize: 12, opacity: 0.6, letterSpacing: '0.06em' }}>
                SERVICE 02
              </span>
            </div>
            <h3 style={{ marginBottom: 16, color: 'var(--cream)' }}>Outils de gestion sur mesure</h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.78, marginBottom: 28 }}>
              CRM, gestion clients, facturation, RH, opérations. On développe l'outil dont votre entreprise a besoin — pas une usine à gaz qu'il faut adapter.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'auto' }}>
              <span className="tag tag-light">CRM</span>
              <span className="tag tag-light">Compta &amp; facturation</span>
              <span className="tag tag-light">Gestion RH</span>
              <span className="tag tag-light">Extranet client</span>
              <span className="tag tag-light">Outil métier</span>
            </div>
            <div
              style={{
                marginTop: 32,
                paddingTop: 20,
                borderTop: '0.5px solid rgba(245,240,232,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, opacity: 0.65 }}>Devis sur mesure</span>
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--cream)',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                Découvrir
                <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

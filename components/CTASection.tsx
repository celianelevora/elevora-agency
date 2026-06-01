import Link from 'next/link';

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showContactInfo?: boolean;
}

export default function CTASection({
  eyebrow,
  title,
  description,
  primaryLabel = 'Prendre contact',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  showContactInfo = false,
}: CTASectionProps) {
  return (
    <section
      className="cta-section"
      style={{
        background:
          'linear-gradient(135deg, var(--night-deep) 0%, var(--klein-deep) 55%, var(--night) 100%)',
        color: 'var(--cream)',
        padding: '120px 0 140px',
        position: 'relative',
        /* Marge negative bas : la section "mord" sur le footer pour eviter
           toute bande blanche/grise visible entre CTA et footer. */
        marginBottom: '-1px',
      }}
    >
      {/* Halos ambient luxe (framboise + bleu klein) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 18% 30%, rgba(43,108,196,0.30) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 85% 75%, rgba(201,38,106,0.22) 0%, transparent 55%),' +
            'radial-gradient(circle at 50% 100%, rgba(232,82,126,0.12) 0%, transparent 45%)',
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 640 }}>
          {eyebrow && (
            <span className="eyebrow" style={{ color: 'rgba(245,240,232,0.6)' }}>
              {eyebrow}
            </span>
          )}

          <h2
            style={{
              margin: eyebrow ? '18px 0 28px' : '0 0 28px',
              color: 'var(--cream)',
              fontSize: 'clamp(38px, 4.5vw, 60px)',
            }}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {description && (
            <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.82, marginBottom: 40 }}>
              {description}
            </p>
          )}

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: showContactInfo ? 40 : 0, flexWrap: 'wrap' }}>
            <Link
              href={primaryHref}
              style={{
                background: 'var(--pink)',
                color: '#fff',
                padding: '16px 28px',
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                transition: 'transform 0.22s var(--ease), box-shadow 0.22s var(--ease), background 0.22s var(--ease)',
                boxShadow: '0 14px 36px rgba(201,38,106,0.40)',
                textDecoration: 'none',
              }}
            >
              {primaryLabel}
              <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            {secondaryLabel && (
              <a
                href={secondaryHref}
                style={{
                  color: 'var(--cream)',
                  padding: '16px 28px',
                  fontSize: 15,
                  fontWeight: 500,
                  border: '0.5px solid rgba(245,240,232,0.3)',
                  borderRadius: 10,
                }}
              >
                {secondaryLabel}
              </a>
            )}
          </div>

          {showContactInfo && (
            <div
              style={{
                display: 'flex',
                gap: 36,
                fontSize: 13,
                opacity: 0.7,
                paddingTop: 28,
                borderTop: '0.5px solid rgba(245,240,232,0.15)',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                contact@elevora-agency.com
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Nantes, France
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

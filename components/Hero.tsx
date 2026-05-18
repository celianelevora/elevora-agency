import Link from 'next/link';

type CTAProp = { label: string; href: string };
type StatProp = {
  value: string;
  label: string;
  accent?: 'pink' | 'klein';
  italic?: boolean;
};

interface HeroProps {
  pillText: string;
  title: string;
  lead?: string;
  primaryCTA?: CTAProp;
  secondaryCTA?: CTAProp;
  stats?: StatProp[];
}

export default function Hero({ pillText, title, lead, primaryCTA, secondaryCTA, stats }: HeroProps) {
  return (
    <section style={{ padding: '100px 0 80px' }}>
      <div className="container">
        <span className="pill">
          <span className="pill-dot"></span>
          {pillText}
        </span>

        <h1
          style={{ margin: '28px 0 28px', maxWidth: 880 }}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {lead && (
          <p className="lead" style={{ marginBottom: 44 }}>
            {lead}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: stats ? 80 : 0,
            }}
          >
            {primaryCTA && (
              <Link href={primaryCTA.href} className="cta-big">
                {primaryCTA.label}
                <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            )}
            {secondaryCTA && (
              <Link href={secondaryCTA.href} className="cta-secondary">
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        )}

        {stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              gap: 64,
              borderTop: '0.5px solid var(--line)',
              paddingTop: 28,
              maxWidth: 680,
            }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: stat.accent === 'pink' ? 'var(--pink)' : 'var(--klein)',
                    lineHeight: 1,
                    fontFamily: stat.italic ? 'var(--serif)' : 'inherit',
                    fontStyle: stat.italic ? 'italic' : 'normal',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

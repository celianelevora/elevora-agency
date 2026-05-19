import Link from 'next/link';

export const metadata = {
  title: 'Page introuvable',
};

export default function NotFound() {
  return (
    <section style={{ padding: '120px 0 100px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <div
          style={{
            fontSize: 'clamp(80px, 14vw, 160px)',
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            color: 'var(--klein)',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          404
        </div>
        <h1 style={{ marginBottom: 20, fontSize: 'clamp(32px, 4vw, 48px)' }}>
          Cette page<br />
          <span className="italic">n'existe pas.</span>
        </h1>
        <p
          style={{
            fontSize: 17,
            color: 'var(--ink-soft)',
            lineHeight: 1.6,
            marginBottom: 40,
            maxWidth: 480,
            margin: '0 auto 40px',
          }}
        >
          Désolé, la page que vous cherchez a peut-être été déplacée ou n'a jamais existé. Retrouvons votre chemin.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" className="cta-big">
            Retour à l'accueil
            <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link href="/contact" className="cta-secondary">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}

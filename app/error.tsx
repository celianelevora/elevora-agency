'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section style={{ padding: '120px 0 100px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <div
          style={{
            fontSize: 'clamp(60px, 10vw, 120px)',
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            color: 'var(--pink)',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Oups
        </div>
        <h1 style={{ marginBottom: 20, fontSize: 'clamp(28px, 3.5vw, 42px)' }}>
          Une erreur<br />
          <span className="italic">inattendue.</span>
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
          Quelque chose s'est mal passé de notre côté. Notre équipe a été automatiquement notifiée. Vous pouvez réessayer ou revenir plus tard.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button onClick={reset} className="cta-big">
            Réessayer
          </button>
          <Link href="/" className="cta-secondary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}

import { ReactNode } from 'react';

interface LegalLayoutProps {
  title: string;        // peut contenir des span.italic
  intro?: string;
  lastUpdate: string;
  version?: string;
  toc?: { id: string; label: string }[];
  children: ReactNode;
}

export default function LegalLayout({
  title,
  intro,
  lastUpdate,
  version = '1.0',
  toc,
  children,
}: LegalLayoutProps) {
  return (
    <article className="legal-page">
      {/* Hero */}
      <section className="legal-hero">
        <div className="container" style={{ maxWidth: 980 }}>
          <h1
            className="legal-h1"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {intro && <p className="legal-intro">{intro}</p>}
          <div className="legal-meta">
            <span>Dernière mise à jour : <strong>{lastUpdate}</strong></span>
            <span className="legal-meta-sep">·</span>
            <span>Version : <strong>{version}</strong></span>
          </div>
        </div>
      </section>

      {/* Layout 2 colonnes : sommaire sticky + contenu */}
      <section className="legal-body">
        <div className="container legal-grid">
          {toc && toc.length > 0 && (
            <aside className="legal-toc">
              <div className="legal-toc-inner">
                <div className="legal-toc-title">Sommaire</div>
                <ol className="legal-toc-list">
                  {toc.map((item, i) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>
                        <span className="legal-toc-num">{String(i + 1).padStart(2, '0')}</span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          )}

          <div className="legal-content">{children}</div>
        </div>
      </section>
    </article>
  );
}

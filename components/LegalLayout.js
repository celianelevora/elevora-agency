export default function LegalLayout({ pillText, title, lastUpdate, children }) {
  return (
    <>
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="pill">
            <span className="pill-dot"></span>
            {pillText}
          </span>
          <h1
            style={{ margin: '28px 0 28px' }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Dernière mise à jour : {lastUpdate}</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div
          className="container legal-content"
          style={{ maxWidth: 860 }}
        >
          {children}
        </div>
      </section>

      <style>{`
        .legal-content h2 { font-size: 22px; margin: 40px 0 16px; }
        .legal-content h3 { font-size: 17px; margin: 28px 0 12px; }
        .legal-content p, .legal-content li { font-size: 15px; line-height: 1.7; color: var(--ink-soft); margin-bottom: 12px; }
        .legal-content ul { padding-left: 20px; }
        .legal-content strong { color: var(--ink); font-weight: 500; }
        .legal-content a { color: var(--klein); }
        .cookie-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
        .cookie-table th, .cookie-table td { padding: 12px 16px; text-align: left; border: 0.5px solid var(--line); }
        .cookie-table th { background: var(--cream-warm); font-weight: 500; color: var(--ink); }
        .cookie-table td { color: var(--ink-soft); }
      `}</style>
    </>
  );
}

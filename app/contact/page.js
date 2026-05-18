import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';

export const metadata = {
  title: 'Contact | Démarrer votre projet',
  description: "Contactez Elevora pour discuter de votre projet de site web ou d'outil de gestion. Premier échange gratuit et sans engagement.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        pillText="Contact"
        title={`Parlons de<br>votre <span class="italic">projet.</span>`}
        lead="Premier échange gratuit et sans engagement. On comprend votre besoin, on évalue la faisabilité, et on revient vers vous avec un devis ferme sous 5 jours ouvrés."
      />

      <section style={{ paddingTop: 40 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'flex-start' }}>
            <ContactForm />

            <aside style={{ position: 'sticky', top: 100 }}>
              <h3 style={{ marginBottom: 28 }}>Ou directement</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
                <a href="mailto:contact@elevora-agency.com" style={{ display: 'flex', gap: 14, padding: 20, background: '#FFF', border: '0.5px solid var(--line-soft)', borderRadius: 'var(--radius-md)' }}>
                  <div className="icon-box icon-box-klein">
                    <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 4 }}>Email</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>contact@elevora-agency.com</div>
                  </div>
                </a>

                <a href="tel:+33778435721" style={{ display: 'flex', gap: 14, padding: 20, background: '#FFF', border: '0.5px solid var(--line-soft)', borderRadius: 'var(--radius-md)' }}>
                  <div className="icon-box icon-box-pink">
                    <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 4 }}>Téléphone</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>07 78 43 57 21</div>
                  </div>
                </a>

                <div style={{ display: 'flex', gap: 14, padding: 20, background: '#FFF', border: '0.5px solid var(--line-soft)', borderRadius: 'var(--radius-md)' }}>
                  <div className="icon-box icon-box-blue-light">
                    <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 4 }}>Adresse</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>Nantes, France</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 4 }}>Sur RDV uniquement</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 28, background: 'var(--klein)', color: 'var(--cream)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 12 }}>
                  Délai de réponse
                </div>
                <h4 style={{ fontSize: 22, marginBottom: 12, color: 'var(--cream)', fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>
                  Sous 48 heures.
                </h4>
                <p style={{ fontSize: 13, opacity: 0.82, lineHeight: 1.55 }}>
                  On vous répond systématiquement sous 48 heures ouvrées. Si on ne peut pas vous aider, on vous le dit, et on essaie de vous orienter vers la bonne personne.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ZONES */}
      <section style={{ background: '#FFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Où on travaille</span>
              <h2 style={{ margin: '18px 0 24px', fontSize: 'clamp(28px, 3vw, 36px)' }}>
                Nantais,<br />
                mais <span className="italic">pas que.</span>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                Notre base est à Nantes, on aime travailler en présentiel avec les entreprises des Pays de la Loire et de Bretagne. Mais 90 % du travail se fait à distance — on accompagne des clients partout en France.
              </p>
            </div>
            <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                  { label: 'Zone privilégiée', main: 'Nantes & sa région', sub: 'Rendez-vous en présentiel possibles' },
                  { label: 'Élargi', main: 'Toute la France', sub: '100 % à distance, visio quand nécessaire' },
                  { label: 'Cible', main: 'PME & indépendants', sub: 'Tous secteurs' },
                  { label: 'International', main: 'Sur demande', sub: 'FR / EN' },
                ].map((z, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>{z.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{z.main}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{z.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

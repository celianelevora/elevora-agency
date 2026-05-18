import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo-mark">E</span>
              <span style={{ color: 'var(--cream)' }}>Elevora</span>
            </Link>
            <p className="footer-tag">
              Agence digitale nantaise. Sites web et outils de gestion pour les indépendants et les PME.
            </p>
            <div className="footer-server">
              <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="8" rx="1" />
                <rect x="2" y="13" width="20" height="8" rx="1" />
                <line x1="6" y1="7" x2="6.01" y2="7" />
                <line x1="6" y1="17" x2="6.01" y2="17" />
              </svg>
              Hébergé en Suisse par Infomaniak
            </div>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            <div className="footer-links">
              <Link href="/services/sites-web">Sites web</Link>
              <Link href="/services/outils-de-gestion">Outils de gestion</Link>
              <Link href="/services/sites-web">Refonte</Link>
              <Link href="/services/sites-web">E-commerce</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Agence</div>
            <div className="footer-links">
              <Link href="/agence">À propos</Link>
              <Link href="/methode">Méthode</Link>
              <Link href="/realisations">Réalisations</Link>
              <Link href="/agence#engagements">Nos engagements</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-links">
              <a href="mailto:contact@elevora-agency.com">contact@elevora-agency.com</a>
              <a href="tel:+33778435721">07 78 43 57 21</a>
              <span>Nantes, France</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Elevora — Tous droits réservés</span>
          <div className="footer-legal">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Politique de confidentialité</Link>
            <Link href="/cgv">CGV</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

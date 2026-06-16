import Link from 'next/link';
import { Mail, Phone, MapPin, Server, Instagram, Linkedin } from 'lucide-react';

const serviceLinks = [
  { text: 'Site vitrine', href: '/services/site-vitrine' },
  { text: 'Site e-commerce', href: '/services/site-ecommerce' },
  { text: 'Landing page', href: '/services/landing-page' },
  { text: 'Application web & mobile', href: '/services/application-web-mobile' },
  { text: 'CRM & outil de gestion', href: '/services/crm-outil-de-gestion' },
];

const agenceLinks = [
  { text: 'À propos', href: '/agence' },
  { text: 'Méthode', href: '/methode' },
  { text: 'Réalisations', href: '/realisations' },
  { text: 'Tarifs', href: '/tarifs' },
  { text: 'Nos engagements', href: '/agence#engagements' },
];

const contactInfo = [
  { icon: Mail, text: 'contact@elevora-agency.com', href: 'mailto:contact@elevora-agency.com' },
  { icon: Phone, text: '07 78 43 57 21', href: 'tel:+33778435721' },
  { icon: MapPin, text: 'Nantes, France', href: '#', isAddress: true },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          {/* Colonne marque */}
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-elevora-full.png" alt="Elevora" className="site-footer-logo-img" />
            </Link>
            <p className="site-footer-desc">
              Agence digitale nantaise. Sites web qui convertissent et outils de
              gestion sur mesure pour les indépendants et les PME.
            </p>
            <div className="site-footer-server">
              <Server className="ic" size={14} />
              Hébergé en Suisse par Infomaniak
            </div>
            <div className="site-footer-socials">
              <a
                href="https://www.instagram.com/elevora_agency_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Elevora"
                className="site-footer-social"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/116063923/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Elevora"
                className="site-footer-social"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Colonnes liens */}
          <div className="site-footer-cols">
            <div className="site-footer-col">
              <p className="site-footer-col-title">Services</p>
              <ul>
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}><Link href={href}>{text}</Link></li>
                ))}
              </ul>
            </div>

            <div className="site-footer-col">
              <p className="site-footer-col-title">Agence</p>
              <ul>
                {agenceLinks.map(({ text, href }) => (
                  <li key={text}><Link href={href}>{text}</Link></li>
                ))}
              </ul>
            </div>

            <div className="site-footer-col">
              <p className="site-footer-col-title">Contact</p>
              <ul>
                {contactInfo.map(({ icon: Icon, text, href, isAddress }) => (
                  <li key={text}>
                    <a href={href} className="site-footer-contact">
                      <Icon className="ic" size={15} />
                      {isAddress ? (
                        <address>{text}</address>
                      ) : (
                        <span>{text}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 Elevora · Agence digitale à Nantes</p>
          <div className="site-footer-legal">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/cgv">CGV</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

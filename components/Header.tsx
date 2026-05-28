'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Détecte si on a scrollé (resserre le header)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`hdr ${scrolled ? 'scrolled' : ''}`}>
      <div className="bar-wrap">
        <div className={`bar ${menuOpen ? 'menu-open' : ''}`}>
          {/* Logo */}
          <Link href="/" className="hdr-logo" onClick={closeMenu} aria-label="Elevora — Accueil">
            <Image src="/logo-elevora.png" alt="Elevora" width={300} height={42} priority />
            <span className="hdr-logo-tag">Agence digitale Nantes</span>
          </Link>

          <div className="hdr-divider" aria-hidden="true" />

          {/* Nav desktop */}
          <nav className="hdr-nav" aria-label="Navigation principale">
            <div className="hdr-dropdown">
              <a
                href="#"
                className="hdr-link has-dropdown"
                onClick={(e) => e.preventDefault()}
                aria-haspopup="true"
              >
                Services
                <svg className="ic" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
              <div className="hdr-dropdown-menu hdr-dropdown-menu-wide">
                <Link href="/services/sites-web" className="hdr-dropdown-item" onClick={closeMenu}>
                  <span className="item-title">Site Vitrine</span>
                  <span className="item-sub">Présentez votre activité avec élégance</span>
                </Link>
                <Link href="/services/sites-web" className="hdr-dropdown-item" onClick={closeMenu}>
                  <span className="item-title">Site E-commerce</span>
                  <span className="item-sub">Vendez en ligne, simplement</span>
                </Link>
                <Link href="/services/sites-web" className="hdr-dropdown-item" onClick={closeMenu}>
                  <span className="item-title">Landing page</span>
                  <span className="item-sub">Une page qui convertit</span>
                </Link>
                <Link href="/services/outils-de-gestion" className="hdr-dropdown-item" onClick={closeMenu}>
                  <span className="item-title">Application</span>
                  <span className="item-sub">Web & mobile sur mesure</span>
                </Link>
                <Link href="/services/outils-de-gestion" className="hdr-dropdown-item" onClick={closeMenu}>
                  <span className="item-title">CRM & Outil de gestion</span>
                  <span className="item-sub">Pilotez votre activité</span>
                </Link>
                <Link href="/services/outils-de-gestion" className="hdr-dropdown-item" onClick={closeMenu}>
                  <span className="item-title">Maintenance</span>
                  <span className="item-sub">Votre site toujours à jour</span>
                </Link>
                <Link href="/services/sites-web" className="hdr-dropdown-item" onClick={closeMenu}>
                  <span className="item-title">SEO</span>
                  <span className="item-sub">Soyez trouvé sur Google</span>
                </Link>
              </div>
            </div>
            <Link href="/realisations" className="hdr-link" onClick={closeMenu}>Réalisations</Link>
            <Link href="/methode" className="hdr-link" onClick={closeMenu}>Méthode</Link>
            <Link href="/tarifs" className="hdr-link" onClick={closeMenu}>Tarifs</Link>
            <Link href="/agence" className="hdr-link" onClick={closeMenu}>Agence</Link>
            <Link href="/contact" className="hdr-link" onClick={closeMenu}>Contact</Link>
          </nav>

          {/* CTA droite — affiche uniquement quand le header N'EST PAS scrolled
              (evite que "Contact" soit colle au bord du header reduit). */}
          {!scrolled && (
            <Link href="/contact" className="hdr-cta" onClick={closeMenu}>
              Démarrer un projet
              <svg className="ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          )}

          {/* Toggle mobile */}
          <button
            className="hdr-menu-toggle"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      <div className={`hdr-mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <Link href="/services/sites-web" className="drawer-link" onClick={closeMenu}>Site Vitrine</Link>
        <Link href="/services/sites-web" className="drawer-link" onClick={closeMenu}>Site E-commerce</Link>
        <Link href="/services/sites-web" className="drawer-link" onClick={closeMenu}>Landing page</Link>
        <Link href="/services/outils-de-gestion" className="drawer-link" onClick={closeMenu}>Application</Link>
        <Link href="/services/outils-de-gestion" className="drawer-link" onClick={closeMenu}>CRM & Outil de gestion</Link>
        <Link href="/services/outils-de-gestion" className="drawer-link" onClick={closeMenu}>Maintenance</Link>
        <Link href="/services/sites-web" className="drawer-link" onClick={closeMenu}>SEO</Link>
        <Link href="/realisations" className="drawer-link" onClick={closeMenu}>Réalisations</Link>
        <Link href="/methode" className="drawer-link" onClick={closeMenu}>Méthode</Link>
        <Link href="/tarifs" className="drawer-link" onClick={closeMenu}>Tarifs</Link>
        <Link href="/agence" className="drawer-link" onClick={closeMenu}>Agence</Link>
        <Link href="/contact" className="drawer-link" onClick={closeMenu}>Contact</Link>
        <Link href="/contact" className="drawer-cta" onClick={closeMenu}>
          Démarrer un projet
          <svg className="ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </header>
  );
}

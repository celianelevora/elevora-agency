'use client';

import Link from 'next/link';
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

  // Détecte si on a scrollé (pour foncer le glass au scroll)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header-pill ${scrolled ? 'is-scrolled' : ''}`}>
      <div className={`pill-bar ${menuOpen ? 'menu-open' : ''}`}>
        {/* Logo */}
        <Link href="/" className="pill-logo" onClick={closeMenu} aria-label="Elevora — Accueil">
          <span className="pill-logo-mark" aria-hidden="true">
            {/* Buste stylisé minimal pour éviter dépendance image */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5 21c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M14.5 7.5c1.2-.4 2.2-.2 3 .4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="pill-logo-text">ELEVORA</span>
        </Link>

        {/* Nav desktop */}
        <nav className="pill-nav" aria-label="Navigation principale">
          <div className="pill-dropdown">
            <a
              href="#"
              className="pill-link has-dropdown"
              onClick={(e) => e.preventDefault()}
              aria-haspopup="true"
            >
              Services
              <svg className="ic" width="12" height="12" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
            <div className="pill-dropdown-menu">
              <Link href="/services/sites-web" className="pill-dropdown-item" onClick={closeMenu}>
                <span className="item-title">Sites web</span>
                <span className="item-sub">Vitrine, e-commerce, refonte</span>
              </Link>
              <Link href="/services/outils-de-gestion" className="pill-dropdown-item" onClick={closeMenu}>
                <span className="item-title">Outils de gestion</span>
                <span className="item-sub">CRM, compta, RH, sur mesure</span>
              </Link>
            </div>
          </div>
          <Link href="/realisations" className="pill-link" onClick={closeMenu}>Réalisations</Link>
          <Link href="/methode" className="pill-link" onClick={closeMenu}>Méthode</Link>
          <Link href="/tarifs" className="pill-link" onClick={closeMenu}>Tarifs</Link>
          <Link href="/agence" className="pill-link" onClick={closeMenu}>Agence</Link>
          <Link href="/contact" className="pill-link" onClick={closeMenu}>Contact</Link>
        </nav>

        {/* CTA droite */}
        <Link href="/contact" className="pill-cta" onClick={closeMenu}>
          Démarrer un projet
          <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

        {/* Toggle mobile */}
        <button
          className="pill-menu-toggle"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="ic" width="22" height="22" viewBox="0 0 24 24">
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

      {/* Drawer mobile */}
      <div className={`pill-mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <Link href="/services/sites-web" className="drawer-link" onClick={closeMenu}>Sites web</Link>
        <Link href="/services/outils-de-gestion" className="drawer-link" onClick={closeMenu}>Outils de gestion</Link>
        <Link href="/realisations" className="drawer-link" onClick={closeMenu}>Réalisations</Link>
        <Link href="/methode" className="drawer-link" onClick={closeMenu}>Méthode</Link>
        <Link href="/tarifs" className="drawer-link" onClick={closeMenu}>Tarifs</Link>
        <Link href="/agence" className="drawer-link" onClick={closeMenu}>Agence</Link>
        <Link href="/contact" className="drawer-link" onClick={closeMenu}>Contact</Link>
        <Link href="/contact" className="drawer-cta" onClick={closeMenu}>
          Démarrer un projet
          <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </header>
  );
}

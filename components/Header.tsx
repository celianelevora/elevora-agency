'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark">E</span>
          <span>Elevora</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <div className="dropdown">
            <a
              href="#"
              className="nav-link has-dropdown"
              onClick={(e) => e.preventDefault()}
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              Services
              <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
            <div className="dropdown-menu">
              <Link href="/services/sites-web" className="dropdown-item" onClick={closeMenu}>
                <span className="item-title">Sites web</span>
                <span className="item-sub">Vitrine, e-commerce, refonte</span>
              </Link>
              <Link href="/services/outils-de-gestion" className="dropdown-item" onClick={closeMenu}>
                <span className="item-title">Outils de gestion</span>
                <span className="item-sub">CRM, compta, RH, sur mesure</span>
              </Link>
            </div>
          </div>
          <Link href="/realisations" className="nav-link" onClick={closeMenu}>Réalisations</Link>
          <Link href="/methode" className="nav-link" onClick={closeMenu}>Méthode</Link>
          <Link href="/tarifs" className="nav-link" onClick={closeMenu}>Tarifs</Link>
          <Link href="/agence" className="nav-link" onClick={closeMenu}>Agence</Link>
          <Link href="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
          <Link href="/contact" className="cta" onClick={closeMenu}>
            Démarrer un projet
            <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </nav>

        <button
          className="menu-toggle"
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
    </header>
  );
}

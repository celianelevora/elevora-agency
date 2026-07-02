'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Détecte si on a scrollé (resserre le header)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile ouvert : bloque le scroll du body (évite le défilement de la page
  // sous l'overlay) et ferme le menu à la touche Échap (accessibilité clavier).
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const closeServices = () => {
    setServicesOpen(false);
    setMenuOpen(false);
    // Retire le focus du lien cliqué : évite que le menu reste affiché
    // (un lien focalisé dans le dropdown le maintenait ouvert).
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <header className={`hdr ${scrolled ? 'scrolled' : ''}`}>
      <div className="bar-wrap">
        <div className={`bar ${menuOpen ? 'menu-open' : ''}`}>
          {/* Logo */}
          <Link href="/" className="hdr-logo" onClick={closeMenu} aria-label="Elevora — Accueil">
            <Image src="/logo-elevora.png" alt="Logo Elevora, agence digitale à Nantes" width={300} height={42} priority />
            <span className="hdr-logo-tag">Agence digitale Nantes</span>
          </Link>

          <div className="hdr-divider" aria-hidden="true" />

          {/* Nav desktop */}
          <nav className="hdr-nav" aria-label="Navigation principale">
            <div
              className="hdr-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <a
                href="#"
                className={`hdr-link has-dropdown${pathname.startsWith('/services') ? ' is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setServicesOpen((o) => !o);
                }}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <svg className="ic" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
              <div className={`hdr-dropdown-menu hdr-dropdown-menu-wide ${servicesOpen ? 'open' : ''}`}>
                <Link href="/services/site-vitrine" className={`hdr-dropdown-item${pathname === '/services/site-vitrine' ? ' is-active' : ''}`} onClick={closeServices}>
                  <span className="item-title">Site Vitrine</span>
                  <span className="item-sub">Présentez votre activité avec élégance</span>
                </Link>
                <Link href="/services/site-ecommerce" className={`hdr-dropdown-item${pathname === '/services/site-ecommerce' ? ' is-active' : ''}`} onClick={closeServices}>
                  <span className="item-title">Site E-commerce</span>
                  <span className="item-sub">Vendez en ligne, simplement</span>
                </Link>
                <Link href="/services/landing-page" className={`hdr-dropdown-item${pathname === '/services/landing-page' ? ' is-active' : ''}`} onClick={closeServices}>
                  <span className="item-title">Landing page</span>
                  <span className="item-sub">Une page qui convertit</span>
                </Link>
                <Link href="/services/application-web-mobile" className={`hdr-dropdown-item${pathname === '/services/application-web-mobile' ? ' is-active' : ''}`} onClick={closeServices}>
                  <span className="item-title">Application</span>
                  <span className="item-sub">Web & mobile sur mesure</span>
                </Link>
                <Link href="/services/crm-outil-de-gestion" className={`hdr-dropdown-item${pathname === '/services/crm-outil-de-gestion' ? ' is-active' : ''}`} onClick={closeServices}>
                  <span className="item-title">CRM & Outil de gestion</span>
                  <span className="item-sub">Pilotez votre activité</span>
                </Link>
              </div>
            </div>
            <Link href="/realisations" className={`hdr-link${pathname === '/realisations' ? ' is-active' : ''}`} onClick={closeMenu}>Réalisations</Link>
            <Link href="/methode" className={`hdr-link${pathname === '/methode' ? ' is-active' : ''}`} onClick={closeMenu}>Méthode</Link>
            <Link href="/tarifs" className={`hdr-link${pathname === '/tarifs' ? ' is-active' : ''}`} onClick={closeMenu}>Tarifs</Link>
            <Link href="/agence" className={`hdr-link${pathname === '/agence' ? ' is-active' : ''}`} onClick={closeMenu}>Agence</Link>
            <Link href="/contact" className={`hdr-link${pathname === '/contact' ? ' is-active' : ''}`} onClick={closeMenu}>Contact</Link>
          </nav>

          {/* CTA droite — toujours dans le DOM, masque proprement en CSS au scroll
              (transition fluide synchronisee avec le reste du header). */}
          <Link href="/demarrer-un-projet" className="hdr-cta" onClick={closeMenu}>
            Démarrer un projet
            <svg className="ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

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
        {/* Groupe SERVICES — libellé de catégorie pour qu'on comprenne que les
            5 liens suivants sont les pages de services (et non de la nav à plat). */}
        <span className="drawer-group-label" aria-hidden="true">Services</span>
        <div className="drawer-group" role="group" aria-label="Services">
          <Link href="/services/site-vitrine" className="drawer-link drawer-link-sub" onClick={closeMenu}>Site Vitrine</Link>
          <Link href="/services/site-ecommerce" className="drawer-link drawer-link-sub" onClick={closeMenu}>Site E-commerce</Link>
          <Link href="/services/landing-page" className="drawer-link drawer-link-sub" onClick={closeMenu}>Landing page</Link>
          <Link href="/services/application-web-mobile" className="drawer-link drawer-link-sub" onClick={closeMenu}>Application</Link>
          <Link href="/services/crm-outil-de-gestion" className="drawer-link drawer-link-sub" onClick={closeMenu}>CRM & Outil de gestion</Link>
        </div>

        {/* Séparateur entre le groupe Services et la navigation principale. */}
        <span className="drawer-divider" aria-hidden="true" />

        <Link href="/realisations" className="drawer-link" onClick={closeMenu}>Réalisations</Link>
        <Link href="/methode" className="drawer-link" onClick={closeMenu}>Méthode</Link>
        <Link href="/tarifs" className="drawer-link" onClick={closeMenu}>Tarifs</Link>
        <Link href="/agence" className="drawer-link" onClick={closeMenu}>Agence</Link>
        <Link href="/contact" className="drawer-link" onClick={closeMenu}>Contact</Link>
        <Link href="/demarrer-un-projet" className="drawer-cta" onClick={closeMenu}>
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

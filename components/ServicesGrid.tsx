"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver pour declencher l'animation d'apparition des cards
  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) s.classList.add('in-view');
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(s);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="services-section">
      <div className="container services-container">
        <span className="eyebrow">01 — Ce qu'on fait</span>
        <h2 className="services-title">
          Deux métiers,<br />
          une <span className="italic">même</span> obsession.
        </h2>

        <div className="services-grid">
          {/* Sites web — carte claire */}
          <Link href="/services/site-vitrine" className="service-card service-card-light">
            <div className="service-card-head">
              <div className="icon-box icon-box-klein">
                <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="service-card-num">SERVICE 1</span>
            </div>
            <h3 className="service-card-title">Sites web qui convertissent</h3>
            <p className="service-card-desc">
              Vitrine, e-commerce, refonte. Des sites pensés pour vos clients et vos résultats, pas pour le portfolio de l'agence.
            </p>
            <div className="service-card-tags">
              <span className="tag">Site vitrine</span>
              <span className="tag">E-commerce</span>
              <span className="tag">Refonte complète</span>
              <span className="tag">Landing page</span>
            </div>
            <div className="service-card-foot">
              <span className="service-card-price">À partir de 750 € TTC</span>
              <span className="service-card-cta">
                Découvrir
                <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Outils de gestion — carte bleue */}
          <Link href="/services/crm-outil-de-gestion" className="service-card service-card-dark">
            <div className="service-card-head">
              <div className="icon-box icon-box-pink-light">
                <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <span className="service-card-num service-card-num-dark">SERVICE 2</span>
            </div>
            <h3 className="service-card-title">Outils de gestion sur mesure</h3>
            <p className="service-card-desc">
              CRM, gestion clients, facturation, RH, opérations. On développe l'outil dont votre entreprise a besoin — pas une usine à gaz qu'il faut adapter.
            </p>
            <div className="service-card-tags">
              <span className="tag tag-light">CRM</span>
              <span className="tag tag-light">Compta &amp; facturation</span>
              <span className="tag tag-light">Gestion RH</span>
              <span className="tag tag-light">Extranet client</span>
              <span className="tag tag-light">Outil métier</span>
            </div>
            <div className="service-card-foot service-card-foot-dark">
              <span className="service-card-price">Devis sur mesure</span>
              <span className="service-card-cta service-card-cta-dark">
                Découvrir
                <svg className="ic" width="14" height="14" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

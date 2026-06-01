'use client';

import { useEffect, useRef } from 'react';

const ITEMS = [
  {
    title: 'Mise en ligne ferme',
    desc: "Date de livraison annoncée au devis. Si on dépasse de notre fait, vous bénéficiez de 10% de remise sur le solde final. C'est écrit dans le contrat.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    ),
  },
  {
    title: 'Formation incluse',
    desc: "À la livraison, on prend 1h30 avec vous pour vous montrer comment gérer le site/l'outil au quotidien. Captation vidéo offerte pour les nouveaux arrivants.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
    ),
  },
  {
    title: 'Suivi 30 jours offert',
    desc: "Pendant le mois qui suit la livraison, toutes les corrections, ajustements et petites évolutions sont prises en charge sans facturation supplémentaire.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
  },
  {
    title: 'Maintenance technique',
    desc: "Mises à jour de sécurité, sauvegardes quotidiennes, monitoring de disponibilité. Inclus pendant 12 mois, renouvelable sur demande à tarif transparent.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s-8-4-8-12V4l8-3 8 3v6c0 8-8 12-8 12z"/><polyline points="9 11 12 14 16 9"/></svg>
    ),
  },
  {
    title: 'Code & accès vous appartiennent',
    desc: "Hébergement sur votre propre compte Infomaniak, dépôt GitHub à votre nom, identifiants à votre nom. Si demain vous ne voulez plus de nous, tout reste chez vous.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
  },
  {
    title: 'Délai de réponse 48h',
    desc: "Une question, un souci, une demande d'évolution ? Vous recevez une réponse sous 48h ouvrées maximum. Du fondateur, pas d'un bot.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
  },
];

export default function Guarantees() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) el.classList.add('in-view'); });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="guarantees-section">
      <div className="container">
        <div className="guarantees-head">
          <span className="eyebrow">Nos engagements signés</span>
          <h2 className="guarantees-title">
            Et après la livraison, <span className="italic">on reste là</span>.
          </h2>
          <p className="guarantees-lead">
            Une grosse partie du métier d'agence se joue après la mise en ligne.
            Voici exactement ce sur quoi on s'engage, noir sur blanc, dans
            chaque contrat Elevora.
          </p>
        </div>

        <div className="guarantees-grid">
          {ITEMS.map((it, i) => (
            <div className="guarantees-card" key={i} style={{ ['--stagger-i' as any]: i }}>
              <div className="guarantees-icon">{it.icon}</div>
              <h3 className="guarantees-card-title">{it.title}</h3>
              <p className="guarantees-card-desc">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

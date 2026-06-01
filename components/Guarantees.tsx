'use client';

import { useEffect, useRef } from 'react';

const ITEMS = [
  {
    badge: 'À la signature',
    title: 'Mise en ligne ferme',
    desc: "Date de livraison annoncée au devis. Si on dépasse de notre fait, vous bénéficiez de 10% de remise sur le solde final. C'est écrit dans le contrat.",
  },
  {
    badge: 'À la livraison',
    title: 'Formation incluse',
    desc: "1h30 pour vous montrer comment gérer le site ou l'outil au quotidien. Captation vidéo offerte pour les nouveaux arrivants.",
  },
  {
    badge: 'J+1 à J+30',
    title: 'Suivi 30 jours offert',
    desc: "Pendant le mois qui suit la livraison, toutes les corrections, ajustements et petites évolutions sont prises en charge sans facturation supplémentaire.",
  },
  {
    badge: '12 mois',
    title: 'Maintenance technique',
    desc: "Mises à jour de sécurité, sauvegardes quotidiennes, monitoring de disponibilité. Inclus pendant 12 mois, renouvelable à tarif transparent.",
  },
  {
    badge: 'Pour toujours',
    title: 'Code & accès au client',
    desc: "Hébergement sur votre compte Infomaniak, dépôt GitHub à votre nom, identifiants à votre nom. Si demain vous ne voulez plus de nous, tout reste chez vous.",
  },
  {
    badge: 'En continu',
    title: 'Délai de réponse 48h',
    desc: "Une question, un souci, une demande d'évolution ? Vous recevez une réponse sous 48h ouvrées maximum. Du fondateur — pas d'un bot.",
  },
];

export default function Guarantees() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Parallax horizontal au scroll avec easing en cloche :
  // - rapide en debut/fin (acceleration et sortie)
  // - lent au milieu (les cartes se posent au centre)
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    // Easing en cloche : rapide-lent-rapide.
    // Sigmoide modifiee : f(t) avec acceleration en debut/fin, plateau au milieu.
    function bellEase(t: number) {
      // t entre 0 et 1
      // pieces : 0-0.3 = rapide, 0.3-0.7 = lent, 0.7-1 = rapide
      if (t < 0.3) {
        // rampe rapide sur 0..0.3 -> mappee a 0..0.4
        const u = t / 0.3;
        return u * 0.4;
      } else if (t < 0.7) {
        // milieu lent : 0.3..0.7 -> 0.4..0.6
        const u = (t - 0.3) / 0.4;
        return 0.4 + u * 0.2;
      } else {
        // sortie rapide : 0.7..1 -> 0.6..1
        const u = (t - 0.7) / 0.3;
        return 0.6 + u * 0.4;
      }
    }

    let raf: number | null = null;
    function tick() {
      raf = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progression dans la section, 0 = section arrive en bas du viewport,
      // 1 = section sort par le haut.
      const total = rect.height - vh;
      const seen = clamp(-rect.top, 0, total);
      const rawT = total > 0 ? seen / total : 0;
      const eased = bellEase(rawT);

      // Distance horizontale a parcourir = largeur du track - largeur viewport
      const maxX = track.scrollWidth - window.innerWidth;
      const x = -eased * Math.max(maxX, 0);
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    }
    function onScroll() {
      if (raf === null) raf = requestAnimationFrame(tick);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="guarantees-section">
      {/* Bloc d'intro classique en haut, qui reste fixe */}
      <div className="guarantees-intro">
        <div className="container">
          <span className="eyebrow">08 — Nos engagements signés</span>
          <h2 className="guarantees-title">
            Et après la livraison, <span className="italic">on reste là</span>.
          </h2>
          <p className="guarantees-lead">
            Une grosse partie du métier d'agence se joue après la mise en
            ligne. Voici ce sur quoi on s'engage, noir sur blanc, dans chaque
            contrat Elevora.
          </p>
        </div>
      </div>

      {/* Zone parallax : la section devient haute, les cartes glissent en sticky */}
      <div className="guarantees-stage">
        <div className="guarantees-viewport">
          <div className="guarantees-track" ref={trackRef}>
            {ITEMS.map((it, i) => (
              <article key={i} className="guarantees-slide">
                <div className="guarantees-slide-num">
                  {String(i + 1).padStart(2, '0')}<span>/{ITEMS.length}</span>
                </div>
                <div className="guarantees-slide-badge">{it.badge}</div>
                <h3 className="guarantees-slide-title">{it.title}</h3>
                <p className="guarantees-slide-desc">{it.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

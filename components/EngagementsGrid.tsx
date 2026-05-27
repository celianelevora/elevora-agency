"use client";

import { useEffect, useRef } from "react";

const ENGAGEMENTS = [
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="8" rx="1" />
        <rect x="2" y="13" width="20" height="8" rx="1" />
        <line x1="6" y1="7" x2="6.01" y2="7" />
        <line x1="6" y1="17" x2="6.01" y2="17" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Hébergement Infomaniak',
    desc: "Serveurs suisses, énergie verte, RGPD natif. Vos données ne quittent pas l'Europe.",
  },
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
    iconClass: 'icon-box-blue',
    title: 'Le code vous appartient',
    desc: 'Pas de location, pas de dépendance. Vous repartez avec votre site, vos accès, votre liberté.',
  },
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Aucune sous-traitance offshore',
    desc: 'Tout est fait à Nantes, par nous. Vous parlez aux gens qui codent votre projet.',
  },
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    iconClass: 'icon-box-blue',
    title: 'Devis ferme, zéro surprise',
    desc: "Le prix qu'on annonce est le prix que vous payez. Pas de ligne cachée, pas de surcoût en cours de route.",
  },
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    iconClass: 'icon-box-pink',
    title: 'Stack moderne & maintenue',
    desc: 'Next.js, TypeScript, Tailwind. Pas de bricolage WordPress, pas de plugin obscur.',
  },
  {
    icon: (
      <svg className="ic" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    iconClass: 'icon-box-blue',
    title: 'Suivi 30 jours inclus',
    desc: "Apres mise en ligne, on reste joignables : bugs, ajustements, formation. Vous n'etes pas largue.",
  },
];

interface EngagementsGridProps {
  eyebrow?: string;
  title?: React.ReactNode;
}

export default function EngagementsGrid({ eyebrow = '03 — Pourquoi Elevora', title }: EngagementsGridProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Boucle video personnalisee (RECAP-PROJET.md) :
  // joue 5.5s, fige sur la derniere image 5s, relance.
  // IntersectionObserver : ne tourne que quand la section est visible.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const PLAY_MS = 5500;
    const PAUSE_MS = 5000;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let isVisible = false;

    const playCycle = () => {
      if (!isVisible) return;
      v.currentTime = 0;
      v.play().catch(() => {});
      timer = setTimeout(() => {
        v.pause();
        timer = setTimeout(playCycle, PAUSE_MS);
      }, PLAY_MS);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
          if (isVisible && !timer) {
            playCycle();
          } else if (!isVisible && timer) {
            clearTimeout(timer);
            timer = null;
            v.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(v);

    return () => {
      obs.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section id="engagements" className="eng-section">
      <div className="eng-stage">
        {/* Video brumeuse en fond de la section (boucle 5.5s + pause 5s) */}
        <video
          ref={videoRef}
          className="eng-video"
          muted
          playsInline
          preload="auto"
          poster="/eng-fond.png"
        >
          <source src="/eng-video.mp4" type="video/mp4" />
        </video>
        {/* Fondus de raccord haut/bas vers #EAE9EE */}
        <div className="eng-fade eng-fade-top" aria-hidden="true" />
        <div className="eng-fade eng-fade-bottom" aria-hidden="true" />

        <div className="eng-head">
          <span className="eng-eyebrow">{eyebrow}</span>
          <h2 className="eng-title">
            {title || (
              <>
                Une jeune agence,<br />
                des engagements <span className="italic">fermes.</span>
              </>
            )}
          </h2>
        </div>

        <div className="eng-cards">
          {ENGAGEMENTS.map((e, i) => (
            <div key={i} className="eng-card">
              <div className={`icon-box ${e.iconClass}`}>{e.icon}</div>
              <h4 className="eng-card-title">{e.title}</h4>
              <p className="eng-card-desc">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';

const STEPS = [
  {
    num: '01',
    label: 'Cadrage',
    title: 'On comprend votre activité',
    desc: "Atelier de découverte, objectifs business, contraintes techniques. On part de votre métier, pas d'un template.",
    duration: '~ 1 semaine',
  },
  {
    num: '02',
    label: 'Design',
    title: 'On dessine, vous validez',
    desc: 'Maquettes interactives, allers-retours, validation page par page avant la moindre ligne de code.',
    duration: '~ 2 semaines',
  },
  {
    num: '03',
    label: 'Développement',
    title: 'On construit, vous suivez',
    desc: "Code propre, performances optimisées, environnement de test partagé pour suivre l'avancement en direct.",
    duration: '~ 3-6 semaines',
  },
  {
    num: '04',
    label: 'Livraison',
    title: 'On livre, on reste là',
    desc: 'Mise en ligne, formation à la gestion, suivi sur 30 jours inclus. Vous repartez totalement autonome.',
    duration: '+ suivi 30j',
  },
];

export default function MethodSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lit, setLit] = useState<boolean[]>(new Array(STEPS.length).fill(false));

  // Ignition des étapes au scroll
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.method2-step');
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setLit((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.45, rootMargin: '0px 0px -12% 0px' }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Glow lumineux confiné À L'INTÉRIEUR de chaque carte (suit la souris)
  const handleCardMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--cx', `${e.clientX - r.left}px`);
    card.style.setProperty('--cy', `${e.clientY - r.top}px`);
  };

  // Spotlight cosmique de la SECTION qui suit la souris (calque .method2-spot)
  const handleSectionMove = (e: MouseEvent<HTMLElement>) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    sec.style.setProperty('--mx', `${e.clientX - r.left}px`);
    sec.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const progress = (lit.filter(Boolean).length / STEPS.length) * 100;

  return (
    <section ref={sectionRef} className="method2" onMouseMove={handleSectionMove}>
      {/* Fond cosmique : champ d'étoiles + nébuleuses (via .method2-aura::before/::after),
          halos Klein/framboise, grille blueprint, + spotlight souris.
          (Ces calques étaient stylés en CSS mais jamais rendus -> fond terne.) */}
      <div className="method2-aura" aria-hidden="true">
        <span className="method2-halo method2-halo-klein" />
        <span className="method2-halo method2-halo-razz" />
        <span className="method2-grid" />
      </div>
      <span className="method2-spot" aria-hidden="true" />

      <div className="container method2-inner">
        <div className="method2-head">
          <span className="method2-eyebrow">07 — Notre méthode</span>
          <h2 className="method2-title">
            De l'idée à la mise en ligne,<br />
            un chemin <span className="italic">clair et balisé.</span>
          </h2>
          <p className="method2-intro">
            Pas de zone d'ombre, pas de jargon. Chaque étape est cadrée, validée
            avec vous, et vous savez en permanence où en est votre projet.
          </p>
        </div>

        <div className="method2-time">
          <div className="method2-rail" aria-hidden="true">
            <span className="method2-rail-fill" style={{ height: `${progress}%` }}>
              <span className="method2-rail-head" />
            </span>
          </div>

          {STEPS.map((step, i) => (
            <article
              key={i}
              className={`method2-step ${lit[i] ? 'lit' : ''}`}
              data-idx={i}
            >
              <div className="method2-node" aria-hidden="true">
                <span className="method2-node-core" />
                <span className="method2-node-ring" />
              </div>

              <div className="method2-card" onMouseMove={handleCardMove}>
                <span className="method2-card-glow" aria-hidden="true" />
                <span className="method2-ghost" aria-hidden="true">{step.num}</span>
                <div className="method2-card-top">
                  <span className="method2-label">{step.label}</span>
                  <span className="method2-duration">{step.duration}</span>
                </div>
                <h3 className="method2-card-title">{step.title}</h3>
                <p className="method2-card-desc">{step.desc}</p>
                <span className="method2-sweep" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

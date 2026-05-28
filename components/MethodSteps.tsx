'use client';

import { useEffect, useRef, useState } from 'react';

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
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(
    new Array(STEPS.length).fill(false)
  );

  // Révélation des cartes au scroll
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.method-card');
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -60px 0px' }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Parallax « barriere qui pivote » au scroll (statues conservees)
  useEffect(() => {
    const section = sectionRef.current;
    const sLeft = leftRef.current;
    const sRight = rightRef.current;
    if (!section || !sLeft || !sRight) return;

    const LEFT_FROM = 4,
      LEFT_TO = -16;
    const RIGHT_FROM = -19,
      RIGHT_TO = 2;
    const clamp = (v: number, a: number, b: number) =>
      Math.max(a, Math.min(b, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let targetP = 0,
      currentP = 0,
      raf: number | null = null;

    const computeProgress = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const seen = clamp(vh - r.top, 0, total);
      return clamp(seen / total, 0, 1);
    };

    const tick = () => {
      currentP += (targetP - currentP) * 0.05;
      const aL = lerp(LEFT_FROM, LEFT_TO, currentP);
      const aR = lerp(RIGHT_FROM, RIGHT_TO, currentP);
      sLeft.style.transform = `rotate(${aL}deg)`;
      sRight.style.transform = `rotate(${aR}deg)`;
      if (Math.abs(targetP - currentP) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const onScroll = () => {
      targetP = computeProgress();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // NOTE: l'effet constellation (canvas reseau de points) a ete RETIRE
  // sur demande utilisateur. Les statues parallax sont conservees.

  return (
    <section
      ref={sectionRef}
      className="method-section"
      style={{ background: 'transparent' }}
    >
      {/* decor : image de fond + statues parallax (constellation retiree) */}
      <div className="method-scene" aria-hidden="true">
        <div className="method-scene-clip">
          <div className="method-bg" />
          {/* Fondus de raccord (le cover rogne les bords fondus de l'image) */}
          <div className="method-fade method-fade-top" />
          <div className="method-fade method-fade-bottom" />
          <div className="method-glow method-glow-tl" />
          <div className="method-glow method-glow-br" />
          <div ref={leftRef} className="statue statue-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/method-statue-left.png" alt="" />
          </div>
        </div>
        <div ref={rightRef} className="statue statue-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/method-statue-right.png" alt="" />
        </div>
      </div>

      <div className="container">
        <div className="method-head">
          <span className="eyebrow">05 — Notre méthode</span>
          <h2 className="method-title">
            De l'idée à la mise en ligne,<br />
            un chemin <span className="italic">clair et balisé.</span>
          </h2>
          <p className="method-intro">
            Pas de zone d'ombre, pas de jargon. Chaque étape est cadrée, validée
            avec vous, et vous savez en permanence où en est votre projet.
          </p>
        </div>

        <div className="method-flow">
          <div className="method-line" aria-hidden="true">
            <div
              className="method-line-fill"
              style={{
                height: `${
                  (visible.filter(Boolean).length / STEPS.length) * 100
                }%`,
              }}
            />
          </div>

          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`method-card ${visible[i] ? 'in' : ''}`}
              data-idx={i}
              style={{ transitionDelay: `${(i % 2) * 0.08}s` }}
            >
              <div className="method-card-num">{step.num}</div>
              <div className="method-card-body">
                <span className="method-card-label">{step.label}</span>
                <h3 className="method-card-title">{step.title}</h3>
                <p className="method-card-desc">{step.desc}</p>
                <span className="method-card-duration">{step.duration}</span>
              </div>
              <div className="method-card-dot" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { StaggerText } from '@/components/ui/stagger-text';
import { BlurFade } from '@/components/ui/blur-fade';

const POINTS = [
  {
    eyebrow: 'Visibilité',
    title: "Vos clients vous cherchent en ligne. Et trouvent vos concurrents.",
    body: "Aujourd'hui, 88% des gens regardent un site web avant de pousser la porte d'un commerce ou de passer un appel. Si vous n'apparaissez pas, ou si votre site donne mauvaise impression, vous perdez ces clients sans même le savoir.",
  },
  {
    eyebrow: 'Image',
    title: "Un site web fatigué, c'est une entreprise qu'on imagine fatiguée.",
    body: "Votre savoir-faire mérite mieux qu'un site générique fait à la va-vite ou bricolé en interne il y a 5 ans. La qualité perçue de votre activité passe d'abord par votre vitrine numérique — surtout pour un premier contact.",
  },
  {
    eyebrow: 'Outils',
    title: "Et si votre quotidien était plus simple ?",
    body: "Devis, factures, rendez-vous, suivi client, stock, équipe… On vous a vendu dix outils différents qui ne se parlent pas. Le résultat : du temps perdu, des oublis, et l'impression de travailler pour ses logiciels. Ça peut s'arrêter.",
  },
];

export default function WhyNow() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) el.classList.add('in-view'); });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="whynow-section">
      <div className="lux-bg" aria-hidden="true" />
      <div className="container">
        <div className="whynow-head">
          <span className="eyebrow">02 — Le constat</span>
          <h2 className="whynow-title">
            <StaggerText text="Pourquoi un site, " />
            <span className="italic"><StaggerText text="pourquoi maintenant" /></span>
            <StaggerText text=" ?" />
          </h2>
          <BlurFade inView delay={0.1}>
            <p className="whynow-lead">
              On ne va pas vous mentir : refondre son site ou changer ses outils,
              ce n'est jamais le bon moment. Sauf que pendant qu'on attend, le
              monde, lui, n'attend pas.
            </p>
          </BlurFade>
        </div>

        <div className="whynow-grid">
          {POINTS.map((p, i) => (
            <div className="whynow-card" key={i} style={{ ['--stagger-i' as any]: i }}>
              <span className="whynow-num">0{i + 1}</span>
              <span className="whynow-eyebrow">{p.eyebrow}</span>
              <h3 className="whynow-card-title">{p.title}</h3>
              <p className="whynow-card-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';

export default function ForWho() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) el.classList.add('in-view'); });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="forwho-section">
      <div className="container forwho-container">
        <span className="eyebrow">02 — Pour qui</span>

        <blockquote className="forwho-quote">
          <span className="forwho-mark">«</span>
          <p>
            On travaille avec les <em>artisans</em>, les <em>commerçants</em>,
            les <em>PME</em>, les <em>professions libérales</em> et les
            <em> indépendants</em> qui ont un vrai métier — et qui veulent
            arrêter de bricoler leur site comme leur compta.
          </p>
          <p className="forwho-quote-second">
            Que vous ayez besoin d'un <strong>site web</strong> qui ramène du
            monde, d'un <strong>outil de gestion</strong> qui simplifie votre
            quotidien — ou des deux à la fois — c'est exactement ce qu'on fait.
          </p>
          <span className="forwho-mark forwho-mark-end">»</span>
        </blockquote>

        <div className="forwho-line" aria-hidden="true" />

        <p className="forwho-foot">
          On préfère le dire tout de suite : <strong>on n'est pas pour tout
          le monde.</strong> Si vous cherchez le moins cher du marché ou un
          site livré en 3 jours, on ne sera pas le bon partenaire. Mais si
          vous voulez quelqu'un qui prend le temps de comprendre votre
          activité avant de coder quoi que ce soit, on devrait bien
          s'entendre.
        </p>
      </div>
    </section>
  );
}

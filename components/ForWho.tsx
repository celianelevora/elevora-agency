'use client';

import { useEffect, useRef } from 'react';

const PROFILES = [
  {
    icon: '🔧',
    title: 'Artisans & commerçants',
    desc: "Boulanger, plombier, fleuriste, restaurateur, garagiste… Vous voulez un site qui vous ressemble, qui amène du monde, et qu'on peut mettre à jour sans appeler un développeur à chaque fois.",
  },
  {
    icon: '💼',
    title: 'PME & TPE',
    desc: "Vous avez entre 2 et 50 collaborateurs, un site qui date ou qui n'existe pas encore, et besoin d'outils internes pour structurer ce qui se fait aujourd'hui sur Excel ou dans la tête de la patronne.",
  },
  {
    icon: '⚖️',
    title: 'Professions libérales',
    desc: "Avocat, médecin, kiné, architecte, consultant… Vous voulez un site crédible qui inspire confiance dès la première seconde, et pourquoi pas un outil pour gérer vos rendez-vous et vos clients.",
  },
  {
    icon: '🚀',
    title: 'Indépendants & jeunes structures',
    desc: "Vous lancez votre activité ou la faites grandir. Un site soigné, un outil de gestion qui s'adapte à vous (et pas l'inverse) — sans payer le tarif d'une grosse agence parisienne.",
  },
];

const NOT_FOR = [
  "Vous cherchez le moins cher et un site livré en 3 jours",
  "Vous voulez un site uniquement pour faire \"comme tout le monde\"",
  "Vous n'êtes pas prêt à passer 2-3 heures pour qu'on apprenne votre métier",
];

export default function ForWho() {
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
    <section ref={ref} className="forwho-section">
      <div className="container">
        <div className="forwho-head">
          <span className="eyebrow">02 — Pour qui</span>
          <h2 className="forwho-title">
            On travaille pour <span className="italic">les vraies entreprises</span>.<br />
            Celles qui ont un métier, pas une promesse.
          </h2>
          <p className="forwho-lead">
            Que vous ayez besoin d'un <strong>site web</strong> qui amène du
            monde, d'un <strong>outil de gestion</strong> qui simplifie votre
            quotidien — ou des deux — voici les profils avec qui on bosse le mieux.
          </p>
        </div>

        <div className="forwho-grid">
          {PROFILES.map((p, i) => (
            <div className="forwho-card" key={i} style={{ ['--stagger-i' as any]: i }}>
              <div className="forwho-icon" aria-hidden="true">{p.icon}</div>
              <h3 className="forwho-card-title">{p.title}</h3>
              <p className="forwho-card-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="forwho-notfor">
          <h4 className="forwho-notfor-title">En revanche, on n'est probablement pas pour vous si&nbsp;:</h4>
          <ul className="forwho-notfor-list">
            {NOT_FOR.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <p className="forwho-notfor-foot">
            On préfère le dire dès maintenant : un projet bien fait demande un
            minimum d'investissement de votre côté, et notre travail n'a de
            valeur que si vous êtes embarqué avec nous.
          </p>
        </div>
      </div>
    </section>
  );
}

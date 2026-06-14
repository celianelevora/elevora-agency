import CinematicHero from '@/components/CinematicHero';
import WhyNow from '@/components/WhyNow';
import ForWho from '@/components/ForWho';
import EngagementsGrid from '@/components/EngagementsGrid';
import Manifesto from '@/components/Manifesto';
import ProjectShowcase from '@/components/ProjectShowcase';
import MethodSteps from '@/components/MethodSteps';
import TestimonialsSection from '@/components/TestimonialsSection';
import { FaqsSection } from '@/components/FaqsSection';
import { CinematicFooter } from '@/components/CinematicFooter';
import RomanRail from '@/components/RomanRail';

export const metadata = {
  title: 'Elevora — Agence digitale à Nantes | Sites web & outils de gestion',
  description:
    'Elevora, agence digitale nantaise. Sites web qui convertissent et outils de gestion sur mesure pour indépendants et PME. Devis ferme, hébergement Infomaniak.',
};

export default function HomePage() {
  return (
    <div className="home-with-cinematic-footer">
      {/* Habillage de fond continu (halos + grille), derrière TOUT le contenu
          (z-index:-1). La cinématique d'ouverture, opaque, le recouvre ; les
          parties 01+ (transparentes) le laissent transparaître. */}
      <div className="landing-dressing" aria-hidden="true">
        <span className="landing-dressing-grid" />
      </div>

      {/* Ouverture cinématique (réécrite de zéro) : hero Hero.mp4 en boucle +
          scrub Image_1_à_2 piloté au scroll + promesse figée sur la dernière
          frame. Tout est dans CinematicHero (section + scène sticky). */}
      <CinematicHero />

      {/* Parties 1+2 — fond gris commun (Le constat + Pour qui) */}
      <div className="lp-group lp-group-intro">
        {/* 01 — Le constat */}
        <div id="constat" data-roman-section data-roman="II"><WhyNow /></div>
        {/* 02 — Pour qui */}
        <div id="pour-qui" data-roman-section data-roman="III"><ForWho /></div>
      </div>

      {/* 03 — Pourquoi Elevora (engagements) — vidéo brumeuse, transitions fondues */}
      <div id="pourquoi" data-roman-section data-roman="IV" className="lp-group-engage"><EngagementsGrid /></div>

      {/* Parties 4+5 — fond commun (Manifeste + Réalisations) */}
      <div className="lp-group lp-group-work">
        {/* Manifeste */}
        <div id="manifeste" data-roman-section data-roman="V"><Manifesto /></div>
        {/* 04 — Réalisations */}
        <div id="realisations" data-roman-section data-roman="VI" className="sec-warm"><ProjectShowcase /></div>
      </div>

      {/* 05 — Méthode (sombre) */}
      <div id="methode" data-roman-section data-roman="VII" data-roman-tone="dark" className="sec-night"><MethodSteps /></div>

      {/* 06 — Témoignages */}
      <div id="temoignages" data-roman-section data-roman="VIII" className="sec-warm"><TestimonialsSection /></div>

      {/* FAQ */}
      <div id="faq" data-roman-section data-roman="IX" className="sec-white"><FaqsSection /></div>

      {/* Fil de chiffres romains — couvre intro + toutes les parties */}
      <RomanRail />

      <CinematicFooter />
    </div>
  );
}

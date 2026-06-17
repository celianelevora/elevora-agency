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

      {/* Parties 2+3 — fond gris commun (Le constat + Pour qui) */}
      <div className="lp-group lp-group-intro">
        {/* 02 — Le constat */}
        <div id="constat" data-roman-section data-roman="02" data-roman-title="Le constat"><WhyNow /></div>
        {/* 03 — Pour qui */}
        <div id="pour-qui" data-roman-section data-roman="03" data-roman-title="Pour qui"><ForWho /></div>
      </div>

      {/* 04 — Pourquoi Elevora (engagements) — vidéo brumeuse, transitions fondues */}
      <div id="pourquoi" data-roman-section data-roman="04" data-roman-title="Pourquoi Elevora" className="lp-group-engage"><EngagementsGrid /></div>

      {/* Parties 5+6 — fond commun (Manifeste + Réalisations) */}
      <div className="lp-group lp-group-work">
        {/* Manifeste */}
        <div id="manifeste" data-roman-section data-roman="05" data-roman-title="Manifeste"><Manifesto /></div>
        {/* 06 — Réalisations */}
        <div id="realisations" data-roman-section data-roman="06" data-roman-title="Réalisations" className="sec-warm"><ProjectShowcase /></div>
      </div>

      {/* 07 — Méthode (sombre) */}
      <div id="methode" data-roman-section data-roman="07" data-roman-title="Notre méthode" data-roman-tone="dark" className="sec-night"><MethodSteps /></div>

      {/* 08 — Témoignages */}
      <div id="temoignages" data-roman-section data-roman="08" data-roman-title="Témoignages" className="sec-warm"><TestimonialsSection /></div>

      {/* 09 — FAQ */}
      <div id="faq" data-roman-section data-roman="09" data-roman-title="FAQ" className="sec-white"><FaqsSection /></div>

      {/* Fil de chiffres romains — couvre intro + toutes les parties */}
      <RomanRail />

      <CinematicFooter />
    </div>
  );
}

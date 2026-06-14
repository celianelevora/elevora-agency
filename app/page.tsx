import CinematicIntro from '@/components/CinematicIntro';
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
      {/* Ouverture cinématique : hero (écran 1) + scrub statue 1→122 +
          promesse figée sur la dernière frame (écran 2) — un seul système
          piloté par le scroll. Remplace l'ancien hero + ScrollSequence. */}
      <CinematicIntro frameCount={122} framePath="/seq/frame_" framePad={4} frameExt="webp" />

      {/* 01 — Le constat */}
      <div id="constat" data-roman-section data-roman="III"><WhyNow /></div>

      {/* 02 — Pour qui */}
      <div id="pour-qui" data-roman-section data-roman="IV"><ForWho /></div>

      {/* 03 — Pourquoi Elevora (engagements) */}
      <div id="pourquoi" data-roman-section data-roman="V"><EngagementsGrid /></div>

      {/* Manifeste */}
      <div id="manifeste" data-roman-section data-roman="VI"><Manifesto /></div>

      {/* 04 — Réalisations */}
      <div id="realisations" data-roman-section data-roman="VII" className="sec-warm"><ProjectShowcase /></div>

      {/* 05 — Méthode (sombre) */}
      <div id="methode" data-roman-section data-roman="VIII" data-roman-tone="dark" className="sec-night"><MethodSteps /></div>

      {/* 06 — Témoignages */}
      <div id="temoignages" data-roman-section data-roman="IX" className="sec-warm"><TestimonialsSection /></div>

      {/* FAQ */}
      <div id="faq" data-roman-section data-roman="X" className="sec-white"><FaqsSection /></div>

      {/* Fil de chiffres romains (façon écran 3) — couvre toutes les parties */}
      <RomanRail />

      <CinematicFooter />
    </div>
  );
}

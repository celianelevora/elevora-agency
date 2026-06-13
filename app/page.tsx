import HeroWithGooey from '@/components/HeroWithGooey';
import Marquee from '@/components/Marquee';
import WhyNow from '@/components/WhyNow';
import ForWho from '@/components/ForWho';
import EngagementsGrid from '@/components/EngagementsGrid';
import Manifesto from '@/components/Manifesto';
import ProjectShowcase from '@/components/ProjectShowcase';
import MethodSteps from '@/components/MethodSteps';
import TestimonialsSection from '@/components/TestimonialsSection';
import { FaqsSection } from '@/components/FaqsSection';
import { CinematicFooter } from '@/components/CinematicFooter';

export const metadata = {
  title: 'Elevora — Agence digitale à Nantes | Sites web & outils de gestion',
  description:
    'Elevora, agence digitale nantaise. Sites web qui convertissent et outils de gestion sur mesure pour indépendants et PME. Devis ferme, hébergement Infomaniak.',
};

export default function HomePage() {
  return (
    <div className="home-with-cinematic-footer">
      <HeroWithGooey />

      <div className="sec-night">
        <Marquee
          items={[
            'Sites vitrines',
            'E-commerce',
            'Refontes complètes',
            'CRM sur mesure',
            'Outils de gestion',
            'Extranets clients',
            'Landing pages',
          ]}
        />
      </div>

      {/* 01 — Le constat */}
      <WhyNow />

      {/* 02 — Pour qui */}
      <ForWho />

      {/* 03 — Pourquoi Elevora (engagements) */}
      <EngagementsGrid />

      {/* Manifeste */}
      <Manifesto />

      {/* 04 — Réalisations */}
      <div className="sec-warm"><ProjectShowcase /></div>

      {/* 05 — Méthode */}
      <div className="sec-night"><MethodSteps /></div>

      {/* 06 — Témoignages */}
      <div className="sec-warm"><TestimonialsSection /></div>

      {/* FAQ */}
      <div className="sec-white"><FaqsSection /></div>

      <CinematicFooter />
    </div>
  );
}

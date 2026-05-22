import HeroWithGooey from '@/components/HeroWithGooey';
import Marquee from '@/components/Marquee';
import ServicesGrid from '@/components/ServicesGrid';
import EngagementsGrid from '@/components/EngagementsGrid';
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

      <div className="sec-cream"><ServicesGrid /></div>

      <div className="sec-white"><EngagementsGrid /></div>

      <div className="sec-warm"><ProjectShowcase /></div>

      <div className="sec-white"><MethodSteps /></div>

      <div className="sec-warm"><TestimonialsSection /></div>

      <div className="sec-white"><FaqsSection /></div>

      <CinematicFooter />
    </div>
  );
}

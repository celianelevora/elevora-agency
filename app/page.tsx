import HeroWithGooey from '@/components/HeroWithGooey';
import Marquee from '@/components/Marquee';
import ServicesGrid from '@/components/ServicesGrid';
import EngagementsGrid from '@/components/EngagementsGrid';
import ProjectShowcase from '@/components/ProjectShowcase';
import MethodSteps from '@/components/MethodSteps';
import TestimonialsSection from '@/components/TestimonialsSection';
import { FaqsSection } from '@/components/FaqsSection';
import CTASection from '@/components/CTASection';
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

      <ServicesGrid />

      <EngagementsGrid />

      <ProjectShowcase />

      <MethodSteps />

      <TestimonialsSection />

      <FaqsSection />

      <CTASection
        eyebrow="08 — Démarrer un projet"
        title={`Vous avez un projet ?<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">On en parle.</span>`}
        description="Premier échange gratuit et sans engagement. On comprend votre besoin, on évalue la faisabilité, on vous propose un devis ferme sous 5 jours."
        primaryLabel="Prendre contact"
        secondaryLabel="07 78 43 57 21"
        secondaryHref="tel:+33778435721"
        showContactInfo
      />

      <CinematicFooter />
    </div>
  );
}

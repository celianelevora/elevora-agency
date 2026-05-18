import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ServicesGrid from '@/components/ServicesGrid';
import EngagementsGrid from '@/components/EngagementsGrid';
import ProjectShowcase from '@/components/ProjectShowcase';
import MethodSteps from '@/components/MethodSteps';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Elevora — Agence digitale à Nantes | Sites web & outils de gestion',
  description:
    'Elevora, agence digitale nantaise. Sites web qui convertissent et outils de gestion sur mesure pour indépendants et PME. Devis ferme, hébergement Infomaniak.',
};

export default function HomePage() {
  return (
    <>
      <Hero
        pillText="Agence indépendante — Nantes"
        title={`Le digital qui<br>fait <span class="italic">vraiment</span> tourner<br>votre entreprise.`}
        lead="Sites web qui convertissent et outils de gestion sur mesure. Pour les indépendants et les PME qui veulent du concret, pas du flou."
        primaryCTA={{ label: 'Parler de votre projet', href: '/contact' }}
        secondaryCTA={{ label: 'Voir nos réalisations', href: '/realisations' }}
        stats={[
          { value: '2025', label: 'Fondée fin' },
          { value: '100%', label: 'Made in Nantes' },
          { value: 'A→Z', label: 'De la strat au déploiement', accent: 'pink', italic: true },
        ]}
      />

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

      <Testimonials />

      <FAQ />

      <CTASection
        eyebrow="08 — Démarrer un projet"
        title={`Vous avez un projet ?<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">On en parle.</span>`}
        description="Premier échange gratuit et sans engagement. On comprend votre besoin, on évalue la faisabilité, on vous propose un devis ferme sous 5 jours."
        primaryLabel="Prendre contact"
        secondaryLabel="07 78 43 57 21"
        secondaryHref="tel:+33778435721"
        showContactInfo
      />
    </>
  );
}

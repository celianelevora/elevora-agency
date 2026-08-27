import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';
import LandingClient from './LandingClient';

const description =
  "Landing page optimisée conversion : copywriting, tracking, A/B test, connexion CRM. Idéale pour campagnes et lancements. À partir de 500 € HT. Elevora, Nantes.";

export const metadata: Metadata = {
  title: { absolute: 'Création de landing page qui convertit | Elevora' },
  description,
  alternates: { canonical: '/services/landing-page' },
  openGraph: {
    title: 'Création de landing page qui convertit | Elevora',
    description,
    url: 'https://elevora-agency.com/services/landing-page',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={[
          serviceSchema({
            name: 'Création de landing page',
            description,
            path: '/services/landing-page',
            serviceType: 'Création de landing page',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Création de landing page', path: '/services/landing-page' },
          ]),
        ]}
      />
      <LandingClient />
    </>
  );
}

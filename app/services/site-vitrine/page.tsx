import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';
import VitrineClient from './VitrineClient';

const description =
  "Site vitrine sur mesure pour indépendants et PME. Design unique, SEO natif, back-office simple. À partir de 625 € HT. Agence Elevora, Nantes.";

export const metadata: Metadata = {
  title: { absolute: 'Création de site vitrine sur mesure | Elevora' },
  description,
  alternates: { canonical: '/services/site-vitrine' },
  openGraph: {
    title: 'Création de site vitrine sur mesure | Elevora',
    description,
    url: 'https://elevora-agency.com/services/site-vitrine',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={[
          serviceSchema({
            name: 'Création de site vitrine',
            description,
            path: '/services/site-vitrine',
            serviceType: 'Création de site internet',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Création de site vitrine', path: '/services/site-vitrine' },
          ]),
        ]}
      />
      <VitrineClient />
    </>
  );
}

import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';
import AppClient from './AppClient';

const description =
  "Applications web et mobile sur mesure : dashboards, espaces clients, outils métier. Stack moderne, code à vous, hébergement Infomaniak. Sur devis. Elevora, Nantes.";

export const metadata: Metadata = {
  title: { absolute: 'Développement application web & mobile | Elevora' },
  description,
  alternates: { canonical: '/services/application-web-mobile' },
  openGraph: {
    title: 'Développement application web & mobile | Elevora',
    description,
    url: 'https://elevora-agency.com/services/application-web-mobile',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={[
          serviceSchema({
            name: "Développement d'application web & mobile",
            description,
            path: '/services/application-web-mobile',
            serviceType: "Développement d'application",
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: "Développement d'application web & mobile", path: '/services/application-web-mobile' },
          ]),
        ]}
      />
      <AppClient />
    </>
  );
}

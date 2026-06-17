import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';
import CrmClient from './CrmClient';

const description =
  "CRM, facturation, RH, extranet, outil métier sur mesure pour PME. Code et données à vous, hébergé en Suisse. Sur devis. Agence Elevora, Nantes.";

export const metadata: Metadata = {
  title: { absolute: 'CRM & outil de gestion sur mesure | Elevora' },
  description,
  alternates: { canonical: '/services/crm-outil-de-gestion' },
  openGraph: {
    title: 'CRM & outil de gestion sur mesure | Elevora',
    description,
    url: 'https://elevora-agency.com/services/crm-outil-de-gestion',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={[
          serviceSchema({
            name: 'CRM & outil de gestion sur mesure',
            description,
            path: '/services/crm-outil-de-gestion',
            serviceType: "Développement d'outil métier",
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'CRM & outil de gestion sur mesure', path: '/services/crm-outil-de-gestion' },
          ]),
        ]}
      />
      <CrmClient />
    </>
  );
}

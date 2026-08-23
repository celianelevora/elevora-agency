import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';
import EcommerceClient from './EcommerceClient';

const description =
  "Boutique en ligne sur mesure : catalogue, paiement Stripe, gestion stocks, transporteurs. Vendez, fidélisez, scalez. À partir de 2 000 € TTC. Elevora, Nantes.";

export const metadata: Metadata = {
  title: { absolute: 'Création de site e-commerce sur mesure | Elevora' },
  description,
  alternates: { canonical: '/services/site-ecommerce' },
  openGraph: {
    title: 'Création de site e-commerce sur mesure | Elevora',
    description,
    url: 'https://elevora-agency.com/services/site-ecommerce',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={[
          serviceSchema({
            name: 'Création de site e-commerce',
            description,
            path: '/services/site-ecommerce',
            serviceType: 'Développement e-commerce',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Création de site e-commerce', path: '/services/site-ecommerce' },
          ]),
        ]}
      />
      <EcommerceClient />
    </>
  );
}

import type { Metadata } from 'next';
import EcommerceClient from './EcommerceClient';

export const metadata: Metadata = {
  title: 'Création de site e-commerce | Elevora — Boutique en ligne sur mesure',
  description:
    "Boutique en ligne sur mesure : catalogue, paiement Stripe, gestion stocks, transporteurs. Vendez, fidélisez, scalez. À partir de 1500 €. Agence Elevora, Nantes.",
};

export default function Page() {
  return <EcommerceClient />;
}

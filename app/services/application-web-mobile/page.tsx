import type { Metadata } from 'next';
import AppClient from './AppClient';

export const metadata: Metadata = {
  title: 'Développement d\'application web & mobile | Elevora — Sur mesure',
  description:
    "Applications web et mobile sur mesure : dashboards, espaces clients, outils métier. Stack moderne, code à vous, hébergement Infomaniak. Sur devis. Agence Elevora, Nantes.",
};

export default function Page() {
  return <AppClient />;
}

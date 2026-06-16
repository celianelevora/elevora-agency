import type { Metadata } from 'next';
import LandingClient from './LandingClient';

export const metadata: Metadata = {
  title: 'Création de landing page | Elevora — Une page qui convertit',
  description:
    "Landing page optimisée conversion : copywriting, tracking, A/B test, connexion CRM. Idéale pour campagnes et lancements. À partir de 600 € TTC. Agence Elevora, Nantes.",
};

export default function Page() {
  return <LandingClient />;
}

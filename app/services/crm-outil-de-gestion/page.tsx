import type { Metadata } from 'next';
import CrmClient from './CrmClient';

export const metadata: Metadata = {
  title: 'CRM & outil de gestion sur mesure | Elevora — Nantes',
  description:
    "CRM, facturation, RH, extranet, outil métier sur mesure pour PME. Payez une fois, pas tous les mois. Code et données à vous. Agence Elevora, Nantes.",
};

export default function Page() {
  return <CrmClient />;
}

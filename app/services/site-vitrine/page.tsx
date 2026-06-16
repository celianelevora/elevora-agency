import type { Metadata } from 'next';
import VitrineClient from './VitrineClient';

export const metadata: Metadata = {
  title: 'Création de site vitrine | Elevora — Agence web à Nantes',
  description:
    "Site vitrine sur mesure pour indépendants et PME. Design unique, SEO natif, back-office simple. À partir de 1 000 € TTC. Agence Elevora, Nantes.",
};

export default function Page() {
  return <VitrineClient />;
}

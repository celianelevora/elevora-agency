import type { Metadata } from 'next';
import StartProjectForm from '@/components/StartProjectForm';
import { StaggerText } from '@/components/ui/stagger-text';
import { BlurFade } from '@/components/ui/blur-fade';
import StructuredData from '@/components/StructuredData';
import { breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'Démarrer un projet avec Elevora — brief & devis ferme' },
  description:
    "Démarrez votre projet web avec Elevora. Présentez votre besoin via un brief détaillé : on revient vers vous avec une réponse précise et un devis ferme.",
  alternates: { canonical: '/demarrer-un-projet' },
  openGraph: {
    title: 'Démarrer un projet avec Elevora — brief & devis ferme',
    description:
      "Démarrez votre projet web avec Elevora. Présentez votre besoin via un brief détaillé : on revient vers vous avec une réponse précise et un devis ferme.",
    url: 'https://elevora-agency.com/demarrer-un-projet',
    type: 'website',
  },
};

export default function StartProjectPage() {
  return (
    <main className="form-page">
      <StructuredData data={breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Démarrer un projet', path: '/demarrer-un-projet' }])} />
      <div className="container">
        <header className="form-page-head">
          {/* Pill retiree sur demande utilisateur */}
          <h1>
            <StaggerText text="Parlons de " />
            <span className="italic"><StaggerText text="votre projet" /></span>
            <StaggerText text="." />
          </h1>
          <BlurFade inView delay={0.15}>
            <p className="form-page-lead">
              Quelques minutes pour nous présenter votre projet en détail.
              Plus vous nous donnez d'informations, plus notre réponse sera
              précise et adaptée à votre situation.
            </p>
          </BlurFade>
        </header>

        <StartProjectForm />
      </div>
    </main>
  );
}

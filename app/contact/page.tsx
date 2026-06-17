import type { Metadata } from 'next';
import ContactSimpleForm from '@/components/ContactSimpleForm';
import { StaggerText } from '@/components/ui/stagger-text';
import { BlurFade } from '@/components/ui/blur-fade';
import StructuredData from '@/components/StructuredData';
import { breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'Contact Elevora — parlons de votre projet web' },
  description:
    "Contactez Elevora, agence web à Nantes. Une question, un devis, un projet en tête ? Remplissez le formulaire : on vous répond rapidement et sans détour.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Elevora — parlons de votre projet web',
    description:
      "Contactez Elevora, agence web à Nantes. Une question, un devis, un projet en tête ? Remplissez le formulaire : on vous répond rapidement et sans détour.",
    url: 'https://elevora-agency.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="form-page form-page-contact">
      <StructuredData data={breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      {/* Fond decoratif Fond_Contact.jpg */}
      <div className="form-page-bg" aria-hidden="true" />
      <div className="container">
        <header className="form-page-head">
          {/* Pill retiree sur demande utilisateur */}
          <h1>
            <StaggerText text="Une question, " />
            <span className="italic"><StaggerText text="un échange" /></span>
            <StaggerText text=" ?" />
          </h1>
          <BlurFade inView delay={0.15}>
            <p className="form-page-lead">
              Un renseignement, un projet en tête, ou simplement l'envie d'en parler ?
              Remplissez ce formulaire : on revient vers vous rapidement.
            </p>
          </BlurFade>
        </header>

        <ContactSimpleForm />
      </div>
    </main>
  );
}

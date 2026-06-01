import ContactSimpleForm from '@/components/ContactSimpleForm';

export const metadata = { title: 'Contact — Elevora Agency' };

export default function ContactPage() {
  return (
    <main className="form-page">
      <div className="container">
        <header className="form-page-head">
          <span className="form-page-pill">
            <span className="form-page-pill-dot" />
            Contact rapide
          </span>
          <h1>
            Une question, <span className="italic">un échange</span> ?
          </h1>
          <p className="form-page-lead">
            Vous avez une question, besoin d'un renseignement ou souhaitez
            simplement échanger avec nous ? Remplissez ce formulaire, nous
            reviendrons vers vous rapidement avec une réponse claire et adaptée
            à votre demande.
          </p>
        </header>

        <ContactSimpleForm />
      </div>
    </main>
  );
}

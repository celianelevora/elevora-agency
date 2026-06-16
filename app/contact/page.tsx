import ContactSimpleForm from '@/components/ContactSimpleForm';

export const metadata = { title: 'Contact — Elevora Agency' };

export default function ContactPage() {
  return (
    <main className="form-page form-page-contact">
      {/* Fond decoratif Fond_Contact.jpg */}
      <div className="form-page-bg" aria-hidden="true" />
      <div className="container">
        <header className="form-page-head">
          {/* Pill retiree sur demande utilisateur */}
          <h1>
            Une question, <span className="italic">un échange</span> ?
          </h1>
          <p className="form-page-lead">
            Une question, un renseignement, ou simplement envie d'échanger ?
            Remplissez ce formulaire : on revient vers vous rapidement.
          </p>
        </header>

        <ContactSimpleForm />
      </div>
    </main>
  );
}

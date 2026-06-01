import StartProjectForm from '@/components/StartProjectForm';

export const metadata = { title: 'Démarrer un projet — Elevora Agency' };

export default function StartProjectPage() {
  return (
    <main className="form-page">
      <div className="container">
        <header className="form-page-head">
          <span className="form-page-pill">
            <span className="form-page-pill-dot" />
            Lancer votre projet
          </span>
          <h1>
            Parlons de <span className="italic">votre projet</span>.
          </h1>
          <p className="form-page-lead">
            Quelques minutes pour nous présenter votre projet en détail.
            Plus vous nous donnez d'informations, plus notre réponse sera
            précise et adaptée à votre situation.
          </p>
        </header>

        <StartProjectForm />
      </div>
    </main>
  );
}

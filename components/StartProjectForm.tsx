'use client';

import { useState } from 'react';
import PhoneInput from './PhoneInput';

const PROJECT_TYPES = [
  'Site vitrine',
  'Site e-commerce',
  'CRM / outil de gestion',
  'Refonte d\'un site existant',
  'Application web',
  'Autre',
];

const OBJECTIVES = [
  'Visibilité',
  'Prise de rendez-vous',
  'Vente en ligne',
  'Automatisation',
  'Gestion client',
  'Image professionnelle',
  'Autre',
];

const FEATURES = [
  'Formulaire de contact',
  'Prise de rendez-vous',
  'Paiement en ligne',
  'Espace client',
  'Catalogue produits',
  'Blog / actualités',
  'CRM intégré',
  'Automatisation',
  'Tableau de bord',
  'Autre',
];

const BUDGETS = [
  'Moins de 1 000 €',
  '1 000 – 3 000 €',
  '3 000 – 5 000 €',
  '5 000 – 10 000 €',
  '10 000 – 20 000 €',
  'Plus de 20 000 €',
  'Pas encore défini',
];

export default function StartProjectForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Consentement RGPD obligatoire (le form est en noValidate, donc on valide ici).
    if (!formData.get('rgpd')) {
      setError('Merci de cocher la case d’acceptation de la politique de confidentialité pour envoyer votre demande.');
      setSubmitting(false);
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('Une erreur est survenue lors de l’envoi. Merci de réessayer dans un instant.');
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau puis réessayez.');
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="form-card" style={{ textAlign: 'center' }} role="status" aria-live="polite">
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 12px' }}>
          Projet bien reçu, merci !
        </h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6 }}>
          Nous étudions votre demande et vous recontactons sous 48h ouvrées
          avec une première proposition.
        </p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="form_type" value="start_project" />
      {/* Honeypot anti-spam : champ neutre « confirm_field » (cf. route serveur).
          Invisible et inaccessible aux humains. Si rempli, la requête est traitée
          comme un bot côté serveur. */}
      <input
        type="text"
        name="confirm_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      {error && (
        <div
          role="alert"
          className="form-error"
          style={{
            background: 'var(--pink-soft)',
            color: 'var(--pink-deep)',
            border: '1px solid var(--pink-light)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      {/* SECTION 1 — Vos coordonnées */}
      <div className="form-section">
        <h3 className="form-section-title">1. Vos coordonnées</h3>
        <p className="form-section-sub">Pour vous recontacter rapidement.</p>

        <div className="form-grid-2">
          <div className="form-field">
            <label className="form-label" htmlFor="sp-first_name">Prénom *</label>
            <input className="form-input" id="sp-first_name" type="text" name="first_name" autoComplete="given-name" required />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="sp-last_name">Nom *</label>
            <input className="form-input" id="sp-last_name" type="text" name="last_name" autoComplete="family-name" required />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-email">Adresse email *</label>
          <input className="form-input" id="sp-email" type="email" name="email" autoComplete="email" required />
        </div>

        <PhoneInput name="phone" required label="Numéro de téléphone *" />
      </div>

      {/* SECTION 2 — Votre activité */}
      <div className="form-section">
        <h3 className="form-section-title">2. Votre activité</h3>
        <p className="form-section-sub">Pour mieux cerner votre univers.</p>

        <div className="form-grid-2">
          <div className="form-field">
            <label className="form-label" htmlFor="sp-company">
              Nom de l'entreprise
              <span className="form-optional"> (optionnel)</span>
            </label>
            <input className="form-input" id="sp-company" type="text" name="company" autoComplete="organization" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="sp-sector">
              Secteur d'activité
              <span className="form-optional"> (optionnel)</span>
            </label>
            <input className="form-input" id="sp-sector" type="text" name="sector" placeholder="Ex. : Restauration, e-commerce…" />
          </div>
        </div>
      </div>

      {/* SECTION 3 — Votre projet */}
      <div className="form-section">
        <h3 className="form-section-title">3. Votre projet</h3>
        <p className="form-section-sub">Quel type de projet souhaitez-vous lancer ?</p>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-project_type">Type de projet *</label>
          <select className="form-select" id="sp-project_type" name="project_type" required defaultValue="">
            <option value="" disabled>Choisissez un type de projet…</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-description">Description du projet *</label>
          <textarea
            className="form-textarea"
            id="sp-description"
            name="description"
            required
            placeholder="Décrivez votre projet en quelques phrases : contexte, besoins, attentes principales…"
            rows={5}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-objective">Objectif principal *</label>
          <select className="form-select" id="sp-objective" name="objective" required defaultValue="">
            <option value="" disabled>Choisissez un objectif…</option>
            {OBJECTIVES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="form-grid-2">
          <div className="form-field">
            <label className="form-label" htmlFor="sp-pages">
              Nombre de pages ou sections
              <span className="form-optional"> (optionnel)</span>
            </label>
            <input className="form-input" id="sp-pages" type="text" name="pages" placeholder="Ex. : 5-10 pages" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="sp-deadline">
              Date de lancement souhaitée
              <span className="form-optional"> (optionnel)</span>
            </label>
            <input className="form-input" id="sp-deadline" type="text" name="deadline" placeholder="Ex. : Q1 2026, dès que possible…" />
          </div>
        </div>

        <div className="form-field">
          <span className="form-label" id="sp-features-label">
            Fonctionnalités nécessaires
            <span className="form-optional"> (optionnel — cochez ce qui s'applique)</span>
          </span>
          <div className="form-check-grid" role="group" aria-labelledby="sp-features-label">
            {FEATURES.map((f) => (
              <label key={f} className="form-check">
                <input type="checkbox" name="features" value={f} />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 — Identité & contenus */}
      <div className="form-section">
        <h3 className="form-section-title">4. Identité & contenus</h3>
        <p className="form-section-sub">Optionnel : ce que vous avez déjà.</p>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-branding">
            Identité visuelle existante
            <span className="form-optional"> (optionnel)</span>
          </label>
          <input
            className="form-input"
            id="sp-branding"
            type="text"
            name="branding"
            placeholder="Logo, couleurs, typographies, charte graphique… Précisez ce qui est déjà défini."
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-inspirations">
            Exemples ou inspirations
            <span className="form-optional"> (optionnel)</span>
          </label>
          <input
            className="form-input"
            id="sp-inspirations"
            type="text"
            name="inspirations"
            placeholder="Liens vers des sites qui vous plaisent, références visuelles…"
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-content">
            Contenus déjà disponibles
            <span className="form-optional"> (optionnel)</span>
          </label>
          <input
            className="form-input"
            id="sp-content"
            type="text"
            name="content"
            placeholder="Textes, photos, vidéos, catalogue produits, offres…"
          />
        </div>
      </div>

      {/* SECTION 5 — Budget & complément */}
      <div className="form-section">
        <h3 className="form-section-title">5. Budget & complément</h3>
        <p className="form-section-sub">
          Une indication budgétaire nous aide à proposer la meilleure approche.
        </p>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-budget">
            Budget estimé
            <span className="form-optional"> (optionnel)</span>
          </label>
          <select className="form-select" id="sp-budget" name="budget" defaultValue="">
            <option value="">Sélectionnez une fourchette…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-extra_message">
            Message complémentaire
            <span className="form-optional"> (optionnel)</span>
          </label>
          <textarea
            className="form-textarea"
            id="sp-extra_message"
            name="extra_message"
            placeholder="Une précision, une contrainte particulière, une question avant de démarrer…"
            rows={4}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="sp-attachment">
            Pièce jointe
            <span className="form-optional"> (optionnel — brief, cahier des charges, mood-board…)</span>
          </label>
          <input
            className="form-input"
            id="sp-attachment"
            type="file"
            name="attachment"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
          />
        </div>
      </div>

      <div className="form-rgpd">
        <label className="form-check" style={{ margin: 0 }}>
          <input type="checkbox" name="rgpd" required />
          <span>
            J'accepte que mes informations soient traitées par Elevora dans le
            cadre de l'analyse de ma demande de projet, conformément à la{' '}
            <a href="/confidentialite">politique de confidentialité</a>. *
          </span>
        </label>
      </div>

      <button type="submit" className="form-submit" disabled={submitting}>
        {submitting ? 'Envoi en cours…' : (
          <>
            Démarrer mon projet
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

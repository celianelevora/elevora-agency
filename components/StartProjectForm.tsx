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
  'Moins de 2 000 €',
  '2 000 – 5 000 €',
  '5 000 – 10 000 €',
  '10 000 – 20 000 €',
  'Plus de 20 000 €',
  'Pas encore défini',
];

export default function StartProjectForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        e.currentTarget.reset();
      } else {
        alert("Une erreur est survenue, merci de réessayer.");
      }
    } catch {
      alert("Une erreur est survenue, merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="form-card" style={{ textAlign: 'center' }}>
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

      {/* SECTION 1 — Vos coordonnées */}
      <div className="form-section">
        <h3 className="form-section-title">1. Vos coordonnées</h3>
        <p className="form-section-sub">Pour vous recontacter rapidement.</p>

        <div className="form-grid-2">
          <div className="form-field">
            <label className="form-label">Prénom *</label>
            <input className="form-input" type="text" name="first_name" required />
          </div>
          <div className="form-field">
            <label className="form-label">Nom *</label>
            <input className="form-input" type="text" name="last_name" required />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Adresse email *</label>
          <input className="form-input" type="email" name="email" required />
        </div>

        <PhoneInput name="phone" required label="Numéro de téléphone *" />
      </div>

      {/* SECTION 2 — Votre activité */}
      <div className="form-section">
        <h3 className="form-section-title">2. Votre activité</h3>
        <p className="form-section-sub">Pour mieux cerner votre univers.</p>

        <div className="form-grid-2">
          <div className="form-field">
            <label className="form-label">
              Nom de l'entreprise
              <span className="form-optional"> (optionnel)</span>
            </label>
            <input className="form-input" type="text" name="company" />
          </div>
          <div className="form-field">
            <label className="form-label">
              Secteur d'activité
              <span className="form-optional"> (optionnel)</span>
            </label>
            <input className="form-input" type="text" name="sector" placeholder="Ex. : Restauration, e-commerce…" />
          </div>
        </div>
      </div>

      {/* SECTION 3 — Votre projet */}
      <div className="form-section">
        <h3 className="form-section-title">3. Votre projet</h3>
        <p className="form-section-sub">Quel type de projet souhaitez-vous lancer ?</p>

        <div className="form-field">
          <label className="form-label">Type de projet *</label>
          <select className="form-select" name="project_type" required defaultValue="">
            <option value="" disabled>Choisissez un type de projet…</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">Description du projet *</label>
          <textarea
            className="form-textarea"
            name="description"
            required
            placeholder="Décrivez votre projet en quelques phrases : contexte, besoins, attentes principales…"
            rows={5}
          />
        </div>

        <div className="form-field">
          <label className="form-label">Objectif principal *</label>
          <select className="form-select" name="objective" required defaultValue="">
            <option value="" disabled>Choisissez un objectif…</option>
            {OBJECTIVES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="form-grid-2">
          <div className="form-field">
            <label className="form-label">
              Nombre de pages ou sections
              <span className="form-optional"> (optionnel)</span>
            </label>
            <input className="form-input" type="text" name="pages" placeholder="Ex. : 5-10 pages" />
          </div>
          <div className="form-field">
            <label className="form-label">
              Date de lancement souhaitée
              <span className="form-optional"> (optionnel)</span>
            </label>
            <input className="form-input" type="text" name="deadline" placeholder="Ex. : Q1 2026, dès que possible…" />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">
            Fonctionnalités nécessaires
            <span className="form-optional"> (optionnel — cochez ce qui s'applique)</span>
          </label>
          <div className="form-check-grid">
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
          <label className="form-label">
            Identité visuelle existante
            <span className="form-optional"> (optionnel)</span>
          </label>
          <input
            className="form-input"
            type="text"
            name="branding"
            placeholder="Logo, couleurs, typographies, charte graphique… Précisez ce qui est déjà défini."
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Exemples ou inspirations
            <span className="form-optional"> (optionnel)</span>
          </label>
          <input
            className="form-input"
            type="text"
            name="inspirations"
            placeholder="Liens vers des sites qui vous plaisent, références visuelles…"
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Contenus déjà disponibles
            <span className="form-optional"> (optionnel)</span>
          </label>
          <input
            className="form-input"
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
          <label className="form-label">
            Budget estimé
            <span className="form-optional"> (optionnel)</span>
          </label>
          <select className="form-select" name="budget" defaultValue="">
            <option value="">Sélectionnez une fourchette…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">
            Message complémentaire
            <span className="form-optional"> (optionnel)</span>
          </label>
          <textarea
            className="form-textarea"
            name="extra_message"
            placeholder="Une précision, une contrainte particulière, une question avant de démarrer…"
            rows={4}
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Pièce jointe
            <span className="form-optional"> (optionnel — brief, cahier des charges, mood-board…)</span>
          </label>
          <input
            className="form-input"
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

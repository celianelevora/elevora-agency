'use client';

import { useState } from 'react';
import PhoneInput from './PhoneInput';

export default function ContactSimpleForm() {
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
      setError('Merci de cocher la case d’acceptation de la politique de confidentialité pour envoyer votre message.');
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
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 26, margin: '0 0 12px' }}>
          Merci pour votre message
        </h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15 }}>
          Nous revenons vers vous dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="form_type" value="contact_simple" />
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

      <div className="form-section">
        <h3 className="form-section-title">Vos coordonnées</h3>
        <p className="form-section-sub">
          Les champs marqués d'un astérisque sont obligatoires.
        </p>

        <div className="form-grid-2">
          <div className="form-field">
            <label className="form-label" htmlFor="cf-first_name">Prénom *</label>
            <input className="form-input" id="cf-first_name" type="text" name="first_name" autoComplete="given-name" required />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="cf-last_name">Nom *</label>
            <input className="form-input" id="cf-last_name" type="text" name="last_name" autoComplete="family-name" required />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="cf-email">Adresse email *</label>
          <input className="form-input" id="cf-email" type="email" name="email" autoComplete="email" required />
        </div>

        <PhoneInput
          name="phone"
          required={false}
          label="Numéro de téléphone"
          hint="Si vous préférez être rappelé(e)."
        />
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Votre demande</h3>
        <p className="form-section-sub">Aidez-nous à mieux vous orienter.</p>

        <div className="form-field">
          <label className="form-label" htmlFor="cf-subject">Objet de la demande *</label>
          <input
            className="form-input"
            id="cf-subject"
            type="text"
            name="subject"
            required
            placeholder="Ex. : Question sur vos services, demande d'information…"
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="cf-message">Votre message *</label>
          <textarea
            className="form-textarea"
            id="cf-message"
            name="message"
            required
            placeholder="Décrivez votre demande en quelques mots…"
            rows={6}
          />
        </div>
      </div>

      <div className="form-rgpd">
        <label className="form-check" style={{ margin: 0 }}>
          <input type="checkbox" name="rgpd" required />
          <span>
            J'accepte que mes informations soient traitées par Elevora dans le
            cadre de ma demande, conformément à la{' '}
            <a href="/confidentialite">politique de confidentialité</a>. *
          </span>
        </label>
      </div>

      <button type="submit" className="form-submit" disabled={submitting}>
        {submitting ? 'Envoi en cours…' : (
          <>
            Envoyer ma demande
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

'use client';

import { useState } from 'react';
import PhoneInput from './PhoneInput';

export default function ContactSimpleForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [rgpdError, setRgpdError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    const formData = new FormData(form);
    // Consentement RGPD obligatoire (le formulaire est en noValidate).
    if (!formData.get('rgpd')) {
      setRgpdError(true);
      return;
    }
    setRgpdError(false);
    setSubmitting(true);
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
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="form-card" style={{ textAlign: 'center' }}>
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
      {/* Honeypot anti-spam : invisible et inaccessible aux humains. Si rempli,
          la requête est traitée comme un bot côté serveur. Nom neutre
          (« confirm_field ») pour éviter que l'autofill du navigateur ne le
          remplisse à la place d'un vrai visiteur. */}
      <input
        type="text"
        name="confirm_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div className="form-section">
        <h3 className="form-section-title">Vos coordonnées</h3>
        <p className="form-section-sub">
          Les champs marqués d'un astérisque sont obligatoires.
        </p>

        <div className="form-grid-2">
          <div className="form-field">
            <label className="form-label" htmlFor="first_name">Prénom *</label>
            <input className="form-input" id="first_name" type="text" name="first_name" required />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="last_name">Nom *</label>
            <input className="form-input" id="last_name" type="text" name="last_name" required />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">Adresse email *</label>
          <input className="form-input" id="email" type="email" name="email" required />
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
          <label className="form-label" htmlFor="subject">Objet de la demande *</label>
          <input
            className="form-input"
            id="subject"
            type="text"
            name="subject"
            required
            placeholder="Ex. : Question sur vos services, demande d'information…"
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="message">Votre message *</label>
          <textarea
            className="form-textarea"
            id="message"
            name="message"
            required
            placeholder="Décrivez votre demande en quelques mots…"
            rows={6}
          />
        </div>
      </div>

      <div className="form-rgpd">
        <label className="form-check" style={{ margin: 0 }} htmlFor="rgpd">
          <input
            type="checkbox"
            id="rgpd"
            name="rgpd"
            required
            aria-invalid={rgpdError || undefined}
            aria-describedby={rgpdError ? 'rgpd-error' : undefined}
          />
          <span>
            J'accepte que mes informations soient traitées par Elevora dans le
            cadre de ma demande, conformément à la{' '}
            <a href="/confidentialite">politique de confidentialité</a>. *
          </span>
        </label>
        {rgpdError && (
          <p
            id="rgpd-error"
            role="alert"
            aria-live="polite"
            style={{ color: 'var(--pink)', fontSize: 14, margin: '8px 0 0' }}
          >
            Vous devez accepter la politique de confidentialité pour envoyer le formulaire.
          </p>
        )}
      </div>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          style={{ color: 'var(--pink)', fontSize: 14, margin: '0 0 12px' }}
        >
          Une erreur est survenue, merci de réessayer.
        </p>
      )}

      <button type="submit" className="form-submit" disabled={submitting}>
        {submitting ? 'Envoi en cours…' : (
          <>
            Envoyer ma demande
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

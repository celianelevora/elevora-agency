'use client';

import { useState } from 'react';
import PhoneInput from './PhoneInput';

export default function ContactSimpleForm() {
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

      <div className="form-section">
        <h3 className="form-section-title">Vos coordonnées</h3>
        <p className="form-section-sub">
          Les champs marqués d'un astérisque sont obligatoires.
        </p>

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
          <label className="form-label">Objet de la demande *</label>
          <input
            className="form-input"
            type="text"
            name="subject"
            required
            placeholder="Ex. : Question sur vos services, demande d'information…"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Votre message *</label>
          <textarea
            className="form-textarea"
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

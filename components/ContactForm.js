'use client';

import { useState } from 'react';

const formFieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const labelStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: 'var(--ink-soft)',
  letterSpacing: '0.01em',
};

const inputStyle = {
  fontFamily: 'var(--sans)',
  fontSize: 15,
  background: '#FFF',
  border: '0.5px solid var(--line-strong)',
  borderRadius: 8,
  padding: '14px 16px',
  color: 'var(--ink)',
  width: '100%',
};

const PROJECT_TYPES = [
  { value: 'vitrine', label: 'Site vitrine' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'refonte', label: 'Refonte' },
  { value: 'outil', label: 'Outil de gestion' },
  { value: 'autre', label: 'Autre' },
  { value: 'discussion', label: 'Je ne sais pas encore' },
];

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [selectedProject, setSelectedProject] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erreur');
      setStatus('success');
      e.target.reset();
      setSelectedProject('');
    } catch (err) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#FFF', border: '0.5px solid var(--line-soft)', borderRadius: 'var(--radius-lg)', padding: 48, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, background: 'var(--pink-light)', color: 'var(--pink-deep)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg className="ic" width="32" height="32" viewBox="0 0 24 24" style={{ strokeWidth: 2 }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ marginBottom: 12 }}>Message envoyé !</h3>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 420, margin: '0 auto' }}>
          Merci pour votre message. Nous revenons vers vous sous 48 heures ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: '#FFF', border: '0.5px solid var(--line-soft)', borderRadius: 'var(--radius-lg)', padding: 48 }}
    >
      <h3 style={{ marginBottom: 32 }}>Votre message</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={formFieldStyle}>
          <label style={labelStyle} htmlFor="firstname">Prénom</label>
          <input style={inputStyle} type="text" id="firstname" name="firstname" required />
        </div>
        <div style={formFieldStyle}>
          <label style={labelStyle} htmlFor="lastname">Nom</label>
          <input style={inputStyle} type="text" id="lastname" name="lastname" required />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={formFieldStyle}>
          <label style={labelStyle} htmlFor="email">Email</label>
          <input style={inputStyle} type="email" id="email" name="email" required />
        </div>
        <div style={formFieldStyle}>
          <label style={labelStyle} htmlFor="phone">Téléphone (optionnel)</label>
          <input style={inputStyle} type="tel" id="phone" name="phone" />
        </div>
      </div>

      <div style={{ ...formFieldStyle, marginBottom: 24 }}>
        <label style={labelStyle} htmlFor="company">Entreprise</label>
        <input style={inputStyle} type="text" id="company" name="company" />
      </div>

      <div style={{ ...formFieldStyle, marginBottom: 24 }}>
        <label style={labelStyle}>Type de projet</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {PROJECT_TYPES.map((p) => {
            const checked = selectedProject === p.value;
            return (
              <label
                key={p.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  background: checked ? 'rgba(0, 51, 160, 0.04)' : '#FFF',
                  border: `0.5px solid ${checked ? 'var(--klein)' : 'var(--line-strong)'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'all 0.2s var(--ease)',
                }}
              >
                <input
                  type="radio"
                  name="project"
                  value={p.value}
                  checked={checked}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  style={{ accentColor: 'var(--klein)' }}
                />
                <span style={{ fontSize: 14 }}>{p.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div style={{ ...formFieldStyle, marginBottom: 24 }}>
        <label style={labelStyle} htmlFor="budget">Budget envisagé</label>
        <select style={inputStyle} id="budget" name="budget" defaultValue="">
          <option value="">Sélectionnez une fourchette</option>
          <option value="<1500">Moins de 1 500 €</option>
          <option value="1500-3000">1 500 – 3 000 €</option>
          <option value="3000-5000">3 000 – 5 000 €</option>
          <option value="5000-10000">5 000 – 10 000 €</option>
          <option value=">10000">Plus de 10 000 €</option>
          <option value="undecided">À définir ensemble</option>
        </select>
      </div>

      <div style={{ ...formFieldStyle, marginBottom: 32 }}>
        <label style={labelStyle} htmlFor="message">Décrivez votre projet</label>
        <textarea
          style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
          id="message"
          name="message"
          placeholder="Quelques lignes sur votre activité, votre besoin, vos objectifs. Plus c'est précis, mieux on pourra vous répondre."
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: 'var(--klein)',
          color: 'var(--cream)',
          padding: '16px 28px',
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'var(--sans)',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          border: 'none',
          opacity: status === 'loading' ? 0.6 : 1,
        }}
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma demande'}
        <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      {status === 'error' && (
        <p style={{ fontSize: 13, color: '#A32D2D', marginTop: 16 }}>
          Une erreur s'est produite. Réessayez ou écrivez-nous directement à contact@elevora-agency.com.
        </p>
      )}

      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 20, lineHeight: 1.6 }}>
        En envoyant ce formulaire, vous acceptez que vos informations soient utilisées exclusivement pour traiter votre demande. Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données.
      </p>
    </form>
  );
}

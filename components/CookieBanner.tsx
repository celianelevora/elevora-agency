'use client';

import { useEffect, useState } from 'react';

/* ============================================================
   CookieBanner — conformité CNIL (minimal).

   Le site n'utilise que des cookies strictement nécessaires (cf. mentions
   légales), mais un bandeau de choix doit exister. Le choix est mémorisé
   dans localStorage ; le bandeau ne s'affiche que tant qu'aucun choix n'a
   été fait.
   ============================================================ */

const STORAGE_KEY = 'elevora-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage indisponible (mode privé strict) : on n'affiche rien. */
    }
  }, []);

  function decide(choice: 'accepted' | 'refused') {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-live="polite"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        background: '#1A1A2E',
        color: '#EAE9EE',
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        boxShadow: '0 -4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, maxWidth: 620 }}>
        Ce site utilise uniquement des cookies strictement nécessaires à son bon
        fonctionnement. Vous pouvez accepter ou refuser leur dépôt.
      </p>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => decide('refused')}
          style={{
            background: 'transparent',
            color: '#EAE9EE',
            border: '1px solid rgba(234,233,238,0.4)',
            borderRadius: 999,
            padding: '10px 22px',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => decide('accepted')}
          style={{
            background: '#EAE9EE',
            color: '#1A1A2E',
            border: '1px solid #EAE9EE',
            borderRadius: 999,
            padding: '10px 22px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}

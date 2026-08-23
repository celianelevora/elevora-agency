'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Combien coûte un site avec Elevora ?',
    a: "Nos sites vitrines démarrent à 750 €. Le tarif final dépend du nombre de pages, des fonctionnalités demandées et du niveau de design. Pour un outil de gestion sur mesure, nous établissons un devis personnalisé après un premier échange. Dans tous les cas, le prix annoncé est ferme.",
  },
  {
    q: 'Quels sont vos délais de livraison ?',
    a: "Comptez 4 à 8 semaines pour un site vitrine complet, de la première réunion à la mise en ligne. Les outils de gestion sur mesure prennent 6 à 12 semaines selon la complexité. Nous fixons un planning précis avec vous dès le cadrage.",
  },
  {
    q: "Le code du site m'appartient-il vraiment ?",
    a: "Oui, intégralement. À la livraison, vous récupérez l'ensemble du code source, les accès aux serveurs, au nom de domaine, à votre back-office. Aucun abonnement caché, aucune dépendance technique à Elevora pour que votre site continue à tourner.",
  },
  {
    q: 'Quelles technologies utilisez-vous ?',
    a: "Pour les sites web : Next.js (React) pour les sites sur mesure, WordPress quand un CMS est nécessaire, hébergement Infomaniak. Pour les outils de gestion : Next.js + base de données PostgreSQL. Toujours les technologies adaptées au projet, jamais les plus à la mode pour le plaisir.",
  },
  {
    q: 'Que se passe-t-il après la livraison ?',
    a: "Suivi gratuit pendant 30 jours après mise en ligne : corrections de bugs, ajustements mineurs, accompagnement à la prise en main. Au-delà, nous proposons des contrats de maintenance ou des forfaits d'évolutions à la demande, sans engagement.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section>
      <div className="container" style={{ maxWidth: 920 }}>
        <span className="eyebrow">07 — Questions fréquentes</span>
        <h2 style={{ margin: '18px 0 48px' }}>FAQ</h2>

        <div style={{ borderTop: '0.5px solid var(--line)' }}>
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                style={{ borderBottom: '0.5px solid var(--line)' }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    padding: '28px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                    {item.q}
                  </span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--ink-muted)',
                      transition: 'transform 0.3s var(--ease)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    }}
                  >
                    <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? 320 : 0,
                    transition: 'max-height 0.35s var(--ease)',
                  }}
                >
                  <p
                    style={{
                      padding: '0 0 28px',
                      color: 'var(--ink-soft)',
                      fontSize: 15,
                      lineHeight: 1.7,
                      maxWidth: 700,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

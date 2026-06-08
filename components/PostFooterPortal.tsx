'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Rend `children` dans le slot global `#post-footer-slot` defini dans
 * layout.tsx, juste apres le <Footer />. Utilise par /tarifs pour pousser la
 * CTA "Discutons de votre projet" en dessous du footer.
 *
 * SSR : ne rend rien (le slot DOM n'existe pas cote serveur). Sur le client,
 * apres mount, le contenu est porte dans le slot via React Portal.
 */
export default function PostFooterPortal({ children }: { children: ReactNode }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById('post-footer-slot'));
  }, []);

  if (!slot) return null;
  return createPortal(children, slot);
}

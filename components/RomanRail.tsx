"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   RomanRail — fil vertical de chiffres romains (façon écran 3).

   Découvre automatiquement toutes les sections marquées
   [data-roman-section] dans le DOM, dans l'ordre, et affiche un
   marqueur romain par section. Le marqueur de la section courante
   s'illumine ; une barre de progression suit l'avancée du scroll.

   Auto-masqué sous 880px (comme la maquette de référence).
   ============================================================ */

const ROMAN = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII",
];

/* Titres lisibles affichés au survol d'un chiffre (un seul à la fois). */
const TITLES: Record<string, string> = {
  intro: "Accueil",
  constat: "Le constat",
  "pour-qui": "Pour qui ?",
  pourquoi: "Nos engagements",
  manifeste: "Manifeste",
  realisations: "Réalisations",
  methode: "Notre méthode",
  temoignages: "Témoignages",
  faq: "FAQ",
};

interface Item {
  id: string;
  label: string;
  title: string;
}

export default function RomanRail() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const [dark, setDark] = useState(true);
  const progRef = useRef<HTMLSpanElement>(null);
  const elsRef = useRef<HTMLElement[]>([]);

  // découverte des sections (après montage du DOM de la page)
  useEffect(() => {
    const collect = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-roman-section]")
      );
      elsRef.current = nodes;
      setItems(
        nodes.map((n, i) => ({
          id: n.id || `roman-${i}`,
          label: n.dataset.roman || ROMAN[i] || String(i + 1),
          title:
            n.dataset.romanTitle ||
            TITLES[n.id] ||
            n.dataset.roman ||
            `Section ${i + 1}`,
        }))
      );
    };
    collect();
    // re-scan une fois tout chargé (images, polices) au cas où l'ordre/positions bougent
    const t = window.setTimeout(collect, 400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const mid = window.scrollY + vh * 0.42;
      const els = elsRef.current;

      let idx = 0;
      for (let i = 0; i < els.length; i++) {
        const top = els[i].offsetTop;
        if (mid >= top) idx = i;
        else break;
      }
      setActive(idx);
      setDark((els[idx]?.dataset.romanTone || "") === "dark");

      // progression globale : du haut de la 1re section au bas de la dernière
      const first = els[0];
      const last = els[els.length - 1];
      if (first && last && progRef.current) {
        const start = first.offsetTop;
        const end = last.offsetTop + last.offsetHeight;
        const p = Math.min(1, Math.max(0, (window.scrollY + vh * 0.5 - start) / (end - start)));
        progRef.current.style.height = (p * 100).toFixed(2) + "%";
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  if (items.length === 0) return null;

  const go = (id: string, i: number) => {
    const el = elsRef.current[i] || document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop + 4, behavior: "smooth" });
  };

  return (
    <nav
      className={`roman-rail ${dark ? "tone-dark" : ""}`}
      aria-label="Progression dans la page"
    >
      <span className="roman-rail-track" aria-hidden="true">
        <span ref={progRef} className="roman-rail-prog" />
      </span>
      {items.map((it, i) => (
        <button
          key={it.id}
          type="button"
          className={`roman-rail-mark ${i === active ? "active" : ""}`}
          onClick={() => go(it.id, i)}
          aria-label={`Aller à la section : ${it.title}`}
          aria-current={i === active ? "true" : undefined}
        >
          <span className="roman-rail-tip" aria-hidden="true">{it.title}</span>
          {it.label}
        </button>
      ))}
    </nav>
  );
}

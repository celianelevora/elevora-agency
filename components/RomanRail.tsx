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
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
];

/* Titres lisibles affichés au survol d'un chiffre (un seul à la fois). */
const TITLES: Record<string, string> = {
  intro: "La promesse",
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
      const els = elsRef.current;
      const probe = vh * 0.42; // ligne de référence à 42% de l'écran

      let idx = 0;
      for (let i = 0; i < els.length; i++) {
        // getBoundingClientRect = position réelle à l'écran, robuste quel que
        // soit le parent positionné. offsetTop était faussé par les wrappers
        // .lp-group (relatif au groupe, pas au document) -> mauvaise corrélation.
        if (els[i].getBoundingClientRect().top <= probe) idx = i;
        else break;
      }
      setActive(idx);
      setDark((els[idx]?.dataset.romanTone || "") === "dark");

      // progression de la BARRE : calquée sur l'avancée d'une SECTION à l'autre
      // (pas sur les pixels de scroll). Indispensable car le hero fait ~560vh :
      // un calcul en pixels faisait galoper la barre (déjà à III sur I, etc.).
      // Ici, la barre se cale exactement sur les chiffres équidistants : quand la
      // section `idx` est active, la barre est au chiffre `idx`, puis interpole
      // doucement vers le suivant selon l'avancée DANS cette section.
      if (progRef.current && els.length > 1) {
        const curTopDoc = els[idx].getBoundingClientRect().top + window.scrollY;
        let nextTopDoc: number;
        if (idx + 1 < els.length) {
          nextTopDoc = els[idx + 1].getBoundingClientRect().top + window.scrollY;
        } else {
          const r = els[idx].getBoundingClientRect();
          nextTopDoc = r.top + window.scrollY + r.height; // bas de la dernière section
        }
        // la section devient active quand son haut passe la ligne `probe` ;
        // elle le reste jusqu'à ce que la suivante atteigne `probe`.
        const scrollStart = curTopDoc - probe;
        const scrollEnd = nextTopDoc - probe;
        const frac =
          scrollEnd > scrollStart
            ? Math.min(1, Math.max(0, (window.scrollY - scrollStart) / (scrollEnd - scrollStart)))
            : 0;
        const p = Math.min(1, Math.max(0, (idx + frac) / (els.length - 1)));
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
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top + 4), behavior: "smooth" });
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

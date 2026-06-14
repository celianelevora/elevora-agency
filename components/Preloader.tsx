"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   Préloader Elevora — le nom « Elevora Agency » s'écrit à l'encre.

   « Elevora » est révélé de gauche à droite (clip-path) avec un trait
   d'encre dégradé Klein → framboise qui se dessine sous le mot, comme
   une plume ; « Agency » apparaît ensuite. Fond nuit + halos de charte.
   Durée volontairement posée (~3 s) pour qu'on ait le temps de la voir.
   Aucune dépendance. Respecte prefers-reduced-motion.
   ============================================================ */

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // déclenche l'écriture
    const startId = requestAnimationFrame(() => root.classList.add("elv-go"));

    // durée d'affichage : posée pour les yeux, plus courte si mouvement réduit
    const HOLD = reduce ? 1100 : 3000;
    const OUT = 760;

    let outTimer = 0;
    const holdTimer = window.setTimeout(() => {
      root.classList.add("elv-out");
      outTimer = window.setTimeout(() => setDone(true), OUT);
    }, HOLD);

    return () => {
      cancelAnimationFrame(startId);
      window.clearTimeout(holdTimer);
      window.clearTimeout(outTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div className="elv-preloader" ref={rootRef} aria-hidden="true">
      <div className="elv-glow elv-glow-klein" />
      <div className="elv-glow elv-glow-razz" />

      <div className="elv-stack">
        <div className="elv-write">
          <span className="elv-name">Elevora</span>
          <span className="elv-ink" aria-hidden="true" />
        </div>
        <div className="elv-sub">Agency</div>
      </div>
    </div>
  );
}

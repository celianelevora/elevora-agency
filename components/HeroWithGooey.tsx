"use client";

import Link from "next/link";
import { useRef } from "react";
import { GooeyText } from "@/components/ui/gooey-text";

const MORPH_WORDS = ["tourner", "convertir", "vendre", "scaler", "briller"];

export default function HeroWithGooey() {
  const ghostRef = useRef<HTMLAnchorElement>(null);

  // Glow qui suit la souris sur le bouton "Voir nos réalisations"
  const handleGhostMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ghostRef.current;
    if (!el) return;
    const glow = el.querySelector<HTMLElement>(".glow");
    if (!glow) return;
    const rect = el.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left}px`;
    glow.style.top = `${e.clientY - rect.top}px`;
  };

  return (
    <section className="hero-statue">
      {/* Video brumeuse en fond — RECAP-PROJET.md (decision cle).
          Calage identique a l'ancienne image : object-position 60% 0% / cover. */}
      <video
        className="hero-statue-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-statue.png"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-statue-inner">
        <div className="hero-statue-text">
          <h1 className="hero-title">
            <span className="hero-line">Le digital qui</span>
            <span className="hero-line">
              fait{" "}
              <GooeyText
                texts={MORPH_WORDS}
                morphTime={0.9}
                cooldownTime={1.8}
                className="hero-morph"
              />
            </span>
            <span className="hero-line">votre</span>
            <span className="hero-line">entreprise.</span>
          </h1>

          <p className="hero-lead">
            Sites web qui convertissent et outils de gestion sur mesure. Pour
            les PME qui veulent du concret, pas du flou.
          </p>

          <div className="hero-ctas">
            <Link href="/contact" className="hero-cta-primary">
              <span>Parler de votre projet</span>
              <svg className="ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/realisations"
              className="hero-cta-ghost"
              ref={ghostRef}
              onMouseMove={handleGhostMove}
            >
              <span className="glow" aria-hidden="true" />
              <span>Voir nos réalisations</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

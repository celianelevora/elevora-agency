"use client";

import Link from "next/link";
import Image from "next/image";
import { GooeyText } from "@/components/ui/gooey-text";

const MORPH_WORDS = ["tourner", "convertir", "vendre", "scaler", "briller"];

export default function HeroWithGooey() {
  return (
    <section className="hero-statue">
      {/* Halo radial pour adoucir le fond */}
      <div className="hero-statue-glow" aria-hidden="true" />

      <div className="container hero-statue-grid">
        {/* Colonne texte */}
        <div className="hero-statue-text">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            AGENCE INDÉPENDANTE — NANTES
          </span>

          <h1 className="hero-title">
            <span className="hero-line">Le digital qui</span>
            <span className="hero-line">
              fait{" "}
              <GooeyText
                texts={MORPH_WORDS}
                morphTime={0.9}
                cooldownTime={1.8}
                className="hero-morph"
              />{" "}
              votre
            </span>
            <span className="hero-line">entreprise.</span>
          </h1>

          <p className="hero-lead">
            Sites web qui convertissent et outils de gestion sur mesure. Pour
            les PME qui veulent du concret, pas du flou.
          </p>

          <div className="hero-ctas">
            <Link href="/contact" className="hero-cta-primary">
              Parler de votre projet
              <svg className="ic" width="16" height="16" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/realisations" className="hero-cta-ghost">
              Voir nos réalisations
            </Link>
          </div>
        </div>

        {/* Colonne statue */}
        <div className="hero-statue-image" aria-hidden="true">
          <Image
            src="/hero-statue.png"
            alt=""
            width={1280}
            height={1280}
            priority
            sizes="(max-width: 1024px) 80vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

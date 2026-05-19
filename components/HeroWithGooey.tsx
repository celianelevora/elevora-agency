"use client";

import Link from "next/link";
import { GooeyText } from "@/components/ui/gooey-text";

const MORPH_WORDS = ["tourner", "convertir", "vendre", "scaler", "briller"];

export default function HeroWithGooey() {
  return (
    <section style={{ padding: "100px 0 80px" }}>
      <div className="container">
        <span className="pill">
          <span className="pill-dot"></span>
          Agence indépendante — Nantes
        </span>

        <h1 style={{ margin: "28px 0 28px", maxWidth: 920 }}>
          Le digital qui fait{" "}
          <GooeyText
            texts={MORPH_WORDS}
            morphTime={0.9}
            cooldownTime={1.6}
            className="min-w-[280px] sm:min-w-[380px] md:min-w-[480px]"
          />
          <br />
          votre entreprise.
        </h1>

        <p className="lead" style={{ marginBottom: 44 }}>
          Sites web qui convertissent et outils de gestion sur mesure. Pour les
          indépendants et les PME qui veulent du concret, pas du flou.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          <Link href="/contact" className="cta-big">
            Parler de votre projet
            <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link href="/realisations" className="cta-secondary">
            Voir nos réalisations
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            gap: 64,
            borderTop: "0.5px solid var(--line)",
            paddingTop: 28,
            maxWidth: 680,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "var(--klein)",
                lineHeight: 1,
              }}
            >
              2025
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--ink-muted)",
                marginTop: 6,
              }}
            >
              Fondée fin
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "var(--klein)",
                lineHeight: 1,
              }}
            >
              100%
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--ink-muted)",
                marginTop: 6,
              }}
            >
              Made in Nantes
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "var(--pink)",
                lineHeight: 1,
                fontFamily: "var(--serif)",
                fontStyle: "italic",
              }}
            >
              A→Z
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--ink-muted)",
                marginTop: 6,
              }}
            >
              De la strat au déploiement
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  --cf-fg: #1A1A2E;
  --cf-bg: #BEBEBE;
  --cf-klein: #1B4F8A;
  --cf-pink: #C9266A;
  --pill-bg-1: rgba(10,10,10,0.03);
  --pill-bg-2: rgba(10,10,10,0.01);
  --pill-shadow: rgba(190,190,190,0.5);
  --pill-highlight: rgba(255,255,255,0.6);
  --pill-inset-shadow: rgba(255,255,255,0.5);
  --pill-border: rgba(10,10,10,0.08);
  --pill-bg-1-hover: rgba(27,79,138,0.06);
  --pill-bg-2-hover: rgba(10,10,10,0.02);
  --pill-border-hover: rgba(27,79,138,0.2);
  --pill-shadow-hover: rgba(190,190,190,0.7);
  --pill-highlight-hover: rgba(255,255,255,0.8);
}
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(10,10,10,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(10,10,10,0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
.footer-aurora {
  background: radial-gradient(circle at 50% 50%,
    rgba(27,79,138,0.12) 0%, rgba(201,38,106,0.10) 40%, transparent 70%);
}
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover), inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--cf-fg);
}
.footer-giant-bg-text {
  font-family: var(--serif), serif;
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(10,10,10,0.06);
  background: linear-gradient(180deg, rgba(10,10,10,0.08) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}
.footer-text-glow {
  font-family: var(--serif), serif;
  background: linear-gradient(180deg, var(--cf-fg) 0%, rgba(10,10,10,0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.footer-cta-title {
  font-family: var(--serif), serif;
  font-weight: 400;
  font-size: clamp(2.6rem, 6.5vw, 5.5rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: var(--cf-fg);
  margin-bottom: 1.5rem;
}
.footer-cta-em {
  font-style: italic;
  color: #1B4F8A;
  white-space: nowrap;
}
.footer-cta-sub {
  font-family: var(--sans), sans-serif;
  font-weight: 300;
  font-size: clamp(0.95rem, 1.4vw, 1.125rem);
  line-height: 1.6;
  color: rgba(26,26,46,0.7);
  max-width: 540px;
  margin: 0 auto 2.5rem;
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);
    // Effet magnétique désactivé : les boutons restent fixes, hover propre via CSS
    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Sites web qui convertissent</span> <span style={{ color: "rgba(27,79,138,0.5)" }}>✦</span>
    <span>Outils de gestion sur mesure</span> <span style={{ color: "rgba(201,38,106,0.5)" }}>✦</span>
    <span>Accompagnement de A à Z</span> <span style={{ color: "rgba(27,79,138,0.5)" }}>✦</span>
    <span>Agence indépendante à Nantes</span> <span style={{ color: "rgba(201,38,106,0.5)" }}>✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        { y: "0vh", scale: 1, opacity: 1, ease: "power1.out", scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 } }
      );
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div ref={wrapperRef} className="relative h-screen w-full" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <footer
          className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden cinematic-footer-wrapper"
          style={{ background: "linear-gradient(180deg, #BEBEBE 0%, #B6B6B6 100%)", color: "#1A1A2E" }}
        >
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          <div ref={giantTextRef} className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none">
            ELEVORA
          </div>

          <div className="absolute top-12 left-0 w-full overflow-hidden py-4 z-10 -rotate-2 scale-110 shadow-2xl" style={{ borderTop: "1px solid rgba(10,10,10,0.1)", borderBottom: "1px solid rgba(10,10,10,0.1)", background: "rgba(190,190,190,0.55)", backdropFilter: "blur(8px)" }}>
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] uppercase" style={{ color: "#6B6B6B" }}>
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 w-full max-w-5xl mx-auto">
            <h2 ref={headingRef} className="footer-cta-title text-center" style={{ fontWeight: 400 }}>
              On démarre <span className="footer-cta-em">votre&nbsp;projet</span> ?
            </h2>

            <p className="footer-cta-sub text-center">
              Premier échange gratuit et sans engagement. On comprend votre besoin,
              on évalue la faisabilité, on vous propose un devis ferme sous 5 jours.
            </p>

            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as={Link} href="/contact" className="footer-glass-pill px-10 py-5 rounded-full font-bold text-sm md:text-base flex items-center gap-3" style={{ color: "#fff", background: "linear-gradient(180deg, #2B6CC4, #1B4F8A)", border: "none" }}>
                  Démarrer un projet
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </MagneticButton>
                <MagneticButton as={Link} href="/realisations" className="footer-glass-pill px-10 py-5 rounded-full font-bold text-sm md:text-base flex items-center gap-3" style={{ color: "#1A1A2E" }}>
                  Voir nos réalisations
                </MagneticButton>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                <MagneticButton as={Link} href="/services/sites-web" className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm" style={{ color: "#6B6B6B" }}>Sites web</MagneticButton>
                <MagneticButton as={Link} href="/services/outils-de-gestion" className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm" style={{ color: "#6B6B6B" }}>Outils de gestion</MagneticButton>
                <MagneticButton as={Link} href="/methode" className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm" style={{ color: "#6B6B6B" }}>Méthode</MagneticButton>
                <MagneticButton as={Link} href="/tarifs" className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm" style={{ color: "#6B6B6B" }}>Tarifs</MagneticButton>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1" style={{ color: "#6B6B6B" }}>
              © 2026 Elevora · Agence digitale à Nantes
            </div>
            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest" style={{ color: "#6B6B6B" }}>contact@elevora-agency.com</span>
            </div>
            <MagneticButton as="button" onClick={scrollToTop} className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center group order-3" style={{ color: "#6B6B6B" }} aria-label="Retour en haut">
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

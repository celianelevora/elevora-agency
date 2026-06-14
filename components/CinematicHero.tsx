"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* ============================================================
   CinematicHero — ouverture de la landing (réécriture COMPLÈTE v21).

   Architecture robuste : UNE grande section haute (.cine2, ~560vh) avec une
   scène en position:STICKY (.cine2-stage, height:100dvh). Sticky se dimensionne
   normalement (= la taille de l'écran, jamais la hauteur de la page) et n'est PAS
   piégeable par un parent transformé/animé -> plus aucun bug de zoom/cadrage.

   Déroulé (piloté par la progression P du scroll dans la section) :
     1. HERO        : Hero.mp4 (gros plan, en boucle) + titre façon « Visual power ».
     2. LIAISON     : fondu Hero -> scrub. La 1re frame du scrub = le hero, donc
                      la transition est invisible (on « entre » dans la vidéo).
     3. SCRUB       : la vidéo défile au scroll (et revient en arrière si on remonte),
                      du gros plan au buste complet. currentTime piloté + LISSÉ (LERP).
     4. PROMESSE    : dernière frame figée, le texte « Ce qu'on dit, on le tient »
                      apparaît par-dessus, puis on enchaîne sur « 01 — Le constat ».
   ============================================================ */

interface Props {
  heroSrc?: string;
  scrubSrc?: string;
  poster?: string;
  /** durée du scrub (s) — fallback si les métadonnées tardent */
  duration?: number;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const eoCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const map = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

const SCRUB_LERP = 0.18;

export default function CinematicHero({
  heroSrc = "/hero-intro.mp4",
  scrubSrc = "/scrub-intro.mp4",
  poster = "/scrub-poster.webp",
  duration = 5.083,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroVidRef = useRef<HTMLVideoElement>(null);
  const scrubRef = useRef<HTMLVideoElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const heroUiRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrub = scrubRef.current;
    const heroVid = heroVidRef.current;
    const fade = fadeRef.current;
    const heroUi = heroUiRef.current;
    const promise = promiseRef.current;
    const cue = cueRef.current;
    if (!section || !scrub || !heroVid || !fade || !heroUi || !promise) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    let dur = duration;
    let vTarget = 0;
    let vDisp = 0;
    let lastSet = -1;
    let vh = window.innerHeight;
    let dark = false;
    let raf = 0;

    // le scrub est piloté à la main (jamais lu) : pause + 1re frame
    const primeScrub = () => {
      try {
        scrub.pause();
        scrub.currentTime = 0;
      } catch {
        /* noop */
      }
    };
    const onMeta = () => {
      if (isFinite(scrub.duration) && scrub.duration > 0) dur = scrub.duration;
      primeScrub();
    };
    scrub.addEventListener("loadedmetadata", onMeta);
    scrub.addEventListener("loadeddata", primeScrub);

    // le hero, lui, joue en boucle tout seul
    const playHero = () => heroVid.play().catch(() => {});
    heroVid.addEventListener("canplay", playHero);

    const setDark = (on: boolean) => {
      if (dark === on) return;
      dark = on;
      root.classList.toggle("cine-hero", on);
    };

    const drive = (P: number) => {
      // ---- LIAISON hero -> scrub (fondu croisé, les 2 montrent la même pose) ----
      const xfade = map(P, 0.07, 0.15); // 0 -> 1
      heroVid.style.opacity = (1 - xfade).toFixed(3);
      scrub.style.opacity = xfade.toFixed(3);

      // ---- SCRUB : currentTime piloté par le scroll, LISSÉ ----
      // 0 tant qu'on n'a pas fini la liaison (reste calé sur la pose du hero),
      // puis défile jusqu'à la dernière frame, puis se fige.
      const sp = map(P, 0.15, 0.72);
      vTarget = sp * dur;
      if (reduce) {
        vDisp = vTarget;
      } else {
        vDisp += (vTarget - vDisp) * SCRUB_LERP;
        if (Math.abs(vTarget - vDisp) < 0.008) vDisp = vTarget;
      }
      const t = Math.max(0, Math.min(dur - 0.001, vDisp));
      if (scrub.readyState >= 1 && Math.abs(t - lastSet) > 0.004) {
        try {
          scrub.currentTime = t;
          lastSet = t;
        } catch {
          /* noop */
        }
      }

      // ---- HERO UI : titre façon « Visual power », sort en montant + flou ----
      const heroOut = eoCubic(map(P, 0.02, 0.1));
      heroUi.style.opacity = (1 - heroOut).toFixed(3);
      if (!reduce) {
        heroUi.style.transform = `translateY(${(-60 * heroOut).toFixed(1)}px)`;
        heroUi.style.filter = `blur(${(8 * heroOut).toFixed(1)}px)`;
      }
      heroUi.style.pointerEvents = heroOut > 0.5 ? "none" : "auto";
      if (cue) cue.style.opacity = (1 - map(P, 0.01, 0.06)).toFixed(3);

      // ---- PROMESSE : apparaît sur la dernière frame, repart au fondu final ----
      const pin = eoCubic(map(P, 0.74, 0.84));
      const pout = 1 - map(P, 0.94, 0.99);
      promise.style.opacity = (pin * pout).toFixed(3);
      if (!reduce) promise.style.transform = `translateY(${((1 - pin) * 36).toFixed(1)}px)`;
      promise.style.pointerEvents = pin > 0.5 && pout > 0.5 ? "auto" : "none";

      // ---- FONDU de raccord vers le site clair (#EAE9EE) ----
      fade.style.opacity = map(P, 0.94, 1).toFixed(3);

      // ---- header clair seulement quand le fondu crème recouvre l'écran ----
      setDark(P < 0.96);
    };

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - vh;
      const P = total > 0 ? clamp01(-rect.top / total) : 0;
      drive(P);
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      vh = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    primeScrub();
    playHero();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      scrub.removeEventListener("loadedmetadata", onMeta);
      scrub.removeEventListener("loadeddata", primeScrub);
      heroVid.removeEventListener("canplay", playHero);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("cine-hero");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroSrc, scrubSrc, poster, duration]);

  return (
    <section
      ref={sectionRef}
      className="cine2"
      data-roman-section
      data-roman="I"
      data-roman-tone="dark"
      id="intro"
    >
      <div ref={stageRef} className="cine2-stage">
        {/* couche vidéo : hero en boucle + scrub piloté (object-fit:cover) */}
        <video
          ref={heroVidRef}
          className="cine2-vid"
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src={heroSrc} type="video/mp4" />
        </video>
        <video
          ref={scrubRef}
          className="cine2-vid cine2-vid-scrub"
          poster={poster}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src={scrubSrc} type="video/mp4" />
        </video>

        {/* vignette de lisibilité */}
        <div ref={scrimRef} className="cine2-scrim" aria-hidden="true" />

        {/* HERO — titre façon « Visual power » : grand serif en bas à gauche */}
        <div ref={heroUiRef} className="cine2-hero-ui">
          <div className="cine2-hero-headline">
            <h1 className="cine2-title">
              Le digital qui donne
              <br />
              de la <em>puissance</em>
              <br />à votre marque.
            </h1>
            <div className="cine2-ctas">
              <Link href="/contact" className="cine2-cta">
                <span>Parler de votre projet</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/realisations" className="cine2-cta-ghost">
                Voir nos réalisations
              </Link>
            </div>
          </div>
          <p className="cine2-tagline">
            Sites web, identité visuelle
            <br />& accompagnement digital. Nantes.
          </p>
          <div ref={cueRef} className="cine2-cue" aria-hidden="true">
            <span>défiler</span>
            <i />
          </div>
        </div>

        {/* PROMESSE — sur la dernière frame (buste, main sur le cœur) */}
        <div ref={promiseRef} className="cine2-promise">
          <p className="cine2-promise-eyebrow">
            <span /> La promesse
          </p>
          <h2 className="cine2-promise-title">
            Ce qu&apos;on dit, <em>on le tient.</em>
          </h2>
          <div className="cine2-promise-cards">
            <article className="cine2-pcard">
              <span className="cine2-pcard-n">N°1</span>
              <h3>Un seul interlocuteur</h3>
              <p>
                Vous parlez à ceux qui conçoivent votre site. Jamais à un
                intermédiaire qui transmet, déforme, ralentit.
              </p>
            </article>
            <article className="cine2-pcard">
              <span className="cine2-pcard-n">N°2</span>
              <h3>Des délais tenus</h3>
              <p>
                Le planning est posé dès le premier rendez-vous. Il ne bouge
                plus, et vous savez toujours où en est votre projet.
              </p>
            </article>
          </div>
        </div>

        {/* fondu final vers le site clair (par-dessus tout) */}
        <div ref={fadeRef} className="cine2-fade" aria-hidden="true" />
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* ============================================================
   CinematicHero — ouverture de la landing (v23, scrub CANVAS).

   Architecture : UNE grande section (.cine2, ~560vh) avec une scène en
   position:STICKY (.cine2-stage, 100dvh) -> jamais piégeable, toujours = écran.

   Le scrub n'est PLUS une vidéo pilotée par currentTime (les seeks se
   regroupent quand on scrolle vite -> on saute des frames). À la place :
   122 frames WebP pré-décodées, dessinées sur un <canvas>. Dessiner une image
   est instantané -> en lissant l'INDEX de frame, on joue toutes les frames
   intermédiaires même en scrollant vite. (Technique « à la Apple ».)

   Déroulé piloté par la progression P du scroll :
     1. HERO    : Hero.mp4 (gros plan, en boucle) + titre façon « Visual power ».
     2. LIAISON : fondu Hero -> canvas (frame 0 = le hero) -> on entre dans la vidéo.
     3. SCRUB   : le canvas défile frame par frame (avant/arrière) au scroll.
     4. PROMESSE: dernière frame figée, « Ce qu'on dit, on le tient » par-dessus,
                  puis raccord crème vers « 01 — Le constat ».
   ============================================================ */

interface Props {
  heroSrc?: string;
  framesDir?: string;
  frameCount?: number;
  poster?: string;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const eoCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const map = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const pad3 = (n: number) => String(n).padStart(3, "0");

const FRAME_LERP = 0.16; // lissage de l'index de frame (plus petit = plus de frames intermédiaires)

export default function CinematicHero({
  heroSrc = "/hero-intro.mp4",
  framesDir = "/scrub-frames",
  frameCount = 122,
  poster = "/scrub-poster.webp",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroVidRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const heroUiRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const heroVid = heroVidRef.current;
    const fade = fadeRef.current;
    const heroUi = heroUiRef.current;
    const promise = promiseRef.current;
    const cue = cueRef.current;
    if (!section || !canvas || !heroVid || !fade || !heroUi || !promise) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ---- préchargement des frames ----
    const frames: HTMLImageElement[] = new Array(frameCount);
    const loaded: boolean[] = new Array(frameCount).fill(false);
    let lastDrawn = -1;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loaded[i] = true;
        // dès que la 1re frame est prête, on la peint (utile pour la liaison)
        if (i === 0 && lastDrawn < 0) draw(0);
      };
      img.src = `${framesDir}/f_${pad3(i + 1)}.webp`;
      frames[i] = img;
    }

    let vh = window.innerHeight;
    let dark = false;
    let curFrame = 0;
    let raf = 0;

    const sizeCanvas = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      vh = window.innerHeight;
      lastDrawn = -1; // forcer un redraw au prochain tick
    };

    const draw = (idx: number) => {
      let i = Math.max(0, Math.min(frameCount - 1, Math.round(idx)));
      // si la frame n'est pas encore prête, on cherche la plus proche déjà chargée
      if (!loaded[i]) {
        let found = -1;
        for (let d = 1; d < frameCount; d++) {
          if (i - d >= 0 && loaded[i - d]) { found = i - d; break; }
          if (i + d < frameCount && loaded[i + d]) { found = i + d; break; }
        }
        if (found < 0) return; // rien de chargé encore -> on garde l'écran
        i = found;
      }
      if (i === lastDrawn) return;
      const img = frames[i];
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih); // cover
      const dw = iw * scale, dh = ih * scale;
      const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
      ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
      lastDrawn = i;
    };

    const setDark = (on: boolean) => {
      if (dark === on) return;
      dark = on;
      root.classList.toggle("cine-hero", on);
    };

    const playHero = () => heroVid.play().catch(() => {});
    heroVid.addEventListener("canplay", playHero);

    const drive = (P: number) => {
      // ---- LIAISON hero -> canvas (fondu, les 2 montrent la même pose) ----
      const xfade = map(P, 0.07, 0.15);
      heroVid.style.opacity = (1 - xfade).toFixed(3);
      canvas.style.opacity = xfade.toFixed(3);

      // ---- SCRUB : index de frame piloté par le scroll, LISSÉ ----
      // 0 tant que la liaison n'est pas finie (calé sur la pose du hero),
      // puis avance jusqu'à la dernière frame, puis se fige.
      const targetFrame = map(P, 0.15, 0.72) * (frameCount - 1);
      if (reduce) {
        curFrame = targetFrame;
      } else {
        curFrame += (targetFrame - curFrame) * FRAME_LERP;
        if (Math.abs(targetFrame - curFrame) < 0.35) curFrame = targetFrame;
      }
      draw(curFrame);

      // ---- HERO UI : titre, sort en montant + flou ----
      const heroOut = eoCubic(map(P, 0.02, 0.1));
      heroUi.style.opacity = (1 - heroOut).toFixed(3);
      if (!reduce) {
        heroUi.style.transform = `translateY(${(-60 * heroOut).toFixed(1)}px)`;
        heroUi.style.filter = `blur(${(8 * heroOut).toFixed(1)}px)`;
      }
      heroUi.style.pointerEvents = heroOut > 0.5 ? "none" : "auto";
      if (cue) cue.style.opacity = (1 - map(P, 0.01, 0.06)).toFixed(3);

      // ---- PROMESSE : sur la dernière frame, repart au fondu final ----
      const pin = eoCubic(map(P, 0.76, 0.86));
      const pout = 1 - map(P, 0.94, 0.99);
      promise.style.opacity = (pin * pout).toFixed(3);
      if (!reduce) promise.style.transform = `translateY(${((1 - pin) * 36).toFixed(1)}px)`;
      promise.style.pointerEvents = pin > 0.5 && pout > 0.5 ? "auto" : "none";

      // ---- PLUS de page grise : la dernière frame laisse apparaître la
      //      partie 01 directement (le voile crème est neutralisé). ----
      fade.style.opacity = "0";

      // ---- header : texte clair tant que la statue est à l'écran, puis
      //      bascule clair (texte sombre) juste avant la partie 01. ----
      setDark(P < 0.997);
    };

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - vh;
      const P = total > 0 ? clamp01(-rect.top / total) : 0;
      drive(P);
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => sizeCanvas();
    window.addEventListener("resize", onResize);

    sizeCanvas();
    playHero();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      heroVid.removeEventListener("canplay", playHero);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("cine-hero");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroSrc, framesDir, frameCount, poster]);

  return (
    <section
      ref={sectionRef}
      className="cine2"
      data-roman-section
      data-roman="01"
      data-roman-title="La promesse"
      data-roman-tone="dark"
      id="intro"
    >
      <div ref={stageRef} className="cine2-stage">
        {/* hero en boucle (vidéo) */}
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

        {/* scrub : frames dessinées sur canvas (révélé pendant la liaison) */}
        <canvas ref={canvasRef} className="cine2-canvas" aria-hidden="true" />

        {/* vignette de lisibilité */}
        <div className="cine2-scrim" aria-hidden="true" />

        {/* HERO — titre façon « Visual power » */}
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

        {/* PROMESSE — sur la dernière frame */}
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

        {/* raccord crème (par-dessus tout) */}
        <div ref={fadeRef} className="cine2-fade" aria-hidden="true" />
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* ============================================================
   CinematicIntro — bloc d'ouverture unique de la landing.

   Fusionne en UN SEUL système piloté par le scroll :
     • le hero (écran 1 : texte à gauche, statue à droite, header sombre)
     • le scrub des 122 frames (la statue « recule » de la frame 1 → 122)
     • la promesse (dernière frame figée + « Ce qu'on dit, on le tient. »
       + 2 cartes par-dessus, façon écran 2)

   La statue est dessinée sur un <canvas> en position:fixed DERRIÈRE le
   contenu. Les panneaux (hero / promesse) sont en sticky et se pinnent :
   on a l'impression de rester sur place pendant que la frame défile.
   Aucune nouvelle dépendance — rAF + canvas natif, comme ScrollSequence.
   ============================================================ */

interface Props {
  frameCount?: number;
  framePath?: string; // ex: "/seq/frame_"
  framePad?: number; // 4 -> frame_0001
  frameExt?: string; // "webp"
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const eoCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const eInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function CinematicIntro({
  frameCount = 122,
  framePath = "/seq/frame_",
  framePad = 4,
  frameExt = "webp",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const romanRef = useRef<HTMLSpanElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const lastIdxRef = useRef<number>(-1);
  const stageHiddenRef = useRef<boolean>(false);
  const darkRef = useRef<boolean>(false);

  // --- dessin d'une frame (cover, frame la plus proche déjà chargée) ---
  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img: HTMLImageElement | undefined = imagesRef.current[idx];
    if (!img || !loadedRef.current[idx] || !img.naturalWidth) {
      img = undefined;
      for (let d = 1; d < frameCount; d++) {
        const lo = idx - d;
        const hi = idx + d;
        if (lo >= 0 && loadedRef.current[lo] && imagesRef.current[lo]?.naturalWidth) {
          img = imagesRef.current[lo];
          break;
        }
        if (hi < frameCount && loadedRef.current[hi] && imagesRef.current[hi]?.naturalWidth) {
          img = imagesRef.current[hi];
          break;
        }
      }
    }
    if (!img || !img.naturalWidth) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (!cw || !ch) return;
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;
    if (cr > ir) {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * ir;
      dy = 0;
      dx = (cw - dw) / 2;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const hero = heroRef.current;
    const promise = promiseRef.current;
    const fade = fadeRef.current;
    const roman = romanRef.current;
    if (!wrap || !stage || !hero || !promise || !fade) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    // --- préchargement des frames ---
    const imgs: HTMLImageElement[] = [];
    const loaded: boolean[] = new Array(frameCount).fill(false);
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const n = String(i + 1).padStart(framePad, "0");
      img.decoding = "async";
      img.src = `${framePath}${n}.${frameExt}`;
      const k = i;
      img.onload = () => {
        loaded[k] = true;
        if (k === 0 && lastIdxRef.current < 0) {
          lastIdxRef.current = 0;
          drawFrame(0);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    loadedRef.current = loaded;

    let vh = window.innerHeight;

    const setDark = (on: boolean) => {
      if (darkRef.current === on) return;
      darkRef.current = on;
      root.classList.toggle("cine-hero", on);
    };
    const setStageHidden = (hidden: boolean) => {
      if (stageHiddenRef.current === hidden) return;
      stageHiddenRef.current = hidden;
      stage.style.visibility = hidden ? "hidden" : "visible";
    };

    // sous-plages de la progression globale P de l'intro [0..1]
    const drive = (P: number) => {
      // --- frame : 0 pendant le hero, scrub 0->121, figée à la fin ---
      const fp = eInOut(clamp01((P - 0.1) / (0.82 - 0.1)));
      let idx = Math.round(fp * (frameCount - 1));
      if (idx < 0) idx = 0;
      if (idx > frameCount - 1) idx = frameCount - 1;
      if (idx !== lastIdxRef.current && !stageHiddenRef.current) {
        drawFrame(idx);
        lastIdxRef.current = idx;
      }

      // --- hero : sort en fondu + flou + montée (fini avant de se dé-pinner) ---
      const out = eoCubic(clamp01((P - 0.06) / (0.2 - 0.06)));
      hero.style.opacity = (1 - out).toFixed(3);
      if (reduce) {
        hero.style.transform = "none";
        hero.style.filter = "none";
      } else {
        hero.style.transform = `translateY(${(-70 * out).toFixed(1)}px)`;
        hero.style.filter = `blur(${(9 * out).toFixed(1)}px)`;
      }
      hero.style.pointerEvents = out > 0.6 ? "none" : "auto";

      // --- promesse : apparaît par-dessus la dernière frame (déjà pinnée) ---
      const pin = clamp01((P - 0.82) / (0.93 - 0.82));
      const pe = eoCubic(pin);
      promise.style.opacity = pe.toFixed(3);
      if (!reduce) promise.style.transform = `translateY(${((1 - pe) * 34).toFixed(1)}px)`;
      promise.style.pointerEvents = pin > 0.5 ? "auto" : "none";
      if (roman) {
        const ro = clamp01((P - 0.8) / 0.1) * (1 - clamp01((P - 0.96) / 0.04));
        roman.style.opacity = (ro * 0.9).toFixed(3);
        if (!reduce) roman.style.transform = `translateY(calc(-50% + ${((0.9 - P) * 60).toFixed(1)}px))`;
      }

      // --- fondu de raccord vers le site clair (#EAE9EE) ---
      fade.style.opacity = clamp01((P - 0.94) / (1 - 0.94)).toFixed(3);

      // --- header sombre tant qu'on est sur la statue, puis retour ---
      setDark(P < 0.94);
      // --- on masque le canvas une fois l'intro entièrement dépassée ---
      setStageHidden(P >= 0.999);
    };

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - vh; // course scrollable de l'intro
      const scrolled = -rect.top;
      const P = total > 0 ? clamp01(scrolled / total) : 0;
      drive(P);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      vh = window.innerHeight;
      lastIdxRef.current = -1; // force le redraw au prochain tick
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // premiers rendus (après layout)
    tick();
    const t = window.setTimeout(tick, 80);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("cine-hero");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePath, framePad, frameExt]);

  return (
    <>
      {/* SCÈNE FIXE — statue dessinée derrière tout le contenu de l'intro */}
      <div ref={stageRef} className="cine-stage" aria-hidden="true">
        <canvas ref={canvasRef} className="cine-canvas" />
        <div className="cine-scrim" />
        <div ref={fadeRef} className="cine-fade" />
      </div>

      {/* PILOTE DE SCROLL */}
      <div ref={wrapRef} className="cine-wrap">
        {/* I — HERO (écran 1) */}
        <section
          id="intro"
          data-roman-section
          data-roman="I"
          data-roman-tone="dark"
          className="cine-phase cine-hero-phase"
        >
          <div className="cine-sticky">
            <div ref={heroRef} className="cine-hero">
              <p className="cine-eyebrow">
                <span className="cine-eyebrow-line" /> Agence digitale — Nantes
              </p>
              <h1 className="cine-h1">
                Le digital qui donne
                <br />
                de la <em>puissance</em>
                <br />à votre marque.
              </h1>
              <p className="cine-lead">
                Sites web, identité visuelle et accompagnement digital pour les
                entreprises qui veulent marquer les esprits.
              </p>
              <div className="cine-ctas">
                <Link href="/contact" className="cine-cta-primary">
                  <span>Parler de votre projet</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/realisations" className="cine-cta-ghost">
                  <span>Voir nos réalisations</span>
                </Link>
              </div>
              <div className="cine-cue" aria-hidden="true">
                <span>Découvrir</span>
                <i />
              </div>
            </div>
          </div>
        </section>

        {/* scrub frame 1 → 122 (on « reste sur place ») */}
        <section className="cine-phase cine-scrub" aria-hidden="true" />

        {/* II — LA PROMESSE (écran 2, dernière frame figée) */}
        <section
          id="promesse"
          data-roman-section
          data-roman="II"
          data-roman-tone="dark"
          className="cine-phase cine-promise-phase"
        >
          <div className="cine-sticky">
            <div ref={promiseRef} className="cine-promise">
              <span ref={romanRef} className="cine-roman-wm" aria-hidden="true">
                II
              </span>
              <p className="cine-eyebrow cine-eyebrow-pink">
                <span className="cine-eyebrow-line" /> La promesse
              </p>
              <h2 className="cine-promise-title">
                Ce qu&apos;on dit, <em>on le tient.</em>
              </h2>
              <div className="cine-cards">
                <article className="cine-card">
                  <span className="cine-card-n">N°1</span>
                  <h3>Un seul interlocuteur</h3>
                  <p>
                    Vous parlez à ceux qui conçoivent votre site. Jamais à un
                    intermédiaire qui transmet, déforme, ralentit.
                  </p>
                </article>
                <article className="cine-card">
                  <span className="cine-card-n">N°2</span>
                  <h3>Des délais tenus</h3>
                  <p>
                    Le planning est posé dès le premier rendez-vous. Il ne bouge
                    plus, et vous savez toujours où en est votre projet.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

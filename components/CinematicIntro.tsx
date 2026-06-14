"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* ============================================================
   CinematicIntro — ouverture de la landing (réécriture v18, scrub VIDÉO).

   Approche reprise du prototype HTML qui fonctionnait : la statue est une
   <video> (object-fit:cover, AUCUN canvas → aucun bug d'étirement) dont le
   currentTime est piloté par le scroll, LISSÉ par interpolation (LERP) pour
   un scrub fluide. La vidéo est encodée « tout-image-clé » (chaque frame =
   keyframe) donc le seek est instantané.

     • hero (écran 1) : texte à gauche, statue derrière, header sombre
     • scrub : la statue « recule » (pose 1 → pose 2) pendant qu'on scrolle
     • promesse (écran 2) : dernière frame figée + « Ce qu'on dit, on le tient. »

   Une boucle rAF continue rapproche en douceur la position vidéo de sa cible.
   ============================================================ */

interface Props {
  /** durée de la vidéo (s) — fallback si les métadonnées tardent */
  duration?: number;
  videoSrc?: string;
  poster?: string;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const eoCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const eInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const SCRUB_LERP = 0.18; // lissage du currentTime vidéo

export default function CinematicIntro({
  duration = 5.083,
  videoSrc = "/statue-scrub.mp4",
  poster = "/seq/frame_0001.webp",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const romanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const fade = fadeRef.current;
    const hero = heroRef.current;
    const promise = promiseRef.current;
    const roman = romanRef.current;
    if (!wrap || !stage || !video || !fade || !hero || !promise) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    let dur = duration;
    let vTarget = 0;
    let vDisp = 0;
    let lastSet = -1;
    let vh = window.innerHeight;
    let dark = false;
    let stageHidden = false;
    let raf = 0;

    // la vidéo est SCRUBBÉE (jamais lue) : on la met en pause sur la 1re frame
    const primeVideo = () => {
      try {
        video.pause();
        video.currentTime = 0;
      } catch {
        /* noop */
      }
    };
    const onMeta = () => {
      if (isFinite(video.duration) && video.duration > 0) dur = video.duration;
      primeVideo();
    };
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", primeVideo);

    const setDark = (on: boolean) => {
      if (dark === on) return;
      dark = on;
      root.classList.toggle("cine-hero", on);
    };
    const setStageHidden = (hidden: boolean) => {
      if (stageHidden === hidden) return;
      stageHidden = hidden;
      stage.style.visibility = hidden ? "hidden" : "visible";
    };

    const drive = (P: number) => {
      // --- cible vidéo : 0 pendant le hero, scrub jusqu'à la fin, figée ---
      const fp = eInOut(clamp01((P - 0.1) / (0.82 - 0.1)));
      vTarget = fp * dur;

      // lissage du scrub
      if (reduce) {
        vDisp = vTarget;
      } else {
        vDisp += (vTarget - vDisp) * SCRUB_LERP;
        if (Math.abs(vTarget - vDisp) < 0.008) vDisp = vTarget;
      }
      const t = Math.max(0, Math.min(dur - 0.001, vDisp));
      if (!stageHidden && video.readyState >= 1 && Math.abs(t - lastSet) > 0.004) {
        try {
          video.currentTime = t;
          lastSet = t;
        } catch {
          /* noop */
        }
      }

      // --- hero : fondu + flou + montée (fini avant de se dé-pinner) ---
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
      // --- on masque la scène fixe une fois l'intro dépassée ---
      setStageHidden(P >= 0.999);
    };

    // boucle continue : le LERP rejoint la cible en douceur à chaque frame
    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - vh;
      const scrolled = -rect.top;
      const P = total > 0 ? clamp01(scrolled / total) : 0;
      drive(P);
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      vh = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    primeVideo();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", primeVideo);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("cine-hero");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, videoSrc, poster]);

  return (
    <>
      {/* SCÈNE FIXE — la vidéo statue, cadrée en CSS (object-fit:cover) */}
      <div ref={stageRef} className="cine-stage" aria-hidden="true">
        <video
          ref={videoRef}
          className="cine-video"
          poster={poster}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
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

        {/* scrub pose 1 → pose 2 (on « reste sur place ») */}
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

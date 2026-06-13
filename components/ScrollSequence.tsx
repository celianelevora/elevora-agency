"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  frameCount: number;
  framePath: string; // ex: "/seq/frame_"
  framePad?: number; // largeur du zero-padding (frame_0001 -> 4)
  frameExt?: string; // "webp"
}

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export default function ScrollSequence({
  frameCount,
  framePath,
  framePad = 4,
  frameExt = "webp",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const [, setReady] = useState(false);

  // Dessine la frame correspondant à la progression du scroll
  const draw = () => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vh = window.innerHeight;
    const rect = section.getBoundingClientRect();
    const max = section.offsetHeight - vh;
    const scrolled = clamp(-rect.top, 0, Math.max(max, 1));
    const p = reduce ? 1 : max > 0 ? scrolled / max : 0;

    let idx = Math.round(p * (frameCount - 1));
    idx = clamp(idx, 0, frameCount - 1);

    // frame la plus proche déjà chargée
    let img: HTMLImageElement | undefined = imagesRef.current[idx];
    if (!img || !loadedRef.current[idx] || !img.naturalWidth) {
      img = undefined;
      for (let d = 1; d < frameCount; d++) {
        const lo = idx - d,
          hi = idx + d;
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

    // cover
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

    // apparition du contenu (0.60 → 0.80)
    const overlay = overlayRef.current;
    if (overlay) {
      const o = clamp((p - 0.6) / 0.2, 0, 1);
      overlay.style.opacity = String(o);
      overlay.style.transform = `translateY(${(1 - o) * 20}px)`;
    }
    // fondu vers le site (cream) (0.86 → 1.0)
    const fade = fadeRef.current;
    if (fade) {
      fade.style.opacity = String(clamp((p - 0.86) / 0.14, 0, 1));
    }
  };

  // Préchargement des frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    const loaded: boolean[] = new Array(frameCount).fill(false);
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const n = String(i + 1).padStart(framePad, "0");
      img.src = `${framePath}${n}.${frameExt}`;
      const k = i;
      img.onload = () => {
        loaded[k] = true;
        if (k === 0) {
          setReady(true);
          draw();
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    loadedRef.current = loaded;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePath, framePad, frameExt]);

  // Scroll / resize
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        draw();
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // premier rendu (après layout)
    const t = window.setTimeout(draw, 60);
    draw();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  return (
    <section ref={sectionRef} className="seq" aria-label="Transition cinématique">
      <div className="seq-stage">
        <canvas ref={canvasRef} className="seq-canvas" />
        <div ref={overlayRef} className="seq-overlay">
          <span className="seq-overlay-kicker">L'atelier Elevora</span>
          <h2 className="seq-overlay-title">
            Chaque projet,<br />
            une <span className="italic">pièce unique.</span>
          </h2>
        </div>
        <div ref={fadeRef} className="seq-fade" aria-hidden="true" />
      </div>
    </section>
  );
}

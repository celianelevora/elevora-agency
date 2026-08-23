'use client';

/* ============================================================
   ServicesKinetic — section typographique cinétique interactive.

   Inspiré d'un effet « hover-to-reveal » (mots géants + scramble +
   burst typographique), MAIS entièrement réécrit et re-thémé pour
   Elevora :
   - scopé à UNE section (pas au <body>), donc aucune casse de scroll ;
   - aucun asset externe : les fonds sont des halos de marque
     (Klein / violet / framboise) qui se révèlent au survol ;
   - typo de marque (Playfair pour les mots, mono système pour le
     texte dispersé) ;
   - couleurs charte (nuit / cream / framboise / klein-bright) ;
   - mots adaptés au message de chaque page service.

   Plugins GSAP (présents en local) : SplitText, ScrambleTextPlugin,
   CustomEase. Tout est nettoyé au démontage.
   ============================================================ */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { CustomEase } from 'gsap/CustomEase';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrambleTextPlugin, CustomEase);
}

type Tint = 'klein' | 'violet' | 'razz';

interface Row {
  id: string;
  word: string;
  tint: Tint;
}
interface Scatter {
  text: string;
  top: string;
  left?: string;
  right?: string;
}
interface Preset {
  eyebrow: string;
  intro: string;
  rows: [Row, Row, Row];
  scatter: Scatter[];
}

/* Texte dispersé : vocabulaire de marque Elevora (positionné autour des
   3 mots centraux, jamais par-dessus). */
const SCATTER: Scatter[] = [
  { text: 'SUR MESURE', top: '7%', left: '7%' },
  { text: 'CODE PROPRE', top: '7%', left: '31%' },
  { text: 'PERFORMANCE', top: '7%', right: '8%' },
  { text: 'PAS DE TEMPLATE', top: '13%', left: '14%' },
  { text: 'DESIGN', top: '13%', right: '24%' },
  { text: 'DÉLAIS TENUS', top: '19%', left: '9%' },
  { text: 'CONVERSION', top: '19%', right: '11%' },
  { text: 'EXIGEANT', top: '49%', left: '3.5%' },
  { text: 'AUTONOMIE', top: '49%', right: '3.5%' },
  { text: 'RAPIDE', top: '80%', left: '9%' },
  { text: 'DURABLE', top: '80%', right: '15%' },
  { text: 'SOBRE', top: '86%', left: '17%' },
  { text: 'PRÉCIS', top: '86%', right: '26%' },
  { text: 'NANTES', top: '92%', left: '9%' },
  { text: 'INFOMANIAK', top: '92%', right: '9%' },
];

const PRESETS: Record<string, Preset> = {
  sites: {
    eyebrow: 'Ce qu’un site bien pensé fait pour vous',
    intro: 'Survolez chaque mot.',
    rows: [
      { id: 'capter', word: 'Capter', tint: 'klein' },
      { id: 'convaincre', word: 'Convaincre', tint: 'violet' },
      { id: 'convertir', word: 'Convertir', tint: 'razz' },
    ],
    scatter: SCATTER,
  },
  outils: {
    eyebrow: 'Ce qu’un outil sur mesure change',
    intro: 'Survolez chaque mot.',
    rows: [
      { id: 'automatiser', word: 'Automatiser', tint: 'klein' },
      { id: 'centraliser', word: 'Centraliser', tint: 'violet' },
      { id: 'maitriser', word: 'Maîtriser', tint: 'razz' },
    ],
    scatter: SCATTER,
  },
};

export default function ServicesKinetic({ variant }: { variant: 'sites' | 'outils' }) {
  const rootRef = useRef<HTMLElement>(null);
  const preset = PRESETS[variant] ?? PRESETS.sites;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const q = <T extends Element = HTMLElement>(sel: string) =>
      Array.from(root.querySelectorAll<T>(sel));

    CustomEase.create('kxEase', '0.86, 0, 0.07, 1');

    const ctx = gsap.context(() => {
      const rows = q<HTMLElement>('.kx-row');
      const scatter = q<HTMLElement>('.kx-scatter-item');
      const typeWrap = root.querySelector<HTMLElement>('.kx-type');
      const typeLines = q<HTMLElement>('.kx-type-line');
      const oddLines = q<HTMLElement>('.kx-type-line.odd');
      const evenLines = q<HTMLElement>('.kx-type-line.even');
      const TYPE_OPACITY = 0.05;

      // 1) Découpe + révélation des mots (blur-in)
      const splits: SplitText[] = [];
      rows.forEach((row, rowIndex) => {
        const wordEl = row.querySelector<HTMLElement>('.kx-word');
        if (!wordEl) return;
        const split = new SplitText(wordEl, { type: 'chars', charsClass: 'kx-char' });
        splits.push(split);
        if (reduce) {
          gsap.set(split.chars, { opacity: 1, filter: 'blur(0px)' });
        } else {
          gsap.set(split.chars, { opacity: 0, filter: 'blur(14px)', yPercent: 18 });
          gsap.to(split.chars, {
            opacity: 1,
            filter: 'blur(0px)',
            yPercent: 0,
            duration: 0.85,
            stagger: 0.05,
            ease: 'kxEase',
            delay: 0.1 + rowIndex * 0.12,
          });
        }
      });

      const state: { active: string | null; tl: gsap.core.Timeline | null; busy: boolean } = {
        active: null,
        tl: null,
        busy: false,
      };

      // 2) Fond : on bascule le halo de teinte de la ligne active
      const setGlow = (tint: string | null) => {
        (['klein', 'violet', 'razz'] as const).forEach((t) => {
          const layer = root.querySelector<HTMLElement>(`.kx-glow-${t}`);
          if (layer) gsap.to(layer, { opacity: t === tint ? 1 : 0, duration: 0.8, ease: 'kxEase' });
        });
      };

      // 3) Burst typographique cinétique
      const resetKinetic = () => {
        if (state.tl) { state.tl.kill(); state.tl = null; }
        if (!typeWrap) return;
        gsap.killTweensOf([typeWrap, ...typeLines]);
        gsap.set(typeWrap, { display: 'grid', opacity: 1, scale: 1, rotation: 0, visibility: 'visible' });
        gsap.set(typeLines, { opacity: TYPE_OPACITY, x: '0%' });
      };

      const playKinetic = (word: string) => {
        resetKinetic();
        if (!typeWrap || reduce) return;
        const repeated = `${word} ${word} ${word}`;
        typeLines.forEach((l) => (l.textContent = repeated));
        const tl = gsap.timeline();
        tl.to(typeWrap, { duration: 1.4, ease: 'kxEase', scale: 2.6, rotation: -90 }, 0);
        tl.to(oddLines, { keyframes: [{ x: '18%', duration: 1, ease: 'kxEase' }, { x: '-200%', duration: 1.5, ease: 'kxEase' }], stagger: 0.07 }, 0);
        tl.to(evenLines, { keyframes: [{ x: '-18%', duration: 1, ease: 'kxEase' }, { x: '200%', duration: 1.5, ease: 'kxEase' }], stagger: 0.07 }, 0);
        tl.to(typeLines, { keyframes: [{ opacity: 0.85, duration: 1, ease: 'kxEase' }, { opacity: 0, duration: 1.5, ease: 'kxEase' }], stagger: 0.05 }, 0);
        state.tl = tl;
      };

      const fadeKinetic = () => {
        if (state.tl) { state.tl.kill(); state.tl = null; }
        if (!typeWrap) return;
        gsap.timeline({
          onComplete: () => {
            gsap.set(typeWrap, { scale: 1, rotation: 0, opacity: 1 });
            gsap.set(typeLines, { opacity: TYPE_OPACITY, x: '0%' });
          },
        }).to(typeWrap, { opacity: 0, scale: 0.85, duration: 0.5, ease: 'kxEase' });
      };

      // 4) Scramble du texte dispersé
      const scrambleScatter = (dim: boolean) => {
        scatter.forEach((item) => {
          const txt = item.dataset.text || item.textContent || '';
          gsap.to(item, { opacity: dim ? 0.28 : 0.82, duration: 0.4, ease: 'kxEase' });
          if (!reduce) {
            gsap.to(item, {
              duration: 0.9,
              scrambleText: { text: txt, chars: '■▪▌▐▬01', revealDelay: 0.3, speed: 0.4 },
              ease: 'none',
            });
          }
        });
      };

      const activate = (row: HTMLElement) => {
        const id = row.dataset.rowId!;
        if (state.active === id || state.busy) return;
        state.busy = true;
        // désactive l'éventuelle ligne active
        rows.forEach((r) => r.classList.toggle('active', r === row));
        state.active = id;
        const tint = row.dataset.tint || null;
        const word = row.querySelector<HTMLElement>('.kx-word')?.dataset.word || '';

        setGlow(tint);
        playKinetic(word);
        scrambleScatter(true);

        gsap.to(row.querySelector('.kx-word'), { letterSpacing: '0.1em', duration: 0.6, ease: 'kxEase' });
        gsap.to(row, { '--kx-rowfade': 1, duration: 0.5, ease: 'kxEase' } as gsap.TweenVars);
        gsap.delayedCall(0.45, () => (state.busy = false));
      };

      const deactivate = (row: HTMLElement) => {
        const id = row.dataset.rowId!;
        if (state.active !== id) return;
        state.active = null;
        row.classList.remove('active');
        setGlow(null);
        fadeKinetic();
        scrambleScatter(false);
        gsap.to(row.querySelector('.kx-word'), { letterSpacing: '0em', duration: 0.6, ease: 'kxEase' });
        gsap.to(row, { '--kx-rowfade': 0, duration: 0.5, ease: 'kxEase' } as gsap.TweenVars);
      };

      // listeners
      const cleanups: Array<() => void> = [];
      rows.forEach((row) => {
        const zone = row.querySelector<HTMLElement>('.kx-hit');
        if (!zone) return;
        const onEnter = () => activate(row);
        const onLeave = () => deactivate(row);
        zone.addEventListener('mouseenter', onEnter);
        zone.addEventListener('mouseleave', onLeave);
        zone.addEventListener('click', onEnter);
        cleanups.push(() => {
          zone.removeEventListener('mouseenter', onEnter);
          zone.removeEventListener('mouseleave', onLeave);
          zone.removeEventListener('click', onEnter);
        });
      });

      // scramble ambiant + respiration du texte dispersé
      scatter.forEach((item) => {
        item.dataset.text = item.textContent || '';
        if (!reduce) {
          gsap.to(item, {
            opacity: 0.85,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 1.5,
          });
        }
      });

      let ambientTimer = 0;
      const ambientScramble = () => {
        if (state.active === null && scatter.length && !reduce) {
          const item = scatter[Math.floor(Math.random() * scatter.length)];
          gsap.to(item, {
            duration: 1,
            scrambleText: { text: item.dataset.text || '', chars: '■▪▌▐▬', revealDelay: 0.4, speed: 0.35 },
            ease: 'none',
          });
        }
        ambientTimer = window.setTimeout(ambientScramble, 700 + Math.random() * 2200);
      };
      if (!reduce) ambientTimer = window.setTimeout(ambientScramble, 1200);

      // cleanup global
      return () => {
        cleanups.forEach((c) => c());
        window.clearTimeout(ambientTimer);
        splits.forEach((s) => s.revert());
      };
    }, root);

    return () => ctx.revert();
  }, [variant]);

  return (
    <section ref={rootRef} className="kx" aria-label={preset.eyebrow}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* fonds : base + halos de teinte (révélés au survol) + grille */}
      <span className="kx-bg-base" aria-hidden="true" />
      <span className="kx-glow kx-glow-klein" aria-hidden="true" />
      <span className="kx-glow kx-glow-violet" aria-hidden="true" />
      <span className="kx-glow kx-glow-razz" aria-hidden="true" />
      <span className="kx-grid" aria-hidden="true" />
      <span className="kx-vignette" aria-hidden="true" />

      {/* texte dispersé (vocabulaire de marque) */}
      <div className="kx-scatter" aria-hidden="true">
        {preset.scatter.map((s, i) => (
          <span
            key={i}
            className="kx-scatter-item"
            style={{ top: s.top, left: s.left, right: s.right }}
          >
            {s.text}
          </span>
        ))}
      </div>

      {/* en-tête discret */}
      <div className="kx-head">
        <span className="kx-eyebrow">{preset.eyebrow}</span>
        <span className="kx-hint">{preset.intro}</span>
      </div>

      {/* burst typographique */}
      <div className="kx-type" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`kx-type-line ${i % 2 === 0 ? 'odd' : 'even'}`}>
            {preset.rows[i % 3].word.toLowerCase()}
          </div>
        ))}
      </div>

      {/* mots interactifs */}
      <div className="kx-rows">
        {preset.rows.map((r) => (
          <div key={r.id} className="kx-row" data-row-id={r.id} data-tint={r.tint}>
            <span className="kx-word" data-word={r.word.toLowerCase()}>{r.word}</span>
            <span className="kx-hit" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

const STYLES = `
.kx {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(80px, 12vh, 140px) 16px;
  background: #0B1428;
  color: var(--cream, #EAE9EE);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
}

/* ---- fonds ---- */
.kx-bg-base {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(70vw 60vh at 50% 38%, rgba(43,108,196,.18), transparent 64%),
    linear-gradient(178deg, #0E1B36 0%, #0B1428 52%, #070E1F 100%);
}
.kx-glow {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0;
  transition: opacity .8s cubic-bezier(.86,0,.07,1);
  mix-blend-mode: screen;
}
.kx-glow-klein  { background: radial-gradient(58vw 56vh at 28% 42%, rgba(43,108,196,.42), transparent 60%); }
.kx-glow-violet { background: radial-gradient(58vw 56vh at 50% 46%, rgba(126,92,210,.40), transparent 60%); }
.kx-glow-razz   { background: radial-gradient(58vw 56vh at 72% 42%, rgba(201,38,106,.40), transparent 60%); }
.kx-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .5;
  background-image:
    linear-gradient(rgba(168,196,244,.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168,196,244,.10) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(120% 100% at 50% 42%, #000 30%, transparent 80%);
          mask-image: radial-gradient(120% 100% at 50% 42%, #000 30%, transparent 80%);
}
.kx-vignette {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    linear-gradient(to bottom, #0B1428 0%, transparent 16%, transparent 84%, #0B1428 100%);
}

/* ---- texte dispersé ---- */
.kx-scatter { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
.kx-scatter-item {
  position: absolute;
  font-family: ui-monospace, 'SF Mono', 'Roboto Mono', 'TheGoodMonolith', Menlo, monospace;
  font-size: .72rem; letter-spacing: .12em; text-transform: uppercase;
  color: rgba(234,233,238,.8); opacity: .8; white-space: nowrap;
}

/* ---- en-tête ---- */
.kx-head {
  position: absolute; top: clamp(26px, 5vh, 54px); left: 0; right: 0; z-index: 6;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  pointer-events: none; text-align: center;
}
.kx-eyebrow {
  font-family: var(--font-playfair), 'Noto Serif Display', serif;
  font-style: italic; font-size: clamp(1rem, 1.6vw, 1.35rem);
  color: rgba(234,233,238,.9);
}
.kx-hint {
  font-size: .64rem; letter-spacing: .32em; text-transform: uppercase;
  color: rgba(168,196,244,.55);
}

/* ---- burst typographique ---- */
.kx-type {
  position: absolute; top: 50%; left: 50%; z-index: 4;
  width: 100vmax; height: 100vmax; margin-top: -50vmax; margin-left: -50vmax;
  display: grid; align-content: center; justify-items: center; text-align: center;
  transform-style: preserve-3d; pointer-events: none; will-change: transform;
}
.kx-type-line {
  white-space: nowrap; line-height: .78; font-weight: 700;
  font-family: var(--font-playfair), 'Noto Serif Display', serif;
  font-size: clamp(5rem, 14vh, 12rem);
  color: #ffffff; opacity: .05; user-select: none; text-transform: lowercase;
}
.kx-type-line.odd { z-index: 4; }
.kx-type-line.even { z-index: 6; }

/* ---- mots interactifs ---- */
.kx-rows {
  position: relative; z-index: 5;
  display: flex; flex-direction: column; align-items: center;
  gap: clamp(2px, 1vh, 14px);
}
.kx-row {
  --kx-rowfade: 0;
  position: relative; display: flex; align-items: center; justify-content: center;
  height: clamp(74px, 13vh, 130px); width: 100%;
}
.kx-word {
  position: relative; z-index: 1;
  font-family: var(--font-playfair), 'Noto Serif Display', serif;
  font-weight: 500; text-transform: uppercase; letter-spacing: 0;
  font-size: clamp(2.6rem, 9vw, 8.5rem); line-height: 1;
  color: rgba(234,233,238,.42);
  transition: color .5s cubic-bezier(.86,0,.07,1), text-shadow .5s ease;
  will-change: letter-spacing, color;
}
.kx-row.active .kx-word {
  color: #fff;
  text-shadow: 0 0 38px rgba(255,255,255,.28);
}
.kx-hit { position: absolute; inset: -6px 0; z-index: 3; cursor: pointer; }

/* responsive */
@media (max-width: 992px) {
  .kx-word { font-size: clamp(2.4rem, 11vw, 6rem); }
  .kx-type-line { font-size: clamp(3.5rem, 11vh, 8rem); }
  .kx-scatter-item { font-size: .64rem; }
}
@media (max-width: 600px) {
  .kx { min-height: 86vh; }
  .kx-word { font-size: clamp(2.1rem, 13vw, 4.4rem); }
  .kx-row { height: clamp(58px, 11vh, 88px); }
  .kx-scatter-item { font-size: .56rem; letter-spacing: .08em; }
  .kx-type-line { font-size: clamp(2.6rem, 9vh, 6rem); }
}

@media (prefers-reduced-motion: reduce) {
  .kx-glow { transition: none; }
  .kx-type { display: none !important; }
  .kx-word { color: rgba(234,233,238,.75); }
}
`;

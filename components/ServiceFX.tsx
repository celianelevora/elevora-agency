'use client';

/**
 * ServiceFX — boite a outils d'animations premium pour les pages de service.
 * Tout est self-contained (un seul fichier, styles inline + un bloc <style> global
 * injecte une seule fois). Aucune dependance hors framer-motion / react / gsap deja
 * presents dans le projet.
 *
 * Composants exportes :
 *  - <SectionBg>       : section pleine largeur avec image de fond en parallax doux,
 *                         voile de lisibilite optionnel, et reveal au scroll.
 *  - <Reveal>          : wrapper d'apparition (fade + blur + translate) au scroll.
 *  - <RevealText>      : titre dont les mots apparaissent en cascade (mot a mot).
 *  - <Magnetic>        : enfant qui suit legerement le curseur (effet aimant).
 *  - <Counter>         : nombre qui s'incremente quand il entre dans le viewport.
 *  - <Tilt>            : carte qui s'incline en 3D selon la position du curseur.
 *  - <GlowField>       : halos colores animes (klein / framboise) pour fonds sombres.
 *  - <Marbled>         : fin grain + veine marbre par-dessus un fond (texture premium).
 */

import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
  type UseInViewOptions,
} from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Styles globaux injectes une seule fois                              */
/* ------------------------------------------------------------------ */
const FX_STYLE_ID = 'service-fx-styles';
const FX_CSS = `
.svc-bg { position: relative; isolation: isolate; overflow: clip; }
.svc-bg__img {
  position: absolute; inset: -12% 0 -12% 0; z-index: -2;
  background-size: cover; background-position: center;
  background-repeat: no-repeat; will-change: transform;
}
.svc-bg__scrim { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.svc-bg__content { position: relative; z-index: 1; }

/* Eyebrow premium reutilise localement */
.svc-eyebrow {
  display: inline-flex; align-items: center; gap: 9px;
  font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
  font-weight: 600;
}
.svc-eyebrow::before {
  content: ''; width: 26px; height: 1px; background: currentColor; opacity: .5;
}

/* Carte verre (glassmorphism) sobre */
.svc-glass {
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
}

@media (prefers-reduced-motion: reduce) {
  .svc-bg__img { inset: 0 !important; transform: none !important; }
}
`;

function useFxStyles() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(FX_STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = FX_STYLE_ID;
    el.textContent = FX_CSS;
    document.head.appendChild(el);
  }, []);
}

/* ------------------------------------------------------------------ */
/* SectionBg — image de fond + parallax + voile                        */
/* ------------------------------------------------------------------ */
type Scrim =
  | 'none'
  | 'dark'        // voile sombre (texte clair)
  | 'dark-strong'
  | 'light'       // voile clair (texte sombre)
  | 'light-strong'
  | 'left-dark'   // degrade sombre depuis la gauche (texte clair a gauche)
  | 'left-light'
  | 'bottom-dark';

interface SectionBgProps {
  image: string;
  children: ReactNode;
  scrim?: Scrim;
  /** intensite du parallax en px (0 = aucun). */
  parallax?: number;
  /** padding vertical de la section. */
  py?: number;
  /** min-height optionnelle (ex '100vh'). */
  minHeight?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
}

const SCRIMS: Record<Scrim, string> = {
  none: 'transparent',
  dark: 'linear-gradient(180deg, rgba(10,16,30,.55), rgba(10,16,30,.68))',
  'dark-strong': 'linear-gradient(180deg, rgba(8,13,26,.74), rgba(8,13,26,.82))',
  light: 'linear-gradient(180deg, rgba(234,233,238,.55), rgba(234,233,238,.72))',
  'light-strong': 'linear-gradient(180deg, rgba(234,233,238,.78), rgba(234,233,238,.88))',
  'left-dark': 'linear-gradient(90deg, rgba(10,16,30,.82) 0%, rgba(10,16,30,.55) 38%, rgba(10,16,30,.12) 72%, transparent 100%)',
  'left-light': 'linear-gradient(90deg, rgba(234,233,238,.9) 0%, rgba(234,233,238,.6) 40%, rgba(234,233,238,.08) 78%, transparent 100%)',
  'bottom-dark': 'linear-gradient(180deg, transparent 0%, rgba(10,16,30,.2) 45%, rgba(10,16,30,.72) 100%)',
};

export function SectionBg({
  image,
  children,
  scrim = 'none',
  parallax = 60,
  py = 120,
  minHeight,
  id,
  className = '',
  style,
  contentClassName = '',
}: SectionBgProps) {
  useFxStyles();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <section
      ref={ref}
      id={id}
      className={`svc-bg ${className}`}
      style={{
        padding: `${py}px 0`,
        minHeight,
        display: minHeight ? 'flex' : undefined,
        alignItems: minHeight ? 'center' : undefined,
        ...style,
      }}
    >
      <motion.div
        className="svc-bg__img"
        style={{ backgroundImage: `url(${image})`, y }}
      />
      {scrim !== 'none' && (
        <div className="svc-bg__scrim" style={{ background: SCRIMS[scrim] }} />
      )}
      <div className={`container svc-bg__content ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — apparition fade + blur + translate au scroll               */
/* ------------------------------------------------------------------ */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  duration?: number;
  once?: boolean;
  margin?: UseInViewOptions['margin'];
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'span' | 'li';
}

export function Reveal({
  children,
  delay = 0,
  y = 22,
  blur = 8,
  duration = 0.7,
  once = true,
  margin = '-80px',
  className,
  style,
  as = 'div',
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });
  const MotionTag = motion[as];
  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, filter: `blur(${blur}px)` }
      }
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* RevealText — titre mot a mot en cascade                             */
/* ------------------------------------------------------------------ */
interface RevealTextProps {
  text: string;
  /** mots a mettre en italique serif (separes par |). */
  emphasis?: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3';
}

export function RevealText({
  text,
  emphasis = '',
  className,
  style,
  delay = 0,
  stagger = 0.045,
  as = 'h2',
}: RevealTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const emphasisSet = new Set(
    emphasis
      .split('|')
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean)
  );
  const words = text.split(' ');
  const Tag: 'h1' | 'h2' | 'h3' = as;

  const inner = (
    <>
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?;:]/g, '').toLowerCase();
        const isEmph = emphasisSet.has(clean);
        return (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          >
            <motion.span
              style={{
                display: 'inline-block',
                fontFamily: isEmph ? 'var(--serif)' : undefined,
                fontStyle: isEmph ? 'italic' : undefined,
                color: isEmph ? 'var(--pink)' : undefined,
                fontWeight: isEmph ? 400 : undefined,
              }}
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : { y: '110%' }}
              transition={{
                duration: 0.7,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </>
  );

  if (Tag === 'h1') return <h1 ref={ref as never} className={className} style={style}>{inner}</h1>;
  if (Tag === 'h3') return <h3 ref={ref as never} className={className} style={style}>{inner}</h3>;
  return <h2 ref={ref as never} className={className} style={style}>{inner}</h2>;
}

/* ------------------------------------------------------------------ */
/* Magnetic — suit le curseur                                          */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, display: 'inline-block', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Counter — nombre incremente au scroll                               */
/* ------------------------------------------------------------------ */
export function Counter({
  to,
  from = 0,
  duration = 1.6,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
  style,
}: {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Tilt — carte 3D au survol                                           */
/* ------------------------------------------------------------------ */
export function Tilt({
  children,
  max = 8,
  className,
  style,
  glare = false,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  style?: CSSProperties;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
        position: 'relative',
        ...style,
      }}
      className={className}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: useTransform(
              [gx, gy],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,.16), transparent 55%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* GlowField — halos colores animes pour fonds sombres                 */
/* ------------------------------------------------------------------ */
export function GlowField({
  variant = 'klein-pink',
  opacity = 1,
}: {
  variant?: 'klein-pink' | 'pink-klein' | 'triple';
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity }}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: 620,
          height: 620,
          borderRadius: '50%',
          filter: 'blur(80px)',
          background:
            variant === 'pink-klein'
              ? 'radial-gradient(circle, rgba(201,38,106,.34), transparent 70%)'
              : 'radial-gradient(circle, rgba(43,108,196,.34), transparent 70%)',
          top: '-12%',
          left: '-8%',
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: 540,
          height: 540,
          borderRadius: '50%',
          filter: 'blur(80px)',
          background:
            variant === 'pink-klein'
              ? 'radial-gradient(circle, rgba(43,108,196,.30), transparent 70%)'
              : 'radial-gradient(circle, rgba(201,38,106,.30), transparent 70%)',
          bottom: '-14%',
          right: '-6%',
        }}
        animate={{ x: [0, -36, 0], y: [0, -26, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
      />
      {variant === 'triple' && (
        <motion.div
          style={{
            position: 'absolute',
            width: 420,
            height: 420,
            borderRadius: '50%',
            filter: 'blur(70px)',
            background: 'radial-gradient(circle, rgba(232,82,126,.22), transparent 70%)',
            top: '40%',
            left: '46%',
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marbled — grain + veine marbre subtile par-dessus un fond           */
/* ------------------------------------------------------------------ */
export function Marbled({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'overlay',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

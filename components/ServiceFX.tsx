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

import Link from 'next/link';
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
.svc-bg__fade {
  position: absolute; left: 0; right: 0; height: 150px; z-index: 0;
  pointer-events: none;
}
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

/* Paragraphe d'introduction (lead) reutilise localement */
.svc-lead {
  font-size: clamp(16px, 1.4vw, 18.5px);
  line-height: 1.68;
  color: var(--ink-soft);
  font-weight: 300;
}

/* Carte verre (glassmorphism) sobre */
.svc-glass {
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
}

/* Bloc tarif riche */
.svc-price { display: grid; grid-template-columns: minmax(0,0.82fr) 1px minmax(0,1.18fr); }
@media (max-width: 880px) {
  .svc-price { grid-template-columns: 1fr; }
  .svc-price > .svc-price-divider { display: none; }
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
  /** halo lumineux anime derriere le contenu (defaut: 'none'). */
  glow?: 'none' | 'klein-pink' | 'pink-klein' | 'blush';
  /** lumiere qui suit le curseur et revele la texture (defaut: false). */
  spotlight?: boolean;
  /** position de l'image de fond (defaut 'center'). */
  bgPosition?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
}

const SCRIMS: Record<Scrim, string> = {
  none: 'transparent',
  // Voiles nettement alleges : la texture (marbre, olivier, meandre, vase)
  // doit RESTER visible. Le texte tient grace a la colonne + au calage des
  // motifs sur les bords des images.
  dark: 'linear-gradient(180deg, rgba(13,19,34,.30), rgba(13,19,34,.48))',
  'dark-strong': 'linear-gradient(180deg, rgba(11,16,28,.46), rgba(11,16,28,.60))',
  light: 'linear-gradient(180deg, rgba(234,233,238,.30), rgba(234,233,238,.48))',
  'light-strong': 'linear-gradient(180deg, rgba(234,233,238,.48), rgba(234,233,238,.62))',
  'left-dark': 'linear-gradient(90deg, rgba(11,16,28,.70) 0%, rgba(11,16,28,.42) 40%, rgba(11,16,28,.1) 74%, transparent 100%)',
  'left-light': 'linear-gradient(90deg, rgba(234,233,238,.8) 0%, rgba(234,233,238,.5) 42%, rgba(234,233,238,.06) 80%, transparent 100%)',
  'bottom-dark': 'linear-gradient(180deg, transparent 0%, rgba(11,16,28,.16) 45%, rgba(11,16,28,.6) 100%)',
};

/** Tonalite de fond derivee du voile (base solide + couleur des fondus de bord). */
function toneBase(scrim: Scrim): string {
  return scrim.includes('dark') ? '#0E1322' : '#EAE9EE';
}

export function SectionBg({
  image,
  children,
  scrim = 'none',
  parallax = 60,
  py = 120,
  minHeight,
  glow = 'none',
  spotlight = false,
  bgPosition,
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
  const base = toneBase(scrim);

  function onSpotMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--svc-mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--svc-my', `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <section
      ref={ref}
      id={id}
      onMouseMove={spotlight ? onSpotMove : undefined}
      className={`svc-bg ${className}`}
      style={{
        padding: `${py}px 0`,
        minHeight,
        display: minHeight ? 'flex' : undefined,
        alignItems: minHeight ? 'center' : undefined,
        /* Base solide derriere l'image : supprime tout effet de
           "transparence", garantit une tonalite franche. */
        background: base,
        ...style,
      }}
    >
      <motion.div
        className="svc-bg__img"
        style={{ backgroundImage: `url(${image})`, y, ...(bgPosition ? { backgroundPosition: bgPosition } : {}) }}
      />
      {scrim !== 'none' && (
        <div className="svc-bg__scrim" style={{ background: SCRIMS[scrim] }} />
      )}
      {/* Halo lumineux anime (jeu de lumiere) — sous le contenu (z0) */}
      {glow !== 'none' && (
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {glow === 'blush' ? (
            <>
              <motion.div
                style={{
                  position: 'absolute', width: 680, height: 680, borderRadius: '50%',
                  filter: 'blur(90px)', top: '-18%', left: '-10%',
                  background: 'radial-gradient(circle, rgba(201,38,106,.12), transparent 70%)',
                }}
                animate={{ x: [0, 36, 0], y: [0, 26, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                style={{
                  position: 'absolute', width: 560, height: 560, borderRadius: '50%',
                  filter: 'blur(90px)', bottom: '-16%', right: '-8%',
                  background: 'radial-gradient(circle, rgba(27,79,138,.10), transparent 70%)',
                }}
                animate={{ x: [0, -30, 0], y: [0, -22, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          ) : (
            <GlowField variant={glow} opacity={0.7} />
          )}
        </div>
      )}
      {/* Lumiere qui suit le curseur — revele la texture (z0) */}
      {spotlight && (
        <div
          aria-hidden
          className="svc-bg__spot"
          style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            mixBlendMode: 'screen',
            background:
              'radial-gradient(420px circle at var(--svc-mx,50%) var(--svc-my,30%), rgba(140,178,238,.20), rgba(140,178,238,.05) 40%, transparent 66%)',
          }}
        />
      )}
      {/* Fondus haut + bas : l'image se fond dans la tonalite de la section
          => transitions parfaitement liees entre sections (plus de "cut"). */}
      <div
        aria-hidden
        className="svc-bg__fade"
        style={{ top: 0, background: `linear-gradient(to bottom, ${base}, transparent)` }}
      />
      <div
        aria-hidden
        className="svc-bg__fade"
        style={{ bottom: 0, background: `linear-gradient(to top, ${base}, transparent)` }}
      />
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
                // Cormorant/Cochin en italique paraissent plus petits : on compense
                fontSize: isEmph ? '1.1em' : undefined,
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

/* ------------------------------------------------------------------ */
/* PriceBlock — bloc tarif riche (prix + delai + inclus + paiement)    */
/* ------------------------------------------------------------------ */
interface PriceBlockProps {
  theme?: 'light' | 'dark';
  priceLabel?: string;
  price: string;
  unit?: string;
  priceFontSize?: string;
  delayLabel?: string;
  delay: string;
  includedTitle?: string;
  included: string[];
  note?: string;
  ctaLabel: string;
  ctaHref: string;
}

export function PriceBlock({
  theme = 'light',
  priceLabel = 'À partir de',
  price,
  unit = '€',
  priceFontSize = 'clamp(44px,6vw,66px)',
  delayLabel = 'Délai moyen',
  delay,
  includedTitle = 'Tout est compris',
  included,
  note,
  ctaLabel,
  ctaHref,
}: PriceBlockProps) {
  const dark = theme === 'dark';
  const ink = dark ? '#EAE9EE' : 'var(--ink)';
  const soft = dark ? 'rgba(234,233,238,.74)' : 'var(--ink-soft)';
  const muted = dark ? 'rgba(234,233,238,.55)' : 'var(--ink-muted)';
  const cardBg = dark ? 'rgba(255,255,255,.045)' : 'rgba(255,255,255,.62)';
  const cardBorder = dark ? '0.5px solid rgba(234,233,238,.16)' : '0.5px solid rgba(255,255,255,.85)';
  const line = dark ? 'rgba(234,233,238,.14)' : 'var(--line)';
  const checkBg = dark ? 'rgba(43,108,196,.2)' : 'rgba(27,79,138,.1)';
  const accent = dark ? 'var(--klein-bright)' : 'var(--klein)';

  return (
    <Reveal>
      <div
        className="svc-glass svc-price"
        style={{
          background: cardBg,
          border: cardBorder,
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: dark
            ? '0 40px 90px -50px rgba(0,0,0,.6)'
            : '0 40px 90px -50px rgba(26,26,46,.4)',
        }}
      >
        {/* Colonne gauche : prix / delai / paiement / CTA */}
        <div style={{ padding: 'clamp(32px,4vw,46px)', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, color: muted, marginBottom: 8 }}>{priceLabel}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ fontSize: priceFontSize, fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--klein-bright)', lineHeight: 1, whiteSpace: 'nowrap' }}>
                {price}
              </span>
              {unit && (
                <span style={{ fontSize: 24, fontWeight: 500, color: 'var(--klein-bright)' }}>{unit}</span>
              )}
            </div>
          </div>
          <div style={{ height: 1, background: line }} />
          <div>
            <div style={{ fontSize: 13, color: muted, marginBottom: 8 }}>{delayLabel}</div>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(26px,3vw,34px)', color: 'var(--pink)', lineHeight: 1.1 }}>
              {delay}
            </div>
          </div>
          {note && (
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: soft, margin: 0 }}>{note}</p>
          )}
          <div style={{ marginTop: 'auto', paddingTop: 4 }}>
            <Link href={ctaHref} className="cta-big" style={{ display: 'inline-flex' }}>
              {ctaLabel}
              <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* separateur vertical (masque en mobile) */}
        <div className="svc-price-divider" style={{ background: line }} />

        {/* Colonne droite : tout est compris */}
        <div style={{ padding: 'clamp(32px,4vw,46px)' }}>
          <div style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: accent, marginBottom: 24 }}>
            {includedTitle}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: '15px 26px' }}>
            {included.map((it) => (
              <div key={it} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: checkBg,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 1,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: ink }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* MiniFaq — questions frequentes (toutes visibles, layout editorial)  */
/* ------------------------------------------------------------------ */
interface MiniFaqProps {
  theme?: 'light' | 'dark';
  eyebrow?: string;
  title: string;
  emphasis?: string;
  items: { q: string; a: string }[];
}

export function MiniFaq({
  theme = 'light',
  eyebrow = 'Questions fréquentes',
  title,
  emphasis = '',
  items,
}: MiniFaqProps) {
  const dark = theme === 'dark';
  const ink = dark ? '#EAE9EE' : 'var(--ink)';
  const soft = dark ? 'rgba(234,233,238,.7)' : 'var(--ink-soft)';
  const line = dark ? 'rgba(234,233,238,.14)' : 'var(--line)';
  const accent = dark ? 'var(--pink)' : 'var(--klein)';

  return (
    <>
      <div style={{ maxWidth: 600, marginBottom: 52 }}>
        <Reveal>
          <span className="svc-eyebrow" style={{ color: dark ? 'rgba(234,233,238,.7)' : 'var(--klein)' }}>
            {eyebrow}
          </span>
        </Reveal>
        <RevealText
          as="h2"
          text={title}
          emphasis={emphasis}
          style={{ margin: '20px 0 0', color: ink, fontSize: 'clamp(28px,3.8vw,46px)', lineHeight: 1.1 }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))', gap: '0 64px' }}>
        {items.map((it, i) => (
          <Reveal key={it.q} delay={(i % 2) * 0.08} style={{ padding: '26px 0', borderTop: `0.5px solid ${line}` }}>
            <h3 style={{ fontSize: 18, color: ink, marginBottom: 10, display: 'flex', gap: 12, lineHeight: 1.35 }}>
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: accent, flexShrink: 0 }}>Q.</span>
              <span>{it.q}</span>
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: soft, paddingLeft: 30, margin: 0 }}>{it.a}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}

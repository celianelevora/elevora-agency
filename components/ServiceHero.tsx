'use client';

/**
 * ServiceHero — hero des pages de service.
 * L'image (prop `image`, = img-1) est posee en fond. Quand `below` est fourni,
 * l'image couvre HERO + PARTIE 2 d'un seul tenant, sans coupure entre les deux
 * (meme principe que la page e-commerce). La partie 2 est rendue sous le hero,
 * sur la meme image continue. Sinon, le hero occupe ~84vh seul.
 *
 * Themes :
 *  - 'dark'  : image navy, texte clair
 *  - 'light' : image cream/blush, texte sombre
 */

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlowField } from '@/components/ServiceFX';

type CTA = { label: string; href: string };

interface ServiceHeroProps {
  image: string;
  theme: 'dark' | 'light';
  eyebrow: string;
  title: ReactNode;
  lead: string;
  primary: CTA;
  secondary?: CTA;
  /** petit bandeau de "tags" sous les boutons (optionnel). */
  tags?: string[];
  /** halos colores animes derriere l'image (defaut: off). */
  glow?: boolean;
  /** Contenu de la "partie 2" rendu SOUS le hero, sur la MEME image continue
      (img-1). Quand fourni, l'image couvre hero + partie 2 sans coupure. */
  below?: ReactNode;
}

export default function ServiceHero({
  image,
  theme,
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  tags,
  glow = false,
  below,
}: ServiceHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const isDark = theme === 'dark';
  const ink = isDark ? '#EAE9EE' : 'var(--ink)';
  const leadCol = isDark ? 'rgba(234,233,238,.82)' : 'var(--ink-soft)';
  const eyebrowCol = isDark ? 'rgba(234,233,238,.7)' : 'var(--klein)';
  const baseColor = isDark ? '#1A1A2E' : '#EAE9EE';

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const heroContent = (
    <motion.div
      className="container"
      style={{ position: 'relative', zIndex: 2, y: contentY, opacity: contentOpacity }}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.span variants={item} className="svc-eyebrow" style={{ color: eyebrowCol, marginBottom: 26 }}>
        {eyebrow}
      </motion.span>

      <motion.h1 variants={item} style={{ margin: '18px 0 30px', maxWidth: 860, color: ink, lineHeight: 1.02 }}>
        {title}
      </motion.h1>

      <motion.p variants={item} className="lead" style={{ marginBottom: 44, maxWidth: 600, color: leadCol }}>
        {lead}
      </motion.p>

      <motion.div variants={item} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }} style={{ display: 'inline-flex' }}>
          <Link
            href={primary.href}
            style={{
              background: 'var(--pink)',
              color: '#fff',
              padding: '16px 30px',
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              boxShadow: '0 16px 40px rgba(201,38,106,.4)',
            }}
          >
            {primary.label}
            <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
        {secondary && (
          <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }} style={{ display: 'inline-flex' }}>
            <Link
              href={secondary.href}
              style={{
                color: ink,
                padding: '16px 28px',
                fontSize: 15,
                fontWeight: 500,
                border: isDark ? '0.5px solid rgba(234,233,238,.32)' : '0.5px solid var(--line-strong)',
                borderRadius: 999,
                textDecoration: 'none',
                backdropFilter: 'blur(6px)',
                display: 'inline-flex',
              }}
            >
              {secondary.label}
            </Link>
          </motion.div>
        )}
      </motion.div>

      {tags && tags.length > 0 && (
        <motion.div variants={item} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 40 }}>
          {tags.map((t) => (
            <motion.span
              key={t}
              whileHover={{ y: -4, scale: 1.06, backgroundColor: isDark ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.85)' }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
              style={{
                fontSize: 12.5,
                letterSpacing: '.02em',
                padding: '8px 16px',
                borderRadius: 999,
                cursor: 'default',
                color: isDark ? 'rgba(234,233,238,.86)' : 'var(--ink-soft)',
                border: isDark ? '0.5px solid rgba(234,233,238,.2)' : '0.5px solid var(--line)',
                background: isDark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.5)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );

  // Offset vertical UNIFORME du texte de hero : meme distance haut-de-page -> texte
  // sur TOUTES les pages de service, quel que soit le mode (image hero seule ou
  // hero + partie 2). Le hero remplit le viewport pour qu'aucune section suivante
  // ne depasse sous une coupure nette.
  const HERO_TOP = 'clamp(190px, 25vh, 310px)';
  const heroScreen = {
    minHeight: 'calc(100vh + 76px)',
    paddingTop: HERO_TOP,
    paddingBottom: 64,
    position: 'relative',
    zIndex: 2,
    width: '100%',
  } as const;

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        marginTop: -76,
        background: baseColor,
      }}
    >
      {/* Image de fond continue (img-1) — couvre hero + partie 2 si `below` */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-6% 0 -6% 0',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          y: imgY,
          zIndex: 0,
        }}
      />
      {glow && (
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.55, mixBlendMode: 'screen' }}>
          <GlowField variant="klein-pink" />
        </div>
      )}
      {/* Voile de lisibilite cale sur le theme */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: isDark
            ? 'linear-gradient(90deg, rgba(10,16,30,.66) 0%, rgba(10,16,30,.42) 40%, rgba(10,16,30,.12) 72%, transparent 100%)'
            : 'linear-gradient(90deg, rgba(234,233,238,.82) 0%, rgba(234,233,238,.5) 42%, rgba(234,233,238,.1) 78%, transparent 100%)',
        }}
      />
      {/* Vignette douce */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: isDark
            ? 'radial-gradient(120% 80% at 70% 30%, transparent 40%, rgba(8,12,24,.45) 100%)'
            : 'radial-gradient(120% 80% at 70% 30%, transparent 45%, rgba(26,26,46,.06) 100%)',
        }}
      />
      {/* Raccord bas : fondu vers la couleur de base => transition vers la section suivante */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 160,
          zIndex: 1,
          pointerEvents: 'none',
          background: `linear-gradient(to bottom, transparent, ${baseColor})`,
        }}
      />

      {below ? (
        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={heroScreen}>{heroContent}</div>
          <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 'clamp(72px,9vw,124px)' }}>
            {below}
          </div>
        </div>
      ) : (
        <div style={heroScreen}>{heroContent}</div>
      )}
    </section>
  );
}

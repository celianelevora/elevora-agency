'use client';

/**
 * ServiceHero — hero des pages de service.
 * Particularite demandee : le hero NE possede PAS sa propre image, il herite
 * de l'image de la section 2 (passee en prop `image`). L'image est posee en
 * fond, et un long degrade vers le bas assure une continuite visuelle parfaite
 * avec la section 2 qui suit (qui reutilise la meme image).
 *
 * Variantes de theme :
 *  - 'dark'  : image navy, texte clair (titre cream, lead clair)
 *  - 'light' : image cream/blush, texte sombre (titre encre, lead doux)
 */

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
}: ServiceHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // L'image se deplace lentement vers le haut, le contenu monte un peu plus vite.
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const isDark = theme === 'dark';
  const ink = isDark ? '#EAE9EE' : 'var(--ink)';
  const leadCol = isDark ? 'rgba(234,233,238,.82)' : 'var(--ink-soft)';
  const eyebrowCol = isDark ? 'rgba(234,233,238,.7)' : 'var(--klein)';
  // raccord bas vers la couleur de base de la section 2
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

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        /* Annule le padding-top:76 de <main> pour que l'image colle au
           tout en haut, sous le header flottant. Meme principe que la
           page Agence (margin-top:-76 / padding-top:76). */
        marginTop: -76,
        padding: '206px 0 150px',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        background: baseColor,
      }}
    >
      {/* Image de fond (heritee de la section 2) */}
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
      {/* Vignette douce pour la profondeur (sans assombrir le texte) */}
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
      {/* Raccord bas : fondu vers la couleur de base => continuite avec S2 */}
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

      <motion.div
        className="container"
        style={{ position: 'relative', zIndex: 2, y: contentY, opacity: contentOpacity }}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={item}
          className="svc-eyebrow"
          style={{ color: eyebrowCol, marginBottom: 26 }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          style={{ margin: '18px 0 30px', maxWidth: 860, color: ink, lineHeight: 1.02 }}
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="lead"
          style={{ marginBottom: 44, maxWidth: 600, color: leadCol }}
        >
          {lead}
        </motion.p>

        <motion.div
          variants={item}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
        >
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
              transition: 'transform .22s, box-shadow .22s',
            }}
          >
            {primary.label}
            <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              style={{
                color: ink,
                padding: '16px 28px',
                fontSize: 15,
                fontWeight: 500,
                border: isDark
                  ? '0.5px solid rgba(234,233,238,.32)'
                  : '0.5px solid var(--line-strong)',
                borderRadius: 999,
                textDecoration: 'none',
                backdropFilter: 'blur(6px)',
              }}
            >
              {secondary.label}
            </Link>
          )}
        </motion.div>

        {tags && tags.length > 0 && (
          <motion.div
            variants={item}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 40 }}
          >
            {tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 12.5,
                  letterSpacing: '.02em',
                  padding: '8px 16px',
                  borderRadius: 999,
                  color: isDark ? 'rgba(234,233,238,.86)' : 'var(--ink-soft)',
                  border: isDark
                    ? '0.5px solid rgba(234,233,238,.2)'
                    : '0.5px solid var(--line)',
                  background: isDark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Indicateur de scroll discret */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 24,
            height: 38,
            borderRadius: 999,
            border: `1.5px solid ${isDark ? 'rgba(234,233,238,.4)' : 'rgba(26,26,46,.3)'}`,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 7,
          }}
        >
          <div
            style={{
              width: 3,
              height: 8,
              borderRadius: 999,
              background: isDark ? 'rgba(234,233,238,.6)' : 'rgba(26,26,46,.45)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

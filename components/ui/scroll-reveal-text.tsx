'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/* ----------------------------------------------------------------------------
   ScrollRevealText — chaque mot du texte passe d'opacite 0.2 a 1 au fur et a
   mesure que la zone remonte dans le viewport (effet Linear / Apple).
   Lie au scroll, donc reactif quand on remonte (les mots redeviennent palis
   si on scrolle vers le haut).

   Usage :
     <ScrollRevealText text="Texte long a reveler mot par mot..." />
     <ScrollRevealText text="..." className="agence-origine-p" as="p" />
   -------------------------------------------------------------------------- */

interface ScrollRevealTextProps {
  text: string;
  /** Tag HTML utilise. Defaut "p". */
  as?: 'p' | 'div' | 'span';
  className?: string;
  /** Opacite des mots avant qu'ils soient atteints par le scroll. Defaut 0.2. */
  fadeOpacity?: number;
}

export default function ScrollRevealText({
  text,
  as = 'p',
  className,
  fadeOpacity = 0.2,
}: ScrollRevealTextProps) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    // Demarre quand le haut de l'element atteint 85% du viewport,
    // finit quand il atteint 25% (zone confortable de lecture).
    offset: ['start 0.85', 'start 0.25'],
  });

  const words = text.split(' ');
  const Tag = motion[as];

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} fadeOpacity={fadeOpacity}>
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  fadeOpacity: number;
}

function Word({ children, progress, range, fadeOpacity }: WordProps) {
  const opacity = useTransform(progress, range, [fadeOpacity, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
      {' '}
    </motion.span>
  );
}

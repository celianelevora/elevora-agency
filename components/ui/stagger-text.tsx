'use client';

import * as React from 'react';
import { type Transition, type HTMLMotionProps, motion, useInView, useReducedMotion } from 'framer-motion';

/* ----------------------------------------------------------------------------
   StaggerText — animation lettre par lettre, declenchee au scroll.
   Adapte de la version "motion/react" fournie pour utiliser framer-motion
   (deja installe sur le projet) et un <motion.span> en racine afin de pouvoir
   etre insere INLINE dans des h1/h2 sans casser la semantique HTML.

   Usage typique :
     <h1>
       <StaggerText text="Trois personnes." />
     </h1>

   Plusieurs StaggerText peuvent coexister dans le meme heading (ex. partie
   regular + partie italique stylisee separement). Chaque instance gere son
   propre stagger et son propre IntersectionObserver.
   -------------------------------------------------------------------------- */

const DEFAULT_EASE = [0.25, 0.1, 0.25, 1] as const;

export type TransformDirection = 'top' | 'bottom' | 'left' | 'right' | 'z';

const transformVariants = (direction: TransformDirection) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'top' ? '-100%' : direction === 'bottom' ? '100%' : 0,
    scale: direction === 'z' ? 0 : 1,
    opacity: 0,
  },
  visible: { x: 0, y: 0, scale: 1, opacity: 1 },
});

interface WordProps {
  word: string;
  transition: Transition;
  direction: TransformDirection;
}

function Word({ word, transition, direction }: WordProps) {
  const characters = Array.from(word); // gere correctement les accents unicodes
  return (
    <span className="inline-block whitespace-nowrap align-top">
      {characters.map((char, index) => (
        <span key={index} className="inline-block">
          <motion.span
            className="inline-block"
            variants={transformVariants(direction)}
            transition={transition}
          >
            {/* &nbsp; insecable pour ne pas perdre les espaces eventuels en debut */}
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export interface StaggerTextProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  text: string;
  /** Delai entre chaque caractere (s). Defaut 0.04. */
  stagger?: number;
  /** Override de la transition par defaut (ease + duration). */
  transition?: Transition;
  /** Direction d'apparition des lettres. Defaut "bottom" (montee). */
  direction?: TransformDirection;
  /** Proportion de l'element visible pour declencher l'animation. Defaut 0.3. */
  amount?: number;
  className?: string;
}

export function StaggerText({
  text,
  stagger = 0.04,
  transition,
  direction = 'bottom',
  amount = 0.3,
  className,
  ...rest
}: StaggerTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');
  const charTransition: Transition = transition ?? { ease: DEFAULT_EASE, duration: 0.5 };

  // Accessibilite : si l'utilisateur a demande moins de mouvement, on rend le
  // texte directement dans son etat final, sans animation lettre par lettre.
  if (prefersReducedMotion) {
    return (
      <span className={className} style={{ display: 'inline-block', ...((rest.style as React.CSSProperties) ?? {}) }}>
        {text}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      transition={{ staggerChildren: stagger }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ display: 'inline-block', ...(rest.style ?? {}) }}
      {...rest}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Word word={word} transition={charTransition} direction={direction} />
          {index < words.length - 1 && '\u00A0'}
        </React.Fragment>
      ))}
    </motion.span>
  );
}

export default StaggerText;

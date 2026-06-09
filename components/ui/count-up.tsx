'use client';

import * as React from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

/* ----------------------------------------------------------------------------
   CountUp — compteur qui anime de `from` (defaut 0) vers `to` quand l'element
   entre dans le viewport. Easing ease-out-expo pour finir lentement (effet
   premium, style Apple keynote).

   Usage :
     <CountUp to={100} suffix="%" />
     <CountUp to={1.06} decimals={2} />
     <CountUp to={15} suffix=" ans" />
   -------------------------------------------------------------------------- */

interface CountUpProps {
  to: number;
  from?: number;
  /** Nombre de decimales a afficher. Defaut 0. */
  decimals?: number;
  /** Suffixe colle apres le nombre (ex. "%", " ans"). Defaut "". */
  suffix?: string;
  /** Prefixe colle avant le nombre (ex. "+", "~"). Defaut "". */
  prefix?: string;
  /** Duree de l'animation en secondes. Defaut 2. */
  duration?: number;
  className?: string;
}

export default function CountUp({
  to,
  from = 0,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(from);
  const display = useTransform(mv, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`,
  );

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(mv, to, {
        duration,
        // ease-out-expo : demarrage rapide, finition lente (sensation premium)
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }
  }, [isInView, mv, to, duration]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}

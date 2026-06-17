'use client';

import { BlurFade } from '@/components/ui/blur-fade';

export default function ForWho() {
  return (
    <section className="forwho-section">
      <div className="lux-bg" aria-hidden="true" />
      <div className="container forwho-container">
        <BlurFade inView delay={0}>
          <span className="eyebrow">03 — Pour qui</span>
        </BlurFade>

        <blockquote className="forwho-quote">
          <span className="forwho-mark">«</span>
          <BlurFade inView delay={0.12}>
            <p>
              On travaille avec les <em>artisans</em>, les <em>commerçants</em>,
              les <em>PME</em> et les <em>indépendants</em> qui ont un vrai
              métier — et qui veulent arrêter de bricoler leur site.
            </p>
          </BlurFade>
          <span className="forwho-mark forwho-mark-end">»</span>
        </blockquote>

        <div className="forwho-line" aria-hidden="true" />

        <BlurFade inView delay={0.22}>
          <p className="forwho-foot">
            On préfère le dire tout de suite : <strong>on n'est pas pour tout
            le monde.</strong> Si vous cherchez le moins cher ou un site livré
            en 3 jours, on ne sera pas le bon partenaire. Mais si vous voulez
            quelqu'un qui prend le temps de comprendre votre activité avant de
            coder, on devrait bien s'entendre.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}

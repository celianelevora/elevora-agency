import Hero from '@/components/Hero';
import EngagementsGrid from '@/components/EngagementsGrid';
import Link from 'next/link';

export const metadata = {
  title: "L'agence | Qui sommes-nous",
  description: "Elevora, jeune agence digitale nantaise. Découvrez notre histoire, nos valeurs et nos engagements envers nos clients.",
};

const VALUES = [
  { roman: 'I.', title: 'Transparence radicale', desc: "On dit ce qu'on fait. On dit ce qu'on ne fait pas. On dit combien ça coûte avant de commencer. On dit quand on s'est planté." },
  { roman: 'II.', title: 'Sobriété technique', desc: "La techno qui sert votre projet, pas celle qui flatte notre CV. Code simple, performant, maintenable par n'importe quel autre développeur." },
  { roman: 'III.', title: 'Présence après livraison', desc: "Le projet n'est pas fini quand le site est en ligne. Il est fini quand vous savez l'utiliser et qu'il vous rapporte des clients." },
];

export default function AgencePage() {
  return (
    <>
      <Hero
        pillText="L'agence"
        title={`Une agence jeune,<br>des convictions <span class="italic">déjà solides.</span>`}
        lead="Elevora est née fin 2025 à Nantes. On n'a pas encore vingt ans d'archives à montrer, mais on a une idée claire de la manière dont on veut faire ce métier — et de tout ce qu'on ne veut plus voir."
      />

      {/* HISTOIRE */}
      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }}>
            <div>
              <span className="eyebrow">Notre histoire</span>
              <h2 style={{ marginTop: 18, fontSize: 'clamp(28px, 3.2vw, 36px)' }}>
                D'où vient<br />
                <span className="italic">Elevora.</span>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 20 }}>
                On a longtemps vu — en tant que clients, en tant que freelances, en tant que salariés — les mêmes problèmes revenir : des devis flous qui dérapent, des sites livrés en demi-teinte, des agences injoignables une fois le chèque encaissé, et des outils SaaS qui finissent par coûter plus cher que le sur-mesure.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 20 }}>
                Elevora, c'est une réponse à ça. Une structure légère, basée à Nantes, qui construit des sites web et des outils de gestion pour les indépendants et les PME qui veulent <em>quelque chose de bien fait, par des gens accessibles, à un prix juste.</em>
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                Pas de promesse marketing. On vend ce qu'on sait faire, on dit non quand on ne saura pas, et on assume notre statut de jeune agence — c'est aussi pour ça qu'on est plus disponibles et plus motivés que la concurrence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section style={{ background: '#FFF' }}>
        <div className="container">
          <span className="eyebrow">Elevora en chiffres</span>
          <h2 style={{ margin: '18px 0 56px', maxWidth: 640 }}>
            Petits, mais <span className="italic">vrais.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { value: '2025', label: 'Année de création', color: 'klein' },
              { value: '100%', label: 'Made in Nantes', color: 'klein' },
              { value: '0', label: 'Sous-traitance offshore', color: 'pink', italic: true },
              { value: 'A→Z', label: 'Strat. au déploiement', color: 'klein', italic: true },
            ].map((c, i) => (
              <div key={i} style={{ padding: '32px 28px', background: 'var(--cream)', borderRadius: 'var(--radius-md)' }}>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: c.color === 'pink' ? 'var(--pink)' : 'var(--klein)',
                    lineHeight: 1,
                    marginBottom: 12,
                    fontFamily: c.italic ? 'var(--serif)' : 'inherit',
                    fontStyle: c.italic ? 'italic' : 'normal',
                  }}
                >
                  {c.value}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS — composant partagé */}
      <EngagementsGrid
        eyebrow="Nos engagements"
        title={
          <>
            Six promesses,<br />
            mises <span className="italic">par écrit.</span>
          </>
        }
      />

      {/* VALEURS */}
      <section style={{ background: 'var(--klein)', color: 'var(--cream)' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'rgba(245,240,232,0.6)' }}>Ce qui nous tient</span>
          <h2 style={{ margin: '18px 0 56px', maxWidth: 720, color: 'var(--cream)' }}>
            Trois valeurs<br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', fontWeight: 400 }}>non négociables.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {VALUES.map((v, i) => (
              <div key={i}>
                <div style={{ fontSize: 56, fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)', marginBottom: 16, lineHeight: 1 }}>
                  {v.roman}
                </div>
                <h4 style={{ fontSize: 20, marginBottom: 14, color: 'var(--cream)' }}>{v.title}</h4>
                <p style={{ fontSize: 15, lineHeight: 1.65, opacity: 0.82 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ marginBottom: 24 }}>
              Envie de nous<br />
              <span className="italic">rencontrer ?</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 36 }}>
              En visio ou autour d'un café à Nantes. On vous écoute, on vous dit ce qu'on en pense, et c'est tout.
            </p>
            <Link href="/contact" className="cta-big">
              Nous contacter
              <svg className="ic arrow" width="18" height="18" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

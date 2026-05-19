import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import LalaKShowcase from '@/components/LalaKShowcase';
import { ScrollTiltedGrid, type ScrollTiltedGridItem } from '@/components/ui/scroll-tilted-grid';

/** Génère une data URL SVG avec un gradient stylisé Elevora */
const gradientSVG = (color1: string, color2: string, label: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400' preserveAspectRatio='xMidYMid slice'>
    <defs>
      <linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'>
        <stop offset='0%25' stop-color='${color1}'/>
        <stop offset='100%25' stop-color='${color2}'/>
      </linearGradient>
    </defs>
    <rect width='300' height='400' fill='url(%23g)'/>
    <text x='50%25' y='52%25' text-anchor='middle' font-family='Georgia, serif' font-style='italic' font-size='18' fill='rgba(255,255,255,0.85)' letter-spacing='0.5'>${label}</text>
    <line x1='30%25' y1='58%25' x2='70%25' y2='58%25' stroke='rgba(255,255,255,0.4)' stroke-width='0.5'/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${svg.replace(/\n/g, '').replace(/\s+/g, ' ')}`;
};

const GRID_ITEMS: ScrollTiltedGridItem[] = [
  { src: gradientSVG('%230033A0', '%23002074', 'Bleu Klein'), caption: 'La signature' },
  { src: gradientSVG('%23C9569E', '%23993556', 'Rose-violet'), caption: 'L\u2019accent' },
  { src: gradientSVG('%23F5F0E8', '%23EFE8DC', 'Cr\u00e8me'), caption: 'Le fond' },
  { src: gradientSVG('%230044CC', '%230033A0', 'Klein bright'), caption: 'L\u2019\u00e9clat' },
  { src: gradientSVG('%23FBEAF0', '%23C9569E', 'Pink light'), caption: 'La douceur' },
  { src: gradientSVG('%230A0A0A', '%232D2D2D', 'Encre'), caption: 'Le contraste' },
  { src: gradientSVG('%23EFE8DC', '%23F5F0E8', 'Beige chaud'), caption: 'L\u2019\u00e9quilibre' },
  { src: gradientSVG('%23002074', '%230A0A0A', 'Nuit profonde'), caption: 'La profondeur' },
];

export const metadata = {
  title: 'Réalisations | Nos projets livrés',
  description: 'Découvrez les projets réalisés par Elevora : sites web, refontes et outils de gestion pour indépendants et PME à Nantes.',
};

export default function RealisationsPage() {
  return (
    <>
      <Hero
        pillText="Réalisations"
        title={`Nos projets.<br><span class="italic">Sans filtre.</span>`}
        lead="Nous sommes une jeune agence. Nous n'avons pas 200 références à montrer, mais nous avons ce que nous avons livré — et nous l'assumons. Voici nos projets, présents et en cours."
      />

      {/* Vitrine Lala-K — composant SectionWithMockup */}
      <LalaKShowcase />

      <section>
        <div className="container">

          {/* Garage */}
          <article style={{ marginBottom: 80 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span className="tag">Site vitrine</span>
                  <span className="tag">2026</span>
                </div>
                <h2 style={{ marginBottom: 16, fontSize: 'clamp(28px, 3.5vw, 42px)' }}>Garage automobile</h2>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 24 }}>
                  Site vitrine pour un garage indépendant : présentation des services (entretien, réparation, contrôle), informations pratiques, prise de contact rapide. Conçu pour rassurer une clientèle locale qui veut un mécano de confiance.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Mission</div>
                    <div style={{ fontSize: 14 }}>Création vitrine</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Statut</div>
                    <div style={{ fontSize: 14, color: 'var(--klein)' }}>Livré</div>
                  </div>
                </div>
              </div>
              <div style={{ order: 1, background: 'var(--klein)', borderRadius: 'var(--radius-lg)', padding: 48, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', background: 'var(--klein-deep)', borderRadius: 12, padding: 24 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(245,240,232,0.3)' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(245,240,232,0.3)' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(245,240,232,0.3)' }} />
                  </div>
                  <div style={{ height: 16, width: '45%', background: 'var(--pink)', borderRadius: 3, marginBottom: 14 }} />
                  <div style={{ height: 9, width: '70%', background: 'rgba(245,240,232,0.25)', borderRadius: 2, marginBottom: 8 }} />
                  <div style={{ height: 9, width: '55%', background: 'rgba(245,240,232,0.25)', borderRadius: 2, marginBottom: 20 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ aspectRatio: 1.6, background: 'rgba(245,240,232,0.1)', borderRadius: 6 }} />
                    <div style={{ aspectRatio: 1.6, background: 'rgba(245,240,232,0.1)', borderRadius: 6 }} />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Confidentiel */}
          <article style={{ marginBottom: 80 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <div style={{ background: 'var(--cream-warm)', borderRadius: 'var(--radius-lg)', padding: 48, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(10,10,10,0.02) 10px, rgba(10,10,10,0.02) 11px)' }} />
                <div style={{ position: 'relative', textAlign: 'center' }}>
                  <svg className="ic" width="48" height="48" viewBox="0 0 24 24" style={{ color: 'var(--ink-muted)', margin: '0 auto 16px', strokeWidth: 1.2 }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--ink-muted)' }}>Visuel confidentiel</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 6 }}>Sortie prévue Q2 2026</div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span className="tag">En cours</span>
                  <span className="tag">2026</span>
                </div>
                <h2 style={{ marginBottom: 16, fontSize: 'clamp(28px, 3.5vw, 42px)' }}>Projet confidentiel</h2>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 24 }}>
                  Refonte d'envergure en cours pour une activité de service. Le projet est sous accord de confidentialité jusqu'à la mise en ligne — un nouveau cas viendra prendre cette place quand il sera officiel.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Mission</div>
                    <div style={{ fontSize: 14 }}>Refonte complète</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Statut</div>
                    <div style={{ fontSize: 14, color: 'var(--pink)' }}>En développement</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Démo Elevora */}
          <article>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span className="tag" style={{ background: 'var(--pink-light)', color: 'var(--pink-deep)' }}>Démo Elevora</span>
                  <span className="tag">2026</span>
                </div>
                <h2 style={{ marginBottom: 16, fontSize: 'clamp(28px, 3.5vw, 42px)' }}>Projet vitrine interne</h2>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 24 }}>
                  Une démonstration de notre savoir-faire, conçue librement pour montrer comment nous concevons un site quand on nous laisse carte blanche : architecture moderne, design soigné, performances optimales.
                </p>
              </div>
              <div style={{ order: 1, background: 'var(--cream-warm)', borderRadius: 'var(--radius-lg)', padding: 48, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', background: '#FFF', borderRadius: 12, padding: 24, boxShadow: '0 20px 60px rgba(10,10,10,0.06)' }}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <div style={{ width: 90, display: 'flex', flexDirection: 'column', gap: 10, borderRight: '0.5px solid var(--line)', paddingRight: 14 }}>
                      <div style={{ height: 10, background: 'var(--klein)', borderRadius: 2 }} />
                      <div style={{ height: 10, background: 'var(--cream-warm)', borderRadius: 2 }} />
                      <div style={{ height: 10, background: 'var(--cream-warm)', borderRadius: 2 }} />
                      <div style={{ height: 10, background: 'var(--cream-warm)', borderRadius: 2 }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ height: 14, width: '60%', background: 'var(--ink)', borderRadius: 2 }} />
                      <div style={{ height: 8, width: '80%', background: 'var(--cream-warm)', borderRadius: 2 }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                        <div style={{ aspectRatio: 1.4, background: 'var(--pink-light)', borderRadius: 6 }} />
                        <div style={{ aspectRatio: 1.4, background: '#E6F1FB', borderRadius: 6 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* SCROLL TILTED GRID — Univers visuel */}
      <section style={{ background: 'var(--cream-warm)', padding: '120px 0 0' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', marginBottom: 18 }}>
            Notre univers
          </span>
          <h2 style={{ margin: '0 auto', maxWidth: 720 }}>
            Inspirations &<br />
            <span className="italic">références.</span>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: 'var(--ink-soft)',
              maxWidth: 600,
              margin: '24px auto 0',
            }}
          >
            Une sélection visuelle de l'univers dans lequel on évolue : couleurs, formes, ambiances qui nourrissent nos créations.
          </p>
        </div>

        <ScrollTiltedGrid
          items={GRID_ITEMS}
          maxWidth="2xl"
          gap={10}
          aspectRatio="3/4"
          rounded="12px"
        />
      </section>

      <CTASection
        title={`Le prochain projet,<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">c'est le vôtre ?</span>`}
        description="Premier échange gratuit. On comprend votre besoin et on vous dit honnêtement si on peut vous aider."
        primaryLabel="Démarrer un projet"
      />
    </>
  );
}

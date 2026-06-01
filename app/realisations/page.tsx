import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import { ScrollTiltedGrid, type ScrollTiltedGridItem } from '@/components/ui/scroll-tilted-grid';

/** Generation de tuiles colorees pour la grille Inspirations (charte V2) */
const gradientSVG = (color1: string, color2: string, label: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400' preserveAspectRatio='xMidYMid slice'>
    <defs>
      <linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'>
        <stop offset='0%25' stop-color='${color1}'/>
        <stop offset='100%25' stop-color='${color2}'/>
      </linearGradient>
    </defs>
    <rect width='300' height='400' fill='url(%23g)'/>
    <text x='50%25' y='52%25' text-anchor='middle' font-family='Cochin, Georgia, serif' font-style='italic' font-size='18' fill='rgba(255,255,255,0.92)' letter-spacing='0.5'>${label}</text>
    <line x1='30%25' y1='58%25' x2='70%25' y2='58%25' stroke='rgba(255,255,255,0.5)' stroke-width='0.5'/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${svg.replace(/\n/g, '').replace(/\s+/g, ' ')}`;
};

// Charte V2 : Bleu / Framboise / Nuit / Gris
const GRID_ITEMS: ScrollTiltedGridItem[] = [
  { src: gradientSVG('%231B4F8A', '%230D2B50', 'Bleu Klein'), caption: 'La signature' },
  { src: gradientSVG('%23C9266A', '%238A1245', 'Framboise'), caption: "L'accent" },
  { src: gradientSVG('%23EAE9EE', '%23B8B8B8', 'Gris perle'), caption: 'Le fond' },
  { src: gradientSVG('%232B6CC4', '%231B4F8A', 'Bleu clair'), caption: "L'éclat" },
  { src: gradientSVG('%23E8527E', '%23C9266A', 'Rose framboise'), caption: 'La douceur' },
  { src: gradientSVG('%231A1A2E', '%230D0D1A', 'Nuit'), caption: 'Le contraste' },
  { src: gradientSVG('%23383838', '%237A7A7A', 'Gris foncé'), caption: "L'équilibre" },
  { src: gradientSVG('%230D2B50', '%231A1A2E', 'Nuit profonde'), caption: 'La profondeur' },
];

export const metadata = {
  title: 'Réalisations | Nos projets livrés',
  description: "Découvrez les projets réalisés par Elevora : sites vitrine, refontes premium et outils de gestion sur mesure.",
};

type Project = {
  slug: string;
  name: string;
  tag: string;
  year: string;
  type: 'Site' | 'Outil métier';
  mission: string;
  status: 'En production' | 'En développement' | 'Livré';
  intro: string;
  bullets: string[];
  highlights: { label: string; value: string }[];
  cover: string;
  details?: string[];
  bg: string;
  reversed?: boolean;
};

const PROJECTS: Project[] = [
  {
    slug: 'lily-berry',
    name: 'Lily Berry',
    tag: 'Nail Artist · Nantes',
    year: '2026',
    type: 'Site',
    mission: 'Site vitrine complet',
    status: 'En production',
    intro:
      "Site vitrine kawaii pour une prothésiste ongulaire nantaise, pensé pour transformer ses visiteuses en rendez-vous fermes. Univers visuel cocon (couleurs pastel, photos rondes, micro-illustrations fraise) totalement personnalisé, et un système de cartes cadeaux qui ouvre un nouveau canal de vente.",
    bullets: [
      "Page d'accueil chaleureuse avec présentation \"Moi c'est Lily\"",
      "Catalogue détaillé des prestations avec photos avant/après",
      'Grille tarifaire claire (3 niveaux par prestation)',
      'Module de cartes cadeaux personnalisables',
      'Section Press On avec livraison France métropolitaine',
    ],
    highlights: [
      { label: 'Pages', value: '6' },
      { label: 'Mission', value: 'Vitrine + cartes cadeaux' },
      { label: 'Délai', value: '5 semaines' },
    ],
    cover: '/projets/lily-berry-cover.jpg',
    details: ['/projets/lily-berry-prestations.jpg', '/projets/lily-berry-tarifs.jpg'],
    bg: '#FFE7EC',
  },
  {
    slug: 'mace-freddy',
    name: 'Garage Macé Freddy',
    tag: 'Garage automobile · Saint-Nazaire',
    year: '2026',
    type: 'Site',
    mission: 'Site vitrine local',
    status: 'En production',
    intro:
      "Site sombre et impactant pour un garage indépendant agréé assurances de l'agglomération nazairienne. Direction artistique radicale (fond noir, accent orange, photo grand format) pour casser les codes du garage \"site Wix moyen\". L'appel direct et la note Google sont mis en avant dès le hero.",
    bullets: [
      'Hero immersif avec photo grand format du mécanicien',
      'Bouton d\'appel direct toujours visible (mobile-first)',
      'Affichage de la note Google (4,5★) et nombre d\'avis (32)',
      "Section périmètre d'intervention (agglomération)",
      'Formulaire devis rapide pour intervention sur assurance',
    ],
    highlights: [
      { label: 'Pages', value: '4' },
      { label: 'Mission', value: 'Vitrine locale' },
      { label: 'Délai', value: '4 semaines' },
    ],
    cover: '/projets/mace-freddy-cover.jpg',
    bg: '#0B0B0F',
    reversed: true,
  },
  {
    slug: 'lala-k',
    name: 'Lala·K Beauty',
    tag: 'Institut & soins coréens · Paris',
    year: '2026',
    type: 'Site',
    mission: 'Refonte premium',
    status: 'En production',
    intro:
      "Refonte premium pour un institut parisien spécialisé en soins coréens (K-Beauty, Hydrafacial, Peau de verre). DA bordeaux profond + or, typographie Cochin italique, galerie immersive avec cartes inclinées 3D pour révéler l'institut en images. Mise en scène d'une technologie phare unique par carrousel élégant.",
    bullets: [
      "Hero éditorial \"Vos soins signature\" avec mosaïque verticale",
      "Carrousel \"Technicité & technologie\" (K-Beauty / Hydrafacial / Peau de verre)",
      "Galerie immersive \"L'institut en images\" avec cartes 3D",
      "Diagnostic 20 MP mis en avant (4 lumières spécialisées)",
      'Système de prise de rendez-vous intégré',
    ],
    highlights: [
      { label: 'Pages', value: '8' },
      { label: 'Mission', value: 'Refonte premium' },
      { label: 'Délai', value: '8 semaines' },
    ],
    cover: '/projets/lala-k-cover.jpg',
    details: ['/projets/lala-k-soins.jpg', '/projets/lala-k-coreenne.jpg'],
    bg: '#1A0A0F',
  },
  {
    slug: 'pole-embal',
    name: 'Pôle Embal',
    tag: "CRM gestion d'entrepôt · Loire-Atlantique",
    year: '2026',
    type: 'Outil métier',
    mission: 'CRM sur mesure',
    status: 'En production',
    intro:
      "Outil métier complet pour piloter un entrepôt en temps réel : commandes du jour, picking en cours, expéditions, taux d'erreur, classement opérateurs, heatmap d'activité. Conçu pour remplacer trois logiciels qui ne se parlaient pas. Interface dense mais lisible, alertes critiques toujours visibles, KPIs hebdo exportables PDF.",
    bullets: [
      "Tableau de bord temps réel (commandes, picking, expéditions)",
      "Suivi opérateurs avec scoring de performance individuel",
      "Heatmap d'activité picking par jour et créneau horaire",
      "Top 10 SKUs avec alertes ruptures stock en rouge",
      'Rapports hebdomadaires PDF et personnalisables',
      "Alertes critiques (retard, rupture, incident matériel)",
    ],
    highlights: [
      { label: 'Type', value: 'Web app interne' },
      { label: 'Mission', value: 'CRM/WMS sur mesure' },
      { label: 'Délai', value: '14 semaines' },
    ],
    cover: '/projets/pole-embal-cover.jpg',
    details: ['/projets/pole-embal-detail.jpg'],
    bg: '#0F1729',
    reversed: true,
  },
];

export default function RealisationsPage() {
  return (
    <>
      <Hero
        pillText="Réalisations"
        title={`Nos projets.<br><span class="italic">Sans filtre.</span>`}
        lead="Voici les projets que nous avons livrés et ceux en cours. Sites vitrines, refontes premium, outils métier — chaque cas est documenté avec honnêteté : ce qu'on a fait, dans quel délai, pour quoi faire."
      />

      <section className="reali-projects">
        <div className="container">
          {PROJECTS.map((p) => (
            <article
              key={p.slug}
              className={`reali-project ${p.reversed ? 'is-reversed' : ''}`}
              style={{ ['--p-bg' as any]: p.bg }}
            >
              <div className="reali-project-media">
                <div className="reali-project-cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt={p.name} />
                </div>
                {p.details && p.details.length > 0 && (
                  <div className="reali-project-details">
                    {p.details.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={src} alt={`${p.name} — détail ${i + 1}`} />
                    ))}
                  </div>
                )}
              </div>

              <div className="reali-project-content">
                <div className="reali-project-meta">
                  <span className="tag">{p.type}</span>
                  <span className="tag">{p.year}</span>
                  <span className={`tag tag-status tag-status-${p.status === 'En production' ? 'live' : p.status === 'En développement' ? 'wip' : 'done'}`}>
                    {p.status}
                  </span>
                </div>
                <span className="reali-project-tagline">{p.tag}</span>
                <h2 className="reali-project-name">{p.name}</h2>
                <p className="reali-project-intro">{p.intro}</p>

                <ul className="reali-project-bullets">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                <div className="reali-project-highlights">
                  {p.highlights.map((h) => (
                    <div key={h.label} className="reali-project-highlight">
                      <span className="reali-project-highlight-label">{h.label}</span>
                      <span className="reali-project-highlight-value">{h.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* INSPIRATIONS : sur fond charte V2 */}
      <section className="inspirations-section">
        <div className="inspirations-bg" aria-hidden="true" />
        <div className="container inspirations-head">
          <span className="eyebrow inspirations-eyebrow">Notre univers</span>
          <h2 className="inspirations-title">
            Inspirations &<br />
            <span className="italic">références.</span>
          </h2>
          <p className="inspirations-lead">
            Une sélection visuelle de l'univers dans lequel on évolue :
            couleurs, formes, ambiances qui nourrissent nos créations.
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

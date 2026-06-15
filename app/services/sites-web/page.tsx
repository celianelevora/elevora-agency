import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import ServicesKinetic from '@/components/ServicesKinetic';
import { ContainerScroll } from '@/components/ui/container-scroll';

export const metadata = {
  title: 'Sites web | Création de sites qui convertissent',
  description:
    'Sites vitrines, e-commerce et refontes. Création de sites web sur mesure à Nantes pour indépendants et PME. À partir de 1500 €.',
};

const FORMATS = [
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
    title: 'Site vitrine',
    desc: 'Présenter votre activité, vos services, votre équipe. Le digne représentant de votre marque sur le web, conçu pour rassurer et convaincre.',
    features: [
      'Design sur mesure, jamais de template',
      'Optimisation SEO native',
      'Formulaire de contact, prise de RDV',
      'Back-office pour gérer le contenu',
    ],
    price: 'À partir de 1500 €',
    duration: '4 à 6 semaines',
    dark: false,
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    title: 'Site e-commerce',
    desc: "Vendre en ligne, gérer un catalogue, encaisser des paiements. On construit votre boutique avec les outils qui correspondent à votre échelle.",
    features: [
      'Catalogue produits illimité',
      'Paiement Stripe, virement, prélèvement',
      'Gestion stocks, commandes, clients',
      'Intégration transporteurs (Colissimo, Mondial Relay…)',
    ],
    price: 'À partir de 3500 €',
    duration: '6 à 10 semaines',
    dark: false,
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <polyline points="21 3 21 8 16 8" />
      </svg>
    ),
    title: 'Refonte complète',
    desc: "Votre site actuel ne reflète plus ce que vous êtes. On reprend tout : design, structure, contenus, performances. Le résultat est un site qui ressemble à votre entreprise d'aujourd'hui, pas à celle d'il y a cinq ans.",
    features: [
      'Audit du site existant + recommandations',
      'Migration des contenus et du SEO existant',
      'Nouvelle identité visuelle (si besoin)',
      'Aucune coupure de service pendant la migration',
    ],
    price: 'À partir de 2500 €',
    duration: '5 à 8 semaines',
    dark: true,
  },
  {
    icon: (
      <svg className="ic" width="18" height="18" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Landing page',
    desc: 'Une page, un objectif : convertir. Idéale pour une campagne, un lancement produit, un événement. Optimisée pour transformer le visiteur en lead ou en client.',
    features: [
      'Copywriting orienté conversion',
      'Tracking et analytics intégrés',
      'Connexion CRM ou outil mail (Brevo, Mailchimp…)',
      'Test A/B possible',
    ],
    price: 'À partir de 900 €',
    duration: '2 à 3 semaines',
    dark: false,
  },
];

const TECHS = [
  { label: 'Front-end', title: 'Next.js & React', desc: 'Le standard moderne pour des sites rapides, bien référencés et faciles à faire évoluer.' },
  { label: 'Back-end', title: 'Node.js, PostgreSQL', desc: 'Architecture robuste, base de données fiable, prête pour la croissance.' },
  { label: 'Hébergement', title: 'Infomaniak', desc: 'Serveurs en Suisse, énergie 100 % renouvelable, RGPD natif.' },
  { label: 'CMS', title: 'Sanity, Strapi, WordPress', desc: 'Selon le projet et votre confort. Vous éditez vos contenus en toute autonomie.' },
  { label: 'E-commerce', title: 'Shopify, Medusa', desc: 'Solutions adaptées à votre catalogue, votre logistique, votre marge.' },
  { label: 'Performance', title: 'Core Web Vitals au vert', desc: 'Vos pages chargent vite, Google vous aime, vos visiteurs restent.' },
];

export default function SitesWebPage() {
  return (
    <>
      <Hero
        title={`Des sites qui<br><span class="italic">convertissent</span>,<br>pas qui décorent.`}
        lead="Vitrine, e-commerce, refonte ou landing page. On construit votre site autour de vos clients et de vos objectifs, jamais autour d'un template recyclé."
        primaryCTA={{ label: 'Démarrer mon projet', href: '/contact' }}
        secondaryCTA={{ label: 'Voir nos sites livrés', href: '/realisations' }}
      />

      {/* TYPOGRAPHIE CINÉTIQUE — Capter · Convaincre · Convertir */}
      <ServicesKinetic variant="sites" />

      {/* DÉMO VISUELLE — Container Scroll */}
      <section style={{ padding: 0, background: 'var(--cream-warm)' }}>
        <ContainerScroll
          titleComponent={
            <>
              <span className="eyebrow" style={{ display: 'inline-flex', marginBottom: 18 }}>
                Notre approche
              </span>
              <h2 style={{ marginBottom: 16, fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
                Du design qui se voit,<br />
                <span className="italic">du résultat qui se mesure.</span>
              </h2>
              <p
                style={{
                  fontSize: 17,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6,
                  maxWidth: 620,
                  margin: '0 auto',
                }}
              >
                Chaque site est pensé comme un outil commercial : performant, accessible, et fait pour convertir vos visiteurs.
              </p>
            </>
          }
        >
          {/* Mockup d'un site Elevora-style */}
          <div className="w-full h-full p-4 md:p-10 flex flex-col gap-6 overflow-hidden">
            {/* Header simulé */}
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--line)' }}>
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: 'var(--klein)',
                    borderRadius: 6,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--cream)',
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  E
                </div>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500 }}>
                  Studio Lumen
                </span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-xs" style={{ color: 'var(--ink-soft)' }}>
                <span>Projets</span>
                <span>Services</span>
                <span>À propos</span>
                <span>Contact</span>
              </div>
              <div
                style={{
                  background: 'var(--klein)',
                  color: 'var(--cream)',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                Démarrer
              </div>
            </div>

            {/* Hero simulé */}
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div style={{ fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Studio créatif — Paris
              </div>
              <h3 style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em' }}>
                Le design qui<br />
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--pink)' }}>
                  élève
                </span>{' '}
                votre marque.
              </h3>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 480, lineHeight: 1.6 }}>
                Identité visuelle, direction artistique, et création de sites web premium pour les marques exigeantes.
              </p>
              <div className="flex gap-3 mt-2">
                <div
                  style={{
                    background: 'var(--klein)',
                    color: 'var(--cream)',
                    padding: '10px 18px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  Découvrir →
                </div>
                <div
                  style={{
                    border: '0.5px solid var(--line-strong)',
                    padding: '10px 18px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  Portfolio
                </div>
              </div>
            </div>

            {/* Grille produits */}
            <div className="grid grid-cols-3 gap-3">
              <div
                style={{
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, var(--pink-light), var(--cream-warm))',
                  borderRadius: 8,
                }}
              />
              <div
                style={{
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, var(--klein), var(--klein-bright))',
                  borderRadius: 8,
                }}
              />
              <div
                style={{
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, var(--cream-warm), var(--pink-light))',
                  borderRadius: 8,
                }}
              />
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* FORMATS */}
      <section>
        <div className="container">
          <span className="eyebrow">Ce qu'on construit</span>
          <h2 style={{ margin: '18px 0 64px', maxWidth: 640 }}>
            Quatre formats,<br />
            une <span className="italic">même</span> exigence.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {FORMATS.map((f, i) => (
              <div
                key={i}
                style={{
                  background: f.dark ? 'var(--klein)' : '#FFF',
                  color: f.dark ? 'var(--cream)' : 'inherit',
                  border: f.dark ? 'none' : '0.5px solid var(--line-soft)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '40px 36px',
                }}
              >
                <div
                  className={f.dark ? 'icon-box' : 'icon-box icon-box-klein'}
                  style={{
                    marginBottom: 24,
                    ...(f.dark ? { background: 'var(--pink)', color: 'var(--cream)' } : {}),
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ marginBottom: 14, color: f.dark ? 'var(--cream)' : 'inherit' }}>{f.title}</h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: f.dark ? 'inherit' : 'var(--ink-soft)',
                    opacity: f.dark ? 0.82 : 1,
                    marginBottom: 24,
                  }}
                >
                  {f.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {f.features.map((feat, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 14,
                        color: f.dark ? 'inherit' : 'var(--ink-soft)',
                        opacity: f.dark ? 0.85 : 1,
                        display: 'flex',
                        gap: 10,
                        alignItems: 'center',
                      }}
                    >
                      <svg className="ic" width="14" height="14" viewBox="0 0 24 24" style={{ color: f.dark ? 'var(--pink)' : 'var(--klein)' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    borderTop: f.dark ? '0.5px solid rgba(245,240,232,0.2)' : '0.5px solid var(--line-soft)',
                  }}
                >
                  <span style={{ fontSize: 13, color: f.dark ? 'inherit' : 'var(--ink-muted)', opacity: f.dark ? 0.65 : 1 }}>
                    {f.price}
                  </span>
                  <span style={{ fontSize: 13, color: f.dark ? 'var(--pink)' : 'var(--klein-bright)' }}>
                    {f.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOS */}
      <section style={{ background: '#FFF' }}>
        <div className="container">
          <span className="eyebrow">Sous le capot</span>
          <h2 style={{ margin: '18px 0 56px', maxWidth: 640 }}>
            Les bonnes technos.<br />
            Pas <span className="italic">les plus à la mode.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {TECHS.map((t, i) => (
              <div key={i}>
                <div style={{ fontSize: 13, color: 'var(--klein)', fontFamily: 'var(--serif)', fontStyle: 'italic', marginBottom: 12 }}>
                  {t.label}
                </div>
                <h4 style={{ fontSize: 17, marginBottom: 10 }}>{t.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Prêt à faire <span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">décoller</span> votre présence web ?`}
        description="Premier échange gratuit. On comprend votre besoin, on vous propose un devis ferme sous 5 jours."
        primaryLabel="Démarrer mon projet"
      />
    </>
  );
}

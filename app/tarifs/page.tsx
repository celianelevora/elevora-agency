import Hero from "@/components/Hero";
import { PricingSection, type Plan } from "@/components/ui/pricing";
import CTASection from "@/components/CTASection";
import PostFooterPortal from "@/components/PostFooterPortal";

export const metadata = {
  title: "Tarifs | Création de site web à partir de 300€",
  description:
    "Découvrez nos offres de création de site web : Starter à 300€, Standard à 1500€, Premium à 2500€. Solutions one-shot ou mensuelles avec engagement.",
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    info: "Site simple, livraison rapide",
    price: {
      oneshot: 300,
      monthly: 39,
    },
    priceNote: {
      monthly: "Engagement 12 mois — soit 468€ total",
    },
    audience: "Pour les petits budgets qui veulent se lancer sérieusement.",
    features: [
      { text: "Site vitrine 1 à 3 pages" },
      {
        text: "Design basé sur template adapté",
        tooltip: "Template premium personnalisé à votre marque",
      },
      { text: "Responsive mobile / desktop" },
      { text: "Formulaire de contact" },
      {
        text: "Hébergement Infomaniak inclus (formule mensuelle)",
        tooltip: "Serveurs en Suisse, énergie verte, RGPD",
      },
      { text: "Livraison sous 7 jours ouvrés" },
    ],
    btn: {
      text: "Choisir Starter",
      href: "/contact?offre=starter",
    },
  },
  {
    name: "Standard",
    info: "Le cœur de l'offre Elevora",
    price: {
      oneshot: 1500,
      monthly: 59,
    },
    priceNote: {
      monthly: "Engagement 12 mois — soit 708€ total",
    },
    audience: "Pour les indépendants et TPE établis qui veulent du solide.",
    highlighted: true,
    features: [
      { text: "Site sur mesure 5 à 8 pages" },
      { text: "Design 100% personnalisé" },
      {
        text: "CRM standard inclus",
        tooltip: "Gestion clients, suivi prospects, base de données",
      },
      { text: "SEO de base optimisé" },
      { text: "Back-office pour gérer le contenu" },
      {
        text: "Formule mensuelle : maintenance + 1 modification/mois",
        tooltip: "Idéal si vous voulez de l'accompagnement continu",
      },
      { text: "Suivi 30 jours après livraison" },
    ],
    btn: {
      text: "Choisir Standard",
      href: "/contact?offre=standard",
    },
  },
  {
    name: "Premium",
    info: "Sur-mesure complet",
    price: {
      oneshot: "2500-3500€",
      monthly: undefined,
    },
    audience: "Pour les entrepreneurs et indépendants avec du CA qui veulent l'expérience complète.",
    features: [
      { text: "Site sur mesure complet (pages illimitées)" },
      { text: "Design 100% personnalisé premium" },
      {
        text: "CRM avancé sur mesure",
        tooltip: "Automatisations, intégrations, dashboards personnalisés",
      },
      {
        text: "Automatisations métier",
        tooltip: "Emails automatiques, workflows, intégrations API",
      },
      { text: "SEO avancé + stratégie de contenu" },
      { text: "Accompagnement personnalisé" },
      { text: "Suivi étendu 90 jours après livraison" },
    ],
    btn: {
      text: "Discuter du projet",
      href: "/contact?offre=premium",
    },
  },
];

export default function TarifsPage() {
  return (
    <>
      <div className="tarifs-page-bg">
      <Hero
        title={`Des tarifs <span class="italic">honnêtes</span>,<br>sans surprise.`}
        lead="Trois offres pensées pour répondre à chaque étape de votre activité. Pas de prix gonflé, pas de coûts cachés. Le devis qu'on annonce est le prix que vous payez."
        transparentBg
      />

      <section className="tarifs-pricing">
        <div className="container">
          <PricingSection
            plans={PLANS}
            heading="Choisissez la formule qui vous correspond"
            description="Basculez entre paiement unique et formule mensuelle selon votre préférence."
          />
        </div>
      </section>

      {/* Bandeau d'aide au choix */}
      <section className="tarifs-helper">
        <div className="container">
          <div className="tarifs-helper-card">
            <div className="tarifs-helper-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className="tarifs-helper-content">
              <h3 className="tarifs-helper-title">Pas sûr de quelle offre choisir ?</h3>
              <p className="tarifs-helper-desc">
                On vous aide à <strong>identifier la bonne formule en 15 minutes</strong> lors d'un premier
                échange gratuit. On préfère parfois vous orienter vers Starter quand
                vous viendriez chercher Premium — c'est ça, notre métier.
              </p>
            </div>
            <a href="/demarrer-un-projet" className="tarifs-helper-cta">
              Lancer la discussion
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section "Tout inclus dans chaque offre" — refondue avec icônes + couleurs charte */}
      <section className="tarifs-included">
        <div className="container">
          <div className="tarifs-included-head">
            <span className="eyebrow">Inclus dans toutes nos offres</span>
            <h2 className="tarifs-included-title">
              Quoi que vous<br />
              choisissiez, vous <span className="italic">repartez avec.</span>
            </h2>
          </div>

          <div className="tarifs-incl2-list">
            {[
              {
                title: 'Le code source',
                desc: "Vous êtes propriétaire de votre site, du premier au dernier fichier. Dépôt GitHub à votre nom.",
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
                color: 'klein',
              },
              {
                title: 'Hébergement vert',
                desc: 'Serveurs Infomaniak en Suisse, énergie 100% renouvelable. Backup quotidien automatique.',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 22V12h20v10" /><path d="M9 22V12" /><path d="M15 22V12" /><path d="M2 12 12 2l10 10" /></svg>),
                color: 'pink',
              },
              {
                title: 'Devis ferme',
                desc: "Le prix annoncé est le prix final. Zéro coût caché, aucun avenant non-validé par écrit.",
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><polyline points="9 15 11 17 15 13" /></svg>),
                color: 'klein',
              },
              {
                title: 'Fondateurs accessibles',
                desc: "Pas d'intermédiaire commercial. Vous parlez directement à Celian de A à Z.",
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>),
                color: 'pink',
              },
              {
                title: 'Suivi post-livraison',
                desc: "30 jours offerts pour ajustements et corrections, sans facturation supplémentaire.",
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
                color: 'klein',
              },
              {
                title: 'Formation incluse',
                desc: "1h30 pour vous montrer comment gérer le site au quotidien. Vidéo de la séance offerte.",
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>),
                color: 'pink',
              },
            ].map((item, i) => (
              <div key={i} className={`tarifs-incl2-row tarifs-incl2-${item.color}`}>
                <span className="tarifs-incl2-icon">{item.icon}</span>
                <h4 className="tarifs-incl2-title">{item.title}</h4>
                <p className="tarifs-incl2-desc">{item.desc}</p>
                <span className="tarifs-incl2-check" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ tarifs — design 2 colonnes avec accordion-cards */}
      <section className="tarifs-faq">
        <div className="container">
          <div className="tarifs-faq-layout">
            <div className="tarifs-faq-head">
              <span className="eyebrow">Questions fréquentes</span>
              <h2 className="tarifs-faq-title">
                Vos questions<br />
                sur nos <span className="italic">tarifs.</span>
              </h2>
              <p className="tarifs-faq-lead">
                Des réponses claires pour vous aider à choisir la formule la
                plus adaptée à votre projet.
              </p>
              <span className="tarifs-faq-underline" aria-hidden="true" />
            </div>

            <div className="tarifs-faq-list">
              {[
                {
                  q: "Pourquoi un écart si grand entre 300 € et 3500 € ?",
                  a: "Parce qu'il y a un monde entre un site simple basé sur un template adapté (Starter) et un site sur mesure complet avec automatisations métier et CRM avancé (Premium). On préfère être transparent sur ces écarts plutôt que de proposer des prix flous.",
                },
                {
                  q: 'Quelle est la différence entre one-shot et mensuel ?',
                  a: "En one-shot, vous payez une fois et le site vous appartient immédiatement. En mensuel, vous étalez le coût sur 12 mois avec hébergement et maintenance inclus — idéal si vous ne voulez pas avancer toute la somme. À la fin des 12 mois, le site reste à vous.",
                },
                {
                  q: 'Que se passe-t-il après les 12 mois pour la formule mensuelle ?',
                  a: "Vous avez le choix : continuer la formule mensuelle pour conserver hébergement et maintenance, ou récupérer le site et gérer vous-même l'hébergement. Aucun engagement supplémentaire imposé.",
                },
                {
                  q: "Le prix peut-il évoluer en cours de projet ?",
                  a: "Non. Le devis qu'on signe ensemble est ferme. Si vous demandez des fonctionnalités hors périmètre initial, on fait un avenant chiffré et validé par vous avant de continuer. Pas de mauvaise surprise.",
                },
              ].map((item, i) => (
                <div key={i} className="tarifs-faq-item">
                  <div className="tarifs-faq-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="tarifs-faq-body">
                    <h4 className="tarifs-faq-q">{item.q}</h4>
                    <p className="tarifs-faq-a">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
      {/* /tarifs-page-bg */}

      <PostFooterPortal>
        <CTASection
          eyebrow="Encore une question ?"
          title={`Discutons de<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">votre projet.</span>`}
          description="Pas sûr de quelle offre vous correspond ? On vous aide à choisir lors d'un premier échange gratuit et sans engagement."
          primaryLabel="Prendre rendez-vous"
          secondaryLabel="07 78 43 57 21"
          secondaryHref="tel:+33778435721"
          showContactInfo
          bgImage="/tarifs-bg-cta.jpg"
          belowFooter
        />
      </PostFooterPortal>
    </>
  );
}

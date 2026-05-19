import Hero from "@/components/Hero";
import { PricingSection, type Plan } from "@/components/ui/pricing";
import CTASection from "@/components/CTASection";

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
      <Hero
        pillText="Tarifs"
        title={`Des tarifs <span class="italic">honnêtes</span>,<br>sans surprise.`}
        lead="Trois offres pensées pour répondre à chaque étape de votre activité. Pas de prix gonflé, pas de coûts cachés. Le devis qu'on annonce est le prix que vous payez."
      />

      <section style={{ padding: "20px 0 100px" }}>
        <div className="container">
          <PricingSection
            plans={PLANS}
            heading="Choisissez la formule qui vous correspond"
            description="Basculez entre paiement unique et formule mensuelle selon votre préférence."
          />
        </div>
      </section>

      {/* Section "Tout inclus dans chaque offre" */}
      <section style={{ background: "#FFF" }}>
        <div className="container">
          <span className="eyebrow">Inclus dans toutes nos offres</span>
          <h2 style={{ margin: "18px 0 56px", maxWidth: 720 }}>
            Quoi que vous<br />
            choisissiez, vous <span className="italic">repartez avec.</span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            style={{
              gap: 32,
            }}
          >
            {[
              {
                title: "Le code source",
                desc: "Vous êtes propriétaire de votre site, du premier au dernier fichier.",
              },
              {
                title: "Hébergement vert",
                desc: "Serveurs Infomaniak en Suisse, énergie 100% renouvelable.",
              },
              {
                title: "Devis ferme",
                desc: "Le prix annoncé est le prix final. Zéro coût caché.",
              },
              {
                title: "Fondateurs accessibles",
                desc: "Pas d'intermédiaire commercial. Vous parlez directement à l'équipe.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h4 style={{ fontSize: 17, marginBottom: 10 }}>{item.title}</h4>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-soft)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ tarifs */}
      <section>
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="eyebrow">Questions fréquentes</span>
          <h2 style={{ margin: "18px 0 48px" }}>
            Vos questions<br />
            sur nos <span className="italic">tarifs.</span>
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            {[
              {
                q: "Pourquoi un écart si grand entre 300€ et 3500€ ?",
                a: "Parce qu'il y a un monde entre un site simple basé sur un template adapté (Starter) et un site sur mesure complet avec automatisations métier et CRM avancé (Premium). On préfère être transparent sur ces écarts plutôt que de proposer des prix flous.",
              },
              {
                q: "Quelle est la différence entre one-shot et mensuel ?",
                a: "En one-shot, vous payez une fois et le site vous appartient immédiatement. En mensuel, vous étalez le coût sur 12 mois avec hébergement et maintenance inclus — idéal si vous ne voulez pas avancer toute la somme. À la fin des 12 mois, le site reste à vous.",
              },
              {
                q: "Que se passe-t-il après les 12 mois pour la formule mensuelle ?",
                a: "Vous avez le choix : continuer la formule mensuelle pour conserver hébergement et maintenance, ou récupérer le site et gérer vous-même l'hébergement. Aucun engagement supplémentaire imposé.",
              },
              {
                q: "Le prix peut-il évoluer en cours de projet ?",
                a: "Non. Le devis qu'on signe ensemble est ferme. Si vous demandez des fonctionnalités hors périmètre initial, on fait un avenant chiffré et validé par vous avant de continuer. Pas de mauvaise surprise.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderTop: "0.5px solid var(--line)",
                  paddingTop: 24,
                }}
              >
                <h4 style={{ fontSize: 17, marginBottom: 10 }}>{item.q}</h4>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-soft)",
                    lineHeight: 1.7,
                    maxWidth: 720,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Encore une question ?"
        title={`Discutons de<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">votre projet.</span>`}
        description="Pas sûr de quelle offre vous correspond ? On vous aide à choisir lors d'un premier échange gratuit et sans engagement."
        primaryLabel="Prendre rendez-vous"
        secondaryLabel="07 78 43 57 21"
        secondaryHref="tel:+33778435721"
        showContactInfo
      />
    </>
  );
}

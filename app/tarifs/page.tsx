import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { StaggerText } from "@/components/ui/stagger-text";
import { BlurFade } from "@/components/ui/blur-fade";
import StructuredData from "@/components/StructuredData";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Tarifs création de site web — Elevora | Devis gratuit" },
  description:
    "Tarifs Elevora : landing dès 600 € TTC, site vitrine 750 € TTC, e-commerce 2 000 € TTC. Applications et outils de gestion sur devis. Devis gratuit sous 5 jours.",
  alternates: { canonical: "/tarifs" },
  openGraph: {
    title: "Tarifs création de site web — Elevora | Devis gratuit",
    description:
      "Tarifs Elevora : landing dès 600 € TTC, site vitrine 750 € TTC, e-commerce 2 000 € TTC. Applications et outils de gestion sur devis. Devis gratuit sous 5 jours.",
    url: "https://elevora-agency.com/tarifs",
    type: "website",
  },
};

const POINTS = [
  {
    name: "Landing page",
    desc: "Une page, un seul objectif : convertir vos visiteurs.",
    from: "À partir de",
    amount: "600 € TTC",
    href: "/services/landing-page",
  },
  {
    name: "Site vitrine",
    desc: "Votre présence pro : design sur mesure, SEO natif, back-office simple.",
    from: "À partir de",
    amount: "750 € TTC",
    href: "/services/site-vitrine",
  },
  {
    name: "Site e-commerce",
    desc: "Boutique complète : catalogue, paiement Stripe, stocks, livraison.",
    from: "À partir de",
    amount: "2 000 € TTC",
    href: "/services/site-ecommerce",
  },
  {
    name: "Application web & mobile",
    desc: "Un produit sur mesure : dashboards, espaces clients, outils métier.",
    from: null,
    amount: "Sur devis",
    href: "/services/application-web-mobile",
  },
  {
    name: "CRM & outil de gestion",
    desc: "Votre logiciel métier : CRM, facturation, RH, extranet.",
    from: null,
    amount: "Sur devis",
    href: "/services/crm-outil-de-gestion",
  },
];

const PRINCIPES = [
  {
    n: "01",
    t: "On part du besoin, pas d’un catalogue",
    d: "Pas de grille rigide à cocher. On écoute votre projet, on définit le périmètre vraiment utile, et on chiffre à partir de là.",
  },
  {
    n: "02",
    t: "Un devis ferme, validé avant de commencer",
    d: "Le montant qu’on annonce est le montant final. Toute évolution hors périmètre est chiffrée et validée par écrit — jamais de surprise.",
  },
  {
    n: "03",
    t: "On vous dit quand c’est trop",
    d: "Si une option n’a pas d’intérêt pour votre activité, on vous le dit et on l’enlève. Notre métier, c’est de vous lancer efficacement — pas de gonfler la facture.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Pourquoi des prix « à partir de » et pas une grille figée ?",
    a: "Parce qu’un projet se chiffre sur son périmètre réel : nombre de pages, fonctionnalités, intégrations, contenus. Plutôt qu’une grille rigide qui ne colle jamais tout à fait, on part de votre besoin et on vous remet un devis ferme. Les montants affichés sont nos points de départ honnêtes.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "On cadre le projet, puis on signe un devis. Selon l’ampleur, le règlement peut être échelonné en plusieurs fois, calé sur les étapes de livraison, pour ne pas bloquer votre trésorerie. Aucun abonnement imposé.",
  },
  {
    q: "Le prix peut-il évoluer en cours de projet ?",
    a: "Non. Le devis qu’on signe ensemble est ferme. Si vous demandez des fonctionnalités hors périmètre initial, on fait un avenant chiffré et validé par vous avant de continuer. Pas de mauvaise surprise.",
  },
  {
    q: "Vous pouvez me déconseiller une option ?",
    a: "Oui, et on le fait régulièrement. Si une fonctionnalité n’a pas d’intérêt pour votre activité, on vous le dit et on l’enlève du devis. Notre métier, c’est de vous mettre en ligne efficacement — pas de gonfler la facture.",
  },
];

const TZ_CSS = `
.tz-points { padding: clamp(56px,8vw,104px) 0 clamp(36px,5vw,64px); }
.tz-head { max-width: 760px; margin: 0 0 clamp(36px,5vw,60px); }
.tz-h2 { font-family: var(--serif); font-weight: 500; font-size: clamp(32px,4.6vw,56px); line-height: 1.05; letter-spacing: -0.015em; color: var(--ink); margin: 18px 0 0; }
.tz-h2 em { font-style: italic; color: var(--pink); font-weight: 400; }
.tz-sub { margin-top: 18px; color: var(--ink-soft); font-size: clamp(15px,1.3vw,17px); line-height: 1.7; max-width: 600px; }

.tz-list { border-bottom: 1px solid var(--line); }
.tz-row { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 28px; padding: clamp(24px,3.2vw,38px) 0; border-top: 1px solid var(--line); text-decoration: none; color: inherit; position: relative; transition: padding-left .5s var(--ease); }
.tz-row::before { content: ''; position: absolute; left: -22px; top: 14%; bottom: 14%; width: 2px; background: linear-gradient(var(--klein), var(--pink)); transform: scaleY(0); transform-origin: top; transition: transform .5s var(--ease); border-radius: 2px; }
.tz-row:hover { padding-left: 16px; }
.tz-row:hover::before { transform: scaleY(1); }
.tz-row__name { font-family: var(--serif); font-weight: 500; font-size: clamp(23px,2.7vw,33px); letter-spacing: -0.01em; color: var(--ink); transition: color .4s var(--ease); }
.tz-row:hover .tz-row__name { color: var(--klein); }
.tz-row__desc { margin-top: 7px; color: var(--ink-muted); font-size: 14.5px; line-height: 1.55; max-width: 520px; }
.tz-row__price { display: flex; align-items: center; gap: 16px; white-space: nowrap; }
.tz-row__pricetext { text-align: right; }
.tz-row__from { display: block; font-family: var(--sans); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 3px; }
.tz-row__amount { font-family: var(--serif); font-size: clamp(20px,2vw,26px); font-weight: 500; color: var(--klein); letter-spacing: -0.01em; }
.tz-row__amount--devis { font-style: italic; color: var(--pink); }
.tz-row__arrow { color: var(--ink-muted); opacity: 0; transform: translateX(-6px); transition: opacity .4s var(--ease), transform .4s var(--ease), color .4s var(--ease); flex-shrink: 0; }
.tz-row:hover .tz-row__arrow { opacity: 1; transform: translateX(0); color: var(--klein); }
.tz-note { margin-top: clamp(26px,3.4vw,38px); font-size: 14.5px; color: var(--ink-soft); display: flex; align-items: center; gap: 12px; line-height: 1.5; }
.tz-note strong { color: var(--klein); font-weight: 600; }
.tz-note__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--pink); flex-shrink: 0; }

.tz-how { padding: clamp(52px,7.5vw,96px) 0; border-top: 1px solid var(--line); }
.tz-how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(28px,4vw,56px); margin-top: clamp(34px,4.5vw,54px); }
.tz-how-num { font-family: var(--serif); font-size: clamp(38px,4.8vw,60px); font-weight: 500; color: var(--klein); opacity: .2; line-height: 1; letter-spacing: -0.02em; }
.tz-how-title { margin-top: 14px; font-family: var(--serif); font-weight: 500; font-size: clamp(19px,1.9vw,24px); color: var(--ink); letter-spacing: -0.01em; line-height: 1.25; }
.tz-how-desc { margin-top: 11px; color: var(--ink-soft); font-size: 14.5px; line-height: 1.65; }

@media (max-width: 860px) {
  .tz-how-grid { grid-template-columns: 1fr; gap: 30px; }
}
@media (max-width: 620px) {
  .tz-row { grid-template-columns: 1fr; gap: 12px; align-items: start; }
  .tz-row__price { justify-content: flex-start; }
  .tz-row__pricetext { text-align: left; }
  .tz-row::before { top: 6px; bottom: 6px; }
}
`;

export default function TarifsPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Tarifs', path: '/tarifs' }]),
          faqSchema(
            FAQ_ITEMS.map((item) => ({ question: item.q, answer: item.a }))
          ),
        ]}
      />
      <style dangerouslySetInnerHTML={{ __html: TZ_CSS }} />
      <div className="tarifs-page-bg">
        <Hero
          title={`Le juste prix,<br><span class="italic">annoncé d’avance.</span>`}
          lead="Pas de grille rigide, pas de prix gonflé. On part de votre besoin réel, on cadre le périmètre, et on vous remet un devis ferme. Voici nos points de départ."
          transparentBg
          topPadding={84}
        />

        {/* Nos points de départ */}
        <section className="tz-points">
          <div className="container">
            <div className="tz-head">
              <span className="eyebrow">Nos points de départ</span>
              <h2 className="tz-h2">
                <StaggerText text="Combien pour " />
                <em><StaggerText text="votre projet ?" /></em>
              </h2>
              <BlurFade inView delay={0.1}>
                <p className="tz-sub">
                  Voici à partir de combien démarre chaque type de projet. Le tarif
                  final dépend du périmètre — on l’établit ensemble, sans coût caché.
                </p>
              </BlurFade>
            </div>

            <div className="tz-list">
              {POINTS.map((p) => (
                <a href={p.href} className="tz-row" key={p.name}>
                  <div className="tz-row__main">
                    <div className="tz-row__name">{p.name}</div>
                    <div className="tz-row__desc">{p.desc}</div>
                  </div>
                  <div className="tz-row__price">
                    <div className="tz-row__pricetext">
                      {p.from && <span className="tz-row__from">{p.from}</span>}
                      <span
                        className={
                          p.from
                            ? "tz-row__amount"
                            : "tz-row__amount tz-row__amount--devis"
                        }
                      >
                        {p.amount}
                      </span>
                    </div>
                    <svg
                      className="tz-row__arrow"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            <p className="tz-note">
              <span className="tz-note__dot" aria-hidden="true" />
              <span>
                Chaque projet est unique. On vous remet un{" "}
                <strong>devis gratuit et détaillé sous 5 jours</strong> après un
                premier échange.
              </span>
            </p>
          </div>
        </section>

        {/* Comment on fixe le prix */}
        <section className="tz-how">
          <div className="container">
            <div className="tz-head">
              <span className="eyebrow">Comment on fixe le prix</span>
              <h2 className="tz-h2">
                <StaggerText text="Transparent, " />
                <em><StaggerText text="du premier échange à la facture." /></em>
              </h2>
            </div>
            <div className="tz-how-grid">
              {PRINCIPES.map((pr) => (
                <div className="tz-how-item" key={pr.n}>
                  <div className="tz-how-num">{pr.n}</div>
                  <h3 className="tz-how-title">{pr.t}</h3>
                  <p className="tz-how-desc">{pr.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inclus dans chaque projet */}
        <section className="tarifs-included">
          <div className="container">
            <div className="tarifs-included-head">
              <span className="eyebrow">Inclus dans chaque projet</span>
              <h2 className="tarifs-included-title">
                <StaggerText text="Quel que soit votre projet," /><br />
                <StaggerText text="vous " />
                <span className="italic"><StaggerText text="repartez avec." /></span>
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
                  desc: "Pas d'intermédiaire commercial. Vous parlez directement à Célian de A à Z.",
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

        {/* FAQ tarifs */}
        <section className="tarifs-faq">
          <div className="container">
            <div className="tarifs-faq-layout">
              <div className="tarifs-faq-head">
                <span className="eyebrow">Questions fréquentes</span>
                <h2 className="tarifs-faq-title">
                  <StaggerText text="Vos questions" /><br />
                  <StaggerText text="sur nos " />
                  <span className="italic"><StaggerText text="tarifs." /></span>
                </h2>
                <BlurFade inView delay={0.1}>
                  <p className="tarifs-faq-lead">
                    Des réponses claires sur notre façon de chiffrer un projet et
                    de travailler avec vous.
                  </p>
                </BlurFade>
                <span className="tarifs-faq-underline" aria-hidden="true" />
              </div>

              <div className="tarifs-faq-list">
                {FAQ_ITEMS.map((item, i) => (
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

      {/* CTA replacée AVANT le footer (flux normal, comme sur les pages
          services). L'ancien montage PostFooterPortal la rendait APRÈS le
          footer : celui-ci, avec sa marge négative et son z-index de carte,
          passait par-dessus la section « Parlons de votre projet ». */}
      <CTASection
        eyebrow="Parlons de votre projet"
        title={`Discutons de<br><span style="font-family: var(--serif); font-style: italic; color: var(--pink); font-weight: 400;">votre projet.</span>`}
        description="Pas sûr du périmètre idéal ? On en discute lors d'un premier échange gratuit et sans engagement, puis on vous remet un devis détaillé sous 5 jours."
        primaryLabel="Prendre rendez-vous"
        secondaryLabel="07 78 43 57 21"
        secondaryHref="tel:+33778435721"
        showContactInfo
        bgImage="/tarifs-bg-cta.jpg"
        noBleed
      />
    </>
  );
}

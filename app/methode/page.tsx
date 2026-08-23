import Link from 'next/link';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { StaggerText } from '@/components/ui/stagger-text';
import { BlurFade } from '@/components/ui/blur-fade';
import StructuredData from '@/components/StructuredData';
import { howToSchema, breadcrumbSchema } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Méthode Elevora en 4 étapes — création de site web' },
  description:
    "Notre méthode en 4 étapes : cadrage, design, développement, livraison. Transparente, jalonnée, sans zone d'ombre. Devis ferme et suivi 30 jours inclus.",
  alternates: { canonical: '/methode' },
  openGraph: {
    title: 'Méthode Elevora en 4 étapes — création de site web',
    description:
      "Notre méthode en 4 étapes : cadrage, design, développement, livraison. Transparente, jalonnée, sans zone d'ombre. Devis ferme et suivi 30 jours inclus.",
    url: 'https://elevora-agency.com/methode',
    type: 'website',
  },
};

export default function MethodePage() {
  return (
    <>
      <StructuredData
        data={[breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Méthode', path: '/methode' }]), howToSchema({
          name: 'La méthode Elevora en 4 étapes',
          description:
            "De l'idée à la mise en ligne : cadrage, design, développement, livraison.",
          steps: [
            {
              name: 'Cadrage',
              text: 'Atelier de découverte, objectifs business, contraintes techniques, devis ferme. ~1 semaine.',
            },
            {
              name: 'Design',
              text: 'Design conçu directement dans votre futur site, validé page par page sur une URL privée. Deux allers-retours d’ajustement inclus. ~2 semaines.',
            },
            {
              name: 'Développement',
              text: 'Code propre par sprints hebdomadaires, environnement de test partagé. ~3 à 5 semaines.',
            },
            {
              name: 'Livraison',
              text: 'Mise en ligne, formation à la gestion, suivi 30 jours inclus. ~1 semaine + suivi.',
            },
          ],
        })]}
      />
      {/* HERO custom : texte aligne a GAUCHE, image colonne marbre a DROITE */}
      <section className="methode-hero">
        <div className="methode-hero-bg" aria-hidden="true" />
        <div className="methode-hero-inner">
          <div className="methode-hero-content">
            <div className="methode-hero-meta">
              <span className="methode-hero-meta-label">4 étapes · 7 à 9 semaines</span>
            </div>
            <h1 className="methode-hero-title">
              <StaggerText text="De l'idée à la mise en ligne," /><br />
              <StaggerText text="un chemin " />
              <span className="italic"><StaggerText text="clair et balisé." /></span>
            </h1>
            <BlurFade delay={0.16} yOffset={8}>
              <p className="methode-hero-lead">
                Un projet digital se passe mal quand le client ne sait pas où il
                en est, ce qu'on attend de lui, et combien ça va coûter. On a
                structuré notre méthode pour que ces trois informations soient
                toujours sur la table.
              </p>
            </BlurFade>
            <BlurFade delay={0.28} yOffset={8}>
            <div className="methode-hero-chips">
              <span className="methode-chip">Devis ferme</span>
              <span className="methode-chip">Livraison annoncée</span>
              <span className="methode-chip">Suivi 30 jours offert</span>
            </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* INTRO RAPIDE : pose le decor avant le scroll des etapes */}
      <section className="methode-intro">
        <div className="container methode-intro-inner">
          <div className="methode-intro-tag">
            <span className="methode-intro-tag-dot" />
            Comment ça se passe
          </div>
          <h2 className="methode-intro-title">
            <StaggerText text="Chaque étape a un " />
            <span className="italic"><StaggerText text="objectif" /></span>
            <StaggerText text="," /><br />
            <StaggerText text="une durée et un livrable." />
          </h2>
          <BlurFade inView delay={0.12} yOffset={8}>
            <p className="methode-intro-text">
              Pas de jargon, pas de zone floue. À la fin de chaque étape, vous
              savez exactement ce que vous avez en main et ce qui vient ensuite.
              Vous gardez la main du début à la fin.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* STORY SCROLL — Les 4 etapes en immersion verticale */}
      <article>
        <FlowArt aria-label="Méthode Elevora — 4 étapes">

          {/* ETAPE 01 — CADRAGE : image Penseur lavande clair */}
          <FlowSection
            className="methode-step-first"
            aria-label="Étape 1 — Cadrage"
            style={{
              backgroundImage: 'url(/methode-step-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#F4E9F3',
            }}
          >
            <div className="methode-step">
              <div className="methode-step-left">
                <span className="methode-step-num methode-step-num-klein">01</span>
                <span className="methode-step-tag">Cadrage · ~ 1 semaine</span>
                <h2 className="methode-step-title">
                  On comprend<br />
                  <span className="italic methode-italic-klein">avant</span> d'agir.
                </h2>
                <p className="methode-step-lead">
                  Premier rendez-vous : on parle de votre métier, de vos clients,
                  de vos concurrents. On définit les objectifs concrets et les
                  indicateurs qui diront si c'est réussi.
                </p>
                <ul className="methode-step-points">
                  <li>Atelier de découverte (2 à 3 heures)</li>
                  <li>Analyse de la concurrence et des références</li>
                  <li>Définition des objectifs business chiffrés</li>
                  <li>Rédaction du brief technique</li>
                </ul>
              </div>
              <div className="methode-step-right">
                <div className="methode-deliverable">
                  <div className="methode-deliverable-head">
                    <span className="methode-deliverable-eyebrow">Ce que vous repartez avec</span>
                  </div>
                  <ul className="methode-deliverable-list">
                    <li><span className="bullet bullet-klein" /> Une note de cadrage qui synthétise tout</li>
                    <li><span className="bullet bullet-klein" /> Un planning prévisionnel détaillé</li>
                    <li><span className="bullet bullet-klein" /> Un devis ferme, valable 30 jours</li>
                  </ul>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* ETAPE 02 — DESIGN : image colonnes neon bleu nuit */}
          <FlowSection
            aria-label="Étape 2 — Design"
            style={{
              backgroundImage: 'url(/methode-step-2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#132758',
            }}
          >
            <div className="methode-step methode-step-dark">
              <div className="methode-step-left">
                <span className="methode-step-num methode-step-num-pink">02</span>
                <span className="methode-step-tag methode-step-tag-light">Design · ~ 2 semaines</span>
                <h2 className="methode-step-title methode-step-title-light">
                  On dessine.<br />
                  Vous <span className="italic methode-italic-pink">validez.</span>
                </h2>
                <p className="methode-step-lead methode-step-lead-light">
                  Pas de maquette figée : on conçoit vos pages directement dans
                  votre futur site, sur une URL privée. Vous cliquez, vous
                  naviguez, vous testez en conditions réelles. Deux
                  allers-retours d’ajustement sont inclus à cette étape.
                </p>
                <ul className="methode-step-points methode-step-points-light">
                  <li>Direction artistique sur 2-3 pistes</li>
                  <li>Maquettes haute-fidélité de toutes les pages</li>
                  <li>Aperçu navigable sur URL privée, sur tous vos écrans</li>
                  <li>Deux allers-retours d’ajustement inclus</li>
                </ul>
              </div>
              <div className="methode-step-right">
                <div className="methode-deliverable methode-deliverable-dark">
                  <div className="methode-deliverable-head">
                    <span className="methode-deliverable-eyebrow methode-deliverable-eyebrow-light">Ce que vous repartez avec</span>
                  </div>
                  <ul className="methode-deliverable-list methode-deliverable-list-light">
                    <li><span className="bullet bullet-pink" /> Maquettes haute-fidélité de toutes les pages</li>
                    <li><span className="bullet bullet-pink" /> Charte graphique appliquée à l'ensemble</li>
                    <li><span className="bullet bullet-pink" /> Aperçu en ligne sur URL privée</li>
                  </ul>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* ETAPE 03 — DEVELOPPEMENT : image temple marbre lavande clair (theme clair) */}
          <FlowSection
            aria-label="Étape 3 — Développement"
            style={{
              backgroundImage: 'url(/methode-step-3.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#EFE5EC',
            }}
          >
            <div className="methode-step">
              <div className="methode-step-left">
                <span className="methode-step-num methode-step-num-pink">03</span>
                <span className="methode-step-tag">Développement · ~ 3 à 5 semaines</span>
                <h2 className="methode-step-title">
                  Du code <span className="italic methode-italic-pink">propre.</span><br />
                  Pas de magie.
                </h2>
                <p className="methode-step-lead">
                  Développement par sprints hebdomadaires. Vous voyez le site
                  progresser semaine après semaine sur une URL privée. Aucune
                  surprise à la livraison.
                </p>
                <ul className="methode-step-points">
                  <li>Sprints hebdomadaires avec démos en direct</li>
                  <li>Code propre, commenté, archivé sur GitHub</li>
                  <li>Tests sur tous les navigateurs et mobiles</li>
                  <li>Audit performance et accessibilité avant livraison</li>
                </ul>
              </div>
              <div className="methode-step-right">
                <div className="methode-deliverable">
                  <div className="methode-deliverable-head">
                    <span className="methode-deliverable-eyebrow">Ce que vous repartez avec</span>
                  </div>
                  <ul className="methode-deliverable-list">
                    <li><span className="bullet bullet-pink" /> Démos de progression chaque semaine</li>
                    <li><span className="bullet bullet-pink" /> Code source propre sur GitHub à votre nom</li>
                    <li><span className="bullet bullet-pink" /> Score PageSpeed 90+ garanti</li>
                  </ul>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* ETAPE 04 — LIVRAISON : image statue rose pastel apaisee */}
          <FlowSection
            aria-label="Étape 4 — Livraison"
            style={{
              backgroundImage: 'url(/methode-step-4.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#FAE3E0',
            }}
          >
            <div className="methode-step">
              <div className="methode-step-left">
                <span className="methode-step-num methode-step-num-pink-deep">04</span>
                <span className="methode-step-tag methode-step-tag-pink">Livraison · ~ 1 semaine + suivi 30j</span>
                <h2 className="methode-step-title">
                  On vous <span className="italic methode-italic-pink-deep">forme.</span><br />
                  On reste là.
                </h2>
                <p className="methode-step-lead">
                  Mise en ligne, formation à l'administration, suivi 30 jours.
                  Vous êtes autonome avec votre outil, et on reste joignables sans
                  facturation cachée.
                </p>
                <ul className="methode-step-points">
                  <li>Mise en ligne sur votre nom de domaine</li>
                  <li>Formation 1h30 (captée en vidéo, offerte)</li>
                  <li>30 jours de suivi corrections inclus</li>
                  <li>Maintenance annuelle en option (tarif selon le site)</li>
                </ul>
              </div>
              <div className="methode-step-right">
                <div className="methode-deliverable methode-deliverable-pink">
                  <div className="methode-deliverable-head">
                    <span className="methode-deliverable-eyebrow methode-deliverable-eyebrow-pink">Ce que vous repartez avec</span>
                  </div>
                  <ul className="methode-deliverable-list">
                    <li><span className="bullet bullet-pink-deep" /> Site en ligne avec votre nom de domaine</li>
                    <li><span className="bullet bullet-pink-deep" /> Vidéo de formation personnalisée</li>
                    <li><span className="bullet bullet-pink-deep" /> 30 jours de suivi inclus</li>
                  </ul>
                </div>
              </div>
            </div>
          </FlowSection>
        </FlowArt>
      </article>

      {/* Widget DynamicIslandTOC retire sur demande utilisateur */}

      {/* BANNIERE IMAGE PURE — Recodee en <div> (et non <section>) pour ne pas
          heriter du `section { padding: 120px 0 }` global qui creait une bande
          grise visible entre l'etape 4 et cette image. */}
      <div className="methode-banner">
        <div className="methode-banner-bg" aria-hidden="true" />
        <div className="methode-banner-content">
          <span className="methode-banner-eyebrow">Notre méthode</span>
          <h2 className="methode-banner-title">
            <StaggerText text="Comprendre" /><br />
            <span className="methode-banner-em"><StaggerText text="avant d'agir," /></span><br />
            <StaggerText text="c'est faire mieux." />
          </h2>
          <BlurFade inView delay={0.14} yOffset={8}>
            <p className="methode-banner-sub">
              Chaque projet commence par l'écoute et l'analyse. Nous prenons le temps
              de comprendre vos enjeux pour construire des solutions sur-mesure, utiles et durables.
            </p>
          </BlurFade>
          <div className="methode-banner-pillars">
            <div className="methode-banner-pillar">
              <span className="methode-banner-ic" aria-hidden="true">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.4 10.2a4.6 4.6 0 0 1 9.2 0c0 3.7-3.7 4.3-3.7 7a2.35 2.35 0 0 1-4.7 0" />
                  <path d="M11.9 10.2a2.1 2.1 0 0 1 4.2 0" />
                  <path d="M4.3 7.9c-.85 1.7-.85 3.4 0 5.1" />
                  <path d="M6.9 9c-.46 .98-.46 1.9 0 2.9" />
                </svg>
              </span>
              <h3 className="methode-banner-pillar-t">Écoute active</h3>
              <p className="methode-banner-pillar-d">On pose les bonnes questions.</p>
            </div>
            <div className="methode-banner-pillar">
              <span className="methode-banner-ic" aria-hidden="true">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12.4" cy="12.4" r="6.6" />
                  <line x1="17.1" y1="17.1" x2="22.4" y2="22.4" />
                </svg>
              </span>
              <h3 className="methode-banner-pillar-t">Analyse précise</h3>
              <p className="methode-banner-pillar-d">On identifie vos vrais besoins.</p>
            </div>
            <div className="methode-banner-pillar">
              <span className="methode-banner-ic" aria-hidden="true">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.9 7.4 16.8 3.3a1.6 1.6 0 0 0-2.3 0L4 13.8 3 21l7.2-1 10.7-10.7a1.6 1.6 0 0 0 0-2.3z" />
                  <path d="M14 5.8 18.5 10.3" />
                </svg>
              </span>
              <h3 className="methode-banner-pillar-t">Stratégie claire</h3>
              <p className="methode-banner-pillar-d">On construit un plan d'action concret.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA — Demarrer un projet */}
      <section className="methode-cta">
        <div className="container methode-cta-inner">
          <span className="methode-cta-eyebrow">Démarrer</span>
          <h2 className="methode-cta-title">
            <StaggerText text="Tout commence par" /><br />
            <StaggerText text="un " />
            <span className="italic"><StaggerText text="échange." /></span>
          </h2>
          <BlurFade inView delay={0.14} yOffset={8}>
            <p className="methode-cta-lead">
              30 minutes en visio ou en café à Nantes. Vous nous racontez votre
              projet, on vous dit ce qu'on en pense. Aucun engagement.
            </p>
          </BlurFade>
          <Link href="/demarrer-un-projet" className="methode-cta-link">
            Prendre rendez-vous
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

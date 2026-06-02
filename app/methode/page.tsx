import Link from 'next/link';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';

export const metadata = {
  title: 'Méthode | Comment on travaille',
  description:
    "Notre méthode en 4 étapes : cadrage, design, développement, livraison. Transparente, jalonnée, sans zone d'ombre.",
};

export default function MethodePage() {
  return (
    <>
      {/* HERO custom : texte aligne a GAUCHE, image colonne marbre a DROITE */}
      <section className="methode-hero">
        <div className="methode-hero-bg" aria-hidden="true" />
        <div className="methode-hero-inner">
          <div className="methode-hero-content">
            <div className="methode-hero-meta">
              <span className="methode-hero-num">04</span>
              <span className="methode-hero-meta-line" />
              <span className="methode-hero-meta-label">étapes · 6 à 10 semaines</span>
            </div>
            <h1 className="methode-hero-title">
              De l'idée à la mise en ligne,<br />
              un chemin <span className="italic">clair et balisé.</span>
            </h1>
            <p className="methode-hero-lead">
              Un projet digital se passe mal quand le client ne sait pas où il
              en est, ce qu'on attend de lui, et combien ça va coûter. On a
              structuré notre méthode pour que ces trois informations soient
              toujours sur la table.
            </p>
            <div className="methode-hero-chips">
              <span className="methode-chip">Devis ferme</span>
              <span className="methode-chip">Livraison annoncée</span>
              <span className="methode-chip">Suivi 30 jours offert</span>
            </div>
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
            Chaque étape a un <span className="italic">objectif</span>,<br />
            une durée et un livrable.
          </h2>
          <p className="methode-intro-text">
            Pas de jargon, pas de zone floue. À la fin de chaque étape, vous
            savez exactement ce que vous avez en main et ce qui vient ensuite.
            Vous gardez la main du début à la fin.
          </p>
        </div>
      </section>

      {/* STORY SCROLL — Les 4 etapes en immersion verticale */}
      <article>
        <FlowArt aria-label="Méthode Elevora — 4 étapes">

          {/* ETAPE 01 — CADRAGE : image Penseur lavande clair */}
          <FlowSection
            aria-label="Étape 1 — Cadrage"
            style={{
              backgroundImage: 'url(/methode-step-1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#EBE8EF',
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
              backgroundImage: 'url(/methode-step-2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#001741',
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
                  Maquettes interactives sur Figma : vous cliquez, vous naviguez,
                  vous testez avant qu'une seule ligne de code soit écrite.
                  Retours gratuits et illimités à cette étape.
                </p>
                <ul className="methode-step-points methode-step-points-light">
                  <li>Direction artistique sur 2-3 pistes</li>
                  <li>Maquettes haute-fidélité de toutes les pages</li>
                  <li>Prototype cliquable navigable sur Figma</li>
                  <li>Allers-retours jusqu'à validation finale</li>
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
                    <li><span className="bullet bullet-pink" /> Prototype cliquable sur Figma</li>
                  </ul>
                </div>
              </div>
            </div>
          </FlowSection>

          {/* ETAPE 03 — DEVELOPPEMENT : image statue mystique bleu nuit profond */}
          <FlowSection
            aria-label="Étape 3 — Développement"
            style={{
              backgroundImage: 'url(/methode-step-3.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#090A1F',
            }}
          >
            <div className="methode-step methode-step-dark">
              <div className="methode-step-left">
                <span className="methode-step-num methode-step-num-pink">03</span>
                <span className="methode-step-tag methode-step-tag-light">Développement · ~ 3 à 5 semaines</span>
                <h2 className="methode-step-title methode-step-title-light">
                  Du code <span className="italic methode-italic-pink">propre.</span><br />
                  Pas de magie.
                </h2>
                <p className="methode-step-lead methode-step-lead-light">
                  Développement par sprints hebdomadaires. Vous voyez le site
                  progresser semaine après semaine sur une URL privée. Aucune
                  surprise à la livraison.
                </p>
                <ul className="methode-step-points methode-step-points-light">
                  <li>Sprints hebdomadaires avec démos en direct</li>
                  <li>Code propre, commenté, archivé sur GitHub</li>
                  <li>Tests sur tous les navigateurs et mobiles</li>
                  <li>Audit performance et accessibilité avant livraison</li>
                </ul>
              </div>
              <div className="methode-step-right">
                <div className="methode-deliverable methode-deliverable-dark">
                  <div className="methode-deliverable-head">
                    <span className="methode-deliverable-eyebrow methode-deliverable-eyebrow-light">Ce que vous repartez avec</span>
                  </div>
                  <ul className="methode-deliverable-list methode-deliverable-list-light">
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
              backgroundImage: 'url(/methode-step-4.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#FDE6EA',
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
                  <li>Maintenance technique 12 mois incluse</li>
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

      <DynamicIslandTOC selector="article h2" accentColor="var(--pink)" />

      {/* BANNIERE IMAGE PURE : remplace l'ancienne section "Ce qu'on ne fera jamais".
          L'image contient deja son propre texte/icones integres, on n'ajoute rien par-dessus. */}
      <section className="methode-banner" aria-label="Comprendre avant d'agir">
        <div className="methode-banner-bg" aria-hidden="true" />
      </section>

      {/* CTA — Demarrer un projet */}
      <section className="methode-cta">
        <div className="container methode-cta-inner">
          <span className="methode-cta-eyebrow">Démarrer</span>
          <h2 className="methode-cta-title">
            Tout commence par<br />
            un <span className="italic">échange.</span>
          </h2>
          <p className="methode-cta-lead">
            30 minutes en visio ou en café à Nantes. Vous nous racontez votre
            projet, on vous dit ce qu'on en pense. Aucun engagement.
          </p>
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

import CinematicHero from '@/components/CinematicHero';
import WhyNow from '@/components/WhyNow';
import ForWho from '@/components/ForWho';
import EngagementsGrid from '@/components/EngagementsGrid';
import Manifesto from '@/components/Manifesto';
import ProjectShowcase from '@/components/ProjectShowcase';
import MethodSteps from '@/components/MethodSteps';
import TestimonialsSection from '@/components/TestimonialsSection';
import { FaqsSection } from '@/components/FaqsSection';
import { CinematicFooter } from '@/components/CinematicFooter';
import RomanRail from '@/components/RomanRail';
import StructuredData from '@/components/StructuredData';
import { faqSchema, videoSchema } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Agence digitale à Nantes — Elevora | Sites web & gestion' },
  description:
    'Elevora, agence digitale nantaise. Sites web qui convertissent et outils de gestion sur mesure pour indépendants et PME. Devis ferme, hébergement Infomaniak.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Agence digitale à Nantes — Elevora | Sites web & gestion',
    description:
      'Elevora, agence digitale nantaise. Sites web qui convertissent et outils de gestion sur mesure pour indépendants et PME. Devis ferme, hébergement Infomaniak.',
    url: 'https://elevora-agency.com/',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="home-with-cinematic-footer">
      <StructuredData
        data={[faqSchema([
          {
            question: 'Combien de temps faut-il pour créer mon site ?',
            answer:
              "Comptez 2 à 4 semaines pour une landing, 4 à 8 semaines pour un site vitrine complet, et 6 à 12 semaines pour un outil de gestion sur mesure. Tout dépend du nombre de pages, des fonctionnalités et de votre réactivité sur les retours. On vous donne un planning précis dès le démarrage.",
          },
          {
            question: 'Est-ce que je pourrai modifier mon site moi-même ?',
            answer:
              "Oui. On vous livre un site que vous pouvez gérer en autonomie, et on vous forme à son utilisation. Pour les modifications plus techniques, on reste disponibles via un accompagnement à la demande, sans engagement.",
          },
          {
            question: 'Combien coûte un site avec Elevora ?',
            answer:
              "Nos sites démarrent à 600 € TTC pour une landing page, 750 € TTC pour un site vitrine et 2 000 € TTC pour une boutique en ligne. Les applications et outils de gestion sur mesure font l'objet d'un devis. Le tarif final dépend du périmètre — on le cadre ensemble, sans coût caché.",
          },
          {
            question: 'Proposez-vous un paiement en plusieurs fois ?',
            answer:
              "Oui. Selon le projet, on peut échelonner le règlement en plusieurs fois, calé sur les étapes de livraison, pour étaler l'investissement sans bloquer votre trésorerie. Aucun abonnement imposé.",
          },
          {
            question: 'Que se passe-t-il après la mise en ligne ?',
            answer:
              "On ne disparaît pas une fois le site livré : suivi gratuit pendant 30 jours pour les ajustements et corrections, puis maintenance ou évolutions à la demande, sans engagement.",
          },
          {
            question: 'Travaillez-vous avec des entreprises hors de Nantes ?',
            answer:
              "Bien sûr. On est basés à Nantes mais on accompagne des indépendants et PME partout en France. Tout se gère à distance, avec des points réguliers en visio.",
          },
        ]),
        // VideoObject : décrit les 2 vidéos de la page pour Search Console
        // (« vidéo non indexée : pas sur une page de lecture »).
        videoSchema({
          name: 'Elevora — ouverture cinématique',
          description:
            "Séquence d'ouverture du site Elevora : la statue emblème de l'agence, entre marbre et lumière, introduit notre univers — sites web qui convertissent et outils de gestion sur mesure.",
          contentPath: '/hero-intro.mp4',
          thumbnailPath: '/scrub-frames/f_001.webp',
          uploadDate: '2026-07-02',
        }),
        videoSchema({
          name: 'Elevora — nos engagements',
          description:
            "Ambiance visuelle de la section « Pourquoi Elevora » : nos engagements d'agence — devis ferme, code propre, accompagnement de A à Z.",
          contentPath: '/eng-video.mp4',
          thumbnailPath: '/eng-fond.webp',
          uploadDate: '2026-07-02',
        }),
        ]}
      />
      {/* Habillage de fond continu (halos + grille), derrière TOUT le contenu
          (z-index:-1). La cinématique d'ouverture, opaque, le recouvre ; les
          parties 01+ (transparentes) le laissent transparaître. */}
      <div className="landing-dressing" aria-hidden="true">
        <span className="landing-dressing-grid" />
      </div>

      {/* Ouverture cinématique (réécrite de zéro) : hero Hero.mp4 en boucle +
          scrub Image_1_à_2 piloté au scroll + promesse figée sur la dernière
          frame. Tout est dans CinematicHero (section + scène sticky). */}
      <CinematicHero />

      {/* Parties 2+3 — fond gris commun (Le constat + Pour qui) */}
      <div className="lp-group lp-group-intro">
        {/* 02 — Le constat */}
        <div id="constat" data-roman-section data-roman="02" data-roman-title="Le constat"><WhyNow /></div>
        {/* 03 — Pour qui */}
        <div id="pour-qui" data-roman-section data-roman="03" data-roman-title="Pour qui"><ForWho /></div>
      </div>

      {/* 04 — Pourquoi Elevora (engagements) — vidéo brumeuse, transitions fondues */}
      <div id="pourquoi" data-roman-section data-roman="04" data-roman-title="Pourquoi Elevora" className="lp-group-engage"><EngagementsGrid /></div>

      {/* Parties 5+6 — fond commun (Manifeste + Réalisations) */}
      <div className="lp-group lp-group-work">
        {/* Manifeste */}
        <div id="manifeste" data-roman-section data-roman="05" data-roman-title="Manifeste"><Manifesto /></div>
        {/* 06 — Réalisations */}
        <div id="realisations" data-roman-section data-roman="06" data-roman-title="Réalisations" className="sec-warm"><ProjectShowcase /></div>
      </div>

      {/* 07 — Méthode (sombre) */}
      <div id="methode" data-roman-section data-roman="07" data-roman-title="Notre méthode" data-roman-tone="dark" className="sec-night"><MethodSteps /></div>

      {/* 08 — Témoignages */}
      <div id="temoignages" data-roman-section data-roman="08" data-roman-title="Témoignages" className="sec-warm"><TestimonialsSection /></div>

      {/* 09 — FAQ */}
      <div id="faq" data-roman-section data-roman="09" data-roman-title="FAQ" className="sec-white"><FaqsSection /></div>

      {/* Fil de chiffres romains — couvre intro + toutes les parties */}
      <RomanRail />

      <CinematicFooter />
    </div>
  );
}

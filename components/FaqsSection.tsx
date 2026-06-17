"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StaggerText } from "@/components/ui/stagger-text";
import { BlurFade } from "@/components/ui/blur-fade";

const questions = [
  {
    id: "item-1",
    title: "Combien de temps faut-il pour créer mon site ?",
    content:
      "Comptez 2 à 4 semaines pour une landing, 4 à 8 semaines pour un site vitrine complet, et 6 à 12 semaines pour un outil de gestion sur mesure. Tout dépend du nombre de pages, des fonctionnalités et de votre réactivité sur les retours. On vous donne un planning précis dès le démarrage.",
  },
  {
    id: "item-2",
    title: "Est-ce que je pourrai modifier mon site moi-même ?",
    content:
      "Oui. On vous livre un site que vous pouvez gérer en autonomie, et on vous forme à son utilisation. Pour les modifications plus techniques, on reste disponibles via un accompagnement à la demande, sans engagement.",
  },
  {
    id: "item-3",
    title: "Combien coûte un site avec Elevora ?",
    content:
      "Nos sites démarrent à 600 € TTC pour une landing page, 1 000 € TTC pour un site vitrine et 1 500 € TTC pour une boutique en ligne. Les applications et outils de gestion sur mesure font l'objet d'un devis. Le tarif final dépend du périmètre — on le cadre ensemble, sans coût caché.",
  },
  {
    id: "item-4",
    title: "Proposez-vous un paiement en plusieurs fois ?",
    content:
      "Oui. Selon le projet, on peut échelonner le règlement en plusieurs fois, calé sur les étapes de livraison, pour étaler l'investissement sans bloquer votre trésorerie. Aucun abonnement imposé.",
  },
  {
    id: "item-5",
    title: "Que se passe-t-il après la mise en ligne ?",
    content:
      "On ne disparaît pas une fois le site livré : suivi gratuit pendant 30 jours pour les ajustements et corrections, puis maintenance ou évolutions à la demande, sans engagement.",
  },
  {
    id: "item-6",
    title: "Travaillez-vous avec des entreprises hors de Nantes ?",
    content:
      "Bien sûr. On est basés à Nantes mais on accompagne des indépendants et PME partout en France. Tout se gère à distance, avec des points réguliers en visio.",
  },
];

export function FaqsSection() {
  return (
    <section className="section faq-section" id="faq">
      {/* Image de transition (chevauchement + statue qui depasse) en FOND de
          la section. Le contenu FAQ s'affiche par-dessus, sous la statue.
          Reproduit le comportement de la maquette (pas d'image isolee + bord net). */}
      <div className="faq-bg" aria-hidden="true" />
      <div className="container faq-container">
        <div className="faq-head">
          <BlurFade inView delay={0}>
            <span className="eyebrow">
              09 — Questions fréquentes
            </span>
          </BlurFade>
          <h2 className="faq-title">
            <StaggerText text="Tout ce que vous vous " />
            <em><StaggerText text="demandez" /></em>
            <StaggerText text="." />
          </h2>
          <BlurFade inView delay={0.12}>
            <p className="faq-sub">
              Vous ne trouvez pas votre réponse ? Écrivez-nous, on répond vite.
            </p>
          </BlurFade>
        </div>

        <Accordion
          type="single"
          collapsible
          className="faq-accordion"
          defaultValue="item-1"
        >
          {questions.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="faq-item">
              <AccordionTrigger className="faq-trigger">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="faq-content">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="faq-foot">
          Une question précise sur votre projet ?{" "}
          <a href="/contact" className="faq-link">
            Parlons-en directement
          </a>
        </p>
      </div>
    </section>
  );
}

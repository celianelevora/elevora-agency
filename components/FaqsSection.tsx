"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    id: "item-1",
    title: "Combien de temps faut-il pour créer mon site ?",
    content:
      "En général, comptez 2 à 4 semaines pour un site vitrine, et 4 à 8 semaines pour un projet sur-mesure avec outils de gestion. Tout dépend du nombre de pages, des fonctionnalités et de votre réactivité sur les retours. On vous donne un planning précis dès le démarrage.",
  },
  {
    id: "item-2",
    title: "Est-ce que je pourrai modifier mon site moi-même ?",
    content:
      "Oui. On vous livre un site que vous pouvez gérer en autonomie, et on vous forme à son utilisation. Pour les modifications plus techniques, on reste disponibles via nos formules d'accompagnement.",
  },
  {
    id: "item-3",
    title: "Quelle est la différence entre vos formules ?",
    content:
      "La formule Starter (300€ ou 39€/mois) couvre l'essentiel pour démarrer. La Standard (1500€ ou 59€/mois) est notre cœur de cible : un vrai site qui convertit. La Premium (2500-3500€) ajoute le sur-mesure complet, un CRM, de l'automatisation et un accompagnement renforcé.",
  },
  {
    id: "item-4",
    title: "Proposez-vous un paiement en plusieurs fois ?",
    content:
      "Oui. Nos formules Starter et Standard sont disponibles en mensualités sur 12 mois (39€/mois ou 59€/mois), pour étaler l'investissement sans bloquer votre trésorerie.",
  },
  {
    id: "item-5",
    title: "Que se passe-t-il après la mise en ligne ?",
    content:
      "On ne disparaît pas une fois le site livré. Selon votre formule, on assure le suivi, les mises à jour, et on reste joignables pour faire évoluer votre site au rythme de votre activité.",
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
    <>
      {/* Transition chevauchement + statue qui depasse (RECAP-PROJET.md).
          Aspect-ratio 1115/1091 = ratio exact de faq-fond.png, donc rien n'est rogne. */}
      <div className="faq-transition" aria-hidden="true">
        <div className="faq-fade faq-fade-top" />
        <div className="faq-fade faq-fade-bottom" />
      </div>

      <section className="section faq-section">
        <div className="container">
        <div className="faq-head">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            QUESTIONS FRÉQUENTES
          </span>
          <h2 className="faq-title">
            Tout ce que vous vous <em>demandez</em>.
          </h2>
          <p className="faq-sub">
            Vous ne trouvez pas votre réponse ? Écrivez-nous, on répond vite.
          </p>
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
    </>
  );
}

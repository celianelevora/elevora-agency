"use client";

import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const testimonials = [
  {
    quote:
      "Le site franchement c'est vraiment super, visuellement c'est vraiment mon univers, c'est super bluffant.",
    name: "Lily",
    designation: "Lily Berry — Nail Artist · lala-k.elevora-agency.com",
    src: "/testimonials/Testimonial1.jpg",
  },
  {
    quote:
      "Elevora a parfaitement capté l'univers de la marque. Le site est élégant, fluide, et reflète exactement le positionnement haut de gamme qu'on voulait. Un vrai bonheur de travailler avec eux.",
    name: "Lala K",
    designation: "Lala K — Institut beauté · lala-k.elevora-agency.com",
    src: "/testimonials/Testimonial2.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section">
      {/* Image de fond du sanctuaire (formes abstraites lavande/rose) */}
      <div className="testi-bg" aria-hidden="true" />
      <div className="container">
        <div className="faq-head">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            05 — Ils nous font confiance
          </span>
          <h2 className="faq-title">
            Ce qu'en disent <em>nos clients</em>.
          </h2>
        </div>
        <div className="testimonials-wrap">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#1A1A2E",
              designation: "#6B6B6B",
              testimony: "#2E2E4A",
              arrowBackground: "#1B4F8A",
              arrowForeground: "#EAE9EE",
              arrowHoverBackground: "#2B6CC4",
            }}
            fontSizes={{
              name: "28px",
              designation: "16px",
              quote: "20px",
            }}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const testimonials = [
  {
    quote:
      "Le site franchement c'est vraiment super, visuellement c'est vraiment mon univers, c'est super bluffant.",
    name: "Lily",
    designation: "Lily Berry — Nail Artist · lala-k.elevora-agency.com",
    src: "/testimonials/Testimonial1.png",
  },
  {
    quote:
      "Elevora a transformé notre présence en ligne. On a enfin un site qui nous ressemble et qui nous amène de vrais clients. L'accompagnement a été clair du début à la fin, sans jargon.",
    name: "Marc Lefèvre",
    designation: "Gérant — Atelier Bois & Co · Menuiserie",
    src: "/testimonials/Testimonial2.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="faq-head">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            ILS NOUS FONT CONFIANCE
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
              name: "#0A0A0A",
              designation: "#6B6B6B",
              testimony: "#2D2D2D",
              arrowBackground: "#0033A0",
              arrowForeground: "#F5F0E8",
              arrowHoverBackground: "#0044CC",
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

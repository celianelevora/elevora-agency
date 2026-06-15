import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageEnter from "@/components/PageEnter";
import Preloader from "@/components/Preloader";

// Cochin (charte) n'est pas sur Google Fonts (fonte Linotype commerciale).
// On la prefere quand l'OS la fournit (Mac/iOS) ; sinon, fallback web le plus
// fidele a son elegance francaise : Cormorant Garamond (heritage Garamond,
// faible hauteur d'x, longues hampes, contraste raffine) — bien plus proche
// de Cochin que Playfair. La variable garde le nom --font-playfair pour rester
// compatible avec tous les usages deja en place dans le projet.
const playfair = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elevora-agency.com"),
  title: {
    default: "Elevora — Agence digitale à Nantes",
    template: "%s — Elevora",
  },
  description: "Elevora, agence digitale nantaise. Sites web qui convertissent et outils de gestion sur mesure pour indépendants et PME.",
  keywords: ["agence web Nantes", "création site internet", "outils de gestion", "développement web", "CRM sur mesure"],
  authors: [{ name: "Elevora" }],
  creator: "Elevora",
  publisher: "Elevora",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Elevora — Agence digitale à Nantes",
    description: "Sites web qui convertissent et outils de gestion sur mesure.",
    url: "https://elevora-agency.com",
    siteName: "Elevora",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevora — Agence digitale à Nantes",
    description: "Sites web qui convertissent et outils de gestion sur mesure.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${roboto.variable}`}>
      <body>
        <Preloader />
        <Header />
        <main>
          <PageEnter>{children}</PageEnter>
        </main>
        <Footer />
        {/* Slot pour pages qui veulent rendre du contenu APRES le footer
            (ex. /tarifs avec sa CTA "Discutons de votre projet" deplacee sous
            le footer). Voir composant <PostFooterPortal>. */}
        <div id="post-footer-slot" />
      </body>
    </html>
  );
}

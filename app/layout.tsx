import "./globals.css";
import type { Metadata } from "next";
import { Noto_Serif_Display, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageEnter from "@/components/PageEnter";
import Preloader from "@/components/Preloader";
import StructuredData from "@/components/StructuredData";
import CookieBanner from "@/components/CookieBanner";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo";

// POLICES — charte Elevora 2026 (« Trois polices, trois rôles »).
// • TITRES éditoriaux & logotype : Noto Serif Display Light (300).
// • CORPS / interface : Montserrat.
// Les deux sont chargées via next/font/google : self-hostées AU BUILD, donc
// AUCUN appel runtime à Google (conforme à la règle « pas de Google Fonts »).
// La variable des titres garde le nom --font-playfair pour rester compatible
// avec tous les usages déjà en place dans le projet (globals.css, composants).
const playfair = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
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
  alternates: { canonical: "/" },
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
    // Image OG statique 1200x630 servie depuis /public (plus d'edge runtime
    // ni de génération dynamique @vercel/og — évite le SIGABRT au build Infomaniak).
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevora — Agence digitale à Nantes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevora — Agence digitale à Nantes",
    description: "Sites web qui convertissent et outils de gestion sur mesure.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${montserrat.variable}`}>
      {/* Plus aucun <link> de police externe : Noto Serif Display et Montserrat
          sont self-hostées par next/font (zéro requête Fontshare/Google au runtime). */}
      <body>
        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <StructuredData data={[organizationSchema, websiteSchema, localBusinessSchema]} />
        <Preloader />
        <Header />
        <main id="main-content">
          <PageEnter>{children}</PageEnter>
        </main>
        <Footer />
        {/* Slot pour pages qui veulent rendre du contenu APRES le footer
            (ex. /tarifs avec sa CTA "Discutons de votre projet" deplacee sous
            le footer). Voir composant <PostFooterPortal>. */}
        <div id="post-footer-slot" />
        <CookieBanner />
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageEnter from "@/components/PageEnter";
import Preloader from "@/components/Preloader";
import StructuredData from "@/components/StructuredData";
import CookieBanner from "@/components/CookieBanner";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo";

// POLICES — conformité charte Elevora.
// • CORPS : Satoshi (Fontshare), chargée via <link> Fontshare dans le <head>
//   ci-dessous — police « Agence/Moderne » prescrite par la charte. Remplace
//   Roboto (banni : Google Fonts).
// • TITRES : Cochin (charte, fonte Linotype commerciale) quand l'OS la fournit
//   (Mac/iOS) ; sinon fallback web le plus fidele a son elegance francaise :
//   Cormorant Garamond. EXCEPTION ASSUMEE — Cormorant Garamond n'existe PAS sur
//   Fontshare ; on la conserve donc en next/font/google (self-hostee au build,
//   aucun appel runtime a Google). La variable garde le nom --font-playfair
//   pour rester compatible avec tous les usages deja en place dans le projet.
const playfair = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevora — Agence digitale à Nantes",
    description: "Sites web qui convertissent et outils de gestion sur mesure.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={playfair.variable}>
      <head>
        {/* Police de corps Satoshi via Fontshare (charte Elevora). Preconnect
            aux deux origines Fontshare pour reduire la latence du chargement. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
        />
      </head>
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

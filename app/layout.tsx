import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageEnter from "@/components/PageEnter";

// Cochin n'est PAS sur Google Fonts (fonte commerciale Linotype).
// Strategie : on charge Playfair Display comme fallback web le plus
// proche de Cochin (serif elegant haut-contraste), et on prefere Cochin
// natif quand l'OS le fournit (Mac/iOS). Voir --font-serif dans globals.css.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

// Anciens aliases pour ne pas casser les usages existants
const fraunces = { variable: '' };
const inter = { variable: '' };

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
        <Header />
        <main>
          <PageEnter>{children}</PageEnter>
        </main>
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elevora — Agence digitale à Nantes",
    template: "%s — Elevora",
  },
  description: "Elevora, agence digitale nantaise. Sites web qui convertissent et outils de gestion sur mesure pour indépendants et PME.",
  keywords: ["agence web Nantes", "création site internet", "outils de gestion", "développement web", "CRM sur mesure"],
  authors: [{ name: "Elevora" }],
  openGraph: {
    title: "Elevora — Agence digitale à Nantes",
    description: "Sites web qui convertissent et outils de gestion sur mesure.",
    url: "https://elevora-agency.com",
    siteName: "Elevora",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

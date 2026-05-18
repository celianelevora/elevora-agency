import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Elevora — Agence digitale à Nantes',
    template: '%s — Elevora',
  },
  description:
    'Elevora, agence digitale nantaise. Sites web qui convertissent et outils de gestion sur mesure pour indépendants et PME.',
  keywords: ['agence web Nantes', 'création site internet', 'outils de gestion', 'développement web', 'CRM sur mesure'],
  authors: [{ name: 'Elevora' }],
  openGraph: {
    title: 'Elevora — Agence digitale à Nantes',
    description: 'Sites web qui convertissent et outils de gestion sur mesure.',
    url: 'https://elevora-agency.com',
    siteName: 'Elevora',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

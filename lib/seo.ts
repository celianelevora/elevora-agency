/**
 * lib/seo.ts — Source unique de vérité SEO (NAP + données structurées Schema.org).
 * Utilisé pour injecter le JSON-LD site-wide (layout) et par page (services, FAQ, méthode…).
 * Aucune donnée sensible : uniquement des informations publiques d'entreprise.
 */

export const SITE = {
  url: 'https://elevora-agency.com',
  name: 'Elevora',
  legalName: 'Elevora',
  description:
    "Agence digitale à Nantes. Sites web qui convertissent et outils de gestion sur mesure pour artisans, commerçants, PME et indépendants.",
  email: 'contact@elevora-agency.com',
  phone: '+33778435721',
  phoneDisplay: '+33 7 78 43 57 21',
  founder: 'Célian Soulet Lapetina',
  siren: '105274112',
  priceRange: '€€',
  address: {
    city: 'Nantes',
    region: 'Pays de la Loire',
    country: 'FR',
  },
  geo: { lat: 47.2184, lng: -1.5536 },
  areaServed: ['Nantes', 'Loire-Atlantique', 'France'],
} as const;

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const LOCAL_ID = `${SITE.url}/#localbusiness`;

export const organizationSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo-elevora-full.png`,
  image: `${SITE.url}/opengraph-image`,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  founder: { '@type': 'Person', name: SITE.founder },
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: SITE.siren },
  areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: 'FR',
    availableLanguage: ['French'],
  },
};

export const websiteSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: 'fr-FR',
  publisher: { '@id': ORG_ID },
};

export const localBusinessSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': LOCAL_ID,
  name: SITE.name,
  image: `${SITE.url}/opengraph-image`,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: SITE.priceRange,
  founder: { '@type': 'Person', name: SITE.founder },
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
  parentOrganization: { '@id': ORG_ID },
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}

export function serviceSchema(input: ServiceSchemaInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    serviceType: input.serviceType ?? input.name,
    provider: { '@id': ORG_ID },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
    inLanguage: 'fr-FR',
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

/**
 * AggregateRating rattaché au node Organization (même @id → Google fusionne
 * les nodes). À rendre sur les pages qui exposent la preuve sociale (accueil,
 * réalisations), pas en site-wide.
 *
 * ⚠️ DÉSACTIVÉ : avec seulement 2 avis, l'AggregateRating n'est pas crédible
 * aux yeux de Google (et peut être pénalisant / déclencher un avertissement
 * Rich Results). À réactiver UNIQUEMENT lorsqu'on dispose de 10+ avis
 * vérifiables. Décommenter le bloc ci-dessous et ré-importer la fonction dans
 * app/page.tsx et app/realisations/page.tsx.
 */
// export function aggregateRatingSchema(
//   ratingValue: number,
//   reviewCount: number,
// ): Record<string, unknown> {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'Organization',
//     '@id': ORG_ID,
//     name: SITE.name,
//     url: SITE.url,
//     aggregateRating: {
//       '@type': 'AggregateRating',
//       ratingValue: String(ratingValue),
//       bestRating: '5',
//       worstRating: '1',
//       reviewCount: String(reviewCount),
//     },
//   };
// }

export interface HowToStepInput {
  name: string;
  text: string;
}

export function howToSchema(input: {
  name: string;
  description: string;
  steps: HowToStepInput[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

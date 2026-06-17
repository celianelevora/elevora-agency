import type { MetadataRoute } from 'next';

const SITE_URL = 'https://elevora-agency.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/services/site-vitrine', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/services/site-ecommerce', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/services/landing-page', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/services/application-web-mobile', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/services/crm-outil-de-gestion', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/realisations', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/methode', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/tarifs', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/agence', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
    { url: '/demarrer-un-projet', priority: 0.8, changeFrequency: 'yearly' as const },
    { url: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' as const },
    { url: '/confidentialite', priority: 0.2, changeFrequency: 'yearly' as const },
    { url: '/cgv', priority: 0.2, changeFrequency: 'yearly' as const },
    { url: '/cookies', priority: 0.2, changeFrequency: 'yearly' as const },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

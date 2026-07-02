/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// Content-Security-Policy adaptée au projet :
// - script/style 'unsafe-inline' : Next (scripts d'hydratation) + styles inline
//   omniprésents (Framer Motion, GSAP, style={{…}}). 'unsafe-eval' + ws: uniquement
//   en dev pour ne pas casser le HMR.
// - Titres (Cormorant) : self-hostés via next/font (servis en 'self').
// - Corps (Satoshi) : Fontshare → CSS sur api.fontshare.com, fichiers sur
//   cdn.fontshare.com (autorisés ci-dessous). Resend est appelé côté SERVEUR
//   → pas besoin en connect-src.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
  "img-src 'self' data: blob:",
  "font-src 'self' https://fonts.gstatic.com https://cdn.fontshare.com data:",
  "media-src 'self'",
  `connect-src 'self'${isDev ? ' ws:' : ''}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig = {
  reactStrictMode: true,
  // Supprime l'en-tête X-Powered-By (ne révèle plus la stack Next.js).
  poweredByHeader: false,
  // Optimisation d'images next/image : sert de l'AVIF en priorité (meilleure
  // compression que le WebP), avec repli WebP. minimumCacheTTL long : les images
  // optimisées (covers, logos) sont immuables, on les met en cache 30 jours.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // BUILD INFOMANIAK — anti-SIGABRT.
  // La génération statique de Next 14 parallélise le rendu des pages sur
  // plusieurs workers. Sur un hébergement à mémoire contrainte (Infomaniak),
  // ces workers font un abort() natif (signal SIGABRT, exit code null) dès
  // « Generating static pages ». On force un rendu séquentiel mono-worker :
  // le pic mémoire s'effondre et le build passe de façon déterministe.
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;

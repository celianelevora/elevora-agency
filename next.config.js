/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// Content-Security-Policy adaptée au projet :
// - script/style 'unsafe-inline' : Next (scripts d'hydratation) + styles inline
//   omniprésents (Framer Motion, GSAP, style={{…}}). 'unsafe-eval' + ws: uniquement
//   en dev pour ne pas casser le HMR.
// - Polices (Noto Serif Display + Montserrat, charte 2026) : self-hostées via
//   next/font → servies en 'self', AUCUNE origine externe nécessaire.
//   Resend est appelé côté SERVEUR → pas besoin en connect-src.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
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
  // Optimisation d'images next/image : WebP uniquement.
  // On N'active PAS l'AVIF : il compresse un peu mieux mais s'encode ~2x plus
  // lentement, et sur l'hébergement Infomaniak (1 seul CPU) chaque image
  // ré-optimisée à la volée au 1er chargement devient lente. Le WebP offre le
  // meilleur compromis poids/vitesse d'encodage sur ce serveur.
  // minimumCacheTTL long : les images optimisées sont immuables -> cache 30 j.
  images: {
    formats: ['image/webp'],
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
  // SEO — Search Console.
  // 1) www → apex en 308 : évite le contenu dupliqué « sans URL canonique »
  //    si le sous-domaine www pointe vers ce même site.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.elevora-agency.com' }],
        destination: 'https://elevora-agency.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // 2) Le domaine de PRÉPRODUCTION sert exactement le même contenu que la
      //    prod → Google le voit comme un doublon. X-Robots-Tag: noindex
      //    uniquement quand la requête arrive par test.elevora-agency.com.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'test.elevora-agency.com' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

module.exports = nextConfig;

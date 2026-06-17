import { ImageResponse } from 'next/og';

// Runtime edge : @vercel/og utilise alors son chemin WASM (pas de fileURLToPath),
// ce qui evite le crash de build "Invalid URL" sur Node >= 22 tout en gardant
// une sortie identique. Compatible next start (Infomaniak).
export const runtime = 'edge';

// Favicon généré programmatiquement (Next.js 14) — fond Klein #1B4F8A,
// « E » crème #EAE9EE. Complète app/icon.svg pour les contextes qui exigent
// un raster (favicon.ico, anciens navigateurs).
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1B4F8A',
          color: '#EAE9EE',
          fontSize: 22,
          fontWeight: 600,
          fontFamily: 'Georgia, serif',
          borderRadius: 6,
        }}
      >
        E
      </div>
    ),
    { ...size },
  );
}

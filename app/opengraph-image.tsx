import { ImageResponse } from 'next/og';

// Runtime edge : @vercel/og utilise alors son chemin WASM (pas de fileURLToPath),
// ce qui evite le crash de build "Invalid URL" sur Node >= 22 tout en gardant
// une sortie identique. Compatible next start (Infomaniak).
export const runtime = 'edge';

// OG image générée dynamiquement (1200x630) — aucun fichier ajouté dans /public.
export const alt = 'Elevora — Agence digitale à Nantes';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '90px',
          background:
            'linear-gradient(135deg, #1A1A2E 0%, #16213E 55%, #1B4F8A 100%)',
          color: '#EAE9EE',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#C9266A',
            marginBottom: 28,
          }}
        >
          Agence digitale · Nantes
        </div>
        <div style={{ fontSize: 132, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>
          Elevora
        </div>
        <div
          style={{
            fontSize: 40,
            marginTop: 34,
            color: 'rgba(234,233,238,0.82)',
            maxWidth: 880,
            lineHeight: 1.3,
          }}
        >
          Sites web qui convertissent &amp; outils de gestion sur mesure.
        </div>
      </div>
    ),
    { ...size },
  );
}

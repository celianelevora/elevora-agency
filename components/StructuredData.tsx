/**
 * StructuredData — rend un ou plusieurs blocs JSON-LD Schema.org.
 * Composant serveur, sans JS client. Le contenu provient exclusivement de
 * `lib/seo.ts` (données publiques d'entreprise), jamais d'entrée utilisateur.
 */

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function StructuredData({ data }: StructuredDataProps) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}

import SectionWithMockup from "@/components/SectionWithMockup";

export default function LalaKShowcase() {
  return (
    <SectionWithMockup
      title={
        <>
          Lala-K,<br />
          la beauté <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--pink)" }}>repensée.</span>
        </>
      }
      description={
        <>
          Refonte complète du site d'une créatrice indépendante. Nouvelle identité visuelle,
          architecture repensée autour des collections, parcours de découverte optimisé.
          Le rendu fait honneur au travail artisanal de la marque.
        </>
      }
      theme="light"
      primaryContent={
        <div className="w-full h-full p-4 md:p-8 flex flex-col gap-4">
          {/* Browser bar */}
          <div className="flex items-center gap-2 pb-3 border-b border-[var(--line)]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="ml-auto text-[10px] text-[var(--ink-muted)] truncate">
              lala-k.fr
            </div>
          </div>

          {/* Logo */}
          <div className="text-center pt-4">
            <div className="text-[var(--pink)] text-xl md:text-3xl" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500 }}>
              Lala-K
            </div>
            <div className="text-[8px] md:text-[10px] text-[var(--ink-muted)] tracking-[0.2em] uppercase mt-1">
              Créations Artisanales
            </div>
          </div>

          {/* Image principale */}
          <div className="flex-1 rounded-xl bg-gradient-to-br from-[var(--pink-light)] via-[#F4D5E0] to-[var(--cream-warm)] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[var(--pink-deep)] text-[10px] md:text-xs tracking-widest uppercase opacity-50">
                Collection Printemps
              </div>
            </div>
          </div>

          {/* Grille produits */}
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square rounded-lg bg-[var(--pink-light)]" />
            <div className="aspect-square rounded-lg bg-[var(--cream-warm)]" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-[var(--pink-light)] to-[#F4C0D1]" />
          </div>

          {/* Bouton */}
          <div className="bg-[var(--pink)] text-[var(--cream)] text-[10px] md:text-xs text-center py-2 md:py-3 rounded-md font-medium mt-2">
            Découvrir la collection →
          </div>
        </div>
      }
      secondaryContent={
        <div className="w-full h-full p-6 flex items-center justify-center">
          <div className="w-full max-w-[200px] aspect-[3/4] rounded-xl bg-gradient-to-br from-[var(--pink)] via-[#D67BAC] to-[var(--pink-light)] shadow-lg" />
        </div>
      }
    />
  );
}

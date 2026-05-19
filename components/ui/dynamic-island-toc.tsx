"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface DynamicIslandTOCProps {
  /** Sélecteur CSS pour trouver les titres (par défaut: article h2, article h3) */
  selector?: string;
  /** Couleur du bandeau actif */
  accentColor?: string;
}

export function DynamicIslandTOC({
  selector = "article h2, article h3, section h2, section h3",
  accentColor = "var(--klein)",
}: DynamicIslandTOCProps) {
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Trouver tous les titres
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    );

    const found: Heading[] = elements.map((el, i) => {
      // Génère un ID si pas présent
      if (!el.id) {
        el.id = `toc-${i}-${(el.textContent || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 50)}`;
      }
      return {
        id: el.id,
        text: el.textContent || "",
        level: parseInt(el.tagName.substring(1)),
      };
    });

    setHeadings(found);

    // Affiche après scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Observe quel titre est actif
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Prend le plus haut sur l'écran
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [selector]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  const activeHeading = headings.find((h) => h.id === activeId) || headings[0];
  const activeIndex = headings.indexOf(activeHeading);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <motion.div
            layout
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "pointer-events-auto rounded-full shadow-2xl overflow-hidden",
              isOpen && "rounded-3xl",
            )}
            style={{
              background: "var(--ink)",
              color: "var(--cream)",
            }}
          >
            {!isOpen ? (
              <motion.button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 px-5 py-3 hover:opacity-90 transition-opacity"
                whileTap={{ scale: 0.98 }}
              >
                <List className="w-4 h-4 shrink-0" />
                <div className="flex items-center gap-2 max-w-[280px]">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: accentColor,
                      color: "var(--cream)",
                    }}
                  >
                    {activeIndex + 1}/{headings.length}
                  </span>
                  <span className="text-sm truncate font-medium">
                    {activeHeading.text}
                  </span>
                </div>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-3 w-[340px] max-w-[90vw]"
              >
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="text-[11px] uppercase tracking-widest opacity-60">
                    Sommaire
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:opacity-80"
                    aria-label="Fermer le sommaire"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
                  {headings.map((h, i) => (
                    <button
                      key={h.id}
                      onClick={() => handleScrollTo(h.id)}
                      className={cn(
                        "text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3",
                        h.level === 3 && "ml-4 text-xs",
                      )}
                      style={{
                        background:
                          h.id === activeId
                            ? "rgba(245,240,232,0.1)"
                            : "transparent",
                        color:
                          h.id === activeId
                            ? "var(--cream)"
                            : "rgba(245,240,232,0.7)",
                      }}
                    >
                      <span
                        className="text-[10px] opacity-50 shrink-0 w-5"
                        style={{
                          color:
                            h.id === activeId ? accentColor : "currentColor",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="line-clamp-2">{h.text}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { usePathname } from "next/navigation";

export default function PageEnter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // La key basee sur le pathname force le remount + replay de l'animation
  // a chaque navigation Next (App Router).
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

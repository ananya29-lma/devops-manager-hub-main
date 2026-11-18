import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const Hero3D = lazy(() => import("./Hero3D"));

/** Mounts the 3D shapes only on wider screens for visitors who allow motion. */
export function Hero3DLayer({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden className={className}>
      <ClientOnly fallback={null}>
        {enabled && (
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        )}
      </ClientOnly>
    </div>
  );
}

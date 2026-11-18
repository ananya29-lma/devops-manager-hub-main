import { forwardRef, type HTMLAttributes, type PointerEvent } from "react";
import { NetworkFlow } from "@/components/site/NetworkFlow";
import { tiltOnMove, tiltReset } from "@/lib/tilt";
import { cn } from "@/lib/utils";

/**
 * Glass card with a cursor-reactive radial highlight and a 3D tilt toward the cursor.
 * Pointer position is written to --mx/--my (glow) and --rx/--ry (tilt-3d).
 */
export const SpotlightCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { networkFlow?: boolean }
>(
  function SpotlightCard({ className, onPointerMove, onPointerLeave, children, networkFlow = true, ...props }, ref) {
    function handleMove(e: PointerEvent<HTMLDivElement>) {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      tiltOnMove(e, 6);
      onPointerMove?.(e);
    }
    function handleLeave(e: PointerEvent<HTMLDivElement>) {
      tiltReset(e);
      onPointerLeave?.(e);
    }
    return (
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={cn("glass spotlight tilt-3d rounded-3xl", className)}
        {...props}
      >
        {networkFlow && <NetworkFlow />}
        {children}
      </div>
    );
  },
);

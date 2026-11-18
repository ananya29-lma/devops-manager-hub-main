import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Flowing translucent red -> pink -> purple -> blue wave bands (the brand cover motif).
 * `edge` paints a solid final band in that colour so the wave melts into the next section.
 */
export function BrandWave({
  className,
  edge,
  flip = false,
}: {
  className?: string;
  edge?: "navy" | "background";
  flip?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const g = `bw-${id}`;
  return (
    <svg
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      aria-hidden
      className={cn(
        "pointer-events-none block w-full",
        flip && "-scale-x-100",
        edge === "navy" && "text-navy",
        edge === "background" && "text-background",
        className,
      )}
    >
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--brand-red)" />
          <stop offset=".25" stopColor="var(--brand-pink)" />
          <stop offset=".5" stopColor="var(--brand-violet)" />
          <stop offset=".75" stopColor="var(--brand-indigo)" />
          <stop offset="1" stopColor="var(--brand-cyan)" />
        </linearGradient>
      </defs>
      <path d="M0,96 C220,20 470,10 720,92 C970,174 1210,168 1440,70 L1440,240 L0,240 Z" fill={`url(#${g})`} opacity=".14" />
      <path d="M0,132 C260,60 520,70 770,128 C1010,184 1230,176 1440,112 L1440,240 L0,240 Z" fill={`url(#${g})`} opacity=".22" />
      <path d="M0,168 C300,112 560,118 810,156 C1050,192 1260,188 1440,150 L1440,240 L0,240 Z" fill={`url(#${g})`} opacity=".42" />
      {edge && <path d="M0,206 C320,170 600,176 860,198 C1100,218 1290,214 1440,192 L1440,240 L0,240 Z" fill="currentColor" />}
    </svg>
  );
}

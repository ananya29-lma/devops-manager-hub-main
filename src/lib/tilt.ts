import type { PointerEvent } from "react";

const canTilt = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

/** Writes --rx/--ry on the element so the `tilt-3d` utility leans it toward the cursor. */
export function tiltOnMove(e: PointerEvent<HTMLElement>, max = 8) {
  if (!canTilt()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--ry", `${(px * max * 2).toFixed(2)}deg`);
  el.style.setProperty("--rx", `${(-py * max * 2).toFixed(2)}deg`);
}

export function tiltReset(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

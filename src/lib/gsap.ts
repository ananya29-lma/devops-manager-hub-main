import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registers ScrollTrigger once, only in the browser.
 * Call from inside useGSAP / useEffect, never at module scope during SSR.
 */
let registered = false;
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Media queries used with gsap.matchMedia() so heavy motion only runs when allowed. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_DESKTOP = "(prefers-reduced-motion: no-preference) and (min-width: 768px)";

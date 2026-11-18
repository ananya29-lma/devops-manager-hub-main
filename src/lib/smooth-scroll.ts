import type Lenis from "lenis";

/**
 * Holds the single Lenis instance created by <SmoothScroll />.
 * Anchor links call scrollToId(); when Lenis is off (reduced motion) we fall back
 * to native scrolling.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = -72;
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.4 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top });
  }
  history.replaceState(null, "", `#${id}`);
}

export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y });
}

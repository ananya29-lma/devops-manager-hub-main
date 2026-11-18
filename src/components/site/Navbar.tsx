import { Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnchorLink } from "./AnchorLink";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export const NAV_LINKS = [
  { id: "problem", label: "About" },
  { id: "features", label: "Capabilites" },
  { id: "industries", label: "Industries" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

/**
 * Sticky navbar. After 24px of scroll it shrinks into a blurred floating pill.
 * A spring-smoothed bar under it tracks page scroll progress.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        !scrolled && "border-b border-glass-border bg-glass backdrop-blur-xl",
      )}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-signature"
        style={{ scaleX: progress }}
      />
      <div
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500 ease-out",
          scrolled
            ? "mt-3 h-14 max-w-5xl rounded-full border border-glass-border bg-glass-strong px-3 pl-5 shadow-glow backdrop-blur-xl"
            : "h-20 max-w-7xl px-6",
        )}
      >
        <Link to="/" aria-label="DevOps Manager home" className="shrink-0">
          {/* Original full-colour logo, no tile; "Manager" turns white on the dark navbar. */}
          <Logo
            responsive
            tone="manager-white"
            className={cn("transition-all duration-300", scrolled && "[&_img]:h-9")}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <AnchorLink
              key={l.label}
              id={l.id}
              className="nav-link rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-primary"
            >
              {l.label}
            </AnchorLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            to="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-primary sm:inline-flex"
          >
            Log in
          </Link>
          <Button asChild variant="hero" size={scrolled ? "sm" : "default"} className="hidden sm:inline-flex">
            <Link to="/signup">Start free trial</Link>
          </Button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-4 mt-2 flex flex-col gap-1 rounded-3xl bg-glass-strong p-4 backdrop-blur-xl lg:hidden"
        >
          {NAV_LINKS.map((l) => (
            <AnchorLink
              key={l.label}
              id={l.id}
              onNavigate={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base hover:bg-glass"
            >
              {l.label}
            </AnchorLink>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button asChild variant="glass">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild variant="hero">
              <Link to="/signup">Start free trial</Link>
            </Button>
          </div>
        </motion.nav>
      )}
    </header>
  );
}

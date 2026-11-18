import { useGSAP } from "@gsap/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import cover from "@/assets/devops-manager-hero.jpg";
import { DashboardMockup } from "@/components/site/DashboardMockup";
import { DemoDialog } from "@/components/site/DemoDialog";
import { Words3D } from "@/components/site/Words3D";
import { ensureGsap, MOTION_DESKTOP, MOTION_OK } from "@/lib/gsap";
import { tiltOnMove, tiltReset } from "@/lib/tilt";

const LINES = ["Run your whole", "business from", "one screen."];
/* Line colours mirror the brand poster: blue, then purple, then red. */
const LINE_TONES = ["text-indigo", "text-violet", "text-brand-red"];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  /*
   * Scroll animation:
   * - The mockup starts tilted back (set in CSS so there's no jump on hydrate)
   *   and flattens + rises as the hero scrolls away (scrubbed parallax).
   * - The glow orbs drift slower than the page for depth.
   * Headline reveal is pure CSS (line-mask / line-inner) so it runs before JS loads.
   */
  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          tilt.current,
          { rotateX: 18, scale: 0.94, y: 0 },
          {
            rotateX: 0,
            scale: 1,
            y: -40,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 30%", scrub: true },
          },
        );
        gsap.to(".hero-orb", {
          yPercent: 60,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      /*
       * Overlap effect (desktop): once the hero's bottom reaches the bottom of
       * the screen it is pinned in place (no pin spacing), so the next sections
       * slide up over it like a sheet. The hero dims and recedes as it's covered.
       */
      mm.add(MOTION_DESKTOP, () => {
        const el = root.current;
        if (!el) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: () => (el.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
            end: () => `+=${window.innerHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(".hero-content", { scale: 0.92, yPercent: -4, ease: "none" }, 0).to(
          ".hero-dim",
          { opacity: 0.75, ease: "none" },
          0,
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative z-0 overflow-hidden pt-32 md:pt-40">
      <img src={cover} alt="" aria-hidden width={1600} height={1008} className="absolute right-0 top-0 h-[36rem] w-full object-cover object-right opacity-80 dark:opacity-35" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/15" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/25 to-transparent" />
      <div aria-hidden className="hero-orb glow-orb -left-32 top-10 h-96 w-96 bg-indigo" />
      <div aria-hidden className="hero-orb glow-orb -right-24 top-40 h-[28rem] w-[28rem] bg-violet" />
      <div aria-hidden className="hero-orb glow-orb left-1/3 top-[36rem] h-80 w-80 bg-cyan opacity-30" />
      <div className="hero-content relative origin-bottom will-change-transform">
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="fade-up inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-xs shadow-sm backdrop-blur">
          <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-brand">
            Beta
          </span>
          <span className="text-muted-foreground">Early access is open for Indian teams</span>
          <Sparkles className="size-3.5 text-brand-pink" />
        </div>

        <p className="fade-up eyebrow mt-8" style={{ animationDelay: "0.05s" }}>
          Management made simple
        </p>
        <span aria-hidden className="fade-up brand-bar mx-auto mt-3" style={{ animationDelay: "0.05s" }} />

        <h1 id="hero-title" className="display-xl mx-auto mt-6 max-w-5xl">
          {LINES.map((line, i) => (
            <span key={line} className="line-mask">
              <span className={`line-inner ${LINE_TONES[i] ?? ""}`} style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                <Words3D>{line}</Words3D>
              </span>
            </span>
          ))}
        </h1>

        <p
          className="fade-up mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ animationDelay: "0.55s" }}
        >
          The Manager puts your sales, stock, people and money in one connected workspace. Fewer tabs,
          fewer exports, and numbers you can actually trust.
        </p>

        <div
          className="fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.7s" }}
        >
          <Button asChild variant="hero" size="xl">
            <Link to="/signup">
              Start 14-day free trial <ArrowRight />
            </Link>
          </Button>
          <DemoDialog>
            <Button variant="glass" size="xl">
              <PlayCircle /> Book a demo
            </Button>
          </DemoDialog>
        </div>
        <p className="fade-up mt-5 text-sm text-muted-foreground" style={{ animationDelay: "0.8s" }}>
          No card needed · GST-ready from day one · Cancel anytime
        </p>
      </div>

      {/* Mockup with 3D tilt. Perspective lives on the parent so rotateX reads as depth. */}
      <div className="relative mx-auto mt-16 max-w-6xl px-4 pb-24 [perspective:1600px] md:mt-20 md:px-6">
        <div className="fade-up" style={{ animationDelay: "0.85s" }}>
          <div
            ref={tilt}
            className="origin-top will-change-transform motion-safe:[transform:rotateX(18deg)_scale(0.94)]"
          >
            <div className="animate-float">
              {/* Leans toward the cursor in 3D on top of the scroll tilt. */}
              <div className="tilt-3d" onPointerMove={(e) => tiltOnMove(e, 5)} onPointerLeave={tiltReset}>
                <DashboardMockup view="overview" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div aria-hidden className="hero-dim pointer-events-none absolute inset-0 bg-background opacity-0" />
    </section>
  );
}

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Words3D } from "@/components/site/Words3D";
import { ensureGsap } from "@/lib/gsap";

const STEPS = [
  { title: "Start your workspace", body: "Sign up in two minutes. Add your GSTIN, branches and warehouses." },
  { title: "Bring your data", body: "Import customers, items and staff from Excel or CSV. We help during beta." },
  { title: "Switch on what you need", body: "Begin with invoicing or stock. Turn on payroll and logistics when you're ready." },
  { title: "Invite your team", body: "Give each person the access they need, nothing more." },
  { title: "Run it from one screen", body: "Every number, every module, one dashboard." },
];

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  /*
   * The SVG rail draws itself (stroke-dashoffset 1 -> 0, scrubbed) and each step
   * "lights up" via data-active once the rail passes it.
   * Reduced motion: rail fully drawn, all steps active.
   */
  useGSAP(
    () => {
      const { gsap, ScrollTrigger } = ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".rail-path",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: ".rail", start: "top 65%", end: "bottom 65%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>(".how-step").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 65%",
            onEnter: () => (el.dataset["active"] = "true"),
            onLeaveBack: () => (el.dataset["active"] = "false"),
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".rail-path", { strokeDashoffset: 0 });
        gsap.utils.toArray<HTMLElement>(".how-step").forEach((el) => (el.dataset["active"] = "true"));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="how-it-works"
      aria-labelledby="how-title"
      className="band-mint relative isolate overflow-hidden py-24 md:py-36"
    >
      {/* Section-only backdrop: faint grid over the fixed mint panel */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          id="how-title"
          align="center"
          eyebrow="How it works"
          title={
            <>
              Up and running <span className="serif-accent text-gradient">this week</span>.
            </>
          }
        />
        <div className="rail relative mt-20">
          <svg
            aria-hidden
            className="absolute left-5 top-0 h-full w-1 -translate-x-1/2 md:left-1/2"
            preserveAspectRatio="none"
            viewBox="0 0 4 100"
          >
            <defs>
              <linearGradient id="rail-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--brand-indigo)" />
                <stop offset=".5" stopColor="var(--brand-violet)" />
                <stop offset="1" stopColor="var(--brand-cyan)" />
              </linearGradient>
            </defs>
            <path d="M2 0 V100" stroke="var(--glass-border)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path
              className="rail-path"
              d="M2 0 V100"
              stroke="url(#rail-g)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </svg>

          <ol className="grid gap-16">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="how-step group relative grid grid-cols-[2.5rem_1fr] gap-6 md:grid-cols-2 md:gap-16"
              >
                <span
                  aria-hidden
                  className="relative z-10 grid size-10 place-items-center rounded-full border border-glass-border bg-background font-display text-sm text-muted-foreground transition-all duration-500 group-data-[active=true]:border-transparent group-data-[active=true]:bg-brand group-data-[active=true]:text-on-brand group-data-[active=true]:shadow-glow md:absolute md:left-1/2 md:-translate-x-1/2"
                >
                  {i + 1}
                </span>
                <div
                  className={
                    "opacity-40 transition-opacity duration-500 group-data-[active=true]:opacity-100 " +
                    (i % 2 ? "md:col-start-2 md:pl-4" : "md:col-start-1 md:pr-12 md:text-right")
                  }
                >
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    <Words3D>{s.title}</Words3D>
                  </h3>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

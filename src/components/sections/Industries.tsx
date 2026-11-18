import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import education from "@/assets/industry-education.jpg";
import retail from "@/assets/industry-retail.jpg";
import startups from "@/assets/industry-startups.jpg";
import { ensureGsap, MOTION_DESKTOP } from "@/lib/gsap";
import { NetworkFlow } from "@/components/site/NetworkFlow";
import { Words3D } from "@/components/site/Words3D";
import { tiltOnMove, tiltReset } from "@/lib/tilt";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  {
    slug: "education",
    name: "Education",
    img: education,
    alt: "School administrator reviewing records on a tablet in an office at dusk",
    line: "Fees, staff payroll and campus inventory without the register.",
    points: ["Fee invoices with reminders", "Staff attendance and payroll", "Library and lab stock"],
  },
  {
    slug: "startups",
    name: "Startups",
    img: startups,
    alt: "Small startup team working together on laptops in a studio office at night",
    line: "Grow from five people to fifty without changing tools.",
    points: ["Pipeline from day one", "Clean books for investors", "Roles as the team grows"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    img: retail,
    alt: "Shop owner scanning a wrapped parcel at a boutique packing counter",
    line: "One stock count for the shop floor and the online store.",
    points: ["Multi-channel stock sync", "Dispatch and returns", "GST invoices at checkout"],
  },
];

export function Industries() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [pinned, setPinned] = useState(false);

  /*
   * Horizontal scroll: on desktop the section pins and the card track
   * translates left by exactly its overflow width, scrubbed to vertical scroll.
   * Mobile / reduced motion: native horizontal swipe with scroll-snap.
   */
  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      const mm = gsap.matchMedia();
      mm.add(MOTION_DESKTOP, () => {
        setPinned(true);
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth + 48;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => setPinned(false);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="industries"
      aria-labelledby="industries-title"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24"
    >
      <div className="mx-auto mb-12 flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-6">
        <div>
          <p className="eyebrow mb-4">Industries we serve</p>
          <h2 id="industries-title" className="display-lg max-w-2xl">
            <Words3D>
              Shaped for the way <span className="serif-accent text-gradient">your</span> industry works.
            </Words3D>
          </h2>
        </div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          {pinned ? "Keep scrolling" : "Swipe to explore"} <ArrowRight className="size-4" aria-hidden />
        </p>
      </div>

      <ul
        ref={track}
        className={cn(
          "flex gap-6 px-6 will-change-transform md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]",
          pinned ? "w-max" : "snap-x snap-mandatory overflow-x-auto pb-4",
        )}
      >
        {INDUSTRIES.map((ind, i) => (
          <li
            key={ind.name}
            onPointerMove={(e) => tiltOnMove(e, 5)}
            onPointerLeave={tiltReset}
            className="industry-card tilt-3d group relative h-[68vh] min-h-[440px] w-[82vw] shrink-0 snap-center rounded-3xl border border-glass-border sm:w-[60vw] lg:w-[34vw]"
          >
            {/* Photo + washes clip in their own box so the current ring can sit outside the card. */}
            <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[inherit]">
              <img
                src={ind.img}
                alt={ind.alt}
                width={1024}
                height={1280}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="industry-wash absolute inset-0 bg-signature mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-transparent" />
            </div>
            <NetworkFlow seed={i + 11} className="z-0" />
            <button
              type="button"
              onClick={() => window.location.assign(`/industries/${ind.slug}`)}
              className="group/action absolute right-6 top-6 z-20 inline-flex w-fit items-center gap-2 rounded-full border border-glass-border bg-glass-strong px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-200 hover:border-primary/40 hover:bg-glass md:right-8 md:top-8"
              aria-label={`View ${ind.name} details`}
            >
              View details
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/action:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => window.location.assign(`/industries/${ind.slug}`)}
              className="relative z-10 flex h-full w-full flex-col justify-end p-6 text-left md:p-8"
              aria-label={`View ${ind.name} details`}
            >
              <span className="eyebrow">0{i + 1}</span>
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                <Words3D>{ind.name}</Words3D>
              </h3>
              <p className="mt-3 max-w-sm text-foreground/85">{ind.line}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {ind.points.map((p) => (
                  <li key={p} className="glass rounded-full bg-glass-strong px-3 py-1 text-xs backdrop-blur">
                    {p}
                  </li>
                ))}
              </ul>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

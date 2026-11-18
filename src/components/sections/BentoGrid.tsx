import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useRef, useState } from "react";
import { CountUp } from "@/components/site/CountUp";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ensureGsap, MOTION_OK } from "@/lib/gsap";
import { MODULES, type ModuleInfo, type ModuleKey } from "@/lib/modules";
import { Words3D } from "@/components/site/Words3D";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 8, label: "connected modules" },
  { value: 1, label: "login for your whole team" },
  { value: 14, label: "day free trial, no card" },
  { value: 2, label: "languages: English & हिंदी" },
];

/** Grid placement per module (4-column bento on large screens). */
const LAYOUT: Record<ModuleKey, string> = {
  sales: "lg:col-span-2 lg:row-span-2",
  inventory: "lg:col-span-2",
  finance: "",
  hr: "",
  logistics: "",
  analytics: "lg:col-span-2",
  documents: "",
  compliance: "lg:col-span-4",
};

/** Tiny decorative visual inside each card, all sample data. */
function CardVisual({ k }: { k: ModuleKey }) {
  if (k === "sales")
    return (
      <div className="mt-8 grid gap-2" aria-hidden>
        {[
          ["Lead", 92],
          ["Qualified", 68],
          ["Proposal", 44],
          ["Won", 26],
        ].map(([label, w]) => (
          <div key={label} className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="w-16">{label}</span>
            <div className="h-7 flex-1 overflow-hidden rounded-lg bg-muted">
              <div className="h-full rounded-lg bg-brand opacity-80" style={{ width: `${w}%` }} />
            </div>
          </div>
        ))}
        <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
          <CountUp value={6420000} prefix="₹" />
        </p>
        <p className="text-xs text-muted-foreground">Sample pipeline value</p>
      </div>
    );
  if (k === "inventory")
    return (
      <div className="mt-6 flex gap-2" aria-hidden>
        {["Jaipur", "Pune", "Delhi NCR"].map((g, i) => (
          <div key={g} className="flex-1 rounded-xl border border-glass-border p-3">
            <p className="text-[10px] text-muted-foreground">{g}</p>
            <p className="font-display text-xl font-semibold">
              <CountUp value={[1240, 860, 2190][i] ?? 0} />
            </p>
          </div>
        ))}
      </div>
    );
  if (k === "analytics")
    return (
      <div className="mt-6 flex h-20 items-end gap-1.5" aria-hidden>
        {[30, 45, 38, 60, 52, 70, 64, 82, 76, 90, 85, 98].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-md bg-brand opacity-70" style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  return null;
}

export function BentoGrid() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<ModuleInfo | null>(null);

  /* Cards stagger in once when the grid enters the viewport. Reduced motion: opacity only. */
  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".bento-card", {
          opacity: 0,
          y: 48,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".bento-grid", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="features"
      aria-labelledby="features-title"
      className="band-lilac relative isolate overflow-hidden py-24 md:py-36"
    >
      {/* Section-only backdrop: faint grid over the fixed lilac panel */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          id="features-title"
          eyebrow="Capabilites"
          title={
            <>
              Eight modules <span className="serif-accent text-gradient">Automated</span> your Business
            </>
          }
          lead="Each module is useful on its own. Together, they share one set of customers, items, people and numbers."
        />

        <dl className="mt-16 grid grid-cols-2 gap-6 border-y border-glass-border py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp value={s.value} className="display-lg inline-block text-gradient" duration={1.2} />
                <span className="mt-2 block text-sm text-muted-foreground">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="bento-grid mt-12 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <li key={m.key} className={cn("bento-card", LAYOUT[m.key])}>
                <SpotlightCard networkFlow={false} className="flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft ring-1 ring-glass-border">
                      <Icon className="size-5 text-primary" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                    <Words3D>{m.name}</Words3D>
                  </h3>
                  <p className="mt-2 max-w-md text-muted-foreground">{m.benefit}</p>
                  <CardVisual k={m.key} />
                  <button
                    type="button"
                    onClick={() => setOpen(m)}
                    className="group mt-auto inline-flex items-center gap-1 self-start pt-6 text-sm font-medium text-foreground"
                    aria-label={`Learn more about ${m.name}`}
                  >
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent data-lenis-prevent className="rounded-3xl border-glass-border bg-popover sm:max-w-lg">
          {open && (
            <>
              <DialogHeader>
                <span className="mb-2 grid size-12 place-items-center rounded-2xl bg-brand-soft ring-1 ring-glass-border">
                  <open.icon className="size-5 text-primary" aria-hidden />
                </span>
                <DialogTitle className="font-display text-2xl tracking-tight">{open.name}</DialogTitle>
                <DialogDescription className="text-base">{open.benefit}</DialogDescription>
              </DialogHeader>
              <ul className="mt-2 grid gap-3">
                {open.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { DashboardMockup, type MockView } from "@/components/site/DashboardMockup";
import { ensureGsap, MOTION_DESKTOP } from "@/lib/gsap";

const STEPS: { view: MockView; label: string; title: string; copy: string; points: string[] }[] = [
  {
    view: "sales",
    label: "Sales",
    title: "Know every deal without asking.",
    copy: "Leads, quotes and follow-ups sit in one pipeline. When a deal closes, the invoice is already drafted.",
    points: ["Pipeline by stage and owner", "Quote to GST invoice in one click", "WhatsApp follow-up reminders"],
  },
  {
    view: "inventory",
    label: "Inventory",
    title: "Stock that updates itself.",
    copy: "Every sale, return and transfer moves the count in real time, across every godown you run.",
    points: ["Multi-warehouse transfers", "Low-stock alerts before you run out", "Batch and expiry tracking"],
  },
  {
    view: "finance",
    label: "Finance",
    title: "Books that close on time.",
    copy: "GST-ready invoices, UPI and bank reconciliation, and a clear view of who owes you what.",
    points: ["CGST, SGST and IGST handled", "Daily bank and UPI matching", "Ageing and cash-flow views"],
  },
  {
    view: "hr",
    label: "HR",
    title: "Payroll in an afternoon.",
    copy: "Attendance and leave feed straight into payroll, so month-end is a review, not a rescue.",
    points: ["Attendance to payslip, automatically", "PF, ESI and PT fields built in", "Self-serve payslips for staff"],
  },
];

export function ModuleShowcase() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ST | null>(null);
  const [active, setActive] = useState(0);

  /*
   * Pinned storytelling (desktop, motion allowed):
   * the section pins for 4 screen-heights. Scroll progress maps to a step index,
   * which swaps the mockup view and the copy (cross-faded by Framer Motion).
   * On mobile / reduced motion the section is static and the step tabs are clickable.
   */
  useGSAP(
    () => {
      const { gsap, ScrollTrigger } = ensureGsap();
      const mm = gsap.matchMedia();
      mm.add(MOTION_DESKTOP, () => {
        trigger.current = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: `+=${STEPS.length * 90}%`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const i = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
            setActive((prev) => (prev === i ? prev : i));
          },
        });
        return () => {
          trigger.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const step = STEPS[active] ?? STEPS[0];
  if (!step) return null;

  return (
    <section
      ref={root}
      id="modules"
      aria-labelledby="modules-title"
      className="module-showcase relative flex min-h-screen items-center overflow-hidden py-24 md:py-0"
    >
      <div aria-hidden className="glow-orb right-0 top-1/4 h-[30rem] w-[30rem] bg-indigo opacity-30" />
      <h2 id="modules-title" className="sr-only">
        Modules tour
      </h2>
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <DashboardMockup view={step.view} className="module-dashboard-highlight" />
      </div>
    </section>
  );
}

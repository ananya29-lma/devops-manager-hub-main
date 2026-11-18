import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoDialog } from "@/components/site/DemoDialog";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { Words3D } from "@/components/site/Words3D";
import { formatINR } from "@/lib/modules";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

export const PLANS = [
  {
    name: "Starter",
    blurb: "For small teams getting off spreadsheets.",
    price: { monthly: 999, annual: 799 },
    features: ["Up to 5 users", "Sales, Inventory and Finance", "GST invoicing", "1 warehouse", "Email support"],
  },
  {
    name: "Growth",
    blurb: "For businesses running several teams and locations.",
    price: { monthly: 2499, annual: 1999 },
    featured: true,
    features: [
      "Up to 25 users",
      "All 8 modules",
      "Multi-warehouse and branches",
      "Payroll with PF and ESI",
      "WhatsApp notifications",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For larger organisations with custom needs.",
    price: null,
    features: ["Unlimited users", "Custom roles and approvals", "API access and webhooks", "Dedicated onboarding", "Security review support"],
  },
] as const;

/** Price that slides vertically when the billing toggle changes. */
function AnimatedPrice({ value }: { value: number }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="tabular-nums"
        >
          ₹{formatINR(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          id="pricing-title"
          align="center"
          eyebrow="Pricing"
          title={
            <>
              Simple plans, priced in <span className="serif-accent text-gradient">rupees</span>.
            </>
          }
          lead="Every plan starts with a 14-day free trial. No card needed."
        />

        <div className="mt-10 flex justify-center">
          <div role="group" aria-label="Billing period" className="glass inline-flex rounded-full bg-glass-strong p-1 text-sm">
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={billing === b}
                onClick={() => setBilling(b)}
                className={cn(
                  "relative rounded-full px-5 py-2 capitalize transition-colors",
                  billing === b ? "text-on-brand" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {billing === b && (
                  <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">
                  {b}
                  {b === "annual" && <span className="ml-2 text-xs opacity-80">Save 20%</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <article className="h-full" aria-label={`${plan.name} plan`}>
                <SpotlightCard
                  className={cn(
                    "flex h-full flex-col p-8",
                    "featured" in plan && plan.featured && "ring-brand bg-brand-soft shadow-glow",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">
                      <Words3D>{plan.name}</Words3D>
                    </h3>
                    {"featured" in plan && plan.featured && (
                      <span className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-on-brand">Recommended</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>

                  <div className="mt-8 flex items-baseline gap-2">
                    {plan.price ? (
                      <>
                        <span className="font-display text-5xl font-semibold tracking-tight">
                          <AnimatedPrice value={plan.price[billing]} />
                        </span>
                        <span className="text-sm text-muted-foreground">/ month</span>
                      </>
                    ) : (
                      <span className="font-display text-5xl font-semibold tracking-tight">Let's talk</span>
                    )}
                  </div>
                  <p className="mt-2 h-5 text-xs text-muted-foreground">
                    {plan.price ? (billing === "annual" ? "Billed yearly, per workspace" : "Billed monthly, per workspace") : "Custom contract and invoicing"}
                  </p>

                  <ul className="my-8 grid gap-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden /> {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {plan.price ? (
                      <Button asChild variant={"featured" in plan && plan.featured ? "hero" : "glass"} size="lg" className="w-full">
                        <Link to="/signup">Start free trial</Link>
                      </Button>
                    ) : (
                      <DemoDialog>
                        <Button variant="glass" size="lg" className="w-full">
                          Talk to us
                        </Button>
                      </DemoDialog>
                    )}
                  </div>
                </SpotlightCard>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Prices exclude GST. Beta pricing may change as we add features.
        </p>
      </div>
    </section>
  );
}

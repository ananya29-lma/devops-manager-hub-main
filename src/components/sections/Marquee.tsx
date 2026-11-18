import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Asterisk } from "lucide-react";
import { useRef } from "react";

const ITEMS = [
  "Sales & CRM",
  "Inventory",
  "HR Payroll",
  "Finance & Invoicing",
  "Logistics",
  "Analytics",
  "Documnets",
  "Compliance",
];

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Velocity marquee: drifts at a base speed, speeds up with scroll velocity,
 * and flips direction when the user scrolls up. Content is duplicated so the
 * wrap from -50% to 0% is seamless.
 */
function Row({ baseVelocity, items }: { baseVelocity: number; items: string[] }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    moveBy += dir.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex min-w-0 overflow-hidden whitespace-nowrap">
      <motion.div className="flex shrink-0" style={{ x }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {items.map((t) => (
              <span key={t} className="flex items-center gap-8 pr-8 font-display text-4xl font-medium tracking-tight md:text-6xl">
                {t}
                <Asterisk className="size-8 text-violet md:size-10" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="Capabilities" className="grid grid-cols-1 gap-4 overflow-hidden border-y border-glass-border py-10 md:py-14">
      <Row baseVelocity={-2} items={ITEMS} />
      <div className="min-w-0 text-muted-foreground/50">
        <Row baseVelocity={2} items={[...ITEMS].reverse()} />
      </div>
    </section>
  );
}

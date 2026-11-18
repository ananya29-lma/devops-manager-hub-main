import {
  CalendarDays,
  Cloud,
  CreditCard,
  FileSpreadsheet,
  Landmark,
  Mail,
  MessageCircle,
  ShoppingBag,
  Smartphone,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { LogoMark } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";
import { NetworkFlow } from "@/components/site/NetworkFlow";
import { SectionHeading } from "@/components/site/SectionHeading";

type OrbitItem = { icon: LucideIcon; label: string };

const INNER: OrbitItem[] = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Smartphone, label: "UPI" },
  { icon: Landmark, label: "Banks" },
  { icon: Mail, label: "Email" },
];
const OUTER: OrbitItem[] = [
  { icon: FileSpreadsheet, label: "Spreadsheets" },
  { icon: CreditCard, label: "Payment gateways" },
  { icon: ShoppingBag, label: "Marketplaces" },
  { icon: CalendarDays, label: "Calendars" },
  { icon: Cloud, label: "Cloud storage" },
  { icon: Webhook, label: "Webhooks" },
];

/**
 * Orbit: each ring rotates with a CSS animation; every icon counter-rotates
 * at the same speed so it stays upright. Disabled under reduced motion.
 *
 * Hovering (or tapping) the centre logo "connects" it: the orbit plane tips
 * back in 3D, each icon stands up facing the viewer, and a glowing beam draws
 * out from the hub to every icon with a light pulse travelling along it.
 * Beams live inside the rotating ring, so they keep pointing at their icon.
 */
function Ring({
  items,
  radius,
  spin,
  counter,
  tone,
  delayOffset = 0,
}: {
  items: OrbitItem[];
  radius: string;
  spin: string;
  counter: string;
  tone: "inner" | "outer";
  delayOffset?: number;
}) {
  return (
    <div
      className={`orbit-ring orbit-tone-${tone} absolute left-1/2 top-1/2 rounded-full border border-dashed border-glass-border ${spin}`}
      style={{ width: `calc(${radius} * 2)`, height: `calc(${radius} * 2)`, marginLeft: `calc(${radius} * -1)`, marginTop: `calc(${radius} * -1)` }}
    >
      {items.map(({ label }, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div
            key={`beam-${label}`}
            aria-hidden
            className="orbit-beam"
            style={{ width: radius, transform: `rotate(${angle}deg)`, ["--beam-delay" as string]: `${delayOffset + i * 90}ms` }}
          >
            <div className="orbit-beam-inner" />
          </div>
        );
      })}
      {items.map(({ icon: Icon, label }, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div
            key={label}
            className="orbit-item absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${angle}deg) translateX(${radius}) rotate(${-angle}deg)` }}
          >
            <div className={`orbit-counter ${counter}`}>
              <div
                title={label}
                className="orbit-tile glass -ml-6 -mt-6 grid size-12 place-items-center rounded-2xl bg-glass-strong backdrop-blur"
                style={{ ["--beam-delay" as string]: `${delayOffset + i * 90 + 250}ms` }}
              >
                <Icon className="size-5 text-foreground" aria-hidden />
                <span className="sr-only">{label}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OrbitVisual({ className = "" }: { className?: string }) {
  const [connected, setConnected] = useState(false);
  const lastPointer = useRef("");

  return (
    <div
      data-active={connected}
      aria-label="Integration categories"
      role="group"
      className={`orbit-stage relative mx-auto aspect-square w-full max-w-[520px] ${className}`}
    >
      <div aria-hidden className="orbit-glow glow-orb left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 bg-violet opacity-40" />
      <div className="orbit-plane absolute inset-0">
        <Ring items={INNER} radius="min(28vw,130px)" spin="animate-orbit-a" counter="animate-orbit-a-rev" tone="inner" />
        <Ring
          items={OUTER}
          radius="min(42vw,230px)"
          spin="animate-orbit-b"
          counter="animate-orbit-b-rev"
          tone="outer"
          delayOffset={180}
        />
      </div>
      <button
        type="button"
        aria-label={connected ? "Hide connections" : "Show how DevOps Manager connects to your tools"}
        aria-pressed={connected}
        onPointerEnter={(e) => e.pointerType === "mouse" && setConnected(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setConnected(false)}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && setConnected(true)}
        onBlur={() => setConnected(false)}
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onClick={() => {
          if (lastPointer.current !== "mouse") setConnected((c) => !c);
          lastPointer.current = "";
        }}
        className="orbit-hub absolute left-1/2 top-1/2 z-10 grid size-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-3xl bg-glass-strong shadow-glow ring-1 ring-glass-border"
      >
        <span aria-hidden className="orbit-hub-ping absolute inset-0 rounded-3xl" />
        <LogoMark className="relative size-14" />
      </button>
    </div>
  );
}

const SNIPPET = `curl https://api.themgr.in/v1/invoices \\
  -H "Authorization: Bearer $TM_KEY" \\
  -d customer=cus_kaveri \\
  -d "items[0][sku]=KRT-M" \\
  -d "items[0][qty]=40"`;

export function Integrations() {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <OrbitVisual />

        <div>
          <SectionHeading
            id="integrations-title"
            eyebrow="Integrations & open API"
            title={
              <>
                Plays well with the tools you <span className="serif-accent text-gradient">already use</span>.
              </>
            }
            lead="Connect payments, messaging and spreadsheets, or build your own workflows on our API."
          />
          <Reveal className="mt-10">
            <ul className="grid gap-3 text-muted-foreground">
              {["REST API and webhooks (in beta)", "Excel and CSV import and export", "Granular API keys per workspace"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Check className="size-4 text-success" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            {/* No overflow-hidden here: the current ring has to reach outside the card. */}
            <figure className="glass relative isolate mt-8 rounded-2xl bg-glass-strong [--net-radius:1rem]">
              <NetworkFlow seed={41} />
              <figcaption className="flex items-center justify-between border-b border-glass-border px-4 py-2 text-xs text-muted-foreground">
                <span>Create an invoice</span>
                <span className="eyebrow text-[10px]">API preview</span>
              </figcaption>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground/90 md:text-sm">
                <code>{SNIPPET}</code>
              </pre>
            </figure>
            <p className="mt-4 text-xs text-muted-foreground">
              Icons show integration categories. Specific connectors roll out during beta.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

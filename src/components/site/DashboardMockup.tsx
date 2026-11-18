import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Boxes, UsersRound, Wallet, Workflow } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { Logo, LogoMark } from "./Logo";

export type MockView = "overview" | "sales" | "inventory" | "finance" | "hr";

interface ViewData {
  title: string;
  subtitle: string;
  kpis: { label: string; value: string; delta: string; up?: boolean }[];
  chart: { type: "area" | "bars"; label: string; points: number[] };
  table: { cols: [string, string, string]; rows: [string, string, string][] };
}

/** Sample data only — shown in the UI as "Sample data". */
const VIEWS: Record<MockView, ViewData> = {
  overview: {
    title: "Good morning, Priya",
    subtitle: "Here's your business at a glance",
    kpis: [
      { label: "Revenue · Nov", value: "₹18,42,000", delta: "+12.4%", up: true },
      { label: "Open orders", value: "1,284", delta: "+86", up: true },
      { label: "Cash in bank", value: "₹42.6L", delta: "Reconciled" },
    ],
    chart: {
      type: "area",
      label: "Revenue, last 12 weeks",
      points: [30, 34, 31, 42, 40, 48, 46, 55, 52, 63, 68, 76],
    },
    table: {
      cols: ["Activity", "Module", "When"],
      rows: [
        ["Invoice #INV-2041 paid via UPI", "Finance", "2m"],
        ["14 units moved to Pune godown", "Inventory", "18m"],
        ["Payroll for Nov approved", "HR", "1h"],
      ],
    },
  },
  sales: {
    title: "Sales pipeline",
    subtitle: "38 deals moving this month",
    kpis: [
      { label: "Pipeline", value: "₹64.2L", delta: "+8.1%", up: true },
      { label: "Won this month", value: "38", delta: "+6", up: true },
      { label: "Win rate", value: "31%", delta: "+2.4 pts", up: true },
    ],
    chart: { type: "bars", label: "Deals by stage", points: [92, 74, 58, 41, 28, 19] },
    table: {
      cols: ["Deal", "Stage", "Value"],
      rows: [
        ["Sharma Textiles", "Proposal", "₹4,80,000"],
        ["Kaveri Foods", "Negotiation", "₹2,15,500"],
        ["Nexa Prints", "Won", "₹1,12,000"],
      ],
    },
  },
  inventory: {
    title: "Stock overview",
    subtitle: "3 warehouses · synced live",
    kpis: [
      { label: "Active SKUs", value: "2,418", delta: "+42", up: true },
      { label: "Low stock", value: "14", delta: "Reorder" },
      { label: "Stock value", value: "₹86.4L", delta: "+3.2%", up: true },
    ],
    chart: { type: "bars", label: "Units by warehouse", points: [80, 62, 45, 70, 38, 55] },
    table: {
      cols: ["Item", "Godown", "Qty"],
      rows: [
        ["Cotton kurta · M", "Jaipur", "340"],
        ["Steel bottle 1L", "Pune", "28 · low"],
        ["Notebook A5", "Delhi NCR", "1,920"],
      ],
    },
  },
  finance: {
    title: "Receivables",
    subtitle: "GST-ready books, reconciled daily",
    kpis: [
      { label: "Receivables", value: "₹12.8L", delta: "-4.2%", up: true },
      { label: "GST payable", value: "₹2.1L", delta: "Due 20th" },
      { label: "Overdue", value: "7", delta: "-3", up: true },
    ],
    chart: {
      type: "area",
      label: "Collections, last 12 weeks",
      points: [22, 28, 26, 35, 33, 41, 39, 47, 52, 50, 58, 64],
    },
    table: {
      cols: ["Invoice", "Customer", "Status"],
      rows: [
        ["INV-2041", "Kaveri Foods", "Paid · UPI"],
        ["INV-2038", "Nexa Prints", "Due in 3d"],
        ["INV-2029", "Arora & Sons", "Overdue"],
      ],
    },
  },
  hr: {
    title: "People",
    subtitle: "Payroll for November is ready",
    kpis: [
      { label: "Headcount", value: "86", delta: "+4", up: true },
      { label: "Present today", value: "79", delta: "92%" },
      { label: "Payroll", value: "₹21.3L", delta: "Ready" },
    ],
    chart: { type: "bars", label: "Attendance this week", points: [88, 92, 90, 85, 94, 70] },
    table: {
      cols: ["Employee", "Team", "Status"],
      rows: [
        ["Ananya Rao", "Sales", "On leave"],
        ["Imran Sheikh", "Warehouse", "Present"],
        ["Meera Iyer", "Finance", "Present"],
      ],
    },
  },
};

function Chart({ type, points }: ViewData["chart"]) {
  const gradientId = useId().replace(/:/g, "");
  const max = Math.max(...points);
  const values = Array.from({ length: 24 }, (_, i) => {
    const position = (i / 23) * (points.length - 1);
    const start = Math.floor(position);
    const end = Math.min(points.length - 1, start + 1);
    const from = points[start] ?? 0;
    const to = points[end] ?? from;
    return from + (to - from) * (position - start);
  });
  if (type === "bars") {
    const barWidth = 300 / values.length;
    return (
      <svg
        viewBox="0 0 300 100"
        className="h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gradientId}-bars`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6485ff" />
            <stop offset="1" stopColor="#4265f5" />
          </linearGradient>
        </defs>
        {[30, 60, 90].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#edf0fa" strokeWidth=".7" />
        ))}
        {values.map((value, i) => {
          const height = Math.max(20, (value / max) * 84);
          const x = i * barWidth + barWidth * 0.12;
          return (
            <motion.rect
              key={i}
              x={x}
              width={barWidth * 0.76}
              rx="1.5"
              fill={i % 5 === 3 ? `url(#${gradientId}-bars)` : "#9aaafa"}
              initial={{ height: 0, y: 100 }}
              animate={{ height, y: 100 - height }}
              transition={{ duration: 0.55, delay: i * 0.015, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>
    );
  }
  const coords = values.map((value, i) => [
    (i / (values.length - 1)) * 300,
    92 - (value / max) * 78,
  ]);
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x?.toFixed(1)},${y?.toFixed(1)}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 300 100"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#31a9d8" />
          <stop offset=".52" stopColor="#665be0" />
          <stop offset="1" stopColor="#e83f8c" />
        </linearGradient>
        <linearGradient id={`${gradientId}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7886f2" stopOpacity=".2" />
          <stop offset="1" stopColor="#7886f2" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[30, 60, 90].map((y) => (
        <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#edf0fa" strokeWidth=".7" />
      ))}
      <motion.path
        d={`${line} L300,100 L0,100 Z`}
        fill={`url(#${gradientId}-area)`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#${gradientId}-line)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/**
 * A browser-framed product mockup built from HTML/SVG (crisp at any size, no image weight).
 * Changing `view` cross-fades the content panel.
 */
export function DashboardMockup({
  view = "overview",
  className,
}: {
  view?: MockView;
  className?: string;
}) {
  const data = VIEWS[view];
  const navItems = [
    { key: "overview", icon: BarChart3, label: "Overview" },
    { key: "sales", icon: Workflow, label: "Sales & CRM" },
    { key: "inventory", icon: Boxes, label: "Inventory" },
    { key: "finance", icon: Wallet, label: "Finance" },
    { key: "hr", icon: UsersRound, label: "HR & Payroll" },
  ] as const;
  const heading = view === "overview" ? "Good morning, team ✦" : data.title;
  const subtitle = view === "overview" ? "Here's your business at a glance." : data.subtitle;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[#dfe5fb] bg-white text-[#18203f] shadow-[0_20px_55px_-30px_rgba(80,98,180,0.35)] md:rounded-3xl",
        className,
      )}
      role="img"
      aria-label={`Product preview: ${data.title} screen of DevOps Manager with sample data`}
    >
      <header className="relative flex h-12 items-center justify-between border-b border-[#e8ecfa] px-4 sm:h-14 sm:px-6">
        <div className="min-w-0">
          <Logo className="[&_img]:h-7" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#26a9dc] via-[#6948bb] to-[#ed2567] px-4 py-1.5 text-[10px] font-semibold text-white shadow-[0_5px_16px_rgba(117,67,180,0.28)] sm:text-xs">
            <span className="size-1.5 rounded-full bg-white/70" />
            {view === "overview" ? "Overview" : data.title}
          </span>
        </div>
        <span className="hidden items-center gap-2 text-[10px] font-medium text-[#7181bd] sm:inline-flex sm:text-xs">
          <span className="size-1.5 rounded-full bg-[#70bfd0]" />
          Live workspace
        </span>
      </header>
      <div className="h-0.5 w-[18%] bg-gradient-to-r from-[#ff6a7c] to-[#de71ed]" />

      <div className="grid min-h-[330px] grid-cols-[42px_1fr] sm:min-h-[390px] sm:grid-cols-[54px_1fr] md:min-h-[420px]">
        <nav
          className="flex flex-col items-center gap-4 border-r border-[#e8ecfa] py-4 sm:gap-5"
          aria-label="Dashboard modules"
        >
          <LogoMark className="size-6 sm:size-7" />
          <div className="mt-1 flex flex-col gap-2 sm:mt-3 sm:gap-3">
            {navItems.map(({ key, icon: Icon, label }) => (
              <span
                key={key}
                aria-label={label}
                className={cn(
                  "grid size-7 place-items-center rounded-lg text-[#7185df] sm:size-9",
                  view === key &&
                    "border border-[#f2c5c6] bg-[#fff0ef] text-[#dc5555] shadow-[0_5px_12px_rgba(220,85,85,0.1)]",
                )}
              >
                <Icon className="size-3.5 sm:size-4" />
              </span>
            ))}
          </div>
        </nav>

        <main className="min-w-0 p-3 sm:p-4 md:p-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
                <div>
                  <span className="inline-flex rounded-md border border-[#f2c1c1] bg-[#fff0ef] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[#c44747] sm:text-[9px]">
                    Business overview
                  </span>
                  <p className="mt-1 font-display text-xs font-bold tracking-tight sm:text-sm md:text-base">
                    {heading}
                  </p>
                  <p className="text-[9px] text-[#7b8cc1] sm:text-[10px] md:text-[11px]">
                    {subtitle}
                  </p>
                </div>
                <span className="mt-1 shrink-0 rounded-lg border border-[#f2d5d5] bg-[#fff8f7] px-2 py-1 text-[8px] text-[#59627e] sm:px-3 sm:py-1.5 sm:text-[10px]">
                  Last 30 days <span aria-hidden>⌄</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
                {data.kpis.map((k) => (
                  <div
                    key={k.label}
                    className="min-w-0 rounded-lg border border-[#e3e8fa] p-2 sm:rounded-xl sm:p-2.5 md:p-3"
                  >
                    <span className="inline-flex max-w-full truncate rounded-md border border-[#f2c1c1] bg-[#fff0ef] px-1.5 py-0.5 text-[7px] font-bold tracking-[0.08em] text-[#c44747] sm:px-2 sm:text-[8px] md:text-[9px]">
                      {k.label}
                    </span>
                    <p className="mt-1 truncate font-display text-xs font-bold tracking-tight sm:text-sm md:text-lg">
                      {k.value}
                    </p>
                    <p
                      className={cn(
                        "mt-1 truncate text-[8px] sm:text-[9px] md:text-[10px]",
                        k.up ? "text-[#5799c2]" : "text-[#7b8cc1]",
                      )}
                    >
                      <span aria-hidden>{k.up ? "↗ " : ""}</span>
                      {k.delta}
                      {k.up ? " vs last month" : ""}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-2 rounded-lg border border-[#e3e8fa] p-2 sm:mt-2.5 sm:rounded-xl sm:p-2.5 md:mt-3 md:p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-display text-[9px] font-semibold sm:text-[10px] md:text-xs">
                    Revenue overview
                  </p>
                  <span className="text-[8px] text-[#7b8cc1] sm:text-[9px]">Revenue · INR</span>
                </div>
                <div className="h-16 border-t border-[#edf0fa] pt-1.5 sm:h-20 md:h-24">
                  <Chart {...data.chart} />
                </div>
                <div className="mt-1 flex justify-between font-mono text-[7px] text-[#8190c2] sm:text-[8px]">
                  <span>OCT 18</span>
                  <span>OCT 25</span>
                  <span>NOV 01</span>
                  <span>NOV 08</span>
                  <span>NOV 16</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

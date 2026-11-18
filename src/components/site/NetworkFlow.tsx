import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

/** Small deterministic PRNG so server and browser draw the same network (no hydration mismatch). */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 300;

function buildGraph(seed: number) {
  const rnd = mulberry32(seed);
  const cols = 5;
  const rows = 4;
  const nodes: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push({
        x: ((c + 0.5) / cols) * W + (rnd() - 0.5) * 50,
        y: ((r + 0.5) / rows) * H + (rnd() - 0.5) * 40,
      });
    }
  }
  // Link every node to its two nearest neighbours.
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
  });
  const links = edges.flatMap(([a, b]) => {
    const p = nodes[a];
    const q = nodes[b];
    return p && q ? [{ key: `${a}-${b}`, x1: p.x, y1: p.y, x2: q.x, y2: q.y, delay: rnd() * 2 }] : [];
  });
  return { nodes, links };
}

/**
 * Hover effect for cards: a glowing network of nodes with data packets
 * flowing along the links, revealed around the cursor, plus an electric
 * "current" that runs around the card. The current ring is a sibling of the
 * network, offset OUTSIDE the card's edge, so it never crosses the card's
 * face (CSS in styles.css under "Network flow"). Place both as the FIRST
 * children of a positioned card; they only animate while the card is hovered.
 *
 * Cards that clip their contents (overflow-hidden) must drop that clipping
 * or wrap the clipped part in its own box, otherwise the ring gets cut off.
 */
export function NetworkFlow({ seed = 7, className }: { seed?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { nodes, links } = useMemo(() => buildGraph(seed), [seed]);

  // Track the cursor on the parent card so the network lights up where the pointer is.
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--nx", `${e.clientX - r.left}px`);
      el.style.setProperty("--ny", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <span ref={ref} aria-hidden className={cn("net-flow -z-10", className)}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="net-svg">
          {links.map(({ key, x1, y1, x2, y2 }) => (
            <line key={`l${key}`} className="net-link" x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
          {links.map(({ key, x1, y1, x2, y2, delay }, i) => (
            <line
              key={`p${key}`}
              className={`net-pulse net-tone-${i % 3}`}
              pathLength={100}
              style={{ animationDelay: `${delay.toFixed(2)}s` }}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          ))}
          {nodes.map((n, i) => (
            <circle
              key={`n${i}`}
              className="net-node"
              cx={n.x}
              cy={n.y}
              r={2.4}
              style={{ animationDelay: `${((i * 0.17) % 1.6).toFixed(2)}s` }}
            />
          ))}
        </svg>
      </span>
      <span aria-hidden className={cn("net-border", className)} />
    </>
  );
}

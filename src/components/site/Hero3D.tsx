import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import type { Group, Mesh } from "three";

/**
 * Floating glossy shapes in the brand colours, drifting beside the hero
 * headline. Browser-only: load with React.lazy behind <ClientOnly>.
 * Colours are read from the CSS brand tokens so they follow light/dark.
 */
type Palette = { indigo: string; violet: string; pink: string; red: string; cyan: string };

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(n).trim();
  return {
    indigo: v("--brand-indigo"),
    violet: v("--brand-violet"),
    pink: v("--brand-pink"),
    red: v("--brand-red"),
    cyan: v("--brand-cyan"),
  };
}

function usePalette() {
  const [p, setP] = useState<Palette>(readPalette);
  useEffect(() => {
    const obs = new MutationObserver(() => setP(readPalette()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return p;
}

type ShapeKind = "knot" | "ico" | "torus" | "octa" | "sphere" | "box";

function Floating({
  kind,
  color,
  position,
  scale,
  speed,
  phase,
}: {
  kind: ShapeKind;
  color: string;
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
}) {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;
    if (!mesh.current) return;
    mesh.current.rotation.x = t * 0.6;
    mesh.current.rotation.y = t * 0.8;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.35;
  });
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {kind === "knot" && <torusKnotGeometry args={[0.7, 0.24, 160, 24]} />}
      {kind === "ico" && <icosahedronGeometry args={[0.9, 0]} />}
      {kind === "torus" && <torusGeometry args={[0.75, 0.26, 32, 96]} />}
      {kind === "octa" && <octahedronGeometry args={[0.9, 0]} />}
      {kind === "sphere" && <sphereGeometry args={[0.7, 48, 48]} />}
      {kind === "box" && <boxGeometry args={[1, 1, 1]} />}
      <meshPhysicalMaterial
        color={color}
        roughness={0.22}
        metalness={0.25}
        clearcoat={1}
        clearcoatRoughness={0.15}
        flatShading={kind === "ico" || kind === "octa"}
      />
    </mesh>
  );
}

/** Whole scene leans toward the cursor and sinks back as the page scrolls. */
function Scene({ pointer }: { pointer: MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<Group>(null);
  const c = usePalette();
  const shapes = useMemo(
    () =>
      [
        { kind: "knot", color: c.indigo, position: [-5.8, 1.6, -1.5], scale: 0.85, speed: 0.5, phase: 0 },
        { kind: "ico", color: c.pink, position: [5.4, 2.2, -0.5], scale: 0.8, speed: 0.6, phase: 1.3 },
        { kind: "torus", color: c.violet, position: [6.2, -1.4, -2], scale: 1, speed: 0.45, phase: 2.1 },
        { kind: "octa", color: c.red, position: [-6.4, -1.8, -2.5], scale: 0.75, speed: 0.55, phase: 3.4 },
        { kind: "sphere", color: c.cyan, position: [-3.8, 3.6, -4], scale: 0.5, speed: 0.7, phase: 4.2 },
        { kind: "box", color: c.violet, position: [6.4, -4.2, -3.5], scale: 0.5, speed: 0.65, phase: 5 },
      ] as const,
    [c],
  );

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    g.rotation.y += (pointer.current.x * 0.25 - g.rotation.y) * 0.05;
    g.rotation.x += (-pointer.current.y * 0.15 - g.rotation.x) * 0.05;
    g.position.y += (scroll * 2.2 - g.position.y) * 0.08;
    g.position.z += (-scroll * 3 - g.position.z) * 0.08;
  });

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <Floating key={i} {...s} position={[...s.position]} />
      ))}
    </group>
  );
}

export default function Hero3D() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 8]} intensity={2.2} />
      <pointLight position={[-6, -3, 4]} intensity={30} color="#e8307e" />
      <pointLight position={[6, 4, 2]} intensity={25} color="#2ec4f1" />
      <Scene pointer={pointer} />
    </Canvas>
  );
}

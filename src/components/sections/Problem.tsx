import { MapPin } from "lucide-react";
import { LogoMark } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";
import { Words3D } from "@/components/site/Words3D";
import { OrbitVisual } from "@/components/sections/Integrations";

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-4">ABOUT THE COMPANY</p>
          <h2 id="problem-title" className="display-lg">
            <Words3D>
              Built by DevOps Manager.{" "}
              <span className="serif-accent text-muted-foreground">Made for businesses that move.</span>
            </Words3D>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground">
            DevOps Manager LLP is a technology company from Mangaluru, Karnataka. We build The Manager, a modern
            business management suite that brings people, processes and progress together, so growing businesses can
            spend less time juggling tools and more time moving forward.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-glass-border bg-card px-4 py-2 shadow-glow">
            <LogoMark className="size-10 shrink-0" />
            <div>
              <p className="text-sm font-display font-bold">DevOps Manager LLP</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden />
                Mangaluru, Karnataka
              </p>
            </div>
          </div>
        </Reveal>

        <OrbitVisual className="max-w-[420px]" />
      </div>
    </section>
  );
}

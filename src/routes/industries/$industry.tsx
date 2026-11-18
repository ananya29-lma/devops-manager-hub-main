import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CircleCheck,
  ExternalLink,
} from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/gsap";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { getIndustry, INDUSTRIES } from "@/lib/industries";

export const Route = createFileRoute("/industries/$industry")({
  head: () => ({
    meta: [
      { title: "Industry solutions — DevOps Manager" },
      { name: "description", content: "Explore industry-specific solutions from The Manager." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndustryPage,
});

function IndustryPage() {
  const { industry: slug } = Route.useParams();
  const industry = getIndustry(slug);
  const workflowRoot = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!workflowRoot.current) return;
      const { gsap, ScrollTrigger } = ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".industry-rail-path",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: "#industry-workflow", start: "top 65%", end: "bottom 65%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>(".industry-how-step").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 65%",
            onEnter: () => (el.dataset["active"] = "true"),
            onEnterBack: () => (el.dataset["active"] = "true"),
            onLeaveBack: () => (el.dataset["active"] = "false"),
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".industry-rail-path", { strokeDashoffset: 0 });
        gsap.utils.toArray<HTMLElement>(".industry-how-step").forEach((el) => (el.dataset["active"] = "true"));
      });
      return () => mm.revert();
    },
    { scope: workflowRoot },
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!industry) return null;

  const index = INDUSTRIES.findIndex((item) => item.slug === industry.slug);
  const previous = INDUSTRIES[(index - 1 + INDUSTRIES.length) % INDUSTRIES.length];
  const next = INDUSTRIES[(index + 1) % INDUSTRIES.length];

  return (
    <>
      <Navbar />
      <main id="main" className="overflow-hidden">
        <section className="relative min-h-[520px] pt-32 md:min-h-[620px] md:pt-40">
          <img
            src={industry.image}
            alt={industry.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101828]/95 via-[#101828]/80 to-[#101828]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-transparent" />
          <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-6 pb-14 md:min-h-[620px] md:pb-20">
            <Reveal className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-sm text-white/70">
                <Link to="/" className="transition-colors hover:text-white">Home</Link>
                <ChevronRight className="size-3.5" aria-hidden />
                <Link to="/" hash="industries" className="transition-colors hover:text-white">Industries</Link>
                <ChevronRight className="size-3.5" aria-hidden />
                <span className="text-white">{industry.name}</span>
              </nav>
              <p className="eyebrow mb-4 text-white">Industry solutions</p>
              <h1 className="display-xl max-w-3xl text-white">{industry.name}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{industry.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#solutions" className="btn-flow inline-flex h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-on-brand">
                  Explore Solutions
                </a>
                <Link to="/contact" className="inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15">
                  Book a Demo
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6">
          <nav className="py-7">
            <Link to="/" hash="industries" className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Industries
            </Link>
          </nav>

          <section className="py-16 md:py-24">
            <Reveal>
              <p className="eyebrow mb-4">Industry Challenges</p>
              <h2 className="display-lg max-w-3xl">Operational friction, made manageable.</h2>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {industry.challenges.map((challenge, i) => (
                  <SpotlightCard key={challenge} networkFlow={false} className="p-6">
                    <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-primary">0{i + 1}</span>
                    <p className="mt-5 leading-relaxed text-muted-foreground">{challenge}</p>
                  </SpotlightCard>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="solutions" className="band-lilac -mx-6 scroll-mt-24 px-6 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <p className="eyebrow mb-4">Solutions We Provide</p>
                <h2 className="display-lg max-w-3xl">Purpose-built workflows for {industry.shortName}.</h2>
                <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {industry.solutions.map((service) => {
                    const Icon = service.icon;
                    return (
                      <details key={service.name} className="group glass rounded-3xl border-glass-border bg-glass-strong p-6 open:shadow-glow">
                        <summary className="cursor-pointer list-none">
                          <div className="flex items-start justify-between gap-4">
                            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft ring-1 ring-glass-border">
                              <Icon className="size-5 text-primary" aria-hidden />
                            </span>
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${service.status === "Available" ? "bg-success/10 text-success" : "bg-brand-soft text-primary"}`}>
                              {service.status}
                            </span>
                          </div>
                          <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{service.name}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                        </summary>
                        <div className="mt-5 border-t border-glass-border pt-5 text-sm">
                          <p className="leading-relaxed text-muted-foreground">{service.detail}</p>
                          <p className="mt-4 font-medium text-foreground">How it works</p>
                          <p className="mt-1 leading-relaxed text-muted-foreground">{service.workflow}</p>
                          <p className="mt-4 font-medium text-foreground">Business benefit</p>
                          <p className="mt-1 leading-relaxed text-muted-foreground">{service.benefit}</p>
                          <p className="mt-4 font-medium text-foreground">Related modules</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {service.relatedModules.map((module) => (
                              <span key={module} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{module}</span>
                            ))}
                          </div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </section>

          <section ref={workflowRoot} id="industry-workflow" className="band-mint relative isolate -mx-6 overflow-hidden px-6 py-16 md:py-24">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-grid opacity-60" />
            </div>
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow mb-4">How It Works</p>
                <h2 className="display-lg">A practical workflow from setup to action.</h2>
              </div>
              <div className="relative mx-auto mt-16 max-w-4xl">
                <svg
                  aria-hidden
                  className="absolute left-5 top-0 h-full w-1 -translate-x-1/2 md:left-1/2"
                  preserveAspectRatio="none"
                  viewBox="0 0 4 100"
                >
                  <defs>
                    <linearGradient id="industry-rail-g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--brand-indigo)" />
                      <stop offset=".5" stopColor="var(--brand-violet)" />
                      <stop offset="1" stopColor="var(--brand-cyan)" />
                    </linearGradient>
                  </defs>
                  <path d="M2 0 V100" stroke="var(--glass-border)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <path
                    className="industry-rail-path"
                    d="M2 0 V100"
                    stroke="url(#industry-rail-g)"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    pathLength={1}
                    strokeDasharray="1"
                    strokeDashoffset="1"
                  />
                </svg>
                <ol className="grid gap-16">
                  {industry.workflow.map((step, i) => (
                    <li
                      key={step.title}
                      data-active={i === 0 ? "true" : "false"}
                      className="industry-how-step group relative grid grid-cols-[2.5rem_1fr] gap-6 md:grid-cols-2 md:gap-16"
                    >
                      <span
                        aria-hidden
                        className="relative z-10 grid size-10 place-items-center rounded-full border border-glass-border bg-background font-display text-sm text-muted-foreground transition-all duration-500 group-data-[active=true]:border-transparent group-data-[active=true]:bg-brand group-data-[active=true]:text-on-brand group-data-[active=true]:shadow-glow md:absolute md:left-1/2 md:-translate-x-1/2"
                      >
                        {i + 1}
                      </span>
                      <div
                        className={
                          "opacity-40 transition-opacity duration-500 group-data-[active=true]:opacity-100 " +
                          (i % 2 ? "md:col-start-2 md:pl-4" : "md:col-start-1 md:pr-12 md:text-right")
                        }
                      >
                        <h3 className="font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                        <p className="mt-2 text-muted-foreground">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </section>

          <section className="band-mint -mx-6 px-6 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <p className="eyebrow mb-4">Features and Capabilities</p>
                <h2 className="display-lg max-w-3xl">Modules connected around your business.</h2>
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {Array.from(new Set(industry.solutions.flatMap((service) => service.relatedModules))).map((module) => (
                    <article key={module} className="flex items-start gap-4 rounded-3xl border border-glass-border bg-glass p-5">
                      <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      <div>
                        <h3 className="font-display font-semibold">{module}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Connected workflows and shared business records.</p>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <Reveal>
              <p className="eyebrow mb-4">Business Benefits</p>
              <h2 className="display-lg max-w-3xl">Simpler operations, better control.</h2>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {industry.benefits.map((benefit) => (
                  <article key={benefit} className="flex items-start gap-4 rounded-3xl border border-glass-border p-6">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <p className="text-lg font-medium">{benefit}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </section>

          <section className="mb-20 rounded-3xl border border-glass-border bg-band px-6 py-10 text-on-brand md:px-10 md:py-12">
            <Reveal>
              <p className="eyebrow mb-4 text-on-brand/70">Next step</p>
              <h2 className="display-lg">Build a simpler operation for {industry.name}.</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-flow inline-flex h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-on-brand">Book a Demo</Link>
                <Link to="/contact" className="inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/15">Contact Our Team</Link>
                <Link to="/" hash="industries" className="inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white/80 hover:text-white">
                  Explore Other Industries <ExternalLink className="size-4" />
                </Link>
              </div>
            </Reveal>
          </section>

          <nav className="mb-16 grid gap-4 border-t border-glass-border pt-8 md:grid-cols-2" aria-label="Industry navigation">
            <Link to="/industries/$industry" params={{ industry: previous.slug }} className="group rounded-3xl border border-glass-border p-5 transition-colors hover:bg-glass">
              <span className="text-xs text-muted-foreground">Previous Industry</span>
              <span className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> {previous.name}
              </span>
            </Link>
            <Link to="/industries/$industry" params={{ industry: next.slug }} className="group rounded-3xl border border-glass-border p-5 text-right transition-colors hover:bg-glass">
              <span className="text-xs text-muted-foreground">Next Industry</span>
              <span className="mt-2 flex items-center justify-end gap-2 font-display text-lg font-semibold">
                {next.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}

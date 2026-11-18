import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Security — DevOps Manager" },
      { name: "description", content: "How DevOps Manager is built with security in mind." },
      { property: "og:title", content: "Security — DevOps Manager" },
      { property: "og:description", content: "How DevOps Manager is built with security in mind." },
    ],
  }),
  component: Page,
});

const SECTIONS: { h: string; p: string }[] = [
  { h: "Built with security in mind", p: "Security is part of how we design every module, from access controls to audit logs. We are early, and we are open about what is in place today." },
  { h: "Access control", p: "Role-based permissions let you decide who sees salaries, margins or bank details. Every change is recorded in an audit trail." },
  { h: "Data protection", p: "Traffic is encrypted in transit and data is encrypted at rest by our infrastructure providers. Backups run regularly." },
  { h: "Responsible disclosure", p: "Found a vulnerability? Email security@themgr.in and we will respond quickly." },
];

function Page() {
  return (
    <PageShell eyebrow="Trust" title="Security" lead="Last updated 16 November 2026. This is a draft written for our beta and will be reviewed before general launch.">
      <div className="grid gap-10">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-2xl font-semibold tracking-tight">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

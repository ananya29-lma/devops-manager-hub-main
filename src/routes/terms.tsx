import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Terms of Service — DevOps Manager" },
      { name: "description", content: "The terms that apply when you use DevOps Manager." },
      { property: "og:title", content: "Terms of Service — DevOps Manager" },
      { property: "og:description", content: "The terms that apply when you use DevOps Manager." },
    ],
  }),
  component: Page,
});

const SECTIONS: { h: string; p: string }[] = [
  { h: "Using the service", p: "The Manager is provided to businesses for managing their own operations. You are responsible for the accuracy of the data you enter and for the people you invite." },
  { h: "Beta", p: "During beta, features may change and occasional downtime may occur. We will tell you about significant changes in advance." },
  { h: "Trials and billing", p: "Trials last 14 days. Paid plans are billed per workspace, monthly or yearly, and prices exclude GST." },
  { h: "Your data", p: "You own your data. You can export it at any time, including after you cancel, for a reasonable period." },
  { h: "Contact", p: "Questions about these terms? Write to legal@themgr.in." },
];

function Page() {
  return (
    <PageShell eyebrow="Legal" title="Terms of Service" lead="Last updated 16 November 2026. This is a draft written for our beta and will be reviewed before general launch.">
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

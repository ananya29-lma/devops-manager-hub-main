import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Privacy Policy — DevOps Manager" },
      { name: "description", content: "How DevOps Manager collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — DevOps Manager" },
      { property: "og:description", content: "How DevOps Manager collects, uses and protects your information." },
    ],
  }),
  component: Page,
});

const SECTIONS: { h: string; p: string }[] = [
  { h: "What we collect", p: "Account details you give us (name, work email, company), the business data you add to your workspace, and basic usage information that helps us improve the product." },
  { h: "How we use it", p: "To run your workspace, provide support, send product updates you have opted into, and keep the service secure. We do not sell your data." },
  { h: "Where it is stored", p: "Your workspace data is stored with reputable cloud providers. We aim to keep data for Indian customers in India as the platform matures." },
  { h: "Your choices", p: "You can export or delete your workspace data at any time, and unsubscribe from marketing emails with one click." },
  { h: "Contact", p: "Questions about privacy? Write to privacy@themgr.in." },
];

function Page() {
  return (
    <PageShell eyebrow="Legal" title="Privacy Policy" lead="Last updated 16 November 2026. This is a draft written for our beta and will be reviewed before general launch.">
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

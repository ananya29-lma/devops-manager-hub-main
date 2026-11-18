import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { EmailCaptureForm } from "@/components/site/EmailCaptureForm";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Start your 14-day free trial — DevOps Manager" },
      { name: "description", content: "Preview the DevOps Manager early-access signup form. This sample does not send or save entries." },
      { property: "og:title", content: "Start your 14-day free trial — DevOps Manager" },
      { property: "og:description", content: "Preview the DevOps Manager early-access signup form. This sample does not send or save entries." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <PageShell
      eyebrow="Early access"
      title={
        <>
          Start your <span className="serif-accent text-gradient">14-day</span> free trial.
        </>
      }
      lead="Preview the early-access signup form. Requests are not sent or stored in this sample."
    >
      <EmailCaptureForm source="signup" cta="Request my invite" />
      <ul className="mt-10 grid gap-3 text-muted-foreground">
        {["No card needed", "Help moving your data during beta", "Cancel anytime, export everything"].map((t) => (
          <li key={t} className="flex items-center gap-3">
            <Check className="size-4 text-success" aria-hidden /> {t}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { DemoForm } from "@/components/site/DemoForm";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact & book a demo — DevOps Manager" },
      { name: "description", content: "Preview the DevOps Manager demo request form. This sample does not send or save entries." },
      { property: "og:title", content: "Contact & book a demo — DevOps Manager" },
      { property: "og:description", content: "Preview the DevOps Manager demo request form. This sample does not send or save entries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell narrow={false} eyebrow="Contact" title="Let's talk about your business." lead="Preview the demo request form. Requests are not sent or stored in this sample.">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass rounded-3xl p-6 md:p-10">
          <DemoForm />
        </div>
        <aside className="grid content-start gap-6 text-muted-foreground">
          <div className="flex gap-3">
            <Mail className="mt-1 size-5 text-primary" aria-hidden />
            <div>
              <p className="font-medium text-foreground">Email</p>
              <a href="mailto:hello@themgr.in" className="underline underline-offset-4">hello@themgr.in</a>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-1 size-5 text-primary" aria-hidden />
            <div>
              <p className="font-medium text-foreground">Based in</p>
              <p>India · working with teams nationwide</p>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

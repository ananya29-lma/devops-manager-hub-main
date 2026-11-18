import cover from "@/assets/devops-manager-hero.jpg";
import { EmailCaptureForm } from "@/components/site/EmailCaptureForm";
import { Reveal } from "@/components/site/Reveal";
import { Words3D } from "@/components/site/Words3D";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 md:py-32">
      {/* Brand cover art behind a white veil that fades to solid white at both edges. */}
      <img
        src={cover}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70 blur-[2px] dark:opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow">Manage today. Build a better tomorrow.</p>
        <span aria-hidden className="brand-bar mx-auto mt-3" />
        <h2 id="cta-title" className="display-xl mt-6">
          <Words3D>
            Close the tabs. <span className="text-gradient">Open the business.</span>
          </Words3D>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Preview the early-access form. Entries are not sent or saved in this sample.
        </p>
        <div className="mx-auto mt-10 max-w-xl text-left">
          <EmailCaptureForm />
        </div>
      </Reveal>
    </section>
  );
}

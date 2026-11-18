import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NetworkFlow } from "@/components/site/NetworkFlow";
import { SectionHeading } from "@/components/site/SectionHeading";

/**
 * Clearly marked placeholders. Replace with real, approved quotes from
 * early-access teams before launch.
 */
const PLACEHOLDERS = [
  {
    quote: "We used to spend the first week of every month reconciling stock with sales. Now it just matches.",
    who: "Owner, retail business",
  },
  {
    quote: "Payroll went from three days of spreadsheets to one afternoon of checking numbers.",
    who: "HR lead, manufacturing unit",
  },
  {
    quote: "Being able to send GST invoices on WhatsApp is the feature our customers noticed first.",
    who: "Founder, D2C brand",
  },
  {
    quote: "Fees, staff and supplies in one place. Our admin office finally has one screen open, not six.",
    who: "Administrator, school",
  },
];

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="testimonials-title"
            eyebrow="From early access"
            title={
              <>
                Stories are <span className="serif-accent text-gradient">on the way</span>.
              </>
            }
            lead="We're collecting feedback from our early-access teams. The cards below are placeholders that show the kind of outcomes we're building toward."
          />
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="mt-14">
          <CarouselContent className="-ml-6">
            {PLACEHOLDERS.map((t, i) => (
              <CarouselItem key={i} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <figure className="glass relative isolate flex h-full flex-col rounded-3xl p-8">
                  <NetworkFlow seed={i + 21} />
                  <div className="flex items-center justify-between">
                    <Quote className="size-6 text-primary" aria-hidden />
                    <span className="rounded-full border border-dashed border-glass-border px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                      Placeholder
                    </span>
                  </div>
                  <blockquote className="mt-6 flex-1 text-lg leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 text-sm">
                    <span aria-hidden className="size-10 rounded-full bg-brand-soft ring-1 ring-glass-border" />
                    <span>
                      <span className="block font-medium">Sample quote</span>
                      <span className="block text-muted-foreground">{t.who}</span>
                    </span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-end gap-2">
            <CarouselPrevious className="static translate-y-0 border-glass-border bg-glass" />
            <CarouselNext className="static translate-y-0 border-glass-border bg-glass" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const FAQS = [
  {
    q: "Is The Manager ready to use today?",
    a: "Yes. We're in beta, which means the core modules work and we ship improvements every week. Early-access teams get a direct line to the people building it.",
  },
  {
    q: "What happens when my 14-day trial ends?",
    a: "You choose a plan and keep going with all your data in place. If you decide not to continue, you can export everything to Excel or CSV.",
  },
  {
    q: "Are invoices GST compliant?",
    a: "Invoices include GSTIN, HSN or SAC codes, place of supply and the right CGST, SGST or IGST split. Return-ready reports make filing simpler for you or your CA.",
  },
  {
    q: "Can I move my existing data in?",
    a: "You can import customers, items, vendors and employees from Excel or CSV. During beta our team will help you with the move at no extra cost.",
  },
  {
    q: "How is my data kept safe?",
    a: "The Manager is built with security in mind: encrypted connections, role-based access, audit trails on every change, and regular backups. Read more on our Security page.",
  },
  {
    q: "Does it work in Hindi?",
    a: "Yes. Each person can switch the interface between English and Hindi, and invoices can be generated in either language.",
  },
  {
    q: "Can I run several branches or warehouses?",
    a: "Yes. Growth and Enterprise plans support multiple branches and warehouses, with stock transfers and per-location reports.",
  },
];

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="serif-accent text-gradient">answered</span>.
            </>
          }
          lead="Can't find what you're looking for? Book a demo and ask us directly."
        />
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-glass-border">
                <AccordionTrigger className="py-6 text-left font-display text-lg font-medium tracking-tight hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

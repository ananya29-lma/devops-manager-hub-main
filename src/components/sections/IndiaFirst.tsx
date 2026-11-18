import { motion } from "framer-motion";
import { Bell, Building2, IndianRupee, Languages, MessageCircle, ReceiptText, Smartphone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { NetworkFlow } from "@/components/site/NetworkFlow";
import { Words3D } from "@/components/site/Words3D";
import { formatINR } from "@/lib/modules";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: ReceiptText, title: "GST-ready invoicing", body: "GSTIN, HSN codes, CGST, SGST and IGST worked out for you." },
  { icon: Smartphone, title: "UPI & bank reconciliation", body: "Match incoming payments to invoices without the bank statement marathon." },
  { icon: Building2, title: "Multi-warehouse", body: "Run several godowns and branches, each with its own stock and staff." },
  { icon: IndianRupee, title: "₹ everywhere", body: "Lakhs and crores formatted the way your team reads them." },
  { icon: Languages, title: "Hindi & English", body: "Switch the interface and documents between हिंदी and English." },
  { icon: MessageCircle, title: "WhatsApp notifications", body: "Invoices, reminders and approvals sent where people actually reply." },
];

const L = {
  en: {
    invoice: "Tax Invoice",
    billTo: "Bill to",
    item: "Item",
    qty: "Qty",
    amount: "Amount",
    subtotal: "Subtotal",
    total: "Total",
    paid: "Paid via UPI",
    notify: "Invoice INV-2041 sent to Kaveri Foods on WhatsApp",
    items: ["Cotton kurta (M)", "Printed dupatta"],
  },
  hi: {
    invoice: "कर चालान",
    billTo: "बिल प्राप्तकर्ता",
    item: "वस्तु",
    qty: "मात्रा",
    amount: "राशि",
    subtotal: "उप-योग",
    total: "कुल",
    paid: "UPI से भुगतान हुआ",
    notify: "चालान INV-2041 कावेरी फ़ूड्स को WhatsApp पर भेजा गया",
    items: ["सूती कुर्ता (M)", "छपा दुपट्टा"],
  },
};

const LINES = [
  { qty: 40, rate: 1250 },
  { qty: 60, rate: 1000 },
];

/** Interactive sample invoice: the language toggle swaps every label. */
function InvoiceDemo() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const t = L[lang];
  const subtotal = LINES.reduce((s, l) => s + l.qty * l.rate, 0);
  const gst = subtotal * 0.09;
  const total = subtotal + gst * 2;

  return (
    <div className="relative">
      <div
        role="group"
        aria-label="Invoice language"
        className="glass mb-4 inline-flex rounded-full bg-glass-strong p-1 text-sm"
      >
        {(["en", "hi"] as const).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
            className={cn(
              "relative rounded-full px-4 py-1.5 transition-colors",
              lang === l ? "text-on-brand" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {lang === l && (
              <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <span className={cn("relative", l === "hi" && "font-hindi")}>{l === "en" ? "English" : "हिंदी"}</span>
          </button>
        ))}
      </div>

      <div lang={lang} className={cn("glass relative isolate rounded-3xl bg-glass-strong p-6 shadow-glow md:p-8", lang === "hi" && "font-hindi")}>
        <NetworkFlow seed={31} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-semibold">{t.invoice}</p>
            <p className="mt-1 text-xs text-muted-foreground">INV-2041 · 16 Nov 2026</p>
          </div>
          <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">{t.paid}</span>
        </div>
        <div className="mt-6 text-sm">
          <p className="text-muted-foreground">{t.billTo}</p>
          <p className="font-medium">Kaveri Foods Pvt. Ltd.</p>
          <p className="text-xs text-muted-foreground">GSTIN 29ABCDE1234F1Z5 · Sample</p>
        </div>
        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="border-b border-glass-border text-left text-xs text-muted-foreground">
              <th className="pb-2 font-normal">{t.item}</th>
              <th className="pb-2 text-right font-normal">{t.qty}</th>
              <th className="pb-2 text-right font-normal">{t.amount}</th>
            </tr>
          </thead>
          <tbody>
            {LINES.map((l, i) => (
              <tr key={i} className="border-b border-glass-border">
                <td className="py-3">{t.items[i]}</td>
                <td className="py-3 text-right tabular-nums">{l.qty}</td>
                <td className="py-3 text-right tabular-nums">₹{formatINR(l.qty * l.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="mt-4 grid gap-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground"><dt>{t.subtotal}</dt><dd className="tabular-nums">₹{formatINR(subtotal)}</dd></div>
          <div className="flex justify-between text-muted-foreground"><dt>CGST 9%</dt><dd className="tabular-nums">₹{formatINR(gst)}</dd></div>
          <div className="flex justify-between text-muted-foreground"><dt>SGST 9%</dt><dd className="tabular-nums">₹{formatINR(gst)}</dd></div>
          <div className="mt-2 flex justify-between border-t border-glass-border pt-3 text-lg font-semibold"><dt>{t.total}</dt><dd className="text-gradient tabular-nums">₹{formatINR(total)}</dd></div>
        </dl>
      </div>

      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "glass absolute -bottom-6 -left-2 flex max-w-xs items-start gap-3 rounded-2xl bg-glass-strong p-3 text-xs shadow-glow md:-left-10",
          lang === "hi" && "font-hindi",
        )}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-success/15">
          <Bell className="size-4 text-success" aria-hidden />
        </span>
        {t.notify}
      </motion.div>
    </div>
  );
}

export function IndiaFirst() {
  return (
    <section id="india" aria-labelledby="india-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="glow-orb -left-40 top-1/3 h-[28rem] w-[28rem] bg-cyan opacity-20" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="india-title"
            eyebrow="India-first"
            title={
              <>
                Built for how <span className="serif-accent text-gradient">India</span> does business.
              </>
            }
            lead="Not a foreign tool with a rupee sign bolted on. GST, UPI, godowns and WhatsApp are part of the plan from the first screen."
          />
          <Reveal>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <li key={title}>
                  <Icon className="size-5 text-primary" aria-hidden />
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                    <Words3D>{title}</Words3D>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="pb-8">
          <InvoiceDemo />
        </Reveal>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** Layout for secondary pages: shared nav and footer around a centred content column. */
export function PageShell({
  eyebrow,
  title,
  lead,
  children,
  narrow = true,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <div aria-hidden className="glow-orb -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 bg-signature opacity-20" />
        <div className={`relative mx-auto px-6 pb-24 pt-36 md:pt-44 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <span aria-hidden className="brand-bar mb-6" />
          <h1 className="display-lg">{title}</h1>
          {lead && <p className="mt-6 text-lg text-muted-foreground">{lead}</p>}
          <div className="mt-12">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

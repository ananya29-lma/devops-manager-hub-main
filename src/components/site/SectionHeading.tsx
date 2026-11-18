import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Words3D } from "./Words3D";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <span aria-hidden className={cn("brand-bar mb-6", align === "center" && "mx-auto")} />
      <h2 id={id} className="display-lg">
        <Words3D>{title}</Words3D>
      </h2>
      {lead && (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>
      )}
    </Reveal>
  );
}

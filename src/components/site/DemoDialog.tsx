import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DemoForm } from "./DemoForm";

/** Wraps any trigger element; opens the demo booking form in a modal. */
export function DemoDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(0);
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setTimeout(() => setKey((k) => k + 1), 300);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent data-lenis-prevent className="max-h-[90vh] overflow-y-auto rounded-3xl border-glass-border bg-popover sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-tight">Book a demo</DialogTitle>
          <DialogDescription>
            See The Manager running on data that looks like yours.
          </DialogDescription>
        </DialogHeader>
        <DemoForm key={key} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

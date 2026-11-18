import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { emailSchema, type EmailInput } from "@/lib/leads";
import { submitEmail } from "@/lib/leads.mock";
import { cn } from "@/lib/utils";
import { SuccessCheck } from "./SuccessCheck";

/**
 * Email capture with client validation (zod), a sample-only response and a success state.
 * `tone="brand"` is for use on top of the gradient band.
 */
export function EmailCaptureForm({
  source = "final-cta",
  tone = "default",
  cta = "Get early access",
  className,
}: {
  source?: EmailInput["source"];
  tone?: "default" | "brand";
  cta?: string;
  className?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse({ email, source });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email");
      return;
    }
    setError(null);
    setStatus("loading");
    try {
      await submitEmail(parsed.data);
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  const onBrand = tone === "brand";

  return (
    <div className={cn("w-full", className)} aria-live="polite">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("flex items-center gap-4", onBrand ? "text-on-brand" : "text-success")}
          >
            <SuccessCheck />
            <div className={onBrand ? "text-on-brand" : "text-foreground"}>
              <p className="font-display text-lg font-semibold">Sample form complete</p>
              <p className={cn("text-sm", onBrand ? "text-on-brand/80" : "text-muted-foreground")}>
                This sample request was not sent or saved.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8 }}
            onSubmit={onSubmit}
            noValidate
            className="flex w-full flex-col gap-3 sm:flex-row"
          >
            <label htmlFor={id} className="sr-only">
              Work email
            </label>
            <input
              id={id}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-err` : undefined}
              className={cn(
                "h-14 flex-1 rounded-full px-6 text-base outline-none transition-shadow",
                onBrand
                  ? "border border-on-brand/30 bg-on-brand/15 text-on-brand placeholder:text-on-brand/70 focus:ring-2 focus:ring-on-brand/70"
                  : "glass text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring",
              )}
            />
            <Button
              type="submit"
              size="xl"
              variant={onBrand ? "onBrand" : "hero"}
              disabled={status === "loading"}
            >
              {status === "loading" ? <Loader2 className="animate-spin" /> : null}
              {status === "loading" ? "Sending…" : cta}
              {status !== "loading" && <ArrowRight />}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
      {error && status !== "done" && (
        <p
          id={`${id}-err`}
          role="alert"
          className={cn("mt-3 px-6 text-sm", onBrand ? "font-medium text-on-brand" : "text-destructive")}
        >
          {error}
        </p>
      )}
    </div>
  );
}

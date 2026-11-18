import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { demoSchema, type DemoInput } from "@/lib/leads";
import { submitDemo } from "@/lib/leads.mock";
import { cn } from "@/lib/utils";
import { SuccessCheck } from "./SuccessCheck";

type Errors = Partial<Record<keyof DemoInput, string>>;

const initial: DemoInput = { name: "", email: "", company: "", phone: "", teamSize: "1-10", message: "" };

const fieldClass =
  "w-full rounded-xl border border-input bg-glass px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:ring-2 focus:ring-ring aria-[invalid=true]:border-destructive";

function Field({
  label,
  name,
  error,
  children,
  optional,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`demo-${name}`} className="text-sm font-medium">
        {label} {optional && <span className="text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`demo-${name}-err`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/** Demo booking form: zod validation per field, sample-only response, animated success. */
export function DemoForm({ className, onDone }: { className?: string; onDone?: () => void }) {
  const [values, setValues] = useState<DemoInput>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (k: keyof DemoInput) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const a11y = (k: keyof DemoInput) => ({
    id: `demo-${k}`,
    name: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `demo-${k}-err` : undefined,
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = demoSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof DemoInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setServerError(null);
    setStatus("loading");
    try {
      await submitDemo(parsed.data);
      setStatus("done");
    } catch {
      setStatus("idle");
      setServerError("We couldn't send that. Please try again in a moment.");
    }
  }

  return (
    <div className={cn("relative", className)} aria-live="polite">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <SuccessCheck className="size-16 text-success" />
            <p className="font-display text-2xl font-semibold">Sample request complete</p>
            <p className="max-w-sm text-muted-foreground">
              Thanks, {values.name.split(" ")[0]}. This preview does not send or save your demo request.
            </p>
            {onDone && (
              <Button variant="glass" onClick={onDone}>
                Close
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" error={errors.name}>
                <input {...a11y("name")} autoComplete="name" className={fieldClass} value={values.name} onChange={set("name")} />
              </Field>
              <Field label="Work email" name="email" error={errors.email}>
                <input {...a11y("email")} type="email" autoComplete="email" className={fieldClass} value={values.email} onChange={set("email")} />
              </Field>
              <Field label="Company" name="company" error={errors.company}>
                <input {...a11y("company")} autoComplete="organization" className={fieldClass} value={values.company} onChange={set("company")} />
              </Field>
              <Field label="Mobile" name="phone" error={errors.phone} optional>
                <input {...a11y("phone")} type="tel" autoComplete="tel" placeholder="98765 43210" className={fieldClass} value={values.phone} onChange={set("phone")} />
              </Field>
            </div>
            <Field label="Team size" name="teamSize" error={errors.teamSize}>
              <select {...a11y("teamSize")} className={fieldClass} value={values.teamSize} onChange={set("teamSize")}>
                <option value="1-10">1–10 people</option>
                <option value="11-50">11–50 people</option>
                <option value="51-200">51–200 people</option>
                <option value="200+">200+ people</option>
              </select>
            </Field>
            <Field label="What would you like to see?" name="message" error={errors.message} optional>
              <textarea {...a11y("message")} rows={3} className={fieldClass} value={values.message} onChange={set("message")} placeholder="e.g. GST invoicing and multi-warehouse stock" />
            </Field>
            {serverError && <p role="alert" className="text-sm text-destructive">{serverError}</p>}
            <Button type="submit" variant="hero" size="lg" disabled={status === "loading"} className="mt-2">
              {status === "loading" && <Loader2 className="animate-spin" />}
              {status === "loading" ? "Booking…" : "Book my demo"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Sample form only; your request is not sent or saved.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

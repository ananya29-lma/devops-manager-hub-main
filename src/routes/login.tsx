import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Log in — DevOps Manager" },
      { name: "description", content: "Preview the DevOps Manager sign-in screen. Account sign-in is not connected in this sample." },
      { property: "og:title", content: "Log in — DevOps Manager" },
      { property: "og:description", content: "Preview the DevOps Manager sign-in screen. Account sign-in is not connected in this sample." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const field =
  "w-full rounded-xl border border-input bg-glass px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    setError(null);
    toast("Sample sign-in", { description: "Account sign-in is not connected in this preview." });
  }

  return (
    <PageShell eyebrow="Welcome back" title="Log in" lead="This is a sample screen. Sign-in is not connected to an account service.">
      <form onSubmit={onSubmit} noValidate className="glass grid max-w-md gap-4 rounded-3xl p-8">
        <label className="grid gap-1.5 text-sm font-medium">
          Work email
          <input type="email" autoComplete="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Password
          <input type="password" autoComplete="current-password" className={field} value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="hero" size="lg">Log in</Button>
        <p className="text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="text-foreground underline underline-offset-4">Start a free trial</Link>
        </p>
      </form>
    </PageShell>
  );
}

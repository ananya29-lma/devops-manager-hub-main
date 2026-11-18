import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { AnchorLink } from "./AnchorLink";
import { BrandWave } from "./BrandWave";
import { Logo } from "./Logo";

const SOCIALS = [
  { label: "DevOps Manager on X", href: "https://x.com/", icon: Twitter },
  { label: "DevOps Manager on LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "DevOps Manager on Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "DevOps Manager on YouTube", href: "https://www.youtube.com/", icon: Youtube },
];

const linkCls = "text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground";

export function Footer() {
  return (
    <footer>
      {/* Wave divider melting from the page into the navy footer. */}
      <BrandWave edge="navy" className="-mb-px h-20 md:h-32" />
      <div className="band-navy">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            {/* Original colours with "Manager" in white so it reads on the navy band. */}
            <Logo tone="manager-white" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              One workspace for sales, stock, people and money. Built in India, for teams that are growing fast.
            </p>
            <p className="eyebrow mt-5 text-[0.68rem]">People · Processes · Progress · Together</p>
            <span aria-hidden className="brand-bar mt-3" />
            <ul className="mt-6 flex gap-2" aria-label="Social links">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass grid size-10 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-sm font-semibold text-on-brand/70">Business management, made simple.</p>
          </div>

          <nav aria-label="Product">
            <p className="eyebrow mb-4">Product</p>
            <ul className="grid gap-3">
              <li><AnchorLink id="features" className={linkCls}>Features</AnchorLink></li>
              <li><AnchorLink id="modules" className={linkCls}>Modules</AnchorLink></li>
              <li><AnchorLink id="pricing" className={linkCls}>Pricing</AnchorLink></li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="eyebrow mb-4">Company</p>
            <ul className="grid gap-3">
              <li><Link to="/contact" className={linkCls}>Contact</Link></li>
              <li><Link to="/contact" className={linkCls}>Book a demo</Link></li>
              <li><AnchorLink id="industries" className={linkCls}>Industries</AnchorLink></li>
              <li><AnchorLink id="faq" className={linkCls}>FAQ</AnchorLink></li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="eyebrow mb-4">Trust</p>
            <ul className="grid gap-3">
              <li><Link to="/security" className={linkCls}>Security</Link></li>
              <li><Link to="/privacy" className={linkCls}>Privacy</Link></li>
              <li><Link to="/terms" className={linkCls}>Terms</Link></li>
            </ul>
          </nav>
        </div>
        <div aria-hidden className="mx-auto h-px max-w-7xl bg-signature opacity-70" />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 DevOps Manager LLP · themgr.in</p>
          <p>Business management simplified · Made in India · Currently in beta</p>
        </div>
      </div>
    </footer>
  );
}

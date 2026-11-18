import { cn } from "@/lib/utils";
import mark from "@/assets/brand/devops-manager-mark-cut.png";
import logo from "@/assets/brand/devops-manager-wordmark.png";
import managerWhiteLogo from "@/assets/brand/devops-manager-wordmark-manager-white.png";

/** The gradient "M" from the DevOps Manager logo (uploaded artwork, not redrawn). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img src={mark} alt="" aria-hidden="true" width={220} height={220} decoding="async" className={cn("h-8 w-auto object-contain", className)} />
  );
}

/**
 * Full "M + DevOps Manager" logo.
 * - `responsive`: icon only on small screens, full logo from `sm` up (navbar).
 * - `tone="white"`: single-colour white version for dark surfaces.
 * - `tone="manager-white"`: original colours with the word "Manager" in white (dark surfaces).
 */
export function Logo({
  className,
  responsive = false,
  iconOnly = false,
  tone = "color",
}: {
  className?: string;
  responsive?: boolean;
  iconOnly?: boolean;
  tone?: "color" | "white" | "manager-white";
}) {
  const white = tone === "white";
  const logoSrc = tone === "manager-white" ? managerWhiteLogo : logo;
  return (
    <span className={cn("inline-flex items-center", className)}>
      {iconOnly ? (
        <LogoMark className={cn("h-10", white && "brightness-0 invert")} />
      ) : (
        <>
          {responsive && <LogoMark className={cn("h-9 sm:hidden", white && "brightness-0 invert")} />}
          <img src={logoSrc} alt="DevOps Manager" width={695} height={200} decoding="async" className={cn("h-10 w-auto object-contain", responsive && "hidden sm:block", white && "brightness-0 invert")} />
        </>
      )}
    </span>
  );
}

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Light/dark switch. The button is a two-sided coin that flips in 3D. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className={cn("group grid size-10 place-items-center rounded-full [perspective:400px]", className)}
    >
      <span
        className={cn(
          "preserve-3d relative grid size-9 place-items-center transition-transform duration-700 ease-[var(--ease-out-expo)]",
          dark && "[transform:rotateY(180deg)]",
        )}
      >
        <span className="backface-hidden absolute inset-0 grid place-items-center rounded-full border border-glass-border bg-glass text-brand-red">
          <Sun className="size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
        <span className="backface-hidden absolute inset-0 grid place-items-center rounded-full border border-glass-border bg-glass text-cyan [transform:rotateY(180deg)]">
          <Moon className="size-4 transition-transform duration-500 group-hover:-rotate-12" />
        </span>
      </span>
    </button>
  );
}

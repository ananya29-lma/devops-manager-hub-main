import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { scrollToId } from "@/lib/smooth-scroll";

/**
 * Links to a section on the home page. On "/" it smooth-scrolls in place;
 * from other pages it navigates to "/#id".
 */
export function AnchorLink({
  id,
  children,
  className,
  onNavigate,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Link
      to="/"
      hash={id}
      className={className}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          scrollToId(id);
        }
        onNavigate?.();
      }}
    >
      {children}
    </Link>
  );
}

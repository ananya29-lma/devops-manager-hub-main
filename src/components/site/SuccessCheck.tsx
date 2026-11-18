import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Animated check mark: circle scales in, tick draws itself. */
export function SuccessCheck({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 52 52"
      className={cn("size-14", className)}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      aria-hidden
    >
      <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
      <motion.path
        d="M15 27l7 7 15-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

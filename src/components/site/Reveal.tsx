import { motion, type HTMLMotionProps } from "framer-motion";

/**
 * 3D reveal on first view: the block swings up from a backward tilt. MotionConfig reducedMotion="user" (in __root)
 * strips the transform for reduced-motion users, leaving a plain fade.
 */
export function Reveal({
  delay = 0,
  y = 24,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotateX: 18, transformPerspective: 1200 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    />
  );
}

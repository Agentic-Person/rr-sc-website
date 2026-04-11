"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** If true (default), animates when scrolled into view. If false, animates immediately on mount. */
  inView?: boolean;
}

export function FadeIn({ children, className, delay = 0, y = 60, inView = true }: FadeInProps) {
  if (inView) {
    return (
      <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 1.5, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

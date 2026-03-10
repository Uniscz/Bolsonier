"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

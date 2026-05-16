"use client";

import { motion } from "framer-motion";

export default function SquareFlipLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        className="h-16 w-16 rounded-lg bg-primary"
        style={{ perspective: "1000px" }}
        animate={{
          rotateY: [0, 180, 360],
          rotateX: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

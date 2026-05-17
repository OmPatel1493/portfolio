"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function EasterEgg() {
  const [keys, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => [...prev.slice(-9), e.key]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (keys.join(",") === KONAMI_CODE.join(",")) {
      setActivated(true);
      setTimeout(() => setActivated(false), 3000);
    }
  }, [keys]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-9xl mb-4"
            >
              🎮
            </motion.div>
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              Konami Code Activated!
            </div>
            <div className="text-xl text-gray-600 dark:text-gray-400 mt-2">
              You found the secret! 🎉
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

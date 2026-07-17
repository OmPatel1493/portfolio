"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const LEARNING = "PyTorch";

const WORKING_ON = {
  name: "Portfolio",
  url: "https://github.com/OmPatel1493/portfolio",
};

export default function GitHubActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="fixed bottom-24 left-4 max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-40 hidden md:block"
    >
      <div className="flex items-start space-x-2">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-0.5 flex-shrink-0"
        >
          <Code2 className="w-4 h-4 text-amber-500" />
        </motion.div>
        <div className="text-xs flex-1">
          <div className="text-gray-500 dark:text-gray-400">Currently learning:</div>
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-gray-900 dark:text-white font-medium mt-1"
          >
            {LEARNING}
          </motion.div>

          <div className="h-px w-32 bg-gray-200 dark:bg-gray-700 my-3" />

          <div className="text-gray-500 dark:text-gray-400">Currently working on:</div>
          <motion.a
            href={WORKING_ON.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="inline-block mt-1 font-medium text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            {WORKING_ON.name}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

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
      className="fixed bottom-24 left-4 max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-40 hidden md:block"
    >
      <div className="flex items-start space-x-2">
        <Code2 className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs flex-1">
          <div className="text-gray-500 dark:text-gray-400">Currently learning:</div>
          <div className="text-gray-900 dark:text-white font-medium mt-1">{LEARNING}</div>

          <div className="h-px w-32 bg-gray-200 dark:bg-gray-700 my-3" />

          <div className="text-gray-500 dark:text-gray-400">Currently working on:</div>
          <a
            href={WORKING_ON.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {WORKING_ON.name}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

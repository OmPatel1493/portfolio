import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="font-serif italic text-5xl md:text-7xl text-gray-900 dark:text-gray-100 tracking-tight">
            Om Patel
          </h2>

          <a
            href="mailto:omp14903@gmail.com"
            className="inline-block mt-10 text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            omp14903@gmail.com
          </a>

          <div className="mt-8 flex items-center justify-center gap-8">
            <a
              href="https://www.linkedin.com/in/ompatel777/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/OmPatel1493"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>

          <p className="mt-10 text-sm text-gray-600 dark:text-gray-400">
            Currently based in Montreal, QC. Open to internship and collaborations.
          </p>
        </div>

        <div className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>Designed by Om Patel</span>
          <span>© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}

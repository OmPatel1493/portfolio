"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { Terminal } from "@/components/terminal/Terminal";

const navItems = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Experience", path: "#experience" },
  { name: "Projects", path: "#projects" },
  { name: "Skills", path: "#skills" },
  { name: "Contact", path: "#contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.path.replace("#", ""));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= viewportCenter) {
          current = id;
        } else {
          break;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              OP
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.filter((item) => item.name !== "Home").map((item) => {
                const isActive = activeSection === item.path.replace("#", "");
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(item.path)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowTerminal(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Open Terminal"
                  type="button"
                >
                  <TerminalIcon className="w-5 h-5" />
                </button>
                <ThemeSwitcher />
              </div>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setShowTerminal(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open Terminal"
                type="button"
              >
                <TerminalIcon className="w-5 h-5" />
              </button>
              <ThemeSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.path.replace("#", "");
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      document.querySelector(item.path)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={cn(
                      "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-violet-600 dark:text-violet-400 bg-violet-500/10"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
    </>
  );
}

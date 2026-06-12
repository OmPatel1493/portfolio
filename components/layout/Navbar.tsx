"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Terminal } from "@/components/terminal/Terminal";
import ScrambleText from "@/components/ui/ScrambleText";

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
  const [showHint, setShowHint] = useState(false);
  const [terminalEverOpened, setTerminalEverOpened] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logoRef = useRef<HTMLAnchorElement>(null);

  // Navigate to a homepage section. On "/" we smooth-scroll directly; from any
  // other route we client-side route home (no full reload, no hash in the URL)
  // and stash the target so the arrival effect below scrolls to it.
  const goToSection = (path: string) => {
    const id = path.replace("#", "");
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTarget", id);
      router.push("/");
    }
  };

  // After client-side navigation back to "/", scroll to the stashed section
  // once it has mounted (the homepage animates in, so poll briefly for it).
  useEffect(() => {
    if (pathname !== "/") return;
    const target = sessionStorage.getItem("scrollTarget");
    if (!target) return;
    sessionStorage.removeItem("scrollTarget");

    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (tries++ < 40) {
        setTimeout(tryScroll, 50);
      }
    };
    tryScroll();
  }, [pathname]);

  const handleLogoHover = () => {
    if (!logoRef.current) return;
    const letters = logoRef.current.querySelectorAll(".logo-letter");
    gsap.fromTo(
      letters,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: "power2.out", overwrite: true }
    );
  };

  useEffect(() => {
    if (terminalEverOpened) return;

    let idleTimer: ReturnType<typeof setTimeout>;

    const resetIdleTimer = () => {
      setShowHint(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setShowHint(true), 3000);
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("touchstart", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
    };
  }, [terminalEverOpened]);

  const openTerminal = () => {
    setShowTerminal(true);
    setTerminalEverOpened(true);
    setShowHint(false);
  };

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
            <Link
              ref={logoRef}
              href="/"
              onMouseEnter={handleLogoHover}
              className="font-mono text-lg tracking-tight text-white"
              aria-label="Om Patel — Home"
            >
              <span className="logo-letter inline-block text-amber-500">&lt;</span>
              {"OmPatel".split("").map((char, i) => (
                <span key={`name-${i}`} className="logo-letter inline-block">
                  {char}
                </span>
              ))}
              <span className="logo-letter inline-block text-amber-500">/</span>
              <span className="logo-letter inline-block text-amber-500">&gt;</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.filter((item) => item.name !== "Home").map((item) => {
                const isActive = pathname === "/" && activeSection === item.path.replace("#", "");
                return (
                  <a
                    key={item.path}
                    href={pathname === "/" ? item.path : `/${item.path}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(item.path);
                    }}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <ScrambleText text={item.name} className="uppercase tracking-wide" />
                  </a>
                );
              })}
              <div className="relative flex items-center">
                <button
                  onClick={openTerminal}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Open Terminal"
                  type="button"
                >
                  <TerminalIcon className="w-5 h-5" />
                </button>
                {showHint && (
                  <div className="absolute top-full right-0 mt-2 pointer-events-none animate-fade-in">
                    <div className="relative px-3 py-1.5 rounded-lg bg-amber-500 text-gray-900 text-xs font-medium shadow-lg whitespace-nowrap">
                      try me
                      <div className="absolute -top-1 right-4 w-2 h-2 rotate-45 bg-amber-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={openTerminal}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open Terminal"
                type="button"
              >
                <TerminalIcon className="w-5 h-5" />
              </button>
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
                const isActive = pathname === "/" && activeSection === item.path.replace("#", "");
                return (
                  <a
                    key={item.path}
                    href={pathname === "/" ? item.path : `/${item.path}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      goToSection(item.path);
                    }}
                    className={cn(
                      "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-amber-600 dark:text-amber-400 bg-amber-500/10"
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

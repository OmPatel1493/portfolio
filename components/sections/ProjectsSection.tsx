"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 80%",
          end: "top top",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "back.out(1.7)"
      });

      // Text reveal animation
      gsap.from(".projects-reveal-text", {
        scrollTrigger: {
          trigger: ".projects-reveal-text",
          start: "top 85%",
          end: "bottom 60%",
          scrub: 1,
        },
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
      });

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      if (isDesktop && carouselRef.current && sectionRef.current) {
        const carousel = carouselRef.current;
        const cardWidth = 380 + 32;
        const margin = 64;
        const totalWidth = projects.length * cardWidth;
        const maxScroll = totalWidth - window.innerWidth + margin * 2;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${maxScroll * 3}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            gsap.to(carousel, { x: -maxScroll * self.progress, duration: 0 });
            const index = Math.round(self.progress * (projects.length - 1));
            setCurrentIndex(index);
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="projects-title text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400 dark:from-white dark:to-gray-500 mb-4">
            Projects
          </h2>
          <p className="projects-reveal-text text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8" style={{ clipPath: "inset(0 100% 0 0)" }}>
            Explore my latest work and creative solutions
          </p>
        </div>
      </div>

      <div className="relative h-[500px]">
        {canScrollLeft && (
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous project"
            className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-gray-200" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next project"
            className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-full shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-900 dark:text-gray-200" />
          </button>
        )}
        <div className={`hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-gray-800/80 dark:backdrop-blur-md dark:border dark:border-gray-700/50 rounded-full shadow-lg transition-opacity ${currentIndex === 0 ? 'opacity-30' : 'opacity-100'}`}>
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-gray-200" />
        </div>
        <div className={`hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-gray-800/80 dark:backdrop-blur-md dark:border dark:border-gray-700/50 rounded-full shadow-lg transition-opacity ${currentIndex === projects.length - 1 ? 'opacity-30' : 'opacity-100'}`}>
          <ChevronRight className="w-6 h-6 text-gray-900 dark:text-gray-200" />
        </div>

        <div ref={scrollContainerRef} className="h-full flex items-center overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:snap-none no-scrollbar">
        <div ref={carouselRef} className="flex gap-4 md:gap-8 px-4 md:pl-16 md:pr-0 py-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="snap-center flex-shrink-0 w-[85vw] sm:w-[380px] h-[450px] bg-white dark:bg-gray-800/60 dark:backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/50 p-6 flex flex-col group overflow-hidden transition-colors hover:dark:border-primary-500/50 hover:dark:bg-gray-800/80"
            >
              {project.image && (
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden border dark:border-gray-700/50">
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 transform group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              {project.featured && (
                <Badge variant="primary" className="mb-4 w-fit dark:bg-primary-900/30 dark:text-primary-300 dark:border dark:border-primary-700/50">
                  Featured
                </Badge>
              )}

              <Link href={`/projects/${project.id}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
              </Link>

              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge className="dark:bg-gray-700/50 dark:text-gray-300" key={tag}>{tag}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700/50 dark:border dark:border-gray-600/30 text-gray-700 dark:text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Github className="w-5 h-5 mr-1" />
                    <span className="text-sm">Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-1" />
                    <span className="text-sm">Live</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

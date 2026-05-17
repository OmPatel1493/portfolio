"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !carouselRef.current) return;

    const container = containerRef.current;
    const carousel = carouselRef.current;
    const cards = carousel.querySelectorAll(".project-card");

    const scrollWidth = carousel.scrollWidth - container.clientWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(carousel, {
      x: -scrollWidth,
      ease: "none",
    });

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0.6, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left center",
            end: "center center",
            scrub: true,
          },
        }
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.set(carousel, { clearProps: "all" });
      cards.forEach((card) => gsap.set(card, { clearProps: "all" }));
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="h-full flex items-center">
        <div ref={carouselRef} className="flex gap-8 px-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card flex-shrink-0 w-[400px] h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col"
            >
              {project.featured && (
                <Badge variant="primary" className="mb-4 w-fit">
                  Featured
                </Badge>
              )}

              <Link href={`/projects/${project.id}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
              </Link>

              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
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
      
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
        Scroll down to explore projects →
      </div>
    </div>
  );
}

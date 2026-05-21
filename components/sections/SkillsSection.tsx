"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories } from "@/data/skills";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-title", {
        scrollTrigger: {
          trigger: ".skills-title",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".skill-row", {
        scrollTrigger: {
          trigger: ".skill-rows",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="skills-title text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400 dark:from-white dark:to-gray-500 mb-4">
            Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The tools and technologies I work with
          </p>
        </div>

        <div className="skill-rows space-y-8 md:space-y-10">
          {Object.entries(skillCategories).map(([category, items]) => (
            <div
              key={category}
              className="skill-row flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
            >
              <div className="md:w-40 md:flex-shrink-0 md:pt-2">
                <h3 className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                  {category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 flex-1">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-md text-sm font-medium border border-amber-400/30 dark:border-amber-400/25 text-gray-700 dark:text-gray-200 bg-amber-500/5 dark:bg-amber-500/5 hover:border-amber-400/60 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

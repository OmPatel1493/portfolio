"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".education-card", {
        scrollTrigger: {
          trigger: ".education-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="education-card mx-auto max-w-2xl rounded-2xl border border-amber-400/30 dark:border-amber-400/25 bg-amber-500/5 dark:bg-amber-500/5 backdrop-blur-sm p-8 md:p-10">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-4">
            Education
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            MS Computer Science
          </h3>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">
            Concordia University <span className="text-gray-400 dark:text-gray-500">·</span> Jan 2026 – Dec 2027
          </p>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Coursework:</span>{" "}
            Algorithm Design Techniques, Distributed System Design, Programming and Problem Solving
          </p>
        </div>

      </div>
    </div>
  );
}

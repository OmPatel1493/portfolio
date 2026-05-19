"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/experience";
import Timeline from "@/components/sections/Timeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const timelineItems = experiences.map((exp) => ({
    id: exp.id,
    title: exp.position,
    subtitle: exp.company,
    duration: exp.duration,
    location: exp.location,
    description: exp.description,
    techStack: exp.techStack,
    type: "work" as const
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".experience-title", {
        scrollTrigger: {
          trigger: ".experience-title",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)"
      });

      // Animate timeline line
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out"
      });

      // Animate each timeline card with alternating directions
      document.querySelectorAll(".timeline-card").forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          rotation: index % 2 === 0 ? -5 : 5,
          duration: 1,
          ease: "power3.out"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative z-10">
        <div className="experience-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-primary-400 dark:to-emerald-400 mb-4">
            Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and contributions
          </p>
        </div>

        <div className="relative">
          <div className="timeline-line absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          <Timeline items={timelineItems} />
        </div>
      </div>
    </div>
  );
}

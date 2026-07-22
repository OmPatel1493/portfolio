"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The bio, split into segments. `accent` phrases pop in amber + semibold and
// animate slightly later, so the eye lands on the key words as it reads.
const bio: { text: string; accent?: boolean }[] = [
  { text: "I'm " },
  { text: "Om Patel", accent: true },
  { text: ", a " },
  { text: "Computer Science master's student", accent: true },
  { text: " at " },
  { text: "Concordia University", accent: true },
  { text: " focused on " },
  { text: "machine learning", accent: true },
  { text: " and " },
  { text: "full-stack engineering", accent: true },
  { text: ". I like turning messy problems into clean, data-driven products — from " },
  { text: "resume-matching AI", accent: true },
  { text: " to " },
  { text: "real-time analytics dashboards", accent: true },
  { text: ". Right now I'm building, shipping, and " },
  { text: "open to Summer 2026 internships", accent: true },
  { text: "." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        scrollTrigger: { trigger: ".about-title", start: "top 80%" },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Reveal the bio word-group by word-group as it scrolls into view.
      gsap.from(".bio-seg", {
        scrollTrigger: { trigger: ".bio", start: "top 80%" },
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".edu-card", {
        scrollTrigger: { trigger: ".edu-grid", start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="about-title text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400 dark:from-white dark:to-gray-500 mb-4">
            About
          </h2>
        </div>

        {/* ── Animated narrative bio ── */}
        <p className="bio text-2xl md:text-3xl font-medium leading-relaxed text-gray-500 dark:text-gray-400 text-center mb-20">
          {bio.map((seg, i) => (
            <span
              key={i}
              className={
                seg.accent
                  ? "bio-seg text-gray-900 dark:text-white font-semibold"
                  : "bio-seg"
              }
            >
              {seg.text}
            </span>
          ))}
        </p>

        {/* ── Education ── */}
        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-6 text-center">
          Education
        </p>

        <div className="edu-grid space-y-5">
          {education.map((edu) => (
            <div
              key={edu.id}
              className={`edu-card relative rounded-2xl border p-6 md:p-8 backdrop-blur-sm transition-colors ${
                edu.current
                  ? "border-amber-400/40 dark:border-amber-400/30 bg-amber-500/5"
                  : "border-gray-200 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl ${
                    edu.current
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      : "bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}, {edu.field}
                    </h3>
                    {edu.current && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                        </span>
                        In Progress
                      </span>
                    )}
                  </div>

                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {edu.duration}
                  </p>

                  {edu.coursework && edu.coursework.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {edu.gpa && (
                  <div className="flex-shrink-0 text-right">
                    <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-none">
                      {edu.gpa.split("/")[0]}
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-1">
                      GPA{edu.gpa.includes("/") ? ` / ${edu.gpa.split("/")[1]}` : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

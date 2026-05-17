"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, skillCategories } from "@/data/skills";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimatedCounter from "@/components/sections/AnimatedCounter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      // Text reveal animation
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 85%",
          end: "bottom 60%",
          scrub: 1,
        },
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
      });

      // Stats cards stagger
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stat-card",
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      });

      // Skill cards with rotation
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: ".skill-card",
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        rotateY: 90,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="about-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-primary-400 dark:to-purple-400 mb-4">
            About Me
          </h2>
          <p className="reveal-text text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" style={{ clipPath: "inset(0 100% 0 0)" }}>
            Passionate developer with expertise in full-stack development and data science
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Card className="stat-card text-center dark:bg-gray-800/60 dark:backdrop-blur-xl dark:border-gray-700/50">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              <AnimatedCounter end={2} suffix="+" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Internships</div>
          </Card>
          <Card className="stat-card text-center dark:bg-gray-800/60 dark:backdrop-blur-xl dark:border-gray-700/50">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              <AnimatedCounter end={5} suffix="+" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
          </Card>
          <Card className="stat-card text-center dark:bg-gray-800/60 dark:backdrop-blur-xl dark:border-gray-700/50">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              <AnimatedCounter end={8} />.<AnimatedCounter end={31} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">GPA</div>
          </Card>
          <Card className="stat-card text-center dark:bg-gray-800/60 dark:backdrop-blur-xl dark:border-gray-700/50">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              <AnimatedCounter end={10} suffix="+" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Skills</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: "1000px" }}>
          {Object.entries(skillCategories).slice(0, 4).map(([category, categorySkills]) => (
            <Card key={category} className="skill-card dark:bg-gray-800/60 dark:backdrop-blur-xl dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge key={skill} variant="primary" className="dark:bg-primary-900/30 dark:text-primary-300 dark:border dark:border-primary-700/50">{skill}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

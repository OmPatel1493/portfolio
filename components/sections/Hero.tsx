"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for title
      if (titleRef.current) {
        const chars = titleRef.current.textContent?.split("") || [];
        titleRef.current.innerHTML = chars.map(char => 
          `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`
        ).join("");
        
        gsap.from(titleRef.current.children, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: "back.out(1.7)"
        });
      }

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5
      });

      // Description animation
      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8
      });

      // Buttons animation
      gsap.from(buttonsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.8,
        stagger: 0.2,
        duration: 0.8,
        delay: 1.1,
        ease: "back.out(1.7)"
      });

      // Set initial opacity to 1 after animation
      gsap.set([subtitleRef.current, descRef.current, buttonsRef.current], { opacity: 1 });

      // Name scale on scroll
      gsap.to(titleRef.current, {
        scale: 2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fade out other content on scroll
      gsap.to([subtitleRef.current, descRef.current, buttonsRef.current], {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            style={{ perspective: "1000px" }}
          >
            Hi, I'm Om Patel
          </h1>

          <div
            ref={subtitleRef}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-8 h-20 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-300"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            <TypeAnimation
              sequence={[
                "I build web apps.",
                2000,
                "I explore machine learning.",
                2000,
                "I work with data.",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Passionate about building innovative solutions with cutting-edge technologies
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/Om_Patel.pdf" download="Om_Patel_Resume.pdf">
              <Button size="lg" className="group w-full sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-500">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </a>
            <a href="#projects">
              <Button variant="outline" size="lg" className="group w-full sm:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                View Projects
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

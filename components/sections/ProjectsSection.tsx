"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { Github, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import SpotlightTile from "@/components/ui/SpotlightTile";
import ProjectDetailModal from "@/components/sections/ProjectDetailModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featured = projects.find((p) => p.featured) ?? projects[0];
const secondaryProjects = projects.filter((p) => !p.featured);
// The home section spotlights the featured one, so once there's more than a
// single real project we surface a "View all" link to the full /projects list.
const realProjects = projects.filter((p) => p.longDescription);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "back.out(1.7)",
      });

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
          <p
            className="projects-reveal-text text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            A focused look at what I&apos;m building — more shipping soon.
          </p>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:auto-rows-[minmax(180px,auto)]"
      >
        {/* ── Featured project: spans 2 cols × 2 rows ── */}
        <motion.div
          variants={fadeUp}
          custom={0}
          className="md:col-span-2 md:row-span-2"
        >
          <SpotlightTile className="h-full">
            <div className="flex flex-col h-full p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <Badge
                  variant="primary"
                  className="w-fit gap-1.5 dark:bg-primary-900/30 dark:text-primary-300 dark:border dark:border-primary-700/50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured
                </Badge>
                <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Live · {featured.year}
                </span>
              </div>

              {/* Mock app preview */}
              <div className="relative w-full h-40 md:h-48 mb-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/50 bg-gradient-to-br from-primary-400/90 to-primary-600 dark:from-primary-600 dark:to-primary-900">
                <div className="absolute inset-0 p-4 flex flex-col gap-2 opacity-90 transition-transform duration-500 group-hover/tile:scale-105">
                  <div className="rounded-lg bg-white/15 backdrop-blur-sm px-3 py-2 text-[11px] font-mono text-white/90">
                    &quot;where is JWT auth implemented?&quot;
                  </div>
                  {[
                    { file: "auth/middleware.py", score: 96 },
                    { file: "services/jwt_service.py", score: 88 },
                    { file: "api/routes/login.py", score: 74 },
                  ].map((r) => (
                    <div
                      key={r.file}
                      className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5"
                    >
                      <span className="flex-1 truncate text-[11px] font-mono text-white/90">
                        {r.file}
                      </span>
                      <div className="h-1.5 w-12 rounded-full bg-white/20 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-white/70"
                          style={{ width: `${r.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelected(featured)}
                className="w-fit text-left"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 inline-flex items-center gap-2 group-hover/tile:text-primary-600 dark:group-hover/tile:text-primary-400 transition-colors">
                  {featured.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-1 group-hover/tile:opacity-100 group-hover/tile:translate-x-0 transition-all" />
                </h3>
              </button>

              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-xl">
                {featured.description}
              </p>

              {featured.highlights && (
                <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5 mb-6">
                  {featured.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center gap-3 mt-auto pt-2">
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                )}
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelected(featured)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ml-auto"
                >
                  Details
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SpotlightTile>
        </motion.div>

        {/* ── Tech stack: tall tile on the right ── */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="md:col-span-1 md:row-span-2"
        >
          <SpotlightTile className="h-full">
            <div className="flex flex-col h-full p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                Built with
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
                Stack powering {featured.title}
              </p>
              <div className="flex flex-wrap gap-2 content-start">
                {featured.techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    variants={fadeUp}
                    custom={2 + i * 0.4}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700/50 dark:border dark:border-gray-600/30 text-gray-700 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-800 dark:hover:bg-primary-900/40 dark:hover:text-primary-200 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="mt-auto pt-6 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="dark:bg-gray-700/50 dark:text-gray-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </SpotlightTile>
        </motion.div>

        {/* ── Secondary project tiles ── */}
        {secondaryProjects.map((p, i) => (
          <motion.div
            key={p.id}
            variants={fadeUp}
            custom={2 + i}
            className={secondaryProjects.length === 1 ? "md:col-span-2" : ""}
          >
            <SpotlightTile className="h-full">
              <div className="flex flex-col h-full p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="dark:bg-gray-700/50 dark:text-gray-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className="w-fit text-left"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 inline-flex items-center gap-2 group-hover/tile:text-primary-600 dark:group-hover/tile:text-primary-400 transition-colors">
                    {p.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover/tile:opacity-100 group-hover/tile:translate-x-0 transition-all" />
                  </h3>
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {p.description}
                </p>

                <div className="flex items-center gap-4 mt-auto pt-2">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ml-auto"
                  >
                    Details
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SpotlightTile>
          </motion.div>
        ))}

        {/* ── "Always building" CTA tile ── */}
        <motion.div variants={fadeUp} custom={2 + secondaryProjects.length}>
          <SpotlightTile className="h-full">
            <a
              href="https://github.com/OmPatel1493"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center text-center h-full p-6"
            >
              <Github className="w-7 h-7 text-gray-700 dark:text-gray-300 mb-3 transition-transform group-hover/tile:scale-110" />
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
                More on GitHub
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Follow along as I ship new work
              </p>
            </a>
          </SpotlightTile>
        </motion.div>
      </motion.div>

      {realProjects.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex justify-center relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ProjectDetailModalProps {
  /** The project to show. When null, the overlay is closed. */
  project: Project | null;
  onClose: () => void;
}

/**
 * In-place project detail overlay. Opens on top of whatever page rendered it
 * (home section or the /projects listing) so closing it — via the "Back to
 * Projects" button, the backdrop, or Escape — returns the user to exactly
 * where they were. Replaces the old /projects/[id] route.
 */
export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <motion.div
            className="relative w-full max-w-3xl my-8 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" className="mb-6" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>

            {project.featured && (
              <div className="mb-4">
                <Badge variant="primary">Featured Project</Badge>
              </div>
            )}

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">{project.category}</Badge>
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {project.longDescription}
            </p>

            {project.techStack.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <Github className="w-5 h-5 mr-2" />
                    View Code
                  </Button>
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

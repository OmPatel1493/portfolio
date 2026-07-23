"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Opens the in-place detail overlay for this project. */
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        hover
        className={`h-full flex flex-col ${project.featured ? "border-2 border-primary-500" : ""}`}
      >
        {project.featured && (
          <div className="mb-4">
            <Badge variant="primary">Featured</Badge>
          </div>
        )}

        <button type="button" onClick={() => onSelect(project)} className="text-left">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
        </button>

        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
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
              <span className="text-sm">Live Demo</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="flex items-center ml-auto text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <span className="text-sm">Details</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

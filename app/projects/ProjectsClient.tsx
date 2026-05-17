"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/sections/ProjectCard";
import ProjectCarousel from "@/components/sections/ProjectCarousel";
import Button from "@/components/ui/Button";

const categories = ["All", "ML", "Web", "Data", "Other"];

export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  if (viewMode === "carousel") {
    return (
      <div className="min-h-screen">
        <div className="fixed top-20 right-4 z-50">
          <Button onClick={() => setViewMode("grid")} variant="outline" size="sm">
            Grid View
          </Button>
        </div>
        <ProjectCarousel />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my work showcasing various technologies and skills
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <Button onClick={() => setViewMode("carousel")} variant="outline">
            🎬 Carousel View
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";
import ProjectCard from "@/components/sections/ProjectCard";
import ProjectDetailModal from "@/components/sections/ProjectDetailModal";
import Button from "@/components/ui/Button";

const categories = ["All", "ML", "Web", "Data", "Other"];

// Only real projects (placeholders have no detail page / empty longDescription)
const realProjects = projects.filter((p) => p.longDescription);

export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? realProjects
    : realProjects.filter((p) => p.category === selectedCategory);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelected}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>

      <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

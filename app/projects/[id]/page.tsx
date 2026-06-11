import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export async function generateStaticParams() {
  return projects
    .filter((project) => project.longDescription)
    .map((project) => ({
      id: project.id,
    }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Om Patel`,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <Card>
          {project.featured && (
            <div className="mb-4">
              <Badge variant="primary">Featured Project</Badge>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{project.category}</Badge>
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {project.longDescription}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="primary">{tech}</Badge>
              ))}
            </div>
          </div>

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
        </Card>
      </div>
    </div>
  );
}

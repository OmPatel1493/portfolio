import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects - Om Patel",
  description: "Portfolio of projects showcasing web development, machine learning, and data science",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}

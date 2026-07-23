export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  category: "ML" | "Web" | "Data" | "Other";
  /** Short feature bullets surfaced on the featured bento tile. */
  highlights?: string[];
  year?: string;
}

export const projects: Project[] = [
  {
    id: "codelens",
    title: "CodeLens",
    description:
      "AI-powered codebase search and bug localization — ask questions about a repo in plain English and get ranked, explained results.",
    longDescription:
      "CodeLens parses a repository into files, classes, and functions using tree-sitter, embeds those code chunks into a vector space, and serves semantic search and bug localization over a REST API and a modern React interface. Ask a natural-language question like \"where is JWT auth implemented?\" and get syntax-highlighted snippets ranked by meaning rather than keywords, or paste a stack trace to get the most likely source files, ranked and explained. It's a deliberate multi-cloud build: compute, Postgres, and web hosting run on Azure, while an embedded ChromaDB vector index is snapshotted to AWS S3 for durable storage — so no separate vector-DB server is required. Authentication is JWT-based with per-user, multi-repo support.",
    tags: ["AI/ML", "Full Stack", "Developer Tools"],
    techStack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "sentence-transformers",
      "ChromaDB",
      "tree-sitter",
      "PostgreSQL",
      "AWS S3",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/OmPatel1493/CODELENS",
    featured: true,
    category: "ML",
    year: "2026",
    highlights: [
      "Semantic code search ranked by meaning, not keywords",
      "Bug localization from pasted stack traces",
      "Tree-sitter structural indexing (files, classes, functions)",
      "Multi-cloud: Azure compute/DB + AWS S3 storage",
    ],
  },
  {
    id: "jobtracker-ai",
    title: "JobTracker AI",
    description:
      "AI-powered job application tracker with resume matching, skill-gap analysis, and intelligent suggestions.",
    longDescription:
      "JobTracker AI is a full-stack application that turns a messy job search into a data-driven pipeline. It parses your resume with Google Gemini, scores each application against the job description using a blend of semantic similarity (60%) and skill overlap (40%) for a 0–100 fit score, and surfaces the exact skills you're missing. Applications move through a seven-stage Kanban board with table and analytics views, and the AI generates targeted resume-improvement suggestions per role. The backend is an async FastAPI service backed by MySQL for relational data and Pinecone for vector embeddings.",
    tags: ["AI/ML", "Full Stack", "Next.js"],
    techStack: [
      "Next.js 15",
      "React 18",
      "TypeScript",
      "FastAPI",
      "Python",
      "MySQL",
      "Pinecone",
      "Google Gemini",
      "SQLAlchemy",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/OmPatel1493/job-tracker",
    featured: false,
    category: "ML",
    year: "2025",
    highlights: [
      "Resume parsing with Gemini 2.0 Flash",
      "Semantic fit scoring (0–100)",
      "Kanban board + analytics dashboard",
      "AI resume-improvement suggestions",
    ],
  },
];

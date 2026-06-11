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
  /** Lifecycle status — drives badges and whether a detail page is generated. */
  status?: "live" | "in-progress" | "coming-soon";
  /** Short feature bullets surfaced on the featured bento tile. */
  highlights?: string[];
  year?: string;
}

export const projects: Project[] = [
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
    featured: true,
    category: "ML",
    status: "live",
    year: "2025",
    highlights: [
      "Resume parsing with Gemini 2.0 Flash",
      "Semantic fit scoring (0–100)",
      "Kanban board + analytics dashboard",
      "AI resume-improvement suggestions",
    ],
  },
  {
    id: "coming-soon-1",
    title: "In the Lab",
    description:
      "A new project is actively in progress — building, breaking, and iterating right now.",
    longDescription: "",
    tags: ["In Progress"],
    techStack: [],
    featured: false,
    category: "Other",
    status: "in-progress",
  },
  {
    id: "coming-soon-2",
    title: "Coming Soon",
    description:
      "Always shipping something new. Check back — this slot won't stay empty for long.",
    longDescription: "",
    tags: ["Planned"],
    techStack: [],
    featured: false,
    category: "Other",
    status: "coming-soon",
  },
];

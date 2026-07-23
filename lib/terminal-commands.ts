import { projects } from "@/data/projects";
import { experiences, education } from "@/data/experience";
import { skillCategories } from "@/data/skills";

export interface CommandOutput {
  type: "output" | "error" | "success";
  content: string;
}

export const commands: Record<string, () => CommandOutput> = {
  help: () => ({
    type: "output",
    content: `Available commands:

  help          - lists all commands
  about         - prints bio
  skills        - lists skills by category
  projects      - lists all projects
  project <id>  - detailed view of a specific project
  experience    - prints work history
  education     - prints education
  contact       - shows contact info
  github        - opens GitHub profile
  linkedin      - opens LinkedIn
  resume        - downloads resume PDF
  chat          - opens AI chatbot
  clear         - clears terminal
  exit          - returns to normal site view
  whoami        - ???`,
  }),

  about: () => ({
    type: "output",
    content: `Om Patel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I'm a Full Stack Developer, Data Scientist, and ML Engineer with a 
passion for building innovative solutions with cutting-edge technologies.

Status: Open to opportunities`,
  }),

  skills: () => ({
    type: "output",
    content: `Skills by Category
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${Object.entries(skillCategories).map(([category, skillList]) => `${category}:\n  ${skillList.join(", ")}`).join("\n\n")}`,
  }),

  projects: () => ({
    type: "output",
    content: `Projects
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${projects.map((p, i) => `${i + 1}. ${p.title} [${p.id}]
   ${p.description}
   Tech: ${p.techStack.slice(0, 4).join(", ")}${p.techStack.length > 4 ? "..." : ""}`).join("\n\n")}

Use 'project <id>' for details (e.g., 'project 1' or 'project ${projects[0]?.id}')`,
  }),

  experience: () => ({
    type: "output",
    content: `Work Experience
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${experiences.map(exp => `${exp.position}
${exp.company} | ${exp.location}
${exp.duration}

${exp.description.map(d => `• ${d}`).join("\n")}

Skills: ${exp.techStack.join(", ")}`).join("\n\n")}`,
  }),

  education: () => ({
    type: "output",
    content: `Education
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${education.map(edu => `${edu.degree} in ${edu.field}
${edu.institution}
${edu.duration}${edu.gpa ? `\nGPA: ${edu.gpa}` : ""}${edu.coursework ? `\nCoursework: ${edu.coursework.join(", ")}` : ""}`).join("\n\n")}`,
  }),

  contact: () => ({
    type: "success",
    content: `Contact Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email:    omp14903@gmail.com
Phone:    438.336.4438
LinkedIn: www.linkedin.com/in/ompatel777

Feel free to reach out!`,
  }),

  whoami: () => ({
    type: "output",
    content: `> A developer and data scientist obsessed with building things.
> Currently: Open to opportunities
> Fun fact: I wrote this terminal.`,
  }),

  clear: () => ({
    type: "output",
    content: "",
  }),

  github: () => ({
    type: "success",
    content: "Opening GitHub profile...",
  }),

  linkedin: () => ({
    type: "success",
    content: "Opening LinkedIn profile...",
  }),

  resume: () => ({
    type: "success",
    content: "Opening resume...",
  }),

  chat: () => ({
    type: "success",
    content: "Opening AI chat...",
  }),

  exit: () => ({
    type: "success",
    content: "Exiting terminal mode...",
  }),
};

export const getProjectCommand = (id: string): CommandOutput => {
  const index = Number(id);
  const project = Number.isInteger(index) && index >= 1
    ? projects[index - 1]
    : projects.find(p => p.id === id);

  if (!project) {
    return {
      type: "error",
      content: `Project '${id}' not found. Use 'projects' to see available projects.`,
    };
  }

  return {
    type: "output",
    content: `${project.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${project.longDescription}

Technology Stack:
${project.techStack.map(t => `  • ${t}`).join("\n")}

Tags: ${project.tags.join(", ")}${project.githubUrl ? `\nGitHub: ${project.githubUrl}` : ""}${project.liveUrl ? `\nLive: ${project.liveUrl}` : ""}`,
  };
};

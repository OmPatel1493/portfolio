export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Bharti Soft Tech Private Limited",
    position: "Data Science Intern",
    duration: "December 2024 – March 2025",
    location: "India",
    description: [
      "Collaborated with a senior team member to extract, process, and manage data from external APIs and web sources for business reporting and analytical requirements.",
      "Performed data cleaning, transformation, and refinement to ensure accuracy, consistency, and usability of datasets before visualization and analysis.",
      "Designed and developed interactive HR dashboards with live data updates, enabling efficient tracking of employee and operational status metrics.",
      "Built Power BI dashboards for sales analysis and reporting by abstracting complex datasets into meaningful visual insights to support data-driven decision-making.",
      "Supported team operations by documenting processes and ensuring accurate data handling using computer-based tools and analytical techniques."
    ],
    techStack: ["Python", "SQL", "REST APIs","ETL Pipeline","Power BI", "Excel"]
  }
];

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  /** Relevant coursework, surfaced as chips on the education card. */
  coursework?: string[];
  /** Marks the degree currently in progress (drives the accent + live dot). */
  current?: boolean;
}

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "Concordia University, Montreal, QC",
    degree: "Master of Science",
    field: "Computer Science",
    duration: "Jan 2026 – Dec 2027 (Expected)",
    current: true,
    coursework: [
      "Algorithm Design Techniques",
      "Distributed System Design",
      "Programming and Problem Solving",
    ],
  },
  {
    id: "edu-2",
    institution: "Parul University, Vadodara, India",
    degree: "Bachelor of Technology",
    field: "Computer Science",
    duration: "2021 – 2025",
    gpa: "8.31/10",
    coursework: [
      "Python",
      "C++",
      "Data Structures",
      "Databases",
      "Algorithm Design",
      "Machine Learning",
    ],
  },
];

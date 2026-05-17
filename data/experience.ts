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
    company: "Tech Company",
    position: "Software Engineering Intern",
    duration: "Jun 2023 - Aug 2023",
    location: "Remote",
    description: [
      "Developed and deployed full-stack web applications using React and Node.js",
      "Implemented RESTful APIs and integrated third-party services",
      "Collaborated with cross-functional teams in Agile environment",
      "Improved application performance by 40% through optimization"
    ],
    techStack: ["React", "Node.js", "MongoDB", "AWS"]
  },
  {
    id: "exp-2",
    company: "Data Analytics Firm",
    position: "Data Science Intern",
    duration: "Jan 2023 - May 2023",
    location: "Hybrid",
    description: [
      "Built machine learning models for predictive analytics",
      "Performed data cleaning, preprocessing, and feature engineering",
      "Created interactive dashboards for data visualization",
      "Achieved 92% accuracy on classification tasks"
    ],
    techStack: ["Python", "Pandas", "Scikit-learn", "Tableau"]
  }
];

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  achievements?: string[];
}

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "University Name",
    degree: "Bachelor of Technology",
    field: "Computer Science",
    duration: "2021 - 2025",
    gpa: "8.31/10",
    achievements: [
      "Dean's List for Academic Excellence",
      "Published research paper on Machine Learning",
      "Led university coding club"
    ]
  }
];

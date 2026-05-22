export interface Skill {
  name: string;
  level: number;
  category: string;
}

export const skillCategories = {
  Languages: ["Python","SQL", "Java", "C++", "TypeScript"],
  Frameworks: ["React", "Next.js", "Node.js", "Express", "TailwindCSS", "Django"],
  "ML/AI": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL"],
  Tools: ["Git", "Docker", "AWS", "Vercel", "Postman"]
};

export const skills: Skill[] = [
  { name: "Python", level: 95, category: "Languages" },
  { name: "JavaScript", level: 90, category: "Languages" },
  { name: "TypeScript", level: 85, category: "Languages" },
  { name: "React", level: 90, category: "Frameworks" },
  { name: "Next.js", level: 85, category: "Frameworks" },
  { name: "Node.js", level: 88, category: "Frameworks" },
  { name: "TensorFlow", level: 80, category: "ML/AI" },
  { name: "PyTorch", level: 82, category: "ML/AI" },
  { name: "Scikit-learn", level: 90, category: "ML/AI" },
  { name: "MongoDB", level: 85, category: "Databases" },
  { name: "PostgreSQL", level: 80, category: "Databases" },
  { name: "Git", level: 92, category: "Tools" },
  { name: "Docker", level: 75, category: "Tools" },
  { name: "AWS", level: 70, category: "Tools" }
];

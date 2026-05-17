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
}

export const projects: Project[] = [
  {
    id: "ml-project-1",
    title: "Machine Learning Classification Model",
    description: "Built a classification model with 95% accuracy using ensemble methods",
    longDescription: "Developed a comprehensive machine learning pipeline for classification tasks using Random Forest and XGBoost algorithms. Implemented feature engineering, hyperparameter tuning, and cross-validation to achieve 95% accuracy on test data.",
    tags: ["Machine Learning", "Python", "Scikit-learn"],
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com",
    featured: true,
    category: "ML"
  },
  {
    id: "web-app-1",
    title: "Full Stack Web Application",
    description: "Responsive web application with modern UI/UX",
    longDescription: "Created a full-stack web application using React and Node.js with RESTful API integration. Implemented user authentication, real-time updates, and responsive design for optimal user experience across devices.",
    tags: ["React", "Node.js", "MongoDB"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    category: "Web"
  },
  {
    id: "data-analysis-1",
    title: "Data Analysis Dashboard",
    description: "Interactive dashboard for data visualization and insights",
    longDescription: "Built an interactive data analysis dashboard using Python and Streamlit. Integrated multiple data sources, performed ETL operations, and created dynamic visualizations for business intelligence.",
    tags: ["Data Analysis", "Python", "Visualization"],
    techStack: ["Python", "Pandas", "Plotly", "Streamlit", "SQL"],
    githubUrl: "https://github.com",
    featured: false,
    category: "Data"
  },
  {
    id: "nlp-project-1",
    title: "Natural Language Processing Tool",
    description: "NLP-based text analysis and sentiment classification",
    longDescription: "Developed an NLP tool for sentiment analysis and text classification using transformer models. Achieved state-of-the-art results on benchmark datasets with fine-tuned BERT models.",
    tags: ["NLP", "Deep Learning", "Transformers"],
    techStack: ["Python", "PyTorch", "Transformers", "NLTK", "spaCy"],
    githubUrl: "https://github.com",
    featured: true,
    category: "ML"
  },
  {
    id: "api-project-1",
    title: "RESTful API Service",
    description: "Scalable API service with authentication and rate limiting",
    longDescription: "Designed and implemented a RESTful API service with JWT authentication, rate limiting, and comprehensive documentation. Deployed on cloud infrastructure with CI/CD pipeline.",
    tags: ["Backend", "API", "Cloud"],
    techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    githubUrl: "https://github.com",
    featured: false,
    category: "Web"
  }
];

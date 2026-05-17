import { Metadata } from "next";
import { motion } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import { education } from "@/data/experience";
import { getGitHubStats } from "@/lib/github";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SkillBar from "@/components/sections/SkillBar";
import AnimatedCounter from "@/components/sections/AnimatedCounter";

export const metadata: Metadata = {
  title: "About - Om Patel",
  description: "Learn more about Om Patel's skills, education, and expertise",
};

export default async function AboutPage() {
  const githubUsername = process.env.GITHUB_USERNAME || "";
  const githubStats = githubUsername ? await getGitHubStats(githubUsername) : null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate developer with expertise in full-stack development and data science
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Bio</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I'm a Computer Science student with a strong passion for building innovative solutions 
              that solve real-world problems. With experience in both software engineering and data science, 
              I bring a unique perspective to every project.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              My expertise spans across full-stack web development, machine learning, and data analysis. 
              I'm constantly learning new technologies and best practices to stay at the forefront of the industry.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  <AnimatedCounter end={2} suffix="+" />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Internships</div>
              </div>
              <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  <AnimatedCounter end={5} suffix="+" />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  <AnimatedCounter end={8} />.<AnimatedCounter end={31} />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">GPA</div>
              </div>
              {githubStats && (
                <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    <AnimatedCounter end={githubStats.publicRepos} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <Card key={category}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge key={skill} variant="primary">{skill}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Proficiency</h2>
          <Card className="max-w-3xl mx-auto">
            {skills.slice(0, 8).map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} />
            ))}
          </Card>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Education</h2>
          {education.map((edu) => (
            <Card key={edu.id} className="max-w-3xl mx-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{edu.field}</p>
                  <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                </div>
                {edu.gpa && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{edu.gpa}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">GPA</div>
                  </div>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{edu.duration}</p>
              {edu.achievements && (
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Briefcase } from "lucide-react";
import { Experience } from "@/data/experience";
import Badge from "@/components/ui/Badge";
import SpotlightTile from "@/components/ui/SpotlightTile";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <SpotlightTile>
      <div className="p-8 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Badge
            variant="primary"
            className="w-fit gap-1.5 dark:bg-primary-900/30 dark:text-primary-300 dark:border dark:border-primary-700/50"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Experience
          </Badge>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {experience.duration}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {experience.position}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {experience.company} · {experience.location}
        </p>

        <ul className="space-y-3 mb-8">
          {experience.description.map((desc, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
              {desc}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.techStack.map((tech) => (
            <Badge key={tech} className="dark:bg-gray-700/50 dark:text-gray-300">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </SpotlightTile>
  );
}

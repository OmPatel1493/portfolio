import { Metadata } from "next";
import { experiences } from "@/data/experience";
import Timeline from "@/components/sections/Timeline";

export const metadata: Metadata = {
  title: "Experience - Om Patel",
  description: "Professional experience and work history of Om Patel",
};

export default function ExperiencePage() {
  const timelineItems = experiences.map((exp) => ({
    id: exp.id,
    title: exp.position,
    subtitle: exp.company,
    duration: exp.duration,
    location: exp.location,
    description: exp.description,
    techStack: exp.techStack,
    type: "work" as const
  }));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and contributions to various organizations
          </p>
        </div>

        <Timeline items={timelineItems} />
      </div>
    </div>
  );
}

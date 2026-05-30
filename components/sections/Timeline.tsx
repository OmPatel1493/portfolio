"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  location?: string;
  description: string[];
  techStack?: string[];
  type: "work" | "education";
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block" />

      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-0 md:pl-20 pb-8 md:pb-12 last:pb-0"
        >
          <div className="absolute left-5 top-0 w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-500 border-4 border-white dark:border-[#0F172A] z-10 hidden md:block" />
          
          <Card hover className="dark:bg-gray-800/60 dark:backdrop-blur-xl dark:border-gray-700/50">
            <div className="timeline-card flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {item.type === "work" ? (
                  <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>{item.duration}</span>
              {item.location && <span>• {item.location}</span>}
            </div>

            <ul className="space-y-2 mb-4">
              {item.description.map((desc, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            {item.techStack && (
              <div className="flex flex-wrap gap-2">
                {item.techStack.map((tech) => (
                  <Badge key={tech} variant="primary" className="dark:bg-primary-900/30 dark:text-primary-300 dark:border dark:border-primary-700/50">{tech}</Badge>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

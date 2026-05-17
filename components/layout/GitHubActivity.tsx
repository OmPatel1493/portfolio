"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function GitHubActivity() {
  const [activity, setActivity] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const username = "OmPatel1493";
        const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=5`);
        const data = await res.json();
        
        if (data && data.length > 0) {
          for (const event of data) {
            let message = "";
            
            if (event.type === "PushEvent" && event.payload?.commits?.[0]?.message) {
              message = event.payload.commits[0].message;
              if (message.length > 50) message = message.substring(0, 50) + "...";
              setActivity(message);
              break;
            } else if (event.type === "CreateEvent") {
              message = `Created ${event.payload.ref_type}: ${event.payload.ref || ""}`;
              setActivity(message);
              break;
            } else if (event.type === "IssuesEvent") {
              message = `${event.payload.action} an issue`;
              setActivity(message);
              break;
            }
          }
          
          if (!activity) {
            setActivity("Building something cool");
          }
        } else {
          setActivity("Building something cool");
        }
      } catch (error) {
        setActivity("Building something cool");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading || !activity) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-24 left-4 max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-40 hidden md:block"
    >
      <div className="flex items-start space-x-2">
        <Code2 className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs">
          <div className="text-gray-500 dark:text-gray-400">Currently working on:</div>
          <div className="text-gray-900 dark:text-white font-medium mt-1">{activity}</div>
        </div>
      </div>
    </motion.div>
  );
}

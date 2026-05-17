import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300",
      secondary: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    };
    
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".contact-info", {
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="contact-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="contact-form h-full">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Message</h3>
            
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-800 dark:text-green-300">Message sent!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your name"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="your.email@example.com"
              />
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your message..."
              />
              <Button type="submit" disabled={status === "loading"} className="w-full">
                <Send className="w-5 h-5 mr-2" />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          <div className="contact-info space-y-6 h-full">
            <Card className="h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connect</h3>
              <div className="space-y-4">
                <a href="mailto:contact@example.com" className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Email</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">contact@example.com</div>
                  </div>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Linkedin className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Connect with me</div>
                  </div>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Github className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">GitHub</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Check out my code</div>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

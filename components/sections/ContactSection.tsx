"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
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
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const isMessageTooShort = formData.message.trim().length > 0 && formData.message.trim().length < 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Contact API error:", response.status, data);
        setErrorMessage(data?.error || `Request failed (${response.status})`);
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact network error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Network error");
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700/60 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors";

  return (
    <div ref={sectionRef} className="min-h-screen py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="contact-title mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400 dark:from-white dark:to-gray-500">
            Get In Touch With Me
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="contact-form space-y-6">
          {status === "success" && (
            <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-300">Message sent!</span>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-red-300 font-medium">Failed to send message.</div>
                {errorMessage && (
                  <div className="text-red-400/80 text-sm mt-1">{errorMessage}</div>
                )}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses}
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-bold text-white mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={inputClasses}
              placeholder="Enter the subject"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              minLength={10}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClasses} resize-none`}
              placeholder="Enter your message (at least 10 characters)"
            />
            <div className="mt-2 flex justify-between text-xs">
              <span className={isMessageTooShort ? "text-red-400" : "text-gray-500"}>
                {isMessageTooShort
                  ? `Message must be at least 10 characters (${formData.message.length}/10)`
                  : " "}
              </span>
              <span className="text-gray-500">{formData.message.length} characters</span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={status === "loading" || isMessageTooShort}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-900/60 border border-gray-700/60 text-white hover:bg-gray-800/80 hover:border-gray-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Mail className="w-5 h-5" />
              {status === "loading" ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

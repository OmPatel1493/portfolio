"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { commands, getProjectCommand } from "@/lib/terminal-commands";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  content: string;
}

export function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const hasBooted = useRef(false);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const bootSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLines([
        { type: "output", content: "Initializing Om.portfolio v1.0..." },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLines((prev) => [
        ...prev,
        { type: "output", content: "Loading profile data.............. OK" },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLines((prev) => [
        ...prev,
        { type: "output", content: "Loading projects.................. OK" },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLines((prev) => [
        ...prev,
        { type: "output", content: "Loading experience................ OK" },
        { type: "output", content: "" },
        { type: "success", content: "Welcome to Om Patel's Portfolio Terminal." },
        { type: "output", content: "Type 'help' to see available commands." },
        { type: "output", content: "" },
      ]);
      setIsBooting(false);
    };

    bootSequence();
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setLines((prev) => [...prev, { type: "input", content: `om@portfolio:~$ ${trimmed}` }]);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const [command, ...args] = trimmed.split(" ");

    if (command === "clear") {
      setLines([]);
      return;
    }

    if (command === "exit") {
      onClose();
      return;
    }

    if (command === "github") {
      window.open("https://github.com/ompatel777", "_blank");
      setLines((prev) => [...prev, { type: "success", content: "Opening GitHub profile..." }]);
      return;
    }

    if (command === "linkedin") {
      window.open("https://www.linkedin.com/in/ompatel777", "_blank");
      setLines((prev) => [...prev, { type: "success", content: "Opening LinkedIn profile..." }]);
      return;
    }

    if (command === "resume") {
      window.open("/Om_Patel.pdf", "_blank");
      setLines((prev) => [...prev, { type: "success", content: "Opening resume..." }]);
      return;
    }

    if (command === "chat") {
      setLines((prev) => [...prev, { type: "success", content: "Opening AI chat... (close terminal first)" }]);
      return;
    }

    if (command === "project" && args.length > 0) {
      const result = getProjectCommand(args[0]);
      setLines((prev) => [...prev, { type: result.type, content: result.content }]);
      return;
    }

    if (commands[command]) {
      const result = commands[command]();
      setLines((prev) => [...prev, { type: result.type, content: result.content }]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${command}. Type 'help' for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black shadow-2xl flex flex-col font-mono text-sm max-h-screen">
      <div className="flex items-center justify-between px-6 py-3 border-b border-green-500/30 bg-black">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-green-400 font-bold">om@portfolio:~</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <X size={20} />
        </button>
      </div>

      <div ref={terminalRef} className="flex-1 overflow-y-auto p-6 bg-black text-gray-300 no-scrollbar">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`mb-2 ${
              line.type === "input"
                ? "text-green-400"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "success"
                ? "text-amber-400"
                : "text-gray-300"
            }`}
          >
            <pre className="whitespace-pre-wrap font-mono" style={{ fontFamily: "inherit" }}>{line.content}</pre>
          </div>
        ))}

        {!isBooting && (
          <div className="flex items-center gap-2 text-green-400">
            <span>om@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-green-400 font-mono"
              autoFocus
              style={{ fontFamily: "inherit" }}
            />
            <span className="w-2 h-4 bg-green-400 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Glitch alphabet — digits only, for a numeric "decode" look
const CHARS = "0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** milliseconds per animation frame (lower = faster) */
  speed?: number;
  /** how many frames to fully reveal one more character (lower = quicker resolve) */
  revealRate?: number;
}

/**
 * Renders `text` and runs a scramble/decode effect when the nearest
 * interactive ancestor (the parent <a>/<button>) is hovered. Letters shuffle
 * through random glyphs, then resolve left-to-right into the real word.
 */
export default function ScrambleText({
  text,
  className,
  speed = 35,
  revealRate = 1.6,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [active, setActive] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Latches once a decode has played; only a real mouseleave clears it, so a
  // single hover decodes exactly once even if mouseenter re-fires (it does when
  // the overlay mounts/unmounts under a resting cursor).
  const doneRef = useRef(false);

  // Keep display in sync if the text prop changes
  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setActive(false);
    };

    const run = () => {
      // Run at most once per hover: skip if mid-decode or already decoded.
      // The latch only clears on mouseleave, so resting the cursor can't loop.
      if (intervalRef.current || doneRef.current) return;
      frameRef.current = 0;
      setActive(true);
      intervalRef.current = setInterval(() => {
        const revealed = frameRef.current / revealRate;
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " ") {
            out += " ";
          } else if (i < revealed) {
            out += ch;
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(out);
        frameRef.current += 1;
        if (revealed >= text.length) {
          setDisplay(text);
          doneRef.current = true; // stay resolved until the cursor leaves
          stop();
        }
      }, speed);
    };

    // A real exit re-arms the effect for the next hover.
    const reset = () => {
      doneRef.current = false;
    };

    parent.addEventListener("mouseenter", run);
    parent.addEventListener("mouseleave", reset);
    return () => {
      parent.removeEventListener("mouseenter", run);
      parent.removeEventListener("mouseleave", reset);
      stop();
    };
  }, [text, speed, revealRate]);

  // The real text always sits in normal flow and defines the box size.
  // While animating, an absolutely-positioned overlay shows the scrambled
  // text — being out of flow, it can never change width/padding or shift
  // neighbors, even if a digit is wider than the letter it replaces.
  return (
    <span
      ref={wrapRef}
      className={cn("relative inline-block whitespace-nowrap", className)}
      aria-label={text}
    >
      <span className={active ? "invisible" : undefined} aria-hidden="true">
        {text}
      </span>
      {active && (
        <span
          className="absolute left-0 top-0 whitespace-nowrap"
          aria-hidden="true"
        >
          {display}
        </span>
      )}
    </span>
  );
}

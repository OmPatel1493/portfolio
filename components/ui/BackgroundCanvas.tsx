"use client";

export default function BackgroundCanvas() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-[#0F172A] dark:to-gray-900"
    >
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100,116,139,0.55) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 90%)",
        }}
      />
      <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-violet-400/10 dark:bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-[15%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-300/10 dark:bg-cyan-500/8 blur-3xl" />
    </div>
  );
}

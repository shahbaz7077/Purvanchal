"use client";

import { useEffect, useState } from "react";

const PATH_LENGTH = 307.876; // 2 * pi * 49

export default function ScrollNut() {
  const [isVisible, setIsVisible] = useState(false);
  const [dashOffset, setDashOffset] = useState(PATH_LENGTH);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Visibility toggle
      setIsVisible(scrollTop > 100);

      if (docHeight <= 0) return;

      // Clamp to 0–1 so it never overshoots
      const ratio = Math.min(Math.max(scrollTop / docHeight, 0), 1);

      // Ring progress
      setDashOffset(PATH_LENGTH - ratio * PATH_LENGTH);

      // Nut rotation — 1.5 turns over full page
      setRotation(ratio * 540);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed z-50 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:scale-105 active:scale-95
        bottom-4 right-4 h-12 w-12 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16
        ${
          isVisible
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-75 opacity-0"
        }`}
    >
      {/* Circular Progress Ring */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90 transform p-[2px]"
        viewBox="-1 -1 102 102"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          className="fill-none stroke-slate-800/80"
          strokeWidth="4"
        />
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          className="fill-none stroke-slate-400 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)] transition-[stroke-dashoffset] duration-75 ease-linear"
          strokeWidth="5"
          strokeDasharray={`${PATH_LENGTH} ${PATH_LENGTH}`}
          strokeDashoffset={dashOffset}
        />
      </svg>

      {/* Metallic Nut — spins with scroll */}
      <div
        className="absolute flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 will-change-transform"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="metallic-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="20%" stopColor="#cbd5e1" />
              <stop offset="40%" stopColor="#94a3b8" />
              <stop offset="60%" stopColor="#f1f5f9" />
              <stop offset="80%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="metallic-core" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          <polygon
            points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5"
            fill="url(#metallic-bevel)"
            stroke="#475569"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <circle cx="50" cy="50" r="28" fill="none" stroke="#64748b" strokeWidth="2" opacity="0.6" />
          <circle cx="50" cy="50" r="22" fill="url(#metallic-core)" stroke="#334155" strokeWidth="2" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" strokeDasharray="8 3" />
          <circle cx="50" cy="50" r="11" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <circle cx="50" cy="50" r="7" fill="#0f172a" />
        </svg>
      </div>
    </button>
  );
}
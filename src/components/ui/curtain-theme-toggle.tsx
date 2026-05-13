"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import { useTheme } from "@/components/theme-provider";

type Theme = "light" | "dark";
type CurtainPhase = "idle" | "falling" | "rising";

const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function CurtainThemeToggle({
  buttonSize = 36,
  duration = 550,
}: {
  buttonSize?: number;
  duration?: number;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const curtainColorRef = useRef<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggle = useCallback(() => {
    if (phase !== "idle") return;
    const isDarkNow = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next: Theme = isDarkNow ? "light" : "dark";
    curtainColorRef.current = next === "dark" ? "#0A0A0A" : "#ffffff";
    setPhase("falling");

    setTimeout(() => {
      setTheme(next);
      setPhase("rising");
      setTimeout(() => setPhase("idle"), duration + 60);
    }, duration);
  }, [phase, theme, duration, setTheme]);

  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const btnScale = pressed ? 0.96 : hovered ? 1.1 : 1;
  const btnStyle: CSSProperties = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    color: isDark ? "#ffffff" : "#000000",
    boxShadow: isDark ? "0 0 0 1.5px rgba(255,255,255,0.15)" : "0 0 0 1.5px rgba(0,0,0,0.1)",
    zIndex: 9999,
    outline: "none",
    transition: "background 0.3s ease, color 0.3s ease, transform 0.15s ease, box-shadow 0.3s ease",
    transform: `scale(${btnScale})`,
    flexShrink: 0,
    backdropFilter: "blur(8px)",
  };

  const curtainStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: curtainColorRef.current,
    transformOrigin: "top",
    transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
    transition: phase !== "idle" ? `transform ${duration}ms ${EASING}` : "none",
    zIndex: 9997,
    pointerEvents: "none",
  };

  if (!mounted) return null;

  return (
    <>
      <div aria-hidden="true" style={curtainStyle} />
      <button
        style={btnStyle}
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Terminal, BookOpen, Menu, X } from "lucide-react";
import { CurtainThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Shuffle from "@/components/ui/shuffle";

interface HeaderProps {
  userName?: string;
}

const navLinks = [
  { label: "Learn", href: "#learn" },
  { label: "Languages", href: "#footer" },
  { label: "Portal", href: "/portal-secret" },
];

export function Header({ userName }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 border border-blue-500/30 transition-all group-hover:bg-blue-500/30">
            <Terminal className="h-4 w-4 text-blue-500" />
          </div>
          <span className="font-bold text-sm sm:text-base">
            <Shuffle
              text="Codalyte"
              shuffleTimes={2}
              duration={0.4}
              triggerOnHover={true}
              className="text-xl font-bold tracking-tight text-blue-500 font-mono"
            />
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {userName && (
            <span className="hidden sm:block text-sm text-foreground/50">
              Hi, <span className="text-[#00E5FF] font-medium">{userName}</span>
            </span>
          )}
          <CurtainThemeToggle buttonSize={36} />
          {/* Mobile menu button */}
          <button
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-white/5 hover:text-foreground transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

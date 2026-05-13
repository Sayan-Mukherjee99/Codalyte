"use client";

import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";
import { languages } from "@/lib/lessons";
import {
  Code2,
  Coffee,
  Database,
  Cpu,
  Flame,
  Leaf,
  ExternalLink,
  Share2,
} from "lucide-react";

const languageIconMap: Record<string, any> = {
  python: Code2,
  java: Coffee,
  sql: Database,
  c: Cpu,
  cpp: Flame,
  mongodb: Leaf,
};

const orbitalNodes = languages.map((lang, i) => ({
  id: i,
  label: lang.name,
  icon: languageIconMap[lang.id] || Code2,
  color: lang.color,
  description: lang.description,
  href: `/learn/${lang.id}/introduction`,
}));

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-white/10 bg-background">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Section header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold">
            <span className="bg-gradient-to-r from-[#00E5FF] to-indigo-400 bg-clip-text text-transparent">
              Explore Languages
            </span>
          </h2>
          <p className="mt-2 text-foreground/50 text-sm">
            Click any node to begin your journey
          </p>
        </div>

        {/* Orbital Timeline */}
        <RadialOrbitalTimeline nodes={orbitalNodes} centerLabel="Codalyte" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-sm text-foreground/40">
            © {new Date().getFullYear()} Codalyte. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-foreground/40 hover:text-[#00E5FF] transition-colors"
              aria-label="GitHub"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-foreground/40 hover:text-[#00E5FF] transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

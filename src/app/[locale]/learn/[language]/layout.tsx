"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { languages, getLanguage } from "@/lib/lessons";
import { useProgress } from "@/hooks/useProgress";
import {
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

function Sidebar({
  languageId,
  currentLessonId,
  open,
  onClose,
}: {
  languageId: string;
  currentLessonId: string;
  open: boolean;
  onClose: () => void;
}) {
  const lang = getLanguage(languageId);
  const { isCompleted } = useProgress(languageId);

  if (!lang) return null;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-72 bg-card border-r border-white/10 transition-transform duration-300 ease-in-out pt-16",
          "md:relative md:translate-x-0 md:z-auto md:pt-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4">
          {/* Language header */}
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-background p-3">
            <span className="text-2xl">{lang.icon}</span>
            <div>
              <div className="font-bold text-foreground">{lang.name}</div>
              <div className="text-xs text-foreground/50">{lang.lessons.length} lessons</div>
            </div>
            <button
              onClick={onClose}
              className="ml-auto md:hidden text-foreground/40 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Lesson list */}
          <nav className="flex flex-col gap-1">
            {lang.lessons.map((lesson, i) => {
              const completed = isCompleted(lesson.id);
              const active = lesson.id === currentLessonId;

              return (
                <Link
                  key={lesson.id}
                  href={`/learn/${languageId}/${lesson.id}`}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                    active
                      ? "bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]"
                      : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <span className="shrink-0">
                    {completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4 opacity-30" />
                    )}
                  </span>
                  <span className="flex-1 leading-snug">{lesson.title}</span>
                  <span className="text-xs opacity-30">{i + 1}</span>
                </Link>
              );
            })}
          </nav>

          {/* Back to home */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const params = useParams();
  const language = params?.language as string;
  const lessonId = params?.["lesson-id"] as string;

  useEffect(() => {
    const name = localStorage.getItem("codalyte_user_name");
    if (name) setUserName(name);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header userName={userName} />
      <div className="flex flex-1 pt-16">
        {/* Sidebar toggle for mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#00E5FF] text-black shadow-lg shadow-[#00E5FF]/30 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Sidebar
          languageId={language}
          currentLessonId={lessonId}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getLanguage, getLesson } from "@/lib/lessons";
import { useProgress } from "@/hooks/useProgress";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

// Shiki-powered code renderer
async function getHighlighter() {
  const { codeToHtml } = await import("shiki");
  return codeToHtml;
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const result = await codeToHtml(code, {
          lang: language,
          theme: "github-dark",
        });
        if (!cancelled) setHtml(result);
      } catch {
        if (!cancelled) setHtml(`<pre><code>${code}</code></pre>`);
      }
    })();
    return () => { cancelled = true; };
  }, [code, language]);

  if (!html) {
    return (
      <pre className="rounded-xl bg-[#0d1117] p-4 text-sm text-white/80 overflow-x-auto">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden border border-white/10 [&_pre]:!bg-[#0d1117] [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_code]:!font-mono"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LessonPage() {
  const params = useParams();
  const language = params?.language as string;
  const lessonId = params?.["lesson-id"] as string;
  const lang = getLanguage(language);
  const lesson = getLesson(language, lessonId);
  const { markCompleted, isCompleted, setLastVisited } = useProgress(language);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLastVisited(lessonId);

    // Load MDX content dynamically
    fetch(`/api/lesson?lang=${language}&lesson=${lessonId}`, { cache: "no-store" })
      .then((r) => r.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent(`# ${lesson?.title || "Lesson"}\n\nContent coming soon!`);
        setLoading(false);
      });
  }, [language, lessonId]);

  if (!lang || !lesson) return notFound();

  const currentIndex = lang.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lang.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lang.lessons.length - 1 ? lang.lessons[currentIndex + 1] : null;
  const completed = isCompleted(lessonId);

  return (
    <div className="min-h-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 pb-24"
      >
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-foreground/40">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/learn/${language}/introduction`} className="hover:text-foreground transition-colors capitalize">
            {lang.name}
          </Link>
          <span>/</span>
          <span className="text-foreground/70">{lesson.title}</span>
        </div>

        {/* Lesson header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{lang.icon}</span>
            <span
              className="rounded-full px-3 py-1 text-xs font-medium border"
              style={{ color: lang.color, borderColor: `${lang.color}40`, background: `${lang.color}10` }}
            >
              {lang.name}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{lesson.title}</h1>
          <p className="text-foreground/50">{lesson.description}</p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 rounded bg-white/10" style={{ width: `${60 + Math.random() * 40}%` }} />
            ))}
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  if (!inline && match) {
                    return (
                      <CodeBlock
                        code={String(children).replace(/\n$/, "")}
                        language={match[1]}
                      />
                    );
                  }
                  return (
                    <code
                      className="rounded px-1 py-0.5 bg-white/10 text-[#00E5FF] text-xs font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => <h1 className="mt-0 mb-6 text-3xl sm:text-4xl font-bold text-foreground">{children}</h1>,
                h2: ({ children }) => <h2 className="mt-10 mb-4 text-xl sm:text-2xl font-bold text-foreground border-b border-white/10 pb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="mt-6 mb-3 text-lg font-semibold text-[#00E5FF]">{children}</h3>,
                img: ({ src, alt }) => <img src={src} alt={alt} className="rounded-xl border border-white/10 my-6 max-w-full" />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}

        {/* Complete button */}
        <div className="mt-16 flex items-center gap-4">
          {!completed ? (
            <LiquidButton
              size="xl"
              className="text-[#00E5FF] font-semibold"
              onClick={() => markCompleted(lessonId)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark as Complete
            </LiquidButton>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Lesson Completed!
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
          {prevLesson ? (
            <Link
              href={`/learn/${language}/${prevLesson.id}`}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-card/50 px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:border-white/20 transition-all group max-w-[45%]"
            >
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform shrink-0" />
              <span className="truncate">{prevLesson.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/learn/${language}/${nextLesson.id}`}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-card/50 px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:border-white/20 transition-all group max-w-[45%] ml-auto"
            >
              <span className="truncate">{nextLesson.title}</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroGeometric from "@/components/ui/hero-geometric";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { SignInFlow } from "@/components/ui/sign-in-flow";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { languages } from "@/lib/lessons";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, BookOpen } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

// Code editor mockup content
const CODE_MOCKUP = `# Welcome to Codalyte
# Master Python, Java, SQL, C, C++, and MongoDB

def greet(name: str) -> str:
    return f"Hello, {name}! Ready to code?"

class Developer:
    def __init__(self, name: str):
        self.name = name
        self.languages = []
    
    def learn(self, language: str):
        self.languages.append(language)
        print(f"✓ {language} mastered!")
        return self

# Start your journey
dev = Developer("{USER_NAME_HERE}")
dev.learn("Python").learn("Java").learn("SQL")
print(greet(dev.name))
# → Hello! Ready to code?
`;

function CodeEditorMockup({ userName }: { userName: string }) {
  const code = CODE_MOCKUP.replace("{USER_NAME_HERE}", userName || "You");

  return (
    <div className="h-full w-full p-4 font-mono text-xs sm:text-sm">
      {/* Editor header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-white/40 text-xs">main.py — Codalyte</span>
      </div>

      {/* Code lines */}
      <div className="space-y-0.5">
        {code.split("\n").map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-6 text-right text-white/20 select-none shrink-0">{i + 1}</span>
            <span
              className={
                line.startsWith("#")
                  ? "text-[#00E5FF]/50"
                  : line.startsWith("def ") || line.startsWith("class ")
                  ? "text-[#00E5FF]"
                  : line.includes("learn(") || line.includes("greet(")
                  ? "text-emerald-400"
                  : line.includes('"') || line.includes("'") || line.includes("`")
                  ? "text-amber-300"
                  : "text-white/80"
              }
            >
              {line || "\u00A0"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageCard({ lang }: { lang: (typeof languages)[0] }) {
  const { progress } = useProgress(lang.id);
  const totalLessons = lang.lessons.length;
  const completedCount = progress.completed.length;
  const pct = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <Link href={`/learn/${lang.id}/introduction`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="group relative rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-xl cursor-pointer overflow-hidden"
      >
        {/* Color accent top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-all group-hover:opacity-100 opacity-50"
          style={{ background: lang.color }}
        />

        {/* Icon */}
        <div className="text-3xl mb-3">{lang.icon}</div>

        {/* Name & description */}
        <h3 className="font-bold text-foreground mb-1">{lang.name}</h3>
        <p className="text-sm text-foreground/50 mb-4 line-clamp-2">{lang.description}</p>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-foreground/40 mb-1">
            <span>{completedCount}/{totalLessons} lessons</span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: lang.color }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1 text-xs font-medium" style={{ color: lang.color }}>
          {completedCount > 0 ? "Continue" : "Start Learning"}
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}

export default function HomePage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedName = localStorage.getItem("codalyte_user_name");
    if (!savedName) {
      setShowOnboarding(true);
    } else {
      setUserName(savedName);
    }
  }, []);

  const handleOnboardingComplete = (name: string) => {
    setUserName(name);
    setShowOnboarding(false);
  };

  const heroTitle1 = userName ? `Welcome back, ${userName}.` : "Welcome,";
  const heroTitle2 = "Welcome to Codalyte";

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SignInFlow onComplete={handleOnboardingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showOnboarding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Header userName={userName ?? undefined} />

          {/* Hero Section */}
          <section>
            <HeroGeometric title1={heroTitle1} title2={heroTitle2} />
          </section>

          {/* Container Scroll Section */}
          <section className="relative bg-background">
            <ContainerScroll
              titleComponent={
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                    Your{" "}
                    <span className="text-[#00E5FF]">Coding Environment</span>
                    <br />
                    Awaits
                  </h2>
                  <p className="text-foreground/50 text-sm sm:text-base">
                    Interactive lessons with real code examples
                  </p>
                </div>
              }
            >
              <CodeEditorMockup userName={userName ?? "You"} />
            </ContainerScroll>
          </section>

          {/* Language Cards */}
          <section id="learn" className="relative bg-background py-20">
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl font-bold mb-4"
                >
                  Choose Your{" "}
                  <span className="bg-gradient-to-r from-[#00E5FF] to-indigo-400 bg-clip-text text-transparent">
                    Language
                  </span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-foreground/50 max-w-xl mx-auto"
                >
                  Six carefully crafted curricula. From beginner to advanced.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <LanguageCard lang={lang} />
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex items-center gap-3">
                  <Link href="/learn/python/introduction">
                    <LiquidButton size="xl" className="text-[#00E5FF] font-semibold">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start with Python
                    </LiquidButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}

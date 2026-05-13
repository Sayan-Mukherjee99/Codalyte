"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ArrowRight, Code2 } from "lucide-react";

interface SignInFlowProps {
  onComplete: (name: string) => void;
}

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 5,
}));

export function SignInFlow({ onComplete }: SignInFlowProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name to continue.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    localStorage.setItem("codalyte_user_name", trimmed);
    onComplete(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#00E5FF]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Glowing orbs */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#00E5FF]/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Sign-in card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF]/30">
              <Code2 className="h-5 w-5 text-[#00E5FF]" />
            </div>
            <span className="text-lg font-bold text-white">Codalyte</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="mb-2 text-3xl font-bold text-white">
              Join{" "}
              <span className="bg-gradient-to-r from-[#00E5FF] to-indigo-400 bg-clip-text text-transparent">
                Codalyte
              </span>
            </h1>
            <p className="text-sm text-white/50">
              Enter your name to begin your journey through the Code Universe.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6">
              <label htmlFor="name-input" className="mb-2 block text-sm font-medium text-white/70">
                Your Name
              </label>
              <input
                id="name-input"
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="e.g. Alex Chen"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none ring-0 transition-all focus:border-[#00E5FF]/50 focus:bg-white/10 focus:ring-2 focus:ring-[#00E5FF]/20"
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <LiquidButton
              type="submit"
              size="xl"
              className="w-full text-[#00E5FF] font-semibold text-base"
            >
              Enter Codalyte
              <ArrowRight className="ml-2 h-4 w-4" />
            </LiquidButton>
          </motion.form>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-xs text-white/30"
          >
            No account needed • All progress saved locally
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

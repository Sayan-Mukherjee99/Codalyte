"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Download, Lock, Unlock, Code2, Save, Upload } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { languages } from "@/lib/lessons";

const SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_SECRET;

export default function AdminPortal() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [selectedLang, setSelectedLang] = useState(languages[0].id);
  const [selectedLesson, setSelectedLesson] = useState("introduction");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === SECRET_KEY) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Invalid secret key.");
    }
  };

  const loadContent = async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/lesson?lang=${selectedLang}&lesson=${selectedLesson}`, { cache: "no-store" });
      const text = await r.text();
      setContent(text);
    } catch {
      setContent("# Error loading content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lesson?lang=${selectedLang}&lesson=${selectedLesson}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Failed to save changes.");
      }
    } catch (e) {
      alert("Error saving changes.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      if (file.type === "application/pdf") {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`API Error: ${errorText}`);
        }
        const data = await res.json();
        if (data.text) {
          setContent((prev) => prev + "\n\n" + data.text);
        }
      } else {
        const text = await file.text();
        setContent((prev) => prev + "\n\n" + text);
      }
    } catch (error: any) {
      console.error(error);
      alert(`Failed to read file: ${error.message || "Unknown error"}`);
    } finally {
      setUploading(false);
      e.target.value = ""; // Reset input
    }
  };

  const lang = languages.find((l) => l.id === selectedLang);

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mx-4"
        >
          <div className="rounded-2xl border border-white/10 bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF]/30">
                <Lock className="h-5 w-5 text-[#00E5FF]" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">Admin Portal</h1>
                <p className="text-xs text-foreground/40">Content Management System</p>
              </div>
            </div>
            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-sm text-foreground/60 mb-2">Secret Key</label>
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter secret key..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-foreground/30 outline-none focus:border-[#00E5FF]/50 focus:ring-2 focus:ring-[#00E5FF]/20"
                />
                {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
              </div>
              <LiquidButton type="submit" size="xl" className="w-full text-[#00E5FF] font-semibold">
                <Unlock className="mr-2 h-4 w-4" />
                Unlock Portal
              </LiquidButton>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="h-6 w-6 text-[#00E5FF]" />
            <h1 className="text-2xl font-bold text-foreground">Content Editor</h1>
            <span className="ml-2 rounded-full px-3 py-0.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Unlocked</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar controls */}
            <div className="rounded-xl border border-white/10 bg-card/50 p-4 h-fit">
              <div className="mb-4">
                <label className="block text-xs text-foreground/40 mb-1.5">Language</label>
                <select
                  value={selectedLang}
                  onChange={(e) => { setSelectedLang(e.target.value); setSelectedLesson("introduction"); }}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground outline-none"
                >
                  {languages.map((l) => (
                    <option key={l.id} value={l.id}>{l.icon} {l.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-foreground/40 mb-1.5">Lesson</label>
                <select
                  value={selectedLesson}
                  onChange={(e) => setSelectedLesson(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground outline-none"
                >
                  {lang?.lessons.map((l) => (
                    <option key={l.id} value={l.id}>{l.title}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={loadContent}
                className="w-full rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-3 py-2 text-sm text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all"
              >
                Load Content
              </button>
            </div>

            {/* Editor */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-xl border border-white/10 bg-card/50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                  <span className="text-xs text-foreground/40 font-mono">{selectedLesson}.mdx</span>
                  <div className="flex items-center gap-2">
                    {uploading && <span className="text-xs text-[#00E5FF] animate-pulse">Uploading...</span>}
                    <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-foreground/70 hover:bg-white/10 transition-all">
                      <Upload className="h-3 w-3" />
                      Import Doc/PDF
                      <input
                        type="file"
                        accept=".txt,.md,.mdx,.pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                    {saved && (
                      <span className="text-xs text-emerald-400">✓ Saved!</span>
                    )}
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-3 py-1.5 text-xs text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all"
                    >
                      <Save className="h-3 w-3" />
                      Save Changes
                    </button>
                  </div>
                </div>
                <textarea
                  value={loading ? "Loading..." : content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[60vh] bg-[#0d0d0d] p-4 font-mono text-sm text-white/80 resize-none outline-none"
                  placeholder="Load a lesson to start editing..."
                />
              </div>
              <p className="text-xs text-foreground/30">
                Edit the content above and click "Save Changes" to overwrite the file in your codebase immediately. No manual file management required!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

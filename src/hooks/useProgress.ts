"use client";

import { useState, useEffect } from "react";

interface Progress {
  completed: string[];
  lastVisited: string | null;
}

interface ProgressStore {
  [language: string]: Progress;
}

const STORAGE_KEY = "codalyte_progress";

function getProgress(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(store: ProgressStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

export function useProgress(language: string) {
  const [progress, setProgress] = useState<Progress>({ completed: [], lastVisited: null });

  useEffect(() => {
    const store = getProgress();
    setProgress(store[language] ?? { completed: [], lastVisited: null });
  }, [language]);

  const markCompleted = (lessonId: string) => {
    const store = getProgress();
    const lang = store[language] ?? { completed: [], lastVisited: null };
    if (!lang.completed.includes(lessonId)) {
      lang.completed = [...lang.completed, lessonId];
    }
    lang.lastVisited = lessonId;
    store[language] = lang;
    saveProgress(store);
    setProgress({ ...lang });
  };

  const setLastVisited = (lessonId: string) => {
    const store = getProgress();
    const lang = store[language] ?? { completed: [], lastVisited: null };
    lang.lastVisited = lessonId;
    store[language] = lang;
    saveProgress(store);
    setProgress({ ...lang });
  };

  const isCompleted = (lessonId: string) => progress.completed.includes(lessonId);

  const resetProgress = () => {
    const store = getProgress();
    store[language] = { completed: [], lastVisited: null };
    saveProgress(store);
    setProgress({ completed: [], lastVisited: null });
  };

  const completionPercentage = (totalLessons: number) => {
    if (totalLessons === 0) return 0;
    return Math.round((progress.completed.length / totalLessons) * 100);
  };

  return {
    progress,
    markCompleted,
    setLastVisited,
    isCompleted,
    resetProgress,
    completionPercentage,
  };
}

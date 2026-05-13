export interface Lesson {
  id: string;
  title: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}

export const languages: Language[] = [
  {
    id: "python",
    name: "Python",
    description: "The language of AI, data science, and web backends.",
    color: "#3B82F6",
    icon: "🐍",
    lessons: [
      { id: "introduction", title: "1. Introduction to Python", description: "Get started with Python basics, history, and syntax." },
      { id: "variables-types", title: "2. Variables & Data Types", description: "Deep dive into numbers, strings, and booleans." },
      { id: "control-flow", title: "3. Control Flow", description: "If statements, while loops, and logic operations." },
      { id: "functions", title: "4. Functions & Scope", description: "Define parameters, return values, and understand scope." },
      { id: "lists-dicts", title: "5. Lists & Dictionaries", description: "Mutable sequences and key-value pairings." },
      { id: "tuples-sets", title: "6. Tuples & Sets", description: "Immutable sequences and unique collections." },
      { id: "file-handling", title: "7. File Handling", description: "Read, write, and append to local files." },
      { id: "oop-intro", title: "8. Object-Oriented Intro", description: "Classes, objects, and constructors in Python." },
      { id: "error-handling", title: "9. Error Handling", description: "Try, except, finally, and custom exceptions." },
      { id: "modules", title: "10. Modules & Imports", description: "Organizing code and using the standard library." }
    ],
  },
  {
    id: "java",
    name: "Java",
    description: "Enterprise-grade, object-oriented programming language.",
    color: "#F59E0B",
    icon: "☕",
    lessons: [
      { id: "introduction", title: "1. Introduction to Java", description: "Your first Java program, JVM, JRE, and JDK." },
      { id: "variables", title: "2. Primitives & Variables", description: "Strongly typed variables and casting." },
      { id: "oop-basics", title: "3. OOP Basics", description: "Classes, objects, encapsulation, and getters/setters." },
      { id: "inheritance", title: "4. Inheritance & Polymorphism", description: "Extend and override classes with `extends`." },
      { id: "interfaces", title: "5. Interfaces & Abstracts", description: "Contracts and abstraction layers." },
      { id: "collections", title: "6. Collections Framework", description: "ArrayList, HashMap, HashSet and iteration." },
      { id: "exceptions", title: "7. Exception Handling", description: "Handle checked and unchecked errors gracefully." },
      { id: "generics", title: "8. Generics", description: "Type-safe collections and generic methods." },
      { id: "streams", title: "9. Streams & Lambdas", description: "Functional programming in Java 8+." },
      { id: "multithreading", title: "10. Multithreading", description: "Threads, Runnables, and synchronization." }
    ],
  },
  {
    id: "sql",
    name: "SQL",
    description: "The universal language for managing relational databases.",
    color: "#10B981",
    icon: "🗄️",
    lessons: [
      { id: "introduction", title: "Introduction to SQL", description: "What is SQL and why it matters." },
      { id: "select", title: "SELECT Queries", description: "Query data from tables." },
      { id: "joins", title: "JOINs", description: "Combine data from multiple tables." },
      { id: "aggregates", title: "Aggregate Functions", description: "COUNT, SUM, AVG and GROUP BY." },
      { id: "subqueries", title: "Subqueries", description: "Nested queries for complex retrieval." },
    ],
  },
  {
    id: "c",
    name: "C",
    description: "The foundation of modern computing. Close to the metal.",
    color: "#8B5CF6",
    icon: "⚙️",
    lessons: [
      { id: "introduction", title: "Introduction to C", description: "Hello, World in C." },
      { id: "pointers", title: "Pointers & Memory", description: "Direct memory manipulation." },
      { id: "arrays-strings", title: "Arrays & Strings", description: "Working with sequences in C." },
      { id: "structs", title: "Structs", description: "Custom data types in C." },
      { id: "file-io", title: "File I/O", description: "Read and write files." },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    description: "C with superpowers — OOP, templates, and performance.",
    color: "#EF4444",
    icon: "🔥",
    lessons: [
      { id: "introduction", title: "Introduction to C++", description: "C++ vs. C: Key differences." },
      { id: "classes", title: "Classes & Objects", description: "Object-oriented C++." },
      { id: "stl", title: "Standard Template Library", description: "Vectors, maps, and algorithms." },
      { id: "templates", title: "Templates", description: "Generic programming in C++." },
      { id: "smart-pointers", title: "Smart Pointers", description: "Modern memory management." },
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "The leading NoSQL document database.",
    color: "#00E5FF",
    icon: "🍃",
    lessons: [
      { id: "introduction", title: "Introduction to MongoDB", description: "Documents, collections, and BSON." },
      { id: "crud", title: "CRUD Operations", description: "Create, Read, Update, Delete." },
      { id: "queries", title: "Advanced Queries", description: "Query operators and projections." },
      { id: "aggregation", title: "Aggregation Pipeline", description: "Transform and analyze data." },
      { id: "indexes", title: "Indexes & Performance", description: "Speed up your queries." },
    ],
  },
];

export function getLanguage(id: string) {
  return languages.find((l) => l.id === id);
}

export function getLesson(languageId: string, lessonId: string) {
  const lang = getLanguage(languageId);
  return lang?.lessons.find((l) => l.id === lessonId);
}

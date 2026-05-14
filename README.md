# 🎓 Codalyte

> A high-end, interactive learning platform designed for the modern developer

Built with a **"Vibe-First"** philosophy, Codalyte combines cutting-edge UI components with a seamless, zero-backend architecture for an exceptional learning experience.

## ✨ Features

- 🎨 **Modern UI** - Built with 21st.dev & shadcn primitives
- ⚡ **Zero-Backend Architecture** - Client-side only, ultra-fast
- 📚 **Multi-Language Support** - Python, Java, SQL, C, C++, MongoDB, and more
- 💾 **Local Progress Tracking** - All your progress saved locally
- 🎯 **MDX-Powered Content** - Easy-to-manage study materials
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🏗️ Architecture Overview

### High-Level Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Next.js Frontend (React)                    │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │         UI Components Layer                        │  │   │
│  │  │  (shadcn/ui + 21st.dev + Custom Components)       │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                         ↕                                 │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │      Custom React Hooks Layer                      │  │   │
│  │  │  • useProgress → Track Learning Progress          │  │   │
│  │  │  • useLocalStorage → Persist Data Locally         │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                         ↕                                 │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │     Browser APIs Layer                             │  │   │
│  │  │  • localStorage → Local Data Storage               │  │   │
│  │  │  • sessionStorage → Session Data                   │  │   │
│  │  │  • IndexedDB → Large Data Sets                     │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                          │
│        (Browse Lessons, Complete Exercises)                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
        ┌────────────────────────────┐
        │   React Event Handler      │
        │  (onClick, onChange, etc)  │
        └────────────────┬───────────┘
                         │
                         ↓
        ┌────────────────────────────┐
        │   Custom Hook              │
        │   (useProgress/            │
        │    useLocalStorage)        │
        └────────────────┬───────────┘
                         │
                         ↓
        ┌────────────────────────────┐
        │   Update Local Storage     │
        │   or Session State         │
        └────────────────┬───────────┘
                         │
                         ↓
        ┌────────────────────────────┐
        │   Browser Storage API      │
        │   (localStorage/           │
        │    IndexedDB)              │
        └─────────────────────────────┘

```

### Content Loading Pipeline

```
User Requests Content
        ↓
        ├─────────────────────────────────────────┐
        │                                          │
        ↓                                          ↓
   Page Loads                              Component Renders
   (Next.js SSG/ISR)                       ┌──────────────────┐
        ↓                                  │  MDX File Found  │
   ┌─────────────────────────────────┐    │  in /content     │
   │ MDX Compiler                    │    └────────┬─────────┘
   │ (Processes Markdown + JSX)      │           │
   └────────────────┬────────────────┘           ↓
                    │                    ┌──────────────────────┐
                    │                    │ MDX Runtime          │
                    │                    │ (Parse & Compile)    │
                    │                    └────────┬─────────────┘
                    │                             │
                    └─────────────────┬───────────┘
                                      │
                                      ↓
                    ┌─────────────────────────────────┐
                    │ HTML Content Rendered to DOM    │
                    │ + React Component Interactivity │
                    └──────────────────┬──────────────┘
                                       │
                                       ↓
                           User Sees Lesson Content

```

### State Management Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Global State                               │
│            (React Context / Custom Hooks)                    │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────────────┐      ┌────────────────────┐         │
│  │ User Progress      │      │ User Preferences   │         │
│  │ ┌────────────────┐ │      │ ┌────────────────┐ │         │
│  │ │ Lessons Done   │ │      │ │ Theme          │ │         │
│  │ │ Exercises Pass │ │      │ │ Language Pref  │ │         │
│  │ │ Points/Badges  │ │      │ │ Notifications  │ │         │
│  │ └────────────────┘ │      │ └────────────────┘ │         │
│  └────────┬───────────┘      └────────┬───────────┘         │
│           │                            │                     │
│           └──────────────┬─────────────┘                     │
│                          │                                    │
│                          ↓                                    │
│            ┌──────────────────────────┐                      │
│            │  localStorage API        │                      │
│            │  Persistence Layer       │                      │
│            └──────────────────────────┘                      │
│                          │                                    │
│                          ↓                                    │
│            ┌──────────────────────────┐                      │
│            │ Browser Storage          │                      │
│            │ (JSON Serialized Data)   │                      │
│            └──────────────────────────┘                      │
│                                                                │
└──────────────────────────────────────────────────────────────┘

```

### Project Directory Structure with Data Flow

```
codalyte/
│
├── app/                              # Next.js App Router
│   ├── page.tsx                      # Home page entry
│   ├── layout.tsx                    # Root layout
│   ├── [language]/                   # Dynamic language routes
│   │   ├── page.tsx                  # Language dashboard
│   │   └── [lesson]/page.tsx         # Individual lesson pages
│   └── api/                          # API routes (if needed)
│
├── components/                       # React Components
│   ├── ui/                          # Design System
│   │   ├── Button.tsx               # Reusable button
│   │   ├── Card.tsx                 # Card component
│   │   └── ...other primitives      # shadcn/ui components
│   ├── Header.tsx                   # Navigation header
│   ├── LessonCard.tsx               # Lesson preview card
│   ├── ProgressBar.tsx              # User progress indicator
│   └── Sidebar.tsx                  # Navigation sidebar
│
├── hooks/                           # Custom React Hooks
│   ├── useProgress.ts               # Progress tracking logic
│   ├── useLocalStorage.ts           # Local storage wrapper
│   └── useLessonData.ts             # Lesson loading logic
│
├── content/                         # MDX Content Files
│   ├── python/                      # Python Lessons
│   │   ├── python-basics.mdx
│   │   ├── data-structures.mdx
│   │   └── ...more lessons
│   ├── java/                        # Java Lessons
│   ├── sql/                         # SQL Lessons
│   ├── c/                           # C Lessons
│   ├── cpp/                         # C++ Lessons
│   └── mongodb/                     # MongoDB Lessons
│
├── public/                          # Static Assets
│   ├── icons/                       # Icon files
│   ├── images/                      # Image files
│   └── ...static resources
│
├── styles/                          # Global Styles
│   └── globals.css                  # Tailwind + Global CSS
│
├── package.json                     # Dependencies
├── next.config.js                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
└── tailwind.config.js               # Tailwind CSS configuration

```

### Component Interaction Diagram

```
┌──────────────────────────────────────────────────┐
│            App (Root Component)                  │
│        [Layout + Routing Setup]                  │
└────────────────┬─────────────────────────────────┘
                 │
        ┌────────┴────────┬─────────────┐
        │                 │             │
        ↓                 ↓             ↓
   ┌─────────┐      ┌──────────┐  ┌──────────┐
   │ Header  │      │ Sidebar  │  │ MainPage │
   │Component│      │Component │  │Component │
   └────┬────┘      └────┬─────┘  └────┬─────┘
        │                │             │
        │                │    ┌────────┴────┐
        │                │    │             │
        ↓                ↓    ↓             ↓
   ┌─────────────────────────────────────────────┐
   │  useProgress Hook                            │
   │  • Fetch user progress from localStorage    │
   │  • Update progress when lesson completed    │
   │  • Calculate achievements/badges            │
   └─────────────────────────────────────────────┘
              │
              ↓
   ┌─────────────────────────────────────────────┐
   │  useLocalStorage Hook                        │
   │  • Read/write to browser localStorage       │
   │  • Serialize/deserialize JSON               │
   │  • Handle storage quota limits               │
   └─────────────────────────────────────────────┘
              │
              ↓
   ┌─────────────────────────────────────────────┐
   │  Browser APIs                                │
   │  • localStorage.getItem()                   │
   │  • localStorage.setItem()                   │
   │  • localStorage.removeItem()                │
   └─────────────────────────────────────────────┘

```

### Lesson Content Processing

```
Input: /content/python/lesson.mdx
    │
    ↓
┌─────────────────────────────────┐
│ MDX File Content                │
│ ─────────────────────────────── │
│ ---                             │
│ title: "Python Basics"          │
│ id: "py-01"                     │
│ ---                             │
│ # Lesson Title                  │
│ Markdown content here...        │
│ <CustomComponent />             │
└──────────┬──────────────────────┘
           │
           ↓
┌─────────────────────────────────┐
│ MDX Compiler                    │
│ (next-mdx-remote)              │
│ • Parse YAML frontmatter       │
│ • Compile Markdown             │
│ • Handle JSX Components        │
└──────────┬──────────────────────┘
           │
           ↓
┌─────────────────────────────────┐
│ Compiled React Component        │
│ with metadata                   │
└──────────┬──────────────────────┘
           │
           ↓
┌─────────────────────────────────┐
│ Next.js Page Component          │
│ Renders with useProgress Hook   │
└──────────┬──────────────────────┘
           │
           ↓
┌─────────────────────────────────┐
│ HTML Output                     │
│ with Interactive Elements       │
│ + Progress Tracking            │
└─────────────────────────────────┘

Output: User sees styled lesson with tracking

```

## 📁 Project Structure

```
codalyte/
├── app/                  # Next.js app directory
├── components/           # UI Components
│   ├── ui/              # 21st.dev & shadcn primitives
│   └── Header.tsx       # Personalized Navbar with Shuffle Logo
├── content/             # MDX Study Materials
│   ├── python/          # Python Lessons
│   ├── java/            # Java Lessons
│   ├── sql/             # SQL Lessons
│   ├── c/               # C Lessons
│   ├── cpp/             # C++ Lessons
│   └── mongodb/         # MongoDB Lessons
├── hooks/               # Custom React Hooks
│   ├── useProgress      # Track user learning progress
│   └── useLocalStorage  # Persist data locally
├── public/              # Static assets and icons
└── package.json
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18 or higher
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sayan-Mukherjee99/codalyte.git
cd codalyte

# Install dependencies
npm install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see Codalyte in action.

## 📝 Adding Study Materials

Adding new lessons is simple! Just create a new `.mdx` file in the relevant folder under `/content/`.

### Example: Creating a Python Lesson

Create a file at `/content/python/python-basics.mdx`:

```mdx
---
title: "Python Basics"
id: "py-01"
---

# Welcome to Python

Learn the fundamentals of Python programming...

## Variables and Data Types

Python uses dynamic typing...
```

### Supported Languages

- Python (`/content/python/`)
- Java (`/content/java/`)
- SQL (`/content/sql/`)
- C (`/content/c/`)
- C++ (`/content/cpp/`)
- MongoDB (`/content/mongodb/`)

## 🎯 Custom Hooks

### useProgress

Track user learning progress:

```typescript
const { progress, updateProgress } = useProgress('lesson-id');
```

### useLocalStorage

Persist data locally:

```typescript
const [data, setData] = useLocalStorage('key', initialValue);
```

## 🛠️ Tech Stack

- **Framework** - [Next.js](https://nextjs.org/)
- **Styling** - [Tailwind CSS](https://tailwindcss.com/)
- **UI Components** - [shadcn/ui](https://ui.shadcn.com/)
- **Content** - [MDX](https://mdxjs.com/)
- **Package Manager** - [pnpm](https://pnpm.io/)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## 📄 License


---

**Made with ❤️ by [Codalyte](https://github.com/Sayan-Mukherjee99/Codalyte)**

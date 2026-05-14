Codalyte is a high-end, interactive learning platform designed for the modern developer. Built with a "Vibe-First" philosophy, it combines cutting-edge UI components with a seamless, zero-backend architecture to provide a world-class educational experience for Python, Java, SQL, C, C++, and MongoDB.✨ Key FeaturesPremium Visual Identity:Shuffle Logo: A custom brand entrance using GSAP-powered text scrambling for the "Codalyte" identity.Geometric Hero: A fluid, animated background using HeroGeometric to create depth and sophistication.Interactive Onboarding:Erikx Sign-In Flow: A professional "gatekeeper" experience that personalizes the platform with the user's name and goals using localStorage.High-End Interactions:Liquid Glass UI: Tactile, glossy buttons with advanced hover states for all primary actions.Curtain Theme Toggle: A dramatic "screen-sweep" transition between light and dark modes.Dynamic Learning Engine:MDX-Based Content: Lessons are rendered from local Markdown files for lightning-fast performance and professional syntax highlighting via Shiki.Orbital Navigation: A 3D radial timeline in the footer for navigating between different language paths.🛠️ Tech StackLayerTechnologyFrameworkNext.js 15 (App Router)StylingTailwind CSSAnimationsFramer Motion & GSAPComponentsshadcn/ui & 21st.devIconsLucide ReactStateClient-side Persistence (localStorage)📂 Project StructureBash├── app/                  # Next.js App Router (Layouts & Pages)
├── components/           # UI Components
│   ├── ui/               # 21st.dev & shadcn primitives
│   └── Header.tsx        # Personalised Navbar with Shuffle Logo
├── content/              # MDX Study Materials
│   ├── python/           # Python Lessons
│   ├── java/             # Java Lessons
│   └── ...               # SQL, C, C++, MongoDB
├── hooks/                # Custom hooks (useProgress, useLocalStorage)
└── public/               # Static assets and icons
🚀 Getting Started1. PrerequisitesEnsure you have Node.js 18+ and pnpm (or npm) installed.2. InstallationBashgit clone https://github.com/your-username/codalyte.git
cd codalyte
npm install
3. Run Development ServerBashnpm run dev
Open http://localhost:3000 to see your academy in action.📝 Adding Study MaterialsTo add new lessons, simply create a new .mdx file in the relevant folder under /content/.Example: /content/python/intro.mdxCode snippet---
title: "Python Basics"
id: "py-01"
---

# Welcome to Python
...your lesson content here...

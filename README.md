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

This project is open source and available under the MIT License.

---

**Made with ❤️ by [Codalyte](https://github.com/Sayan-Mukherjee99/Codalyte)**

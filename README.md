<div align="center">

# 🖥️ macOS Portfolio

**An interactive developer portfolio that recreates the macOS desktop in the browser — boot screen, login, dock, draggable windows, Spotlight and working apps.**

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)

[Features](#-features) · [Apps](#-built-in-apps) · [Quick Start](#-quick-start) · [Customize](#%EF%B8%8F-make-it-yours)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| **Boot sequence** | Apple-style logo with animated progress bar and particles |
| **Login screen** | Live clock, avatar and floating particle effects |
| **Dock** | Spring-physics icon magnification, just like macOS |
| **Window manager** | Draggable, focusable windows with traffic-light controls |
| **Spotlight** | <kbd>⌘</kbd> + <kbd>Space</kbd> to search apps, projects and skills |
| **Launchpad** | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> to see every app |
| **Widgets** | Clock, calendar, reminders, GitHub stats and live weather |
| **GitHub integration** | Live repository data from the GitHub API, with caching |

<kbd>Esc</kbd> closes windows and overlays.

## 🧩 Built-in Apps

| App | What it shows |
|---|---|
| **About Me** | Finder-style profile with education and GitHub stats |
| **Projects** | Featured work + live GitHub repositories |
| **Skills** | Animated skill bars by category |
| **Experience** | Education & work timeline |
| **Terminal** | Interactive shell — try `help`, `skills`, `startup` |
| **Gemini** | AI assistant powered by Google Gemini |
| **Browser** | Simulated Safari-style browser |
| **Notes · Calendar · Settings** | Classic macOS utilities |

## 🌟 Featured Project: Motif

This portfolio highlights **[Motif](https://github.com/Awaneesh03/motif-website)** — my startup platform that helps founders validate ideas with AI and connects them with VCs.

## 🚀 Quick Start

```bash
git clone https://github.com/Awaneesh03/Awaneesh-portfolio.git
cd Awaneesh-portfolio
npm install
```

To enable the Gemini app, create a `.env` file:

```env
GEMINI_API_KEY=your-gemini-api-key
```

```bash
npm run dev        # → http://localhost:3000
npm run build      # production build
npm run preview
```

## 📁 Project Structure

```text
├── components/
│   ├── apps/           # AboutMe, Projects, Skills, Terminal, Gemini, Browser, Notes, …
│   ├── widgets/        # Clock, Calendar, Reminders, Stats, Weather
│   ├── BootSequence.tsx · LoginScreen.tsx · Desktop.tsx
│   ├── Dock.tsx        # Magnifying dock
│   ├── Window.tsx      # Draggable, focus-aware windows
│   ├── Launchpad.tsx · Spotlight.tsx
├── data/               # ← edit these to customise the portfolio
│   ├── profile.ts · skills.ts · projects.ts · experience.ts · social.ts
├── services/
│   ├── githubService.ts   # GitHub API + caching
│   └── weatherService.ts  # Weather widget data
└── hooks/useKeyboardShortcuts.ts
```

## ⚙️ Make It Yours

All content is data-driven. Edit the files in [`data/`](data) — no component changes needed:

```ts
// data/profile.ts
export const profileData = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio...",
};
```

Feel free to use this project as inspiration for your own portfolio — a credit link back is appreciated.

---

## 👤 Author

**Awaneesh Gupta** — B.Tech CSE (AI) @ Vedam School of Technology

[![GitHub](https://img.shields.io/badge/GitHub-Awaneesh03-181717?style=flat-square&logo=github)](https://github.com/Awaneesh03)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-awaneesh--gupta-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/awaneesh-gupta)

<p align="center"><sub>If you found this project useful, consider giving it a ⭐</sub></p>

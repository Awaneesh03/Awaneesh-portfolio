# 🖥️ macOS Portfolio

An interactive developer portfolio simulating the **macOS desktop experience** in the browser. Built with React, TypeScript, and Framer Motion.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" />
</p>

<!-- TODO: Add screenshot after deployment -->
![Demo Preview](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop)

---

## 🚀 Featured Startup: Motif

This portfolio showcases my work, including **[Motif](https://motif-website-master.vercel.app/)** — a full-stack web application with:

- **TypeScript/React Frontend** → [View Repository](https://github.com/Awaneesh03/motif-website)
- **Java Spring Boot Backend** → [View Repository](https://github.com/Awaneesh03/motif-backend-)
- **Live Demo** → [motif-website-master.vercel.app](https://motif-website-master.vercel.app/)

---

## ✨ Key Features

### 🎨 Authentic macOS Experience
| Feature | Description |
|---------|-------------|
| **Boot Sequence** | Apple logo with animated progress bar & particles |
| **Login Screen** | Time display, avatar, floating particle effects |
| **Dock Magnification** | Spring-physics icon scaling like real macOS |
| **Window System** | Draggable, focusable windows with traffic lights |
| **Spotlight Search** | `⌘+Space` to search everything |
| **GitHub Integration** | Live repo stats from GitHub API |

### ⌨️ Keyboard Shortcuts
- `⌘ + Space` → Spotlight Search
- `⌘ + Shift + Space` → Launchpad  
- `Escape` → Close windows/modals

### 📱 Portfolio Apps
| App | Description |
|-----|-------------|
| **About Me** | Finder-style profile with education & GitHub stats |
| **Projects** | Featured startup + GitHub repos with live API |
| **Skills** | Animated progress bars by category |
| **Terminal** | Interactive shell — try `help`, `startup`, `skills` |

---

## 🛠️ Tech Stack

```
React 19 • TypeScript • Vite • TailwindCSS • Framer Motion
```

**Architecture:**
- Data-driven design with centralized `/data/` folder
- Live GitHub API integration with caching
- Spring-physics animations throughout
- Glassmorphism UI with premium effects

---

## 🏃 Quick Start

```bash
# Clone
git clone https://github.com/Awaneesh03/MacOS-Recreation-main.git
cd MacOS-Recreation-main

# Install & Run
npm install
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
├── components/
│   ├── apps/           # AboutMe, Projects, Skills, Terminal
│   ├── widgets/        # Clock, Calendar, Stats, Weather
│   ├── Dock.tsx        # Premium magnification dock
│   ├── Window.tsx      # Focus-aware draggable windows
│   └── Spotlight.tsx   # Global search
├── data/               # ← EDIT THESE to customize!
│   ├── profile.ts      # Name, bio, education
│   ├── skills.ts       # Tech skills with levels
│   ├── projects.ts     # Featured & GitHub projects
│   ├── experience.ts   # Work & education timeline
│   └── social.ts       # Contact & social links
└── services/
    └── githubService.ts # GitHub API with caching
```

---

## ⚙️ Customization

Edit files in `/data/` folder to personalize:

```typescript
// data/profile.ts
export const profileData = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio...",
  // ...
};
```

---

## 👤 Author

**Awaneesh Gupta**  
B.Tech Computer Science (AI) • First Year  
Vedam School of Technology

[![GitHub](https://img.shields.io/badge/GitHub-Awaneesh03-181717?style=flat-square&logo=github)](https://github.com/Awaneesh03)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-awaneesh--gupta-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/awaneesh-gupta/)
[![Email](https://img.shields.io/badge/Email-kg3327949@gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:kg3327949@gmail.com)

### Projects
- **[Motif](https://motif-website-master.vercel.app/)** — Full-stack TypeScript + Java startup
- **[Digital Life Dashboard](https://digital-life-dashboard-sepia.vercel.app)** — Personal dashboard app
- **[This Portfolio](https://github.com/Awaneesh03/MacOS-Recreation-main)** — macOS-style portfolio

---

## 📄 License

MIT License — Feel free to use this as a template for your own portfolio!

---

<p align="center">
  Built with ❤️ using React + TypeScript
</p>

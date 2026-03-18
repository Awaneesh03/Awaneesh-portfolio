# macOS Portfolio - Complete Project Documentation

> **Interactive developer portfolio simulating the macOS desktop experience in the browser**

This document contains all the information about the project structure, features, components, and data to enable any AI to fully understand and work with this codebase.

---

## 📋 Project Overview

**Type:** Portfolio Website / Web Application  
**Stack:** React 19 + TypeScript + Vite + TailwindCSS + Framer Motion  
**Author:** Awaneesh (GitHub: Awaneesh03)  
**Purpose:** A fully interactive portfolio that recreates the macOS experience in the browser

### Key Technologies
- **Frontend:** React 19, TypeScript 5
- **Styling:** TailwindCSS, Custom CSS with glassmorphism effects
- **Animation:** Framer Motion 12 (spring physics, gestures)
- **Build Tool:** Vite 6
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **AI Integration:** Google Gemini AI (@google/genai)
- **Deployment:** Vercel

---

## 📁 Complete Project Structure

```
MacOS-Recreation-main/
├── App.tsx                    # Main app with boot phase orchestration
├── index.tsx                  # React entry point
├── index.html                 # HTML template
├── index.css                  # Advanced CSS styles (glassmorphism, scrollbars, animations)
├── types.ts                   # TypeScript interfaces and types
├── constants.ts               # App configuration, assets URLs, portfolio data
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
│
├── components/
│   ├── BootSequence.tsx       # Apple boot animation with progress bar
│   ├── LoginScreen.tsx        # macOS-style login with avatar and time
│   ├── Desktop.tsx            # Main desktop environment (menu bar, widgets, windows)
│   ├── Dock.tsx               # macOS dock with spring-physics magnification
│   ├── Window.tsx             # Draggable windows with traffic lights
│   ├── Spotlight.tsx          # ⌘+Space search functionality
│   ├── Launchpad.tsx          # App grid launcher
│   ├── CalendarApp.tsx        # Calendar application
│   ├── ParticleBackground.tsx # Animated particle effects
│   │
│   ├── apps/                  # Portfolio Applications
│   │   ├── AboutMeApp.tsx     # Finder-style profile with education & GitHub stats
│   │   ├── ProjectsApp.tsx    # Featured projects with GitHub API integration
│   │   ├── SkillsApp.tsx      # Animated skill progress bars by category
│   │   ├── ExperienceApp.tsx  # Timeline of work & education
│   │   ├── TerminalApp.tsx    # Interactive CLI portfolio interface
│   │   ├── SettingsApp.tsx    # Settings panel
│   │   ├── NotesApp.tsx       # Notes application
│   │   ├── BrowserApp.tsx     # In-app browser
│   │   └── GeminiApp.tsx      # Google Gemini AI chat integration
│   │
│   └── widgets/               # Desktop Widgets (draggable)
│       ├── WeatherWidget.tsx  # Weather display with API
│       ├── CalendarWidget.tsx # Mini calendar
│       ├── ClockWidget.tsx    # Analog/digital clock
│       ├── StatsWidget.tsx    # GitHub statistics
│       └── RemindersWidget.tsx# Reminders list
│
├── data/                      # Centralized Portfolio Data (EDIT THESE TO CUSTOMIZE)
│   ├── index.ts               # Central export file
│   ├── profile.ts             # Name, bio, education, certifications
│   ├── skills.ts              # Technical skills with levels (0-100)
│   ├── projects.ts            # Featured projects and GitHub repos
│   ├── experience.ts          # Work experience & education timeline
│   └── social.ts              # Social links & contact info
│
├── services/                  # External API Services
│   ├── githubService.ts       # GitHub API with caching
│   └── weatherService.ts      # OpenWeather API integration
│
└── hooks/
    └── useKeyboardShortcuts.ts # Keyboard shortcut handling
```

---

## 🎯 Application Flow

### Boot Sequence (3 phases)
1. **`boot-splash`** (1 second) - Apple logo appears with particles
2. **`boot-progress`** (2.5 seconds) - Progress bar animation with glow effects
3. **`login`** - macOS login screen with time, avatar, particle effects
4. **`desktop`** - Full desktop environment loads

### State Management
- Uses React `useState` for local component state
- Phase management in `App.tsx` via `SystemPhase` type
- Window z-index management for focus tracking
- Apps tracked via `AppConfig[]` array

---

## 🖥️ Core Components

### 1. Desktop.tsx
The main container that manages:
- Menu bar with app shortcuts
- Movable desktop widgets (Weather, Calendar, Clock, Stats)
- Window management (open/close/focus/z-index)
- Spotlight and Launchpad overlays
- Context menu on right-click
- Keyboard shortcuts (⌘+Space, ⌘+Shift+Space, Escape)

**Apps Array Structure:**
```typescript
interface AppConfig {
  id: string;           // Unique identifier
  name: string;         // Display name
  icon: React.ReactNode; // Icon component
  isOpen: boolean;      // Window visibility
  isMinimized: boolean; // Minimized state
  pinned: boolean;      // Show in dock
  component?: React.ReactNode; // Window content
  width?: number;       // Default window width
  height?: number;      // Default window height
}
```

### 2. Dock.tsx
Features:
- **Magnification effect** using spring physics (mouse proximity based)
- **Reorderable icons** via drag-and-drop (Framer Motion Reorder)
- **Dividers** between pinned apps, recent apps, and trash
- **Tooltip** on hover with app name
- **Bounce animation** on click
- **Premium glass effect** with glow

### 3. Window.tsx
Features:
- **Draggable** via title bar (Framer Motion drag controls)
- **Traffic light buttons** (red close, yellow minimize, green maximize)
- **Focus management** (opacity, shadow changes)
- **Smooth open/close animations** with blur effects
- **Resizable** (min 320x220)
- **Random position offset** to avoid stacking

### 4. Spotlight.tsx
Features:
- **Global search** across apps, projects, skills
- **Keyboard navigation** (arrow keys, enter)
- **Categorized results** (Apps, Links, Projects, Skills)
- **Fuzzy matching** on title and category

### 5. BootSequence.tsx
Features:
- **Apple logo** with brightness animation
- **Floating particles** in background
- **Progress bar** with glow effect and ease-out timing
- **Radial gradient** ambient lighting

### 6. LoginScreen.tsx
Features:
- **Live clock** updating every second
- **Ken Burns effect** on wallpaper (slow zoom)
- **Particle background** animation
- **Gradient orbs** floating effect
- **Click or keypress** to continue

---

## 📱 Portfolio Apps

### AboutMeApp
- Finder-style sidebar interface
- Sections: Info, Education, GitHub (live stats)
- Displays profile data from `data/profile.ts`
- Fetches real GitHub stats via `githubService.ts`

### ProjectsApp
- Grid/list view of projects
- **Featured startup (Motif)** highlighted at top
- Live GitHub repository data
- Star count, language detection
- Links to demo and GitHub

### SkillsApp
- Skills grouped by category (Frontend, Backend, Tools, Learning)
- Animated progress bars (0-100%)
- Color-coded by category
- Uses data from `data/skills.ts`

### ExperienceApp
- Timeline visualization
- Types: work, education, achievement, project
- Sidebar navigation by type
- Technology tags on entries

### TerminalApp
**Interactive CLI with commands:**
- `help` - Show all commands
- `whoami` - Display profile
- `skills` - List technical skills
- `projects` - View projects
- `startup` / `motif` - Details about featured startup
- `experience` - Work history
- `education` - Education details
- `contact` - Contact information
- `social` - Social media links
- `github` - Open GitHub profile
- `linkedin` - Open LinkedIn profile
- `resume` - Download resume
- `stats` - Quick statistics
- `clear` - Clear terminal
- `exit` - Close terminal

### GeminiApp
- Google Gemini AI chat integration
- Streaming responses
- Chat history
- Sidebar with recent chats

---

## 📊 Data Files (Customization Points)

### data/profile.ts
```typescript
export const profileData = {
  name: "Awaneesh",
  title: "Full Stack Developer",
  location: "Pune, India",
  tagline: "Building beautiful, performant web experiences",
  bio: "...",
  email: "kg3327949@gmail.com",
  avatar: "...",
  resume: "/resume.pdf",
  education: [...],
  certifications: [...]
};
```

### data/skills.ts
```typescript
export const skillCategories = [
  {
    name: "Frontend",
    icon: "Monitor",
    color: "#3B82F6",
    skills: [
      { name: "HTML/CSS", level: 85, color: "#E34F26" },
      { name: "JavaScript", level: 75, color: "#F7DF1E" },
      { name: "React", level: 70, color: "#61DAFB" },
      // ...more skills
    ]
  },
  // Backend, Tools & DevOps, Currently Learning categories
];
```

### data/projects.ts
```typescript
export const startupProject = {
  id: "motif-startup",
  name: "Motif",
  description: "...",
  technologies: ["TypeScript", "React", "Java", "Spring Boot"],
  github: "https://github.com/Awaneesh03/motif-website",
  backendRepo: "https://github.com/Awaneesh03/motif-backend-",
  demo: "https://motif-website-master.vercel.app/",
  featured: true,
  isStartup: true,
  // ...more fields
};

export const featuredProjects = [startupProject, ...otherProjects];
```

### data/experience.ts
```typescript
export const experience = [
  {
    id: "exp-1",
    type: "work",
    title: "Founder & Full Stack Developer",
    organization: "Motif (Startup)",
    startDate: "2024",
    endDate: "Present",
    technologies: ["TypeScript", "React", "Java", "Spring Boot"],
    // ...
  }
];

export const education = [...];
export const achievements = [...];
```

### data/social.ts
```typescript
export const socialLinks = [
  { id: "github", name: "GitHub", url: "https://github.com/Awaneesh03" },
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/awaneesh-gupta/" },
  { id: "email", name: "Email", url: "mailto:kg3327949@gmail.com" }
];

export const GITHUB_USERNAME = "Awaneesh03";
```

---

## 🔌 Services

### githubService.ts
- **fetchGitHubUser(username)** - Get user profile
- **fetchGitHubRepos(username)** - Get repositories
- **calculateGitHubStats()** - Aggregate statistics
- **5-minute caching** to avoid rate limits
- **Language colors** mapping for visualization

### weatherService.ts
- **fetchWeather(lat?, lon?)** - Get weather data
- OpenWeather API integration
- Fallback mock data when API key missing
- Supports geolocation and city name

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘ + Space` | Toggle Spotlight search |
| `⌘ + Shift + Space` | Toggle Launchpad |
| `Escape` | Close Spotlight/Launchpad/Modals |
| `Enter` or `Space` | Login (on login screen) |
| `↑/↓` | Navigate Spotlight results |
| `Enter` | Select Spotlight result |

---

## 🎨 CSS Architecture

### Key CSS Variables
```css
:root {
  --glass-bg: rgba(30, 30, 30, 0.85);
  --glass-border: rgba(255, 255, 255, 0.1);
  --accent-blue: #007AFF;
  --accent-purple: #BF5AF2;
  --accent-pink: #FF375F;
  --accent-orange: #FF9F0A;
  --accent-green: #30D158;
}
```

### Key Classes
- `.glass-dock` - Dock glassmorphism effect
- `.glass-panel` - Window/modal panels
- `.custom-scrollbar` - Premium scrollbar styling
- Extensive use of TailwindCSS utilities

---

## 🔧 TypeScript Types

### types.ts
```typescript
export type SystemPhase = 'boot-splash' | 'boot-progress' | 'login' | 'desktop';

export interface AppConfig { id, name, icon, isOpen, isMinimized, pinned, component?, width?, height? }
export interface WeatherData { temp, city, condition, forecast[] }
export interface ReminderItem { id, text, completed }
export interface Project { id, name, description, techStack, github, demo, image, stars, featured }
export interface TimelineItem { year, title, description, type }
export interface GitHubRepo { id, name, description, html_url, homepage, stargazers_count, language, topics }
export interface TerminalCommand { command, output }
```

---

## 🚀 Scripts

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📷 Key Assets (constants.ts)

```typescript
ASSETS = {
  APPLE_LOGO: "...",           // Boot screen logo
  LOGIN_AVATAR: "...",         // User avatar
  WALLPAPER: "...",            // Desktop background
  PROFILE_IMAGE: "...",        // About me avatar
  RESUME_URL: "/resume.pdf"    // Resume download
}

GITHUB_USERNAME = "Awaneesh03"
DEFAULT_CITY = "Pune"
USER_NAME = "Awaneesh"
```

---

## 🌟 Featured Project: Motif

- **Frontend:** TypeScript + React → [motif-website](https://github.com/Awaneesh03/motif-website)
- **Backend:** Java Spring Boot → [motif-backend-](https://github.com/Awaneesh03/motif-backend-)
- **Live Demo:** [motif-website-master.vercel.app](https://motif-website-master.vercel.app/)

---

## 🎯 How to Customize

1. **Edit `data/profile.ts`** - Update name, bio, education
2. **Edit `data/skills.ts`** - Modify skill categories and levels
3. **Edit `data/projects.ts`** - Add your projects
4. **Edit `data/experience.ts`** - Update work/education timeline
5. **Edit `data/social.ts`** - Change social links
6. **Edit `constants.ts`** - Update asset URLs, username
7. **Replace `/resume.pdf`** - Add your resume to public folder

---

## 🔑 Environment Variables

```env
OPENWEATHER_API_KEY=xxx   # Optional: Weather widget
API_KEY=xxx               # Optional: Google Gemini AI
```

---

## 📱 Responsive Design

- Desktop-first design optimized for 1920x1080+
- Mobile menu bar simplification
- Widgets hidden/repositioned on smaller screens
- Window sizing adapts to viewport (90% max width, 80% max height)

---

This documentation provides complete context for understanding, modifying, or extending the macOS Portfolio project.

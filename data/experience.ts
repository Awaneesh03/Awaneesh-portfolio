/**
 * Experience & Education Configuration
 * Dates are ISO "YYYY" or "YYYY-MM" so the timeline sorts correctly.
 */

export type TimelineType = 'work' | 'education' | 'achievement' | 'project';

export interface TimelineEntry {
  id: string;
  type: TimelineType;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  highlights?: string[];
  technologies?: string[];
  link?: string;
}

export const experience: TimelineEntry[] = [
  {
    id: "exp-fixkaru",
    type: "work",
    title: "Founder & Product Builder",
    organization: "FixKaru",
    location: "Pune, Maharashtra",
    startDate: "2026-06",
    endDate: "Present",
    description: "Founded a doorstep smartphone repair venture built on upfront pricing, customer approval before work, post-service payment and warranty-backed repairs.",
    highlights: [
      "Designed the service model and operational workflow",
      "Defined product, brand strategy and customer experience",
      "Building the digital product and customer acquisition strategy"
    ]
  },
  {
    id: "exp-1",
    type: "work",
    title: "Co-Founder & CTO",
    organization: "Motif (Startup)",
    location: "Pune, Maharashtra",
    startDate: "2025-11",
    endDate: "2026-04",
    description: "Co-founded and led development of an AI-powered platform that helps founders validate ideas, develop pitches and connect with relevant VCs.",
    highlights: [
      "Built React + TypeScript frontend with five-role access control",
      "Supabase Auth (Google OAuth) and Postgres data layer",
      "AI idea analysis and pitch tools powered by Groq-hosted Llama 3.3",
      "Deployed live on Vercel"
    ],
    technologies: ["React", "TypeScript", "Supabase", "Groq", "TailwindCSS", "Vercel"],
    link: "https://motif-website.vercel.app"
  },
  {
    id: "exp-2",
    type: "work",
    title: "Independent Developer",
    organization: "Self-Employed",
    location: "Remote",
    startDate: "2024",
    endDate: "Present",
    description: "Designing and shipping personal projects end to end — from browser games and local AI tools to desktop apps.",
    highlights: [
      "Shipped Pacify, a 3D multiplayer browser game",
      "Built Serina, a fully offline voice AI assistant",
      "Built Vaultwork, a local-first Tauri desktop app with a Claude MCP server",
      "Built this interactive macOS-style portfolio"
    ],
    technologies: ["TypeScript", "React", "Three.js", "Socket.io", "FastAPI", "Tauri"]
  }
];

export const education: TimelineEntry[] = [
  {
    id: "edu-1",
    type: "education",
    title: "B.Tech Computer Science (AI)",
    organization: "Vedam School of Technology",
    location: "India",
    startDate: "2025",
    endDate: "2029",
    description: "Specializing in Artificial Intelligence and Machine Learning. Learning data structures, algorithms, and building real-world projects.",
    highlights: [
      "Specializing in AI/ML",
      "Building full-stack projects",
      "Learning DSA and system design",
      "Active in coding communities"
    ]
  }
];

export const achievements: TimelineEntry[] = [
  {
    id: "ach-serina",
    type: "project",
    title: "Built Serina — Local-First Voice AI",
    organization: "Personal Project",
    startDate: "2026-09",
    endDate: "2026-09",
    description: "Voice assistant that runs entirely on-device: Whisper speech-to-text, Llama 3 via Ollama streamed over SSE, and emotion-aware text-to-speech. FastAPI + React.",
    link: "https://github.com/Awaneesh03/serina"
  },
  {
    id: "ach-pacify",
    type: "project",
    title: "Shipped Pacify — 3D Multiplayer Game",
    organization: "Personal Project",
    startDate: "2026-09",
    endDate: "2026-09",
    description: "Browser-based hide-and-seek horror game with an authoritative Socket.io server, shared client/server physics and AI bots. Three.js + TypeScript.",
    link: "https://github.com/Awaneesh03/pacify"
  },
  {
    id: "ach-vaultwork",
    type: "project",
    title: "Built Vaultwork — Local-First Productivity",
    organization: "Personal Project",
    startDate: "2026-09",
    endDate: "2026-09",
    description: "Tasks, goals, habits and notes on an Obsidian vault, with a Tauri desktop app, versioned IndexedDB storage and a read-only Claude MCP server.",
    link: "https://github.com/Awaneesh03/vaultwork"
  },
  {
    id: "ach-openstef",
    type: "achievement",
    title: "Open Source Contributor — OpenSTEF",
    organization: "OpenSTEF (LF Energy)",
    startDate: "2026-06",
    endDate: "2026-06",
    description: "Merged documentation improvements to the OpenSTEF energy forecasting project — issue templates, API terminology and external resources.",
    link: "https://github.com/OpenSTEF/openstef/pulls?q=is%3Apr+author%3AAwaneesh03+is%3Amerged"
  },
  {
    id: "ach-pictopy",
    type: "achievement",
    title: "Open Source Contributor — PictoPy",
    organization: "AOSSIE",
    startDate: "2026-05",
    endDate: "2026-05",
    description: "Merged a restructure of PictoPy's MkDocs navigation, adding architecture docs, setup guides and structured documentation.",
    link: "https://github.com/AOSSIE-Org/PictoPy/pull/1276"
  },
  {
    id: "ach-outreach",
    type: "achievement",
    title: "Outreach Head — Open Source Club & E-Cell",
    organization: "Vedam School of Technology",
    startDate: "2026-02",
    endDate: "2026-05",
    description: "Led outreach for both the Open Source Club and the Entrepreneurship Cell."
  },
  {
    id: "ach-portfolio",
    type: "project",
    title: "Open Source macOS Portfolio",
    organization: "GitHub",
    startDate: "2026-03",
    endDate: "Present",
    description: "Built and open-sourced this macOS-style portfolio, showcasing advanced React, TypeScript, and animation skills.",
    link: "https://github.com/Awaneesh03/Awaneesh-portfolio"
  },
  {
    id: "ach-motif",
    type: "project",
    title: "Launched Motif Startup",
    organization: "Co-Founded",
    startDate: "2025-11",
    endDate: "2026-04",
    description: "Co-founded and launched an AI-powered founder–VC platform with a live production deployment.",
    link: "https://motif-website.vercel.app"
  },
  {
    id: "ach-osc-vp",
    type: "achievement",
    title: "Vice President — Open Source Club",
    organization: "Vedam School of Technology",
    startDate: "2025-10",
    endDate: "2026-05",
    description: "Helped run the campus Open Source Club, getting students contributing to real open-source projects."
  },
  {
    id: "ach-campusdash",
    type: "achievement",
    title: "Hackathon Build — CampusDash",
    organization: "Hackathon",
    startDate: "2025-11",
    endDate: "2025-11",
    description: "Built CampusDash, an on-campus instant delivery PWA where students deliver for students, using JavaScript and Supabase.",
    link: "https://github.com/Awaneesh03/hackathon"
  },
  {
    id: "ach-1",
    type: "achievement",
    title: "Hackathon Participant",
    organization: "Various Events",
    startDate: "2024",
    endDate: "2024",
    description: "Participated in hackathons to build projects under time pressure and collaborate with other developers."
  }
];

// Combined timeline for easy access
export const timeline = [...experience, ...education, ...achievements];

// Combined timeline sorted by start date (most recent first); ISO strings sort lexically
export const getFullTimeline = (): TimelineEntry[] =>
  [...timeline].sort((a, b) => b.startDate.localeCompare(a.startDate));

// "2025-11" -> "Nov 2025"; "2025" and "Present" pass through
export const formatTimelineDate = (date: string): string =>
  /^\d{4}-\d{2}$/.test(date)
    ? new Date(`${date}-01T00:00:00Z`).toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
    : date;

// Years since starting to build projects in 2024
export const getYearsOfExperience = (): number => {
  return new Date().getFullYear() - 2024;
};

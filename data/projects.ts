/**
 * Projects Configuration
 *
 * The project list is built from the live GitHub repos (see services/githubService.ts),
 * so a newly pushed public repo shows up automatically using its GitHub description and topics.
 * `projectOverrides` (keyed by repo name) customises copy/tags/flags per repo, and
 * `hiddenRepos` keeps repos out of "My Projects" (they still appear in the GitHub Repos tab).
 * If the GitHub API is unavailable, the overridden repos are shown on their own.
 */

import type { GitHubRepo } from '../services/githubService';
import { GITHUB_USERNAME } from './social';

export interface FeaturedProject {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  github?: string;
  backendRepo?: string;
  demo?: string;
  featured: boolean;
  hero?: boolean; // shown as a large card at the top of My Projects
  isStartup?: boolean;
  category: 'web' | 'mobile' | 'ai' | 'game' | 'tool' | 'startup' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  highlights?: string[];
  problemSolved?: string;
  architecture?: string[];
  updatedAt?: string;
}

const screenshot = (repo: string, path: string) =>
  `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo}/main/${path}`;

// Featured entries render in the order they are declared here.
export const projectOverrides: Record<string, Partial<FeaturedProject>> = {
  pacify: {
    name: "Pacify",
    hero: true,
    featured: true,
    category: "game",
    image: screenshot("pacify", "docs/menu.png"),
    description: "Browser-based 3D multiplayer hide-and-seek horror game — hunt the Wretch, or survive as it. Play solo against bots or with friends on LAN.",
    longDescription: "One player is the Wretch, hiding somewhere on the map; everyone else is a Hunter trying to corner it and pacify it before the round timer runs out. No accounts, no installs — just open a link, or pick Solo and play against AI bots in one click.",
    technologies: ["TypeScript", "Three.js", "Socket.io", "Node.js", "Express", "WebGL", "Vite"],
    problemSolved: "Real-time multiplayer where client prediction and server truth never drift apart, and a round is always playable even with no friends online.",
    architecture: [
      "Authoritative Node.js + Socket.io server steps physics at 20Hz and broadcasts state",
      "One shared stepPhysics() imported by client and server for prediction",
      "Three.js scene, player controller, entities and positional audio on the client",
      "Bots use the same physics and scoring code — only their input is AI-generated",
    ],
    highlights: [
      "Solo mode with AI bots",
      "Rotating roles & cross-round scoring",
      "Smoke test plays a real round over a socket",
    ],
  },
  "motif-website": {
    name: "Motif",
    hero: true,
    featured: true,
    isStartup: true,
    category: "startup",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    demo: "https://motif-website.vercel.app",
    description: "AI-powered platform that helps founders validate startup ideas and connect with VCs through an admin-curated pipeline.",
    longDescription: "Motif bridges early-stage founders and venture capitalists. Founders submit ideas and get AI feedback, admins vet submissions, and VCs browse only investment-ready startups and manage intro requests.",
    technologies: ["React", "TypeScript", "Supabase", "Groq", "TailwindCSS", "Vite", "Vercel"],
    problemSolved: "Founders struggle to reach the right investors while VCs drown in unvetted pitches — Motif adds a quality filter in between.",
    architecture: [
      "React 18 + TypeScript + Vite frontend styled with TailwindCSS",
      "Supabase Auth (Google OAuth) and Postgres for profiles, startups and intro requests",
      "Groq-hosted Llama 3.3 70B for idea scoring, market analysis and pitch tools",
      "Five-role access control (super admin, admin, founder, VC, pending VC) with protected routes",
    ],
    highlights: [
      "AI idea analysis & pitch creator",
      "Draft → review → approved-for-VC pipeline",
      "Live on Vercel",
    ],
  },
  serina: {
    name: "Serina",
    featured: true,
    category: "ai",
    image: screenshot("serina", "docs/serina-ui.png"),
    description: "Local-first voice AI assistant — offline Whisper speech-to-text, Llama 3 via Ollama and emotion-aware text-to-speech. Nothing leaves your machine.",
    technologies: ["Python", "FastAPI", "React", "Whisper", "Ollama", "Llama 3", "SSE"],
    highlights: [
      "Whisper + Llama 3 run fully on-device",
      "Replies voiced in 8 emotion profiles",
      "Hands-free mode with voice-activity detection",
      "Lighthouse accessibility 100/100",
    ],
  },
  vaultwork: {
    name: "Vaultwork",
    featured: true,
    category: "tool",
    description: "Local-first productivity system — tasks, goals, habits and notes backed by an Obsidian vault, with a Tauri desktop app and a Claude MCP server.",
    technologies: ["TypeScript", "React", "Tauri", "Rust", "IndexedDB", "Zustand", "MCP", "Vitest"],
    highlights: [
      "No backend, no account — data stays on device",
      "Layered architecture enforced by lint and tests",
      "Read-only MCP bridge for Claude Desktop",
    ],
  },
  "Awaneesh-portfolio": {
    name: "macOS Portfolio",
    featured: true,
    category: "web",
    description: "Interactive developer portfolio simulating the macOS desktop — draggable windows, dock magnification, Spotlight, terminal and a Gemini assistant.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Vite", "Gemini API"],
    highlights: [
      "Authentic macOS UI with glassmorphism",
      "Live GitHub API integration",
    ],
  },
  "digital-life-dashboard": {
    name: "Digital Life Dashboard",
    featured: true,
    category: "web",
    technologies: ["JavaScript", "Supabase", "Chart.js"],
  },
  "rando-guess": {
    name: "Rando Guess",
    category: "web",
    description: "Cinematic crime-noir app that randomly assigns case files — canvas particle effects, glitch-text reveals and a procedural Web Audio soundtrack.",
    technologies: ["JavaScript", "Canvas", "Web Audio API", "Vite"],
  },
  hackathon: { name: "CampusDash (Hackathon)" },
  Dashboard: { name: "StudyFlow" },
  "pokemon_game-": { name: "Pokémon Battle Game" },
  "harry-potter-website": { name: "Harry Potter Fan Site" },
};

// Coursework / profile repos kept out of the curated list.
export const hiddenRepos = ["Awaneesh03", "sem2", "WebDev-sem3", "Machine-learning-", "Backend"];

const prettify = (repoName: string) =>
  repoName.replace(/[-_]+/g, " ").trim().replace(/\b\w/g, c => c.toUpperCase());

const categoryFromTopics = (topics: string[]): FeaturedProject['category'] =>
  topics.includes("game") ? "game"
  : topics.some(t => ["ai", "machine-learning", "llm", "ollama"].includes(t)) ? "ai"
  : "web";

function toProject(name: string, repo?: GitHubRepo): FeaturedProject {
  const topics = repo?.topics ?? [];
  const base: FeaturedProject = {
    id: name,
    name: prettify(name),
    // GitHub descriptions start with an emoji; the cards have their own icons.
    description: (repo?.description ?? "").replace(/^\p{Extended_Pictographic}️?\s*/u, ""),
    technologies: [repo?.language, ...topics].filter((t): t is string => !!t),
    github: repo?.html_url ?? `https://github.com/${GITHUB_USERNAME}/${name}`,
    demo: repo?.homepage || undefined,
    featured: false,
    category: categoryFromTopics(topics),
    status: "completed",
    updatedAt: repo?.pushed_at,
  };
  return { ...base, ...projectOverrides[name] };
}

const overrideOrder = Object.keys(projectOverrides);

export function buildProjects(repos: GitHubRepo[]): FeaturedProject[] {
  const visible = repos.filter(r => !r.fork && !r.archived && !hiddenRepos.includes(r.name));
  const projects = visible.length
    ? visible.map(r => toProject(r.name, r))
    : overrideOrder.map(name => toProject(name));
  const rank = (p: FeaturedProject) => (p.featured ? overrideOrder.indexOf(p.id) : overrideOrder.length);
  return projects.sort((a, b) => rank(a) - rank(b) || (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
}

// Offline snapshot for places that render synchronously (terminal, widgets, Spotlight).
export const featuredProjects: FeaturedProject[] = buildProjects([]);

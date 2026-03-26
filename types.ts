import React from 'react';

export type SystemPhase = 'boot-splash' | 'boot-progress' | 'login' | 'desktop';

export interface AppConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  pinned: boolean;
  component?: React.ReactNode;
  width?: number;
  height?: number;
}

export interface WeatherData {
  temp: number;
  city: string;
  condition: string;
  forecast: { time: string; icon: string; temp: number }[];
}

export interface ReminderItem {
  id: string;
  text: string;
  completed: boolean;
}

// Portfolio Types
export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string;
  image: string;
  stars: number;
  featured: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'achievement';
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

export interface TerminalCommand {
  command: string;
  output: string | React.ReactNode;
}

// Browser types — see data/index.ts for BrowserSite
export type BrowserView = 'newtab' | 'youtube-player' | 'simulated' | 'blocked' | 'iframe';

export interface BrowserTab {
  id: string;
  url: string;
  displayUrl: string;
  title: string;
  history: string[];
  historyIndex: number;
  isLoading: boolean;
  favicon: string | null;
}


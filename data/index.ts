/**
 * Central Data Export
 * Import all portfolio data from this file
 */

export * from './profile';
export * from './skills';
export * from './experience';
export * from './projects';
export * from './social';

/**
 * Browser Data (NEW for Web Apps feature)
 */
export interface BrowserSite {
  name: string;
  url: string;
  icon: string;
  simulated?: boolean;
  color?: string;
}

export const BROWSER_BOOKMARKS: BrowserSite[] = [
  { name: 'YouTube',       url: 'https://www.youtube.com',          icon: '📺' },
  { name: 'Instagram',     url: 'https://instagram.com',            icon: '📸', simulated: true },
  { name: 'GitHub',        url: 'https://github.com',               icon: '🐙', simulated: true },
  { name: 'Stack Overflow',url: 'https://stackoverflow.com',        icon: '📚' },
  { name: 'MDN Docs',      url: 'https://developer.mozilla.org',    icon: '📖' },
  { name: 'ChatGPT',       url: 'https://chat.openai.com',          icon: '🤖' },
];

export const BROWSER_SHORTCUTS: BrowserSite[] = [
  { name: 'YouTube',   icon: '▶️', color: 'bg-red-600',    url: 'https://www.youtube.com' },
  { name: 'Instagram', icon: '📸', color: 'bg-purple-600', url: 'https://instagram.com',    simulated: true },
  { name: 'GitHub',    icon: '🐙', color: 'bg-gray-800',   url: 'https://github.com',       simulated: true },
  { name: 'LinkedIn',  icon: '💼', color: 'bg-blue-700',   url: 'https://linkedin.com',     simulated: true },
  { name: 'Twitter',   icon: '𝕏',  color: 'bg-black',      url: 'https://x.com',            simulated: true },
  { name: 'Google',    icon: '🔍', color: 'bg-white',      url: 'https://google.com',       simulated: true },
  { name: 'Wikipedia', icon: 'W',  color: 'bg-gray-600',   url: 'https://en.wikipedia.org' },
  { name: 'MDN',       icon: '📋', color: 'bg-indigo-700', url: 'https://developer.mozilla.org' },
];

// Domains that refuse iframe embedding (show "open in new tab" message instead)
export const BROWSER_BLOCKED_DOMAINS = [
  'facebook.com', 'reddit.com', 'amazon.com', 'netflix.com',
  'figma.com', 'notion.so', 'discord.com', 'slack.com',
  'apple.com', 'microsoft.com', 'bing.com', 'yahoo.com',
];


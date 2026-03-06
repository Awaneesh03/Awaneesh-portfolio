/**
 * GitHub API Service
 * Fetches real-time data from GitHub
 */

import { GITHUB_USERNAME } from '../data/social';

// Types
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  visibility: string;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  email: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; count: number; color: string }[];
  recentActivity: Date | null;
}

// Language colors for display
const languageColors: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Java: '#ED8B00',
  'C++': '#00599C',
  C: '#A8B9CC',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Ruby: '#CC342D',
  PHP: '#777BB4',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  HTML: '#E34F26',
  CSS: '#1572B6',
  SCSS: '#CC6699',
  Vue: '#4FC08D',
  Shell: '#89E051',
  Dart: '#0175C2',
};

// Cache for API responses
const cache: {
  repos: { data: GitHubRepo[] | null; timestamp: number };
  user: { data: GitHubUser | null; timestamp: number };
  stats: { data: GitHubStats | null; timestamp: number };
} = {
  repos: { data: null, timestamp: 0 },
  user: { data: null, timestamp: 0 },
  stats: { data: null, timestamp: 0 },
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Check if cache is valid
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * Fetch GitHub user profile
 */
export async function fetchGitHubUser(username: string = GITHUB_USERNAME): Promise<GitHubUser> {
  if (cache.user.data && isCacheValid(cache.user.timestamp)) {
    return cache.user.data;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    cache.user = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error);
    throw error;
  }
}

/**
 * Fetch GitHub repositories
 */
export async function fetchGitHubRepos(
  username: string = GITHUB_USERNAME,
  options: {
    excludeForks?: boolean;
    sortBy?: 'stars' | 'updated' | 'created';
    limit?: number;
  } = {}
): Promise<GitHubRepo[]> {
  const { excludeForks = true, sortBy = 'stars', limit = 100 } = options;

  if (cache.repos.data && isCacheValid(cache.repos.timestamp)) {
    let repos = [...cache.repos.data];
    
    if (excludeForks) {
      repos = repos.filter(repo => !repo.fork);
    }

    repos = sortRepos(repos, sortBy);
    return repos.slice(0, limit);
  }

  try {
    // Fetch up to 100 repos (max per page)
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    let repos: GitHubRepo[] = await response.json();
    cache.repos = { data: repos, timestamp: Date.now() };

    // Filter out forks if requested
    if (excludeForks) {
      repos = repos.filter(repo => !repo.fork);
    }

    // Filter out archived repos
    repos = repos.filter(repo => !repo.archived);

    // Sort repos
    repos = sortRepos(repos, sortBy);

    return repos.slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    throw error;
  }
}

/**
 * Sort repositories
 */
function sortRepos(repos: GitHubRepo[], sortBy: 'stars' | 'updated' | 'created'): GitHubRepo[] {
  switch (sortBy) {
    case 'stars':
      return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case 'updated':
      return repos.sort((a, b) => 
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );
    case 'created':
      return repos.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    default:
      return repos;
  }
}

/**
 * Calculate GitHub statistics
 */
export async function fetchGitHubStats(username: string = GITHUB_USERNAME): Promise<GitHubStats> {
  if (cache.stats.data && isCacheValid(cache.stats.timestamp)) {
    return cache.stats.data;
  }

  try {
    const repos = await fetchGitHubRepos(username, { excludeForks: true });

    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // Calculate total forks
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Calculate language distribution
    const languageCounts: Record<string, number> = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        count,
        color: languageColors[name] || '#858585',
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Get most recent activity
    const recentActivity = repos.length > 0 
      ? new Date(Math.max(...repos.map(r => new Date(r.pushed_at).getTime())))
      : null;

    const stats: GitHubStats = {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      topLanguages,
      recentActivity,
    };

    cache.stats = { data: stats, timestamp: Date.now() };
    return stats;
  } catch (error) {
    console.error('Failed to calculate GitHub stats:', error);
    throw error;
  }
}

/**
 * Clear the cache (useful for manual refresh)
 */
export function clearGitHubCache(): void {
  cache.repos = { data: null, timestamp: 0 };
  cache.user = { data: null, timestamp: 0 };
  cache.stats = { data: null, timestamp: 0 };
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

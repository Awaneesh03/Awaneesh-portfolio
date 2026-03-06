import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Star, GitBranch, Briefcase, RefreshCw, Github } from 'lucide-react';
import { getSkillCount } from '../../data/skills';
import { featuredProjects } from '../../data/projects';
import { getYearsOfExperience } from '../../data/experience';
import { GITHUB_USERNAME } from '../../data/social';
import { fetchGitHubStats, GitHubStats } from '../../services/githubService';

export const StatsWidget: React.FC = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGitHubStats();
  }, []);

  const loadGitHubStats = async () => {
    setIsLoading(true);
    try {
      const stats = await fetchGitHubStats(GITHUB_USERNAME);
      setGithubStats(stats);
    } catch (error) {
      console.error('Failed to load GitHub stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalSkills = getSkillCount();
  const totalProjects = featuredProjects.length;
  const yearsExp = getYearsOfExperience();

  const stats = [
    { 
      label: 'Repos', 
      value: isLoading ? '...' : (githubStats?.totalRepos || totalProjects), 
      icon: Code2, 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      label: 'Stars', 
      value: isLoading ? '...' : (githubStats?.totalStars || 0), 
      icon: Star, 
      color: 'from-yellow-500 to-orange-500' 
    },
    { 
      label: 'Skills', 
      value: totalSkills, 
      icon: GitBranch, 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      label: 'Experience', 
      value: `${yearsExp}+ yrs`, 
      icon: Briefcase, 
      color: 'from-purple-500 to-pink-500' 
    },
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col select-none text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50" />
      
      {/* Header */}
      <div className="relative z-10 mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white/90 flex items-center gap-2">
            <Github size={14} />
            Quick Stats
          </h3>
          <p className="text-xs text-white/50">Live from GitHub</p>
        </div>
        <button 
          onClick={loadGitHubStats}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <RefreshCw size={14} className={`text-white/50 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-2 flex-1">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex flex-col justify-between hover:bg-white/10 transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon size={16} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Language */}
      {githubStats && githubStats.topLanguages.length > 0 && (
        <div className="relative z-10 mt-2 pt-2 border-t border-white/10">
          <p className="text-xs text-white/50 mb-1">Top Language</p>
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: githubStats.topLanguages[0].color }}
            />
            <span className="text-sm font-medium">{githubStats.topLanguages[0].name}</span>
            <span className="text-xs text-white/40">({githubStats.topLanguages[0].count} repos)</span>
          </div>
        </div>
      )}
    </div>
  );
};

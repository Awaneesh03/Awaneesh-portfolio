import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, Star, GitFork, Search, 
  Grid3X3, List, RefreshCw, Sparkles, CheckCircle, 
  Rocket, Server, Globe, ArrowRight, Code2, Zap
} from 'lucide-react';
import { featuredProjects, buildProjects, FeaturedProject } from '../../data/projects';
import { GITHUB_USERNAME } from '../../data/social';
import { fetchGitHubRepos, GitHubRepo, formatRelativeTime, clearGitHubCache } from '../../services/githubService';

export const ProjectsApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'featured' | 'web' | 'ai' | 'game'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<FeaturedProject[]>(featuredProjects);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'github'>('projects');
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  // My Projects = live repos + overrides; keeps the offline snapshot if the API fails
  useEffect(() => {
    fetchGitHubRepos(GITHUB_USERNAME, { excludeForks: true })
      .then(repos => setProjects(buildProjects(repos)))
      .catch(error => console.error('Failed to fetch GitHub repos for projects:', error));
  }, []);

  // Fetch GitHub repos
  useEffect(() => {
    if (activeTab === 'github' && githubRepos.length === 0) {
      loadGitHubRepos();
    }
  }, [activeTab]);

  const loadGitHubRepos = async () => {
    setLoading(true);
    try {
      const repos = await fetchGitHubRepos(GITHUB_USERNAME, { 
        excludeForks: true, 
        sortBy: 'stars',
        limit: 12 
      });
      setGithubRepos(repos);
    } catch (error) {
      console.error('Failed to fetch GitHub repos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    clearGitHubCache();
    setGithubRepos([]);
    loadGitHubRepos();
  };

  const visibleProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ||
                          (filter === 'featured' && p.featured) ||
                          (p.category === filter);
    return matchesSearch && matchesFilter;
  });
  // Hero projects get the large card; the rest go in the grid
  const heroProjects = visibleProjects.filter(p => p.hero);
  const filteredProjects = visibleProjects.filter(p => !p.hero);

  const filteredRepos = githubRepos.filter(r => {
    return r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
  });

  // Language colors for display
  const languageColors: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3776AB',
    Java: '#ED8B00',
    'C++': '#00599C',
    Go: '#00ADD8',
    Rust: '#DEA584',
    HTML: '#E34F26',
    CSS: '#1572B6',
    Vue: '#4FC08D',
    Shell: '#89E051',
  };

  // ============================================
  // HERO PROJECT CARD - Prominent Display
  // ============================================
  const HeroCard: React.FC<{ project: FeaturedProject }> = ({ project }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-white/20 mb-6"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black text-xs font-bold shadow-lg">
          <Rocket size={14} />
          {project.isStartup ? 'Featured Startup Project' : 'Featured Project'}
        </div>
      </div>

      <div className="relative grid md:grid-cols-2 gap-6 p-6">
        {/* Left: Image & Quick Info */}
        <div className="space-y-4">
          <div className="aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
              >
                <Globe size={18} />
                View Live Demo
                <ArrowRight size={16} />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              <Github size={18} />
              {project.backendRepo ? 'Frontend' : 'View Code'}
            </a>
            {project.backendRepo && (
              <a
                href={project.backendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-colors"
              >
                <Server size={18} />
                Backend
              </a>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              {project.name}
              <Zap className="text-yellow-400" size={24} />
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Problem Solved */}
          {project.problemSolved && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Code2 size={14} />
                Problem Solved
              </h3>
              <p className="text-white/60 text-sm">{project.problemSolved}</p>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Server size={14} />
                Architecture
              </h3>
              <ul className="grid grid-cols-1 gap-1.5">
                {project.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 bg-white/10 rounded-lg text-sm font-medium text-white/80 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom highlights bar */}
      <div className="border-t border-white/10 px-6 py-3 bg-black/20 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {project.highlights?.map((h, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs text-white/50">
              <Sparkles size={12} className="text-yellow-400" />
              {h}
            </span>
          ))}
        </div>
        <span className="text-xs text-white/40 whitespace-nowrap">
          Status: <span className="text-green-400 font-medium capitalize">{project.status}</span>
        </span>
      </div>
    </motion.div>
  );

  // ============================================
  // PROJECT PREVIEW MODAL
  // ============================================
  const ProjectPreviewModal: React.FC<{ project: FeaturedProject; onClose: () => void }> = ({ project, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1e1e1e] border border-white/20 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="aspect-video relative">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 -mt-12 relative">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              <p className="text-white/60">{project.description}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
              project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights */}
          {project.highlights && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white/80">Key Features</h3>
              <ul className="space-y-1">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle size={12} className="text-green-400" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
              >
                <Github size={18} />
                View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // ============================================
  // PROJECT CARD - Regular Projects
  // ============================================
  const ProjectCard: React.FC<{ project: FeaturedProject; index: number }> = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
    >
      {/* Project Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {project.category === 'web' ? '🌐' : project.category === 'ai' ? '🤖' : project.category === 'game' ? '🎮' : project.category === 'mobile' ? '📱' : '💻'}
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-yellow-500/90 rounded-full text-xs font-bold text-black">
            <Sparkles size={12} />
            Featured
          </div>
        )}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
          project.status === 'completed' ? 'bg-green-500/80 text-white' :
          project.status === 'in-progress' ? 'bg-blue-500/80 text-white' :
          'bg-gray-500/80 text-white'
        }`}>
          {project.status === 'completed' && <CheckCircle size={12} className="inline mr-1" />}
          {project.status}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Hover Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/90 text-black rounded-lg text-sm font-medium hover:bg-white transition-colors"
            >
              <Github size={16} />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
            {project.name}
          </h3>
          <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/60 capitalize">
            {project.category === 'ai' ? 'AI' : project.category}
          </span>
        </div>
        
        <p className="text-white/60 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-3 space-y-1">
            {project.highlights.slice(0, 2).map((highlight, i) => (
              <p key={i} className="text-xs text-green-400/80 flex items-center gap-1">
                <CheckCircle size={10} />
                {highlight}
              </p>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span 
              key={i}
              className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/50">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  const GitHubRepoCard: React.FC<{ repo: GitHubRepo; index: number }> = ({ repo, index }) => (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-white/[0.07] transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
          <Github size={16} />
          {repo.name}
        </h3>
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={14} className="text-blue-400" />
            {repo.forks_count}
          </span>
        </div>
      </div>
      
      <p className="text-white/60 text-sm mb-3 line-clamp-2">
        {repo.description || 'No description available'}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {repo.language && (
            <span className="flex items-center gap-1.5 text-xs text-white/70">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: languageColors[repo.language] || '#858585' }}
              />
              {repo.language}
            </span>
          )}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex gap-1">
              {repo.topics.slice(0, 2).map(topic => (
                <span key={topic} className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="text-xs text-white/40">
          {formatRelativeTime(repo.pushed_at)}
        </span>
      </div>
    </motion.a>
  );

  return (
    <div className="h-full bg-[#1e1e1e] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/10 bg-[#252525]">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 pt-3">
          {['projects', 'github'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors capitalize ${
                activeTab === tab 
                  ? 'bg-[#1e1e1e] text-white' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab === 'github' ? 'GitHub Repos' : 'My Projects'}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e]">
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {activeTab === 'projects' && (
              <>
                <div className="flex bg-white/5 rounded-lg p-0.5">
                  {(['all', 'featured', 'web', 'ai', 'game'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                        filter === f ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white/80'
                      }`}
                    >
                      {f === 'ai' ? 'AI' : f}
                    </button>
                  ))}
                </div>

                <div className="w-px h-6 bg-white/10" />
              </>
            )}

            <div className="flex bg-white/5 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/60'
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/60'
                }`}
              >
                <List size={16} />
              </button>
            </div>

            {activeTab === 'github' && (
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Projects - shown first */}
              {heroProjects.map(project => (
                <HeroCard key={project.id} project={project} />
              ))}

              {/* Regular Projects Grid */}
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-2 lg:grid-cols-3 gap-4' 
                : 'flex flex-col gap-4'
              }>
                {filteredProjects.map((project, index) => (
                  <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer">
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </div>
              
              {visibleProjects.length === 0 && (
                <div className="text-center py-12 text-white/40">
                  No projects found matching your criteria
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="github"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-2 lg:grid-cols-3 gap-4' 
                : 'flex flex-col gap-4'
              }
            >
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-400 mb-3" />
                  <p className="text-white/40">Loading repositories...</p>
                </div>
              ) : filteredRepos.length > 0 ? (
                filteredRepos.map((repo, index) => (
                  <GitHubRepoCard key={repo.id} repo={repo} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-white/40">
                  No repositories found
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <div className="flex-shrink-0 px-6 py-3 border-t border-white/10 bg-[#252525] flex items-center justify-between text-sm text-white/60">
        <span>
          {activeTab === 'projects' 
            ? `${visibleProjects.length} projects`
            : `${filteredRepos.length} repositories`
          }
        </span>
        {activeTab === 'github' && (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400" />
              {filteredRepos.reduce((acc, r) => acc + r.stargazers_count, 0)} stars
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={14} className="text-blue-400" />
              {filteredRepos.reduce((acc, r) => acc + r.forks_count, 0)} forks
            </span>
          </div>
        )}
      </div>

      {/* Project Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectPreviewModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

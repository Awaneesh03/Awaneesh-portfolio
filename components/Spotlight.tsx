import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Briefcase, Code, Mail, ExternalLink, FileText, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO } from '../constants';
import { featuredProjects } from '../data/projects';
import { skillCategories } from '../data/skills';

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export const Spotlight: React.FC<SpotlightProps> = ({ isOpen, onClose, onOpenApp }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define all searchable items
  const allResults = useMemo<SearchResult[]>(() => [
    {
      id: 'about',
      title: 'About Me',
      category: 'Apps',
      icon: <User size={18} className="text-blue-400" />,
      action: () => { onOpenApp('about'); onClose(); },
    },
    {
      id: 'projects',
      title: 'Projects',
      category: 'Apps',
      icon: <Briefcase size={18} className="text-purple-400" />,
      action: () => { onOpenApp('projects'); onClose(); },
    },
    {
      id: 'skills',
      title: 'Skills',
      category: 'Apps',
      icon: <Code size={18} className="text-green-400" />,
      action: () => { onOpenApp('skills'); onClose(); },
    },
    {
      id: 'experience',
      title: 'Experience',
      category: 'Apps',
      icon: <FileText size={18} className="text-orange-400" />,
      action: () => { onOpenApp('experience'); onClose(); },
    },
    {
      id: 'terminal',
      title: 'Terminal',
      category: 'Apps',
      icon: <div className="w-[18px] h-[18px] bg-black rounded text-[10px] flex items-center justify-center text-green-400 font-mono">$</div>,
      action: () => { onOpenApp('terminal'); onClose(); },
    },
    {
      id: 'email',
      title: `Email ${PORTFOLIO.name}`,
      category: 'Actions',
      icon: <Mail size={18} className="text-red-400" />,
      action: () => { window.open(`mailto:${PORTFOLIO.email}`, '_blank'); onClose(); },
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      category: 'Links',
      icon: <Github size={18} className="text-white" />,
      action: () => { window.open(PORTFOLIO.github, '_blank'); onClose(); },
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      category: 'Links',
      icon: <Linkedin size={18} className="text-blue-500" />,
      action: () => { window.open(PORTFOLIO.linkedin, '_blank'); onClose(); },
    },
    {
      id: 'resume',
      title: 'Download Resume',
      category: 'Actions',
      icon: <FileText size={18} className="text-amber-400" />,
      action: () => { window.open(PORTFOLIO.resume, '_blank'); onClose(); },
    },
    // Add projects as searchable
    ...featuredProjects.map(project => ({
      id: `project-${project.id}`,
      title: project.name,
      category: 'Projects',
      icon: <ExternalLink size={18} className="text-cyan-400" />,
      action: () => { 
        if (project.demo) window.open(project.demo, '_blank');
        else if (project.github) window.open(project.github, '_blank');
        onClose(); 
      },
    })),
    // Add skills as searchable
    ...skillCategories.flatMap(category =>
      category.skills.map(skill => ({
        id: `skill-${skill.name}`,
        title: skill.name,
        category: `Skills - ${category.name}`,
        icon: <Code size={18} className="text-emerald-400" />,
        action: () => { onOpenApp('skills'); onClose(); },
      }))
    ),
  ], [onOpenApp, onClose]);

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      // Show top apps when no query
      return allResults.slice(0, 6);
    }
    const lowerQuery = query.toLowerCase();
    return allResults.filter(
      result => 
        result.title.toLowerCase().includes(lowerQuery) ||
        result.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }, [query, allResults]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredResults.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredResults[selectedIndex]) {
            filteredResults[selectedIndex].action();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  // Group results by category
  const groupedResults = useMemo((): Record<string, SearchResult[]> => {
    const groups: Record<string, SearchResult[]> = {};
    filteredResults.forEach(result => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [filteredResults]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          
          {/* Spotlight Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ 
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-[640px] z-[101]"
          >
            <div className="bg-[#1e1e1e]/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-4 px-5 py-4 border-b border-white/10">
                <Search size={22} className="text-white/40 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search apps, projects, skills..."
                  className="flex-1 bg-transparent text-white text-lg placeholder-white/40 outline-none"
                  autoFocus
                />
                <kbd className="hidden sm:flex items-center gap-1 text-xs text-white/30 bg-white/5 px-2 py-1 rounded border border-white/10">
                  <span className="text-sm">⌘</span>Space
                </kbd>
              </div>
              
              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {filteredResults.length === 0 ? (
                  <div className="px-5 py-8 text-center text-white/40">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="py-2">
                    {(Object.entries(groupedResults) as [string, SearchResult[]][]).map(([category, results]) => (
                      <div key={category}>
                        <div className="px-5 py-2 text-xs font-medium text-white/40 uppercase tracking-wider">
                          {category}
                        </div>
                        {results.map((result) => {
                          const globalIndex = filteredResults.indexOf(result);
                          return (
                            <motion.button
                              key={result.id}
                              onClick={result.action}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                                globalIndex === selectedIndex 
                                  ? 'bg-blue-500/20' 
                                  : 'hover:bg-white/5'
                              }`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: globalIndex * 0.03 }}
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                {result.icon}
                              </div>
                              <span className="text-white/90 text-[15px]">{result.title}</span>
                              {globalIndex === selectedIndex && (
                                <kbd className="ml-auto text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded">
                                  ↵
                                </kbd>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/30">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/5 px-1.5 py-0.5 rounded">↑</kbd>
                    <kbd className="bg-white/5 px-1.5 py-0.5 rounded">↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/5 px-1.5 py-0.5 rounded">↵</kbd>
                    Open
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="bg-white/5 px-1.5 py-0.5 rounded">esc</kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

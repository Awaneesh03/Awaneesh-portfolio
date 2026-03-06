import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Mail, Github, Linkedin, Download, ExternalLink,
  GraduationCap, Briefcase, Code2, User, Award, Star, GitFork
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { socialLinks, contactInfo, GITHUB_USERNAME } from '../../data/social';
import { skillCategories, getTopSkills } from '../../data/skills';
import { fetchGitHubStats, GitHubStats } from '../../services/githubService';

type TabType = 'profile' | 'education' | 'technologies' | 'stats';

export const AboutMeApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'stats') {
      setIsLoading(true);
      fetchGitHubStats(GITHUB_USERNAME)
        .then(setGithubStats)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [activeTab]);

  const tabs = [
    { id: 'profile' as const, icon: User, label: 'Profile' },
    { id: 'education' as const, icon: GraduationCap, label: 'Education' },
    { id: 'technologies' as const, icon: Code2, label: 'Technologies' },
    { id: 'stats' as const, icon: Github, label: 'GitHub Stats' },
  ];

  return (
    <div className="h-full bg-[#1e1e1e] text-white overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-56 bg-[#252525] border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h2 className="font-semibold text-sm text-white/60 uppercase tracking-wider">About Me</h2>
        </div>
        
        <nav className="flex-1 p-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === item.id ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5 text-white/70'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Profile Header */}
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-4">
                    <img 
                      src={profileData.avatar} 
                      alt={profileData.name}
                      className="w-32 h-32 rounded-full border-4 border-blue-500/30 shadow-2xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#1e1e1e] flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-1">{profileData.name}</h1>
                  <p className="text-lg text-blue-400 font-medium mb-2">{profileData.title}</p>
                  <p className="text-white/60 text-sm mb-3 italic">"{profileData.tagline}"</p>
                  <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                    <MapPin size={14} />
                    <span>{profileData.location}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mb-8">
                  {socialLinks.map((link, i) => (
                    <motion.a 
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:scale-105"
                      style={{ borderColor: `${link.color}30` }}
                    >
                      <span className="text-sm">{link.name}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Bio */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User size={18} className="text-blue-400" />
                    About
                  </h3>
                  <p className="text-white/80 leading-relaxed">{profileData.bio}</p>
                </div>

                {/* Contact Info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Mail size={18} className="text-purple-400" />
                    Contact
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-white/50">Email:</span> <span className="text-blue-400">{contactInfo.email}</span></p>
                    <p><span className="text-white/50">Location:</span> {contactInfo.location}</p>
                    <p><span className="text-white/50">Timezone:</span> {contactInfo.timezone}</p>
                    <p><span className="text-white/50">Availability:</span> <span className="text-green-400">{contactInfo.availability}</span></p>
                  </div>
                </div>

                {/* Resume Download */}
                <div className="text-center">
                  <a
                    href={profileData.resume}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                  >
                    <Download size={20} />
                    Download Resume
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <GraduationCap className="text-green-400" />
                  Education & Certifications
                </h2>
                
                {/* Education */}
                <div className="space-y-4 mb-8">
                  {profileData.education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-6"
                    >
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap size={24} className="text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{edu.degree}</h4>
                          <p className="text-white/60 text-sm">{edu.institution}</p>
                          <p className="text-white/40 text-xs mt-1">{edu.year} • {edu.location}</p>
                          {edu.gpa && <p className="text-blue-400 text-sm mt-1">GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Certifications */}
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="text-yellow-400" />
                  Certifications
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {profileData.certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-4"
                    >
                      <Award size={20} className="text-yellow-400" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{cert.name}</p>
                        <p className="text-white/50 text-xs">{cert.issuer} • {cert.year}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'technologies' && (
              <motion.div
                key="technologies"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Code2 className="text-purple-400" />
                  Tech Stack
                </h2>
                
                {skillCategories.map((category, catIdx) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIdx * 0.1 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </h3>
                    <div className="space-y-3">
                      {category.skills.map((skill, i) => (
                        <div key={skill.name} className="group">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center gap-2">
                              <span>{skill.icon}</span>
                              {skill.name}
                            </span>
                            <span className="text-white/50">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ delay: catIdx * 0.1 + i * 0.05, duration: 0.8 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: skill.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Github className="text-white" />
                  GitHub Statistics
                </h2>
                
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
                        <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
                        <div className="h-16 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>
                ) : githubStats ? (
                  <div className="space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-blue-400">{githubStats.totalRepos}</div>
                        <div className="text-white/50 text-sm">Repositories</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star size={20} className="text-yellow-400" />
                          <span className="text-3xl font-bold text-yellow-400">{githubStats.totalStars}</span>
                        </div>
                        <div className="text-white/50 text-sm">Stars</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <GitFork size={20} className="text-green-400" />
                          <span className="text-3xl font-bold text-green-400">{githubStats.totalForks}</span>
                        </div>
                        <div className="text-white/50 text-sm">Forks</div>
                      </div>
                    </div>

                    {/* Top Languages */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="font-semibold mb-4">Top Languages</h3>
                      <div className="space-y-3">
                        {githubStats.topLanguages.map((lang, i) => (
                          <div key={lang.name}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                                {lang.name}
                              </span>
                              <span className="text-white/50">{lang.count} repos</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(lang.count / githubStats.totalRepos) * 100}%` }}
                                transition={{ delay: i * 0.1 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: lang.color }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    {githubStats.recentActivity && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="font-semibold mb-2">Recent Activity</h3>
                        <p className="text-white/60 text-sm">
                          Last pushed: {githubStats.recentActivity.toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-colors"
                    >
                      <Github size={20} />
                      View Full Profile on GitHub
                      <ExternalLink size={16} />
                    </a>
                  </div>
                ) : (
                  <div className="text-center text-white/50 py-12">
                    Failed to load GitHub stats. Check your connection.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

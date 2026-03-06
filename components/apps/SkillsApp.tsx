import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Server, Wrench, FileCode, ChevronRight,
  Sparkles, TrendingUp, Award
} from 'lucide-react';
import { skillCategories, getSkillCount, getTopSkills } from '../../data/skills';
import { getYearsOfExperience } from '../../data/experience';

export const SkillsApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);

  const activeSkillCategory = skillCategories.find(c => c.name === activeCategory);
  const totalSkills = getSkillCount();
  const yearsExp = getYearsOfExperience();
  const topSkills = getTopSkills(3);

  // Map category names to gradient colors
  const categoryColors: Record<string, string> = {
    'Frontend': 'from-blue-500 to-cyan-500',
    'Backend': 'from-green-500 to-emerald-500',
    'Tools & DevOps': 'from-purple-500 to-pink-500',
    'Languages': 'from-orange-500 to-red-500',
  };

  // Map category names to icons
  const categoryIcons: Record<string, React.ElementType> = {
    'Frontend': Code2,
    'Backend': Server,
    'Tools & DevOps': Wrench,
    'Languages': FileCode,
  };

  return (
    <div className="h-full bg-[#1e1e1e] text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#252525] border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={20} />
            My Skills
          </h2>
          <p className="text-white/50 text-sm mt-1">Technologies I work with</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.name] || Code2;
            const color = categoryColors[category.name] || 'from-gray-500 to-gray-600';
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r ' + color + ' text-white shadow-lg'
                    : 'hover:bg-white/5 text-white/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === category.name 
                      ? 'bg-white/20' 
                      : 'bg-white/10'
                  }`}>
                    {category.skills.length}
                  </span>
                  <ChevronRight size={16} className={`transition-transform ${
                    activeCategory === category.name ? 'rotate-90' : ''
                  }`} />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Stats */}
        <div className="p-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">{totalSkills}</div>
              <div className="text-xs text-white/50">Total Skills</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{yearsExp}+</div>
              <div className="text-xs text-white/50">Years Exp</div>
            </div>
          </div>
          
          {/* Top Skills */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/50 mb-2">Top Skills</p>
            <div className="flex flex-wrap gap-1">
              {topSkills.map(skill => (
                <span key={skill.name} className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                  {skill.icon} {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <AnimatePresence mode="wait">
          {activeSkillCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryColors[activeSkillCategory.name] || 'from-gray-500 to-gray-600'} flex items-center justify-center shadow-lg text-3xl`}>
                  {activeSkillCategory.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{activeSkillCategory.name}</h1>
                  <p className="text-white/50">
                    {activeSkillCategory.skills.length} technologies
                  </p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-4">
                {activeSkillCategory.skills.map((skill, index) => {
                  const level = skill.level;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          {skill.name}
                        </h3>
                        <span className="text-sm text-white/60">{level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${level}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>

                      {/* Skill Level Label */}
                      <div className="mt-2 flex items-center gap-2">
                        {level >= 90 ? (
                          <span className="flex items-center gap-1 text-xs text-yellow-400">
                            <Award size={12} />
                            Expert
                          </span>
                        ) : level >= 75 ? (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <TrendingUp size={12} />
                            Advanced
                          </span>
                        ) : (
                          <span className="text-xs text-white/40">Intermediate</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

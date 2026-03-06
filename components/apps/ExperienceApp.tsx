import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Briefcase, Award, Calendar,
  ChevronLeft, ChevronRight, MapPin
} from 'lucide-react';
import { PORTFOLIO } from '../../constants';

export const ExperienceApp: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'education' | 'work' | 'achievement'>('all');
  
  const timeline = PORTFOLIO.timeline;
  
  const filteredTimeline = timeline.filter(item => 
    filter === 'all' || item.type === filter
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return GraduationCap;
      case 'work': return Briefcase;
      case 'achievement': return Award;
      default: return Calendar;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'education': return 'from-blue-500 to-cyan-500';
      case 'work': return 'from-green-500 to-emerald-500';
      case 'achievement': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'education': return 'border-blue-500/50';
      case 'work': return 'border-green-500/50';
      case 'achievement': return 'border-yellow-500/50';
      default: return 'border-gray-500/50';
    }
  };

  return (
    <div className="h-full bg-[#1e1e1e] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-white/10 bg-[#252525]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">My Journey</h1>
            <p className="text-white/50 text-sm">Education, experience & achievements</p>
          </div>
          
          <div className="flex items-center gap-2 text-white/60">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium">2020 - Present</span>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All', icon: Calendar },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'work', label: 'Work', icon: Briefcase },
            { id: 'achievement', label: 'Achievements', icon: Award },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as typeof filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === item.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-yellow-500 opacity-30" />
          
          <AnimatePresence mode="popLayout">
            <div className="space-y-6">
              {filteredTimeline.map((item, index) => {
                const Icon = getIcon(item.type);
                return (
                  <motion.div
                    key={`${item.year}-${item.title}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex gap-6 group"
                  >
                    {/* Timeline Node */}
                    <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${getColor(item.type)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className="text-white" />
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 bg-white/5 border ${getBorderColor(item.type)} border-l-2 rounded-xl p-5 hover:bg-white/[0.07] transition-all`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                            item.type === 'education' ? 'bg-blue-500/20 text-blue-400' :
                            item.type === 'work' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        </div>
                        <span className="text-white/40 text-sm font-mono bg-white/5 px-2 py-1 rounded">
                          {item.year}
                        </span>
                      </div>
                      
                      <p className="text-white/60 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {filteredTimeline.length === 0 && (
            <div className="text-center py-12 text-white/40">
              No items found for this filter
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex-shrink-0 p-4 border-t border-white/10 bg-[#252525]">
        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">
              {timeline.filter(t => t.type === 'education').length}
            </div>
            <div className="text-xs text-white/50">Education</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">
              {timeline.filter(t => t.type === 'work').length}
            </div>
            <div className="text-xs text-white/50">Work</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">
              {timeline.filter(t => t.type === 'achievement').length}
            </div>
            <div className="text-xs text-white/50">Achievements</div>
          </div>
        </div>
      </div>
    </div>
  );
};

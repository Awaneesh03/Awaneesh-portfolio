
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { AppConfig } from '../types';

interface LaunchpadProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppConfig[];
  onAppClick: (appId: string) => void;
}

export const Launchpad: React.FC<LaunchpadProps> = ({ isOpen, onClose, apps, onAppClick }) => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchText.toLowerCase()) && 
    app.id !== 'launchpad'
  );

  // Focus search on open
  useEffect(() => {
    if (isOpen) {
      setSearchText('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-16 overflow-hidden"
          onClick={onClose}
        >
          {/* Blur Background */}
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-2xl"
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(30px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
          />

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center">
            {/* Search Bar */}
            <motion.div 
              initial={{ y: -30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative w-72 mb-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-10 text-white placeholder-white/40 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all text-center placeholder:text-center focus:placeholder-transparent focus:text-left backdrop-blur-sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                {searchText && (
                  <button 
                    onClick={() => setSearchText('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </motion.div>

            {/* App Grid */}
            <motion.div 
              className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-10 max-w-5xl px-8 overflow-y-auto max-h-[calc(100vh-200px)] pb-20"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {filteredApps.length === 0 ? (
                <motion.div 
                  className="col-span-full text-center text-white/50 py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-lg">No apps found for "{searchText}"</p>
                </motion.div>
              ) : (
                filteredApps.map((app, index) => (
                  <motion.button
                    key={app.id}
                    initial={{ scale: 0.5, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ 
                      delay: 0.02 * index, 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 25 
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onAppClick(app.id);
                      onClose();
                    }}
                    className="flex flex-col items-center gap-2 group focus:outline-none"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] overflow-hidden shadow-2xl relative">
                      {React.cloneElement(app.icon as React.ReactElement<any>, { className: 'w-full h-full object-cover' })}
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none" style={{ height: '40%' }} />
                    </div>
                    <span className="text-white font-medium text-xs sm:text-sm tracking-wide drop-shadow-lg text-center max-w-[80px] truncate">
                      {app.name}
                    </span>
                  </motion.button>
                ))
              )}
            </motion.div>
            
            {/* Pagination Dots */}
            <motion.div 
              className="absolute bottom-6 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
              <div className="w-2 h-2 bg-white/30 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

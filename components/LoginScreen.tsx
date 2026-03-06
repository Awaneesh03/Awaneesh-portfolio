
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ASSETS, USER_NAME, PORTFOLIO } from '../constants';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';
import { ParticleBackground, GradientOrbs } from './ParticleBackground';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [time, setTime] = useState(new Date());
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onLogin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onLogin]);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-black">
      {/* Live Wallpaper with Ken Burns */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ 
          scale: { duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          opacity: { duration: 1.5 }
        }}
        className="absolute inset-0 bg-cover bg-center transform-gpu"
        style={{ backgroundImage: `url(${ASSETS.WALLPAPER})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      
      {/* Animated Gradient Orbs */}
      <GradientOrbs />
      
      {/* Particle Effect */}
      <ParticleBackground count={40} color="rgba(255, 255, 255, 0.3)" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-[12vh]"
      >
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Clock */}
          <motion.div 
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.h1 
              className="text-[96px] font-light text-white tracking-tight leading-none"
              style={{ 
                textShadow: '0 4px 30px rgba(0,0,0,0.3), 0 0 60px rgba(255,255,255,0.1)',
              }}
            >
              {format(time, 'HH:mm')}
            </motion.h1>
            <motion.h2 
              className="text-2xl font-medium text-white/80 mt-3 tracking-wide"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              {format(time, 'EEEE, d MMMM')}
            </motion.h2>
          </motion.div>

          {/* User Profile */}
          <motion.div 
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.button
              onClick={onLogin}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative focus:outline-none group"
              aria-label="Log in"
            >
              {/* Glow ring */}
              <motion.div 
                className="absolute -inset-3 rounded-full"
                animate={{ 
                  boxShadow: isHovering 
                    ? '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)' 
                    : '0 0 20px rgba(255,255,255,0.1)'
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Avatar */}
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl relative">
                <img 
                  src={ASSETS.LOGIN_AVATAR} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
                
                {/* Hover overlay */}
                <motion.div 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovering ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={32} className="text-white" />
                </motion.div>
              </div>
              
              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute -right-1 -top-1"
                animate={{ 
                  opacity: isHovering ? 1 : 0,
                  rotate: isHovering ? 180 : 0,
                  scale: isHovering ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles size={20} className="text-yellow-300" />
              </motion.div>
            </motion.button>

            <div className="text-center">
              <motion.h3 
                className="text-2xl font-semibold text-white"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              >
                {PORTFOLIO.name}
              </motion.h3>
              <motion.p 
                className="text-sm text-white/60 mt-2 max-w-[250px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {PORTFOLIO.title}
              </motion.p>
              <motion.p 
                className="text-xs text-white/50 mt-4 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Lock className="w-3 h-3" />
                Click or Press Enter
              </motion.p>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Navigation */}
        <motion.div 
          className="absolute bottom-10 flex flex-col items-center text-white/50 text-sm gap-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex gap-6">
            <motion.a 
              href={`https://github.com/${PORTFOLIO.github}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl shadow-lg border border-white/10 group-hover:border-white/30 group-hover:bg-white/20 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
            </motion.a>
            
            <motion.a 
              href={PORTFOLIO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl shadow-lg border border-white/10 group-hover:border-white/30 group-hover:bg-white/20 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
            </motion.a>
            
            <motion.a 
              href={`mailto:${PORTFOLIO.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl shadow-lg border border-white/10 group-hover:border-white/30 group-hover:bg-white/20 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

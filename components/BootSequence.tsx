import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../constants';
import { SystemPhase } from '../types';

interface BootSequenceProps {
  phase: SystemPhase;
  onComplete: () => void;
}

// Generate floating particles for premium effect
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));
};

export const BootSequence: React.FC<BootSequenceProps> = ({ phase, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const particles = useMemo(() => generateParticles(30), []);

  useEffect(() => {
    if (phase === 'boot-progress') {
      const duration = 2500;
      const interval = 16;
      const steps = duration / interval;
      const increment = 100 / steps;

      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 400);
            return 100;
          }
          // Ease-out effect for more realistic feel
          const remaining = 100 - prev;
          const step = Math.max(increment, remaining * 0.05);
          return Math.min(prev + step, 100);
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {/* Boot Splash (Just Logo) */}
      {phase === 'boot-splash' && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Subtle radial gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-gray-900/50 via-black to-black" />
          
          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white/20"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          <motion.img 
            src={ASSETS.APPLE_LOGO} 
            alt="Apple Logo" 
            className="w-28 h-28 object-contain brightness-200 relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}

      {/* Boot Progress */}
      {phase === 'boot-progress' && (
        <motion.div
          key="progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Ambient glow behind logo */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.img 
            src={ASSETS.APPLE_LOGO} 
            alt="Apple Logo" 
            className="w-28 h-28 mb-20 object-contain brightness-200 relative z-10"
            animate={{ 
              filter: ['brightness(2)', 'brightness(2.2)', 'brightness(2)'],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Premium progress bar */}
          <div className="relative w-72">
            {/* Track */}
            <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              {/* Fill with glow */}
              <motion.div 
                className="h-full rounded-full relative"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,1))',
                  boxShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)',
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
            
            {/* Progress percentage */}
            <motion.p
              className="text-white/40 text-xs mt-4 text-center font-medium tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress < 100 ? 'Loading your portfolio...' : 'Welcome'}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
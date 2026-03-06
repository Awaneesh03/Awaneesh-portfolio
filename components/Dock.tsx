
import React, { memo, useRef, useState, useCallback } from 'react';
import { motion, Reorder, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { AppConfig } from '../types';

interface DockProps {
  apps: AppConfig[];
  onAppClick: (id: string) => void;
  onReorder: (newOrder: AppConfig[]) => void;
}

export const Dock: React.FC<DockProps> = ({ apps, onAppClick, onReorder }) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  const firstRecentIndex = apps.findIndex(app => !app.pinned && app.id !== 'trash');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <motion.div 
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 260,
          damping: 25,
          delay: 0.3,
        }}
        className="pointer-events-auto glass-dock rounded-2xl px-3 pb-2 pt-2 flex items-end relative"
      >
        {/* Enhanced glow effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ 
            boxShadow: isHovered 
              ? '0 0 80px rgba(255,255,255,0.2), 0 20px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(255,255,255,0.05)' 
              : '0 0 40px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.3)'
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        
        {/* Premium top highlight line */}
        <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        
        {/* Subtle bottom reflection */}
        <div className="absolute -bottom-4 left-8 right-8 h-4 bg-gradient-to-b from-white/5 to-transparent blur-sm rounded-b-full" />
        
        <Reorder.Group 
          axis="x" 
          values={apps} 
          onReorder={onReorder}
          className="flex items-end gap-1"
        >
          {apps.map((app, index) => (
            <React.Fragment key={app.id}>
              {/* Divider before Recent Apps */}
              {index === firstRecentIndex && index > 0 && (
                <motion.div 
                  className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-1.5 self-center" 
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.5 + index * 0.02 }}
                />
              )}
              
              {/* Divider before Trash */}
              {app.id === 'trash' && index > 0 && (
                <motion.div 
                  className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-1.5 self-center"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.5 + index * 0.02 }}
                />
              )}

              <DockIcon 
                app={app} 
                onClick={() => onAppClick(app.id)} 
                mouseX={mouseX}
                index={index}
                totalApps={apps.length}
              />
            </React.Fragment>
          ))}
        </Reorder.Group>
      </motion.div>
    </div>
  );
};

interface DockIconProps {
  app: AppConfig;
  onClick: () => void;
  mouseX: number | null;
  index: number;
  totalApps: number;
}

const DockIcon: React.FC<DockIconProps> = memo(({ app, onClick, mouseX, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isBouncing, setIsBouncing] = useState(false);
  const y = useMotionValue(0);

  // Enhanced magnification settings
  const baseSize = 52;
  const maxScale = 1.8;
  const maxDistance = 200;

  // Smoother spring config for premium feel
  const springConfig = { mass: 0.08, stiffness: 250, damping: 12 };
  
  const scale = useSpring(1, springConfig);
  const translateY = useSpring(0, springConfig);

  React.useEffect(() => {
    if (mouseX === null || !ref.current) {
      scale.set(1);
      translateY.set(0);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const dockRect = ref.current.closest('.pointer-events-auto')?.getBoundingClientRect();
    
    if (!dockRect) return;

    const relativeIconCenter = iconCenterX - dockRect.left;
    const distance = Math.abs(mouseX - relativeIconCenter);
    
    if (distance < maxDistance) {
      // Premium smooth falloff using sine easing
      const progress = 1 - distance / maxDistance;
      const smoothProgress = Math.sin(progress * Math.PI / 2);
      const scaleValue = 1 + (maxScale - 1) * smoothProgress;
      const yValue = -((scaleValue - 1) * baseSize * 0.55);
      scale.set(scaleValue);
      translateY.set(yValue);
    } else {
      scale.set(1);
      translateY.set(0);
    }
  }, [mouseX, scale, translateY]);

  const handleClick = useCallback(() => {
    // Trigger enhanced bounce animation
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 800);
    onClick();
  }, [onClick]);

  return (
    <Reorder.Item 
      value={app} 
      id={app.id} 
      style={{ y }} 
      layout
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      dragMomentum={false}
      dragElastic={0.1}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        delay: index * 0.04 + 0.3 // Staggered appearance
      }}
      className="relative group flex flex-col items-center justify-end"
    >
      <div ref={ref} className="flex flex-col items-center gap-1.5">
        {/* Premium Tooltip */}
        <AnimatePresence>
          <motion.div 
            className="absolute -top-14 opacity-0 group-hover:opacity-100 pointer-events-none z-50"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-[#1a1a1a]/95 backdrop-blur-2xl text-white text-[13px] px-4 py-2 rounded-lg border border-white/10 whitespace-nowrap font-medium"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' }}>
              {app.name}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1a1a]/95 rotate-45 border-r border-b border-white/10" />
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          style={{ 
            scale, 
            y: translateY,
          }}
          animate={isBouncing ? {
            y: [0, -30, 0, -18, 0, -8, 0, -3, 0],
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          } : {}}
          whileTap={{ scale: 0.82 }}
          onClick={handleClick}
          className="w-12 h-12 rounded-[14px] flex items-center justify-center relative shadow-lg focus:outline-none origin-bottom group/icon"
          aria-label={`Open ${app.name}`}
        >
          {/* Icon container */}
          <div className="w-full h-full overflow-hidden rounded-[14px] relative">
            {app.icon}
            
            {/* Hover glow */}
            <motion.div 
              className="absolute inset-0 rounded-[14px] pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.2), inset 0 0 15px rgba(255,255,255,0.1)',
              }}
            />
          </div>
          
          {/* Reflection highlight */}
          <div 
            className="absolute inset-0 rounded-[14px] pointer-events-none overflow-hidden"
            style={{ height: '45%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/10 to-transparent" />
          </div>
        </motion.button>

        {/* Active Indicator Dot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: app.isOpen ? 1 : 0, 
            scale: app.isOpen ? 1 : 0 
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-1.5 h-1.5 rounded-full bg-white/90"
          style={{
            boxShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.4)',
          }}
        />
      </div>
    </Reorder.Item>
  );
});

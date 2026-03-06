
import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  onClose: (id: string) => void;
  children: React.ReactNode;
  zIndex: number;
  onFocus: (id: string) => void;
  width?: number;
  height?: number;
}

export const Window: React.FC<WindowProps> = ({ id, title, onClose, children, zIndex, onFocus, width = 800, height = 550 }) => {
  const dragControls = useDragControls();
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const safeWidth = Math.min(width, window.innerWidth * 0.9);
  const safeHeight = Math.min(height, window.innerHeight * 0.8);

  const initialX = Math.max(0, (window.innerWidth - safeWidth) / 2) + (Math.random() * 40 - 20);
  const initialY = Math.max(50, (window.innerHeight - safeHeight) / 2 - 50) + (Math.random() * 40 - 20);

  // Track focus state
  useEffect(() => {
    // Simple focus check based on zIndex (highest = focused)
    setIsFocused(true);
  }, [zIndex]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(id), 250);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus(id);
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          drag
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0.03}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          initial={{ 
            scale: 0.85, 
            opacity: 0, 
            x: initialX,
            y: initialY,
            filter: 'blur(12px)',
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            filter: 'blur(0px)',
          }}
          exit={{ 
            scale: 0.9, 
            opacity: 0,
            filter: 'blur(16px)',
            y: initialY + 30,
            transition: { duration: 0.25, ease: [0.4, 0, 1, 1] }
          }}
          transition={{ 
            type: 'spring',
            stiffness: 350,
            damping: 28,
            mass: 0.9,
          }}
          style={{ 
            zIndex, 
            width: safeWidth, 
            height: safeHeight,
            position: 'absolute',
          }}
          onMouseDown={handleFocus}
          className={`
            glass-panel rounded-xl flex flex-col overflow-hidden resize-both min-w-[320px] min-h-[220px]
            transition-shadow duration-300
            ${isDragging ? 'cursor-grabbing' : ''}
            ${isFocused 
              ? 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)]' 
              : 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]'
            }
          `}
        >
          {/* Title Bar */}
          <div 
            className={`h-12 flex items-center px-4 justify-between select-none cursor-default border-b flex-shrink-0 relative transition-colors duration-200
              ${isFocused 
                ? 'bg-gradient-to-b from-white/12 to-white/5 border-white/10' 
                : 'bg-gradient-to-b from-white/8 to-white/3 border-white/5'
              }
            `}
            onPointerDown={(e) => {
              handleFocus();
              dragControls.start(e);
            }}
          >
            {/* Subtle top highlight */}
            <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-opacity ${isFocused ? 'opacity-100' : 'opacity-50'}`} />
            
            {/* Traffic Lights */}
            <div className="flex gap-2 group z-20" onPointerDown={(e) => e.stopPropagation()}>
              <motion.button 
                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                whileHover={{ scale: 1.15, brightness: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full flex items-center justify-center shadow-sm relative overflow-hidden transition-colors
                  ${isFocused ? 'bg-[#FF5F57]' : 'bg-white/20'}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2" />
                <X size={8} className="text-black/70 opacity-0 group-hover:opacity-100 font-bold relative z-10" strokeWidth={3} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full flex items-center justify-center shadow-sm relative overflow-hidden transition-colors
                  ${isFocused ? 'bg-[#FEBC2E]' : 'bg-white/20'}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2" />
                <Minus size={8} className="text-black/70 opacity-0 group-hover:opacity-100 font-bold relative z-10" strokeWidth={3} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full flex items-center justify-center shadow-sm relative overflow-hidden transition-colors
                  ${isFocused ? 'bg-[#28C840]' : 'bg-white/20'}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2" />
                <Maximize2 size={6} className="text-black/70 opacity-0 group-hover:opacity-100 font-bold relative z-10" strokeWidth={3} />
              </motion.button>
            </div>
            
            {/* Title */}
            <motion.div 
              className={`text-[13px] font-medium absolute left-0 right-0 text-center pointer-events-none transition-colors
                ${isFocused ? 'text-white/80' : 'text-white/50'}
              `}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.div>
            <div className="w-14" />
          </div>

          {/* Content */}
          <motion.div 
            className="flex-1 overflow-hidden relative cursor-auto bg-[#1e1e1e]" 
            onPointerDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {children}
          </motion.div>
          
          {/* Resize handle glow */}
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity">
            <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-white/30 rounded-br-sm" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

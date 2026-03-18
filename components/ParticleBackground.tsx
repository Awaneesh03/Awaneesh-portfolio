import React, { useMemo } from 'react';

interface ParticleBackgroundProps {
  count?: number;
  color?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  moveX: number;
  moveY: number;
}

// Lightweight CSS-only particles instead of framer-motion animated divs
export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 15,
  color = 'rgba(255, 255, 255, 0.3)'
}) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * 10,
      moveX: (Math.random() - 0.5) * 40,
      moveY: (Math.random() - 0.5) * 40,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: color,
            opacity: 0.4,
            animation: `particle-drift ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            '--drift-x': `${particle.moveX}px`,
            '--drift-y': `${particle.moveY}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

// Simple CSS gradient orbs — no framer-motion, just CSS animations
export const GradientOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          left: '-10%',
          top: '10%',
          filter: 'blur(60px)',
          animation: 'orb-float-1 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          right: '-5%',
          bottom: '10%',
          filter: 'blur(60px)',
          animation: 'orb-float-2 25s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

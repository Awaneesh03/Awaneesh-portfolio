import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center select-none text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20" />
      
      {/* Time */}
      <div className="relative z-10 text-center">
        <div className="text-6xl font-extralight tracking-tight mb-2 tabular-nums">
          {format(time, 'HH:mm')}
        </div>
        <div className="text-lg text-white/70 font-medium">
          {format(time, 'EEEE')}
        </div>
        <div className="text-sm text-white/50">
          {format(time, 'MMMM d, yyyy')}
        </div>
      </div>

      {/* Animated ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#clockGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray={`${(time.getSeconds() / 60) * 283} 283`}
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

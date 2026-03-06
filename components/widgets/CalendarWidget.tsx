import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

export const CalendarWidget: React.FC = () => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="w-full h-full p-6 flex flex-col justify-between select-none text-white">
       <div className="flex items-baseline justify-between mb-2">
           <div>
               <h3 className="text-red-500 font-bold text-xl drop-shadow-sm">{format(today, 'EEEE')}</h3>
               <span className="text-2xl font-light text-white/90 drop-shadow-sm">{format(today, 'MMMM d')}</span>
           </div>
       </div>

       <div className="flex-1 flex flex-col justify-center">
           <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-white/60 mb-2">
               {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
           </div>

           <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
                {days.map((day) => (
                    <div 
                        key={day.toString()} 
                        className={`
                            aspect-square flex items-center justify-center text-sm rounded-full transition-colors mx-auto w-8 h-8 font-medium
                            ${!isSameMonth(day, today) ? 'text-white/30' : 'text-white/90'}
                            ${isToday(day) ? 'bg-red-500 font-bold text-white shadow-lg scale-105' : ''}
                        `}
                    >
                        {format(day, 'd')}
                    </div>
                ))}
           </div>
       </div>

       <div className="mt-4 pt-3 border-t border-white/20">
           <div className="flex items-center gap-3">
               <div className="w-1 h-10 bg-yellow-400 rounded-full shadow-lg"></div>
               <div className="flex flex-col">
                   <span className="text-sm font-bold text-white/95 drop-shadow-md">Project Launch</span>
                   <span className="text-xs text-white/70 font-medium">10:00 AM - 11:30 AM</span>
               </div>
           </div>
       </div>
    </div>
  );
};
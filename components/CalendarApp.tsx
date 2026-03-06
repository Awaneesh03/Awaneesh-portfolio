import React, { useState } from 'react';
import { format, addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  allDay: boolean;
  startTime?: number; // hour 0-23
}

export const CalendarApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickerDate, setPickerDate] = useState(new Date()); // For the mini calendar navigator
  const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  
  // Events state
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handlePrev = () => {
      if (view === 'day') setCurrentDate(subDays(currentDate, 1));
      // Add logic for other views if needed
  };

  const handleNext = () => {
      if (view === 'day') setCurrentDate(addDays(currentDate, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setPickerDate(today);
  };

  // Mini Calendar Navigation
  const pickerPrevMonth = (e: React.MouseEvent) => { e.stopPropagation(); setPickerDate(subMonths(pickerDate, 1)); };
  const pickerNextMonth = (e: React.MouseEvent) => { e.stopPropagation(); setPickerDate(addMonths(pickerDate, 1)); };

  const addEvent = (hour: number) => {
    const newEvent: CalendarEvent = {
        id: Math.random().toString(),
        title: 'New Event',
        date: currentDate,
        allDay: false,
        startTime: hour
    };
    setEvents([...events, newEvent]);
  };

  // Generate days for mini picker
  const pickerMonthStart = startOfMonth(pickerDate);
  const pickerDays = eachDayOfInterval({ start: pickerMonthStart, end: endOfMonth(pickerDate) });
  // Add padding days for grid? Simplified for now.

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#E6E6E6] font-sans overflow-hidden select-none">
        {/* Top Toolbar */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-black/40 bg-[#282828] shadow-sm z-20">
             {/* Left: Date Title & Picker Trigger */}
             <div className="flex items-center gap-2 relative">
                <button 
                    onClick={() => setIsPickerOpen(!isPickerOpen)}
                    className="text-xl font-bold hover:bg-white/5 px-2 py-1 rounded transition-colors flex items-center gap-2"
                >
                    {format(currentDate, 'MMMM yyyy')}
                    <ChevronRight size={14} className={`transition-transform duration-200 ${isPickerOpen ? 'rotate-90' : ''} text-gray-500`}/>
                </button>
                
                {/* Date Picker Popover */}
                <AnimatePresence>
                    {isPickerOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-10 left-0 bg-[#2C2C2C] border border-black/50 shadow-2xl rounded-lg p-4 w-64 z-50"
                        >
                             <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-sm">{format(pickerDate, 'MMMM yyyy')}</span>
                                <div className="flex gap-3 text-gray-400">
                                    <button onClick={pickerPrevMonth} className="hover:text-white"><ChevronLeft size={16}/></button>
                                    <button onClick={pickerNextMonth} className="hover:text-white"><ChevronRight size={16}/></button>
                                </div>
                             </div>
                             <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] text-gray-400 mb-1">
                                {['S','M','T','W','T','F','S'].map(d => <div key={d}>{d}</div>)}
                             </div>
                             <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                {pickerDays.map((d) => (
                                    <button 
                                        key={d.toString()}
                                        onClick={() => {
                                            setCurrentDate(d);
                                            setIsPickerOpen(false);
                                        }}
                                        className={`
                                            aspect-square flex items-center justify-center rounded-full hover:bg-white/10
                                            ${isSameDay(d, currentDate) ? 'bg-red-500 text-white font-bold' : 'text-gray-300'}
                                            ${!isSameMonth(d, pickerDate) ? 'text-gray-600' : ''}
                                        `}
                                    >
                                        {format(d, 'd')}
                                    </button>
                                ))}
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>

             {/* Center: Segmented Control */}
             <div className="flex bg-[#161616] p-0.5 rounded-md shadow-inner border border-white/5">
                 {['Day', 'Week', 'Month', 'Year'].map((v) => (
                     <button 
                        key={v}
                        onClick={() => setView(v.toLowerCase() as any)}
                        className={`
                            px-4 py-1 text-xs font-medium rounded-[4px] transition-all
                            ${view === v.toLowerCase() ? 'bg-[#3A3A3A] text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}
                        `}
                     >
                         {v}
                     </button>
                 ))}
             </div>

             {/* Right: Actions */}
             <div className="flex items-center gap-3 text-gray-400">
                 <button className="hover:bg-white/10 p-1.5 rounded-md transition-colors"><Search size={16}/></button>
                 <button className="hover:bg-white/10 p-1.5 rounded-md transition-colors"><Plus size={16}/></button>
             </div>
        </div>

        {/* Navigation Bar (Below Toolbar) */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-[#1e1e1e]">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-[#E6E6E6] leading-tight">{format(currentDate, 'd MMMM yyyy')}</h2>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{format(currentDate, 'EEEE')}</span>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={handlePrev} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 transition-colors"><ChevronLeft size={20}/></button>
                <button onClick={handleToday} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm text-white font-medium transition-colors">Today</button>
                <button onClick={handleNext} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 transition-colors"><ChevronRight size={20}/></button>
            </div>
        </div>

        {/* Main View Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#1e1e1e]">
            {/* All Day Section */}
            <div className="flex border-b border-white/10 min-h-[3rem]">
                <div className="w-16 flex-shrink-0 border-r border-white/10 flex items-center justify-center text-[10px] text-gray-500 font-medium bg-[#252525]">
                    all-day
                </div>
                <div className="flex-1 p-1 bg-[#252525]">
                     {events.filter(e => e.allDay && isSameDay(e.date, currentDate)).map(e => (
                         <div key={e.id} className="bg-[#3370A5] text-white text-xs px-2 py-1 rounded border-l-2 border-[#8abce6] mb-1">
                             {e.title}
                         </div>
                     ))}
                </div>
            </div>

            {/* Time Grid */}
            <div className="relative pb-10">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="flex h-20 group relative">
                        {/* Time Label */}
                        <div className="w-16 flex-shrink-0 border-r border-white/10 flex justify-end pr-3 pt-2 text-[11px] text-gray-500 font-medium bg-[#1e1e1e] z-10">
                            {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? 'Noon' : `${i - 12} PM`}
                        </div>
                        
                        {/* Hour Cell */}
                        <div 
                            className="flex-1 border-b border-white/5 relative cursor-pointer hover:bg-white/5 transition-colors"
                            onClick={() => addEvent(i)}
                        >
                            {/* Half-hour dashed line */}
                            <div className="absolute top-1/2 left-0 right-0 border-t border-white/5 border-dashed pointer-events-none"></div>
                            
                            {/* Render Events in this hour */}
                            {events.filter(e => !e.allDay && isSameDay(e.date, currentDate) && e.startTime === i).map(e => (
                                <div key={e.id} className="absolute top-1 left-1 right-1 h-[90%] bg-[#3370A5] rounded px-2 py-1 border-l-2 border-[#8abce6] text-xs shadow-sm overflow-hidden">
                                    <span className="font-semibold text-white">{e.title}</span>
                                    <div className="text-[10px] text-blue-100">Location...</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Current Time Indicator Line */}
                {isToday(currentDate) && (
                    <div 
                        className="absolute left-16 right-0 flex items-center pointer-events-none z-20"
                        style={{ top: `${(new Date().getHours() * 80) + (new Date().getMinutes() / 60 * 80)}px` }}
                    >
                        <div className="w-2 h-2 bg-red-500 rounded-full -ml-1 shadow-sm"></div>
                        <div className="flex-1 h-[1px] bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]"></div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
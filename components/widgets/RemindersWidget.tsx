import React, { useState } from 'react';
import { ReminderItem } from '../../types';

export const RemindersWidget: React.FC = () => {
  const [items, setItems] = useState<ReminderItem[]>([
    { id: '1', text: 'Review PRs', completed: false },
    { id: '2', text: 'Design System Meeting', completed: false },
    { id: '3', text: 'Buy groceries', completed: true },
    { id: '4', text: 'Update MacOS', completed: false },
    { id: '5', text: 'Call Mom', completed: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-xl text-mac-highlight">Reminders</h3>
        <span className="text-2xl font-bold">{items.filter(i => !i.completed).length}</span>
      </div>
      <ul className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {items.map(item => (
          <li key={item.id} className="flex items-start gap-3 group cursor-pointer" onClick={() => toggleItem(item.id)}>
            <div className={`mt-1 w-4 h-4 rounded-full border border-mac-muted flex-shrink-0 flex items-center justify-center transition-colors ${item.completed ? 'bg-mac-highlight border-mac-highlight' : 'bg-white/10 group-hover:bg-white/20'}`}>
              {item.completed && <div className="w-2 h-2 bg-black rounded-full" />}
            </div>
            <span className={`text-sm leading-tight transition-colors ${item.completed ? 'text-mac-muted line-through' : 'text-mac-text'}`}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
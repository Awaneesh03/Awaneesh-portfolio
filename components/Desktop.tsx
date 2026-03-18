
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS, PORTFOLIO } from '../constants';
import { AppConfig } from '../types';
import { format } from 'date-fns';
import { WeatherWidget } from './widgets/WeatherWidget';
import { CalendarWidget } from './widgets/CalendarWidget';
import { ClockWidget } from './widgets/ClockWidget';
import { StatsWidget } from './widgets/StatsWidget';
import { AboutMeApp } from './apps/AboutMeApp';
import { ProjectsApp } from './apps/ProjectsApp';
import { SkillsApp } from './apps/SkillsApp';
import { ExperienceApp } from './apps/ExperienceApp';
import { TerminalApp } from './apps/TerminalApp';
import { SettingsApp } from './apps/SettingsApp';
import { BrowserApp } from './apps/BrowserApp';
import { Launchpad } from './Launchpad';
import { Dock } from './Dock';
import { Window } from './Window';
import { Spotlight } from './Spotlight';
import { GradientOrbs } from './ParticleBackground';
import {
  User,
  Code2,
  Terminal,
  Calendar,
  Trash2,
  FolderPlus,
  Info,
  Github,
  Linkedin,
  Settings,
  FileText,
  Search,
  Folder,
  Compass,
  FolderKanban,
} from 'lucide-react';

interface DesktopProps {
  // Props can be expanded
}

export const Desktop: React.FC<DesktopProps> = () => {
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndices, setZIndices] = useState<Record<string, number>>({});
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const [desktopFolders, setDesktopFolders] = useState<{ id: string; name: string; x: number; y: number }[]>([]);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const folderCounter = useRef(0);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Space for Spotlight
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
        setIsLaunchpadOpen(false);
      }
      // Cmd/Ctrl + Shift + Space for Launchpad
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === 'Space') {
        e.preventDefault();
        setIsLaunchpadOpen(prev => !prev);
        setIsSpotlightOpen(false);
      }
      // Escape to close
      if (e.key === 'Escape') {
        if (isSpotlightOpen) setIsSpotlightOpen(false);
        else if (isLaunchpadOpen) setIsLaunchpadOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLaunchpadOpen, isSpotlightOpen]);

  const bringToFront = useCallback((id: string) => {
    setActiveWindowId(id);
    setZIndices(prev => {
      const maxZ = Math.max(0, ...Object.values(prev).map(Number), 10);
      return { ...prev, [id]: maxZ + 1 };
    });
  }, []);

  const [apps, setApps] = useState<AppConfig[]>([
    // About Me (Finder)
    {
      id: 'about',
      name: 'About Me',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center rounded-xl">
          <User className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: true,
      width: 850,
      height: 600,
      component: <AboutMeApp />
    },
    // Launchpad
    {
      id: 'launchpad',
      name: 'Launchpad',
      icon: <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9f87c5a09e493cd8ddcc07f1e9c99736_hSnZbFTzvv.png" alt="Launchpad" className="w-full h-full object-contain p-0.5" />,
      isOpen: false,
      isMinimized: false,
      pinned: true
    },
    // Projects (Browser)
    {
      id: 'projects',
      name: 'Projects',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center rounded-xl">
          <FolderKanban className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: true,
      width: 1000,
      height: 650,
      component: <ProjectsApp />
    },
    // Browser
    {
      id: 'browser',
      name: 'Browser',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center rounded-xl">
          <Compass className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: true,
      width: 1000,
      height: 650,
      component: <BrowserApp />
    },
    // Skills (Notes)
    {
      id: 'skills',
      name: 'Skills',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center rounded-xl">
          <Code2 className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: true,
      width: 900,
      height: 550,
      component: <SkillsApp />
    },
    // Experience (Calendar/Timeline)
    {
      id: 'experience',
      name: 'Experience',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center rounded-xl">
          <Calendar className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: true,
      width: 800,
      height: 600,
      component: <ExperienceApp />
    },
    // Terminal (Contact)
    {
      id: 'terminal',
      name: 'Terminal',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-xl border border-gray-700">
          <Terminal className="text-green-400" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: true,
      width: 700,
      height: 500,
      component: <TerminalApp />
    },
    // GitHub Link
    {
      id: 'github',
      name: 'GitHub',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center rounded-xl">
          <Github className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: true,
    },
    // LinkedIn Link
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center rounded-xl">
          <Linkedin className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: true,
    },
    // Resume
    {
      id: 'resume',
      name: 'Resume',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center rounded-xl">
          <FileText className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: false,
    },
    // Settings
    {
      id: 'settings',
      name: 'Settings',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center rounded-xl">
          <Settings className="text-white" size={28} />
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      pinned: false,
      width: 800,
      height: 550,
      component: <SettingsApp />
    },
    // Trash
    {
      id: 'trash',
      name: 'Trash',
      icon: <div className="w-full h-full bg-white/20 flex items-center justify-center backdrop-blur-sm rounded-xl"><Trash2 className="text-gray-200" size={28} /></div>,
      isOpen: false,
      isMinimized: false,
      pinned: true
    }
  ]);

  const toggleApp = (id: string) => {
    if (id === 'launchpad') {
      setIsLaunchpadOpen(!isLaunchpadOpen);
      return;
    }

    // Handle external links
    if (id === 'github') {
      window.open(PORTFOLIO.github, '_blank');
      return;
    }
    if (id === 'linkedin') {
      window.open(PORTFOLIO.linkedin, '_blank');
      return;
    }
    if (id === 'resume') {
      window.open(ASSETS.RESUME_URL, '_blank');
      return;
    }

    setApps(apps.map(app => {
      if (app.id === id) {
        if (!app.isOpen) bringToFront(id);
        return { ...app, isOpen: true, isMinimized: false };
      }
      return app;
    }));
  };

  const closeApp = (id: string) => {
    setApps(apps.map(app => app.id === id ? { ...app, isOpen: false } : app));
  };

  const handleDockReorder = (newOrder: AppConfig[]) => {
    const newOrderIds = newOrder.map(a => a.id);
    const remainingApps = apps.filter(a => !newOrderIds.includes(a.id));
    setApps([...newOrder, ...remainingApps]);
  };

  const handleWidgetDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleWidgetClick = (appId: string) => {
    if (!isDraggingRef.current) {
      toggleApp(appId);
    }
    setTimeout(() => { isDraggingRef.current = false; }, 100);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 250);
    const y = Math.min(e.clientY, window.innerHeight - 350);
    setContextMenu({ x, y });
  };

  const createNewFolder = () => {
    folderCounter.current += 1;
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: `untitled folder${folderCounter.current > 1 ? ' ' + folderCounter.current : ''}`,
      x: 100 + (folderCounter.current * 30) % 300,
      y: 60 + (folderCounter.current * 30) % 400,
    };
    setDesktopFolders(prev => [...prev, newFolder]);
    setEditingFolderId(newFolder.id);
    setContextMenu(null);
  };

  const pinnedApps = apps.filter(app => app.pinned && app.id !== 'trash');
  const recentApps = apps.filter(app => !app.pinned && app.isOpen && app.id !== 'trash');
  const trashApp = apps.find(app => app.id === 'trash');

  const dockApps = [
    ...pinnedApps,
    ...recentApps,
    ...(trashApp ? [trashApp] : [])
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${ASSETS.WALLPAPER})` }}
      onContextMenu={handleContextMenu}
    >
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <GradientOrbs />
      </div>

      {/* Menu Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="h-8 bg-black/40 backdrop-blur-2xl flex items-center justify-between px-4 text-sm font-medium text-white shadow-lg z-40 relative border-b border-white/10"
      >
        <div className="flex items-center gap-5">
          <span className="font-bold text-white/90 drop-shadow-md"></span>
          <span className="font-semibold hidden sm:inline text-white/90">{PORTFOLIO.name}</span>
          <div className="hidden sm:flex items-center gap-1">
            <button onClick={() => toggleApp('about')} className="px-2 py-0.5 rounded hover:bg-white/10 transition-colors opacity-80 hover:opacity-100">About</button>
            <button onClick={() => toggleApp('projects')} className="px-2 py-0.5 rounded hover:bg-white/10 transition-colors opacity-80 hover:opacity-100">Projects</button>
            <button onClick={() => toggleApp('skills')} className="px-2 py-0.5 rounded hover:bg-white/10 transition-colors opacity-80 hover:opacity-100">Skills</button>
            <button onClick={() => toggleApp('terminal')} className="px-2 py-0.5 rounded hover:bg-white/10 transition-colors opacity-80 hover:opacity-100">Contact</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setIsSpotlightOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-2 py-1 bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10"
          >
            <Search size={14} className="opacity-60" />
            <span className="text-xs opacity-60 hidden md:inline">Search</span>
            <kbd className="text-[10px] bg-white/10 px-1 rounded opacity-50 hidden md:inline">⌘Space</kbd>
          </motion.button>
          <span className="text-white/80 drop-shadow-md">{format(new Date(), 'EEE MMM d h:mm aa')}</span>
        </div>
      </motion.div>

      {/* Movable Desktop Widgets */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full relative pointer-events-auto">
          {/* Desktop Folders */}
          {desktopFolders.map(folder => (
            <motion.div
              key={folder.id}
              drag
              dragMomentum={false}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute flex flex-col items-center gap-1 cursor-default select-none group"
              style={{ left: folder.x, top: folder.y }}
              onDoubleClick={() => setEditingFolderId(folder.id)}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-lg group-hover:bg-white/10 transition-colors">
                <Folder size={48} className="text-blue-400 drop-shadow-lg" fill="rgba(59,130,246,0.3)" />
              </div>
              {editingFolderId === folder.id ? (
                <input
                  autoFocus
                  className="text-xs text-white text-center bg-blue-500/50 border border-blue-400/50 rounded px-1 py-0.5 w-20 outline-none"
                  defaultValue={folder.name}
                  onBlur={(e) => {
                    setDesktopFolders(prev => prev.map(f => f.id === folder.id ? { ...f, name: e.target.value || folder.name } : f));
                    setEditingFolderId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                  }}
                />
              ) : (
                <span className="text-xs text-white text-center px-1 py-0.5 rounded bg-black/40 backdrop-blur-sm max-w-[80px] truncate">
                  {folder.name}
                </span>
              )}
            </motion.div>
          ))}

          {/* Weather Widget */}
          <motion.div
            drag
            dragMomentum={false}
            onDragStart={handleWidgetDragStart}
            className="absolute top-12 left-8 w-72 h-72 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[22px] shadow-2xl overflow-hidden cursor-move transition-all hover:bg-black/60 hover:border-white/20"
            onContextMenu={(e) => e.stopPropagation()}
          >
            <WeatherWidget />
          </motion.div>

          {/* Calendar Widget */}
          <motion.div
            drag
            dragMomentum={false}
            onDragStart={handleWidgetDragStart}
            className="absolute top-12 left-[21rem] w-72 h-72 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[22px] shadow-2xl overflow-hidden cursor-move group transition-all hover:bg-black/60 hover:border-white/20"
            onContextMenu={(e) => e.stopPropagation()}
          >
            <CalendarWidget />
          </motion.div>

          {/* Clock Widget */}
          <motion.div
            drag
            dragMomentum={false}
            onDragStart={handleWidgetDragStart}
            className="absolute top-12 right-8 w-48 h-48 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[22px] shadow-2xl overflow-hidden cursor-move transition-all hover:bg-black/60 hover:border-white/20"
            onContextMenu={(e) => e.stopPropagation()}
          >
            <ClockWidget />
          </motion.div>

          {/* Stats Widget */}
          <motion.div
            drag
            dragMomentum={false}
            onDragStart={handleWidgetDragStart}
            className="absolute top-[17rem] right-8 w-48 h-56 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[22px] shadow-2xl overflow-hidden cursor-move transition-all hover:bg-black/60 hover:border-white/20"
            onContextMenu={(e) => e.stopPropagation()}
          >
            <StatsWidget />
          </motion.div>
        </div>
      </div>

      {/* Desktop Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute z-[60] min-w-[240px] bg-[#2C2C2C]/80 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl py-1.5 text-[13px] text-[#E6E6E6] font-medium select-none ring-1 ring-black/50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-1">
              <div onClick={createNewFolder} className="group flex items-center justify-between px-3 py-1.5 mx-1 rounded-[5px] hover:bg-[#007AFF] hover:text-white transition-colors cursor-default">
                <span className="flex items-center gap-3">
                  <FolderPlus size={15} className="text-white/70 group-hover:text-white stroke-[1.5]" /> New Folder
                </span>
              </div>

              <div className="h-[1px] bg-white/10 my-1.5 mx-3" />

              <div className="group flex items-center justify-between px-3 py-1.5 mx-1 rounded-[5px] hover:bg-[#007AFF] hover:text-white transition-colors cursor-default">
                <span className="flex items-center gap-3">
                  <Info size={15} className="text-white/70 group-hover:text-white stroke-[1.5]" /> Get Info
                </span>
              </div>
              <div onClick={() => { toggleApp('settings'); setContextMenu(null); }} className="group flex items-center justify-between px-3 py-1.5 mx-1 rounded-[5px] hover:bg-[#007AFF] hover:text-white transition-colors cursor-default">
                <span className="pl-[27px]">Change Wallpaper...</span>
              </div>
              <div className="group flex items-center justify-between px-3 py-1.5 mx-1 rounded-[5px] hover:bg-[#007AFF] hover:text-white transition-colors cursor-default">
                <span className="pl-[27px]">Edit Widgets...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Windows Area */}
      <AnimatePresence>
        {apps.filter(app => app.isOpen && app.component).map(app => (
          <Window
            key={app.id}
            id={app.id}
            title={app.name}
            onClose={closeApp}
            zIndex={zIndices[app.id] || 10}
            onFocus={bringToFront}
            width={app.width}
            height={app.height}
          >
            {app.component}
          </Window>
        ))}
      </AnimatePresence>

      <Launchpad
        isOpen={isLaunchpadOpen}
        onClose={() => setIsLaunchpadOpen(false)}
        apps={apps}
        onAppClick={toggleApp}
      />

      <Spotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onOpenApp={toggleApp}
      />

      <Dock
        apps={dockApps}
        onAppClick={toggleApp}
        onReorder={handleDockReorder}
      />
    </motion.div>
  );
};

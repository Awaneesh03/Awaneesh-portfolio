import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search, X, Plus, Home, Star, ExternalLink } from 'lucide-react';
import { SimulatedInstagram, SimulatedTwitter, SimulatedLinkedIn, SimulatedGitHub, SimulatedGoogle } from './SimulatedSites';

/* ─── Types ─────────────────────────────────────────────────────── */
interface Tab {
  id: string;
  url: string;
  displayUrl: string;
  title: string;
  history: string[];
  historyIndex: number;
  isLoading: boolean;
  favicon: string | null;
}

type ViewType = 'newtab' | 'youtube-player' | 'simulated' | 'blocked' | 'iframe';

/* ─── Data ──────────────────────────────────────────────────────── */
const BOOKMARKS = [
  { name: 'YouTube',      url: 'https://www.youtube.com',   icon: '📺' },
  { name: 'GitHub',       url: 'https://github.com',        icon: '🐙' },
  { name: 'LinkedIn',     url: 'https://linkedin.com',      icon: '💼' },
  { name: 'Instagram',    url: 'https://instagram.com',     icon: '📸' },
  { name: 'Wikipedia',    url: 'https://en.wikipedia.org',  icon: '📖' },
  { name: 'MDN',          url: 'https://developer.mozilla.org', icon: '📋' },
];

const SHORTCUTS = [
  { name: 'YouTube',   url: 'https://www.youtube.com',      icon: '▶️',  color: 'bg-red-600' },
  { name: 'GitHub',    url: 'https://github.com',           icon: '🐙',  color: 'bg-gray-800' },
  { name: 'LinkedIn',  url: 'https://linkedin.com',         icon: '💼',  color: 'bg-blue-700' },
  { name: 'Instagram', url: 'https://instagram.com',        icon: '📸',  color: 'bg-gradient-to-br from-purple-600 to-pink-500' },
  { name: 'Twitter',   url: 'https://x.com',                icon: '𝕏',   color: 'bg-black' },
  { name: 'Google',    url: 'https://google.com',           icon: '🔍',  color: 'bg-white' },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org',     icon: 'W',   color: 'bg-gray-600' },
  { name: 'MDN',       url: 'https://developer.mozilla.org',icon: '📋',  color: 'bg-indigo-700' },
];

/* ─── Sites that render as simulated components ─────────────────── */
const SIMULATED_DOMAINS: Record<string, React.ComponentType<{ query?: string }>> = {
  'instagram.com': SimulatedInstagram,
  'twitter.com':   SimulatedTwitter,
  'x.com':         SimulatedTwitter,
  'linkedin.com':  SimulatedLinkedIn,
  'github.com':    SimulatedGitHub,
  'google.com':    SimulatedGoogle,
  'google.co.in':  SimulatedGoogle,
};

/* ─── Sites that truly can't be iframed (show open-in-tab message) ─ */
const IFRAME_BLOCKED = [
  'facebook.com', 'reddit.com', 'amazon.com', 'netflix.com',
  'figma.com', 'notion.so', 'discord.com', 'slack.com',
  'apple.com', 'microsoft.com', 'bing.com', 'yahoo.com',
];

/* ─── Helpers ────────────────────────────────────────────────────── */
const genId = () => Math.random().toString(36).slice(2, 9);

const extractYoutubeId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^#&?]{11})/);
  return match ? match[1] : null;
};

const safeHostname = (url: string): string => {
  try { return new URL(url).hostname.replace('www.', ''); }
  catch { return ''; }
};

const getFavicon = (url: string): string | null => {
  const h = safeHostname(url);
  return h ? `https://www.google.com/s2/favicons?sz=32&domain=${h}` : null;
};

const isUrlLike = (input: string): boolean => {
  if (input.startsWith('http://') || input.startsWith('https://')) return true;
  return /^[a-zA-Z0-9][a-zA-Z0-9-]*(\.[a-zA-Z]{2,})(\/.*)?$/.test(input);
};

const resolveInput = (raw: string): string => {
  const trimmed = raw.trim();
  if (!trimmed) return 'about:newtab';
  if (trimmed === 'about:newtab') return 'about:newtab';

  const ytId = extractYoutubeId(trimmed);
  if (ytId) return `https://www.youtube.com/watch?v=${ytId}`;

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (isUrlLike(trimmed)) return `https://${trimmed}`;

  // Treat as search query → Google
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
};

const getTitle = (url: string): string => {
  if (url === 'about:newtab') return 'New Tab';
  const h = safeHostname(url);
  if (!h) return url.slice(0, 30);
  // Capitalise first letter
  return h.charAt(0).toUpperCase() + h.slice(1);
};

const getViewType = (url: string): ViewType => {
  if (url === 'about:newtab') return 'newtab';

  const ytId = extractYoutubeId(url);
  if (ytId) return 'youtube-player';

  const host = safeHostname(url);
  if (SIMULATED_DOMAINS[host]) return 'simulated';
  if (IFRAME_BLOCKED.some(d => host === d || host.endsWith('.' + d))) return 'blocked';
  return 'iframe';
};

const createTab = (): Tab => ({
  id: genId(),
  url: 'about:newtab',
  displayUrl: '',
  title: 'New Tab',
  history: ['about:newtab'],
  historyIndex: 0,
  isLoading: false,
  favicon: null,
});

/* ─── Component ─────────────────────────────────────────────────── */
export const BrowserApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([createTab()]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) ?? tabs[0];

  const updateTab = useCallback((id: string, patch: Partial<Tab>) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }, []);

  const navigateTo = useCallback((raw: string, tabId?: string) => {
    const tid = tabId ?? activeTab.id;
    const url = resolveInput(raw);
    const currentTab = tabs.find(t => t.id === tid) ?? activeTab;

    const newHistory = currentTab.history.slice(0, currentTab.historyIndex + 1);
    if (url !== newHistory[newHistory.length - 1]) newHistory.push(url);

    updateTab(tid, {
      url,
      displayUrl: url === 'about:newtab' ? '' : url,
      title: getTitle(url),
      history: newHistory,
      historyIndex: newHistory.length - 1,
      isLoading: url !== 'about:newtab',
      favicon: getFavicon(url),
    });

    if (url !== 'about:newtab') {
      setTimeout(() => updateTab(tid, { isLoading: false }), 800);
    }
  }, [activeTab, tabs, updateTab]);

  const goBack = useCallback(() => {
    if (activeTab.historyIndex <= 0) return;
    const url = activeTab.history[activeTab.historyIndex - 1];
    updateTab(activeTab.id, {
      url,
      displayUrl: url === 'about:newtab' ? '' : url,
      title: getTitle(url),
      historyIndex: activeTab.historyIndex - 1,
      isLoading: url !== 'about:newtab',
      favicon: getFavicon(url),
    });
    if (url !== 'about:newtab') setTimeout(() => updateTab(activeTab.id, { isLoading: false }), 800);
  }, [activeTab, updateTab]);

  const goForward = useCallback(() => {
    if (activeTab.historyIndex >= activeTab.history.length - 1) return;
    const url = activeTab.history[activeTab.historyIndex + 1];
    updateTab(activeTab.id, {
      url,
      displayUrl: url === 'about:newtab' ? '' : url,
      title: getTitle(url),
      historyIndex: activeTab.historyIndex + 1,
      isLoading: url !== 'about:newtab',
      favicon: getFavicon(url),
    });
    if (url !== 'about:newtab') setTimeout(() => updateTab(activeTab.id, { isLoading: false }), 800);
  }, [activeTab, updateTab]);

  const reload = useCallback(() => {
    if (activeTab.url === 'about:newtab') return;
    updateTab(activeTab.id, { isLoading: true });
    // Force iframe reload by briefly blanking src
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => { if (iframeRef.current) iframeRef.current.src = src; }, 50);
    }
    setTimeout(() => updateTab(activeTab.id, { isLoading: false }), 1000);
  }, [activeTab, updateTab]);

  const addTab = useCallback(() => {
    const tab = createTab();
    setTabs(prev => [...prev, tab]);
    setActiveTabId(tab.id);
  }, []);

  const closeTab = useCallback((tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== tabId);
      if (remaining.length === 0) {
        const newTab = createTab();
        setActiveTabId(newTab.id);
        return [newTab];
      }
      if (activeTabId === tabId) {
        setActiveTabId(remaining[remaining.length - 1].id);
      }
      return remaining;
    });
  }, [activeTabId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return;
      if (e.key === 'l') { e.preventDefault(); urlInputRef.current?.select(); }
      if (e.key === 'r') { e.preventDefault(); reload(); }
      if (e.key === 't') { e.preventDefault(); addTab(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [reload, addTab]);

  const canGoBack    = activeTab.historyIndex > 0;
  const canGoForward = activeTab.historyIndex < activeTab.history.length - 1;
  const viewType     = getViewType(activeTab.url);
  const ytId         = extractYoutubeId(activeTab.url);
  const host         = safeHostname(activeTab.url);
  const SimComp      = SIMULATED_DOMAINS[host] ?? null;

  // Extract search query for SimulatedGoogle
  const searchQuery = activeTab.url.includes('google.com/search')
    ? new URLSearchParams(activeTab.url.split('?')[1] ?? '').get('q') ?? ''
    : '';

  const isSecure = activeTab.url.startsWith('https://');

  return (
    <div className="flex flex-col h-full bg-[#202020] text-white overflow-hidden select-none">

      {/* ── Tab Bar ── */}
      <div className="h-10 bg-[#1a1a1a] flex items-end px-2 gap-0.5 overflow-x-auto no-scrollbar flex-shrink-0">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`group relative flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] rounded-t-lg cursor-pointer transition-colors ${
              tab.id === activeTabId
                ? 'bg-[#3C3C3C] text-white'
                : 'bg-[#252525] text-gray-400 hover:bg-[#2e2e2e] hover:text-gray-200'
            }`}
          >
            {tab.favicon
              ? <img src={tab.favicon} className="w-3.5 h-3.5 flex-shrink-0" alt="" onError={e => (e.currentTarget.style.display = 'none')} />
              : <div className="w-3.5 h-3.5 rounded-full bg-gray-600 flex-shrink-0" />
            }
            <span className="text-xs truncate flex-1">{tab.title}</span>
            <button
              onClick={e => closeTab(tab.id, e)}
              className="opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded p-0.5 transition-opacity flex-shrink-0"
            >
              <X size={10} />
            </button>
          </div>
        ))}
        <button
          onClick={addTab}
          className="flex items-center justify-center w-8 h-8 mb-0.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* ── Navigation Bar ── */}
      <div className="h-11 bg-[#3C3C3C] flex items-center px-3 gap-2 flex-shrink-0">
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className={`p-1.5 rounded hover:bg-white/20 transition-colors ${canGoBack ? 'text-white' : 'text-gray-600 cursor-not-allowed'}`}
        >
          <ArrowLeft size={14} />
        </button>
        <button
          onClick={goForward}
          disabled={!canGoForward}
          className={`p-1.5 rounded hover:bg-white/20 transition-colors ${canGoForward ? 'text-white' : 'text-gray-600 cursor-not-allowed'}`}
        >
          <ArrowRight size={14} />
        </button>
        <button onClick={reload} className="p-1.5 rounded hover:bg-white/20 transition-colors text-white">
          <RotateCw size={14} className={activeTab.isLoading ? 'animate-spin' : ''} />
        </button>
        <button onClick={() => navigateTo('about:newtab')} className="p-1.5 rounded hover:bg-white/20 transition-colors text-white">
          <Home size={14} />
        </button>

        {/* URL Bar */}
        <div className="flex-1 h-8 bg-[#252525] rounded-full flex items-center px-3 gap-2 border border-transparent focus-within:border-blue-500/50 transition-colors">
          {activeTab.url !== 'about:newtab' && (
            isSecure
              ? <span className="text-green-400 flex-shrink-0 text-xs">🔒</span>
              : <span className="text-gray-500 flex-shrink-0 text-xs">🔓</span>
          )}
          {activeTab.url === 'about:newtab' && <Search size={13} className="text-gray-500 flex-shrink-0" />}
          <input
            ref={urlInputRef}
            value={activeTab.displayUrl}
            onChange={e => updateTab(activeTab.id, { displayUrl: e.target.value })}
            onFocus={e => e.target.select()}
            onKeyDown={e => {
              if (e.key === 'Enter') navigateTo(activeTab.displayUrl);
              if (e.key === 'Escape') {
                updateTab(activeTab.id, { displayUrl: activeTab.url === 'about:newtab' ? '' : activeTab.url });
                urlInputRef.current?.blur();
              }
            }}
            className="flex-1 bg-transparent outline-none text-xs text-gray-200 placeholder-gray-500"
            placeholder="Search Google or enter URL"
            spellCheck={false}
          />
          {activeTab.displayUrl && (
            <button onClick={() => updateTab(activeTab.id, { displayUrl: '' })} className="text-gray-500 hover:text-gray-300 flex-shrink-0">
              <X size={10} />
            </button>
          )}
        </div>

        <button className="p-1.5 rounded hover:bg-white/20 transition-colors text-gray-400 hover:text-white">
          <Star size={13} />
        </button>
      </div>

      {/* ── Bookmarks Bar ── */}
      <div className="h-8 bg-[#3C3C3C] border-t border-white/5 flex items-center px-3 gap-1 overflow-x-auto no-scrollbar flex-shrink-0">
        {BOOKMARKS.map(site => (
          <button
            key={site.name}
            onClick={() => navigateTo(site.url)}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
          >
            <span className="text-sm leading-none">{site.icon}</span>
            <span>{site.name}</span>
          </button>
        ))}
      </div>

      {/* ── Content Area ── */}
      <div className="flex-1 relative overflow-hidden bg-white">
        {/* Loading Bar */}
        {activeTab.isLoading && (
          <div className="absolute top-0 left-0 h-0.5 bg-blue-500 z-50 animate-loading-bar" style={{ width: '70%' }} />
        )}

        {/* New Tab Page */}
        {viewType === 'newtab' && (
          <div className="w-full h-full bg-[#202124] flex flex-col items-center justify-center p-8 overflow-y-auto">
            {/* Google Logo */}
            <div className="mb-8 flex items-center gap-1 text-5xl font-bold tracking-tight select-none">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-400">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </div>

            {/* Search bar */}
            <div className="w-full max-w-xl mb-10">
              <div className="flex items-center h-12 bg-[#303134] rounded-full px-5 gap-3 border border-[#5f6368] hover:border-blue-400 focus-within:border-blue-400 transition-colors shadow-lg">
                <Search size={18} className="text-[#9aa0a6] flex-shrink-0" />
                <input
                  className="flex-1 bg-transparent outline-none text-white placeholder-[#9aa0a6] text-base"
                  placeholder="Search Google or type a URL"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) navigateTo(val);
                    }
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Shortcuts Grid */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-xl">
              {SHORTCUTS.map((site, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo(site.url)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-full ${site.color} flex items-center justify-center text-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all`}>
                    <span className={site.name === 'Google' ? 'text-gray-700 text-lg' : ''}>{site.icon}</span>
                  </div>
                  <span className="text-xs text-[#bdc1c6] group-hover:text-white">{site.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* YouTube Player */}
        {viewType === 'youtube-player' && ytId && (
          <div className="w-full h-full bg-black">
            <iframe
              key={ytId}
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="YouTube video"
            />
          </div>
        )}

        {/* Simulated Sites (GitHub, LinkedIn, Instagram, Twitter, Google) */}
        {viewType === 'simulated' && SimComp && (
          <div className="w-full h-full overflow-auto">
            <SimComp query={searchQuery} />
          </div>
        )}

        {/* Truly iframe-blocked sites */}
        {viewType === 'blocked' && (
          <div className="w-full h-full bg-[#202124] flex flex-col items-center justify-center text-white gap-6 p-8">
            <div className="text-6xl">🚫</div>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">This site can't be displayed here</h2>
              <p className="text-gray-400 text-sm max-w-md">
                <span className="text-blue-400">{host}</span> doesn't allow being displayed inside other pages.
              </p>
            </div>
            <a
              href={activeTab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium transition-colors"
            >
              <ExternalLink size={14} />
              Open in new tab
            </a>
          </div>
        )}

        {/* Regular iframe */}
        {viewType === 'iframe' && (
          <iframe
            ref={iframeRef}
            key={activeTab.url}
            src={activeTab.url}
            className="w-full h-full border-none"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-downloads"
            allow="autoplay; fullscreen; clipboard-write"
            title="Browser content"
            onLoad={() => updateTab(activeTab.id, { isLoading: false })}
            onError={() => updateTab(activeTab.id, { isLoading: false })}
          />
        )}
      </div>
    </div>
  );
};

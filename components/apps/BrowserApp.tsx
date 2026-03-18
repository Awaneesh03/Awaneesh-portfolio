import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search, Lock, X, Globe, Play, Plus, Home, Star, Download, Share2 } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────── */
interface Tab {
    id: string;
    url: string;
    displayUrl: string;
    title: string;
    history: string[];
    historyIndex: number;
    isLoading: boolean;
    youtubeVideoId: string | null;
    favicon: string | null;
}

type TabView = 'newtab' | 'search' | 'youtube-home' | 'youtube-player' | 'iframe' | 'blocked';

/* ─── Helpers ────────────────────────────────────────────────────── */
const genId = () => Math.random().toString(36).slice(2, 9);

const extractYoutubeId = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11})/);
    return match ? match[1] : null;
};

const BLOCKED_DOMAINS = [
    'google.com', 'facebook.com', 'twitter.com', 'x.com', 'instagram.com',
    'linkedin.com', 'reddit.com', 'amazon.com', 'netflix.com', 'github.com',
    'figma.com', 'notion.so', 'discord.com', 'slack.com', 'apple.com',
    'microsoft.com', 'bing.com', 'yahoo.com',
];

const isDomainBlocked = (url: string): boolean => {
    try {
        const hostname = new URL(url).hostname.replace('www.', '');
        return BLOCKED_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
    } catch {
        return false;
    }
};

const getFaviconUrl = (url: string): string | null => {
    try {
        const u = new URL(url);
        return `https://www.google.com/s2/favicons?sz=32&domain=${u.hostname}`;
    } catch {
        return null;
    }
};

const getViewType = (url: string, ytId: string | null): TabView => {
    if (url === 'about:newtab') return 'newtab';
    if (url === 'internal://youtube') return 'youtube-home';
    if (ytId) return 'youtube-player';
    if (url.startsWith('search://')) return 'search';
    if (url.startsWith('https://') || url.startsWith('http://')) {
        return isDomainBlocked(url) ? 'blocked' : 'iframe';
    }
    return 'newtab';
};

/* ─── Bookmarks ──────────────────────────────────────────────────── */
const BOOKMARKS = [
    { name: 'YouTube', url: 'internal://youtube', icon: '📺' },
    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚' },
    { name: 'MDN Docs', url: 'https://developer.mozilla.org', icon: '📖' },
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: '🤖' },
];

/* ─── Quick Shortcuts (New Tab Page) ──────────────────────────────── */
const SHORTCUTS = [
    { name: 'YouTube', icon: '▶️', color: 'bg-red-600', url: 'internal://youtube' },
    { name: 'GitHub', icon: '🐙', color: 'bg-[#24292e]', url: 'https://github.com' },
    { name: 'Gmail', icon: '✉️', color: 'bg-red-500', url: 'https://mail.google.com' },
    { name: 'Twitter', icon: '𝕏', color: 'bg-black', url: 'https://x.com' },
    { name: 'Reddit', icon: '🤖', color: 'bg-orange-600', url: 'https://reddit.com' },
    { name: 'LinkedIn', icon: 'in', color: 'bg-blue-700', url: 'https://linkedin.com' },
    { name: 'Wikipedia', icon: 'W', color: 'bg-gray-700', url: 'https://en.wikipedia.org' },
    { name: 'Stack Overflow', icon: '⚡', color: 'bg-orange-500', url: 'https://stackoverflow.com' },
];

/* ─── Create a blank new tab ─────────────────────────────────────── */
const createNewTab = (): Tab => ({
    id: genId(),
    url: 'about:newtab',
    displayUrl: '',
    title: 'New Tab',
    history: ['about:newtab'],
    historyIndex: 0,
    isLoading: false,
    youtubeVideoId: null,
    favicon: null,
});

/* ─── YouTube Player ─────────────────────────────────────────────── */
const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => (
    <div className="w-full h-full bg-black flex items-center justify-center">
        <iframe
            width="100%" height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen className="w-full h-full"
        />
    </div>
);

/* ─── YouTube Home ───────────────────────────────────────────────── */
const YouTubeHome: React.FC<{ onPlay: (id: string) => void }> = ({ onPlay }) => {
    const videos = [
        { id: 'jfKfPfyJRdk', title: 'lofi hip hop radio - beats to relax/study to', channel: 'Lofi Girl', views: '42K watching' },
        { id: 'M7FIvfx5J10', title: 'MacBook Air 15 review', channel: 'The Verge', views: '1.2M views' },
        { id: 'LXb3EKWsInQ', title: 'COSTA RICA IN 4K 60fps HDR', channel: 'Jacob + Katie Schwarz', views: '83M views' },
        { id: '5qap5aO4i9A', title: 'lofi hip hop radio - beats to sleep/chill to', channel: 'Lofi Girl', views: '11K watching' },
        { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', channel: 'Rick Astley', views: '1.5B views' },
        { id: 'kJQP7kiw5Fk', title: 'Despacito (Official Video)', channel: 'Luis Fonsi', views: '8.3B views' },
    ];

    return (
        <div className="w-full h-full bg-[#0F0F0F] text-white overflow-y-auto custom-scrollbar p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <Play fill="white" size={12} className="text-white ml-0.5" />
                </div>
                <span className="text-xl font-bold tracking-tight">YouTube</span>
            </div>

            {/* Category chips */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['All', 'Music', 'Gaming', 'Live', 'Mixes', 'Coding', 'Lo-fi'].map(c => (
                    <button key={c} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${c === 'All' ? 'bg-white text-black' : 'bg-[#272727] text-white hover:bg-[#3a3a3a]'
                        }`}>{c}</button>
                ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map(v => (
                    <div key={v.id} onClick={() => onPlay(v.id)} className="cursor-pointer group">
                        <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden mb-2 relative">
                            <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={v.title} />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <Play size={32} fill="white" />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">3:42</div>
                        </div>
                        <h3 className="font-semibold text-sm line-clamp-2 leading-tight mb-1">{v.title}</h3>
                        <p className="text-xs text-gray-400">{v.channel}</p>
                        <p className="text-xs text-gray-500">{v.views}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ─── Blocked Site Page ──────────────────────────────────────────── */
const BlockedSitePage: React.FC<{ url: string; onSearch: (q: string) => void }> = ({ url, onSearch }) => {
    let hostname = '';
    try { hostname = new URL(url).hostname; } catch { hostname = url; }

    return (
        <div className="w-full h-full bg-[#1a1a2e] text-white flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-xl">
                <Globe size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">{hostname}</h2>
            <p className="text-white/60 text-sm text-center max-w-md mb-6">
                This website doesn't allow embedding in iframes for security reasons.
                In a real browser, the page would load normally.
            </p>
            <div className="flex gap-3">
                <a
                    href={url} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                    <Share2 size={14} /> Open in real browser
                </a>
                <button
                    onClick={() => onSearch(hostname.replace('www.', ''))}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                >
                    Search instead
                </button>
            </div>
        </div>
    );
};

/* ─── Search Results Page ────────────────────────────────────────── */
const SearchResults: React.FC<{ query: string; onNavigate: (url: string) => void }> = ({ query, onNavigate }) => {
    // Generate realistic search results based on the query
    const results = [
        {
            title: `${query} - Wikipedia`,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
            domain: 'en.wikipedia.org',
            favicon: 'W',
            snippet: `${query} refers to a broad topic in technology and computing. Click to learn more about ${query} from various trusted sources and comprehensive encyclopedias available online.`,
        },
        {
            title: `${query} | Official Website`,
            url: `https://www.${query.toLowerCase().replace(/\s+/g, '')}.com`,
            domain: `www.${query.toLowerCase().replace(/\s+/g, '')}.com`,
            favicon: '🌐',
            snippet: `Welcome to the official page for ${query}. Explore our latest updates, documentation, resources and community discussions around ${query}.`,
        },
        {
            title: `${query} Tutorial - Learn ${query} Step by Step`,
            url: 'https://www.freecodecamp.org',
            domain: 'www.freecodecamp.org',
            favicon: '🔥',
            snippet: `Learn ${query} from scratch with our comprehensive tutorial. Perfect for beginners and intermediate developers looking to master ${query} concepts and best practices.`,
        },
        {
            title: `What is ${query}? - Stack Overflow`,
            url: `https://stackoverflow.com/questions/tagged/${encodeURIComponent(query.toLowerCase())}`,
            domain: 'stackoverflow.com',
            favicon: '⚡',
            snippet: `Browse questions tagged [${query.toLowerCase()}] on Stack Overflow. Join developers discussing ${query} implementations, best practices, and common issues.`,
        },
        {
            title: `${query} - GitHub Topics`,
            url: `https://github.com/topics/${encodeURIComponent(query.toLowerCase())}`,
            domain: 'github.com',
            favicon: '🐙',
            snippet: `Explore repositories, projects, and code related to ${query} on GitHub. Discover open source ${query} projects from the developer community worldwide.`,
        },
    ];

    return (
        <div className="w-full h-full bg-[#202124] text-[#E8EAED] overflow-y-auto custom-scrollbar">
            {/* Google-style search header */}
            <div className="sticky top-0 bg-[#202124] border-b border-[#3C4043] pb-3 pt-5 px-8 z-10">
                <div className="flex items-center gap-6 mb-4">
                    <span className="text-2xl font-medium">
                        <span className="text-blue-400">G</span>
                        <span className="text-red-400">o</span>
                        <span className="text-yellow-400">o</span>
                        <span className="text-blue-400">g</span>
                        <span className="text-green-400">l</span>
                        <span className="text-red-400">e</span>
                    </span>
                    <div className="flex-1 max-w-xl h-11 bg-[#303134] rounded-full flex items-center px-4 border border-[#5F6368] hover:border-[#8AB4F8] transition-colors shadow-sm">
                        <span className="text-white/80 flex-1">{query}</span>
                        <X size={16} className="text-gray-400 cursor-pointer mr-3" onClick={() => onNavigate('about:newtab')} />
                        <Search size={16} className="text-blue-400" />
                    </div>
                </div>
                <div className="flex gap-4 text-sm">
                    <span className="text-blue-400 border-b-2 border-blue-400 pb-2 px-1">All</span>
                    <span className="text-white/60 pb-2 px-1 cursor-pointer hover:text-white/80">Images</span>
                    <span className="text-white/60 pb-2 px-1 cursor-pointer hover:text-white/80">Videos</span>
                    <span className="text-white/60 pb-2 px-1 cursor-pointer hover:text-white/80">News</span>
                </div>
            </div>

            <div className="max-w-3xl px-8 py-4">
                <p className="text-sm text-[#9AA0A6] mb-6">About {Math.floor(Math.random() * 900 + 100)},000,000 results (0.{Math.floor(Math.random() * 90 + 10)} seconds)</p>

                <div className="space-y-8">
                    {results.map((result, i) => (
                        <div key={i} className="group cursor-pointer" onClick={() => onNavigate(result.url)}>
                            <div className="flex items-center gap-2 text-sm text-[#BDC1C6] mb-1">
                                <div className="w-7 h-7 bg-[#303134] rounded-full flex items-center justify-center text-xs">
                                    {result.favicon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#BDC1C6] text-xs">{result.domain}</span>
                                    <span className="text-[#8E918F] text-xs">{result.url.length > 60 ? result.url.slice(0, 60) + '...' : result.url}</span>
                                </div>
                            </div>
                            <h3 className="text-xl text-[#8AB4F8] group-hover:underline mb-1 leading-snug">{result.title}</h3>
                            <p className="text-sm text-[#BDC1C6] leading-relaxed">{result.snippet}</p>
                        </div>
                    ))}
                </div>

                {/* "People also ask" */}
                <div className="mt-8 border border-[#3C4043] rounded-xl overflow-hidden">
                    <h3 className="text-base font-medium text-[#E8EAED] px-4 py-3">People also ask</h3>
                    {[
                        `What is ${query} used for?`,
                        `How to learn ${query}?`,
                        `Is ${query} free to use?`,
                        `${query} vs alternatives`,
                    ].map((q, i) => (
                        <div key={i} className="border-t border-[#3C4043] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#303134] transition-colors"
                            onClick={() => onNavigate(`search://${q}`)}
                        >
                            <span className="text-sm text-[#E8EAED]">{q}</span>
                            <ArrowRight size={14} className="text-[#9AA0A6]" />
                        </div>
                    ))}
                </div>

                {/* Related searches */}
                <div className="mt-8 mb-12">
                    <h3 className="text-base font-medium text-[#E8EAED] mb-3">Related searches</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            `${query} tutorial`,
                            `${query} documentation`,
                            `best ${query} practices`,
                            `${query} examples`,
                            `${query} download`,
                            `${query} alternative`,
                        ].map((q, i) => (
                            <button key={i} onClick={() => onNavigate(`search://${q}`)}
                                className="flex items-center gap-3 bg-[#303134] rounded-full px-4 py-2.5 text-sm text-[#8AB4F8] hover:underline text-left"
                            >
                                <Search size={14} className="text-[#9AA0A6] flex-shrink-0" />
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── New Tab Page ───────────────────────────────────────────────── */
const NewTabPage: React.FC<{ onNavigate: (url: string) => void }> = ({ onNavigate }) => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className="w-full h-full bg-[#1F1F1F] text-white flex flex-col items-center overflow-y-auto custom-scrollbar">
            <div className="flex flex-col items-center justify-center flex-1 w-full max-w-lg px-6 pb-20">
                {/* Logo */}
                <div className="text-5xl font-bold mb-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none">
                    Browser
                </div>

                {/* Search bar */}
                <div className="relative w-full mb-10">
                    <input
                        type="text"
                        placeholder="Search Google or type a URL"
                        className="w-full bg-[#303134] rounded-full py-3.5 pl-12 pr-6 text-white border border-[#5F6368] hover:border-[#8E918F] focus:border-blue-500/60 focus:outline-none shadow-lg transition-colors text-sm"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && searchInput.trim()) {
                                onNavigate(searchInput.trim());
                            }
                        }}
                    />
                    <Search className="absolute left-4 top-3.5 text-[#9AA0A6]" size={18} />
                </div>

                {/* Quick Shortcuts Grid */}
                <div className="grid grid-cols-4 gap-x-6 gap-y-5 w-full max-w-md">
                    {SHORTCUTS.map(site => (
                        <button
                            key={site.name}
                            onClick={() => onNavigate(site.url)}
                            className="flex flex-col items-center gap-2.5 group"
                        >
                            <div className={`w-12 h-12 rounded-full ${site.color} flex items-center justify-center text-white text-lg font-bold group-hover:scale-110 transition-transform shadow-lg border border-white/10`}>
                                {site.icon}
                            </div>
                            <span className="text-[11px] text-[#9AA0A6] group-hover:text-white transition-colors truncate max-w-[72px]">{site.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom customize text */}
            <div className="pb-4 text-xs text-[#9AA0A6]">
                Customize this page
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN BROWSER APP                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

export const BrowserApp: React.FC = () => {
    const [tabs, setTabs] = useState<Tab[]>([createNewTab()]);
    const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

    /* ── Tab helpers ──────────────────────────────────────────────── */
    const updateTab = useCallback((tabId: string, updates: Partial<Tab>) => {
        setTabs(prev => prev.map(t => t.id === tabId ? { ...t, ...updates } : t));
    }, []);

    const addNewTab = useCallback(() => {
        const tab = createNewTab();
        setTabs(prev => [...prev, tab]);
        setActiveTabId(tab.id);
    }, []);

    const closeTab = useCallback((tabId: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setTabs(prev => {
            if (prev.length === 1) {
                // Don't close last tab, just reset it
                const newTab = createNewTab();
                setActiveTabId(newTab.id);
                return [newTab];
            }
            const idx = prev.findIndex(t => t.id === tabId);
            const remaining = prev.filter(t => t.id !== tabId);
            if (tabId === activeTabId) {
                const newActiveIdx = Math.min(idx, remaining.length - 1);
                setActiveTabId(remaining[newActiveIdx].id);
            }
            return remaining;
        });
    }, [activeTabId]);

    /* ── Navigation ───────────────────────────────────────────────── */
    const navigateTab = useCallback((rawInput: string, tabId?: string) => {
        const id = tabId || activeTabId;
        let finalUrl = rawInput;
        let youtubeVideoId: string | null = null;
        let title = 'Web Page';

        // YouTube special handling
        if (rawInput.includes('youtube.com') || rawInput.includes('youtu.be')) {
            const ytId = extractYoutubeId(rawInput);
            if (ytId) {
                youtubeVideoId = ytId;
                finalUrl = `https://www.youtube.com/watch?v=${ytId}`;
                title = 'YouTube';
            } else {
                finalUrl = 'internal://youtube';
                title = 'YouTube';
            }
        } else if (rawInput === 'internal://youtube') {
            finalUrl = rawInput;
            title = 'YouTube';
        } else if (rawInput === 'about:newtab') {
            finalUrl = rawInput;
            title = 'New Tab';
        } else if (rawInput.startsWith('search://')) {
            finalUrl = rawInput;
            title = rawInput.replace('search://', '') + ' - Google Search';
        } else if (!rawInput.startsWith('http') && !rawInput.startsWith('internal://')) {
            if (rawInput.includes('.') && !rawInput.includes(' ')) {
                finalUrl = `https://${rawInput}`;
                try { title = new URL(finalUrl).hostname; } catch { title = rawInput; }
            } else {
                finalUrl = `search://${rawInput}`;
                title = rawInput + ' - Google Search';
            }
        } else {
            try { title = new URL(finalUrl).hostname; } catch { title = finalUrl; }
        }

        const tab = tabs.find(t => t.id === id);
        if (!tab) return;

        const newHistory = tab.history.slice(0, tab.historyIndex + 1);
        newHistory.push(finalUrl);

        updateTab(id, {
            url: finalUrl,
            displayUrl: finalUrl === 'about:newtab' ? '' :
                finalUrl === 'internal://youtube' ? 'youtube.com' :
                    finalUrl.startsWith('search://') ? finalUrl.replace('search://', '') :
                        finalUrl,
            title,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            isLoading: true,
            youtubeVideoId,
            favicon: finalUrl.startsWith('https://') ? getFaviconUrl(finalUrl) : null,
        });

        setTimeout(() => updateTab(id, { isLoading: false }), 600);
    }, [activeTabId, tabs, updateTab]);

    const goBack = useCallback(() => {
        const tab = activeTab;
        if (tab.historyIndex > 0) {
            const newIndex = tab.historyIndex - 1;
            const prevUrl = tab.history[newIndex];
            const ytId = extractYoutubeId(prevUrl);
            updateTab(tab.id, {
                url: prevUrl,
                displayUrl: prevUrl === 'about:newtab' ? '' : prevUrl.startsWith('search://') ? prevUrl.replace('search://', '') : prevUrl,
                historyIndex: newIndex,
                youtubeVideoId: ytId,
                title: prevUrl === 'about:newtab' ? 'New Tab' : (ytId ? 'YouTube' : prevUrl.startsWith('search://') ? prevUrl.replace('search://', '') + ' - Google Search' : 'Web Page'),
            });
        }
    }, [activeTab, updateTab]);

    const goForward = useCallback(() => {
        const tab = activeTab;
        if (tab.historyIndex < tab.history.length - 1) {
            const newIndex = tab.historyIndex + 1;
            const nextUrl = tab.history[newIndex];
            const ytId = extractYoutubeId(nextUrl);
            updateTab(tab.id, {
                url: nextUrl,
                displayUrl: nextUrl === 'about:newtab' ? '' : nextUrl.startsWith('search://') ? nextUrl.replace('search://', '') : nextUrl,
                historyIndex: newIndex,
                youtubeVideoId: ytId,
                title: nextUrl === 'about:newtab' ? 'New Tab' : (ytId ? 'YouTube' : nextUrl.startsWith('search://') ? nextUrl.replace('search://', '') + ' - Google Search' : 'Web Page'),
            });
        }
    }, [activeTab, updateTab]);

    const reload = useCallback(() => {
        updateTab(activeTab.id, { isLoading: true });
        if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
        setTimeout(() => updateTab(activeTab.id, { isLoading: false }), 600);
    }, [activeTab, updateTab]);

    const goHome = useCallback(() => {
        navigateTab('about:newtab');
    }, [navigateTab]);

    /* ── Determine what to show ───────────────────────────────────── */
    const viewType = getViewType(activeTab.url, activeTab.youtubeVideoId);
    const searchQuery = activeTab.url.startsWith('search://') ? activeTab.url.replace('search://', '') : '';

    return (
        <div className="flex flex-col h-full bg-[#202020] text-white overflow-hidden select-none">
            {/* ─── Tab Bar ──────────────────────────────────────────── */}
            <div className="h-10 bg-[#202020] flex items-end px-2 pr-1 gap-0.5 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`min-w-[120px] max-w-[200px] h-[34px] rounded-t-lg flex items-center justify-between px-3 text-xs cursor-pointer transition-colors relative group ${tab.id === activeTabId
                                ? 'bg-[#3C3C3C] text-white shadow-[0_-2px_10px_rgba(0,0,0,0.2)]'
                                : 'bg-[#2B2B2B] text-white/60 hover:bg-[#353535]'
                            }`}
                    >
                        <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                            {tab.isLoading ? (
                                <RotateCw size={10} className="animate-spin flex-shrink-0 text-blue-400" />
                            ) : tab.favicon ? (
                                <img src={tab.favicon} alt="" className="w-3.5 h-3.5 flex-shrink-0 rounded-sm" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            ) : (
                                <div className="w-3 h-3 bg-blue-500/60 rounded-full flex-shrink-0" />
                            )}
                            <span className="truncate">{tab.title}</span>
                        </div>
                        <button
                            onClick={(e) => closeTab(tab.id, e)}
                            className="ml-1 p-0.5 rounded hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        >
                            <X size={11} />
                        </button>
                    </div>
                ))}
                {/* New Tab (+) button */}
                <button
                    onClick={addNewTab}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full mb-0.5 cursor-pointer transition-colors flex-shrink-0"
                    title="New Tab"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* ─── Navigation Bar ───────────────────────────────────── */}
            <div className="h-11 bg-[#3C3C3C] flex items-center px-3 gap-2 border-b border-black/20 shadow-sm z-10">
                <div className="flex gap-1">
                    <button onClick={goBack} disabled={activeTab.historyIndex === 0}
                        className="p-1.5 hover:bg-white/10 rounded-full disabled:opacity-25 disabled:hover:bg-transparent transition-colors">
                        <ArrowLeft size={15} />
                    </button>
                    <button onClick={goForward} disabled={activeTab.historyIndex === activeTab.history.length - 1}
                        className="p-1.5 hover:bg-white/10 rounded-full disabled:opacity-25 disabled:hover:bg-transparent transition-colors">
                        <ArrowRight size={15} />
                    </button>
                    <button onClick={reload}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                        <RotateCw size={13} className={activeTab.isLoading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={goHome}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                        <Home size={14} />
                    </button>
                </div>

                {/* Address Bar */}
                <div className="flex-1 h-8 bg-[#2A2A2A] rounded-full flex items-center px-3 gap-2 border border-transparent focus-within:border-blue-500/50 transition-all shadow-inner">
                    {viewType === 'newtab' || viewType === 'search' || viewType === 'youtube-home'
                        ? <Search size={13} className="text-gray-500 flex-shrink-0" />
                        : <Lock size={11} className="text-green-500 flex-shrink-0" />
                    }
                    <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 selection:bg-blue-500/40"
                        value={activeTab.displayUrl}
                        onChange={(e) => updateTab(activeTab.id, { displayUrl: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && activeTab.displayUrl.trim()) {
                                navigateTab(activeTab.displayUrl.trim());
                            }
                        }}
                        onFocus={(e) => e.target.select()}
                        placeholder="Search Google or type a URL"
                    />
                    <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <Star size={13} className="text-gray-500" />
                    </button>
                </div>

                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <Download size={14} className="text-gray-400" />
                </button>
            </div>

            {/* ─── Bookmarks Bar ────────────────────────────────────── */}
            <div className="h-8 bg-[#3C3C3C] flex items-center px-4 gap-3 border-b border-black/10 overflow-x-auto no-scrollbar">
                {BOOKMARKS.map(bm => (
                    <button
                        key={bm.name}
                        onClick={() => navigateTab(bm.url)}
                        className="flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white whitespace-nowrap transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
                    >
                        <span className="text-xs">{bm.icon}</span>
                        {bm.name}
                    </button>
                ))}
            </div>

            {/* ─── Content Area ─────────────────────────────────────── */}
            <div className="flex-1 relative overflow-hidden">
                {/* Loading bar */}
                {activeTab.isLoading && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 z-20 animate-pulse" />
                )}

                {viewType === 'newtab' && (
                    <NewTabPage onNavigate={navigateTab} />
                )}
                {viewType === 'youtube-player' && activeTab.youtubeVideoId && (
                    <YouTubePlayer videoId={activeTab.youtubeVideoId} />
                )}
                {viewType === 'youtube-home' && (
                    <YouTubeHome onPlay={(id) => navigateTab(`https://youtube.com/watch?v=${id}`)} />
                )}
                {viewType === 'search' && (
                    <SearchResults query={searchQuery} onNavigate={navigateTab} />
                )}
                {viewType === 'blocked' && (
                    <BlockedSitePage url={activeTab.url} onSearch={(q) => navigateTab(`search://${q}`)} />
                )}
                {viewType === 'iframe' && (
                    <div className="w-full h-full relative bg-white">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400 z-0">
                            <div className="text-center p-8">
                                <div className="inline-block p-4 rounded-full bg-gray-200 mb-4">
                                    <Globe size={32} className="text-gray-400" />
                                </div>
                                <p className="mb-2 font-medium text-gray-600">Loading website...</p>
                            </div>
                        </div>
                        <iframe
                            ref={iframeRef}
                            src={activeTab.url}
                            className="w-full h-full border-none relative z-10"
                            title="Browser View"
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import {
    Search, Home, Bell, MessageCircle, Heart, Share2, Bookmark, MoreHorizontal,
    Users, GitBranch, Star, MapPin, Calendar, Link2, Mail, Briefcase, Image, Grid3X3,
    Play, ChevronDown, ThumbsUp, Send, Plus, Settings, User, Globe, Code2
} from 'lucide-react';
const GITHUB_USERNAME = "Awaneesh03";
const PORTFOLIO = {
  name: "Awaneesh",
  title: "Full Stack Developer",
  email: "kg3327949@gmail.com",
  github: "https://github.com/Awaneesh03",
};


/* ═══════════════════════════════════════════════════════════════════ */
/*  GITHUB SIMULATION                                                 */
/* ═══════════════════════════════════════════════════════════════════ */
export const SimulatedGitHub: React.FC<{ username?: string; query?: string }> = ({ username = GITHUB_USERNAME }) => {
    const [activeTab, setActiveTab] = useState('repositories');

    const repos = [
        { name: 'pacify', desc: 'Browser-based 3D multiplayer hide-and-seek horror game — Three.js + Socket.io', lang: 'TypeScript', langColor: '#3178c6', stars: 0, forks: 0, updated: 'this week' },
        { name: 'serina', desc: 'Local-first voice AI assistant — offline Whisper, Llama 3 via Ollama, emotion-aware TTS', lang: 'JavaScript', langColor: '#f1e05a', stars: 0, forks: 0, updated: 'this week' },
        { name: 'vaultwork', desc: 'Local-first productivity system — Obsidian vault, Tauri desktop app and a Claude MCP server', lang: 'TypeScript', langColor: '#3178c6', stars: 0, forks: 0, updated: 'this week' },
        { name: 'motif-website', desc: 'AI-powered platform for founders to validate startup ideas and connect with VCs — React + Supabase + Groq', lang: 'TypeScript', langColor: '#3178c6', stars: 0, forks: 0, updated: 'this week' },
        { name: 'Awaneesh-portfolio', desc: 'macOS-style interactive developer portfolio built with React & TypeScript', lang: 'TypeScript', langColor: '#3178c6', stars: 0, forks: 0, updated: 'this week' },
        { name: 'digital-life-dashboard', desc: 'All-in-one personal dashboard — tasks, habits, expenses, budgets and goals', lang: 'JavaScript', langColor: '#f1e05a', stars: 0, forks: 0, updated: 'this week' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <User size={14} /> },
        { id: 'repositories', label: 'Repositories', count: 13, icon: <Code2 size={14} /> },
        { id: 'projects', label: 'Projects', icon: <Grid3X3 size={14} /> },
        { id: 'stars', label: 'Stars', count: 2, icon: <Star size={14} /> },
    ];

    return (
        <div className="w-full h-full bg-[#0d1117] text-[#e6edf3] overflow-y-auto custom-scrollbar">
            {/* GitHub Header */}
            <div className="bg-[#161b22] border-b border-[#30363d] px-6 py-3">
                <div className="flex items-center gap-4">
                    <svg height="28" viewBox="0 0 16 16" width="28" fill="#e6edf3"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                    <div className="flex items-center gap-2 flex-1">
                        <div className="flex-1 max-w-xs">
                            <div className="bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm flex items-center gap-2">
                                <Search size={14} className="text-[#8b949e]" />
                                <span className="text-[#8b949e]">Type / to search</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Bell size={18} className="text-[#e6edf3] cursor-pointer" />
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold">A</div>
                    </div>
                </div>
            </div>

            {/* Profile section */}
            <div className="flex gap-8 px-6 pt-6 max-w-5xl mx-auto">
                {/* Left: Avatar + Bio */}
                <div className="w-72 flex-shrink-0">
                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 border-4 border-[#0d1117] overflow-hidden mb-4 shadow-xl flex items-center justify-center">
                        <span className="text-7xl font-bold text-white">A</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#e6edf3]">{PORTFOLIO.name}</h1>
                    <h2 className="text-xl text-[#8b949e] font-light">{username}</h2>
                    <p className="text-[#e6edf3] text-sm mt-3 leading-relaxed">{PORTFOLIO.title} • Building cool stuff with code ✨</p>

                    <button className="w-full mt-4 py-1.5 px-4 border border-[#30363d] rounded-md text-sm font-medium bg-[#21262d] hover:bg-[#30363d] transition-colors">
                        Edit profile
                    </button>

                    <div className="mt-4 space-y-1.5 text-sm text-[#8b949e]">
                        <div className="flex items-center gap-2"><Users size={14} /> <span><b className="text-[#e6edf3]">5</b> followers · <b className="text-[#e6edf3]">8</b> following</span></div>
                        <div className="flex items-center gap-2"><MapPin size={14} /> <span>India</span></div>
                        <div className="flex items-center gap-2"><Mail size={14} /> <span>{PORTFOLIO.email}</span></div>
                        <div className="flex items-center gap-2"><Link2 size={14} /> <a className="text-blue-400 hover:underline">{PORTFOLIO.github.replace('https://', '')}</a></div>
                    </div>
                </div>

                {/* Right: Repos */}
                <div className="flex-1 min-w-0">
                    {/* Tabs */}
                    <div className="flex border-b border-[#30363d] mb-4">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-[#f78166] text-[#e6edf3]' : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
                                    }`}>
                                {tab.icon} {tab.label}
                                {tab.count !== undefined && (
                                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-[#30363d] rounded-full">{tab.count}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Search + Sort */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm flex items-center">
                            <Search size={14} className="text-[#8b949e] mr-2" />
                            <span className="text-[#8b949e]">Find a repository...</span>
                        </div>
                        <button className="px-3 py-1.5 border border-[#30363d] rounded-md text-sm bg-[#21262d] flex items-center gap-1">Type <ChevronDown size={12} /></button>
                        <button className="px-3 py-1.5 border border-[#30363d] rounded-md text-sm bg-[#21262d] flex items-center gap-1">Language <ChevronDown size={12} /></button>
                        <button className="px-4 py-1.5 rounded-md text-sm bg-[#238636] text-white font-medium hover:bg-[#2ea043]">New</button>
                    </div>

                    {/* Repo list */}
                    <div className="divide-y divide-[#30363d]">
                        {repos.map(repo => (
                            <div key={repo.name} className="py-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <a className="text-xl font-bold text-[#58a6ff] hover:underline cursor-pointer">{username}/{repo.name}</a>
                                        <p className="text-sm text-[#8b949e] mt-1">{repo.desc}</p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-[#8b949e]">
                                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: repo.langColor }} />{repo.lang}</span>
                                            {repo.stars > 0 && <span className="flex items-center gap-1"><Star size={12} /> {repo.stars}</span>}
                                            {repo.forks > 0 && <span className="flex items-center gap-1"><GitBranch size={12} /> {repo.forks}</span>}
                                            <span>Updated {repo.updated}</span>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 border border-[#30363d] rounded-md text-xs bg-[#21262d] flex items-center gap-1.5 hover:bg-[#30363d]">
                                        <Star size={12} /> Star
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  LINKEDIN SIMULATION                                               */
/* ═══════════════════════════════════════════════════════════════════ */
export const SimulatedLinkedIn: React.FC<{ query?: string }> = () => {
    const [activeTab, setActiveTab] = useState('posts');

    const posts = [
        {
            text: "Excited to share my latest project — a macOS-style portfolio built with React & TypeScript! 🎉 It features a working browser, terminal, dock with app management, and real-time weather. Check it out and let me know what you think! #webdev #react #portfolio",
            likes: 42, comments: 8, time: '2d',
        },
        {
            text: "Just launched Motif — a full-stack web platform with a TypeScript frontend and Java Spring Boot backend, deployed on Vercel! Building this taught me so much about API design, deployment, and full-stack architecture. 🚀 #startup #fullstack",
            likes: 67, comments: 15, time: '1w',
        },
    ];

    return (
        <div className="w-full h-full bg-[#f4f2ee] overflow-y-auto custom-scrollbar">
            {/* LinkedIn Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0a66c2" width="30" height="30">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <div className="flex-1 max-w-xs">
                        <div className="bg-[#edf3f8] rounded-sm px-3 py-1.5 text-sm flex items-center gap-2">
                            <Search size={14} className="text-gray-500" />
                            <span className="text-gray-500">Search</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex flex-col items-center text-xs cursor-pointer hover:text-black"><Home size={18} /><span>Home</span></div>
                        <div className="flex flex-col items-center text-xs cursor-pointer hover:text-black"><Users size={18} /><span>Network</span></div>
                        <div className="flex flex-col items-center text-xs cursor-pointer hover:text-black"><Briefcase size={18} /><span>Jobs</span></div>
                        <div className="flex flex-col items-center text-xs cursor-pointer hover:text-black"><MessageCircle size={18} /><span>Messaging</span></div>
                        <div className="flex flex-col items-center text-xs cursor-pointer hover:text-black"><Bell size={18} /><span>Notifications</span></div>
                    </div>
                </div>
            </div>

            {/* Profile Banner */}
            <div className="max-w-3xl mx-auto mt-4">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 relative" />
                    <div className="px-6 pb-4 relative">
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 border-4 border-white absolute -top-16 shadow-xl flex items-center justify-center">
                            <span className="text-5xl font-bold text-white">A</span>
                        </div>
                        <div className="pt-20">
                            <h1 className="text-2xl font-bold text-gray-900">{PORTFOLIO.name}</h1>
                            <p className="text-base text-gray-700">{PORTFOLIO.title}</p>
                            <p className="text-sm text-gray-500 mt-1">India · <span className="text-blue-600 font-medium cursor-pointer hover:underline">Contact info</span></p>
                            <p className="text-sm text-blue-600 mt-1 cursor-pointer hover:underline">5 connections</p>
                            <div className="flex gap-2 mt-3">
                                <button className="px-5 py-1.5 bg-[#0a66c2] text-white rounded-full text-sm font-bold hover:bg-[#004182]">Open to</button>
                                <button className="px-5 py-1.5 border border-[#0a66c2] text-[#0a66c2] rounded-full text-sm font-bold hover:bg-blue-50">Add section</button>
                                <button className="px-5 py-1.5 border border-gray-400 text-gray-600 rounded-full text-sm font-bold hover:bg-gray-100">More</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mt-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {PORTFOLIO.title}. Passionate about building full-stack web applications and creating
                        beautiful user experiences. Currently working on Motif — a full-stack web platform,
                        and exploring AI/ML. Open to collaboration and internship opportunities! 🚀
                    </p>
                </div>

                {/* Activity/Posts */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mt-2">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Activity</h2>
                            <p className="text-sm text-gray-500">42 followers</p>
                        </div>
                        <button className="px-4 py-1 border border-[#0a66c2] text-[#0a66c2] rounded-full text-sm font-bold">Create a post</button>
                    </div>

                    <div className="space-y-4">
                        {posts.map((post, i) => (
                            <div key={i} className="border border-gray-100 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                                        <span className="text-sm font-bold text-white">A</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{PORTFOLIO.name}</p>
                                        <p className="text-xs text-gray-500">{post.time}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed">{post.text}</p>
                                <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
                                    <ThumbsUp size={12} className="text-blue-600" /> {post.likes} · {post.comments} comments
                                </div>
                                <div className="flex border-t border-gray-100 mt-3 pt-3 gap-1">
                                    {[{ icon: <ThumbsUp size={16} />, text: 'Like' }, { icon: <MessageCircle size={16} />, text: 'Comment' }, { icon: <Share2 size={16} />, text: 'Share' }, { icon: <Send size={16} />, text: 'Send' }].map(a => (
                                        <button key={a.text} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded hover:bg-gray-100 text-sm text-gray-600 font-medium">{a.icon}{a.text}</button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  INSTAGRAM SIMULATION                                              */
/* ═══════════════════════════════════════════════════════════════════ */
export const SimulatedInstagram: React.FC<{ query?: string }> = () => {
    // Generate placeholder grid images with gradients
    const posts = Array.from({ length: 9 }, (_, i) => ({
        id: i,
        likes: Math.floor(Math.random() * 200 + 20),
        comments: Math.floor(Math.random() * 30 + 2),
        gradient: [
            'from-purple-600 to-pink-500',
            'from-blue-500 to-cyan-400',
            'from-orange-500 to-red-500',
            'from-green-500 to-teal-400',
            'from-yellow-500 to-orange-400',
            'from-indigo-500 to-purple-500',
            'from-pink-500 to-rose-400',
            'from-teal-500 to-blue-400',
            'from-red-500 to-orange-400',
        ][i],
        emoji: ['💻', '🚀', '🎨', '☕', '🌆', '🎯', '📸', '✨', '🔥'][i],
    }));

    return (
        <div className="w-full h-full bg-black text-white overflow-y-auto custom-scrollbar">
            {/* Instagram Header */}
            <div className="bg-black border-b border-[#262626] sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" fill="white" height="28">
                        <path d="M170.1 47.6c-45.5 0-51.2.2-69 1-17.8.8-30 3.6-40.6 7.7-11 4.3-20.3 10-29.6 19.3-9.3 9.3-15 18.6-19.3 29.6-4.1 10.7-6.9 22.8-7.7 40.6-.8 17.9-1 23.6-1 69s.2 51.2 1 69c.8 17.8 3.6 30 7.7 40.6 4.3 11 10 20.3 19.3 29.6 9.3 9.3 18.6 15 29.6 19.3 10.7 4.1 22.8 6.9 40.6 7.7 17.9.8 23.6 1 69 1s51.2-.2 69-1c17.8-.8 30-3.6 40.6-7.7 11-4.3 20.3-10 29.6-19.3 9.3-9.3 15-18.6 19.3-29.6 4.1-10.7 6.9-22.8 7.7-40.6.8-17.9 1-23.6 1-69s-.2-51.2-1-69c-.8-17.8-3.6-30-7.7-40.6-4.3-11-10-20.3-19.3-29.6-9.3-9.3-18.6-15-29.6-19.3-10.7-4.1-22.8-6.9-40.6-7.7-17.9-.8-23.6-1-69-1zm0 30.6c44.8 0 50.1.2 67.8 1 16.3.7 25.2 3.4 31.1 5.7 7.8 3 13.4 6.7 19.3 12.5 5.8 5.8 9.4 11.4 12.5 19.3 2.2 5.9 4.9 14.8 5.7 31.1.8 17.7 1 23 1 67.8s-.2 50.1-1 67.8c-.7 16.3-3.4 25.2-5.7 31.1-3 7.8-6.7 13.4-12.5 19.3-5.8 5.8-11.4 9.4-19.3 12.5-5.9 2.2-14.8 4.9-31.1 5.7-17.7.8-23 1-67.8 1s-50.1-.2-67.8-1c-16.3-.7-25.2-3.4-31.1-5.7-7.8-3-13.4-6.7-19.3-12.5-5.8-5.8-9.4-11.4-12.5-19.3-2.2-5.9-4.9-14.8-5.7-31.1-.8-17.7-1-23-1-67.8s.2-50.1 1-67.8c.7-16.3 3.4-25.2 5.7-31.1 3-7.8 6.7-13.4 12.5-19.3 5.8-5.8 11.4-9.4 19.3-12.5 5.9-2.2 14.8-4.9 31.1-5.7 17.7-.8 23-1 67.8-1zm0 52c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 145.1c-31.5 0-57.1-25.6-57.1-57.1s25.6-57.1 57.1-57.1 57.1 25.6 57.1 57.1-25.6 57.1-57.1 57.1zm112-148.8c0 11.3-9.2 20.5-20.5 20.5s-20.5-9.2-20.5-20.5 9.2-20.5 20.5-20.5 20.5 9.2 20.5 20.5z" />
                    </svg>
                    <div className="flex items-center gap-5">
                        <Heart size={22} className="cursor-pointer" />
                        <MessageCircle size={22} className="cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Profile */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-start gap-16 mb-10">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-1 flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-4 border-black">
                            <span className="text-5xl font-bold">A</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-xl font-light">awaneesh.dev</h1>
                            <button className="px-5 py-1.5 bg-[#363636] rounded-lg text-sm font-bold">Edit profile</button>
                            <Settings size={22} className="cursor-pointer" />
                        </div>
                        <div className="flex gap-8 mb-4 text-sm">
                            <span><b>9</b> posts</span>
                            <span><b>142</b> followers</span>
                            <span><b>89</b> following</span>
                        </div>
                        <div className="text-sm">
                            <p className="font-bold">{PORTFOLIO.name}</p>
                            <p className="text-gray-400">💻 Developer | 🎓 CSE (AI) Student</p>
                            <p className="text-gray-400">Building cool stuff with React & TypeScript ✨</p>
                            <a className="text-blue-400 hover:underline">{PORTFOLIO.github.replace('https://', '')}</a>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-t border-[#262626] justify-center gap-12">
                    <button className="flex items-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider border-t border-white -mt-px">
                        <Grid3X3 size={12} /> Posts
                    </button>
                    <button className="flex items-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <Bookmark size={12} /> Saved
                    </button>
                    <button className="flex items-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <User size={12} /> Tagged
                    </button>
                </div>

                {/* Post Grid */}
                <div className="grid grid-cols-3 gap-1 mt-1">
                    {posts.map(post => (
                        <div key={post.id} className={`aspect-square bg-gradient-to-br ${post.gradient} flex items-center justify-center cursor-pointer group relative`}>
                            <span className="text-5xl">{post.emoji}</span>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                                <span className="flex items-center gap-1.5 text-sm font-bold"><Heart size={16} fill="white" /> {post.likes}</span>
                                <span className="flex items-center gap-1.5 text-sm font-bold"><MessageCircle size={16} fill="white" /> {post.comments}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  TWITTER/X SIMULATION                                              */
/* ═══════════════════════════════════════════════════════════════════ */
export const SimulatedTwitter: React.FC<{ query?: string }> = () => {
    const tweets = [
        { text: "Just shipped my macOS portfolio 🚀 Complete with a working browser, terminal, and dock animations. Built with React + TypeScript. Check it out!", time: '2h', likes: 24, retweets: 5, replies: 3 },
        { text: "TIL: The key to great portfolio sites isn't showing what you know — it's showing what you can BUILD. Actions > words. 💡 #100DaysOfCode", time: '1d', likes: 89, retweets: 12, replies: 7 },
        { text: "Deployed Motif to Vercel today! Full-stack TypeScript + Java Spring Boot. From idea to production in 2 weeks. Wild ride. 🎢", time: '3d', likes: 45, retweets: 8, replies: 4 },
    ];

    return (
        <div className="w-full h-full bg-black text-white flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-56 border-r border-[#2f3336] p-3 flex flex-col items-end pr-6 flex-shrink-0">
                <div className="mb-6 mt-2 text-2xl font-bold">𝕏</div>
                {[
                    { icon: <Home size={22} />, text: 'Home', active: true },
                    { icon: <Search size={22} />, text: 'Explore' },
                    { icon: <Bell size={22} />, text: 'Notifications' },
                    { icon: <Mail size={22} />, text: 'Messages' },
                    { icon: <Bookmark size={22} />, text: 'Bookmarks' },
                    { icon: <User size={22} />, text: 'Profile' },
                ].map(item => (
                    <button key={item.text} className={`flex items-center gap-3 py-2.5 px-4 rounded-full text-lg mb-1 w-full hover:bg-[#16181c] transition-colors ${item.active ? 'font-bold' : ''}`}>
                        {item.icon} {item.text}
                    </button>
                ))}
                <button className="w-full mt-3 py-3 bg-white text-black rounded-full font-bold text-base hover:bg-gray-200">Post</button>
            </div>

            {/* Feed */}
            <div className="flex-1 border-r border-[#2f3336] overflow-y-auto custom-scrollbar">
                <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-3 z-10">
                    <h1 className="text-xl font-bold">Home</h1>
                </div>

                {/* Compose */}
                <div className="border-b border-[#2f3336] p-4 flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">A</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-500 text-lg py-2">What is happening?!</p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2f3336]">
                            <div className="flex gap-3 text-blue-400">
                                <Image size={18} /> <Play size={18} /> <MapPin size={18} />
                            </div>
                            <button className="px-5 py-1.5 bg-blue-500 rounded-full font-bold text-sm opacity-50">Post</button>
                        </div>
                    </div>
                </div>

                {/* Tweets */}
                {tweets.map((tweet, i) => (
                    <div key={i} className="border-b border-[#2f3336] p-4 flex gap-3 hover:bg-[#080808] cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">A</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="font-bold text-[15px]">{PORTFOLIO.name}</span>
                                <span className="text-gray-500 text-sm">@{GITHUB_USERNAME} · {tweet.time}</span>
                            </div>
                            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{tweet.text}</p>
                            <div className="flex items-center gap-12 mt-3 text-gray-500 text-sm">
                                <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer"><MessageCircle size={16} /> {tweet.replies}</span>
                                <span className="flex items-center gap-1.5 hover:text-green-400 cursor-pointer"><Share2 size={16} /> {tweet.retweets}</span>
                                <span className="flex items-center gap-1.5 hover:text-pink-400 cursor-pointer"><Heart size={16} /> {tweet.likes}</span>
                                <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer"><Bookmark size={16} /></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right sidebar (Trends) */}
            <div className="w-72 p-4 flex-shrink-0 hidden lg:block">
                <div className="bg-[#16181c] rounded-2xl p-4 mb-4">
                    <h3 className="text-xl font-bold mb-4">What's happening</h3>
                    {['#100DaysOfCode', '#webdev', '#React', 'TypeScript'].map(tag => (
                        <div key={tag} className="py-2.5 cursor-pointer hover:bg-[#1e2024] -mx-4 px-4 rounded">
                            <p className="text-xs text-gray-500">Trending in Technology</p>
                            <p className="font-bold text-[15px]">{tag}</p>
                            <p className="text-xs text-gray-500">{Math.floor(Math.random() * 50 + 5)}K posts</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  GOOGLE SIMULATION                                                 */
/* ═══════════════════════════════════════════════════════════════════ */
export const SimulatedGoogle: React.FC<{ query?: string }> = ({ query: initialQuery = '' }) => {
    const [inputValue, setInputValue] = useState(initialQuery);
    const [activeQuery, setActiveQuery] = useState(initialQuery);

    // When prop changes (browser navigated with new search), sync state
    React.useEffect(() => {
        setInputValue(initialQuery);
        setActiveQuery(initialQuery);
    }, [initialQuery]);

    const handleSearch = () => {
        const q = inputValue.trim();
        if (q) setActiveQuery(q);
    };

    const fakeResults = activeQuery ? [
        {
            title: `${activeQuery} - Wikipedia`,
            url: 'https://en.wikipedia.org/wiki/' + encodeURIComponent(activeQuery),
            snippet: `${activeQuery} is a topic with rich history and detailed information. Wikipedia provides comprehensive coverage including background, history, and related concepts.`,
        },
        {
            title: `${activeQuery} - GeeksforGeeks`,
            url: 'https://www.geeksforgeeks.org/search/?q=' + encodeURIComponent(activeQuery),
            snippet: `Learn about ${activeQuery} with examples, tutorials, and practice problems. GeeksforGeeks is a computer science portal for geeks.`,
        },
        {
            title: `${activeQuery} Tutorial - MDN Web Docs`,
            url: 'https://developer.mozilla.org/en-US/search?q=' + encodeURIComponent(activeQuery),
            snippet: `MDN Web Docs provides comprehensive documentation and tutorials for ${activeQuery}. Find examples, reference docs, and guides.`,
        },
        {
            title: `${activeQuery} - Stack Overflow`,
            url: 'https://stackoverflow.com/search?q=' + encodeURIComponent(activeQuery),
            snippet: `Questions and answers about ${activeQuery} on Stack Overflow. Find solutions to common problems and connect with developers.`,
        },
        {
            title: `${activeQuery} - YouTube`,
            url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(activeQuery),
            snippet: `Watch videos about ${activeQuery} on YouTube. Tutorials, explanations, and demonstrations from content creators worldwide.`,
        },
        {
            title: `${activeQuery} — GitHub Search`,
            url: 'https://github.com/search?q=' + encodeURIComponent(activeQuery),
            snippet: `Search code, repositories, and projects related to ${activeQuery} on GitHub. Millions of developers build with GitHub.`,
        },
    ] : [];

    if (!activeQuery) {
        // Homepage
        return (
            <div className="w-full h-full bg-[#202124] text-white flex flex-col items-center justify-center">
                <div className="flex flex-col items-center -mt-20">
                    <div className="text-[92px] font-normal mb-8 select-none">
                        <span style={{ color: '#4285f4' }}>G</span>
                        <span style={{ color: '#ea4335' }}>o</span>
                        <span style={{ color: '#fbbc05' }}>o</span>
                        <span style={{ color: '#4285f4' }}>g</span>
                        <span style={{ color: '#34a853' }}>l</span>
                        <span style={{ color: '#ea4335' }}>e</span>
                    </div>
                    <div className="w-[580px] max-w-[90vw]">
                        <div className="bg-[#303134] rounded-full flex items-center px-5 py-3 border border-[#5f6368] focus-within:border-[#8e918f] transition-all shadow-lg">
                            <Search size={18} className="text-[#9aa0a6] mr-3 flex-shrink-0" />
                            <input
                                type="text"
                                className="flex-1 bg-transparent outline-none text-white text-base"
                                placeholder="Search Google"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                                autoFocus
                            />
                        </div>
                        <div className="flex justify-center gap-3 mt-8">
                            <button onClick={handleSearch} className="px-4 py-2 bg-[#303134] text-[#e8eaed] rounded text-sm hover:border-[#5f6368] border border-transparent hover:bg-[#3c3c3c]">Google Search</button>
                            <button onClick={handleSearch} className="px-4 py-2 bg-[#303134] text-[#e8eaed] rounded text-sm hover:border-[#5f6368] border border-transparent hover:bg-[#3c3c3c]">I'm Feeling Lucky</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Search results page
    return (
        <div className="w-full h-full bg-[#202124] text-white overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="bg-[#202124] border-b border-[#3c4043] px-6 py-3 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold select-none cursor-pointer" onClick={() => setActiveQuery('')}>
                        <span style={{ color: '#4285f4' }}>G</span>
                        <span style={{ color: '#ea4335' }}>o</span>
                        <span style={{ color: '#fbbc05' }}>o</span>
                        <span style={{ color: '#4285f4' }}>g</span>
                        <span style={{ color: '#34a853' }}>l</span>
                        <span style={{ color: '#ea4335' }}>e</span>
                    </div>
                    <div className="flex-1 max-w-xl bg-[#303134] rounded-full flex items-center px-4 py-2 border border-[#5f6368] focus-within:border-blue-400 transition-colors">
                        <input
                            type="text"
                            className="flex-1 bg-transparent outline-none text-white text-sm"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                        />
                        <Search size={16} className="text-[#9aa0a6] ml-2 flex-shrink-0 cursor-pointer" onClick={handleSearch} />
                    </div>
                </div>
                <div className="flex gap-6 mt-2 ml-28 text-sm">
                    {['All', 'Images', 'Videos', 'News', 'Shopping'].map((tab, i) => (
                        <button key={tab} className={`pb-2 border-b-2 ${i === 0 ? 'border-blue-400 text-blue-400' : 'border-transparent text-[#9aa0a6] hover:text-white'}`}>{tab}</button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className="max-w-2xl px-6 py-4 ml-24">
                <p className="text-[#9aa0a6] text-sm mb-4">About {(Math.random() * 900 + 100).toFixed(0)} million results</p>
                <div className="space-y-6">
                    {fakeResults.map((result, i) => (
                        <div key={i} className="group">
                            <div className="text-xs text-[#9aa0a6] mb-0.5 truncate">{result.url}</div>
                            <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-[#8ab4f8] group-hover:underline cursor-pointer block mb-1"
                            >
                                {result.title}
                            </a>
                            <p className="text-sm text-[#bdc1c6] leading-relaxed">{result.snippet}</p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                    <span className="text-2xl font-bold mr-2">
                        <span style={{ color: '#4285f4' }}>G</span>
                        <span style={{ color: '#ea4335' }}>o</span>
                        <span style={{ color: '#fbbc05' }}>o</span>
                        <span style={{ color: '#4285f4' }}>g</span>
                        <span style={{ color: '#34a853' }}>l</span>
                        <span style={{ color: '#ea4335' }}>e</span>
                    </span>
                    {[1,2,3,4,5].map(n => (
                        <button key={n} className={`w-8 h-8 rounded-full text-sm ${n === 1 ? 'text-white bg-blue-600' : 'text-[#8ab4f8] hover:bg-[#303134]'}`}>{n}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

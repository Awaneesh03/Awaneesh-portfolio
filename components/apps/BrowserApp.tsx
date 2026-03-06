
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search, Lock, X, Globe, Play, Maximize } from 'lucide-react';

// Custom YouTube Player Component to bypass iframe restrictions
const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
    return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center">
            <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
            ></iframe>
        </div>
    );
};

// Simulated YouTube Home Component
const YouTubeHome: React.FC<{ onPlay: (id: string) => void }> = ({ onPlay }) => {
    const videos = [
        { id: 'jfKfPfyJRdk', title: 'lofi hip hop radio - beats to relax/study to', channel: 'Lofi Girl' },
        { id: 'M7FIvfx5J10', title: 'MacBook Air 15 review', channel: 'The Verge' },
        { id: 'LXb3EKWsInQ', title: 'COSTA RICA IN 4K 60fps HDR (ULTRA HD)', channel: 'Jacob + Katie Schwarz' },
        { id: '5qap5aO4i9A', title: 'lofi hip hop radio - beats to sleep/chill to', channel: 'Lofi Girl' },
    ];

    return (
        <div className="w-full h-full bg-[#0F0F0F] text-white overflow-y-auto p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <Play fill="white" size={12} className="text-white ml-0.5" />
                </div>
                <span className="text-xl font-bold tracking-tight">YouTube</span>
            </div>
            
            <h2 className="text-lg font-bold mb-4">Recommended</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {videos.map(v => (
                    <div key={v.id} onClick={() => onPlay(v.id)} className="cursor-pointer group">
                        <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden mb-2 relative">
                            <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={v.title} />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <Play size={32} fill="white" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-sm line-clamp-2 leading-tight mb-1">{v.title}</h3>
                        <p className="text-xs text-gray-400">{v.channel}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const BrowserApp: React.FC = () => {
  // Default to a search URL instead of google.com to avoid iframe blocking immediately
  const [url, setUrl] = useState('search://New Tab');
  const [inputUrl, setInputUrl] = useState('');
  const [history, setHistory] = useState<string[]>(['search://New Tab']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // YouTube special handling
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  const extractYoutubeId = (url: string): string | null => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleNavigate = (newUrl: string) => {
    setIsLoading(true);
    setYoutubeVideoId(null);
    let finalUrl = newUrl;
    
    // Check for YouTube
    if (newUrl.includes('youtube.com') || newUrl.includes('youtu.be')) {
        const videoId = extractYoutubeId(newUrl);
        if (videoId) {
            setYoutubeVideoId(videoId);
            finalUrl = `https://www.youtube.com/watch?v=${videoId}`; // Normalize for history
        } else {
             // If just youtube.com, go to custom home
             if (newUrl === 'youtube.com' || newUrl === 'www.youtube.com' || newUrl === 'https://www.youtube.com') {
                finalUrl = 'internal://youtube';
             } else {
                 // Try generic embed logic if not a video ID but still youtube? 
                 // Fallback to internal home for now to be safe
                 finalUrl = 'internal://youtube';
             }
        }
    } else if (!newUrl.startsWith('http') && !newUrl.startsWith('search://') && !newUrl.startsWith('internal://')) {
      if (newUrl.includes('.') && !newUrl.includes(' ')) {
        finalUrl = `https://${newUrl}`;
      } else {
        finalUrl = `search://${newUrl}`;
      }
    }
    
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(finalUrl);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setUrl(finalUrl);
    
    if (finalUrl.startsWith('internal://youtube')) {
        setInputUrl('youtube.com');
    } else {
        setInputUrl(finalUrl.replace('search://', ''));
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate(inputUrl);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevUrl = history[currentIndex - 1];
      setUrl(prevUrl);
      
      // Handle back nav for YT
      const ytId = extractYoutubeId(prevUrl);
      if (ytId) setYoutubeVideoId(ytId);
      else setYoutubeVideoId(null);

      setInputUrl(prevUrl.replace('search://', '').replace('internal://', ''));
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextUrl = history[currentIndex + 1];
      setUrl(nextUrl);

      // Handle fwd nav for YT
      const ytId = extractYoutubeId(nextUrl);
      if (ytId) setYoutubeVideoId(ytId);
      else setYoutubeVideoId(null);

      setInputUrl(nextUrl.replace('search://', '').replace('internal://', ''));
    }
  };

  const reload = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    setTimeout(() => setIsLoading(false), 800);
  };

  const isSearch = url.startsWith('search://');
  const isInternal = url.startsWith('internal://');
  const searchQuery = url.replace('search://', '');

  return (
    <div className="flex flex-col h-full bg-[#3C3C3C] text-white overflow-hidden">
      {/* Tab Bar */}
      <div className="h-10 bg-[#202020] flex items-end px-2 gap-2 select-none pt-2">
        <div className="w-48 h-full bg-[#3C3C3C] rounded-t-lg flex items-center justify-between px-3 text-xs relative group shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-2 truncate">
             <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0" />
             <span className="truncate">
                {youtubeVideoId ? 'YouTube' : isSearch ? (searchQuery === 'New Tab' ? 'New Tab' : `${searchQuery}`) : 'Web Page'}
             </span>
          </div>
          <X size={12} className="opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded p-0.5 cursor-pointer transition-opacity"/>
        </div>
        <div className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full mb-0.5 cursor-pointer transition-colors">
            <span className="text-xl leading-none pb-1">+</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="h-12 bg-[#3C3C3C] flex items-center px-4 gap-4 border-b border-black/20 shadow-sm z-10">
         <div className="flex gap-2">
            <button onClick={goBack} disabled={currentIndex === 0} className="p-1.5 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                <ArrowLeft size={16} />
            </button>
            <button onClick={goForward} disabled={currentIndex === history.length - 1} className="p-1.5 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                <ArrowRight size={16} />
            </button>
            <button onClick={reload} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <RotateCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>
         </div>

         {/* Address Bar */}
         <div className="flex-1 h-8 bg-[#2A2A2A] rounded-full flex items-center px-4 gap-3 border border-transparent focus-within:border-blue-500/50 transition-all shadow-inner group">
             {isSearch || isInternal ? <Search size={14} className="text-gray-400" /> : <Lock size={12} className="text-green-500" />}
             <input 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 selection:bg-blue-500/40"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={(e) => e.target.select()}
                placeholder="Search or enter web address"
             />
         </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white relative overflow-hidden">
        {isLoading && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-20" />
        )}
        
        {youtubeVideoId ? (
            <YouTubePlayer videoId={youtubeVideoId} />
        ) : url === 'internal://youtube' ? (
            <YouTubeHome onPlay={(id) => handleNavigate(`https://youtube.com/watch?v=${id}`)} />
        ) : isSearch ? (
            <div className="w-full h-full bg-[#1F1F1F] text-[#E8EAED] p-0 overflow-y-auto custom-scrollbar">
                {searchQuery === 'New Tab' ? (
                     <div className="flex flex-col items-center justify-center h-full pb-20">
                         <div className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Edge</div>
                         <div className="relative w-full max-w-lg">
                             <input 
                                type="text" 
                                placeholder="Search the web"
                                className="w-full bg-[#303134] rounded-full py-3 px-6 text-white border border-white/10 focus:border-white/30 focus:outline-none shadow-lg"
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') handleNavigate(e.currentTarget.value);
                                }}
                             />
                             <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
                         </div>
                         <div className="grid grid-cols-4 gap-6 mt-12">
                             {[
                                 {name: 'YouTube', icon: 'Y', color: 'bg-red-600', url: 'internal://youtube'},
                                 {name: 'GitHub', icon: 'G', color: 'bg-gray-800', url: 'github.com'},
                                 {name: 'Figma', icon: 'F', color: 'bg-purple-600', url: 'figma.com'},
                                 {name: 'Bing', icon: 'B', color: 'bg-blue-500', url: 'bing.com'}
                             ].map(site => (
                                 <button key={site.name} onClick={() => handleNavigate(site.url)} className="flex flex-col items-center gap-2 group">
                                     <div className={`w-12 h-12 rounded-full ${site.color} flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform shadow-lg`}>{site.icon}</div>
                                     <span className="text-xs text-gray-400">{site.name}</span>
                                 </button>
                             ))}
                         </div>
                     </div>
                ) : (
                    <div className="max-w-4xl mx-auto p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-2xl font-medium text-white">Google</span>
                            <div className="h-10 bg-[#303134] flex-1 rounded-full flex items-center px-4 border border-white/10 shadow-sm">
                                <span className="text-white/80">{searchQuery}</span>
                                <X size={16} className="ml-auto text-gray-400 cursor-pointer" onClick={() => handleNavigate('New Tab')} />
                            </div>
                        </div>
                        
                        <div className="text-sm text-gray-400 mb-6">About 2 results (simulated)</div>

                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                             {/* Result 1 */}
                            <div className="group cursor-pointer" onClick={() => alert("External link simulation")}>
                                 <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                                    <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">W</div>
                                    <span>en.wikipedia.org › wiki › {searchQuery}</span>
                                 </div>
                                 <h3 className="text-xl text-[#8AB4F8] group-hover:underline mb-1 visited:text-[#C58AF9]">{searchQuery} - Wikipedia</h3>
                                 <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                                     {searchQuery} is a very interesting topic. This is a simulated search result for the query "{searchQuery}" to demonstrate the browser functionality within this React application.
                                 </p>
                            </div>

                             {/* Result 2 */}
                             <div className="group cursor-pointer">
                                 <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                                    <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center"><Globe size={14}/></div>
                                    <span>www.web.com › results</span>
                                 </div>
                                 <h3 className="text-xl text-[#8AB4F8] group-hover:underline mb-1">Top results for {searchQuery}</h3>
                                 <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                                     Explore more about {searchQuery}. This simulated browser allows you to type URLs or search terms. Real websites may block embedding via iframes.
                                 </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="w-full h-full relative bg-white">
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400 z-0">
                    <div className="text-center p-8">
                        <div className="inline-block p-4 rounded-full bg-gray-200 mb-4">
                            <Lock size={32} className="text-gray-400" />
                        </div>
                        <p className="mb-2 font-medium text-gray-600">Loading website...</p>
                        <p className="text-xs max-w-md mx-auto text-gray-500">
                            Note: Major websites (Google, Facebook) block being embedded in iframes. 
                            If the screen stays white, the website has likely blocked this request.
                        </p>
                    </div>
                 </div>
                 <iframe 
                    ref={iframeRef}
                    src={url} 
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

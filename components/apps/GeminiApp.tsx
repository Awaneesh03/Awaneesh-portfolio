
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Image, Mic, Menu, Plus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const GeminiApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello, I am Gemini. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize AI client
  // Using a ref to keep instance consistent, though strictly we could instantiate per call.
  // We instantiate here to catch API_KEY issues early if needed.
  const aiRef = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    if (process.env.API_KEY) {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.error("API_KEY not found in environment");
        setMessages(prev => [...prev, { role: 'model', text: 'System Error: API Key missing. I cannot reply.' }]);
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || !aiRef.current) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    try {
        const chat = aiRef.current.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are Gemini, a helpful AI assistant in a simulated macOS environment."
            },
            history: messages.slice(1).map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }))
        });

        const resultStream = await chat.sendMessageStream({ message: userMsg });
        
        let accumulatedText = "";
        
        // Add placeholder message for model response
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of resultStream) {
            const chunkText = chunk.text;
            if (chunkText) {
                accumulatedText += chunkText;
                setMessages(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = { role: 'model', text: accumulatedText };
                    return newHistory;
                });
            }
        }
    } catch (error) {
        console.error("Gemini Error:", error);
        setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error connecting to the AI service." }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#131314] text-white font-sans overflow-hidden">
        {/* Sidebar (Hidden on small screens) */}
        <div className="w-64 bg-[#1E1F20] hidden md:flex flex-col p-4 border-r border-white/5 flex-shrink-0">
            <div className="flex items-center gap-2 mb-8">
                <Menu className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
                <span className="font-medium text-lg text-gray-200">Gemini</span>
            </div>
            
            <button 
                onClick={() => setMessages([{ role: 'model', text: 'Hello, I am Gemini. How can I help you today?' }])}
                className="flex items-center gap-3 bg-[#282A2C] hover:bg-[#37393B] px-4 py-3 rounded-full text-sm font-medium transition-colors mb-6 text-gray-200 shadow-sm"
            >
                <Plus size={18} />
                New chat
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="text-xs font-medium text-gray-400 mb-3 px-2">Recent</div>
                <div className="space-y-1">
                    {['Project Brainstorm', 'React Code Help', 'Email Draft'].map((title, i) => (
                        <div key={i} className="px-3 py-2 text-sm text-gray-300 hover:bg-[#282A2C] rounded-lg cursor-pointer truncate transition-colors">
                            {title}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-3 px-2">
                 <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold shadow-md">A</div>
                 <div className="text-sm overflow-hidden">
                     <div className="font-medium truncate">Aareev</div>
                     <div className="text-xs text-gray-400">Pro Plan</div>
                 </div>
            </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative h-full min-w-0">
            {/* Top Bar Mobile */}
            <div className="md:hidden h-14 flex items-center px-4 border-b border-white/10 bg-[#131314] flex-shrink-0">
                <Menu className="text-gray-400" />
                <span className="ml-4 font-medium">Gemini</span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar scroll-smooth">
                <div className="max-w-3xl mx-auto space-y-6 pb-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                             {msg.role === 'model' && (
                                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-red-500 flex-shrink-0 flex items-center justify-center shadow-lg mt-1">
                                     <Sparkles size={16} className="text-white" />
                                 </div>
                             )}
                             
                             <div className={`max-w-[85%] md:max-w-[75%] leading-relaxed text-[15px] ${msg.role === 'user' ? 'bg-[#282A2C] px-5 py-3 rounded-[20px] rounded-tr-sm text-gray-100' : 'pt-1 text-gray-200'}`} style={{ whiteSpace: 'pre-wrap' }}>
                                 {msg.text}
                             </div>

                             {msg.role === 'user' && (
                                 <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10">
                                     <User size={16} className="text-gray-300" />
                                 </div>
                             )}
                        </div>
                    ))}
                    {isTyping && (
                         <div className="flex gap-4">
                             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-red-500 flex-shrink-0 flex items-center justify-center animate-pulse">
                                 <Sparkles size={16} className="text-white" />
                             </div>
                             <div className="pt-3 flex gap-1">
                                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms'}}></div>
                                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms'}}></div>
                                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms'}}></div>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-[#131314] flex-shrink-0 z-10">
                <div className="max-w-3xl mx-auto bg-[#1E1F20] rounded-[28px] p-2 pl-4 flex items-end gap-2 border border-white/10 focus-within:bg-[#282A2C] focus-within:border-white/20 transition-all shadow-lg">
                    <div className="pb-3 flex gap-2 text-gray-400">
                        <div className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors"><Image size={20}/></div>
                        <div className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors"><Mic size={20}/></div>
                    </div>
                    <textarea 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask Gemini"
                        className="flex-1 bg-transparent border-none outline-none text-white resize-none py-3 max-h-32 min-h-[48px] custom-scrollbar text-[15px]"
                        rows={1}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping}
                        className="p-3 mb-1 mr-1 rounded-full bg-white text-black hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform active:scale-95"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <div className="text-center text-xs text-gray-500 mt-3 select-none">
                    Gemini may display inaccurate info, so double-check its responses.
                </div>
            </div>
        </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { skillCategories, getAllSkills } from '../../data/skills';
import { timeline, getYearsOfExperience } from '../../data/experience';
import { featuredProjects } from '../../data/projects';
import { socialLinks, contactInfo, GITHUB_USERNAME } from '../../data/social';

interface HistoryItem {
  id: number;
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 0,
      command: '',
      output: (
        <div className="text-green-400">
          <pre className="text-xs leading-tight mb-2">
{`
 █████╗ ██╗    ██╗ █████╗ ███╗   ██╗███████╗███████╗███████╗██╗  ██╗
██╔══██╗██║    ██║██╔══██╗████╗  ██║██╔════╝██╔════╝██╔════╝██║  ██║
███████║██║ █╗ ██║███████║██╔██╗ ██║█████╗  █████╗  ███████╗███████║
██╔══██║██║███╗██║██╔══██║██║╚██╗██║██╔══╝  ██╔══╝  ╚════██║██╔══██║
██║  ██║╚███╔███╔╝██║  ██║██║ ╚████║███████╗███████╗███████║██║  ██║
╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝
`}
          </pre>
          <p className="text-white/70 mb-1">Welcome to my interactive terminal portfolio!</p>
          <p className="text-white/50 text-sm">Type <span className="text-yellow-400">help</span> to see available commands.</p>
        </div>
      )
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const processCommand = (cmd: string): React.ReactNode => {
    const command = cmd.trim().toLowerCase();
    
    switch (command) {
      case 'help':
        return (
          <div className="space-y-1">
            <p className="text-blue-400 font-semibold mb-2">Available Commands:</p>
            <p><span className="text-yellow-400">whoami</span> - Display my profile</p>
            <p><span className="text-yellow-400">skills</span> - List my technical skills</p>
            <p><span className="text-yellow-400">projects</span> - View my projects</p>
            <p><span className="text-orange-400">startup</span> - Learn about my startup (Motif)</p>
            <p><span className="text-yellow-400">experience</span> - Show my experience</p>
            <p><span className="text-yellow-400">education</span> - Show my education</p>
            <p><span className="text-yellow-400">contact</span> - Get my contact info</p>
            <p><span className="text-yellow-400">social</span> - Show social links</p>
            <p><span className="text-yellow-400">github</span> - Open my GitHub profile</p>
            <p><span className="text-yellow-400">linkedin</span> - Open my LinkedIn profile</p>
            <p><span className="text-yellow-400">resume</span> - Download my resume</p>
            <p><span className="text-yellow-400">stats</span> - Show quick stats</p>
            <p><span className="text-yellow-400">clear</span> - Clear the terminal</p>
            <p><span className="text-yellow-400">exit</span> - Close terminal</p>
          </div>
        );

      case 'whoami':
        return (
          <div className="space-y-2">
            <p className="text-green-400 font-semibold text-lg">{profileData.name}</p>
            <p className="text-blue-400">{profileData.title}</p>
            <p className="text-yellow-400 italic">"{profileData.tagline}"</p>
            <p className="text-white/70 mt-2">{profileData.bio}</p>
            <p className="text-white/50 mt-2">📍 {profileData.location}</p>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-3">
            {skillCategories.map((category) => (
              <div key={category.name}>
                <p className="text-blue-400 font-semibold">{category.name}:</p>
                <p className="text-white/70">{category.skills.map(s => s.name).join(', ')}</p>
              </div>
            ))}
            <p className="text-white/50 text-sm mt-2">Total: {getAllSkills().length} skills across {skillCategories.length} categories</p>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-3">
            {featuredProjects.slice(0, 4).map((project, i) => (
              <div key={i} className="border-l-2 border-blue-500/50 pl-3">
                <p className="text-yellow-400 font-semibold">
                  {project.name} 
                  {project.isStartup && <span className="text-xs ml-2 text-orange-400">🚀 Startup</span>}
                  {project.featured && !project.isStartup && <span className="text-xs ml-2 text-yellow-500">⭐ Featured</span>}
                </p>
                <p className="text-white/60 text-sm">{project.description}</p>
                <p className="text-white/40 text-xs mt-1">Tech: {project.technologies.join(', ')}</p>
                {project.demo && <p className="text-cyan-400 text-xs">Demo: {project.demo}</p>}
              </div>
            ))}
            <p className="text-white/50 text-sm italic mt-2">Type 'startup' to learn about my startup project!</p>
          </div>
        );

      case 'startup':
      case 'motif':
        const startup = featuredProjects.find(p => p.isStartup);
        if (startup) {
          return (
            <div className="space-y-3">
              <p className="text-orange-400 font-bold text-lg">🚀 {startup.name} - My Startup Project</p>
              <p className="text-white/70">{startup.longDescription || startup.description}</p>
              <div className="space-y-1">
                <p className="text-blue-400 font-semibold">Tech Stack:</p>
                <p className="text-white/60">{startup.technologies.join(' • ')}</p>
              </div>
              {startup.architecture && (
                <div className="space-y-1">
                  <p className="text-green-400 font-semibold">Architecture:</p>
                  {startup.architecture.map((item, i) => (
                    <p key={i} className="text-white/50 text-sm">• {item}</p>
                  ))}
                </div>
              )}
              <div className="space-y-1 pt-2 border-t border-white/10">
                <p className="text-cyan-400">🔗 Links:</p>
                {startup.demo && <p className="text-white/60">Live Demo: <a href={startup.demo} target="_blank" className="text-cyan-400 hover:underline">{startup.demo}</a></p>}
                {startup.github && <p className="text-white/60">Frontend: <a href={startup.github} target="_blank" className="text-cyan-400 hover:underline">{startup.github}</a></p>}
                {startup.backendRepo && <p className="text-white/60">Backend: <a href={startup.backendRepo} target="_blank" className="text-cyan-400 hover:underline">{startup.backendRepo}</a></p>}
              </div>
            </div>
          );
        }
        return <p className="text-red-400">Startup project not found</p>;

      case 'experience':
        return (
          <div className="space-y-2">
            <p className="text-blue-400 mb-2">🗓️ {getYearsOfExperience()}+ years of building projects</p>
            {timeline.filter(t => t.type === 'work').map((exp, i) => (
              <div key={i} className="border-l-2 border-green-500/50 pl-3">
                <p className="text-green-400">{exp.startDate} - {exp.endDate || 'Present'}</p>
                <p className="text-white/80 font-semibold">{exp.title}</p>
                <p className="text-white/60 text-sm">{exp.organization}</p>
                <p className="text-white/50 text-sm mt-1">{exp.description}</p>
                {exp.technologies && (
                  <p className="text-white/40 text-xs mt-1">Tech: {exp.technologies.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-2">
            {profileData.education.map((edu, i) => (
              <div key={i} className="border-l-2 border-blue-500/50 pl-3">
                <p className="text-blue-400 font-semibold">{edu.degree}</p>
                <p className="text-white/70">{edu.institution}</p>
                <p className="text-white/50 text-sm">{edu.year} • {edu.location}</p>
                {edu.gpa && <p className="text-green-400 text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-1">
            <p className="text-blue-400 font-semibold mb-2">📬 Contact Information:</p>
            <p>📧 Email: <span className="text-cyan-400">{contactInfo.email}</span></p>
            <p>📍 Location: <span className="text-white/70">{contactInfo.location}</span></p>
            <p>🌍 Timezone: <span className="text-white/70">{contactInfo.timezone}</span></p>
            <p>💼 Status: <span className="text-green-400">{contactInfo.availability}</span></p>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-1">
            <p className="text-blue-400 font-semibold mb-2">🔗 Social Links:</p>
            {socialLinks.map((link, i) => (
              <p key={i}>
                {link.icon} {link.name}: <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{link.url}</a>
              </p>
            ))}
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-1">
            <p className="text-blue-400 font-semibold mb-2">📊 Quick Stats:</p>
            <p>🛠️ Skills: <span className="text-yellow-400">{getAllSkills().length}</span></p>
            <p>📂 Projects: <span className="text-green-400">{featuredProjects.length}</span></p>
            <p>🗓️ Experience: <span className="text-purple-400">{getYearsOfExperience()}+ years</span></p>
            <p>🎓 Certifications: <span className="text-blue-400">{profileData.certifications.length}</span></p>
          </div>
        );

      case 'github':
        const githubLink = socialLinks.find(l => l.name === 'GitHub');
        if (githubLink) window.open(githubLink.url, '_blank');
        return <p className="text-green-400">Opening GitHub profile... 🚀</p>;

      case 'linkedin':
        const linkedinLink = socialLinks.find(l => l.name === 'LinkedIn');
        if (linkedinLink) window.open(linkedinLink.url, '_blank');
        return <p className="text-blue-400">Opening LinkedIn profile... 🔗</p>;

      case 'resume':
        return (
          <div>
            <p className="text-green-400">Downloading resume...</p>
            <a href={profileData.resume} download className="text-blue-400 hover:underline">
              Click here if download doesn't start automatically
            </a>
          </div>
        );

      case 'clear':
        return 'CLEAR';

      case 'exit':
        return <p className="text-yellow-400">Goodbye! 👋 (Close the window to exit)</p>;

      case '':
        return null;

      default:
        return (
          <p className="text-red-400">
            Command not found: <span className="text-white/70">{cmd}</span>
            <br />
            <span className="text-white/50 text-sm">Type 'help' for available commands.</span>
          </p>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const output = processCommand(input);
    
    if (output === 'CLEAR') {
      setHistory([]);
    } else {
      setHistory(prev => [
        ...prev,
        {
          id: Date.now(),
          command: input,
          output
        }
      ]);
    }
    
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input]);
    }
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className="h-full bg-[#0d1117] text-[#c9d1d9] font-mono text-sm flex flex-col overflow-hidden"
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className="flex-shrink-0 px-4 py-2 bg-[#161b22] border-b border-white/10 flex items-center gap-2">
        <span className="text-green-400">●</span>
        <span className="text-white/60 text-xs">awaneesh@portfolio ~ %</span>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4"
      >
        {history.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            {item.command && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-cyan-400">~</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            {item.output && (
              <div className="pl-4 border-l border-white/10">
                {item.output}
              </div>
            )}
          </motion.div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400">➜</span>
          <span className="text-cyan-400">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white caret-green-400"
            autoFocus
            spellCheck={false}
          />
          <span className="animate-pulse text-green-400">▌</span>
        </form>
      </div>

      {/* Status Bar */}
      <div className="flex-shrink-0 px-4 py-1 bg-[#161b22] border-t border-white/10 flex items-center justify-between text-xs text-white/40">
        <span>zsh</span>
        <span>Type 'help' for commands</span>
      </div>
    </div>
  );
};

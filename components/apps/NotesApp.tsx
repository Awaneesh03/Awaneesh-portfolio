import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Plus, Trash2, FileText, MoreHorizontal, Bold, Italic, Underline, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Note {
  id: string;
  title: string;
  content: string; // HTML content
  date: Date;
}

export const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Project Ideas',
      content: '<b>1. MacOS Web Simulation</b><br>2. AI Chatbot Interface<br>3. Personal Portfolio V2',
      date: new Date()
    },
    {
      id: '2',
      title: 'Shopping List',
      content: '<ul><li>Milk</li><li>Eggs</li><li>Bread</li><li>Coffee Beans</li></ul>',
      date: new Date(Date.now() - 86400000)
    },
    {
      id: '3',
      title: 'Meeting Notes',
      content: 'Discuss <i>Q3 goals</i> with the team. Focus on <u>performance optimization</u> and UI consistency.',
      date: new Date(Date.now() - 172800000)
    }
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  
  const editorRef = useRef<HTMLDivElement>(null);

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  // Update editor content when active note changes
  useEffect(() => {
    if (editorRef.current && activeNote) {
      editorRef.current.innerHTML = activeNote.content;
    }
  }, [activeNoteId]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      date: new Date()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    if (activeNoteId === id && newNotes.length > 0) {
      setActiveNoteId(newNotes[0].id);
    }
  };

  const updateNoteTitle = (title: string) => {
    setNotes(notes.map(n => n.id === activeNoteId ? { ...n, title, date: new Date() } : n));
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setNotes(notes.map(n => n.id === activeNoteId ? { ...n, content, date: new Date() } : n));
    }
  };

  const executeCommand = (command: string) => {
    document.execCommand(command, false, undefined);
    if (editorRef.current) {
        editorRef.current.focus();
    }
    handleContentChange();
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-[#1e1e1e] text-[#E6E6E6] font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#282828] border-r border-black/40 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-3 border-b border-black/20">
             <div className="relative mb-2">
                 <Search className="absolute left-2 top-1.5 text-gray-500 w-4 h-4" />
                 <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full bg-[#1e1e1e] rounded-md py-1 pl-8 pr-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
             </div>
        </div>

        {/* Note List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredNotes.map(note => (
                <div 
                    key={note.id}
                    onClick={() => setActiveNoteId(note.id)}
                    className={`p-3 mx-2 mt-1 rounded-md cursor-pointer group transition-colors ${activeNoteId === note.id ? 'bg-[#d9a62e] text-black' : 'hover:bg-white/5 text-gray-300'}`}
                >
                    <h4 className={`font-bold text-sm mb-0.5 truncate ${activeNoteId === note.id ? 'text-black' : 'text-white'}`}>{note.title || 'New Note'}</h4>
                    <div className="flex justify-between items-center">
                        <span className={`text-xs truncate w-2/3 ${activeNoteId === note.id ? 'text-black/70' : 'text-gray-500'}`} dangerouslySetInnerHTML={{ __html: format(note.date, 'p') + ' · ' + note.content.replace(/<[^>]+>/g, '') }}>
                        </span>
                        <button 
                            onClick={(e) => handleDeleteNote(note.id, e)}
                            className={`opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-black/10 transition-opacity ${activeNoteId === note.id ? 'text-black' : 'text-gray-400'}`}
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e] relative">
         {/* Toolbar */}
         <div className="h-12 flex items-center justify-between px-6 border-b border-black/20">
             <span className="text-xs text-gray-500 font-medium">
                 {activeNote ? format(activeNote.date, 'MMMM d, yyyy h:mm a') : ''}
             </span>
             <div className="flex gap-2 relative">
                 <button onClick={handleCreateNote} className="p-1.5 hover:bg-white/10 rounded text-yellow-500 transition-colors">
                     <Plus size={20} />
                 </button>
                 <button 
                    onClick={() => setShowMenu(!showMenu)} 
                    className={`p-1.5 hover:bg-white/10 rounded transition-colors ${showMenu ? 'bg-white/10 text-white' : 'text-yellow-500'}`}
                 >
                     <MoreHorizontal size={20} />
                 </button>

                 {/* Formatting Menu Popover */}
                 <AnimatePresence>
                    {showMenu && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-10 bg-[#2C2C2C] border border-white/10 shadow-2xl rounded-lg p-2 z-50 w-48 flex flex-col gap-1"
                        >
                            <span className="text-[10px] text-gray-500 font-bold px-2 py-1 uppercase tracking-wider">Formatting</span>
                            <div className="flex gap-1 px-2 mb-2">
                                <button onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }} className="p-2 hover:bg-white/10 rounded flex-1 flex justify-center text-white" title="Bold"><Bold size={16}/></button>
                                <button onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }} className="p-2 hover:bg-white/10 rounded flex-1 flex justify-center text-white" title="Italic"><Italic size={16}/></button>
                                <button onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }} className="p-2 hover:bg-white/10 rounded flex-1 flex justify-center text-white" title="Underline"><Underline size={16}/></button>
                            </div>
                        </motion.div>
                    )}
                 </AnimatePresence>
             </div>
         </div>

         {/* Editor Area */}
         {activeNote ? (
             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                 <input 
                    type="text" 
                    value={activeNote.title}
                    onChange={(e) => updateNoteTitle(e.target.value)}
                    className="w-full bg-transparent text-3xl font-bold text-white mb-6 focus:outline-none placeholder-gray-600"
                    placeholder="Title"
                 />
                 <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleContentChange}
                    className="w-full min-h-[500px] text-base text-gray-300 focus:outline-none leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-gray-600 outline-none"
                    data-placeholder="Type something..."
                    suppressContentEditableWarning={true}
                    style={{ whiteSpace: 'pre-wrap' }}
                 />
             </div>
         ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                 <FileText size={48} className="mb-4 opacity-50" />
                 <p>Select a note or create a new one</p>
             </div>
         )}
      </div>
    </div>
  );
};
import { useState, useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { GoogleGenAI } from '@google/genai';
import { Bot, User as UserIcon, Mic, MicOff, Volume2, Send, Loader2, ShieldAlert, MessageSquare, Plus, Menu, X, Clock, PanelLeftClose, Trash2 } from 'lucide-react';
import { speakText, startVoiceRecognition, analyzeSentiment, tokenizeText, classifySpam } from '../lib/nlp';
import Markdown from 'react-markdown';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });

const INITIAL_MESSAGE = "Hello! I'm BUP-Guide. How can I help you navigate the Computer Department today?";

export default function ChatbotPage({ user }: { user: User }) {
  const [messages, setMessages] = useState<{role: string, text: string, timestamp: number, isSpam?: boolean}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [threads, setThreads] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const q = query(collection(db, 'chatThreads'), where('ownerId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const fetchedThreads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
          fetchedThreads.sort((a, b) => b.updatedAt - a.updatedAt);
          setThreads(fetchedThreads);
          
          const latestThread = fetchedThreads[0];
          setThreadId(latestThread.id);
          if (latestThread.messages && latestThread.messages.length > 0) {
            setMessages(latestThread.messages);
          } else {
            setMessages([{ role: 'model', text: INITIAL_MESSAGE, timestamp: Date.now() }]);
          }
        } else {
          startNewChat();
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchHistory();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  const startNewChat = async () => {
    const newThreadId = Math.random().toString(36).substring(2, 15);
    const initialMsgs = [{ role: 'model', text: INITIAL_MESSAGE, timestamp: Date.now() }];
    
    // Auto title generation or fallback
    const title = "New Conversation";
    
    const newThread = {
      ownerId: user.uid,
      updatedAt: Date.now(),
      messages: initialMsgs,
      title
    };

    try {
      await setDoc(doc(db, 'chatThreads', newThreadId), newThread);
      setThreadId(newThreadId);
      setMessages(initialMsgs);
      setThreads(prev => [{ id: newThreadId, ...newThread }, ...prev]);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
    } catch(err) {
      console.error("Error starting chat:", err);
    }
  };

  const handleSelectThread = (selectedId: string) => {
    const thread = threads.find(t => t.id === selectedId);
    if (thread) {
      setThreadId(thread.id);
      setMessages(thread.messages || [{ role: 'model', text: INITIAL_MESSAGE, timestamp: Date.now() }]);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
    }
  };

  const handleDeleteThread = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this conversation?")) return;
    try {
      await deleteDoc(doc(db, 'chatThreads', id));
      setThreads(prev => prev.filter(t => t.id !== id));
      if (threadId === id) {
        startNewChat();
      }
    } catch (err) {
      console.error("Error deleting thread", err);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const saveMessageToFirebase = async (newMessages: any[]) => {
    if (!threadId) return;
    
    const titlePreview = newMessages.length > 2 
      ? newMessages[1].text.substring(0, 30) + "..." 
      : "New Conversation";

    try {
      await updateDoc(doc(db, 'chatThreads', threadId), {
        updatedAt: Date.now(),
        title: titlePreview,
        messages: newMessages.slice(-50)
      });
      
      setThreads(prev => 
        prev.map(t => 
          t.id === threadId ? { ...t, updatedAt: Date.now(), title: titlePreview, messages: newMessages } : t
        ).sort((a, b) => b.updatedAt - a.updatedAt)
      );
    } catch (err) {
      console.error("Error saving message", err);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    
    // NLP Implementation: Text Classification (Spam Check) before processing
    if (classifySpam(userText)) {
      const spamMessages = [
        ...messages, 
        { role: 'user', text: userText, timestamp: Date.now() },
        { role: 'model', text: "SYSTEM WARNING: Message classified as spam / malicious.", isSpam: true, timestamp: Date.now() }
      ];
      setMessages(spamMessages);
      saveMessageToFirebase(spamMessages);
      return;
    }

    const newMessages = [...messages, { role: 'user', text: userText, timestamp: Date.now() }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const studentSchedule = `
        - CS 119 (Networks and Communication): Thu 08:00 AM - 10:00 AM @ ECB 203, Wed 01:00 PM - 04:00 PM @ CL 6. Prof: Arnold Platon.
        - CS 118 (Software Engineering 2): Fri 09:00 AM - 12:00 PM @ CL 6, Thu 03:00 PM - 05:00 PM @ CL 5. Prof: Jerry B. Agsunod.
        - GEC 17 (Science, Technology, and Society): Sat 09:00 AM - 12:00 PM @ CSD 22. Prof: Agnes P. Rabelas.
        - CS 121 (Information Assurance and Security): Tue 04:00 PM - 06:00 PM @ CL 3. Prof: Guillermo Jr. V. Red.
        - CS Elec 2: Wed 05:30 PM - 07:30 PM @ CL 1, Sat 01:00 PM - 04:00 PM @ CL 5. Prof: Jaypee Divinaflor.
        - CS 120 (Human Computer Interaction): Thu 01:00 PM - 02:00 PM @ ECB 204. Prof: Blessica B. Dorosan.
        - GEC 18 (Ethics): Fri 01:00 PM - 04:00 PM @ ECB 204. Prof: Mary Antoniette S. Ariño.
      `;

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are the BUP-Guide Campus Virtual Assistant, specifically for the Bicol University Computer Department. You help students with campus services, schedules, locations, and frequently asked questions. Keep answers concise, friendly, and conversational. 
          
          Here is the current student's schedule:
          ${studentSchedule}
          
          If the student asks about their schedule, use this data to provide an accurate answer about the time, room, and professor.`
        }
      });

      const response = await chat.sendMessage({ message: userText });
      const botText = response.text || "I'm sorry, I couldn't process that request.";

      const updatedMsgs = [...newMessages, { role: 'model', text: botText, timestamp: Date.now() }];
      setMessages(updatedMsgs);
      saveMessageToFirebase(updatedMsgs);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMsgs = [...newMessages, { role: 'model', text: "Error connecting to AI service. Please try again later.", timestamp: Date.now() }];
      setMessages(errorMsgs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    recognitionRef.current = startVoiceRecognition(
      (text) => setInput(text),
      (err) => {
        console.error(err);
        setIsListening(false);
      },
      () => setIsListening(false)
    );
  };

  const handleSpeak = (text: string) => {
    speakText(text);
  };

  return (
    <div className="flex bg-white max-w-6xl mx-auto rounded-2xl shadow-sm border border-slate-200 mt-6 md:mt-8 overflow-hidden mb-6 h-[85vh] lg:h-[75vh]">
      
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* History Sidebar */}
      <div className={`shrink-0 fixed md:static inset-y-0 left-0 bg-slate-50 z-50 transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${isSidebarOpen ? 'w-72 border-r border-slate-200 translate-x-0 opacity-100' : 'w-0 border-none -translate-x-full md:translate-x-0 opacity-0 pointer-events-none'}`}>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shrink-0 min-w-[18rem]">
          <div className="font-bold flex items-center gap-2 text-slate-800">
            <Clock size={16} />
            Chat History
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={startNewChat}
              className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              title="New Chat"
            >
              <Plus size={18} />
            </button>
            <button 
              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
              onClick={() => setIsSidebarOpen(false)}
              title="Close Sidebar"
            >
              <PanelLeftClose size={18} className="hidden md:block" />
              <X size={18} className="md:hidden" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2 min-w-[18rem]">
          {threads.length === 0 ? (
            <div className="text-center text-slate-400 text-sm mt-4">No past conversations</div>
          ) : (
            threads.map((t) => (
              <div 
                key={t.id}
                className={`relative group w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1 cursor-pointer ${
                  threadId === t.id 
                    ? 'bg-white border-blue-200 shadow-sm' 
                    : 'bg-transparent border-transparent hover:bg-slate-100'
                }`}
                onClick={() => handleSelectThread(t.id)}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className={`font-semibold text-sm truncate ${threadId === t.id ? 'text-blue-700' : 'text-slate-700'}`}>
                    {t.title || 'New Conversation'}
                  </div>
                  <button 
                    onClick={(e) => handleDeleteThread(t.id, e)}
                    className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all shrink-0"
                    title="Delete Chat"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(t.updatedAt).toLocaleDateString()} • {new Date(t.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 h-full relative border-l border-slate-200 min-w-0 bg-white">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className={`${isSidebarOpen ? 'md:hidden ' : ''}p-1.5 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md mr-1`}
              onClick={() => setIsSidebarOpen(true)}
              title="Open Chat History"
            >
              <Menu size={20} />
            </button>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
            <span className="font-bold text-slate-800">Campus Assistant <span className="font-normal text-slate-400 text-xs ml-2 hidden sm:inline">(Python NLP Model)</span></span>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold border border-slate-200">ONLINE</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 bg-slate-50 relative" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              
              {msg.role === 'model' && (
                <div className="w-8 h-8 bg-[#002d54] rounded-lg flex items-center justify-center text-white text-xs shrink-0 font-bold shadow-sm">
                  AI
                </div>
              )}

              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[75%]`}>
                <div className={`p-3 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none' 
                    : msg.isSpam 
                      ? 'bg-red-50 border border-red-200 text-red-700 rounded-2xl rounded-tl-none font-bold flex items-center gap-2'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-none'
                }`}>
                  {msg.isSpam && <ShieldAlert size={16} />}
                  <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'text-white' : msg.isSpam ? 'text-red-700' : 'text-slate-800'}`}>
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
                
                {msg.role === 'user' && (
                  <div className="mt-1 flex flex-col items-end gap-1">
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                      Sentiment: <span className="text-blue-500 font-bold ml-1">{analyzeSentiment(msg.text).toUpperCase()}</span>
                    </span>
                    <span className="text-[9px] text-slate-300 font-medium max-w-[200px] truncate" title={tokenizeText(msg.text).join(", ")}>
                      Tokens: [{tokenizeText(msg.text).join(", ")}]
                    </span>
                  </div>
                )}
                
                {msg.role === 'model' && !msg.isSpam && (
                  <div className="mt-2 pl-2">
                    <button 
                      onClick={() => handleSpeak(msg.text)}
                      className="flex items-center gap-1.5 text-blue-600 text-[10px] font-bold hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1 rounded-full border border-blue-100"
                      title="Speak answer"
                    >
                      <Volume2 size={12} /> READ ALOUD
                    </button>
                  </div>
                )}
              </div>
              
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-blue-100 border border-blue-200 text-blue-900 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <UserIcon size={16} />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#002d54] rounded-lg flex items-center justify-center text-white text-xs shrink-0 font-bold shadow-sm">
                AI
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                <span className="text-sm text-slate-500 font-medium">Processing...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-2 md:gap-3 bg-slate-50 border border-slate-200 rounded-full px-2 py-1.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
            <button 
              type="button" 
              onClick={handleVoiceInput}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                isListening ? 'text-red-500 bg-red-50 shadow-inner' : 'text-slate-400 hover:text-blue-600 hover:bg-white'
              }`}
              title="Voice to Text"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type your question..."}
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-slate-400 px-2"
              disabled={isLoading || isListening}
            />

            <button 
              type="submit" 
              className="bg-[#002d54] hover:bg-blue-900 transition-all active:scale-95 text-white px-4 md:px-5 py-2 rounded-full text-[11px] md:text-xs font-bold disabled:opacity-50 disabled:active:scale-100 flex items-center gap-1.5"
              disabled={!input.trim() || isLoading}
            >
              <Send size={14} className="hidden md:block" />
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

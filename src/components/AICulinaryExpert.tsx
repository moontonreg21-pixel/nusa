import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AICulinaryExpertProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

type AssistantMode = 'online' | 'local' | 'offline';

interface CulinaryApiResponse {
  text?: string;
  mode?: 'gemini' | 'local';
  error?: string;
}

const PRESET_PROMPTS = [
  {
    title: "Teknik 'Base Genep' Bali",
    prompt: "Halo Chef, tolong jelaskan apa itu bumbu dasar 'Base Genep' khas Bali? Apa saja komposisinya, dan mengapa bumbu ini dianggap sakral dalam tradisi kuliner Bali?"
  },
  {
    title: "Mengasapi Se'i Autentik",
    prompt: "Bagaimana cara melakukan pengasapan Se'i Sapi khas Kupang secara rumahan jika saya tidak memiliki kayu Kosambi? Kayu apa yang bisa menggantikannya agar mendapat aroma asap yang mirip?"
  },
  {
    title: "Rahasia Rendang Hitam",
    prompt: "Mengapa Rendang khas Minangkabau bisa berona hitam pekat tanpa gosong? Tolong bagikan rahasia teknik karamelisasi kelapa dan ketepatan suhu apinya."
  },
  {
    title: "Papeda Kenyal Sempurna",
    prompt: "Saya sering membuat Papeda tapi adonannya menggumpal atau encer. Bagaimana rasio terbaik tepung sagu murni dan air mendidih, serta teknik mengaduknya yang benar?"
  }
];

export function AICulinaryExpert({ initialQuery, onClearInitialQuery }: AICulinaryExpertProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Selamat datang di **Dapur Ask AI Koki Nusa Culinary**. Saya adalah asisten bimbingan pusaka rasa Nusantara Anda.\n\nSilakan tanyakan rahasia bumbu rempah pusaka, teknik mengulek bumbu becek, sejarah keterkaitan adat, masakan pengganti nabati, atau tips praktis di dapur. Bagaimana saya bisa membantu eksplorasi memasak Anda hari ini?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [assistantMode, setAssistantMode] = useState<AssistantMode>('online');
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Triggering initial query if passed from Detail Modal
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
      if (onClearInitialQuery) {
        onClearInitialQuery();
      }
    }
  }, [initialQuery]);

  // Autoscroll chat history
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    const prompt = textToSend.trim();
    if (!prompt) return;

    // Add user question
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/kuliner-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data: CulinaryApiResponse = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Koneksi gagal atau server terputus.");
      }
      setAssistantMode(data.mode === 'local' ? 'local' : 'online');
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "Mohon maaf koki, saya belum bisa memberi tanggapan. Silakan ulangi sesaat lagi.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setAssistantMode('offline');
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'ai',
        text: `### Gagal Menghubungi Server\n\n${err.message || "Tampaknya sedang terdapat kendala jaringan atau server sedang bersiap-siap."}\n\nPastikan aplikasi dijalankan melalui \`npm run dev\`, lalu coba kirim pertanyaan lagi.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Convert simple markdown strings for chat bubbles locally
  const renderMarkdownText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      let content: React.ReactNode = line;

      // Handle custom points or lists
      const isListItem = line.startsWith('* ') || line.startsWith('- ');
      const isHeader = line.startsWith('### ') || line.startsWith('## ') || line.startsWith('# ');
      
      let cleanLine = line;
      if (isListItem) cleanLine = line.substring(2);
      if (line.startsWith('### ')) cleanLine = line.substring(4);
      else if (line.startsWith('## ')) cleanLine = line.substring(3);
      else if (line.startsWith('# ')) cleanLine = line.substring(2);

      // Simple strong tag regex conversion
      const matches = [...cleanLine.matchAll(/\*\*(.*?)\*\*/g)];
      if (matches.length > 0) {
        const parts = cleanLine.split(/\*\*(.*?)\*\*/g);
        content = parts.map((part, partIdx) => {
          // Odd indices are matched strong text
          return partIdx % 2 === 1 ? <strong key={partIdx} className="text-primary font-extrabold">{part}</strong> : part;
        });
      }

      if (isHeader) {
        return (
          <h4 key={lineIdx} className="font-serif text-[#e9c176] text-sm md:text-base font-bold mt-4 mb-2 tracking-wide border-b border-primary/10 pb-1">
            {content}
          </h4>
        );
      }

      if (isListItem) {
        return (
          <div key={lineIdx} className="flex gap-2 pl-3 py-1 font-sans text-xs md:text-sm text-on-surface-variant/90 leading-relaxed align-top">
            <span className="text-primary mt-1 font-bold text-xs select-none">*</span>
            <span className="flex-1">{content}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="font-sans text-xs md:text-sm text-on-surface-variant/90 leading-relaxed mb-2.5 text-justify">
          {content}
        </p>
      );
    });
  };

  const modeLabel = {
    online: 'Koki Nusa AI - Aktif',
    local: 'Panduan Lokal - Aktif',
    offline: 'Server AI - Offline'
  }[assistantMode];

  const modeDotClass = {
    online: 'bg-emerald-500 animate-pulse',
    local: 'bg-amber-400',
    offline: 'bg-red-500'
  }[assistantMode];

  return (
    <div className="bg-pattern py-12 px-4 md:px-12 max-w-5xl mx-auto flex flex-col justify-between min-h-[70vh] gap-8 animate-fade-in">
      
      {/* 1. Header description */}
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="font-serif text-3xl font-bold text-primary mb-3">
          Asisten Kuliner AI Nusantara
        </h3>
        <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
          Asisten cerdas terlatih dalam resep pusaka Indonesia. Jelajahi kearifan bumbu rahasia parutan rempah, teknik membakar, substitusi bahan sayur, hingga sejarah asimilasi rasa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-grow">
        
        {/* Left Column: Preset prompts */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-surface-container/40 p-4 border border-primary/10 rounded-md">
            <span className="font-sans text-[10px] tracking-widest font-extrabold text-primary uppercase block mb-3">
              DAFTAR TANYA CEPAT
            </span>
            <div className="flex flex-col gap-3">
              {PRESET_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.prompt)}
                  disabled={loading}
                  className="w-full text-left p-3 bg-surface-lowest hover:bg-primary/10 hover:text-primary list-none border border-primary/10 hover:border-primary/30 rounded-md transition-all duration-300 text-xs text-on-surface-variant hover:shadow-[0_4px_12px_rgba(233,193,118,0.05)] cursor-pointer disabled:opacity-50"
                >
                  <div className="font-serif font-bold text-primary mb-1 text-[11px]">
                    {item.title}
                  </div>
                  <div className="line-clamp-2 text-[10px] text-on-surface-variant/70 leading-relaxed select-none">
                    {item.prompt}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cooking tip snippet box */}
          <div className="bg-primary/5 p-4 border border-primary/10 rounded-md text-xs leading-relaxed text-on-surface-variant flex gap-3">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <div>
              <span className="font-bold text-primary block mb-0.5">Petunjuk AI Koki:</span>
              <span>{assistantMode === 'local' ? 'Mode panduan lokal aktif, jadi AI tetap bisa menjawab dari data resep aplikasi meski koneksi Gemini belum siap.' : 'Anda bebas menanyakan resep unik lain dari Manado, Padang, Kalimantan, Papua, Sunda, mau pun improvisasi bahan modern secara fleksibel!'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Chat History Window */}
        <div className="lg:col-span-8 flex flex-col bg-surface-container-low/30 border border-primary/15 rounded-lg overflow-hidden min-h-[480px] md:max-h-[600px]">
          
          {/* Chat Window Panel Header */}
          <div className="p-4 bg-surface-container/60 border-b border-primary/15 flex justify-between items-center px-6">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${modeDotClass}`}></div>
              <span className="font-serif text-sm text-primary font-bold tracking-wider">{modeLabel}</span>
            </div>
            <button 
              onClick={() => setMessages([
                {
                  id: "welcome",
                  sender: "ai",
                  text: "Riwayat telah dibersihkan. Bagaimana saya bisa mendampingi Anda di dapur Nusantara hari ini?",
                  timestamp: new Date()
                }
              ])}
              className="text-[10px] text-on-surface-variant/60 hover:text-primary hover:underline font-sans cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[10px]">delete</span>
              <span>Bersihkan Chat</span>
            </button>
          </div>

          {/* Messages Grid area */}
          <div className="flex-grow overflow-y-auto p-4 md:p-6 flex flex-col gap-5 bg-surface-lowest/40" style={{ scrollbarWidth: 'thin' }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                  }`}
                >
                  {/* Speaker Icon */}
                  <div className={`w-8 h-8 rounded-full border flex-shrink-0 flex items-center justify-center ${
                    msg.sender === 'user' 
                      ? 'bg-primary/20 border-primary/40 text-primary' 
                      : 'bg-surface-container border-primary/20 text-[#e9c176]'
                  }`}>
                    <span className="material-symbols-outlined text-sm font-bold">
                      {msg.sender === 'user' ? 'person' : 'soup_kitchen'}
                    </span>
                  </div>

                  {/* Message Bubble box */}
                  <div className={`p-4 rounded-lg border text-xs md:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary/5 border-primary/30 text-on-surface rounded-tr-none'
                      : 'bg-surface-container-high/60 border-primary/10 text-on-surface-variant rounded-tl-none font-light'
                  }`}>
                    {msg.sender === 'user' ? (
                      <p className="font-sans font-medium text-justify">{msg.text}</p>
                    ) : (
                      <div className="markdown-body">
                        {renderMarkdownText(msg.text)}
                      </div>
                    )}
                    
                    {/* Timestamp display */}
                    <div className="text-[9px] text-on-surface-variant/40 mt-2 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading / Writing state indicator */}
            {loading && (
              <div className="self-start flex gap-3 items-center max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-surface-container border border-primary/15 text-primary flex items-center justify-center animate-spin">
                  <span className="material-symbols-outlined text-sm font-semibold">progress_activity</span>
                </div>
                <div className="px-4 py-3 bg-surface-container-high/40 border border-primary/10 rounded-lg text-xs italic text-primary/70 font-sans tracking-wide">
                  Koki Nusa sedang meracik resep terbaik... Pasang mata Anda, koki.
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Interactive input bar form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-surface-container/70 border-t border-primary/15 flex items-center gap-3 px-5"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-grow bg-surface border-b border-primary/30 focus:border-primary focus:ring-0 text-on-surface py-3 px-1 transition-all duration-300 outline-none placeholder:text-on-surface-variant/40 text-xs tracking-wide disabled:opacity-50"
              placeholder="Tanyakan resep khas lain, teknik ulek, bumbu rahasia..."
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 bg-primary text-on-primary font-sans text-[11px] font-bold tracking-widest uppercase rounded hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Kirim</span>
              <span className="material-symbols-outlined text-xs font-bold">send</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}

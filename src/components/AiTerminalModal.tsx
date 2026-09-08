import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Zap, ChevronDown } from 'lucide-react';
import { aiResponses, presetPrompts } from '../data/aiResponses';
import { useTypewriter } from '../hooks/useTypewriter';
import { cn } from '../utils/cn';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  isTyping?: boolean;
}

interface AiTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="text-xs font-mono text-electric-cyan animate-pulse">●</span>
      <span
        className="text-xs font-mono text-electric-cyan animate-pulse"
        style={{ animationDelay: '0.2s' }}
      >
        ●
      </span>
      <span
        className="text-xs font-mono text-electric-cyan animate-pulse"
        style={{ animationDelay: '0.4s' }}
      >
        ●
      </span>
    </div>
  );
}

function renderMarkdown(text: string) {
  // Simple markdown rendering: bold, inline code, line breaks
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        // Code blocks (``` ```)
        if (line.startsWith('```')) {
          return (
            <pre
              key={i}
              className="bg-obsidian border border-card-border rounded-lg p-3 my-2 overflow-x-auto font-mono text-xs text-electric-cyan"
            >
              {line.replace(/```\w*/, '')}
            </pre>
          );
        }

        // Headers
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={i} className="font-bold text-text-primary mt-3 first:mt-0">
              {line.replace(/\*\*/g, '')}
            </p>
          );
        }

        // Bold inline
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={j} className="text-text-primary font-semibold">
                {part.replace(/\*\*/g, '')}
              </strong>
            );
          }
          return <span key={j}>{part}</span>;
        });

        return (
          <p key={i} className="text-text-secondary leading-relaxed">
            {rendered}
          </p>
        );
      })}
    </>
  );
}

export function AiTerminalModal({ isOpen, onClose }: AiTerminalModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'ai',
      content:
        "Hello! I'm **Aayush-Bot** — a simulated AI assistant trained on Aayush Kadam's resume and projects. Ask me anything about his skills, experience, or availability. Try one of the suggested prompts below, or type your own question!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { displayed, isTyping } = useTypewriter(
    isAiTyping ? messages[messages.length - 1]?.content ?? '' : '',
    12,
    isAiTyping,
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isTyping && isAiTyping) {
      setIsAiTyping(false);
    }
  }, [isTyping, isAiTyping]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayed, messages]);

  const findResponse = (query: string): string => {
    const lower = query.toLowerCase().trim();
    if (!lower) {
      return "Ask me anything about Aayush's skills, projects, or experience. Try a prompt below, or type your own question!";
    }
    // Score each response by how many of its keywords appear in the query
    let best: { score: number; index: number } = { score: 0, index: -1 };
    aiResponses.forEach((r, i) => {
      const score = r.keywords.reduce(
        (acc, kw) => acc + (lower.includes(kw.toLowerCase()) ? 1 : 0),
        0,
      );
      if (score > best.score) best = { score, index: i };
    });
    if (best.score === 0) {
      // Provide a helpful default that points to the actual sections
      return "I don't have a specific answer for that exact question, but here's a quick overview:\n\n" +
        "**Aayush Kadam** is a **Semester VI Computer Science Engineer** specializing in **AI-integrated full-stack development** (Python Flask, React/TypeScript, PHP/MySQL).\n\n" +
        "Try asking about:\n" +
        "• **Gemini & Groq experience** (AI integration in production)\n" +
        "• **The Snapshot Design Pattern** used in his booking system\n" +
        "• **His backend & database skills**\n" +
        "• **Why you should hire him**\n\n" +
        "Or check the **Skills**, **Projects**, and **Education** sections of the page below!";
    }
    return aiResponses[best.index].response;
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || isAiTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };
    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: 'ai',
      content: '',
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
    setShowPresets(false);
    setIsAiTyping(true);

    // Set content for typewriter after state update
    setTimeout(() => {
      const response = findResponse(text);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsg.id ? { ...m, content: response } : m,
        ),
      );
    }, 50);
  };

  const handlePreset = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-obsidian/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-[90vw] md:max-w-[720px] lg:max-w-[760px] max-h-[90vh] md:max-h-[85vh] glass-card overflow-hidden flex flex-col shadow-2xl shadow-black/60">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-card-border bg-obsidian/50 shrink-0">
                {/* Bot icon */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-cyan/20 to-gemini-purple/20 border border-electric-cyan/30 flex items-center justify-center">
                <Bot size={18} className="text-electric-cyan" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-text-primary">
                  Aayush-Bot
                </h2>
                <p className="text-xs text-text-muted font-mono flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-electric-cyan" />
                  </span>
                  Simulated Gemini + Groq LLaMA
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-auto p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-card-border transition-colors"
                aria-label="Close terminal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Preset prompts */}
            <AnimatePresence>
              {showPresets && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden border-b border-card-border"
                >
                  <div className="px-5 py-3 flex items-center gap-2">
                    <Zap size={12} className="text-electric-cyan" />
                    <span className="text-xs font-mono text-text-muted">
                      Try these prompts:
                    </span>
                  </div>
                  <div className="px-5 pb-3 flex flex-wrap gap-2">
                    {presetPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handlePreset(prompt)}
                        className="px-3 py-1.5 rounded-full text-xs font-mono text-text-secondary border border-card-border hover:border-electric-cyan/40 hover:text-electric-cyan hover:bg-electric-cyan/5 transition-all duration-200 cursor-pointer text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex gap-3',
                    msg.role === 'user' && 'flex-row-reverse',
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                      msg.role === 'ai'
                        ? 'bg-gradient-to-br from-electric-cyan/20 to-gemini-purple/20 border border-electric-cyan/30'
                        : 'bg-card-border',
                    )}
                  >
                    {msg.role === 'ai' ? (
                      <Bot size={14} className="text-electric-cyan" />
                    ) : (
                      <span className="text-xs font-mono text-text-muted">U</span>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      msg.role === 'ai'
                        ? 'bg-card-border/50 text-text-secondary'
                        : 'bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan',
                    )}
                  >
                    {msg.role === 'ai' &&
                    msg.id === messages[messages.length - 1]?.id &&
                    isAiTyping ? (
                      <div>
                        {renderMarkdown(displayed)}
                        <span className="inline-block w-1 h-3 bg-electric-cyan ml-1 animate-pulse align-middle" />
                      </div>
                    ) : (
                      renderMarkdown(msg.content)
                    )}
                  </div>
                </motion.div>
              ))}

              {isAiTyping && messages[messages.length - 1]?.role === 'ai' && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-electric-cyan/20 to-gemini-purple/20 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-electric-cyan" />
                  </div>
                  <div className="bg-card-border/50 rounded-2xl px-4 py-3">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-5 py-4 border-t border-card-border bg-obsidian/50 shrink-0"
            >
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Aayush's skills, projects, or experience..."
                  className="flex-1 bg-card-border/50 border border-card-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-electric-cyan/40 focus:bg-card-border/70 transition-all font-mono"
                  disabled={isAiTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isAiTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-electric-cyan to-gemini-purple text-obsidian disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowPresets(!showPresets)}
                  className="text-xs text-text-muted hover:text-electric-cyan transition-colors flex items-center gap-1"
                >
                  <ChevronDown
                    size={12}
                    className={cn('transition-transform', showPresets && 'rotate-180')}
                  />
                  {showPresets ? 'Hide' : 'Show'} prompt suggestions
                </button>
                <span className="text-xs font-mono text-text-muted">
                  Simulated — not a real LLM
                </span>
              </div>
            </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

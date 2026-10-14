import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { profile } from '../data/resumeData';

interface HeroProps {
  onTerminalOpen: () => void;
}

const stagger = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const terminalLines = [
  { type: 'input', text: '> Find room for 40 students, AC, projector, 2 PM' },
  { type: 'output', text: '✓ Intent: BOOK_ROOM  |  Entities: {capacity: 40, facilities: [ac, projector], time: "14:00"}' },
  { type: 'output', text: '✓ Matching rooms: 3 found' },
  { type: 'output', text: '  → Lab 301, AC Lab Block A — AVAILABLE' },
  { type: 'output', text: '  → Seminar Hall B, 3rd Floor — AVAILABLE' },
  { type: 'output', text: '  → Conference Room 2, Admin Block — AVAILABLE' },
  { type: 'gemini', text: '🤖 Groq response: "I found 3 rooms matching your criteria. Lab 301 in Block A is recommended as it is closest to the main entrance and has the best projector resolution (4K)."' },
];

export function Hero({ onTerminalOpen }: HeroProps) {
  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email).catch(() => {});
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow backgrounds */}
      <div className="absolute inset-0 bg-dot-grid opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-cyan/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gemini-purple/5 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-16 overflow-visible">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill border-glow-cyan mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan" />
            </span>
            <span className="text-electric-cyan text-xs font-mono">
              Computer Science Engineer · Semester {profile.semester}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] mb-6 text-balance"
          >
            Architecting Intelligent
            <br />
            <span className="bg-gradient-to-r from-electric-cyan to-gemini-purple bg-clip-text text-transparent">
              Web Systems
            </span>{' '}
            & Applied AI
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
          >
            {profile.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
            >
              <span>Explore Projects</span>
              <ArrowDown size={16} />
            </a>

            <button
              onClick={onTerminalOpen}
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
            >
              <Terminal size={16} />
              Launch AI Terminal
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            custom={4}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 mt-8 justify-center lg:justify-start"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-card text-text-secondary hover:text-electric-cyan hover:border-glow-cyan transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-card text-text-secondary hover:text-electric-cyan hover:border-glow-cyan transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <button
              onClick={copyEmail}
              className="p-2.5 rounded-full glass-card text-text-secondary hover:text-electric-cyan hover:border-glow-cyan transition-all duration-200"
              aria-label="Copy email address"
            >
              <Mail size={18} />
            </button>
            <span className="text-xs text-text-muted font-mono hidden sm:block">
              {profile.email}
            </span>
          </motion.div>
        </div>

        {/* Right: Interactive Terminal snippet */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md flex-shrink-0 overflow-visible"
        >
          <div className="glass-card p-0 overflow-hidden border border-card-border">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-card-border bg-obsidian/50">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-text-muted ml-2">
                aayush-bot — Gemini + Groq LLaMA
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan animate-pulse" />
                <span className="text-xs font-mono text-electric-cyan">LIVE</span>
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-4 space-y-2 font-mono text-xs bg-obsidian/30 min-h-[220px] md:min-h-[260px]">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.15 }}
                  className={
                    line.type === 'input'
                      ? 'text-electric-cyan'
                      : line.type === 'gemini'
                      ? 'text-gemini-purple'
                      : 'text-text-secondary'
                  }
                >
                  {line.text}
                </motion.div>
              ))}
              <div className="text-electric-cyan animate-pulse mt-2">
                ▌
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-4 text-center"
          >
            <button
              onClick={onTerminalOpen}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill tag-pill-cyan text-xs hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-electric-cyan" />
              </span>
              <span className="whitespace-nowrap">Real-time AI query · Click to try</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

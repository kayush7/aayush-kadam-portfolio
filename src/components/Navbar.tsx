import { useState, useEffect } from 'react';
import { Menu, X, Download, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, profile } from '../data/resumeData';
import { cn } from '../utils/cn';

interface NavbarProps {
  onTerminalOpen: () => void;
}

export function Navbar({ onTerminalOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-5 left-1/2 -translate-x-1/2 z-50 glass-nav px-4 py-2.5 flex items-center gap-2 w-[calc(100%-40px)] max-w-5xl transition-all duration-300',
          scrolled && 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]',
        )}
      >
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-electric-cyan/10 to-gemini-purple/10 border border-electric-cyan/20 mr-2 shrink-0 hover:border-electric-cyan/40 transition-colors"
        >
          <span className="font-mono font-bold text-sm text-electric-cyan">
            &lt;AK /&gt;
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green" />
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
          {navLinks.map((link) =>
            link.href === '#terminal' ? (
              <button
                key={link.href}
                onClick={onTerminalOpen}
                className="px-3 py-1.5 rounded-full text-sm text-text-secondary hover:text-electric-cyan hover:bg-electric-cyan/5 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-sm text-text-secondary hover:text-electric-cyan hover:bg-electric-cyan/5 transition-all duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-success-green/20 bg-success-green/5 whitespace-nowrap">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success-green" />
            </span>
            <span className="text-xs text-success-green font-mono whitespace-nowrap">
              {profile.status}
            </span>
          </div>

          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-electric-cyan to-gemini-purple text-obsidian hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <Download size={12} />
            Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto p-2 rounded-full text-text-secondary hover:text-electric-cyan hover:bg-electric-cyan/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 glass-card p-4 flex flex-col gap-1 md:hidden"
          >
            {navLinks.map((link) =>
              link.href === '#terminal' ? (
                <button
                  key={link.href}
                  onClick={() => {
                    onTerminalOpen();
                    setMobileOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-electric-cyan hover:bg-electric-cyan/5 transition-all text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-electric-cyan hover:bg-electric-cyan/5 transition-all"
                >
                  {link.label}
                </a>
              ),
            )}
            <div className="gradient-divider my-2" />
            <div className="flex items-center gap-2 px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-success-green animate-pulse" />
              <span className="text-xs text-success-green font-mono">
                {profile.status}
              </span>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-gradient-to-r from-electric-cyan to-gemini-purple text-obsidian font-medium justify-center"
            >
              <Download size={14} />
              Download Resume
              <ExternalLink size={12} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

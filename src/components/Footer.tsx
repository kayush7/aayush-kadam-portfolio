import { motion } from 'framer-motion';
import { Heart, Code2 } from 'lucide-react';
import { profile } from '../data/resumeData';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-10 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Terminal-style attribution */}
          <div className="font-mono text-xs text-text-muted flex flex-wrap items-center justify-center gap-1.5 text-center">
            <span className="text-success-green">$</span>
            <span>Built with</span>
            <span className="text-electric-cyan">Vite</span>
            <span>+</span>
            <span className="text-electric-cyan">React</span>
            <span>+</span>
            <span className="text-electric-cyan">Tailwind</span>
            <span>·</span>
            <span>Designed for {profile.name}</span>
            <span>·</span>
            <span>© 2025 / {year}</span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
            <a href="#about" className="hover:text-electric-cyan transition-colors">
              About
            </a>
            <span className="text-card-border">·</span>
            <a href="#skills" className="hover:text-electric-cyan transition-colors">
              Skills
            </a>
            <span className="text-card-border">·</span>
            <a href="#projects" className="hover:text-electric-cyan transition-colors">
              Projects
            </a>
            <span className="text-card-border">·</span>
            <a href="#education" className="hover:text-electric-cyan transition-colors">
              Education
            </a>
            <span className="text-card-border">·</span>
            <a href="#contact" className="hover:text-electric-cyan transition-colors">
              Contact
            </a>
          </div>

          {/* Subtle signature */}
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono">
            <Code2 size={10} />
            <span>crafted with</span>
            <Heart size={10} className="text-gemini-purple fill-gemini-purple" />
            <span>in India</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

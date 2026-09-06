import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Server, Brain, Database, Shield, Sparkles } from 'lucide-react';
import { skills } from '../data/resumeData';
import { cn } from '../utils/cn';

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Code2 size={14} />,
  'Frontend & UI': <Layers size={14} />,
  'Backend & Architecture': <Server size={14} />,
  'AI & Applied NLP': <Brain size={14} />,
  Databases: <Database size={14} />,
  'Security & Hardening': <Shield size={14} />,
  Specialized: <Sparkles size={14} />,
};

const categoryColors: Record<string, string> = {
  Languages: 'from-orange-500/10 to-orange-600/5 border-orange-500/20 text-orange-400',
  'Frontend & UI': 'from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400',
  'Backend & Architecture': 'from-green-500/10 to-green-600/5 border-green-500/20 text-green-400',
  'AI & Applied NLP': 'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400',
  Databases: 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20 text-yellow-400',
  'Security & Hardening': 'from-red-500/10 to-red-600/5 border-red-500/20 text-red-400',
  Specialized: 'from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 text-cyan-400',
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skills[0].category);

  const current = skills.find((s) => s.category === activeCategory) ?? skills[0];

  return (
    <section id="skills" className="relative py-24">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Technical Arsenal</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">
            Skills & Technologies
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            From core programming fundamentals to cutting-edge AI integrations — a
            full-stack toolkit built through coursework, certifications, and hands-on
            projects.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {skills.map((skill) => (
            <button
              key={skill.category}
              onClick={() => setActiveCategory(skill.category)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer',
                activeCategory === skill.category
                  ? 'bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan'
                  : 'bg-card-border/50 border border-card-border text-text-muted hover:text-text-secondary hover:border-card-border/80',
              )}
            >
              {categoryIcons[skill.category]}
              {skill.category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {current.items.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                'glass-card glass-card-hover p-4 group cursor-default',
                categoryColors[activeCategory],
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-card-border/80 flex items-center justify-center flex-shrink-0 group-hover:border-electric-cyan/20 transition-colors border border-card-border">
                  {categoryIcons[activeCategory]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-0.5">
                    {skill.name}
                  </p>
                  <p className="text-xs text-text-muted leading-snug">
                    {skill.note}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-xs font-mono text-text-muted"
        >
          {skills.reduce((acc, s) => acc + s.items.length, 0)} technologies across{' '}
          {skills.length} domains
        </motion.p>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, Cpu, Lock, Layout, Github } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { projects } from '../data/resumeData';
import { cyberChartColors, baseChartOptions } from '../hooks/useChartTheme';
import { cn } from '../utils/cn';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const projectIcons: Record<string, React.ReactNode> = {
  'room-booking': <Cpu size={18} />,
  'secure-crud': <Lock size={18} />,
  'admin-dashboard': <Layout size={18} />,
  'archive-submitter': <Layout size={18} />,
  'mindpulse': <Cpu size={18} />,
};

const projectGradients: Record<string, string> = {
  'room-booking': 'from-electric-cyan/10 to-gemini-purple/10 border-electric-cyan/20',
  'secure-crud': 'from-orange-500/10 to-red-500/10 border-orange-500/20',
  'admin-dashboard': 'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
  'archive-submitter': 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20',
  'mindpulse': 'from-rose-500/10 to-pink-500/10 border-rose-500/20',
};

const projectIconColors: Record<string, string> = {
  'room-booking': 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/20',
  'secure-crud': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'admin-dashboard': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'archive-submitter': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'mindpulse': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

function RoomBookingChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Lab 301',
        data: [82, 75, 91, 68, 88, 23],
        backgroundColor: cyberChartColors.cyanSoft,
        borderColor: cyberChartColors.cyan,
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Seminar Hall B',
        data: [65, 88, 72, 95, 60, 10],
        backgroundColor: cyberChartColors.purpleSoft,
        borderColor: cyberChartColors.purple,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = JSON.parse(JSON.stringify(baseChartOptions));
  options.plugins.title = {
    display: true,
    text: 'Room Utilization % (Live Telemetry)',
    color: '#f3f4f6',
    font: { family: '"JetBrains Mono"', size: 11 },
    padding: { bottom: 12 },
  };
  options.plugins.legend = {
    display: true,
    labels: {
      color: cyberChartColors.text,
      font: { family: '"JetBrains Mono"', size: 10 },
      boxWidth: 10,
      boxHeight: 10,
    },
  };
  options.scales.y.max = 100;
  options.scales.y.ticks.callback = (v: number | string) => `${v}%`;

  return (
    <div className="h-48">
      <Bar data={data} options={options} />
    </div>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'glass-card overflow-hidden group border',
        projectGradients[project.id],
      )}
    >
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              projectIconColors[project.id],
            )}
          >
            {projectIcons[project.id]}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-text-primary leading-snug mb-1">
              {project.title}
            </h3>
            <p className="text-xs text-text-muted">{project.tagline}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill text-[10px] px-2 py-1">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mt-4 leading-relaxed">
          {project.description}
        </p>

        {/* Chart (Project 1 only) */}
        {project.hasChart && (
          <div className="mt-4 rounded-xl bg-obsidian/50 border border-card-border p-3">
            <RoomBookingChart />
          </div>
        )}
      </div>

      {/* Expandable highlights */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-3 flex items-center justify-between border-t border-card-border text-xs text-text-muted hover:text-electric-cyan hover:bg-electric-cyan/5 transition-colors cursor-pointer"
      >
        <span className="font-mono">
          {project.highlights.length} Technical Highlights
        </span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="px-6 pb-4 space-y-2">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
              <span className="text-electric-cyan mt-0.5 flex-shrink-0">→</span>
              {h}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Actions */}
      <div className="px-6 py-4 flex items-center gap-3 border-t border-card-border">
        <a
          href={project.repoUrl}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-electric-cyan transition-colors"
        >
          <Github size={14} />
          Source
        </a>
        <a
          href={project.liveUrl}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-electric-cyan transition-colors"
        >
          <ExternalLink size={14} />
          Live Demo
        </a>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24">
      <div className="absolute inset-0 bg-dot-grid opacity-15" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gemini-purple/5 rounded-full blur-[120px]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Featured Work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">
            Projects & Case Studies
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Real applications built with production patterns. Each project showcases
            different dimensions of full-stack engineering — from AI integration to
            security hardening to CSS architecture.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* First project — full width on desktop */}
          <div className="lg:col-span-2">
            <ProjectCard project={projects[0]} index={0} />
          </div>
          <ProjectCard project={projects[1]} index={1} />
          <ProjectCard project={projects[2]} index={2} />
        </div>
      </div>
    </section>
  );
}

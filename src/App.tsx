import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationCerts } from './components/EducationCerts';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiTerminalModal } from './components/AiTerminalModal';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-obsidian text-text-primary">
      {/* Dot grid background */}
      <div className="fixed inset-0 bg-dot-grid opacity-30 pointer-events-none z-0" />

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-electric-cyan/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-gemini-purple/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar onTerminalOpen={() => setIsTerminalOpen(true)} />

        <main>
          <Hero onTerminalOpen={() => setIsTerminalOpen(true)} />

          {/* Gradient dividers between sections */}
          <div className="gradient-divider max-w-6xl mx-auto" />
          <SkillsSection />

          <div className="gradient-divider max-w-6xl mx-auto" />
          <ProjectsSection />

          <div className="gradient-divider max-w-6xl mx-auto" />
          <EducationCerts />

          <div className="gradient-divider max-w-6xl mx-auto" />
          <ContactSection />
        </main>

        <Footer />
      </div>

      {/* AI Terminal Modal */}
      <AnimatePresence>
        <AiTerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />
      </AnimatePresence>
    </div>
  );
}

export default App;

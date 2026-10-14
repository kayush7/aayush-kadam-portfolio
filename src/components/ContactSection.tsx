import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Check, Copy, MessageSquare } from 'lucide-react';
import { profile } from '../data/resumeData';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const fireConfetti = async () => {
  // Lightweight in-house confetti — no extra dependency needed for a brief burst
  const colors = ['#00f2fe', '#7928ca', '#4338ca', '#22c55e', '#f97316'];
  const count = 60;
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden;
  `;
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 6 + 4;
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 600 + 200;
    piece.style.cssText = `
      position: absolute;
      top: ${startY}px;
      left: ${startX}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      transform: translate(-50%, -50%);
    `;
    container.appendChild(piece);

    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity + 300; // gravity
    const duration = Math.random() * 1500 + 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / duration;
      if (t >= 1) {
        piece.remove();
        return;
      }
      const x = startX + dx * t;
      const y = startY + dy * t + 0.5 * 980 * t * t;
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.style.opacity = `${1 - t}`;
      piece.style.transform = `translate(-50%, -50%) rotate(${t * 720}deg)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  setTimeout(() => container.remove(), 3000);
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Please enter your name';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'f344fd47-e723-43cf-8f74-db529f2a4ad1',
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          from_name: `${form.name.trim()} (Portfolio Contact Form)`,
          subject: `New Portfolio Message from ${form.name.trim()}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        fireConfetti();
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again or email directly.');
      }
    } catch {
      setSubmitError('Failed to send message. Please check your connection or email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email).catch(() => {});
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
            Let's build something{' '}
            <span className="bg-gradient-to-r from-electric-cyan to-gemini-purple bg-clip-text text-transparent">
              extraordinary
            </span>{' '}
            together.
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Looking for a proactive developer who bridges modern full-stack development
            with cutting-edge AI capabilities? Let's connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare size={16} className="text-electric-cyan" />
              <h3 className="text-sm font-semibold text-text-primary">
                Send a message
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-text-muted mb-1.5">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-obsidian/50 border border-card-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-electric-cyan/40 transition-colors"
                  placeholder="Jane Recruiter"
                  disabled={submitting}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-text-muted mb-1.5">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-obsidian/50 border border-card-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-electric-cyan/40 transition-colors"
                  placeholder="jane@company.com"
                  disabled={submitting}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-obsidian/50 border border-card-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-electric-cyan/40 transition-colors resize-none h-32"
                  placeholder="Hi Aayush — I'd like to discuss a potential opportunity..."
                  disabled={submitting}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || submitted}
                className="btn-gradient w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {submitted ? (
                    <>
                      <Check size={16} />
                      Message sent!
                    </>
                  ) : submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send message
                    </>
                  )}
                </span>
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-success-green text-center font-mono"
                  >
                    ✓ Thanks! Your message was sent to Aayush's email.
                  </motion.p>
                )}
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-400 text-center font-mono"
                  >
                    ✕ {submitError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* Contact shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Email card */}
            <button
              onClick={copyEmail}
              className="glass-card glass-card-hover p-5 text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-electric-cyan/10 border border-electric-cyan/20 flex items-center justify-center group-hover:border-electric-cyan/40 transition-colors">
                  <Mail size={16} className="text-electric-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-muted">Email</p>
                  <p className="text-sm text-text-primary font-mono truncate">
                    {profile.email}
                  </p>
                </div>
                {emailCopied ? (
                  <span className="text-xs text-success-green flex items-center gap-1 font-mono">
                    <Check size={14} /> Copied
                  </span>
                ) : (
                  <Copy size={14} className="text-text-muted group-hover:text-electric-cyan transition-colors" />
                )}
              </div>
            </button>

            {/* Social links */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover p-5 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-500/40 transition-colors">
                  <Linkedin size={16} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-muted">LinkedIn</p>
                  <p className="text-sm text-text-primary">Connect professionally</p>
                </div>
                <span className="text-xs text-text-muted font-mono">→</span>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover p-5 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/40 transition-colors">
                  <Github size={16} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-muted">GitHub</p>
                  <p className="text-sm text-text-primary">Browse source code & repos</p>
                </div>
                <span className="text-xs text-text-muted font-mono">→</span>
              </div>
            </a>

            {/* Status card */}
            <div className="glass-card p-5 bg-gradient-to-br from-success-green/5 to-emerald-500/5 border-success-green/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green" />
                </span>
                <p className="text-xs font-mono text-success-green uppercase tracking-wider">
                  Status
                </p>
              </div>
              <p className="text-sm text-text-primary font-semibold mb-1">
                Available for Opportunities
              </p>
              <p className="text-xs text-text-secondary">
                Open to internships, part-time, and full-time roles starting mid-2026.
                Response time: under 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

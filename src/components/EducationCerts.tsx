import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import { education, certifications } from '../data/resumeData';

export function EducationCerts() {
  return (
    <section id="education" className="relative py-24">
      <div className="absolute inset-0 bg-dot-grid opacity-15" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Academic Foundation</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">
            Education & Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-electric-cyan/10 border border-electric-cyan/20">
                <GraduationCap size={18} className="text-electric-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Education</h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card glass-card-hover p-5 border-glow-cyan/20"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-text-primary leading-snug">
                        {edu.title}
                      </h4>
                      <p className="text-xs text-electric-cyan mt-0.5 font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-success-green bg-success-green/10 border border-success-green/20 px-2 py-0.5 rounded-full">
                        {edu.sgpi}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
                    <Calendar size={12} />
                    <span>{edu.period}</span>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    {edu.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {edu.courses.map((course) => (
                      <span key={course} className="tag-pill text-[10px]">
                        {course}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-gemini-purple/10 border border-gemini-purple/20">
                <Award size={18} className="text-gemini-purple" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card glass-card-hover p-5 border-glow-purple/20"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gemini-purple/10 border border-gemini-purple/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={16} className="text-gemini-purple" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-text-primary leading-snug mb-0.5">
                        {cert.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted">{cert.issuer}</span>
                        <span className="text-xs font-mono text-gemini-purple/70">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="tag-pill tag-pill-cyan text-[10px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Academic stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 grid grid-cols-3 gap-3"
            >
              {[
                { value: '7.02', label: 'SGPI / 10' },
                { value: '2', label: 'Udemy Certs' },
                { value: 'VI', label: 'Current Semester' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center border-card-border"
                >
                  <p className="text-xl font-bold text-electric-cyan font-mono">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

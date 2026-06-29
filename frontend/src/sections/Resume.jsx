import { motion } from 'framer-motion'
import { Download, FileText, ArrowUpRight, Award, Briefcase, GraduationCap as Cap, Code as CodeIcon } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { personal } from '../data/portfolio'

export default function Resume() {
  return (
    <section id="resume" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="CV"
          title="Grab my"
          accent="CV"
          desc="A condensed, recruiter-friendly snapshot of my journey, skills, and projects."
        />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Animated CV preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -8, rotateY: 4, rotateX: -4 }}
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-sm md:max-w-md transition-transform duration-300"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 bg-grad-1 rounded-3xl blur-2xl opacity-30 -z-10" />

            <div className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 aspect-[3/4] relative overflow-hidden">
              {/* Header strip */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <p className="font-display font-bold text-xl text-gradient">
                    Muhammad Zaid
                  </p>
                  <p className="font-mono text-[10px] text-ink-muted tracking-wider mt-0.5">
                    MERN STACK DEVELOPER
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-grad-1 flex items-center justify-center">
                  <span className="font-display font-black text-black text-lg">
                    MZ
                  </span>
                </div>
              </div>

              {/* Skeleton lines */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={11} className="text-neon-cyan" />
                    <span className="font-mono text-[10px] text-neon-cyan tracking-wider">
                      EXPERIENCE
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-2 rounded-full bg-white/10 mb-1.5"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-2 rounded-full bg-white/10"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Cap size={11} className="text-neon-magenta" />
                    <span className="font-mono text-[10px] text-neon-magenta tracking-wider">
                      EDUCATION
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-2 rounded-full bg-white/10 mb-1.5"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-2 rounded-full bg-white/10"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CodeIcon size={11} className="text-neon-pink" />
                    <span className="font-mono text-[10px] text-neon-pink tracking-wider">
                      SKILLS
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'Node', 'MongoDB', 'AI', 'Next', 'Tailwind'].map(
                      (s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                          className="px-2 py-0.5 rounded-full text-[9px] font-mono glass-strong"
                        >
                          {s}
                        </motion.span>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={11} className="text-neon-lime" />
                    <span className="font-mono text-[10px] text-neon-lime tracking-wider">
                      PROJECTS
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '70%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="h-2 rounded-full bg-white/10 mb-1.5"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '50%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="h-2 rounded-full bg-white/10"
                  />
                </div>
              </div>

              {/* PDF watermark */}
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-ink-dim tracking-wider">
                .PDF
              </div>
            </div>
          </motion.div>

          {/* Right: copy + buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase mb-4">
              {'<for_recruiters />'}
            </p>
            <h3 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-5">
              Everything you need on{' '}
              <span className="text-gradient">a single page.</span>
            </h3>
            <p className="text-ink-muted leading-relaxed mb-8">
              Download my latest CV to see a complete overview of my
              education, projects, technical skills, and the impact I aim to
              create as a developer.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={personal.resumeUrl}
                download
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full bg-grad-1 text-black font-semibold text-sm hover:shadow-glow transition-all hover:-translate-y-0.5"
              >
                <Download size={16} />
                Download CV
              </a>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full glass border-white/15 hover:border-neon-cyan font-semibold text-sm transition-all hover:-translate-y-0.5"
              >
                <FileText size={16} />
                Open CV
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="glass rounded-2xl p-4 sm:p-5 grid grid-cols-3 gap-3 sm:gap-4 text-center">
              <div>
                <div className="font-display font-extrabold text-2xl text-gradient">
                  1
                </div>
                <div className="font-mono text-[10px] text-ink-muted tracking-wider mt-1">
                  PAGE
                </div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl text-gradient">
                  PDF
                </div>
                <div className="font-mono text-[10px] text-ink-muted tracking-wider mt-1">
                  FORMAT
                </div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl text-gradient">
                  2026
                </div>
                <div className="font-mono text-[10px] text-ink-muted tracking-wider mt-1">
                  UPDATED
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

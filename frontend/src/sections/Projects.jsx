import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/portfolio'

const ACCENT_COLORS = {
  cyan: { glow: '#00e5ff', from: '#00e5ff', to: '#0099bb' },
  magenta: { glow: '#b829ff', from: '#b829ff', to: '#7e1fb3' },
  pink: { glow: '#ff2e63', from: '#ff2e63', to: '#b32147' },
  lime: { glow: '#b6ff3c', from: '#b6ff3c', to: '#7eb226' },
  violet: { glow: '#8b5cf6', from: '#8b5cf6', to: '#5b21b6' },
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const accent = ACCENT_COLORS[project.accent] || ACCENT_COLORS.cyan

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 900) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / rect.height) * -8
    const rotateY = ((x - rect.width / 2) / rect.width) * 8
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-3xl overflow-hidden transition-all duration-300 h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Visual header */}
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${accent.from}25 0%, ${accent.to}10 100%)`,
          }}
        >
          {/* Animated grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(${accent.glow}40 1px, transparent 1px), linear-gradient(90deg, ${accent.glow}40 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Glow orb */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-50 blur-3xl"
            style={{ background: accent.glow }}
          />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-strong font-mono text-[10px] tracking-wider text-neon-cyan border-neon-cyan/40">
              ★ FEATURED
            </div>
          )}

          {/* Big project initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="font-display font-black text-7xl opacity-30"
              style={{ color: accent.glow }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          {/* Overlay with links — always visible on mobile, hover-reveal on desktop */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 bg-bg-deep/70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-grad-1 text-black font-semibold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 hover:scale-105 transition-transform"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-strong font-semibold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 hover:scale-105 hover:border-neon-cyan transition"
            >
              <Github size={13} />
              GitHub
            </a>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <h3 className="font-display font-bold text-base sm:text-lg md:text-xl mb-2 flex items-center gap-2 leading-snug">
            {project.title}
            <ArrowUpRight
              size={16}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
              style={{ color: accent.glow }}
            />
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Feature pills */}
          <div className="space-y-1.5 mb-5">
            {project.features.slice(0, 3).map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 text-xs text-ink-muted"
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: accent.glow }}
                />
                {f}
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-white/5 text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Showcase"
          title=""
          accent="Projects"
          desc="A selection of projects where I get to combine modern web architecture with AI-powered experiences."
        />

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/muhammadzaid10"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full glass border-white/15 hover:border-neon-cyan hover:text-neon-cyan font-semibold text-sm transition-all hover:-translate-y-0.5 max-w-full"
          >
            <Github size={16} />
            <span className="truncate">View All Projects on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

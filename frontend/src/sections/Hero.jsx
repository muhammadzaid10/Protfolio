import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Sparkles,
  ArrowDown,
  Code,
  Zap,
  Database,
  Cpu,
  Boxes,
  Globe,
} from 'lucide-react'
import { personal } from '../data/portfolio'

const FLOATING_ICONS = [
  { Icon: Code, top: '12%', left: '6%', delay: 0, color: '#00e5ff' },
  { Icon: Database, top: '24%', right: '8%', delay: 1, color: '#b829ff' },
  { Icon: Cpu, bottom: '18%', left: '10%', delay: 2, color: '#ff2e63' },
  { Icon: Boxes, top: '60%', right: '4%', delay: 3, color: '#b6ff3c' },
  { Icon: Globe, bottom: '8%', right: '20%', delay: 4, color: '#00e5ff' },
  { Icon: Zap, top: '40%', left: '2%', delay: 5, color: '#b829ff' },
]

function useTypingTitles(titles) {
  const [text, setText] = useState('')
  const [titleIdx, setTitleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const current = titles[titleIdx]

    // Pause at the end of a typed word before deleting
    if (paused) {
      const t = setTimeout(() => {
        setPaused(false)
        setDeleting(true)
      }, 1600)
      return () => clearTimeout(t)
    }

    // Finished typing the current word → enter pause state
    if (!deleting && text === current) {
      setPaused(true)
      return
    }

    // Finished deleting → advance to next word
    if (deleting && text === '') {
      setDeleting(false)
      setTitleIdx((i) => (i + 1) % titles.length)
      return
    }

    const speed = deleting ? 40 : 90
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      )
    }, speed)

    return () => clearTimeout(t)
  }, [text, deleting, titleIdx, paused, titles])

  return text
}

export default function Hero() {
  const typedTitle = useTypingTitles(personal.titles)
  const portraitRef = useRef(null)

  // Mouse parallax for the portrait
  useEffect(() => {
    const handler = (e) => {
      if (!portraitRef.current || window.innerWidth < 900) return
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      portraitRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden"
    >
      {/* Floating tech icons */}
      {FLOATING_ICONS.map(({ Icon, delay, color, ...pos }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block pointer-events-none"
          style={{ ...pos, color }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.55,
            scale: 1,
            y: [0, -18, 0],
          }}
          transition={{
            opacity: { delay: delay * 0.2, duration: 0.6 },
            scale: { delay: delay * 0.2, duration: 0.6 },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div
            className="glass rounded-2xl p-3 md:p-4"
            style={{ boxShadow: `0 0 24px ${color}40` }}
          >
            <Icon size={22} />
          </div>
        </motion.div>
      ))}

      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* LEFT: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5 sm:mb-6"
            >
              <span
                className="w-2 h-2 rounded-full bg-neon-lime flex-shrink-0"
                style={{
                  boxShadow: '0 0 12px #b6ff3c',
                  animation: 'pulseGlow 2s ease infinite',
                }}
              />
              <span className="font-mono text-[11px] tracking-wider text-neon-cyan">
                AVAILABLE FOR WORK
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display font-extrabold text-[2.35rem] min-[380px]:text-[2.7rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] sm:leading-[0.92] tracking-tight sm:tracking-tighter mb-5 sm:mb-6 break-words"
            >
              Muhammad
              <br />
              <span className="text-gradient">Zaid.</span>{' '}
              <Sparkles
                className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-neon-cyan align-middle ml-1.5 sm:ml-2"
                strokeWidth={1.5}
              />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-mono text-sm sm:text-base md:text-xl text-ink-muted mb-5 min-h-[1.6em]"
            >
              <span className="title-caret text-neon-cyan">
                {typedTitle}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-ink-muted text-sm sm:text-base md:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed"
            >
              {personal.tagline} Currently exploring{' '}
              <span className="text-neon-magenta font-semibold">
                Agentic AI
              </span>{' '}
              while shipping production-grade MERN applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col min-[420px]:flex-row min-[420px]:flex-wrap gap-2.5 sm:gap-3 mb-8 sm:mb-10"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-grad-1 text-black font-semibold text-sm hover:shadow-glow transition-all hover:-translate-y-0.5"
              >
                <Sparkles size={15} />
                Hire Me
              </a>
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full glass border-white/15 hover:border-neon-cyan font-semibold text-sm transition-all hover:-translate-y-0.5"
              >
                <Download size={15} />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex gap-2.5 sm:gap-3"
            >
              {[
                { Icon: Github, href: personal.socials.github, label: 'GitHub' },
                { Icon: Linkedin, href: personal.socials.linkedin, label: 'LinkedIn' },
                { Icon: Mail, href: '#contact-form', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={
                    href === '#contact-form'
                      ? (e) => {
                          e.preventDefault()
                          document
                            .getElementById('contact-form')
                            ?.scrollIntoView({ behavior: 'smooth' })
                          window.setTimeout(() => {
                            document
                              .querySelector('#contact-form input')
                              ?.focus()
                          }, 650)
                        }
                      : undefined
                  }
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-ink-muted hover:text-neon-cyan hover:border-neon-cyan transition-all hover:-translate-y-1 hover:shadow-glow"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Portrait */}
          <motion.div
            ref={portraitRef}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative w-[min(72vw,240px)] sm:w-[300px] md:w-[360px] lg:w-full lg:max-w-[400px] aspect-square mx-auto lg:ml-auto transition-transform duration-300"
          >
            {/* Rotating gradient frame */}
            <div
              className="absolute inset-0 rounded-full p-[3px] animate-spin-slow"
              style={{
                background:
                  'conic-gradient(from 0deg, #00e5ff, #b829ff, #ff2e63, #00e5ff)',
              }}
            >
              <div className="w-full h-full rounded-full bg-bg-deep" />
            </div>

            {/* Inner image placeholder */}
            <div className="absolute inset-2 rounded-full overflow-hidden glass flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10" />
              <div className="relative text-center">
                <div className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient leading-none">
                  MZ
                </div>
                <p className="font-mono text-[10px] sm:text-xs text-ink-muted mt-2 sm:mt-3 tracking-[0.3em]">
                  DEVELOPER
                </p>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 glass-strong rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3"
              style={{ boxShadow: '0 8px 24px rgba(0, 229, 255, 0.3)' }}
            >
              <div className="font-mono text-[9px] sm:text-[10px] text-ink-muted">REACT</div>
              <div className="font-display font-bold text-base sm:text-lg text-neon-cyan">
                ⚛
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 glass-strong rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3"
              style={{ boxShadow: '0 8px 24px rgba(184, 41, 255, 0.3)' }}
            >
              <div className="font-mono text-[9px] sm:text-[10px] text-ink-muted">NODE.JS</div>
              <div className="font-display font-bold text-base sm:text-lg text-neon-magenta">
                ◆
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden min-[380px]:block">
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById('about')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1.2 },
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="flex flex-col items-center gap-2 text-ink-muted hover:text-neon-cyan transition"
          >
            <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
            <ArrowDown size={14} />
          </motion.a>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 8px #b6ff3c; opacity: 1; }
          50% { box-shadow: 0 0 16px #b6ff3c; opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}

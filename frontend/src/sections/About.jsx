import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  Sparkles,
  Puzzle,
  BrainCircuit,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { personal, aboutHighlights, counters } from '../data/portfolio'

const ICON_MAP = { Sparkles, Puzzle, BrainCircuit, GraduationCap }

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.floor(latest))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: 'easeOut' })
      return controls.stop
    }
  }, [inView, value, count])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="About"
          title="A developer with a"
          accent="curious mind"
          desc="From medical sciences to software engineering — driven by curiosity, sharpened by code."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <div className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase">
              {'<intro />'}
            </div>
            <p className="text-base md:text-lg text-ink leading-relaxed">
              I'm{' '}
              <span className="text-gradient font-semibold">
                Muhammad Zaid
              </span>
              , a passionate{' '}
              <span className="text-neon-cyan">MERN Stack Developer</span>{' '}
              currently learning Agentic AI systems and modern full-stack
              technologies.
            </p>
            <p className="text-ink-muted leading-relaxed">
              I completed my MERN Stack training from{' '}
              <span className="text-ink">SMIT</span> and am currently pursuing
              BSCS from{' '}
              <span className="text-ink">Federal Urdu University</span>. My
              journey actually began in the medical field at{' '}
              <span className="text-ink">Ali Ghar College</span> — that
              transition gave me a unique perspective on systems thinking and
              attention to detail that I bring to every line of code.
            </p>
            <p className="text-ink-muted leading-relaxed">
              Today, I'm focused on the intersection of{' '}
              <span className="text-neon-magenta">AI and the modern web</span>{' '}
              — building tools that are fast, beautiful, and actually useful.
            </p>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 mt-4 text-neon-cyan font-semibold hover:gap-3 transition-all"
            >
              Let's build something together
              <ArrowUpRight size={18} />
            </a>
          </motion.div>

          {/* Right: highlight cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {aboutHighlights.map((h, i) => {
              const Icon = ICON_MAP[h.icon] || Sparkles
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass rounded-2xl p-5 group hover:border-neon-cyan/40 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-grad-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={18} className="text-black" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-1.5">
                    {h.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {h.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Counters strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mt-12 sm:mt-16 md:mt-20 glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5 md:gap-6"
        >
          {counters.map((c) => (
            <div key={c.label} className="text-center">
              <div className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl text-gradient mb-1">
                <Counter value={c.value} suffix={c.suffix} />
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] md:text-xs text-ink-muted tracking-wider uppercase">
                {c.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

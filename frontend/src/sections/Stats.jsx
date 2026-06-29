import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  Briefcase,
  Layers,
  GitBranch,
  BrainCircuit,
  Clock,
  TrendingUp,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { counters } from '../data/portfolio'

const STAT_META = [
  { icon: Briefcase, color: '#00e5ff' },
  { icon: Layers, color: '#b829ff' },
  { icon: BrainCircuit, color: '#ff2e63' },
  { icon: Clock, color: '#b6ff3c' },
  { icon: GitBranch, color: '#00e5ff' },
]

function AnimatedNumber({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.floor(v))

  useEffect(() => {
    if (inView) {
      const c = animate(count, value, { duration: 2.2, ease: 'easeOut' })
      return c.stop
    }
  }, [inView, value, count])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// Mini sparkline that draws on view
function Sparkline({ color, seed = 0 }) {
  // Deterministic pseudo-random based on seed
  const rand = (n) => {
    const x = Math.sin(seed * 100 + n) * 10000
    return x - Math.floor(x)
  }
  const points = Array.from({ length: 12 }, (_, i) => {
    const x = (i / 11) * 100
    const y = 30 - rand(i) * 25
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 100 30" className="w-full h-12 overflow-visible">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Dashboard"
          title="By the"
          accent="numbers"
          desc="A quick snapshot of activity, output, and ongoing experiments."
        />

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {counters.map((c, i) => {
            const meta = STAT_META[i] || STAT_META[0]
            const Icon = meta.icon
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 relative overflow-hidden group hover:border-neon-cyan/40 transition-all"
              >
                {/* Background glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"
                  style={{ background: meta.color }}
                />

                <div className="relative">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                    style={{
                      background: `${meta.color}20`,
                      border: `1px solid ${meta.color}40`,
                    }}
                  >
                    <Icon size={14} style={{ color: meta.color }} />
                  </div>

                  <div
                    className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl mb-1 leading-none"
                    style={{
                      color: meta.color,
                      textShadow: `0 0 20px ${meta.color}50`,
                    }}
                  >
                    <AnimatedNumber value={c.value} suffix={c.suffix} />
                  </div>

                  <div className="font-mono text-[9px] sm:text-[10px] text-ink-muted tracking-wider uppercase mb-3 line-clamp-2 min-h-[1.8em]">
                    {c.label}
                  </div>

                  <Sparkline color={meta.color} seed={i + 1} />

                  <div className="flex items-center gap-1 text-[10px] font-mono text-neon-lime mt-1">
                    <TrendingUp size={10} />
                    <span>Growing</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

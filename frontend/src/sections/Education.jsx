import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Stethoscope, Code2, GraduationCap, MapPin } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { education } from '../data/portfolio'

const ICON_MAP = { Stethoscope, Code2, GraduationCap }

const ACCENT = {
  cyan: 'from-neon-cyan to-neon-magenta',
  pink: 'from-neon-pink to-neon-magenta',
  magenta: 'from-neon-magenta to-neon-cyan',
}

export default function Education() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="education" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Journey"
          title="My education"
          accent="timeline"
          desc="From pre-medical sciences to full-stack engineering — each step shaped how I think and build."
        />

        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Vertical track */}
          <div className="absolute left-[26px] sm:left-[34px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
          {/* Animated fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[26px] sm:left-[34px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-grad-1"
          />

          {education.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || GraduationCap
            const left = i % 2 === 0
            return (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative mb-12 md:mb-16 grid md:grid-cols-2 gap-6 items-center ${
                  left ? '' : 'md:[&>*:first-child]:order-2'
                }`}
              >
                {/* Card */}
                <div
                  className={`pl-12 sm:pl-14 md:pl-0 ${
                    left ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <div className="glass rounded-2xl p-4 sm:p-5 md:p-6 hover:border-neon-cyan/40 hover:shadow-glow transition-all group">
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-2 ${
                        left ? 'md:justify-end' : ''
                      }`}
                    >
                      <span className="font-mono text-[11px] text-neon-cyan tracking-wider">
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neon-lime/15 text-neon-lime border border-neon-lime/30">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg md:text-xl mb-1.5 group-hover:text-gradient transition leading-snug">
                      {item.institution}
                    </h3>
                    <p className="text-sm text-neon-magenta font-semibold mb-2">
                      {item.degree}
                    </p>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block" />

                {/* Center dot with icon */}
                <div className="absolute left-3 sm:left-4 md:left-1/2 md:-translate-x-1/2 top-5 sm:top-6 md:top-1/2 md:-translate-y-1/2 z-10">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${
                      ACCENT[item.color]
                    } flex items-center justify-center timeline-dot`}
                  >
                    <Icon size={15} className="text-black sm:w-4 sm:h-4" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center gap-2 mt-6 text-ink-muted"
        >
          <MapPin size={14} className="text-neon-cyan" />
          <span className="font-mono text-[10px] sm:text-xs tracking-wider">
            STILL WRITING THIS CHAPTER...
          </span>
        </motion.div>
      </div>
    </section>
  )
}

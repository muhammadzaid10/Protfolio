import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Server, Wrench, BrainCircuit } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { skills } from '../data/portfolio'

const CATEGORY_META = {
  Frontend: { icon: Code, accent: '#00e5ff', from: '#00e5ff', to: '#b829ff' },
  Backend: { icon: Server, accent: '#b829ff', from: '#b829ff', to: '#ff2e63' },
  Tools: { icon: Wrench, accent: '#ff2e63', from: '#ff2e63', to: '#b6ff3c' },
  'AI & Automation': {
    icon: BrainCircuit,
    accent: '#b6ff3c',
    from: '#b6ff3c',
    to: '#00e5ff',
  },
}

function CircularProgress({ percentage, color }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
          fill="none"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-ink">
        {percentage}
      </div>
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState('Frontend')
  const categories = Object.keys(skills)
  const meta = CATEGORY_META[active]
  const ActiveIcon = meta.icon

  return (
    <section id="skills" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills &"
          accent="stack"
          desc="The technologies I use day-to-day to ship modern full-stack experiences."
        />

        {/* Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => {
            const m = CATEGORY_META[cat]
            const Icon = m.icon
            const isActive = active === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex items-center justify-center gap-2 px-3 md:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-grad-1 text-black shadow-glow'
                    : 'glass text-ink-muted hover:text-ink'
                }`}
              >
                <Icon size={15} />
                {cat}
              </button>
            )
          })}
        </div>

        {/* Skill cards grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {skills[active].map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:border-neon-cyan/40 transition-all group"
            >
              <CircularProgress
                percentage={skill.level}
                color={meta.accent}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display font-bold text-base truncate">
                    {skill.name}
                  </h4>
                  <span className="font-mono text-[11px] text-ink-muted ml-2">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.05 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${meta.from}, ${meta.to})`,
                      boxShadow: `0 0 10px ${meta.accent}80`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating tech logos strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 sm:mt-16 glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden"
        >
          <p className="font-mono text-[11px] text-ink-muted tracking-[0.3em] uppercase text-center mb-5">
            Daily Drivers
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {[
              'React',
              'Node.js',
              'Express',
              'MongoDB',
              'Tailwind',
              'JWT',
              'Redux',
              'Git',
              'Postman',
              'Vercel',
              'n8n',
              'OpenAI',
              'Docker',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 sm:px-3.5 py-2 rounded-full font-mono text-[11px] sm:text-xs glass-strong hover:border-neon-cyan hover:text-neon-cyan hover:shadow-glow transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

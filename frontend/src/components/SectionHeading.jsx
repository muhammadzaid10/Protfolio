import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, accent, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 sm:mb-14 md:mb-20 px-1"
    >
      {eyebrow && (
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-neon-cyan mb-3 sm:mb-4 uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display font-bold text-[2rem] sm:text-4xl md:text-6xl tracking-tight leading-tight sm:leading-[0.95] break-words">
        {title} <span className="text-gradient">{accent}</span>
      </h2>
      {desc && (
        <p className="text-ink-muted mt-3 sm:mt-5 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-1 sm:px-2 leading-relaxed">
          {desc}
        </p>
      )}
    </motion.div>
  )
}

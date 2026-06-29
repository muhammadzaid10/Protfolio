import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg-deep"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-display font-black text-5xl md:text-6xl tracking-tighter text-gradient"
      >
        MZ.dev
      </motion.div>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 240, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="h-[2px] bg-white/10 mt-6 overflow-hidden rounded-full"
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '350%' }}
          transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity }}
          className="h-full w-2/5 bg-grad-1"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="font-mono text-xs text-ink-muted mt-6 tracking-[0.3em]"
      >
        INITIALIZING&hellip;
      </motion.p>
    </motion.div>
  )
}

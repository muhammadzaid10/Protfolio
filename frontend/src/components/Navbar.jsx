import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { navLinks, personal } from '../data/portfolio'

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // Wrapper handles positioning so Framer Motion's transform doesn't fight Tailwind's translate
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-[top] duration-300 ${
        scrolled ? 'top-2 md:top-3' : 'top-3 md:top-5'
      }`}
      style={{ width: 'min(94vw, 880px)' }}
    >
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 pl-3 sm:pl-6 rounded-full glass transition-shadow duration-300 ${
          scrolled ? 'shadow-2xl' : ''
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleLink(e, '#home')}
          className="font-display font-bold text-[13px] sm:text-sm md:text-base tracking-tight mr-0.5 sm:mr-3 whitespace-nowrap"
        >
          <span className="text-gradient">{personal.shortName}</span>
          <span className="text-ink/70">.dev</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              className="px-3.5 py-1.5 text-[13px] font-medium text-ink-muted hover:text-ink hover:bg-white/5 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 ml-auto">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-strong flex-shrink-0 flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a
            href="#contact"
            onClick={(e) => handleLink(e, '#contact')}
            className="hidden sm:inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] font-semibold rounded-full bg-grad-1 text-black hover:shadow-glow transition-shadow whitespace-nowrap"
          >
            Hire Me
          </a>
          <button
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-strong flex-shrink-0 flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-full left-0 right-0 mt-3 mobile-dropdown rounded-2xl p-2.5 flex flex-col z-50 overflow-hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLink(e, link.href)}
                  className="px-4 py-2.5 text-sm text-ink-muted hover:text-ink hover:bg-white/5 rounded-xl transition"
                >
                  {link.name}
                </a>
              ))}
              {/* Hire Me in mobile menu for very small screens that hide it */}
              <a
                href="#contact"
                onClick={(e) => handleLink(e, '#contact')}
                className="sm:hidden mt-1 mx-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-xl bg-grad-1 text-black"
              >
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}

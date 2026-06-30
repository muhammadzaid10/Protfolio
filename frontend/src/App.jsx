import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import ParticlesBackground from './components/ParticlesBackground'
import Footer from './components/Footer'

import Hero from './sections/Hero'
import About from './sections/About'
import Education from './sections/Education'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Stats from './sections/Stats'
import Resume from './sections/Resume'
import Contact from './sections/Contact'

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen"
        >
          {/* Global UI */}
          <CustomCursor />
          <ParticlesBackground />
          <div className="fixed inset-0 -z-10 bg-grid pointer-events-none" />

          {/* Toast notifications */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: 'rgba(10, 10, 20, 0.9)',
                color: '#ececf5',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                backdropFilter: 'blur(12px)',
                borderRadius: '14px',
              },
            }}
          />

          {/* Navigation */}
          <Navbar theme={theme} setTheme={setTheme} />

          {/* Main content sections */}
          <main className="relative">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Stats />
            <Resume />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App

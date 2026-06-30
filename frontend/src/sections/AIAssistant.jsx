import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, Sparkles, User } from 'lucide-react'
import axios from 'axios'
import SectionHeading from '../components/SectionHeading'
import { assistantSuggestions, personal } from '../data/portfolio'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Local fallback responder (works without backend)
function localResponder(msg) {
  const m = msg.toLowerCase()
  if (m.includes('who') || m.includes('about') || m.includes('zaid'))
    return `${personal.name} is a passionate MERN Stack Developer and Agentic AI learner based in Pakistan. He completed MERN training from SMIT and is pursuing BSCS at Federal Urdu University.`
  if (m.includes('skill') || m.includes('tech') || m.includes('stack'))
    return `My strongest skills are React, Node.js, Express, MongoDB, Tailwind CSS, JWT auth, and REST APIs. I'm also actively learning Agentic AI, n8n, and prompt engineering.`
  if (m.includes('project') || m.includes('work') || m.includes('build'))
    return `I've built an AI Clinic Management SaaS, a MERN E-Commerce Store, a Supabase Auth System, and an AI Portfolio Assistant. Scroll up to the Projects section for live demos and code.`
  if (m.includes('experience') || m.includes('background'))
    return `My journey started in pre-medical at Ali Ghar College, then I pivoted to software via SMIT's MERN bootcamp, and now I'm pursuing BSCS while building real-world projects and exploring AI agents.`
  if (m.includes('contact') || m.includes('hire') || m.includes('email') || m.includes('reach'))
    return `You can reach me at ${personal.email} or via the contact form below. I'm open to internship and freelance opportunities.`
  if (m.includes('location') || m.includes('where'))
    return `I'm based in ${personal.location} and ${personal.availability.toLowerCase()}.`
  return `Great question! I can tell you about my skills, projects, experience, or how to contact me. Try one of the suggestions below 👇`
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm Zaid's portfolio assistant 🤖 Ask me anything about his skills, projects, or experience.`,
    },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, thinking])

  const send = async (text) => {
    const msg = (text ?? input).trim()
    if (!msg || thinking) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: msg }])
    setThinking(true)

    let reply = ''
    try {
      const { data } = await axios.post(
        `${API_BASE}/chat`,
        { message: msg },
        { timeout: 8000 }
      )
      reply = data?.reply || localResponder(msg)
    } catch {
      reply = localResponder(msg)
    }

    // Simulate typing effect
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
    setThinking(false)
    for (let i = 0; i <= reply.length; i++) {
      await new Promise((r) => setTimeout(r, 12))
      setMessages((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          role: 'assistant',
          content: reply.slice(0, i),
        }
        return copy
      })
    }
  }

  return (
    <section id="assistant" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="AI"
          title="Talk to my"
          accent="assistant"
          desc="A friendly AI agent that knows everything about my portfolio — give it a try."
        />

        <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
          {/* Floating orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col items-center sticky top-32"
          >
            <div className="relative w-44 h-44">
              <motion.div
                animate={{ scale: [1, 1.06, 1], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-grad-1 blur-2xl opacity-50"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-full glass-strong flex items-center justify-center"
                style={{ boxShadow: '0 0 60px rgba(0, 229, 255, 0.4)' }}
              >
                <Bot size={56} className="text-neon-cyan" />
                <Sparkles
                  size={18}
                  className="absolute top-6 right-8 text-neon-magenta"
                />
                <Sparkles
                  size={14}
                  className="absolute bottom-10 left-6 text-neon-pink"
                />
              </motion.div>
            </div>
            <p className="font-display font-bold mt-5 text-center">Zaid AI</p>
            <p className="font-mono text-[10px] text-ink-muted text-center mt-1 tracking-wider">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-neon-lime mr-1.5 align-middle"
                style={{ boxShadow: '0 0 8px #b6ff3c' }}
              />
              ONLINE
            </p>
          </motion.div>

          {/* Chat panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-[480px] sm:h-[520px] lg:h-[560px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-white/5">
              <div className="w-9 h-9 rounded-full bg-grad-1 flex items-center justify-center lg:hidden">
                <Bot size={16} className="text-black" />
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold text-sm">
                  Zaid Portfolio AI
                </p>
                <p className="text-[11px] text-ink-muted font-mono">
                  Powered by curiosity ✨
                </p>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neon-pink" />
                <span className="w-2 h-2 rounded-full bg-neon-lime" />
                <span className="w-2 h-2 rounded-full bg-neon-cyan" />
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-5 space-y-4"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3 ${
                      m.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        m.role === 'user'
                          ? 'bg-neon-magenta/20 border border-neon-magenta/40'
                          : 'bg-grad-1'
                      }`}
                    >
                      {m.role === 'user' ? (
                        <User size={14} className="text-neon-magenta" />
                      ) : (
                        <Bot size={14} className="text-black" />
                      )}
                    </div>
                    <div
                      className={`max-w-[82%] break-words px-3.5 sm:px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-neon-magenta/15 border border-neon-magenta/25 text-ink rounded-tr-sm'
                          : 'glass-strong text-ink rounded-tl-sm'
                      }`}
                    >
                      {m.content}
                      {m.role === 'assistant' &&
                        m.content === '' &&
                        thinking === false && (
                          <span className="inline-block w-2 h-4 bg-neon-cyan align-middle animate-pulse ml-0.5" />
                        )}
                    </div>
                  </motion.div>
                ))}

                {thinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-grad-1 flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-black" />
                    </div>
                    <div className="glass-strong px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: d * 0.15,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestions */}
            <div className="px-4 sm:px-5 pb-3 flex flex-wrap gap-2">
              {assistantSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium glass-strong hover:border-neon-cyan hover:text-neon-cyan transition-all"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
              className="flex items-center gap-2 p-3 border-t border-white/5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="min-w-0 flex-1 bg-transparent text-sm px-3 py-2 outline-none placeholder-ink-dim"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="w-10 h-10 rounded-full bg-grad-1 text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-glow transition"
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

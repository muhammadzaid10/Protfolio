import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Sparkles,
  CheckCircle2,
  Loader2,
  Globe2,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { personal } from '../data/portfolio'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: '#00e5ff',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personal.location,
    href: '#',
    color: '#b829ff',
  },
  {
    icon: Globe2,
    label: 'Availability',
    value: 'Internship & Freelance',
    href: '#',
    color: '#ff2e63',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10)
      e.message = 'Message is too short'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onChange = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }))
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSending(true)
    try {
      await axios.post(`${API_BASE}/contact`, form, { timeout: 12000 })
      toast.success('Message sent successfully!')
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSuccess(false), 3500)
    } catch (err) {
      // Even if backend is offline, give a graceful UX
      const msg =
        err?.response?.data?.error ||
        'Could not reach the server. You can email me directly instead.'
      toast.error(msg)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        {/* Hire Me CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mb-14 sm:mb-20 overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
            style={{ background: '#00e5ff' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
            style={{ background: '#b829ff' }}
          />

          <div className="relative grid md:grid-cols-[1fr_auto] gap-5 sm:gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3 sm:mb-4">
                <span
                  className="w-2 h-2 rounded-full bg-neon-lime"
                  style={{ boxShadow: '0 0 8px #b6ff3c' }}
                />
                <span className="font-mono text-[10px] sm:text-[11px] text-neon-lime tracking-wider">
                  HIRING ME = WINNING
                </span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl leading-[1.05] tracking-tight">
                Have a project?{' '}
                <span className="text-gradient">Let's talk.</span>
              </h3>
              <p className="text-sm sm:text-base text-ink-muted mt-2 sm:mt-3 max-w-xl">
                I'm currently open to internship and freelance opportunities —
                from MERN apps to AI integrations.
              </p>
            </div>
            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('contact-form')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-grad-1 text-black font-semibold text-sm sm:text-base hover:shadow-glow transition-all hover:-translate-y-0.5 self-stretch min-[420px]:self-start md:self-center whitespace-nowrap"
            >
              <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" />
              Start a Project
            </a>
          </div>
        </motion.div>

        <SectionHeading
          eyebrow="Contact"
          title="Get in"
          accent="touch"
          desc="Have a question, an idea, or just want to say hi? Drop a message."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8" id="contact-form">
          {/* Contact cards column */}
          <div className="space-y-4">
            {CONTACT_CARDS.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:border-neon-cyan/40 transition-all group"
                  target={c.href.startsWith('mailto') || c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{
                      background: `${c.color}15`,
                      border: `1px solid ${c.color}40`,
                    }}
                  >
                    <Icon size={18} style={{ color: c.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-ink-muted tracking-wider uppercase mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-sm font-semibold break-words">{c.value}</p>
                  </div>
                </motion.a>
              )
            })}

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-2xl p-5"
            >
              <p className="font-mono text-[10px] text-ink-muted tracking-wider uppercase mb-3">
                Find me online
              </p>
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl glass-strong hover:border-neon-cyan hover:text-neon-cyan text-sm transition"
                >
                  <Github size={14} />
                  GitHub
                </a>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl glass-strong hover:border-neon-cyan hover:text-neon-cyan text-sm transition"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 relative"
          >
            <div className="space-y-5">
              <div>
                <label className="block font-mono text-[11px] text-ink-muted tracking-wider uppercase mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={onChange('name')}
                  placeholder="Jane Doe"
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                    errors.name ? 'border-neon-pink' : 'border-white/10'
                  } focus:border-neon-cyan outline-none text-sm transition placeholder-ink-dim`}
                />
                {errors.name && (
                  <p className="text-xs text-neon-pink mt-1.5 font-mono">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-mono text-[11px] text-ink-muted tracking-wider uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={onChange('email')}
                  placeholder="jane@example.com"
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                    errors.email ? 'border-neon-pink' : 'border-white/10'
                  } focus:border-neon-cyan outline-none text-sm transition placeholder-ink-dim`}
                />
                {errors.email && (
                  <p className="text-xs text-neon-pink mt-1.5 font-mono">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-mono text-[11px] text-ink-muted tracking-wider uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={onChange('message')}
                  placeholder="Tell me about your project, idea, or just say hi..."
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                    errors.message ? 'border-neon-pink' : 'border-white/10'
                  } focus:border-neon-cyan outline-none text-sm transition placeholder-ink-dim resize-none`}
                />
                {errors.message && (
                  <p className="text-xs text-neon-pink mt-1.5 font-mono">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-grad-1 text-black font-semibold text-sm hover:shadow-glow transition-all disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </div>

            {/* Success popup overlay */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-3xl flex items-center justify-center bg-bg-deep/80 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: 'spring', damping: 14 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 10, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-grad-1 flex items-center justify-center mx-auto mb-4"
                      style={{ boxShadow: '0 0 60px rgba(0,229,255,0.6)' }}
                    >
                      <CheckCircle2 size={36} className="text-black" />
                    </motion.div>
                    <p className="font-display font-bold text-xl mb-1">
                      Message sent!
                    </p>
                    <p className="text-sm text-ink-muted">
                      I'll get back to you soon ✨
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

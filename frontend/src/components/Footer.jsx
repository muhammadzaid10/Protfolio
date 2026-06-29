import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { personal } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-20">
      <div className="container mx-auto max-w-6xl px-5 md:px-8 py-10 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-lg">
            <span className="text-gradient">{personal.shortName}</span>
            <span className="text-ink/70">.dev</span>
          </p>
          <p className="text-xs text-ink-muted mt-1 font-mono">
            © {new Date().getFullYear()} {personal.name}. Crafted with{' '}
            <Heart className="inline w-3 h-3 text-neon-pink fill-current" /> in
            Pakistan.
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-neon-cyan hover:text-neon-cyan transition"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-neon-cyan hover:text-neon-cyan transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={personal.socials.gmail}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-neon-cyan hover:text-neon-cyan transition"
            aria-label="Email"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}

import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { USERNAME } from '../hooks/useGithub.js'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="section flex flex-col gap-8 py-14 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#top" className="font-display text-lg font-semibold text-ink-0">
            <span className="text-accent">&lt;</span>Siddhant<span className="text-accent">/&gt;</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-ink-2">
            Software engineer building toward AI — one shipped project at a time.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-ink-2">Quick Links</h4>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-ink-1 transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-ink-2">Elsewhere</h4>
          <div className="mt-3 flex gap-3">
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-1 transition-colors hover:border-accent/50 hover:text-accent"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-1 transition-colors hover:border-accent/50 hover:text-accent"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href="mailto:your.email@example.com"
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-1 transition-colors hover:border-accent/50 hover:text-accent"
            >
              <FiMail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-ink-2 md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} Siddhant Jain. All rights reserved.</p>
          <a href="#top" className="flex items-center gap-1.5 transition-colors hover:text-accent">
            Back to top <FiArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiGithub, FiLinkedin, FiMail, FiMapPin, FiCheck } from 'react-icons/fi'
import { USERNAME } from '../hooks/useGithub.js'

const socials = [
  { icon: FiGithub, label: 'GitHub', href: `https://github.com/${USERNAME}` },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/your-profile' },
  { icon: FiMail, label: 'Email', href: 'mailto:your.email@example.com' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sent')
    // Wire this up to Formspree, EmailJS, or your own API endpoint —
    // this demo simulates a successful send so the UI is fully functional.
    setTimeout(() => setStatus('idle'), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section">
      <span className="eyebrow">// contact</span>
      <h2 className="text-3xl font-semibold md:text-4xl">Let&apos;s work together</h2>
      <p className="mt-4 max-w-2xl text-ink-1">
        Open to Software Engineering and AI/ML internships, placement opportunities, and
        interesting collaborations.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="glass space-y-5 p-7"
        >
          <div>
            <label className="mb-1.5 block font-mono text-xs text-ink-2">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink-0 outline-none transition-colors focus:border-accent/50"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs text-ink-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink-0 outline-none transition-colors focus:border-accent/50"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs text-ink-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell me about the role or project..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink-0 outline-none transition-colors focus:border-accent/50"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            {status === 'sent' ? (
              <>
                <FiCheck /> Message Sent
              </>
            ) : (
              <>
                <FiSend /> Send Message
              </>
            )}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass flex flex-col gap-6 p-7"
        >
          <div className="flex items-start gap-3">
            <FiMapPin className="mt-1 text-accent" />
            <div>
              <p className="text-sm text-ink-1">Based in India</p>
              <p className="text-xs text-ink-2">Open to remote and international opportunities</p>
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="space-y-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-ink-1 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Icon /> {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

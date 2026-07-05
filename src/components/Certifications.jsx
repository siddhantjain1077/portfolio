import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiAward, FiExternalLink, FiX } from 'react-icons/fi'
import { categories, certifications } from '../data/certifications.js'

export default function Certifications() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return certifications
    return certifications.filter((c) => c.category === filter)
  }, [filter])

  return (
    <section id="certifications" className="section">
      <span className="eyebrow">// certifications</span>
      <h2 className="text-3xl font-semibold md:text-4xl">Certifications</h2>
      <p className="mt-4 max-w-2xl text-ink-1">
        Internship letters, completion certificates, and technical workshop credentials
        collected from hands-on learning and project work.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
              filter === c
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-white/10 text-ink-2 hover:border-white/20 hover:text-ink-0'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cert, i) => (
          <motion.button
            key={cert.id}
            onClick={() => setActive(cert)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className="glass glass-hover flex h-full flex-col items-start p-5 text-left"
          >
            {cert.image ? (
              <img
                src={cert.image}
                alt={`${cert.name} preview`}
                className="mb-4 aspect-[4/3] w-full rounded-xl border border-white/10 object-cover object-top"
              />
            ) : (
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-400">
                <FiAward size={18} />
              </div>
            )}
            <h3 className="text-sm font-medium text-ink-0">{cert.name}</h3>
            <p className="mt-1 font-mono text-xs text-ink-2">{cert.issuer}</p>
            <span className="mt-3 chip">{cert.earned ? cert.date : 'Coming soon'}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[90vh] w-full max-w-md overflow-y-auto p-7"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary-400">
                  <FiAward size={22} />
                </div>
                <button onClick={() => setActive(null)} aria-label="Close" className="text-ink-2 hover:text-ink-0">
                  <FiX size={20} />
                </button>
              </div>

              {active.image && (
                <img
                  src={active.image}
                  alt={`${active.name} preview`}
                  className="mt-5 max-h-[42vh] w-full rounded-xl border border-white/10 object-contain"
                />
              )}

              <h3 className="mt-4 text-lg font-medium text-ink-0">{active.name}</h3>
              <p className="mt-1 font-mono text-sm text-accent">{active.issuer}</p>

              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
                  <dt className="text-ink-2">Issued</dt>
                  <dd className="text-right text-ink-1">{active.earned ? active.date : 'Pending'}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
                  <dt className="text-ink-2">Credential ID</dt>
                  <dd className="text-right text-ink-1">{active.credentialId}</dd>
                </div>
                <div className="flex justify-between gap-4 pb-2">
                  <dt className="text-ink-2">Category</dt>
                  <dd className="text-right text-ink-1">{active.category}</dd>
                </div>
              </dl>

              {active.earned && (
                <a
                  href={active.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost mt-6 w-full"
                >
                  <FiExternalLink /> View Credential
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

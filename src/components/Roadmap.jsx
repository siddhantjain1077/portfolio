import { motion } from 'framer-motion'
import { roadmap } from '../data/timeline.js'

export default function Roadmap() {
  return (
    <section id="roadmap" className="section">
      <span className="eyebrow">// roadmap</span>
      <h2 className="text-3xl font-semibold md:text-4xl">Where this is headed</h2>
      <p className="mt-4 max-w-2xl text-ink-1">
        A software engineer&apos;s path into AI — each stage builds directly on the last.
      </p>

      <div className="relative mt-14">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-primary/40 via-accent/40 to-transparent md:block" />
        <div className="grid gap-8 md:grid-cols-4">
          {roadmap.map((stage, i) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 mb-4 grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-surface-1 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')}
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-2">
                {stage.stage}
              </span>
              <h3 className="mt-1 text-lg font-medium text-ink-0">{stage.title}</h3>
              <p className="mt-2 text-sm text-ink-2">{stage.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

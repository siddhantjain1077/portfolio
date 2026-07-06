import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'
import { experience } from '../data/timeline.js'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <span className="eyebrow">// experience</span>
      <h2 className="text-3xl font-semibold md:text-4xl">Where I&apos;ve shipped code</h2>

      <div className="relative mt-14 space-y-10 border-l border-white/10 pl-8">
        {experience.map((job, i) => (
          <motion.div
            key={job.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[2.55rem] top-1 grid h-9 w-9 place-items-center rounded-full bg-surface-1 text-primary-400 ring-4 ring-surface-0">
              <FiBriefcase size={16} />
            </span>

            <div className="glass glass-hover p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-medium text-ink-0">{job.role}</h3>
                <span className="chip">{job.duration}</span>
              </div>
              <p className="mt-1 font-mono text-sm text-accent">{job.org}</p>

              <ul className="mt-4 space-y-2 text-sm text-ink-1">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

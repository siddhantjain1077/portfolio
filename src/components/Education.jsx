import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import { education } from '../data/timeline.js'

export default function Education() {
  return (
    <section id="education" className="section">
      <span className="eyebrow">// education</span>
      <h2 className="text-3xl font-semibold md:text-4xl">Academic foundation</h2>

      <div className="relative mt-14 space-y-10 border-l border-white/10 pl-8">
        {education.map((item, i) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[2.55rem] top-1 grid h-9 w-9 place-items-center rounded-full bg-surface-1 text-accent ring-4 ring-surface-0">
              <FiBookOpen size={16} />
            </span>
            <div className="glass glass-hover p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-medium text-ink-0">{item.degree}</h3>
                <span className="chip">{item.duration}</span>
              </div>
              <p className="mt-1 font-mono text-sm text-accent">{item.institution}</p>
              <p className="mt-3 text-sm text-ink-1">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

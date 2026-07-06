import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import { achievements } from '../data/achievements.js'

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <span className="eyebrow">// achievements</span>
      <h2 className="text-3xl font-semibold md:text-4xl">Milestones</h2>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass glass-hover p-6"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
                <FiAward size={16} />
              </div>
              <span className="chip">{item.tag}</span>
            </div>
            <h3 className="mt-4 text-base font-medium text-ink-0">{item.title}</h3>
            <p className="mt-1 font-mono text-xs text-accent">{item.org} · {item.date}</p>
            <p className="mt-3 text-sm text-ink-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills.js'

export default function TechStack() {
  return (
    <section id="stack" className="section">
      <span className="eyebrow">// tech stack</span>
      <h2 className="text-3xl font-semibold md:text-4xl">What I build with</h2>
      <p className="mt-4 max-w-2xl text-ink-1">
        A production-tested full-stack toolkit, with a growing layer of AI and cloud
        skills stacked on top.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="glass glass-hover p-6"
          >
            <h3 className="mb-5 font-mono text-sm uppercase tracking-wider text-accent">
              {group.label}
            </h3>
            <div className="space-y-4">
              {group.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-ink-1">{skill.name}</span>
                    <span className="font-mono text-xs text-ink-2">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

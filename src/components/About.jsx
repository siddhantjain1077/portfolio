import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiTarget } from 'react-icons/fi'

const points = [
  {
    icon: FiCode,
    title: 'BCA → MCA',
    text: 'Grounded computer science fundamentals from a BCA degree, now deepening into advanced systems and problem-solving through an MCA program.',
  },
  {
    icon: FiCpu,
    title: 'Production Experience',
    text: 'React Native Developer Intern at BSES Rajdhani Power Limited — writing code that runs in a real, live enterprise environment, not just coursework.',
  },
  {
    icon: FiTarget,
    title: 'Building Toward AI',
    text: 'Actively layering AI/ML, cloud (AWS/Azure), and LLM tooling on top of solid full-stack fundamentals — engineering first, AI as the next specialization.',
  },
]

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">// about</span>
        <h2 className="text-3xl font-semibold md:text-4xl">
          An engineer building the on-ramp to AI
        </h2>
        <p className="mt-5 max-w-2xl text-ink-1">
          I&apos;m a final-stage computer applications student who spends more time
          shipping than studying theory in isolation. I learn by building — full-stack
          apps, mobile features, and now AI-assisted tooling — and I treat every project
          as a resume line that has to earn its place.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {points.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass glass-hover p-6"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary-400">
              <Icon size={20} />
            </div>
            <h3 className="text-lg font-medium text-ink-0">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

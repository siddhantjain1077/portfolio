import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiUsers, FiStar, FiFolder } from 'react-icons/fi'
import { useGithub, USERNAME } from '../hooks/useGithub.js'
import { useTheme } from '../context/ThemeContext.jsx'

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="glass p-5 text-center">
      <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-400">
        <Icon size={16} />
      </div>
      <div className="font-display text-2xl font-semibold text-ink-0">{value}</div>
      <div className="mt-1 font-mono text-xs text-ink-2">{label}</div>
    </div>
  )
}

export default function GithubStats() {
  const { loading, profile, repos } = useGithub()
  const { theme } = useTheme()

  const topLanguages = useMemo(() => {
    const counts = {}
    repos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
  }, [repos])

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)

  return (
    <section id="github" className="section">
      <span className="eyebrow">// github</span>
      <h2 className="text-3xl font-semibold md:text-4xl">Live from GitHub</h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiFolder} label="Public Repos" value={loading ? '—' : profile?.public_repos ?? '—'} />
        <StatCard icon={FiUsers} label="Followers" value={loading ? '—' : profile?.followers ?? '—'} />
        <StatCard icon={FiStar} label="Total Stars" value={loading ? '—' : totalStars} />
        <StatCard icon={FiGithub} label="Following" value={loading ? '—' : profile?.following ?? '—'} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="glass mt-8 overflow-x-auto p-6"
      >
        <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-accent">
          Contribution Activity
        </h3>
        <img
          src={`https://ghchart.rshah.in/${theme === 'dark' ? '38BDF8' : '2563EB'}/${USERNAME}`}
          alt={`${USERNAME} GitHub contribution graph`}
          className="w-full min-w-[600px]"
          loading="lazy"
        />
      </motion.div>

      {topLanguages.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-accent">
            Top Languages
          </h3>
          <div className="flex flex-wrap gap-3">
            {topLanguages.map(([lang, count]) => (
              <span key={lang} className="chip">
                {lang} <span className="text-ink-2">· {count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <a
        href={`https://github.com/${USERNAME}`}
        target="_blank"
        rel="noreferrer"
        className="btn-ghost mt-8 w-fit"
      >
        <FiGithub /> View Full Profile
      </a>
    </section>
  )
}

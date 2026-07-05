import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi'
import { useGithub, USERNAME } from '../hooks/useGithub.js'

const FILTERS = ['All', 'React', 'JavaScript', 'Mobile Apps', 'Backend', 'AI']

function categorize(repo) {
  const lang = (repo.language || '').toLowerCase()
  const name = repo.name.toLowerCase()
  const desc = (repo.description || '').toLowerCase()
  const blob = `${name} ${desc}`
  const tags = new Set()

  if (blob.includes('react-native') || blob.includes('android') || blob.includes('ios') || blob.includes('mobile')) {
    tags.add('Mobile Apps')
  }
  if (lang === 'javascript' || lang === 'typescript') tags.add('JavaScript')
  if (blob.includes('react') && !blob.includes('react-native')) tags.add('React')
  if (blob.includes('api') || blob.includes('server') || blob.includes('backend') || lang === 'python' || lang === 'java') {
    tags.add('Backend')
  }
  if (blob.includes('ai') || blob.includes('ml') || blob.includes('llm') || blob.includes('gpt') || blob.includes('langchain')) {
    tags.add('AI')
  }
  if (tags.size === 0) tags.add('JavaScript')
  return [...tags]
}

function ProjectCard({ repo, featured }) {
  const tags = categorize(repo)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`glass glass-hover flex h-full flex-col p-6 ${featured ? 'ring-1 ring-accent/30' : ''}`}
    >
      {featured && (
        <span className="mb-3 w-fit rounded-full bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
          Featured
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium text-ink-0">{repo.name}</h3>
        <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-ink-2">
          <span className="flex items-center gap-1"><FiStar size={12} /> {repo.stargazers_count}</span>
          <span className="flex items-center gap-1"><FiGitBranch size={12} /> {repo.forks_count}</span>
        </div>
      </div>
      <p className="mt-2 flex-1 text-sm text-ink-2">
        {repo.description || 'No description provided yet — add one on GitHub to showcase this project here.'}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {repo.language && <span className="chip">{repo.language}</span>}
        {tags.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-ink-1 transition-colors hover:text-accent"
        >
          <FiGithub size={15} /> Code
        </a>
        <a
          href={repo.homepage || repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-ink-1 transition-colors hover:text-accent"
        >
          <FiExternalLink size={15} /> {repo.homepage ? 'Live Demo' : 'Demo (add link)'}
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { loading, error, repos } = useGithub()
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return repos
    return repos.filter((r) => categorize(r).includes(filter))
  }, [repos, filter])

  const featured = repos.slice(0, 3).map((r) => r.id)

  return (
    <section id="projects" className="section">
      <span className="eyebrow">// projects</span>
      <h2 className="text-3xl font-semibold md:text-4xl">Things I&apos;ve built</h2>
      <p className="mt-4 max-w-2xl text-ink-1">
        Pulled live from{' '}
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline-offset-4 hover:underline"
        >
          github.com/{USERNAME}
        </a>. PulseAPI and other active builds surface here automatically as they&apos;re
        updated.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
              filter === f
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-white/10 text-ink-2 hover:border-white/20 hover:text-ink-0'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass h-52 animate-pulse p-6" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="glass p-6 text-sm text-ink-2">
            Couldn&apos;t load live repos right now ({error}). Visit{' '}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              github.com/{USERNAME}
            </a>{' '}
            directly.
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} featured={featured.includes(repo.id)} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-sm text-ink-2">No projects match this filter yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

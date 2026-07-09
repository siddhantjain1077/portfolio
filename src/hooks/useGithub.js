import { useEffect, useState } from 'react'

const USERNAME = 'siddhantjain1077'
const API = 'https://api.github.com'

function getRepoDescription(repo) {
  const existingDescription = (repo.description || '').trim()
  if (existingDescription) {
    return existingDescription
  }

  const name = (repo.name || '').toLowerCase()
  const language = (repo.language || '').toLowerCase()

  if (name.includes('portfolio') || name.includes('profile')) {
    return 'A personal portfolio website showcasing projects, skills, and contact information.'
  }

  if (name.includes('weather')) {
    return 'A weather app that presents forecasts and location-based climate information.'
  }

  if (name.includes('grocery') || name.includes('store') || name.includes('shop')) {
    return 'A small commerce or inventory app focused on product listings and management.'
  }

  if (name.includes('todo') || name.includes('task') || name.includes('note')) {
    return 'A productivity app for organizing tasks, notes, or daily plans.'
  }

  if (name.includes('chat') || name.includes('messenger')) {
    return 'A communication app for real-time messaging and conversations.'
  }

  if (name.includes('blog') || name.includes('article')) {
    return 'A content-focused project for publishing posts and stories.'
  }

  if (name.includes('auth') || name.includes('login')) {
    return 'A secure authentication project for user sign-in and account access.'
  }

  if (language === 'javascript' || language === 'typescript') {
    return 'A modern web application built with a JavaScript-based stack.'
  }

  if (language === 'python') {
    return 'A Python-based project focused on automation, scripting, or data workflows.'
  }

  if (language === 'java') {
    return 'A Java-based application developed for backend or desktop use.'
  }

  if (language === 'c') {
    return 'A C-based project focused on systems, algorithms, or low-level programming.'
  }

  return 'A software project built to solve a practical problem and showcase development skills.'
}

// Note: unauthenticated GitHub API requests are capped at 60/hour per IP.
// If you outgrow that, add a personal access token via a serverless proxy —
// never expose a token directly in client-side code.
export function useGithub() {
  const [state, setState] = useState({
    loading: true,
    error: null,
    profile: null,
    repos: [],
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`${API}/users/${USERNAME}`),
          fetch(`${API}/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ])

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error('GitHub API request failed')
        }

        const profile = await profileRes.json()
        const repos = await reposRes.json()

        const excludedRepoKeywords = [
          'self made projects',
          'self-made-projects',
          'siddhantjain1077',
          'weather website',
          'weather-website',
          'grocery management system',
          'grocery-management-system',
        ]

        const excludedLanguages = ['java', 'c']

        const cleanRepos = Array.isArray(repos)
          ? repos
              .filter((r) => !r.fork)
              .filter((r) => {
                const normalizedText = `${r.name || ''} ${r.description || ''} ${r.language || ''}`.toLowerCase()
                const language = (r.language || '').toLowerCase()

                return !excludedRepoKeywords.some((keyword) => normalizedText.includes(keyword)) && !excludedLanguages.includes(language)
              })
              .map((repo) => ({
                ...repo,
                description: getRepoDescription(repo),
              }))
              .sort((a, b) => b.stargazers_count - a.stargazers_count)
          : []

        if (!cancelled) {
          setState({ loading: false, error: null, profile, repos: cleanRepos })
        }
      } catch (err) {
        if (!cancelled) {
          setState({ loading: false, error: err.message, profile: null, repos: [] })
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

export { USERNAME }

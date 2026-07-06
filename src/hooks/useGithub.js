import { useEffect, useState } from 'react'

const USERNAME = 'siddhantjain1077'
const API = 'https://api.github.com'

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

        const cleanRepos = Array.isArray(repos)
          ? repos
              .filter((r) => !r.fork)
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

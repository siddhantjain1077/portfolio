# Siddhant Jain — Portfolio

A production-ready personal portfolio built with React, Vite, Tailwind CSS, and
Framer Motion. Positions Siddhant as a software engineer extending into AI —
built on real internship and project experience, not a beginner narrative.

## Stack

- React 18 + Vite
- Tailwind CSS (custom design tokens — see `tailwind.config.js`)
- Framer Motion (page/scroll animations)
- React Icons
- Live GitHub API integration (no backend required)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Before you deploy — things to personalize

1. **Resume** — drop your real PDF at `public/resume.pdf` (the Hero "Download
   Resume" button already points there).
2. **Social links** — update the LinkedIn and email placeholders in
   `src/components/Contact.jsx` and `src/components/Footer.jsx`.
3. **Certifications** — edit `src/data/certifications.js`. Set `earned: true`
   and fill in `date`, `credentialId`, `verifyUrl`, and `image` as you earn
   real credentials (AWS CLF-C02, DVA-C02, Azure AI-900, etc.).
4. **Achievements** — edit `src/data/achievements.js` with real hackathons,
   competitions, and awards as you collect them.
5. **Skills / proficiency** — adjust levels in `src/data/skills.js`.
6. **Timeline** — update `src/data/timeline.js` for experience, education, and
   roadmap copy.
7. **Contact form** — the form currently simulates a send. Wire it to
   [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com/), or
   your own API route inside `handleSubmit` in `src/components/Contact.jsx`.
8. **OG image** — add a real `public/og-image.png` (1200×630) for link
   previews, referenced in `index.html`.
9. **GitHub username** — the whole Projects and GitHub Stats sections read
   from `USERNAME` in `src/hooks/useGithub.js` — already set to
   `siddhantjain1077`. Change it there if needed.

## Notes on the GitHub integration

- Repos and profile stats are fetched client-side from the public,
  unauthenticated GitHub REST API (60 requests/hour/IP limit). That's plenty
  for portfolio traffic; if you outgrow it, proxy requests through a
  serverless function with a personal access token — never ship a token in
  client code.
- The contribution graph uses the public `ghchart.rshah.in` image API, keyed
  off the same GitHub username.

## Build & deploy

```bash
npm run build
```

Outputs a static `dist/` folder — deploy it anywhere static:

- **Vercel**: `vercel --prod` (or connect the GitHub repo in the dashboard)
- **Netlify**: drag-and-drop `dist/` in the dashboard, or `netlify deploy --prod`
- **GitHub Pages**: push `dist/` to a `gh-pages` branch, or use the
  `gh-pages` npm package

## Accessibility & performance

- Keyboard focus states are visible throughout (`:focus-visible`).
- `prefers-reduced-motion` disables/shortens animations automatically.
- Below-the-fold sections are code-split with `React.lazy` + `Suspense`.
- Semantic headings and alt text are used for all meaningful images.

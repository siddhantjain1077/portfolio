# Siddhant Jain - Portfolio

A production-ready personal portfolio built with React, Vite, Tailwind CSS, and
Framer Motion. It positions Siddhant as a software engineer extending into AI,
built on real internship and project experience.

## Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- React Icons
- Live GitHub API integration
- Netlify Forms for free contact submissions

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL, usually `http://localhost:5173`.

## Before you deploy - things to personalize

1. **Resume** - drop your real PDF at `public/resume.pdf`.
2. **Profile photo** - add your image at `public/profile-photo.jpg`, then set
   `photoUrl: '/profile-photo.jpg'` in `src/data/profile.js`. A Google Drive
   share link also works if the file access is set to "Anyone with the link".
3. **Social links** - LinkedIn and Instagram live in `src/data/profile.js`.
   Add your email there too if you want an email icon shown.
4. **Certifications** - the current BSES, CodSoft, Bharat Intern, and JIIT
   files are in `public/certificates`; edit `src/data/certifications.js` to add
   more.
5. **Achievements** - edit `src/data/achievements.js` with real hackathons,
   competitions, and awards.
6. **Skills / proficiency** - adjust levels in `src/data/skills.js`.
7. **Timeline** - update `src/data/timeline.js` for experience, education, and
   roadmap copy.
8. **Contact form** - deploy on Netlify and enable form notifications for the
   `contact` form. This uses Netlify Forms, so there is no server or paid
   database to maintain.
9. **OG image** - add a real `public/og-image.png` image for link previews.
10. **GitHub username** - Projects and GitHub Stats read from `USERNAME` in
   `src/hooks/useGithub.js`.

## Notes on the GitHub integration

- Repos and profile stats are fetched client-side from the public,
  unauthenticated GitHub REST API.
- The contribution graph uses the public `ghchart.rshah.in` image API, keyed
  off the same GitHub username.

## Build and deploy

```bash
npm run build
```

Outputs a static `dist/` folder. For the contact form to work without a paid
backend, deploy this site to Netlify and use the included `netlify.toml`.

## Accessibility and performance

- Keyboard focus states are visible throughout.
- `prefers-reduced-motion` disables or shortens animations automatically.
- Below-the-fold sections are code-split with `React.lazy` and `Suspense`.
- Semantic headings and alt text are used for meaningful images.

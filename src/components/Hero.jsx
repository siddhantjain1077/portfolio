import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCloud, FiDownload, FiMail } from 'react-icons/fi'
import {
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
} from 'react-icons/si'
import { profile } from '../data/profile.js'

const roles = [
  'Software Developer',
  'React Native Developer',
  'MCA Student',
  'Aspiring AI Engineer',
]

const floatIcons = [
  { Icon: SiReact, style: 'left-[6%] top-[22%]', delay: 0 },
  { Icon: SiNodedotjs, style: 'right-[8%] top-[18%]', delay: 0.8 },
  { Icon: SiMongodb, style: 'left-[10%] bottom-[16%]', delay: 1.4 },
  { Icon: SiJavascript, style: 'right-[12%] bottom-[24%]', delay: 0.4 },
  { Icon: SiGit, style: 'left-[20%] top-[8%]', delay: 1.8 },
  { Icon: FiCloud, style: 'right-[20%] top-[8%]', delay: 1.1 },
]

function getProfilePhotoSrc(photoUrl) {
  if (!photoUrl) return ''

  const driveMatch = photoUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (driveMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`
  }

  return photoUrl
}

function useTypewriter(words) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    const speed = deleting ? 40 : 80
    const pause = 1400

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1)
        setText(next)
        if (next === current) {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        const next = current.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return text
}

export default function Hero() {
  const typed = useTypewriter(roles)
  const profilePhotoSrc = getProfilePhotoSrc(profile.photoUrl)

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="absolute inset-0 bg-hero-glow" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)',
        }}
      />

      {floatIcons.map(({ Icon, style, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden text-2xl text-ink-2/40 md:block ${style}`}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon />
        </motion.div>
      ))}

      <div className="section relative grid items-center gap-12 py-0 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-ink-1"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            open to Software Engineering &amp; AI internships
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl md:text-6xl"
          >
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>.
            <br />
            I build software first -{' '}
            <span className="whitespace-nowrap">
              <span className="font-mono text-accent">{typed}</span>
              <span className="animate-blink text-accent">|</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-lg text-ink-1"
          >
            MCA student and React Native developer intern at BSES Rajdhani Power Limited,
            shipping full-stack products end-to-end. Now extending that foundation into
            AI/ML - not starting from zero, but building on production engineering
            experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="/resume.pdf" download className="btn-primary">
              <FiDownload /> Download Resume
            </a>
            <a href="#projects" className="btn-ghost">
              View Projects <FiArrowRight />
            </a>
            <a href="#contact" className="btn-ghost">
              <FiMail /> Contact Me
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-glow lg:max-w-none"
        >
          {profilePhotoSrc ? (
            <img
              src={profilePhotoSrc}
              alt={profile.photoAlt}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/25 via-accent/10 to-white/5">
              <span className="font-display text-7xl font-semibold text-ink-0">{profile.initials}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

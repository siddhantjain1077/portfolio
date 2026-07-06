import { Suspense, lazy } from 'react'
import Loader from './components/Loader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'

// Below-the-fold sections are lazy-loaded to keep the initial bundle lean.
const About = lazy(() => import('./components/About.jsx'))
const TechStack = lazy(() => import('./components/TechStack.jsx'))
const Experience = lazy(() => import('./components/Experience.jsx'))
const Projects = lazy(() => import('./components/Projects.jsx'))
const Certifications = lazy(() => import('./components/Certifications.jsx'))
const Education = lazy(() => import('./components/Education.jsx'))
// const Achievements = lazy(() => import('./components/Achievements.jsx'))
// const GithubStats = lazy(() => import('./components/GithubStats.jsx'))
const Roadmap = lazy(() => import('./components/Roadmap.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))

function SectionFallback() {
  return <div className="section h-96 animate-pulse" />
}

export default function App() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <TechStack />
          <Experience />
          <Education />
          <Projects />
          <Certifications />
          {/* <Achievements /> */}
          {/* <GithubStats /> */}
          <Roadmap />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}

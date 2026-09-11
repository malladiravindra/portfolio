import { MotionConfig } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Projects from './components/Projects'
import FeaturedProject from './components/FeaturedProject'
import ExperienceTimeline from './components/ExperienceTimeline'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    // reducedMotion="user" makes every Framer Motion animation in the tree
    // respect the OS-level prefers-reduced-motion setting automatically —
    // transform-based motion (slides, floats, lifts) collapses to instant,
    // opacity fades still play so content isn't hidden.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <ScrollProgress />
        <Nav theme={theme} toggle={toggle} />
        <main>
          <Hero />
          <About />
          <Stack />
          <Projects />
          <FeaturedProject />
          <ExperienceTimeline />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

import { MotionConfig } from 'framer-motion'
import { Loader2, RefreshCw } from 'lucide-react'
import { useTheme } from './hooks/useTheme'
import { usePortfolioData } from './hooks/usePortfolioData'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Projects from './components/Projects'
import FeaturedProject from './components/FeaturedProject'
import ExperienceTimeline from './components/ExperienceTimeline'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggle } = useTheme()
  const { data, loading, error, retry } = usePortfolioData()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 size={28} className="animate-spin text-accent" aria-label="Loading portfolio" />
      </div>
    )
  }

  if (error || !data.profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center dark:bg-slate-950">
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Couldn&apos;t load this portfolio.</p>
        <p className="max-w-sm text-sm text-slate-600 dark:text-slate-400">
          The API might be waking up or briefly unavailable. Please try again in a moment.
        </p>
        <button
          onClick={retry}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white
                     transition-transform duration-200 hover:-translate-y-0.5"
        >
          <RefreshCw size={15} /> Retry
        </button>
      </div>
    )
  }

  const { profile, skills, projects, timeline, certifications, services } = data
  const experience = timeline.filter((t) => t.type === 'experience')
  const education = timeline.filter((t) => t.type === 'education')

  return (
    // reducedMotion="user" makes every Framer Motion animation in the tree
    // respect the OS-level prefers-reduced-motion setting automatically —
    // transform-based motion (slides, floats, lifts) collapses to instant,
    // opacity fades still play so content isn't hidden.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <ScrollProgress />
        <Nav theme={theme} toggle={toggle} profile={profile} />
        <main>
          <Hero profile={profile} skills={skills} />
          <About profile={profile} skills={skills} />
          <Stack skills={skills} />
          <Projects projects={projects} profile={profile} />
          <FeaturedProject project={projects.find((p) => p.featured)} />
          <ExperienceTimeline entries={experience} />
          <Education entries={education} />
          <Services services={services} />
          <Certifications certifications={certifications} />
          <Contact profile={profile} />
        </main>
        <Footer profile={profile} />
      </div>
    </MotionConfig>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { FileText, Github, Linkedin, Menu, X } from 'lucide-react'
import { Theme } from '../hooks/useTheme'
import ThemeToggle from './ThemeToggle'
import { Profile } from '../lib/api'
import { btnPrimary } from '../styles/buttons'

const nav = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({
  theme,
  toggle,
  profile,
}: {
  theme: Theme
  toggle: () => void
  profile: Profile
}) {
  const shortName = profile.short_name || profile.name
  const [active, setActive] = useState('top')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 8))

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'border-slate-200/80 bg-white/95 shadow-sm dark:border-slate-800/80 dark:bg-slate-950/95'
          : 'border-slate-200/40 bg-white/70 dark:border-slate-800/40 dark:bg-slate-950/70'
      }`}
    >
      <div className={`container-page flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
        <a href="#top" className="shrink-0 font-heading font-bold tracking-tight text-slate-900 dark:text-white">
          {shortName}
        </a>

        <nav className="hidden items-center gap-1 text-sm lg:flex">
          {nav.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative rounded-md px-3 py-2 font-medium transition-colors ${
                  isActive
                    ? 'text-accent'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 origin-left scale-x-0 rounded-full bg-slate-300 transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-slate-600" />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <IconLink href={profile.github_url} label="GitHub">
            <Github size={17} />
          </IconLink>
          <IconLink href={profile.linkedin_url} label="LinkedIn">
            <Linkedin size={17} />
          </IconLink>
          <a href={profile.resume_url} download className={`px-3.5 py-2 ${btnPrimary}`}>
            <FileText size={15} /> Resume
          </a>
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle theme={theme} toggle={toggle} />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600
                       transition-transform duration-200 active:scale-95 dark:border-slate-700 dark:text-slate-300"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-200 dark:border-slate-800 lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-3 text-sm">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 font-medium text-slate-600 transition-colors hover:bg-slate-50
                             dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                <IconLink href={profile.github_url} label="GitHub">
                  <Github size={17} />
                </IconLink>
                <IconLink href={profile.linkedin_url} label="LinkedIn">
                  <Linkedin size={17} />
                </IconLink>
                <a href={profile.resume_url} download className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  <FileText size={15} /> Resume
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-300 ease-out
                 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-accent dark:text-slate-400 dark:hover:bg-slate-800"
    >
      {children}
    </a>
  )
}

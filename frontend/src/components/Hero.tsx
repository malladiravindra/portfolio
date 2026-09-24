import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail, User } from 'lucide-react'
import { Profile, SkillGroup } from '../lib/api'
import { btnPrimary, btnSecondary, btnGhost } from '../styles/buttons'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Lines cycled by the typing banner. Edit freely — each is URL-encoded
// (form-style, spaces as "+") before being joined with the literal ";"
// separator readme-typing-svg expects.
const TYPING_LINES = [
  'Full Stack Developer (Django + React)',
  'Fresher | Open to Python/Django roles',
  'Building real-world projects',
]

const TYPING_SVG_HEIGHT = 50
// Width must fit the longest line at this font size, or the SVG clips it
// at both edges — Fira Code 28px runs ~17px/char, so pad generously past
// the longest line's character count.
const TYPING_SVG_WIDTH = Math.max(600, Math.max(...TYPING_LINES.map((l) => l.length)) * 17 + 40)

function buildTypingSvgUrl(lines: string[]) {
  const encoded = lines.map((line) => encodeURIComponent(line).replace(/%20/g, '+')).join(';')
  return `https://readme-typing-svg.demolab.com/?font=Fira+Code&size=28&pause=1000&color=61DAFB&center=true&vCenter=true&width=${TYPING_SVG_WIDTH}&height=${TYPING_SVG_HEIGHT}&lines=${encoded}`
}

export default function Hero({ profile, skills }: { profile: Profile; skills: SkillGroup[] }) {
  const shortName = profile.short_name || profile.name
  const [imageFailed, setImageFailed] = useState(false)
  // Fall back to the photo bundled in frontend/public when the API has none set.
  const profileImage = profile.profile_image || '/profile.jpg'
  const showImage = !imageFailed

  // One representative skill per category (language, backend, frontend, ...)
  // for a cross-stack badge row — the full grouped breakdown lives in the
  // Skills section below.
  const highlightSkills = Array.from(new Set(skills.map((g) => g.items[0]).filter(Boolean))).slice(0, 6)

  return (
    <section id="top" className="relative scroll-mt-16 overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-28">
      {/* extremely subtle backdrop — a faint dot grid + a slow, low-opacity glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.2]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          color: 'rgb(148 163 184)',
          maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl dark:bg-accent-dark/10"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-page relative">
        {/* Typing banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 flex justify-center sm:mb-14"
        >
          <img
            src={buildTypingSvgUrl(TYPING_LINES)}
            alt={`${shortName} — ${TYPING_LINES.join(' / ')}`}
            width={TYPING_SVG_WIDTH}
            height={TYPING_SVG_HEIGHT}
            className="h-auto max-w-full"
          />
        </motion.div>

        {/* Name/skills + photo split */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.p variants={item} className="text-base font-medium text-slate-500 dark:text-slate-400 sm:text-lg">
              Hi, I&apos;m
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-1 font-heading text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            >
              {shortName}
            </motion.h1>
            <motion.p variants={item} className="mt-4 text-xl font-semibold text-accent sm:text-2xl">
              {profile.role}
            </motion.p>
            <motion.p
              variants={item}
              className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            {highlightSkills.length > 0 && (
              <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
                {highlightSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent
                               dark:border-accent-dark/20 dark:bg-accent-dark/10 dark:text-accent-dark"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className={`group px-5 py-2.5 ${btnPrimary}`}>
                View Projects
                <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </a>
              <a href="#contact" className={`px-5 py-2.5 ${btnSecondary}`}>
                Contact Me
              </a>
              <a href={profile.resume_url} download="Malladi_Ravindra_Resume.pdf" className={`px-5 py-2.5 ${btnGhost}`}>
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-accent"
              >
                <Github size={20} />
              </a>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-accent"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-accent"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="mx-auto w-48 sm:w-64 md:mx-0 md:ml-auto md:w-full md:max-w-sm"
          >
            <div
              className="relative aspect-square overflow-hidden rounded-full border-4 border-white shadow-card-hover
                         ring-1 ring-slate-200 dark:border-slate-900 dark:ring-slate-800"
            >
              {showImage ? (
                <img
                  src={profileImage}
                  alt={shortName}
                  loading="eager"
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <User size={64} className="text-slate-300 dark:text-slate-600" aria-hidden="true" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

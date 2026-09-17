import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { Profile } from '../lib/api'
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

export default function Hero({ profile }: { profile: Profile }) {
  const shortName = profile.short_name || profile.name
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
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">
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

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className={`group px-5 py-2.5 ${btnPrimary}`}>
              View Projects
              <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </a>
            <a href="#contact" className={`px-5 py-2.5 ${btnSecondary}`}>
              Contact Me
            </a>
            <a href={profile.resume_url} download className={`px-5 py-2.5 ${btnGhost}`}>
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
      </div>
    </section>
  )
}

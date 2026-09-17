import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Profile } from '../lib/api'

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-t border-slate-200 dark:border-slate-800"
    >
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-heading font-semibold text-slate-900 dark:text-white">{profile.name}</p>
          <p className="text-slate-500 dark:text-slate-400">{profile.role}</p>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <a
            href={profile.github_url}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors duration-200 hover:text-accent"
          >
            <Github size={17} />
          </a>
          <span aria-hidden="true">|</span>
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors duration-200 hover:text-accent"
          >
            <Linkedin size={17} />
          </a>
          <span aria-hidden="true">|</span>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors duration-200 hover:text-accent">
            <Mail size={17} />
          </a>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </motion.footer>
  )
}

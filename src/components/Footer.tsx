import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { site } from '../data/site'

export default function Footer() {
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
          <p className="font-heading font-semibold text-slate-900 dark:text-white">{site.name}</p>
          <p className="text-slate-500 dark:text-slate-400">{site.role}</p>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors duration-200 hover:text-accent"
          >
            <Github size={17} />
          </a>
          <span aria-hidden="true">|</span>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors duration-200 hover:text-accent"
          >
            <Linkedin size={17} />
          </a>
          <span aria-hidden="true">|</span>
          <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors duration-200 hover:text-accent">
            <Mail size={17} />
          </a>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </motion.footer>
  )
}

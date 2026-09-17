import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, FlaskConical, Github, ImageOff } from 'lucide-react'
import { Project } from '../lib/api'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: Math.min(index * 0.1, 0.5) },
  }),
}

const tagContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
}

const tagItemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
}

export default function ProjectCard({
  project,
  index,
  githubFallback,
}: {
  project: Project
  index: number
  githubFallback: string
}) {
  const githubHref = project.github_url || project.link || githubFallback
  const liveHref = project.live_url
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(project.image) && !imageFailed

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex w-full flex-col gap-5 rounded-xl border border-blue-200 bg-white p-6 shadow-card
                 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400
                 hover:shadow-[0_8px_24px_rgba(59,130,246,0.15)]
                 dark:border-blue-900/40 dark:bg-slate-900 dark:hover:border-blue-400
                 dark:hover:shadow-[0_8px_24px_rgba(96,165,250,0.2)]
                 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8"
    >
      <div className="lg:max-w-xl">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border
                       border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60"
          >
            {showImage ? (
              <img
                src={project.image}
                alt={`${project.name} preview`}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageOff size={18} className="text-slate-300 dark:text-slate-600" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-start gap-2">
              <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                {project.name}
              </h3>
              {project.status === 'labs' && (
                <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  <FlaskConical size={11} /> Labs
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm font-medium text-accent">{project.tagline}</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{project.description}</p>
      </div>

      <div className="flex flex-col items-start gap-4 lg:w-64 lg:shrink-0 lg:items-end lg:text-right">
        <motion.div variants={tagContainerVariants} className="flex flex-wrap gap-2 lg:justify-end">
          {project.tech.map((t) => (
            <motion.span
              key={t}
              variants={tagItemVariants}
              className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors duration-200
                         hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex flex-wrap items-center gap-4 lg:justify-end">
          <a
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-900
                       transition-colors duration-200 hover:text-accent dark:text-white dark:hover:text-accent-dark"
          >
            <Github size={15} />
            <span className="border-b border-transparent transition-colors duration-200 group-hover/link:border-current">
              View on GitHub
            </span>
          </a>
          {liveHref && (
            <a
              href={liveHref}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent
                         transition-colors duration-200 hover:text-accent-dark"
            >
              <ExternalLink size={15} />
              <span className="border-b border-transparent transition-colors duration-200 group-hover/link:border-current">
                Live Demo
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

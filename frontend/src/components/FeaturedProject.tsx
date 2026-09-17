import { motion } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { Project } from '../lib/api'
import { btnPrimary } from '../styles/buttons'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function FeaturedProject({ project }: { project?: Project }) {
  if (!project) return null

  const githubHref = project.github_url || project.link
  const problem = project.problem_statement
  const features = project.key_features

  return (
    <section className="container-page scroll-mt-16 py-16 sm:py-24">
      <SectionHeader eyebrow="Featured Project" title="A closer look" />

      <div className="grid items-center gap-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 sm:p-10 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h3 variants={item} className="font-heading text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {project.name}
          </motion.h3>
          <motion.p variants={item} className="mt-1 font-medium text-accent">
            {project.tagline}
          </motion.p>

          <div className="mt-6 space-y-5 text-sm sm:text-base">
            {problem && (
              <motion.div variants={item}>
                <h4 className="font-semibold text-slate-900 dark:text-white">Problem</h4>
                <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">{problem}</p>
              </motion.div>
            )}
            <motion.div variants={item}>
              <h4 className="font-semibold text-slate-900 dark:text-white">Solution</h4>
              <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">{project.description}</p>
            </motion.div>
            {features.length > 0 && (
              <motion.div variants={item}>
                <h4 className="font-semibold text-slate-900 dark:text-white">Key Features</h4>
                <ul className="mt-2 space-y-1.5">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2 text-slate-600 dark:text-slate-400">
                      <span className="text-accent">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            <motion.div variants={item}>
              <h4 className="font-semibold text-slate-900 dark:text-white">Tech Stack</h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.a
            variants={item}
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            className={`group mt-6 px-4 py-2.5 ${btnPrimary}`}
          >
            <Github size={16} /> View on GitHub
            <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* Abstract CSS visual — not an actual screenshot. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          whileHover={{ y: -4 }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-shadow duration-300
                     ease-out hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-4 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['To Do', 'In Progress', 'Done'].map((col, ci) => (
              <div key={col} className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                <p className="mb-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">{col}</p>
                <div className="space-y-2">
                  {Array.from({ length: 3 - ci }).map((_, i) => (
                    <div
                      key={i}
                      className="h-8 rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
            <p className="mb-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">Profit Margin</p>
            <div className="flex h-16 items-end gap-1.5">
              {[40, 65, 50, 80, 60, 90].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease: 'easeOut' }}
                  style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                  className="flex-1 rounded-t bg-accent/60 dark:bg-accent/50"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

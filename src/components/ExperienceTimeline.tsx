import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { commits } from '../data/timeline'

const experience = commits.filter((c) => c.type === 'experience')

// Technologies named explicitly in each entry's responsibilities below —
// pulled out as tags, not invented.
const TECHNOLOGIES: Record<string, string[]> = {
  a1c9f3e: ['Django', 'React', 'DRF', 'PostgreSQL', 'MySQL', 'JWT', 'RBAC', 'Postman', 'Git'],
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="container-page scroll-mt-16 py-16 sm:py-24">
      <SectionHeader eyebrow="Experience" title="Where I've worked" />

      <div className="relative pl-6 sm:pl-8">
        <div className="absolute bottom-2 left-[9px] top-2 w-px overflow-hidden sm:left-[13px]">
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute inset-0 bg-accent/50"
          />
        </div>

        {experience.map((c, i) => {
          const [role, org] = c.org.split(' · ')
          return (
            <motion.div
              key={c.hash}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
              className="relative pb-10 last:pb-0"
            >
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full
                           border-2 border-accent bg-white dark:bg-slate-950 sm:-left-8"
              >
                <Briefcase size={11} className="text-accent" />
              </motion.span>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 ease-out
                              hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{c.meta}</p>
                <h3 className="mt-1 font-heading font-semibold text-slate-900 dark:text-white">{role}</h3>
                <p className="text-sm font-medium text-accent">{org}</p>
                <ul className="mt-4 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="mt-0.5 text-slate-400 dark:text-slate-600">–</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {TECHNOLOGIES[c.hash] && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {TECHNOLOGIES[c.hash].map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

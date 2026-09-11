import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { commits } from '../data/timeline'

const education = commits.find((c) => c.type === 'education')

export default function Education() {
  if (!education) return null
  const [degree, org] = education.org.split(' · ')

  return (
    <section id="education" className="container-page scroll-mt-16 pb-16 sm:pb-24">
      <SectionHeader eyebrow="Education" title="Academic background" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex max-w-2xl gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300
                   ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <GraduationCap size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{education.meta}</p>
          <h3 className="mt-1 font-heading font-semibold text-slate-900 dark:text-white">{degree}</h3>
          <p className="text-sm font-medium text-accent">{org}</p>
          <ul className="mt-3 space-y-1.5">
            {education.bullets.map((b) => (
              <li key={b} className="text-sm text-slate-600 dark:text-slate-400">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { Certification } from '../lib/api'

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  if (certifications.length === 0) return null

  return (
    <section id="certifications" className="container-page scroll-mt-16 py-16 sm:py-24">
      <SectionHeader eyebrow="Certifications" title="Credentials" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.credential_id || cert.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: (i % 3) * 0.08 }}
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 ease-out
                       hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110">
              <Award size={18} />
            </div>
            <h3 className="font-heading font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{cert.issuing_organization}</p>
            {cert.issue_date && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {new Date(cert.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
              </p>
            )}
            {cert.description && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{cert.description}</p>
            )}
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors
                           duration-200 hover:text-accent dark:text-white dark:hover:text-accent-dark"
              >
                <ExternalLink size={14} /> View credential
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

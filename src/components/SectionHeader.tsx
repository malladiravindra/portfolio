import { motion } from 'framer-motion'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-10 sm:mb-12"
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
      )}
      <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

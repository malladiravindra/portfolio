import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay },
  }),
}

const pillContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
}

export default function SkillCard({
  icon: Icon,
  title,
  items,
  delay = 0,
}: {
  icon: LucideIcon
  title: string
  items: string[]
  delay?: number
}) {
  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110">
        <Icon size={18} />
      </div>
      <h3 className="font-heading font-semibold text-slate-900 dark:text-white">{title}</h3>
      <motion.div variants={pillContainerVariants} className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <motion.span
            key={item}
            variants={pillVariants}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

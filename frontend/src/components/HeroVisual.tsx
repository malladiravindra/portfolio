import { motion } from 'framer-motion'
import { Boxes, Database, Server } from 'lucide-react'

// A small abstract "stack" visual — not a screenshot, not fake project code.
// Three real layers of the actual stack, connected top to bottom, each
// floating very slightly and independently for a bit of life.
const LAYERS = [
  { icon: Boxes, title: 'React / Next.js', sub: 'Frontend' },
  { icon: Server, title: 'Django REST API', sub: 'Backend' },
  { icon: Database, title: 'MySQL', sub: 'Database' },
]

export default function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-8
                 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40 lg:block"
    >
      {/* faint dot grid, purely decorative */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          color: 'rgb(148 163 184)',
        }}
      />
      {/* soft glow, slow and subtle */}
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl dark:bg-accent-dark/10"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex flex-col gap-5 pl-6">
        <div className="absolute bottom-3 left-[7px] top-3 w-px bg-slate-300 dark:bg-slate-700" />

        {LAYERS.map(({ icon: Icon, title, sub }, i) => (
          <motion.div
            key={title}
            className="relative flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card
                       dark:border-slate-800 dark:bg-slate-900"
            initial={{ opacity: 0, x: -12 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 + i * 0.15 },
              x: { duration: 0.5, delay: 0.6 + i * 0.15 },
              y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
            }}
          >
            <span className="absolute -left-[31px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-accent bg-white dark:bg-slate-950" />
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

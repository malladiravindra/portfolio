import { motion } from 'framer-motion'
import { Code2, Database, Layers, Plug, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { Service } from '../lib/api'

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  server: Server,
  code: Code2,
  plug: Plug,
  database: Database,
}

export default function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null

  return (
    <section id="services" className="container-page scroll-mt-16 py-16 sm:py-24">
      <SectionHeader eyebrow="Services" title="What I can help with" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = ICONS[service.icon] ?? Layers
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: (i % 3) * 0.08 }}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 ease-out
                         hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110">
                <Icon size={18} />
              </div>
              <h3 className="font-heading font-semibold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{service.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

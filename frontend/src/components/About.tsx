import { motion } from 'framer-motion'
import { Database, GitBranch, Layout, Server, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'
import { Profile, SkillGroup } from '../lib/api'

const ICONS: Record<string, LucideIcon> = {
  backend: Server,
  frontend: Layout,
  database: Database,
  databases: Database,
  other: GitBranch,
}

export default function About({ profile, skills }: { profile: Profile; skills: SkillGroup[] }) {
  const paragraphs = (profile.detailed_bio || profile.tagline)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  const infoCards = skills.slice(0, 4)

  return (
    <section id="about" className="container-page scroll-mt-16 py-16 sm:py-24">
      <SectionHeader eyebrow="About" title="A bit about me" />

      <div className="grid items-start gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {infoCards.map((card, i) => (
            <SkillCard
              key={card.key}
              icon={ICONS[card.key] ?? Wrench}
              title={card.label}
              items={card.items}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

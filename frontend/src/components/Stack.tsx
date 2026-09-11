import { Database, Layout, Server, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'
import { skills } from '../data/techstack'

const ICONS: Record<string, LucideIcon> = {
  backend: Server,
  frontend: Layout,
  database: Database,
  other: Wrench,
}

export default function Stack() {
  return (
    <section id="skills" className="container-page scroll-mt-16 py-16 sm:py-24">
      <SectionHeader eyebrow="Skills" title="Technologies I work with" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <SkillCard
            key={group.key}
            icon={ICONS[group.key] ?? Wrench}
            title={group.label}
            items={group.items}
            delay={(i % 4) * 0.06}
          />
        ))}
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Database, GitBranch, Layout, Server } from 'lucide-react'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'
import { site } from '../data/site'

const INFO_CARDS = [
  { icon: Server, title: 'Backend', items: ['Django', 'DRF'] },
  { icon: Layout, title: 'Frontend', items: ['React', 'Next.js'] },
  { icon: Database, title: 'Database', items: ['MySQL', 'SQL'] },
  { icon: GitBranch, title: 'Development', items: ['REST APIs', 'Git'] },
]

export default function About() {
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
          <p>
            I&apos;m a B.Tech Computer Science graduate and a Python/Django backend developer who also
            builds the React and Next.js interfaces on top, based in {site.location}.
          </p>
          <p>
            My work centers on designing REST APIs with Django REST Framework, modeling and querying
            relational databases, and building the frontend that consumes those APIs — end to end,
            from schema to UI.
          </p>
          <p>
            I&apos;m interested in building real-world applications and currently open to opportunities
            as a Python, Django, or full stack developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {INFO_CARDS.map((card, i) => (
            <SkillCard key={card.title} icon={card.icon} title={card.title} items={card.items} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

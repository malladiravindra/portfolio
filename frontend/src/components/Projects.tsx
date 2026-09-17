import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import { Profile, Project } from '../lib/api'

export default function Projects({ projects, profile }: { projects: Project[]; profile: Profile }) {
  if (projects.length === 0) return null

  return (
    <section id="projects" className="container-page scroll-mt-16 py-16 sm:py-24">
      <SectionHeader
        eyebrow="Projects"
        title="Things I've built"
        subtitle="A mix of full-stack apps and tooling — mostly Django/DRF backends paired with React frontends."
      />
      <div className="flex flex-col gap-8 sm:gap-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} githubFallback={profile.github_url} />
        ))}
      </div>
    </section>
  )
}

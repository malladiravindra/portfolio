export type SkillGroup = {
  key: string
  label: string
  items: string[]
}

// Curated to the technologies actually used day-to-day — see README for the
// full list of everything touched across projects (kept on each project card
// instead of here, so this section stays a reliable "core stack" summary).
export const skills: SkillGroup[] = [
  { key: 'backend', label: 'Backend', items: ['Python', 'Django', 'Django REST Framework'] },
  { key: 'frontend', label: 'Frontend', items: ['React', 'Next.js', 'JavaScript', 'HTML', 'CSS'] },
  { key: 'database', label: 'Database', items: ['MySQL', 'SQL'] },
  { key: 'other', label: 'Other', items: ['REST API', 'Git'] },
]

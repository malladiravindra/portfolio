export type Commit = {
  hash: string
  type: 'experience' | 'education'
  title: string
  org: string
  meta: string
  bullets: string[]
}

export const commits: Commit[] = [
  {
    hash: 'a1c9f3e',
    type: 'experience',
    title: 'feat: shipped full-stack modules end-to-end',
    org: 'Python Full Stack Developer Intern · JSpiders, Hyderabad',
    meta: 'Aug 2024 — Mar 2025',
    bullets: [
      'Built 3+ production-style modules end-to-end on Django + React (MVT and component architecture).',
      'Designed and integrated DRF APIs directly into React frontends.',
      'Optimized PostgreSQL/MySQL queries and schemas for datasets of 500+ records.',
      'Implemented JWT authentication and role-based access control (RBAC).',
      'Validated every API in Postman before merge, inside a Git/GitHub workflow.',
    ],
  },
  {
    hash: '7b2e5a1',
    type: 'education',
    title: 'feat: laid the CS foundation',
    org: 'B.Tech, Computer Science & Engineering · Vikas Group of Institutions (JNTU Kakinada)',
    meta: '2020 — 2024',
    bullets: [
      'Core coursework in data structures, algorithms, databases, and OS.',
      'Where the "why" behind the frameworks started making sense.',
    ],
  },
]
